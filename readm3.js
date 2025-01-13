const m3data = require('./m3data.json');
const r2data = require('./r2data.json');

const earth_radius = 6370;

function validAz(bear1, bear2, interval) {
    //This function delivers the set of valid test bearings into which a conductivity segment will intersect.
    //bear1 and bear2 are the azimuths from the test point to the segment end points.
    //for example, if a segment appears from 10.5 degrees to 15.5 degrees and we're testing ever 1 degree interval, the valid bearings returned would be 11, 12, 13, 14, and 15 degrees.
	output = [];

	if (Math.abs(bear1 - bear2) > 180) {
		start = Math.ceil(Math.max(bear2,bear1));
		end = Math.floor(Math.min(bear2,bear1)) + 360;
	}else{
		start = Math.ceil(Math.min(bear1,bear2));
		end = Math.floor(Math.max(bear2,bear1));
	}

	for (x = start; x<=end; x++) {
		if ((x % interval)==0) output.push( x % 360);
	}
	return output;
}

function getAllPaths(start_coord, interval, max_distance, conductivity_set='m3') {
	var interestingLines={};
	var azimuths=[];
	start_coord[1] = Math.abs(start_coord[1]);
	for (var i=0; i<360; i+=interval) {  //generate the set of azimuths for study
		azimuths.push(i);
		interestingLines[i]=[];
	}
	
    let conductivity = m3data;
    if (conductivity_set == 'r2') {
        conductivity = r2data;
        console.log("Using r2 data");
    }

	conductivity.data.forEach(line => { //for each line in m3, find the bearings to the endpoints
		bear2 = gc_bear(start_coord[0], start_coord[1],line[3],line[4]);
		bear1 = gc_bear(start_coord[0], start_coord[1],line[1],line[2]);

        valid_azimuths = validAz(bear1, bear2, interval);

		valid_azimuths.forEach(azimuth => { //for each of the azimuths under study, check to see if this segment interests and is in range; if so, push it to a holding array.  Doing it this way saves a bunch of expensive recalculating of bearings to the endpoints to get the entire set of paths.
					var intersect_dist1 = gc_intersect_dist(start_coord[0], -start_coord[1],azimuth,line[1],-line[2],line[7]); //this needs negative West longitudes
					if (intersect_dist1 <= max_distance) {
						//To find the which of the conductivities should be used, we need the orientations and relationship of the conductivity segment and the intersection with the test radial.  For the conductivity segment we use a rhumb-line (so that equal latitude points are oriented perfectly east-west.  This is the border condition of the M3 file ... great circle would say slightly more or less than 90/270 and that would change the conductivity)
						// We also need the great-circle bearing of the test azimuth at the point of intersection ... since bearings change along great-circle paths.
						const intersectionPoint = gc_dest(start_coord[0], -start_coord[1], intersect_dist1, azimuth);
						var orientation = segmentOrientation(rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, azimuth), gc_bear(intersectionPoint[1], -intersectionPoint[0], line[3], line[4]));
						interestingLines[azimuth].push([line[0],line[5],line[6],intersect_dist1, orientation, rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, azimuth)]);
					}
		    // }
		});
	});
	// console.log("interestingLines", interestingLines);
	var output=[];
	azimuths.forEach( az => { //with the initial step complete, now for each azimuth organize and format the results for output
		var segments = interestingLines[az];
	    segments.sort(sortLines); ///sort useful lines by ascending distance from origin

		var path_pairs=[];
		var previous_distance=0;
		var previous_sigma=0;
		var last_sigma = 5000;
		segments.forEach(segment => {
			var segment_length= (segment[3] - previous_distance);
			previous_distance = segment[3];
			if (segment[(segment[4]) + 1] == previous_sigma) {
				// console.log(`orientation switched becuase ${segment[segment[4] + 1]} == ${previous_sigma} (${segment[4]})`);
				segment[4] = (segment[4] + 1)%2;
			}
			var orientation = segment[4];
			segment_sigma = segment[orientation + 1];
			if(orientation==1) {
				previous_sigma = segment[2];
				last_sigma = segment[1];
			}else{
				previous_sigma = segment[1];
				last_sigma = segment[2];
			}

			path_pairs.push({segment_length, sigma: segment_sigma,  total_distance: segment[3]});
		});
		var remaining_distance = max_distance - previous_distance;
		if (remaining_distance > 0) { //if there's still space after the final detected intersection, fill in with the backside of the last segment.
			path_pairs.push({segment_length: remaining_distance, sigma: last_sigma, total_distance: max_distance});
		}
		output.push({azimuth: az, conductivities: path_pairs});
	});
	// console.log("paths", output);
	return output;
}

function segmentOrientation(segment_bearing, return_bearing, dest_bearing) {
	// console.log("Orientation",[segment_bearing, return_bearing, dest_bearing]);
	// segment_bearing = Math.abs(180 - segment_bearing);
	delt= (return_bearing-dest_bearing);
	while (delt < 0) delt+=360;

	if (delt < 0.5) {
		return 0;	
	}else if (segment_bearing < 90 || segment_bearing >= 270) {
		if (delt < 180) return 1;
	}else{
		if (delt >= 180) return 1;
	}

	return 0;
}

function sortLines(a,b) {
	if (a[3] < b[3]) return -1;
	return 1;
}

function deg2rad(deg) { //convert degrees to radians
	return deg * 0.017453292519943;
}
function rad2deg(rad) { //convert radians to degrees
	return rad / 0.017453292519943;
}

function gc_dest(lat1, lon1, dt, brng) {
	lat1 = deg2rad(lat1);
	lon1 = deg2rad(lon1);
	lat3 = Math.asin(Math.sin(lat1) * Math.cos(dt / earth_radius) + Math.cos(lat1) * Math.sin(dt / earth_radius) * Math.cos(deg2rad(brng)));
	lon3 = lon1 + Math.atan2(Math.sin(deg2rad(brng)) * Math.sin(dt / earth_radius) * Math.cos(lat1) , Math.cos(dt / earth_radius) - Math.sin(lat1) * Math.sin(lat3));
	var dest = Array();
	dest[1] = rad2deg(lat3);
	dest[0] = rad2deg(lon3);
	return dest;
}

function gc_final(lat1, lon1, dist, bear) { //final bearing at end of segment given by start point, distance and bearing
	var lat1r = deg2rad(lat1);
	var lon1r = -deg2rad(lon1);
	bear = deg2rad(bear);
	var lat2r = Math.asin( Math.sin(lat1r) * Math.cos(dist/earth_radius) + Math.cos(lat1r) * Math.sin(dist/earth_radius) * Math.cos(bear));
	var lon2r = lon1r + Math.atan2( Math.sin(bear)*Math.sin(dist/earth_radius)*Math.cos(lat1r), Math.cos(dist/earth_radius)-Math.sin(lat1r)*Math.sin(lat2r) );
	
	//normalize lon2 to -180 ... +180;
	var lat2 = rad2deg(lat2r);
	var lon2 = rad2deg(lon2r);
	lon2 += 540;
	while (lon2 >= 360) lon2 -= 360;
	lon2 -= 180;

	//now take bearing from point 2 to point 1 and flip it around
	var final = gc_bear(lat2, Math.abs(lon2), lat1, lon1) + 180;
	while (final >= 360) final -= 360;
	return final;	
}

function gc_bear(lat1, lon1, lat2, lon2) { //great circle bearing (assuming positive W longitude)
	lat1 = deg2rad(lat1);
	lon1 = -deg2rad(lon1);
	lat2 = deg2rad(lat2);
	lon2 = -deg2rad(lon2);
	var y = Math.sin(lon2-lon1) * Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
	var theta = Math.atan2(y, x);
	var brng = rad2deg(theta) + 360; // in degrees
	while (brng>=360) brng -= 360.;
	return brng;
}

function rhumb_bearing(lat1, lon1, lat2, lon2) {

	if (lat2 != lat1) {
		// rhumb_bear = rad2deg(atan(((lon1 - lon2)/ (lat2 - lat1))));
		rhumb_bear = Math.round(1000 * rad2deg(Math.atan2((deg2rad(lon1 - lon2)),(deg2rad(lat2 - lat1)))))/1000;
	}else{ 
		rhumb_bear = 270;
		if ((lon2 - lon1) < 0) rhumb_bear = 90;
	}
	
	while (rhumb_bear >= 360) {
		rhumb_bear -= 360.;
	};
	while (rhumb_bear < 0) {
		rhumb_bear += 360.;
	};

	return rhumb_bear;
}

function gc_dist( lat1, lon1, lat2, lon2) { //great circle distance
	lat1 = deg2rad(lat1);
	lon1 = deg2rad(lon1);
	lat2 = deg2rad(lat2);
	lon2 = deg2rad(lon2);
	// var a = Math.pow( Math.sin((lat2-lat1)/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow( Math.sin(lon2-lon1)/2, 2);
	// var c = 2* Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var c = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1-lon2));
	return earth_radius * c;
}

function gc_intersect_dist( lat1,  lon1,  bear1,  lat2,  lon2,  bear2) { //this one assumes negative W longitudes
	lat1 = deg2rad(lat1);
	lon1 = deg2rad(lon1);
	bear1 = deg2rad(bear1);
	lat2 = deg2rad(lat2);
	lon2 = deg2rad(lon2);
	bear2 = deg2rad(bear2);

	const coslat1 = Math.cos(lat1);
	const coslat2 = Math.cos(lat2);
	const sinlat1 = Math.sin(lat1);
	const sinlat2 = Math.sin(lat2);
	const sinbear1 = Math.sin(bear1);
	const sinbear2 = Math.sin(bear2);
	const cosbear1 = Math.cos(bear1);
	const cosbear2 = Math.cos(bear2);
	const coslon1 = Math.cos(lon1);
	const coslon2 = Math.cos(lon2);
	const sinlon1 = Math.sin(lon1);
	const sinlon2 = Math.sin(lon2);

	//find vector1
	const a = [
		sinlon1*cosbear1 - sinlat1*coslon1*sinbear1,
		-coslon1*cosbear1 - sinlat1*sinlon1*sinbear1,
		coslat1*sinbear1
	];

	//find vector2
	var b = [
		sinlon2*cosbear2 - sinlat2*coslon2*sinbear2,
		-coslon2*cosbear2 - sinlat2*sinlon2*sinbear2,
		coslat2*sinbear2
	];	

	//now take cross products
	var n1 = [
		a[1]*b[2] - a[2]*b[1],
		-(a[0]*b[2] - a[2]*b[0]),
		a[0]*b[1] - a[1]*b[0]
	];

	var n2 = [
		b[1]*a[2] - b[2]*a[1],
		-(b[0]*a[2] - b[2]*a[0]),
		b[0]*a[1] - b[1]*a[0]
	];

	//back to lat.lon

	var int_lat1 = Math.atan2(n1[2], Math.sqrt(n1[0]*n1[0] + n1[1]*n1[1]));
	var int_lon1 = (Math.atan2(n1[1], n1[0]));

	var int_lat2 = (Math.atan2(n2[2], Math.sqrt(n2[0]*n2[0] + n2[1]*n2[1])));
	var int_lon2 = (Math.atan2(n2[1], n2[0]));

	//great circle distances to each
	//not using gc_dist function becuase values are already in radians

	var a2 = Math.pow( Math.sin((int_lat2-lat1)/2), 2) + coslat1 * Math.cos(int_lat2) * Math.pow( Math.sin(int_lon2-lon1)/2, 2);
	var c2 = 2* Math.atan2(Math.sqrt(a2), Math.sqrt(1-a2));
	
	var a1 = Math.pow( Math.sin((int_lat1-lat1)/2), 2) + coslat1 * Math.cos(int_lat1) * Math.pow( Math.sin(int_lon1-lon1)/2, 2);
	var c1 = 2* Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));

	if (c2<c1) { //then pick the shortest
		return earth_radius * c2;	
	}else{
		return earth_radius * c1;
	}
}

module.exports = {getAllPaths};