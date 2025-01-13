const earth_radius = 6370;
const am_dist_ratio = 1.07;
const pi=3.1415927;
const j = [0,1];
const speed_of_light = 299792.5;
const refractivity = .000315;
const radius_factor = 1.333333;

const c_in_air = speed_of_light / (1 + refractivity);
const adjusted_earth_radius = earth_radius*radius_factor;

const a0 = [2.3381074, 4.0879494, 5.5205598, 6.7867081, 7.9441336, 9.0226508, 10.0401743, 11.0085243, 11.9360156, 12.8287767];
const a1 = [1.0187930, 3.2481976, 4.8200992, 6.1633074, 7.3721773, 8.4884867, 9.5354491, 10.5276604, 11.4750566, 12.3847884];

const am_distances = [.1,.108325,.11665,.124975,.1333,.144425,.15555,.166675,.1778,.192625,.20745,.222275,.2371,.256875,.27665,.296425,.3162,.342575,.36895,.395325,.4217,.45685,.492,.52715,.5623,.6092,.6561,.703,   .7499,.812425,.87495,.937475,1.0,1.08325,1.1665,1.24975,1.333,   1.44425,1.5555,1.66675,1.778,1.92625,2.0745,2.22275,2.371,2.56875,   2.7665,2.96425,3.162,3.42575,3.6895,3.95325,4.217,4.5685,4.92,   5.2715,5.623,6.092,6.561,7.03,7.499,8.12425,8.7495,9.37475,10.0,   10.835,11.67,12.505,13.34,14.45,15.56,16.67,17.78,19.2625,20.745,   22.2275,23.71,25.6875,27.665,29.6425,31.62,34.2575,36.895,39.5325,   42.17,45.685,49.2,52.715,56.23,60.92,65.61,70.3,74.99,81.2425,   87.495,93.7475,100.0,108.3375,116.675,125.0125,133.35,144.47,155.59,   166.71,177.83,192.6575,207.485,222.3125,237.14,256.9125,276.685,   296.4575,316.23,342.5975,368.965,395.3325,421.7,456.86,492.02,   527.18,562.34,609.2275,656.115,703.0025,749.89,812.4175,874.945,   937.4725,1000.0,1083.38,1166.76,1250.14,1333.52,1444.71,1555.9,   1667.09,1778.28,1926.55253,2074.82505,2223.09758,2371.3701,2569.09758,2766.82505,2964.55253,3162.28,3425.95255,3689.6251,3953.29765,4216.9702,4568.5802,4920.1902,5000.0];

const am_sigmas = [0.1,0.5,1,1.5,2,3,4,5,6,7,8,10,15,20,30,40,5000];

const am_frequencies = {
	"540":540,
	"550":540,
	"560":540,
	"570":570,
	"580":570,
	"590":570,
	"600":600,
	"610":600,
	"620":600,
	"630":630,
	"640":630,
	"650":630,
	"660":660,
	"670":660,
	"680":660,
	"690":690,
	"700":690,
	"710":690,
	"720":720,
	"730":720,
	"740":720,
	"750":720,
	"760":720,
	"770":770,
	"780":770,
	"790":770,
	"800":770,
	"810":770,
	"820":820,
	"830":820,
	"840":820,
	"850":820,
	"860":820,
	"870":870,
	"880":870,
	"890":870,
	"900":870,
	"910":870,
	"920":920,
	"930":920,
	"940":920,
	"950":920,
	"960":920,
	"970":970,
	"980":970,
	"990":970,
	"1000":970,
	"1010":970,
	"1020":970,
	"1030":970,
	"1040":1040,
	"1050":1040,
	"1060":1040,
	"1070":1040,
	"1080":1040,
	"1090":1040,
	"1100":1040,
	"1110":1110,
	"1120":1110,
	"1130":1110,
	"1140":1110,
	"1150":1110,
	"1160":1110,
	"1170":1110,
	"1180":1180,
	"1190":1180,
	"1200":1180,
	"1210":1180,
	"1220":1180,
	"1230":1180,
	"1240":1180,
	"1250":1250,
	"1260":1250,
	"1270":1250,
	"1280":1250,
	"1290":1250,
	"1300":1250,
	"1310":1250,
	"1320":1250,
	"1330":1250,
	"1340":1340,
	"1350":1340,
	"1360":1340,
	"1370":1340,
	"1380":1340,
	"1390":1340,
	"1400":1340,
	"1410":1340,
	"1420":1340,
	"1430":1430,
	"1440":1430,
	"1450":1430,
	"1460":1430,
	"1470":1430,
	"1480":1430,
	"1490":1430,
	"1500":1430,
	"1510":1430,
	"1520":1520,
	"1530":1520,
	"1540":1520,
	"1550":1520,
	"1560":1520,
	"1570":1520,
	"1580":1520,
	"1590":1520,
	"1600":1520,
	"1610":1610,
	"1620":1610,
	"1630":1610,
	"1640":1610,
	"1650":1610,
	"1660":1610,
	"1670":1610,
	"1680":1610,
	"1690":1610,
	"1700":1610
};

//Functions
function validAz(bear1, bear2, interval) {
	output = [];

	// angleBetween = rad2deg(Math.acos( Math.cos(deg2rad(bear2 - bear1))));
	
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
	// console.log(bear1, bear2, angleBetween, output);
	return output;
}

function getAllPaths(start_coord, interval, max_distance, conductivity) {
	var interestingLines={};
	var azimuths=[];
	start_coord[1] = Math.abs(start_coord[1]);
	for (var i=0; i<360; i+=interval) {  //generate the set of azimuths for study
		azimuths.push(i);
		interestingLines[i]=[];
	}
	if (!conductivity) conductivity = m3data;
	conductivity.data.forEach(line => { //for each line in m3, find the bearings to the endpoints
		bear2 = gc_bear(start_coord[0], start_coord[1],line[3],line[4]);
		bear1 = gc_bear(start_coord[0], start_coord[1],line[1],line[2]);
		// if (!line[7]) line[7] = gc_bear(line[1],line[2],line[3],line[4]);
		// dist2 = gc_dist(start_coord[0], start_coord[1],line[3],line[4]);
		// dist1 = gc_dist(start_coord[0], start_coord[1],line[1],line[2]);

		// if (dist1 > max_distance && dist2 > max_distance) return;

		valid_azimuths = validAz(bear1, bear2, interval);

		valid_azimuths.forEach(azimuth => { //for each of the azimuths under study, check to see if this segment interests and is in range; if so, push it to a holding array.  Doing it this way saves a bunch of expensive recalculating of bearings to the endpoints to get the entire set of paths.
			// if (az_lies_between(azimuth, bear1, bear2)) {
					var intersect_dist1 = gc_intersect_dist(start_coord[0], -start_coord[1],azimuth,line[1],-line[2],line[7]); //this needs negative West longitudes
					if (intersect_dist1 <= max_distance) {
						//To find the which of the conductivities should be used, we need the orientations and relationship of the conductivity segment and the intersection with the test radial.  For the conductivity segment we use a rhumb-line (so that equal latitude points are oriented perfectly east-west.  This is the border condition of the M3 file ... great circle would say slightly more or less than 90/270 and that would change the conductivity)
						// We also need the great-circle bearing of the test azimuth at the point of intersection ... since bearings change along great-circle paths.
						const intersectionPoint = gc_dest(start_coord[0], -start_coord[1], intersect_dist1, azimuth);
						// console.log(azimuth,line[0],intersectionPoint);
						var orientation = segmentOrientation(rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, azimuth), gc_bear(intersectionPoint[1], -intersectionPoint[0], line[3], line[4]));
						interestingLines[azimuth].push([line[0],line[5],line[6],intersect_dist1, orientation, rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, azimuth)]);
					}
		    // }
		});
	});
	// console.log("interestingLines", interestingLines);
	var output={};
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

			path_pairs.push([segment_length, segment_sigma,  segment[3]]);
		});
		var remaining_distance = max_distance - previous_distance;
		if (remaining_distance > 0) { //if there's still space after the final detected intersection, fill in with the backside of the last segment.
			path_pairs.push([remaining_distance, last_sigma, max_distance]);
		}
		output[az] = path_pairs;
	});
	// console.log("paths", output);
	return output;
}

function getPath(start_coord, azimuths, max_distance, conductivity) { 
	// console.log(azimuths, max_distance);
	/*given a point of origin and an azimuth, return an array of distances and ground conductivities.
	The process comes from the old fortran stuff;  
	Step 1: find the bearings to the two end points of each conductivity segment
	Step 2: If the azimuth under test is between those two bearings, check the distance to the intersecition of the segment and the azimuth
	Step 3: If the distance is within the maximum test the next step is to find the orientation of the azimuth and the segment.  Each segment is labeled with two condictivities; one for the North/East side, and a second for the South/West side.  The segmentOrientation routine is used to determine the angle at which the azimuth intersects, and from there determine which conductivity comes first.
	Step 4: The segments that intersect within the distance are aggregated, then sorted by distance and built into the "Path Pairs" array for use by the Kirke Method routine.
	*/
	var interestingLines=[];
	for (var x=0; x < azimuths.length; x++) {
		interestingLines.push(Array());
	}
	// azimuths.forEach(azimuth => interestingLines[azimuth]=[]);
	// var azimuths=[];
	start_coord[1] = Math.abs(start_coord[1]);
	// azimuths.push(azimuth);
	if (!conductivity) conductivity = m3data;
	conductivity.data.forEach(line => { //for each line in m3, find the bearings to the endpoints
		var bear2 = gc_bear(start_coord[0], start_coord[1],line[3],line[4]);
		var bear1 = gc_bear(start_coord[0], start_coord[1],line[1],line[2]);
		// // if (!line[7]) {
		// 	line[7] = gc_bear(line[1],line[2],line[3],line[4]);
		// 	line[8] = gc_bear(line[3],line[4],line[1],line[2]);
		// // }
		// azimuths.forEach(az => { //for each of the azimuths under study, check to see if this segment interests and is in range; if so, push it to a holding array.  Doing it this way saves a bunch of expensive recalculating of bearings to the endpoints to get the entire set of paths.
		for (var x=0; x<azimuths.length; x++) {
			const az = azimuths[x];
			if (az_lies_between(az, bear1, bear2)) {
					var intersect_dist1 = gc_intersect_dist(start_coord[0], -start_coord[1],az,line[1],-line[2],line[7]); //this needs negative West longitudes
					if (intersect_dist1 <= max_distance) {
						//To find the which of the conductivities should be used, we need the orientations and relationship of the conductivity segment and the intersection with the test radial.  For the conductivity segment we use a rhumb-line (so that equal latitude points are oriented perfectly east-west.  This is the border condition of the M3 file ... great circle would say slightly more or less than 90/270 and that would change the conductivity)
						// We also need the great-circle bearing of the test azimuth at the point of intersection ... since bearings change along great-circle paths.
						const intersectionPoint = gc_dest(start_coord[0], -start_coord[1], intersect_dist1, az);
						// console.log(azimuth,line[0],intersectionPoint);
						var orientation = segmentOrientation(rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, az), gc_bear(intersectionPoint[1], -intersectionPoint[0], line[3], line[4]));
						interestingLines[x].push([line[0],line[5],line[6],intersect_dist1, orientation, rhumb_bearing(line[1],line[2],line[3],line[4]), gc_final(start_coord[0], start_coord[1], intersect_dist1, az)]);
					}
		    }

		};
	});
	// console.log("interestingLines", interestingLines);
	var output=[];
	// azimuths.forEach( az => { //with the initial step complete, now for each azimuth organize and format the results for output
	for (var az=0; az<azimuths.length; az++) {
		// console.log(az);
		var segments = interestingLines[az];
	    segments.sort(sortLines); ///sort useful lines by ascending distance from origin

		var path_pairs=[];
		var previous_distance=0;
		var last_sigma = 5000;
		var previous_sigma=0;
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
			path_pairs.push([segment_length, segment_sigma,  segment[3], segment]);
		});
		var remaining_distance = max_distance - previous_distance;
		if (remaining_distance > 0) { //if there's still space after the final detected intersection, fill in with the backside of the last segment.

			path_pairs.push([remaining_distance, last_sigma, max_distance]);
		}
		output.push(path_pairs);
	};
	// console.log("paths", output);
	return output;
}

function validate(dist, lat, lon, interval) {
	var errors=0;

	if (!(dist>0)) errors++;
	if (!lat) errors++;
	if (!lon) errors++;
	if (!interval) errors++
	if (errors > 0) {
		console.log(errors + " Input Errors Occurred");
		return false;
	}else{
		return true;
	}
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
	// lat1 = deg2rad(lat1);
	// lon1 = -deg2rad(lon1);
	// lat2 = deg2rad(lat2);
	// lon2 = -deg2rad(lon2);


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

function gcMidpoint(lat1, lon1, lat2, lon2) { //great circle midpoint
	const dist = gc_dist(lat1, lon1, lat2, lon2);
	const bearing = gc_bear(lat1, lon1, lat2, lon2);
	const dest = gc_dest(lat1, lon1, dist/2, bearing);
	return {
		lat: dest[1],
		lon: dest[0]
	}
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

function az_lies_between(az, bear1, bear2) {
	//included angle
	const includedAngle = 180 - Math.abs(180 - Math.abs(bear1 - bear2) % 360);
	//now find the angle between the test azimuth and the first bearing, and the test az and the second bearing.
	const angle1 = 180 - Math.abs(180 - Math.abs(az - bear2) % 360);
	const angle2 = 180 - Math.abs(180 - Math.abs(bear1 - az) % 360);
	// console.log(includedAngle, angle1, angle2);

	return (angle1 + angle2 <= includedAngle);
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

function field_at_distance( frequency,  sigma,  erp,  distance,  field) {
	sigma = sigma.toString();
	if (frequency < 2) {
		frequency *= 1000;
	}
	var effectiveFreq = am_frequencies[frequency].toString();
	var curves = am_gw_curves[effectiveFreq][sigma];
	if (!curves) {
		console.log("Error Retrieving Curve: ", effectiveFreq, sigma);
		return -1;
	}

	const distMatch = (element) => element > distance;
	// console.log(curves);

	const distance_index = am_distances.findIndex(distMatch);
	const dist1 = am_distances[distance_index-1];
	const dist2 = am_distances[distance_index];
	const field1 = curves[distance_index-1];
	const field2 = curves[distance_index];
	const result = Math.sqrt(erp) * log_interpolate(dist1, dist2, field1, field2, distance) * field / 100.;
	// console.log("fad",effectiveFreq, distance, distance_index, dist1, dist2, field1, field2, result);

	return result;
}

function sigmaFromMeasurement(frequency, erp, distance, field, radiation) {
	if (frequency < 2) {
		frequency *= 1000;
	}
	var effectiveFreq = am_frequencies[frequency].toString();
	var sigmas = Object.keys(am_gw_curves[effectiveFreq]);
	var sigmabelow = 0;
	var sigmaabove = 5000;
	var fieldbelow = 0;
	var fieldabove = Infinity;
	sigmas.forEach( (sigma) => {
		var test_field = field_at_distance(frequency, sigma, erp, distance, radiation);
		console.log(sigma, test_field);
		if (test_field < field) {
			sigmabelow = Math.max(sigmabelow, sigma);
			fieldbelow = Math.max(fieldbelow, test_field);
		}else if (test_field > field) {
			sigmaabove = Math.min(sigmaabove, sigma);
			fieldabove = Math.min(fieldabove, test_field);
		}else {
			sigmaabove = sigma;
			sigmabelow = sigma;
			fieldabove = test_field;
			fieldbelow = test_field;
		}
	});
	const sigma = semilog_interpolate(fieldbelow, fieldabove, sigmabelow, sigmaabove, field);

	return {sigma: sigma, x1: fieldbelow, x2: fieldabove, y1: sigmabelow, y2: sigmaabove};
}

function log_interpolate(x1, x2,  y1,  y2, xi) {
	return Math.pow(10,(Math.log10(y1) + (Math.log10(xi) - Math.log10(x1)) * (Math.log10(y2) - Math.log10(y1))/(Math.log10(x2)-Math.log10(x1)) ));
}

function semilog_interpolate(x1, x2,  y1,  y2, xi) {
	if (x2 != x1) return Math.pow(10,(Math.log10(y1) + (xi - x1) * (Math.log10(y2) - Math.log10(y1))/((x2)-(x1)) ));
	// if (($x2 - $x1) != 0) return pow(10,(log10($y1) + ($xi - $x1) * (log10($y2) - log10($y1))/($x2-$x1) ));
	else return y1;
}

function linear_interpolate(x1, x2,  y1,  y2, xi) {
	if (x2 != x1) return ((y1 + (xi - x1) * ((y2) - (y1))/((x2)-(x1)) ));
	// if (($x2 - $x1) != 0) return pow(10,(log10($y1) + ($xi - $x1) * (log10($y2) - log10($y1))/($x2-$x1) ));
	else return y1;
}

function distance_at_field( frequency,  sigma,  erp,  target,  field) {
	//float eff_field = target * sqrt(erp) * field / 100;
	const eff_field = 100 * target / (Math.sqrt(erp) * field);
	sigma = sigma.toString();

	if (frequency < 2) {
		frequency *= 1000;
	}
	var effectiveFreq = am_frequencies[frequency].toString();

	var curves = am_gw_curves[effectiveFreq][sigma];
	if (!curves) {
		console.log("Error Retrieving Curve: ", effectiveFreq, sigma);
		curves = am_gw_curves[effectiveFreq]["5000"];
		// return -1;
	}
	const fieldMatch = (element) => element < eff_field;

	distance_index = curves.findIndex(fieldMatch);
	if (distance_index > 0 && distance_index <= 160) { 
		const dist1 = am_distances[distance_index-1];
		const dist2 = am_distances[distance_index];
		const field1 = curves[distance_index-1];
		const field2 = curves[distance_index];
		const result = log_interpolate(field1, field2, dist1, dist2, eff_field);
		// console.log("daf",effectiveFreq, eff_field, distance_index, dist1, dist2, field1, field2, result);
		return result;
	}else{
		return -1;
	}
}

function kirke(rms,  frequency,  target,  path_pairs) {

	var distance;
	var total_distance=0;
	var remaining_field = rms;
	const segments = path_pairs.length;
	// console.log(rms,  frequency,  target,  path_pairs, segments);

	//printf("rms: %f, frequency: %f, target: %f, segments: %u\n",rms, frequency, target, segments);
	for (var i=0; i<segments; i++){
		var equivalent_distance = 0;
		const segment = path_pairs[i];
		if (total_distance > 0) {
			equivalent_distance = distance_at_field(frequency, segment[1], 1, remaining_field, rms);
		}
		//test full segment
		const test_distance = equivalent_distance + segment[0];
		const field_at_test_distance = field_at_distance(frequency, segment[1], 1, test_distance, rms);
		//printf("total_distance: %f, remaining_field: %f, equivalent_distance: %f, test_distance: %f, test_field: %f,length: %f, sigma: %f\n",total_distance, remaining_field,equivalent_distance, test_distance, field_at_test_distance, segment[0], segment[1]);
		if (Math.abs( (field_at_test_distance - target)/target ) < .001) {
			//solution lies at the end of this segment
			total_distance += segment[0];
			return total_distance;
		}else if (field_at_test_distance <= target) {
			//solution lies within this segment
			const equivalent_total = distance_at_field(frequency, segment[1], 1, target, rms);
			total_distance +=  equivalent_total - equivalent_distance;
			//printf("equivalent_total: %f, total_distance: %f\n", equivalent_total, total_distance);
			return total_distance;
		}else{
			total_distance += segment[0];
			remaining_field = field_at_test_distance;
		}
	}
	
	return 1300;
}

function kirkeFieldIterative(rms, frequency, remainingDistance, path_pairs) {
	var targetField = .5;
	var testDistance = 0;
	var error=0;
	for (var x=0; x<50; x++) {
		testDistance = kirke(rms, frequency, targetField, path_pairs);
		error = testDistance/remainingDistance;
		if ( Math.abs(1 - error) < 0.001) {
			console.log(x, "iterations");
			return targetField;
		}
		targetField *= Math.pow(error, 2);
		// console.log(targetField, testDistance, remainingDistance, error);
	}
	return -1;
}

function kirkeField(rms, frequency, remainingDistance, path_pairs) {
	const segments = path_pairs.length;

	// console.log(path_pairs);
	var equivalentDistance = 0;
	var otherDistance = 0;
	var remainingField = rms;

	//find the segment where the place is
	const terminalSegment = path_pairs.find( (segment) => segment[2] >= remainingDistance);
	const otherSegments = path_pairs.filter( (segment) => segment[2] < remainingDistance);

	// console.log("Terminal Segment", terminalSegment);
	// console.log("Other Segments", otherSegments);
	//for each initial segment, find the equivalent distance at the final conductivity.

	otherSegments.forEach( (segment) => {
		if (otherDistance > 0) {
			equivalentDistance = distance_at_field(frequency, segment[1], 1, remainingField, rms);
		}
		otherDistance += segment[0];
		remainingField = field_at_distance(frequency, segment[1], 1, equivalentDistance + segment[0], rms);
		// console.log(otherDistance, remainingField);
	});

	// now, find the final field of the station at the equivalent distance PLUS the internal segment distance.
	const finalSegmentDistance = remainingDistance - otherDistance;
	equivalentDistance = distance_at_field(frequency, terminalSegment[1], 1, remainingField, rms);
	remainingField = field_at_distance(frequency, terminalSegment[1], 1, equivalentDistance + finalSegmentDistance, rms);
	// console.log(equivalentDistance, finalSegmentDistance, remainingField);

	return remainingField;
}

function rel_to_fix(rel_tower, last_tower) {

	space1 = deg2rad(rel_tower.spacing);
    space2 = deg2rad(last_tower.spacing);
    dir1 = deg2rad(rel_tower.orientation);
    dir2 = deg2rad(last_tower.orientation);
    x1 = space1 * Math.sin(dir1);
    y1 = space1 * Math.cos(dir1);
    x2 = space2 * Math.sin(dir2);
    y2 = space2 * Math.cos(dir2);

    space_out = rad2deg(Math.sqrt(Math.pow(x1+x2,2) + Math.pow(y1+y2,2)));
    if (Math.abs(y1 + y2)) dir_out = rad2deg(Math.atan( (x1+x2) / (y1+y2)));
    else {
		rel_tower.spacing=0;
		rel_tower.orientation=0;
	};

    if ((y1+y2) < 0) dir_out += 180;
    while(dir_out < 0) dir_out += 360;

	rel_tower.spacing=space_out;
	rel_tower.orientation=dir_out;
	rel_tower.ref_switch=0;
    return;
}

function am_contour(antenna, frequency, interval, target) {
	//target is object: field, model, mode if SW 
	// console.log(antenna);
	var output = {};
	var da_field, distance, sw_result;

	target.conductivity = target.conductivity ?? "m3";

	if (target.conductivity !== "m3") {
		antenna.paths = antenna.paths ?? getAllPaths([antenna.lat, antenna.lon], 1, 1300, r2data);	
	}else{
		antenna.paths = antenna.paths ?? getAllPaths([antenna.lat, antenna.lon], 1, 1300, m3data);
	}

	output["type"] = "Feature";
	output["properties"] = {};
	output["geometry"] = {};
	output["geometry"]["type"] = "Polygon";
	output["geometry"]["coordinates"] = [];
	output["geometry"]["coordinates"][0] = [];
	output["paths"] = antenna.paths;
	output.properties["distances"] = [];
	// output.properties["fields"] = [];
	output.properties.id = antenna.hours + target.field + target.model + (target.mode ?? '');
	for (var az=0; az<360; az+=interval) {
		switch(target.model) {
			case "R210":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'R2', mode: 10});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "R250":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'R2', mode: 50});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "MEX10":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'MEX', mode: 10});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "MEX50":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'MEX', mode: 50});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "CAN10":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'CAN', mode: 10});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "CAN50":
				sw_result = skywaveDistance(antenna, az, target.field, {curve: 'CAN', mode: 50});
				distance = sw_result.distance;
				da_field = sw_result.field;
				break;
			case "SW10":
			case "GRID10":
				sw_result = usSkywaveDistance(antenna, az, target.field, 10);
				distance = sw_result.distance;
				da_field = sw_result.field;
				var gw_field;
				if (antenna.dir_ind=='Y') {
					gw_field = da_augmented(antenna, az, 0); 
					// console.log("da_theoretical", antenna.towers, antenna.k, az, 0, da_field);
				}else{
					gw_field = antenna.rms_theo * Math.sqrt(Number(antenna.power));
				}
				distance = Math.max(distance, kirke(gw_field,frequency,target.field,antenna.paths[az]));
				break;
			case "SW50":
			case "GRID50":
				sw_result = usSkywaveDistance(antenna, az, target.field, 50);
				distance = sw_result.distance;
				da_field = sw_result.field;
				var gw_field;
				if (antenna.dir_ind=='Y') {
					gw_field = da_augmented(antenna, az, 0); 
					// console.log("da_theoretical", antenna.towers, antenna.k, az, 0, da_field);
					console.log("aug");
				}else{
					gw_field = antenna.rms_theo * Math.sqrt(Number(antenna.power));
				}
				distance = Math.max(distance, kirke(gw_field,frequency,target.field,antenna.paths[az]));
				break;
			case "G":
				if (antenna.dir_ind=='Y') {
					da_field = da_augmented(antenna, az, 0); 
					// console.log("da_theoretical", antenna.towers, antenna.k, az, 0, da_field);
				}else{
					da_field = antenna.rms_theo * Math.sqrt(Number(antenna.power));
				}
				distance = kirke(da_field,frequency,target.field,antenna.paths[az]);
				break;
			default:
				console.error(target.model);
				return -1;
		}

		output.properties.distances.push({
			azimuth: az,
			distance: distance,
			field: da_field,
			skywave: sw_result
		});
		output["geometry"]["coordinates"][0].push(gc_dest(antenna.lat, antenna.lon, distance, az));
	}
	output["geometry"]["coordinates"][0].push(output["geometry"]["coordinates"][0][0]); //repeat last point
	return output;
}

function find_ftheta(tower, theta) {
	// double A,B,C,D,G,H,Delta,term1,term2,term3, costhe, sinthe;
	//Each Tower: 
	//0 field_ratio 
	//1 spacing 
	//2 orientation 
	//3 phasing 
	//4 height 
	//5 type 
	//6 A 
	//7 B 
	//8 C 
	//9 D

	theta = deg2rad(theta);
	const costhe = Math.cos(theta);
	const sinthe = Math.sin(theta);
	switch(tower.tl_type) {
		case "NON":
			// G = deg2rad(tower[4]);
			// return ((cosf(G * sinf(theta)) - cosf(G)) / ((1-cosf(G)) * cosf(theta)));
			{	
				G = deg2rad(tower.height);
				const coshi = Math.cos(G);
		      	const denominator = (1 - coshi) * costhe;
		      	return (Math.cos(G * sinthe) - coshi) / denominator;
	      	}
			break;
		case "TOP":
			A = deg2rad(tower.a);
			B = deg2rad(tower.b);
			G = A+B;
			return (( Math.cos(B)*Math.cos(A*Math.sin(theta)) - Math.sin(theta)*Math.sin(B)*Math.sin(A*Math.sin(theta)) - Math.cos(A+B) ) / ( Math.cos(theta)*(Math.cos(B) - Math.cos(A+B)) ));
			break;
		case "SEC":
			A = deg2rad(tower.a);
			B = deg2rad(tower.b);
			C = deg2rad(tower.c);
			D = deg2rad(tower.d);
			G = A+B;
			H = C+D;
			Delta = H - A;
			term1 = Math.sin(Delta) * ( Math.cos(B)*Math.cos(A * Math.sin(theta)) - Math.cos(G) );
			term2 = Math.sin(B) * ( Math.cos(D)*Math.cos(C * Math.sin(theta)) - Math.sin(theta)*Math.sin(D)*Math.sin(C*Math.sin(theta)) - Math.cos(Delta)*Math.cos(A*Math.sin(theta)) );
			term3 = Math.cos(theta) * ( Math.sin(Delta) * (Math.cos(B) - Math.cos(G)) + Math.sin(B) * (Math.cos(D) - Math.cos(Delta)) );
			return (term1 + term2)/term3;
			break;
		case "KFBK": //KFBK
			/*     THIS CALCULATION IS FOR CASE 1 OF HEADS FORMULA IN THE JASIK*/
			/*       HANDBOOK OF ANTENNAS FOR SECTIONALIZED ANTENNAS*/
			/*     WHEN NFORK = 4 INPUT DATA IS H  = 0*/
			/*                         F1 = HEIGHT OF THE BOTTOM SECTION*/
			A = deg2rad(tower.a);
			B = A + 1.57079632675;
			term1 = costhe * (3.0 - Math.cos(A));
			if (term1 == 0) {
				cerr << "Can't divide by zero\n";
				return -1;
			}
			term2 = (2 * Math.cos(1.57079632675 * sinthe) * Math.cos(B * sinthe) + Math.cos(A * sinthe) - Math.cos(A));
			return term2 / term1;
			break;
		case "WHO": //WHO
			/*     THIS FORMULA IS FROM APPENDIX EXHIBIT 7 OF THE DECEMBER 14, 1951,*/
			/*     FILING FOR WHO, DES MOINES, IOWA, 1040 KHZ.*/
			/*     NOTE THAT IF F1 = F2, THIS REDUCES TO THE FORMULA FOR A REGULAR*/
			/*     TOWER*/
			/*     WHEN NFORK = 8, INPUT DATA IS*/
			/*                  H  = UNUSED*/
			/*                  F1 = HEIGHT OF LOWER ELEMENT OF ANTENNA*/
			/*                  F2 = TOTAL HEIGHT OF ANTENNA*/
			/*                  F3 = CURRENT RATIO OF THE LOOP CURRENTS IN THE TWO*/
			/*                       ELEMENTS*/
			/*                  F4 = UNUSED*/
			A = deg2rad(tower.a);
			B = deg2rad(tower.b);
			C = tower.c;

			term1 = (C * (1 - Math.cos(A)) + (1 - Math.cos(B-A))) * costhe;
			if (term1 == 0) {
				// cerr << "Can't divide by zero\n";
				console.error("Can't divide by zero", tower);
				return -1;
			}
			term2 = (C * (Math.cos(A * sinthe)-Math.cos(A)) + Math.cos(B*sinthe) - ( Math.cos(B-A)*Math.cos(A*sinthe) + Math.sin(B-A)*sinthe*Math.sin(A*sinthe) ));
			return term2/term1;
			break;
		case "WOC": //WOC
			/*     THIS FORMULA IS FROM A.D. RING AND ASSOCIATES AMENDED APPENDIX*/
			/*     A, DATED NOV 30,1954, TO ENGINEERING STATEMENT, AMENDMENT C,*/
			/*     DATED AUG 20,1954, SUPPORTING AN APPLICATION FOR MODIFICATION*/
			/*     OF C.P. OF STATION WOC, DAVENPORT, IOWA.*/
			/*     H IS THE OVERALL HEIGHT OF THE TOWER*/
			/*     F1 IS THE BOTTOM SECTION HEIGHT OF THE TOWER*/
			/*     F2 IS THE TOP SECTION HEIGHT OF THE TOWER*/
			/*     F3 IS THE SCALING FACTOR NECESSARY TO RATIO THE MAGNITUDE OF*/
			/*       F(THETA) TO 1.0 AT THETA=0.(FOR WOC,F3=6.81293)*/
			/*     F4 IS THE K1 IN THE A.D. RING FORMULA, THE ABSOLUTE RATIO OF*/
			/*       THE REAL COMPONENT OF CURRENT TO THE IMAGINARY COMPONENT*/
			/*       OF CURRENT AT THE POINT OF MAXIMUM AMPLITUDE. (FOR WOC,*/
			/*       F4=.380)*/
			//Check for Theta<=0, since the A.D. Ring equation will "Blow Up" at this value
			if (theta <= 0) {
				return 1;
			}

			G = 1.14;
			A = deg2rad(tower.a);
			B = deg2rad(tower.b);
			C = (tower.c);
			D = (tower.d);
			H = A+B;
			
			if (C == 0) {
				// cerr << "Can't divide by zero\n";
				return -1;
			}

			term1 = (2.*G*costhe / (Math.pow(G,2.) - Math.pow(sinthe,2.))) * (-Math.cos(G*(B-A)) + 2.*Math.cos(G*B)*Math.cos(A*sinthe) - Math.cos(H*sinthe));
			term2 = D * costhe * (Math.sin(H * sinthe) / sinthe + G / (Math.pow(G,2.0) - Math.pow(sinthe,2.0)) * (Math.sin(G * (B - A)) - 2 * Math.sin(G * B) * Math.cos(A * sinthe) + sinthe * (Math.sin(H * sinthe) / G)));
			// term2 = (sinthe * sin(H*sinthe)) / G;
			// term2 -= 2 * sin(G * B) * cos(A * sinthe);
			// term2 += sin(G * (B-A));
			// term2 *= G / (G*G - sinthe*sinthe);
			// term2 += (sin((H) * sinthe)) / sinthe;
			// term2 *= D * costhe;
			return Math.sqrt(Math.pow(term1,2.0) + Math.pow(term2,2.0)) / C;
			break;
		default:
			console.log("Bad Tower Description",tower);
	}
}

function find_k(towers, nominal_power) {
	towers = towers.filter( (tower) => tower.tower_id > 0);
	const no_loss_k = 244.86423 * Math.sqrt(nominal_power) / rms_hemi(towers);
	const p_loss = find_p_loss(towers, no_loss_k, 1.);
	// console.log(no_loss_k, p_loss, rms_hemi(towers), towers, nominal_power);
	return no_loss_k * Math.sqrt( (nominal_power)/(nominal_power+p_loss) );
}

function find_p_loss(towers, no_loss_k, resistance) {
	var total_loss = 0;
	for (var i=0; i<towers.length; i++) {
		const tower = towers[i];
		const tower_loss = resistance * Math.pow(find_loop_current(tower,no_loss_k),2) / 1000;
		// console.log(tower, tower_loss);
		total_loss += tower_loss;
	}
	return total_loss;
}

function rms_hemi(towers) {
	var rms_sum=0;
	var rms_elev;
	for (var elev=10; elev < 90; elev+=10) {
		rms_elev = rms_theta(towers, elev);
		rms_sum += Math.pow(rms_elev,2) * Math.cos(deg2rad(elev));
		// console.log("rms", rms_elev, rms_sum)
	}
	var output = Math.sqrt((pi*10/180) * (Math.pow(rms_theta(towers, 0),2)/2 + rms_sum));
	// console.log(output);
	output = Math.round(output * 10000)/10000;
	return output;
}

function find_loop_current(tower, no_loss_k) {
	if (tower.tl_type == 'NON') {
		const G = Number(tower.height);
		const no_loss_loop =  no_loss_k * Number(tower.ratio) / (59.958491 * (1 - Math.cos(deg2rad(G))));
		if (G < 90) {
			return no_loss_loop * Math.sin(deg2rad(G));
		}else{
			return no_loss_loop;
		}
	}else if (tower.tl_type == 'TOP') {
		const G = Number(tower.a) + Number(tower.b);
		const no_loss_loop =  no_loss_k * Number(tower.ratio) / (59.958491 * (Math.cos(deg2rad(Number(tower.b))) - Math.cos(deg2rad(G))));
		if (G < 90) {
			return no_loss_loop * Math.sin(deg2rad(G));
		}else{
			return no_loss_loop;
		}
	}
	else return 0;
}

function validateTowers(towers) {
	towers = towers.filter( (tower) => tower.tower_id);
	towers.forEach( (tower) => {
		tower.ratio = tower.ratio ?? 1;
		tower.phase = tower.phase ?? 0;
		tower.spacing = tower.spacing ?? 0;
		tower.orientation = tower.orientation ?? 0;
	});
	// console.log(towers);
	return towers;
}

function da_theoretical(antenna, azimuth, elev) {
		//Each Tower: 
	//0 ratio 
	//1 spacing 
	//2 orientation 
	//3 phase 
	//4 height 
	//5 type 
	//6 A 
	//7 B 
	//8 C 
	//9 D
	var total = [0,0];

	antenna.towers = validateTowers(antenna.towers);
	// console.log("theo towers:", antenna.towers);

	// console.log(antenna.k);
	// antenna.towers = antenna.towers.filter( (tower) => tower.tower_id > 0);

	// antenna.k = (antenna.k == NaN) ? applicant_k(antenna) : antenna.k ?? applicant_k(antenna);

	// console.log(antenna.k);
	if (!antenna.k) {
		// console.error("K is", antenna.k, antenna);
		antenna.k = applicant_k(antenna);
		// console.error("K is", antenna.k, antenna);
	}

	for (var x = 0; x<antenna.towers.length; x++) {
		tower = antenna.towers[x];

		if (!tower.tower_id) {
			console.log("Skipping Tower");
		}else{
			//de-reference towers
			if (tower.ref_switch == 1 && tower.tower_id > 1) {
				rel_to_fix(tower, antenna.towers[x-1]);
			}

			const magnitude = Number(tower.ratio) * find_ftheta(tower,elev);
			const phase = deg2rad(Number(tower.spacing) * Math.cos(deg2rad(elev)) * Math.cos(deg2rad(Number(tower.orientation) - azimuth)) + Number(tower.phase));
			// console.log(magnitude, phase);
			total[0] += magnitude * Math.cos(phase);
			total[1] += magnitude * Math.sin(phase);
		}
	}
	// console.log(total, Math.sqrt( Math.pow(total[0],2) + Math.pow(total[1],2)), Number(antenna.k));
	output = Number(antenna.k) * Math.sqrt( Math.pow(total[0],2) + Math.pow(total[1],2) );
	return Math.round(100 * output) / 100;
}

function da_standard(antenna, azimuth, elev) {
	var maxq = find_q(antenna, elev);
	if (elev==0 && antenna.specified_q) maxq = antenna.specified_q; 
	// console.log(maxq);
	var e_th = da_theoretical(antenna, azimuth, elev);
	return Math.round(105 * Math.sqrt(Math.pow(e_th,2) + Math.pow(maxq,2)))/100;
}

function da_augmented(antenna, azimuth, elev) {
	// console.log(antenna.aug_limit);
	var e_std = da_standard(antenna, azimuth, elev);
	var e_aug = e_std;
	if (antenna.augs) {
		var g_theta = find_gtheta(antenna, elev);
		for (var n = 0; n < (antenna.aug_limit ?? antenna.augs.length); n++) {
			var D_a = Math.abs(azimuth - antenna.augs[n].az);
			if (D_a > 180) D_a = 360 - D_a;
			var S = antenna.augs[n].span;
			if (D_a < (S/2)) {
				let test_antenna = {...antenna};
				test_antenna.aug_limit = n;
				var e_std_0 = da_augmented(test_antenna, antenna.augs[n].az, 0);
				var A =  (Math.pow(antenna.augs[n].rad,2) - Math.pow(e_std_0,2));
				e_aug = (Math.pow(e_aug,2) + A * Math.pow((g_theta * Math.cos(deg2rad(180*D_a/S))),2));
				if (e_aug < 0) {
					e_aug = da_theoretical(antenna, azimuth, elev);
					console.log("negative augmentation");
				}else{
					e_aug = Math.max(Math.sqrt(e_aug), da_theoretical(antenna, azimuth, elev));
				}
			}
		}
	}
	return e_aug;
}

function find_q(antenna, elev) {
	var erss = find_erss(antenna);
	var gtheta = find_gtheta(antenna, elev);
	var q1 = .025 * erss * gtheta;
	var q2 = 10 * Math.sqrt(antenna.power) * gtheta;
	// console.log(erss, gtheta, q1, q2);
	return Math.max(q1, q2);
}

function find_erss(antenna) {

	if (!antenna.k || isNaN(antenna.k)) antenna.k = applicant_k(antenna);

	var total = 0;
	// for (int x=0; x<antenna.towers.length; x++) {
	// 	total += powf(tower_array[x][0],2);
	// }
	antenna.towers.forEach( (tower) => {
		// console.log(tower);
		total += Math.pow(tower.ratio, 2);
		// console.log(total);
	});

	return antenna.k * Math.sqrt(total);
}

function find_gtheta(antenna, elev) {
	var min_tower;
	// antenna.towers.forEach(function(tower) {
	for (x=0; x < antenna.towers.length; x++) {
		tower = antenna.towers[x];
		switch(tower.tl_type) {
			case "TOP":
			case "SEC":
				tower.height = Number(tower.a) + Number(tower.b);
				break;
			default:
				break;
		}
		if (!min_tower) min_tower = tower;
		else if (tower.height < min_tower.height) min_tower = tower;
		// console.log(min_tower);
	}
	//cerr << "Min Tower Height: " << min_tower[4] << endl;
	var ftheta = find_ftheta(min_tower,elev);
	if (min_tower.height > 180){
		return Math.sqrt(Math.pow(ftheta,2) + .0625)/1.030776;
	}else{
		return ftheta;
	}
}

function theo_rms(antenna) {
	var total=0;
	for (var az=0; az<360; az+=5) {
		total += Math.pow(da_theoretical(antenna, az, 0),2);
	}
	return Math.sqrt(total/72);
}

function applicant_k(antenna) {
	const k = find_k(antenna.towers,Number(antenna.power));
	antenna.towers = validateTowers(antenna.towers);
	// console.log(k, antenna.towers,Number(antenna.power));
	test_antenna = {...antenna};
	test_antenna.k = k;
	return k * Number(antenna.rms_theo) / theo_rms(test_antenna);
}

function fact(k) {
	k = Math.floor(k);
	var output=1;
	while(k>0) {
		output *= k--;
	}
	return output;
}

function bessel(sijcos) {
	const sijcsq = Math.pow((sijcos),2);
	var btest=1;
	var bess=1;
	for(var k=1; k<25; k++) {
		btest *= sijcsq / (4.0 * Math.pow(k,2));
		bess += Math.pow(-1,k) * btest;
		if(Math.abs(btest) < .000001) return bess;
	}
	//cerr << sijcos << ": " << bess << endl;
	return bess;
}

function tower_distance(tower_i, tower_j) {
	// double ix,iy,jx,jy;
	// ix = deg2rad(tower_i[1]) * sin(deg2rad(tower_i[2]));
	// iy = deg2rad(tower_i[1]) * cos(deg2rad(tower_i[2]));
	// jx = deg2rad(tower_j[1]) * sin(deg2rad(tower_j[2]));
	// jy = deg2rad(tower_j[1]) * cos(deg2rad(tower_j[2]));

	// //fprintf(stderr, "%f, %f --> %f, %f = %f\n", ix,iy,jx,jy,sqrt( pow(ix-jx,2) + pow(iy-jy,2)));
	// return sqrt( pow(ix-jx,2) + pow(iy-jy,2));

	//law of cosines
	const temp = Math.pow(deg2rad(tower_i.spacing),2) + Math.pow(deg2rad(tower_j.spacing),2) - 2 * deg2rad(tower_i.spacing)*deg2rad(tower_j.spacing) * Math.cos(deg2rad(tower_i.orientation) - deg2rad(tower_j.orientation));
	return Math.sqrt(temp);
}

function rms_theta(towers, elev) {
	var rms_sum = 0;
	for(var i=0; i<towers.length; i++) {
		for(var j=0; j<towers.length; j++) {
				rms_sum += towers[i].ratio*find_ftheta(towers[i],elev)*towers[j].ratio*find_ftheta(towers[j],elev)*Math.cos(deg2rad(towers[i].phase - towers[j].phase)) * bessel(tower_distance(towers[i],towers[j]) * Math.cos(deg2rad(elev)));
				// console.log(rms_sum);
				// rms_sum += term;
		}
	}
	return Math.sqrt(Math.abs(rms_sum));
}


// US SKYWAVE FUNCTIONS

function find_bm(ar, am, br, drad, k) {
	var x = br + k * Math.acos( (Math.cos(drad/2) - Math.sin(ar)*Math.sin(am))/(Math.cos(ar)*Math.cos(am)));
	if (x != 0 && !isNaN(x)) {
		return x;
	}else {
		return br;
	}
}

function geomag_lat (at, bt, ar, br) {
	at = deg2rad(at); //lat1
	bt= deg2rad(bt); //lon1
	ar = deg2rad(ar); //lat2
	br = deg2rad(br); //lon2
 	var k=1;
 	if (br > bt) k=-1;
	var drad = Math.acos( Math.sin(at)*Math.sin(ar) + Math.cos(at)*Math.cos(ar)*Math.cos(br-bt));
 	var am = deg2rad(90) - Math.acos( Math.sin(ar)*Math.cos(drad/2) + Math.cos(ar)*Math.sin(drad/2)*( (Math.sin(at)-Math.sin(ar)*Math.cos(drad))/(Math.cos(ar)*Math.sin(drad))));
 	var bm = find_bm(ar, am, br, drad, k);
 	var gm_lat = Math.asin( Math.sin(am)*Math.sin(deg2rad(78.5)) + Math.cos(am)*Math.cos(deg2rad(78.5))*Math.cos(deg2rad(69) + bm));
 	return rad2deg(gm_lat);
 }

function skywave50(field, distance, maglat) {
	var bigD = Math.sqrt(40000. + distance*distance);
	if (maglat > 60) maglat=60;
	maglat = deg2rad(maglat);
	var fc50 = (97.5 - 20.*Math.log10(bigD)) - (2*Math.PI + 4.95*Math.pow(Math.tan(maglat),2))*Math.sqrt(bigD/1000.);
	return fc50 + 20*Math.log10(field/100.);
}

function skywave10(field, distance, maglat) {
	var f50 = skywave50(field, distance, maglat);
	if (Math.abs(maglat) < 40) {
		return f50 + 6;
	}else if (Math.abs(maglat) > 60)  {
		return f50 + 10;
	}else{
		return f50 + 0.2*Math.abs(maglat) - 2;
	}
}

function cot(a) {
	if (Math.sin(a) != 0) return Math.cos(a)/Math.sin(a);
	else return NaN;
}

function calcTheta(dist, kn) {
	var theta = rad2deg(Math.atan( kn * cot(deg2rad(dist/444.54)))) - dist/444.54;
	if (theta<0) theta=0;
	return Math.round(10*theta)/10.;
}

function departureAngles(dist) {
	return {
		"center": calcTheta(dist, 0.00752),
		"up": calcTheta(dist, 0.00938),
		"down": calcTheta(dist, 0.00565)
	}
}

function usSkywave(lat1, lon1, lat2, lon2) {
 	var drad = rad2deg(Math.acos( Math.sin(deg2rad(lat1))*Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.cos(deg2rad(lon2)-deg2rad(lon1))));
	var dist = 111.18 * drad;
	var maglat = geomag_lat(lat1,lon1,lat2,lon2);
	var f50 = skywave50(100,dist,maglat);
	var f10 = skywave10(100,dist,maglat);
	var azimuth = gc_bear(lat1, Math.abs(lon1), lat2, Math.abs(lon2));

	return {
		"dist": dist,
		"maglat": maglat,
		"departures": departureAngles(dist),
		"ff50": Math.pow(10, f50/20),
		"ff10": Math.pow(10, f10/20),
		azimuth: azimuth
	}
}

function genSkywave(lat1, lon1, lat2, lon2, model) {
	switch(model) {
		default:
			return usSkywave(lat1, lon1, lat2, lon2);
		case "CAN":
			{
				const dist = gc_dist(lat1, lon1, lat2, lon2);
				const azimuth = gc_bear(lat1, Math.abs(lon1), lat2, Math.abs(lon2));
				var departures = departureAngles(dist);
				departures.up = departures.center;
				departures.down = departures.center;
				const f50 = reg2_50(dist);
				const f10 = f50 * 2.5118;
				return {
					"dist": dist,
					"departures": departures,
					"ff50": f50,
					"ff10": f10,
					azimuth: azimuth
				}
			}
		case "MEXNAR":
			{
				const dist = gc_dist(lat1, lon1, lat2, lon2);
				const azimuth = gc_bear(lat1, Math.abs(lon1), lat2, Math.abs(lon2));
				var departures = departureAngles(dist);
				departures.up = departures.center;
				departures.down = departures.center;
				const f10 = mexnar(dist);
				const f50 = f10 / 2.5;
				return {
					"dist": dist,
					"departures": departures,
					"ff50": f50,
					"ff10": f10,
					azimuth: azimuth
				}
			}
		case "CAN4A":
			{
				const dist = gc_dist(lat1, lon1, lat2, lon2);
				const azimuth = gc_bear(lat1, Math.abs(lon1), lat2, Math.abs(lon2));
				var departures = departureAngles(dist);
				departures.up = departures.center;
				departures.down = departures.center;
				const f50 = can4a(dist).result;
				const f10 = f50 * 2.5118;
				return {
					"dist": dist,
					"departures": departures,
					"ff50": f50,
					"ff10": f10,
					azimuth: azimuth
				}
			}
		case "R2":
		case "MEX":
			{
				const dist = gc_dist(lat1, lon1, lat2, lon2);
				const azimuth = gc_bear(lat1, Math.abs(lon1), lat2, Math.abs(lon2));
				var departures = departureAngles(dist);
				departures.up = departures.center;
				departures.down = departures.center;
				const f50 = reg2_50(dist);
				const f10 = f50 * 2.5;
				return {
					"dist": dist,
					"departures": departures,
					"ff50": f50,
					"ff10": f10,
					azimuth: azimuth
				}
			}
	}
}

function skywaveDistance(antenna, azimuth, target, model) {
	var destination, skywave, launch_field, test_field, error;
	var iterations = 0;
	var distance = 5000;
	const mode = model.mode;
	while (distance > 1 && distance < 13000 && iterations < 50) {
		destination = gc_dest(antenna.lat, antenna.lon, distance, azimuth);
		skywave = genSkywave(antenna.lat, antenna.lon, destination[1], destination[0], model.curve);
		if (mode==10) {
			if (antenna.towers.length == 1) { //non-directional.  multiply by power
				launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.up), da_theoretical(antenna, azimuth, skywave.departures.center), da_theoretical(antenna, azimuth, skywave.departures.down));
			}else{
				launch_field = Math.max(da_augmented(antenna, azimuth, skywave.departures.up), da_augmented(antenna, azimuth, skywave.departures.center), da_augmented(antenna, azimuth, skywave.departures.down));
			}
			// test_field = skywave10(launch_field, skywave.dist, skywave.maglat);
			launch_field = Math.round(100 * launch_field)/100;
			test_field = skywave.ff10 * launch_field;
		}else{
			if (antenna.towers.length == 1) { //non-directional.  multiply by power
				launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.center));
			}else{
				launch_field = (da_augmented(antenna, azimuth, skywave.departures.center));
			}
			// launch_field = Math.round(100 * launch_field)/100;
			test_field = skywave.ff50 * launch_field;
		}

		test_field = test_field / 100000;
		error = Math.pow(test_field / target, 1 / (3));
		// error = Math.sqrt(test_field / target);
		// error = Math.sqrt((test_field-Number(target)) / Number(target));

		// console.log(iterations, distance, destination, skywave, launch_field, test_field, target, error);
		
		if (Math.abs(1 - error) < .00001) {
			distance = Math.round(100*distance)/100;
			return {"distance": distance, "field": launch_field, "skywave": skywave, iterations: iterations};
		}else{
			distance *= error;
		}
		iterations++;
	}
	// console.error(antenna, azimuth, target, model);
	return {"distance": distance, "field": launch_field, "skywave": skywave, iterations: iterations};
}

function usSkywaveDistance(antenna, azimuth, target, mode) {
	var destination, skywave, launch_field, test_field, error;
	var iterations = 0;
	var distance = 1500;
	while (distance > 1 && distance < 13000 && iterations < 50) {
		destination = gc_dest(antenna.lat, antenna.lon, distance, azimuth);
		skywave = usSkywave(antenna.lat, antenna.lon, destination[1], destination[0]);
		if (mode==10) {
			if (antenna.dir_ind != 'Y') { //non-directional.  multiply by power
				launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.up), da_theoretical(antenna, azimuth, skywave.departures.center), da_theoretical(antenna, azimuth, skywave.departures.down));
			}else{
				launch_field = Math.max(da_augmented(antenna, azimuth, skywave.departures.up), da_augmented(antenna, azimuth, skywave.departures.center), da_augmented(antenna, azimuth, skywave.departures.down));
			}
			// test_field = skywave10(launch_field, skywave.dist, skywave.maglat);
			launch_field = Math.round(100 * launch_field)/100;
			test_field = skywave.ff10 * launch_field;
		}else{
			if (antenna.dir_ind != 'Y') { //non-directional.  multiply by power
				launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.center));
			}else{
				launch_field = (da_augmented(antenna, azimuth, skywave.departures.center));
			}
			// launch_field = Math.round(100 * launch_field)/100;
			test_field = skywave.ff50 * launch_field;
		}

		test_field = test_field / 100000;
		error = Math.pow(test_field / target, 1 / (3));
		// error = Math.sqrt(test_field / target);
		// error = Math.sqrt((test_field-Number(target)) / Number(target));

		// console.log(iterations, distance, destination, skywave, launch_field, test_field, target, error);
		
		if (Math.abs(1 - error) < .0001) {
			distance = Math.round(100*distance)/100;
			return {"distance": distance, "field": launch_field, "skywave": skywave, iterations: iterations};
		}else{
			distance *= error;
		}
		iterations++;
	}
	if (!launch_field) console.error(antenna, azimuth, target, mode, destination, skywave, launch_field, test_field, error);
	return {"distance": distance, "field": launch_field, "skywave": skywave, iterations: iterations};
}

//Other Skywaves
let can4a_data = [211.266,198.115,179.210,162.249,145.831,132.032,119.611,109.185,
	99.537,90.548,83.555,76.962,70.105,64.934,59.953,55.296,50.930,
	46.529,42.776,39.178,35.779,32.665,29.706,26.846,24.081,21.601,
	19.347,17.279,15.478,13.740,12.228,10.938,9.682,8.626,7.660,6.758,
	6.048,5.327,4.782,4.310,3.909,3.555,3.269,3.023,2.797,2.626,2.472,
	2.331,2.189,2.087,1.983,1.890,1.804,1.721,1.643,1.566,1.508,1.444,
	1.392,1.343,1.295,1.247,1.198,1.152,1.107,1.068,1.029,0.991,0.952,
	0.914,0.885,0.843,0.809,0.778,0.752,0.719,0.687,0.657,0.628,0.598,
	0.570,0.543,0.517,0.500];

function can4a(dist) {
	var output = {"result": null};
	if (dist < 50) {
		output.result = 5000;
	}else if (dist >= 4200) {
		output.result = can4a_data[83];
	}else if (dist > 0) {
		var i= Math.floor((dist - 50) / 50) + 1;
		var dist1 = 50 + 50 * (i-1);
		var fractn = (dist - dist1) / 50;
		output.result = (Math.exp(( Math.log(can4a_data[i]) - Math.log(can4a_data[i-1])) * fractn + Math.log(can4a_data[i-1])));
		output.index = i;
		output.fractn = fractn;
	}else{
		output.result = (-1);
	}
	return output;
}

const r2_distances = [100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4200,4300,4400,4500,4600,4700,4800,4900,5000,5100,5200,5300,5400,5500,5600,5700,5800,5900,6000,6200,6400,6600,6800,7000,7200,7400,7600,7800,8000,8200,8400,8600,8800,9000,9200,9400,9600,9800,10000];
const r2_fields = [179.11,117.18,92.06,77.54,68.82,62.06,57.08,52.86,49.65,46.78,44.36,41.95,39.54,36.81,34.4,32.3,29.89,27.63,25.54,23.56,21.84,19.91,18.3,16.78,15.32,13.97,12.71,11.55,10.5,9.53,8.57,7.72,6.98,6.34,5.8,5.32,4.89,4.49,4.14,3.61,3.18,2.79,2.55,2.26,2.03,1.85,1.69,1.55,1.43,1.33,1.23,1.15,1.07,1,0.94,0.88,0.83,0.79,0.75,0.71,0.67,0.64,0.61,0.58,0.55,0.53,0.51,0.48,0.46,0.45,0.43,0.41,0.4,0.38,0.37,0.36,0.34,0.33,0.32,0.3,0.28,0.27,0.25,0.24,0.23,0.22,0.21,0.2,0.19,0.18,0.17,0.17,0.16,0.15,0.15,0.14,0.14,0.13,0.13];

function reg2_50 (dist) {
	var index,d0,d1,f0,f1;
	if (dist < 100) {
		return 179.11;
	}else if (dist > 9800) {
		return 0.13;
	}else if (dist <= 2000) {
		index = Math.floor( (dist-100)/50 );
	}else if (dist <= 6000) {
		index = Math.floor( (dist-2000)/100 ) + 38;
	}else if (dist <= 9800) {
		index = Math.floor( (dist - 6000)/200 ) + 78;
	}
	d0 = r2_distances[index];
	d1 = r2_distances[index+1];
	f0 = r2_fields[index];
	f1 = r2_fields[index+1];
	return  semilog_interpolate(d0,d1,f0,f1,dist);
}

const mexnar_distances = [160.9344,177.02784,193.12128,209.21472,225.30816,241.4016,257.49504,273.58848,289.68192,305.77536,321.8688,337.96224,354.05568,370.14912,386.24256,402.336,418.42944,434.52288,450.61632,466.70976,482.8032,498.89664,514.99008,531.08352,547.17696,563.2704,579.36384,595.45728,611.55072,627.64416,643.7376,659.83104,675.92448,692.01792,708.11136,724.2048,740.29824,756.39168,772.48512,788.57856,804.672,820.76544,836.85888,852.95232,869.04576,885.1392,901.23264,917.32608,933.41952,949.51296,965.6064,981.69984,997.79328,1013.88672,1029.98016,1046.0736,1062.16704,1078.26048,1094.35392,1110.44736,1126.5408,1142.63424,1158.72768,1174.82112,1190.91456,1207.008,1223.10144,1239.19488,1255.28832,1271.38176,1287.4752,1303.56864,1319.66208,1335.75552,1351.84896,1367.9424,1384.03584,1400.12928,1416.22272,1432.31616,1448.4096,1464.50304,1480.59648,1496.68992,1512.78336,1528.8768,1544.97024,1561.06368,1577.15712,1593.25056,1609.344,1625.43744,1641.53088,1657.62432,1673.71776,1689.8112,1705.90464,1721.99808,1738.09152,1754.18496,1770.2784,1786.37184,1802.46528,1818.55872,1834.65216,1850.7456,1866.83904,1882.93248,1899.02592,1915.11936,1931.2128,1947.30624,1963.39968,1979.49312,1995.58656,2011.68,2027.77344,2043.86688,2059.96032,2076.05376,2092.1472,2108.24064,2124.33408,2140.42752,2156.52096,2172.6144,2188.70784,2204.80128,2220.89472,2236.98816,2253.0816,2269.17504,2285.26848,2301.36192,2317.45536,2333.5488,2349.64224,2365.73568,2381.82912,2397.92256,2414.016,2430.10944,2446.20288,2462.29632,2478.38976,2494.4832,2510.57664,2526.67008,2542.76352,2558.85696,2574.9504,2591.04384,2607.13728,2623.23072,2639.32416,2655.4176,2671.51104,2687.60448,2703.69792,2719.79136,2735.8848,2751.97824,2768.07168,2784.16512,2800.25856,2816.352,2832.44544,2848.53888,2864.63232,2880.72576,2896.8192,2912.91264,2929.00608,2945.09952,2961.19296,2977.2864,2993.37984,3009.47328,3025.56672,3041.66016,3057.7536,3073.84704,3089.94048,3106.03392,3122.12736,3138.2208,3154.31424,3170.40768,3186.50112,3202.59456,3218.688,3234.78144,3250.87488,3266.96832,3283.06176,3299.1552,3315.24864,3331.34208,3347.43552,3363.52896,3379.6224,3395.71584,3411.80928,3427.90272,3443.99616,3460.0896,3476.18304,3492.27648,3508.36992,3524.46336,3540.5568,3556.65024,3572.74368,3588.83712,3604.93056,3621.024,3637.11744,3653.21088,3669.30432,3685.39776,3701.4912,3717.58464,3733.67808,3749.77152,3765.86496,3781.9584,3798.05184,3814.14528,3830.23872,3846.33216,3862.4256,3878.51904,3894.61248,3910.70592,3926.79936,3942.8928,3958.98624,3975.07968,3991.17312,4007.26656,4023.36,4039.45344,4055.54688,4071.64032,4087.73376,4103.8272,4119.92064,4136.01408,4152.10752,4168.20096,4184.2944,4200.38784,4216.48128,4232.57472,4248.66816,4264.7616,4280.85504,4296.94848];

const mexnar_fields = [540.00,483.00,443.00,414.00,390.00,368.00,350.00,335.00,320.00,308.00,296.00,285.00,275.00,267.00,257.00,249.00,242.00,235.00,227.00,221.00,216.00,209.00,202.00,198.00,193.00,188.00,183.00,179.00,174.00,169.00,165.00,161.00,156.00,153.00,149.00,145.00,142.00,138.00,135.00,131.00,128.00,125.00,122.00,119.00,116.00,113.00,110.00,107.00,104.00,102.00,100.00,96.80,94.20,91.90,89.50,87.20,85.00,82.70,80.50,78.40,76.20,74.30,72.50,70.40,68.50,66.70,64.70,63.10,61.50,59.80,58.00,56.40,55.00,53.30,52.00, 50.50, 49.00, 47.70, 46.30, 45.10, 43.70, 42.60, 41.30, 40.20, 39.00, 37.90, 36.90, 35.70, 34.70, 33.60, 32.70, 31.60, 30.60, 29.80, 28.90, 28.10, 27.20, 26.50, 25.80, 25.00, 24.30, 23.70, 23.10, 22.40, 21.90, 21.30, 20.70, 20.20, 19.80, 19.30, 18.80, 18.30, 17.90, 17.50, 17.10, 16.70, 16.30, 16.00, 15.60, 15.30, 15.00, 14.60, 14.30, 14.00, 13.80, 13.50, 13.20, 13.00, 12.80, 12.50, 12.30, 12.10, 11.80, 11.50, 11.30, 11.10, 11.00, 10.80, 10.60, 10.40, 10.30, 10.10, 9.95, 9.80, 9.60, 9.48, 9.35, 9.18, 9.05, 8.90, 8.75, 8.62, 8.50, 8.37, 8.25, 8.13, 8.00, 7.89, 7.78, 7.65, 7.52, 7.43, 7.35, 7.23, 7.15, 7.05, 6.95, 6.87, 6.75, 6.69, 6.62, 6.52, 6.45, 6.36, 6.28, 6.19, 6.10, 6.03, 5.95, 5.88, 5.82, 5.73, 5.65, 5.60, 5.55, 5.46, 5.40, 5.34, 5.25, 5.21, 5.15, 5.10, 5.05, 4.98, 4.93, 4.87, 4.82, 4.75, 4.69, 4.64, 4.59, 4.53, 4.47, 4.42, 4.37, 4.32, 4.28, 4.23, 4.19, 4.14, 4.10, 4.06, 4.01, 3.97, 3.93, 3.89, 3.85, 3.80, 3.77, 3.72, 3.68, 3.65, 3.61, 3.57, 3.53, 3.50, 3.46, 3.43, 3.38, 3.36, 3.33, 3.29, 3.27, 3.23, 3.20, 3.16, 3.13, 3.10, 3.07, 3.04, 3.01, 2.99, 2.96, 2.93, 2.91, 2.88, 2.86, 2.84, 2.82, 2.79, 2.77, 2.75, 2.72, 2.70, 2.68, 2.66, 2.64, 2.63];

function mexnar(dist) {
	var index,d0,d1,f0,f1;
	if (dist < 160.9344) {
		return 540.00;
	}else if (dist > 4296) {
		return 2.63;
	}else{
		index = Math.floor( (dist - 160.9344)/16.09344 );
	}
	d0 = mexnar_distances[index];
	d1 = mexnar_distances[index+1];
	f0 = mexnar_fields[index] / 1.60907;
	f1 = mexnar_fields[index+1] / 1.60907;
	return  semilog_interpolate(d0,d1,f0,f1,dist);
}

//Web Stuff



function roundX(data, places) {
	// console.log(data, places);
	return Math.round(data * Math.pow(10,places)) / Math.pow(10,places);
}



function clipContour(contour, country_code) {
	var clipContour;
	try {
		country_border = countries.features.find( (border) => border.properties.iso_a2 == country_code);
		clipped_contour = turf.intersect(contour, country_border);
		if (clipped_contour) {
			contour.geometry = clipped_contour.geometry;
		}
		return contour;
	}
	catch(e) {
		console.error(e,contour, country_code);
		return contour;
	}
}

function startupTest() {

	//startup tests to help validate the functions

            // console.log("The answer to this should be true:");
            // console.log(az_lies_between(45, 0, 90));
            // console.log("The answer to this should be false:");
            // console.log(az_lies_between(45, 0, 270));
            // console.log("The answer to this should be true:");
            // console.log(az_lies_between(0, 350, 10));

            console.log("The answer to this should be 2.84:");
            console.log("Interpolated: ", field_at_distance( 1000,  10,  1,  20,  100), "Direct: ", gwave({frequency: 1, sigma: 10, erp: 1, distance: 20, field: 100, epsilon: 15}));

            console.log("The answer to this should be 20.0156:");
            console.log("Interpolated: ",distance_at_field( 1000,  10,  1,  2.84,  100), "Direct: ", gwaveDistance({frequency: 1, sigma: 10, erp: 1, field: 100, epsilon: 15, target: 2.84},.00001));

            console.log("The answer to this should be 41.19");
            console.log(kirke(100,1000,.5,[[20,10],[30,5],[200,15]]));

            console.log("The answer to this should be 191.46");
            console.log(kirke(100,1000,.025,[[20,10],[30,5],[200,15]]));

            example_towers = [
                {
                    "tower_id": 1,
                    "ratio": "1",
                    "phase": "-128.5",
                    "spacing": "0",
                    "orientation": "0",
                    "height": "120.0",
                    "tl_type": "NON",
                    "a": "0.0",
                    "b": "0.0",
                    "c": "0.0",
                    "d": "0.0",
                    "ref_switch": "0"
                },
                {
                    "tower_id": 2,
                    "ratio": "1.89",
                    "phase": "0",
                    "spacing": "110",
                    "orientation": "285",
                    "height": "140.0",
                    "tl_type": "TOP",
                    "a": "120.0",
                    "b": "20.0",
                    "c": "0.0",
                    "d": "0.0",
                    "ref_switch": "0"
                },
                {
                    "tower_id": 3,
                    "ratio": "1",
                    "phase": "128.5",
                    "spacing": "220",
                    "orientation": "285",
                    "height": "140.0",
                    "tl_type": "SEC",
                    "a": "120.0",
                    "b": "20.0",
                    "c": "220.0",
                    "d": "15.0",
                    "ref_switch": "0"
                }
            ];

            example_augs = [
                {
                    "id": 1,
                    "az": "110",
                    "span": "40.0",
                    "rad": "1300"
                },
                {
                    "id": 2,
                    "az": "240",
                    "span": "50.0",
                    "rad": "52.00"
                },
                {
                    "id": 3,
                    "az": "250",
                    "span": "10",
                    "rad": "130"
                }
            ];

            example_antenna = {
                power: 5,
                rms_theo: 685,
                towers: example_towers,
                augs: example_augs
            };
            // console.log("Theoretical Pattern Text");
            // console.log("Multiplying Constant (should be 323.6)", applicant_k(example_antenna));
            // console.log("expected",15.98, 62.49, 68.20);
            // console.log("results:",da_theoretical(example_antenna, 0,0), da_theoretical(example_antenna, 0,30), da_theoretical(example_antenna, 0,60));
            // console.log("expected",1225.3, 819.79, 234.54);
            // console.log("results:",da_theoretical(example_antenna, 105,0), da_theoretical(example_antenna, 105,30), da_theoretical(example_antenna, 105,60));
            // console.log("expected",0.43, 18.46, 34.56);
            // console.log("results:",da_theoretical(example_antenna, 235,0), da_theoretical(example_antenna, 235,30), da_theoretical(example_antenna, 235,60));
            // console.log("expected",82.62, 51.52, 26.38);
            // console.log("results:",da_theoretical(example_antenna, 247,0), da_theoretical(example_antenna, 247,30), da_theoretical(example_antenna, 247,60));
            
            // console.log("Standard Pattern Test");
            // console.log("Q0 (should be 22.36)", find_q(example_antenna,0));
            // console.log("expected",28.86, 68.05, 72.06);
            // console.log("results:",da_standard(example_antenna, 0,0), da_standard(example_antenna, 0,30), da_standard(example_antenna, 0,60));
            // console.log("expected",1286.78, 860.97, 246.41);
            // console.log("results:",da_standard(example_antenna, 105,0), da_standard(example_antenna, 105,30), da_standard(example_antenna, 105,60));
            // console.log("expected",23.48, 26.5, 37.18);
            // console.log("results:",da_standard(example_antenna, 235,0), da_standard(example_antenna, 235,30), da_standard(example_antenna, 235,60));
            // console.log("expected",89.87, 57.03, 28.87);
            // console.log("results:",da_standard(example_antenna, 247,0), da_standard(example_antenna, 247,30), da_standard(example_antenna, 247,60));

            // console.log("Augmented Pattern Test");
            // console.log("expected",28.86, 68.05, 72.06);
            // console.log("results:",da_augmented(example_antenna, 0,0), da_augmented(example_antenna, 0,30), da_augmented(example_antenna, 0,60));
            // console.log("expected",1299.42, 872.14, 254.21);
            // console.log("results:",da_augmented(example_antenna, 105,0), da_augmented(example_antenna, 105,30), da_augmented(example_antenna, 105,60));
            // console.log("expected",39,35.74,38.71);
            // console.log("results:",da_augmented(example_antenna, 235,0), da_augmented(example_antenna, 235,30), da_augmented(example_antenna, 235,60));
            // console.log("expected",100.47,66.69,32.78);
            // console.log("results:",da_augmented(example_antenna, 247,0), da_augmented(example_antenna, 247,30), da_augmented(example_antenna, 247,60));
}

function rss_sw(location, frequency, options) {

	//US Skywave
	//Uses SW10 model
	//Includes 1st Adj Contributors
	//Co-channel Ratio: 20:1
	//1A Ratio: 2:1

	//options:
	// {
	// 	includeClassD: 1 include Class D / 0 exclude (default exclude)
	// 	excludeAdj: 0 include 1st Adjacent contributors / 1 exclude (default include)
	// 	ignore: [] array of facility id's that will be ignored from the calculation.
	//  homeCountry: default US
	//  model: {curve, mode}
	// }

	options = options ?? {};
	options.includeClassD = options.includeClassD ?? 0;
	options.excludeAdj = options.excludeAdj ?? 0;
	options.ignore = options.ignore ?? [];
	options.homeCountry = options.homeCountry ?? 'US';

	model = options.model ?? {"curve": "US", "mode": 11};

	var stations;

	// console.time("rss");

	freq_filter = options.excludeAdj ? 0 : 10;

	if (options.includeClassD) {
		stations = amdata.filter( (station) => {
			if ((Math.abs(Number(station.am_frequency) - frequency) <= freq_filter) && station.current_status_code !== 'SAV') return true;
			else return false;
		});
	}else{
		stations = amdata.filter( (station) => {
			if (
				(station.current_status_code !== 'SAV') && 
				(station.current_status_code !== 'WIT') &&
				(station.station_class_code !== 'D') && 
				(Math.abs(Number(station.am_frequency) - frequency) <= freq_filter)
			) return true;
			else return false;
		});
	}


	// console.log(stations);

	var results = [];

	stations.forEach( (station) => {
		
		try {
			if (!station.antennas) return -1;
			station.antennas.forEach( (antenna) => {
				if (antenna.hours === 'DAY');
				else if (antenna.hours === 'CRI');
				else {
					sw_result = sw_at_dest(antenna, location, model);
					sw_result.station = station;
					var ignore;
					intl_status = antenna.mex_status ?? antenna.can_status ?? antenna.itu_status ?? "";
					if (intl_status === "O") ignore = ignore ?? "Objected";
					if (antenna.ifrb_list_flg === "B") ignore = ignore ?? "IFRB List B";
					if (station.country_code === 'CU') ignore = ignore ?? "Cuban";
					if (station.country_code !== 'US' && station.am_frequency != frequency) ignore = ignore ?? "Foreign Adjacent";
					if (sw_result.skywave.dist < 20) ignore = "Co-Located";
					if (options.homeCountry === 'US') {
						if (station.country_code !== 'US' && intl_status !== 'A') ignore = ignore ?? "Not Accepted";
					}

					sw_result.ignore = ignore;

					//apply protection ratio
					if (Number(station.am_frequency) == frequency) sw_result.limit = 20 * sw_result.field; 
					else sw_result.limit = 2 * sw_result.field;

					//round to 3 decimal places
					sw_result.limit = Math.round( 1000 * sw_result.limit) / 1000;

					if (sw_result.limit > 0.5) results.push(sw_result);
				}
			});
		} catch (error) {
			console.error(error, station);
		}	
	});

	options.ignore.forEach( (facility_id) => {
		results.forEach( (result) => {
			if (result.station.afac_facility_id === facility_id) result.ignore = "Excluded";
		});
	});

	results.sort( (a,b) => b.limit - a.limit);
	//detect and flag duplicate locations and facilities ... use the smallest one to get the worst case
	for (x = results.length - 1; x >= 0; x--) {
		for (y = x; y >= 1; y--) {
			if (y != x) {
				if (results[x].station.afac_facility_id == results[y].station.afac_facility_id) {
					// console.log(x,y,results[x].station.afac_facility_id, results[y].station.afac_facility_id);
					if (!results[Math.max(x,y)].ignore)	results[Math.min(x,y)].ignore = results[Math.min(x,y)].ignore ?? "Duplicate Faciltiy";
				}else if (gc_dist(results[x].lat, results[x].lon, results[y].lat, results[y].lon) < 10){
					if (!results[Math.max(x,y)].ignore)	results[Math.min(x,y)].ignore = results[Math.min(x,y)].ignore ?? "Duplicate Location";
				}
			}
		}
	}


	var rss100 = 0, rss50= 0, rss25 = 0;
	var min50, min25;

	results.forEach ( (result) => {
		if (!result.ignore) {
			result.included = 'rss100';
			newrss = Math.sqrt(Math.pow(rss100,2) + Math.pow(result.limit, 2));
			if (result.limit > (rss50 / 2)) {
				rss50 = newrss;
				result.included = 'rss50';
				min50 = result.limit;
			}
			if (result.limit > (rss25 / 4)) {
				rss25 = newrss;
				result.included = 'rss25';
				min25 = result.limit;
			}
			rss100 = newrss;
		}
	})

	// console.timeEnd("rss");
	return {
		rss100: rss100,
		rss50: rss50,
		rss25: rss25,
		min50: min50,
		min25: min25,
		stations: results
	};
}

function sw10_at_dest(antenna, location) {
	antenna.k = antenna.k ?? applicant_k(antenna);
	skywave = usSkywave(antenna.lat, antenna.lon, location.lat, location.lon);

	azimuth = skywave.azimuth;
	if (antenna.towers) { //catch bad antennas
		if (antenna.towers.length == 1) { //non-directional.  multiply theoretical by power
			launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.up), da_theoretical(antenna, azimuth, skywave.departures.center), da_theoretical(antenna, azimuth, skywave.departures.down));
		}else{ //directional antenna uses the Augmentation function, which defaults to standard when there are no augmentations
			launch_field = Math.max(da_augmented(antenna, azimuth, skywave.departures.up), da_augmented(antenna, azimuth, skywave.departures.center), da_augmented(antenna, azimuth, skywave.departures.down));
		}

		launch_field = Math.round(100 * launch_field)/100;
		test_field = (skywave.ff10 * launch_field) / 100000;

		return {
			skywave: skywave,
			field: test_field,
			radiation: launch_field,
			lat: antenna.lat,
			lon: antenna.lon
		};
	}else{
		console.log('$(station.aapp_application_id) has a bad antenna system', antenna);
	}
}

function sw_at_dest(antenna, location, model) {
	antenna.k = antenna.k ?? applicant_k(antenna);
	skywave = genSkywave(antenna.lat, antenna.lon, location.lat, location.lon, model.curve);

	azimuth = skywave.azimuth;
	if (antenna.towers) { //catch bad antennas
		if (antenna.towers.length == 1) { //non-directional.  multiply theoretical by power
			if ("US" != (model.curve ?? "US")) { //not a US skywave, so by default do no bracket, only use the center
				launch_field = Math.sqrt(antenna.power) * da_theoretical(antenna, azimuth, skywave.departures.center);	
			}else{
				launch_field = Math.sqrt(antenna.power) * Math.max(da_theoretical(antenna, azimuth, skywave.departures.up), da_theoretical(antenna, azimuth, skywave.departures.center), da_theoretical(antenna, azimuth, skywave.departures.down));
			}
		}else{ //directional antenna uses the Augmentation function, which defaults to standard when there are no augmentations
			if ("US" != (model.curve ?? "US")) { //not a US skywave, so by default do no bracket, only use the center
				launch_field = da_augmented(antenna, azimuth, skywave.departures.center);	
			}else{
				launch_field = Math.max(da_augmented(antenna, azimuth, skywave.departures.up), da_augmented(antenna, azimuth, skywave.departures.center), da_augmented(antenna, azimuth, skywave.departures.down));
			}
		}

		launch_field = Math.round(100 * launch_field)/100;
		if (model.mode == 50) {
			test_field = (skywave.ff50 * launch_field) / 100000;
		}else{
			test_field = (skywave.ff10 * launch_field) / 100000;
		}

		return {
			skywave: skywave,
			field: test_field,
			radiation: launch_field,
			lat: antenna.lat,
			lon: antenna.lon
		};
	}else{
		console.log('$(station.aapp_application_id) has a bad antenna system', antenna);
	}
}

function testProtect(call1, call2) {
    var testStation = amdata.find( (station) => station.aapp_callsign==call1);
    var protectedStation = amdata.find( (station) => station.aapp_callsign==call2);
	console.log(testStation, protectedStation);
    options = {
        "protectedModel": "G",
        "protectedField": .5,
        "protectedHours": "DAY",
        "ixHours": "DAY",
        "ixModel": "G"
    }
	var protectedAntenna = protectedStation.antennas.find( (antenna) => antenna.hours='DAY');
	return contour_protect(testStation, protectedStation, options);
}


function getContourCoords(contour) {
	//contour is a geoJSON
	var output = [];
	if (contour.type != "Feature") return output;
	if (contour.geometry.type=='MultiPolygon') {
		contour.geometry.coordinates.forEach( (polygons) => {
			polygons.forEach( (polygon) => {
				// console.log(polygon);
				output = output.concat(polygon);
			})
		})
	}else if (contour.geometry.type == 'Polygon') {
		contour.geometry.coordinates.forEach( (polygon) => {
			// console.log(polygon);
			output = output.concat(polygon);
		})
	}
	// console.log(output);
	return output;
}


function contour_protect(testStation, protectedStation, options) {
	//required options ...
	//ixModel (G, SW, R2, CAN4A, MX, CA ...)
	//protectedModel (G, SW, R2, CAN4A, MX, CA ...)
	//protectedField
	//protectionRatio (optional)
	//ixHours
	//protectedHours
	// console.time("ContourProtect");
	console.log("Protecting", protectedStation.aapp_callsign);

	var protectedAntenna;
	var testAntenna;

	try{
		protectedAntenna = protectedStation.antennas.find( (antenna) => (antenna.hours == options.protectedHours || antenna.hours == 'UNL'));
		testAntenna = testStation.antennas.find( (antenna) => (antenna.hours == options.ixHours || antenna.hours == 'UNL'));
	}catch(e) {
		console.error(e,protectedStation, testStation);
		return "Could Not Find Antenna";
	}
	if (!protectedAntenna || !testAntenna) {
		console.log(protectedAntenna, testAntenna, options.protectedHours, options.ixHours);
		return "Antenna Info Missing";
	}

	var protectionRatio=20;

	if (options.protectionRatio) {
		protectionRatio = options.protectionRatio;
	}else if (Math.abs(testStation.am_frequency - protectedStation.am_frequency)==10) {
		protectionRatio = 2;
	}else if (Math.abs(testStation.am_frequency - protectedStation.am_frequency)==20) {
		protectionRatio = 1;
	}
	
	// console.log(protectedAntenna);

	var output = [];
	const rando = Math.floor(10000 * Math.random());

	try {
		var profile="m3";
		if (protectedStation.country_code != 'US') profile = 'r2';

		var protectedContour = am_contour(protectedAntenna, protectedStation.am_frequency, 5, {model: options.protectedModel, field: options.protectedField, conductivity: profile});

		// console.log("Protected Contour",protectedContour);
		protectedContour = clipContour(protectedContour, protectedStation.country_code);
		// console.log("Protected Contour",protectedContour);

		// testAntenna.interferingContour = null;

		testAntenna.interferingContour = am_contour(testAntenna, testStation.am_frequency, 5, {model: options.ixModel, field: .020, conductivity: profile});

		// console.log("Interfering Contour", testAntenna.interferingContour);


		if (!turf.intersect(protectedContour, testAntenna.interferingContour)) {
			// console.log("No Overlap", protectedStation.aapp_callsign);
			return "No Worst-Case Overlap Detected";
		}else{
			console.log("Overlap Detected", protectedStation.aapp_callsign);
			add_contour_to_map("rx" + rando,"Blue",protectedContour);
			add_contour_to_map("ix" + rando,"Red",testAntenna.interferingContour);
		}

		var testPaths;
		var testAzimuths = [];
		var testDistances = [];

		const contourCoords = getContourCoords(protectedContour);

		contourCoords.forEach( (coords) => {
				//now for each point we need the field strength of the protected and interfering stations

				if (typeof(coords[0]) != 'number') {
					console.error(coords);
					return;
				}

				const protectedCoordinates = {lat: coords[1], lon: coords[0]};
				// console.log(protectedCoordinates);
				const testBearing = gc_bear(testAntenna.lat, Math.abs(testAntenna.lon), protectedCoordinates.lat, Math.abs(protectedCoordinates.lon));
				const testDistance = gc_dist(testAntenna.lat, Math.abs(testAntenna.lon), protectedCoordinates.lat, Math.abs(protectedCoordinates.lon));

				testAzimuths.push(testBearing);
				testDistances.push(testDistance);
		});

		var testPaths=getPath([testAntenna.lat, testAntenna.lon], testAzimuths, Math.max(...testDistances, 1300));
		
		// console.log(testPaths);
		// console.log(testAzimuths);
		// console.log(testDistances);

		// exit;
		// for(var x=0; x < protectedContour.geometry.coordinates.length; x++) {
			// console.log(x);
		var x=0;
		contourCoords.forEach( (coords) => {
				const protectedCoordinates = {lat: coords[1], lon: coords[0]};
				var testRms = 0;
				var skywave;
				var testField;
				var angles,ff10, ff50;
				switch(options.ixModel) {
					case 'G':
						//horizontal radiation
						if (testAntenna.dir_ind == 'Y') testRms = da_augmented(testAntenna, testAzimuths[x], 0);
						else testRms = Math.sqrt(testAntenna.power) * testAntenna.rms_theo;
						testField = kirkeField(testRms, testStation.am_frequency, testDistances[x], testPaths[x]);
						// console.log(testAzimuths[x], `${testField} = kirkeField(${testRms}, ${testStation.am_frequency}, ${testDistances[x]}, testPaths[x]);`, testPaths[x]);
						break;
					case 'R210':
					case "MEX10":
						angles = departureAngles(testDistances[x]);
						if (testAntenna.dir_ind == 'Y') testRms = da_augmented(testAntenna, testAzimuths[x], angles.center);
						else testRms = Math.sqrt(testAntenna.power) * da_theoretical(testAntenna, testAzimuths[x], angles.center);
						ff10 = reg2_50(testDistances[x]) * 2.5;
						testField = testRms * ff10 / 100000;
						break;
					case 'R250':
					case "MEX50":
						angles = departureAngles(testDistances[x]);
						if (testAntenna.dir_ind == 'Y') testRms = da_augmented(testAntenna, testAzimuths[x], angles.center);
						else testRms = Math.sqrt(testAntenna.power) * da_theoretical(testAntenna, testAzimuths[x], angles.center);
						ff50 = reg2_50(testDistances[x]);
						testField = testRms * ff50 / 100000;
						break;
					case "CAN10":

						break;
					case "CAN50":

						break;
					case "SW10":
						angles = departureAngles(testDistances[x]);
						if (testAntenna.dir_ind == 'Y') testRms = Math.max(
							da_augmented(testAntenna, testAzimuths[x], angles.center),
							da_augmented(testAntenna, testAzimuths[x], angles.up),
							da_augmented(testAntenna, testAzimuths[x], angles.down)
						);
						else testRms = Math.sqrt(testAntenna.power) * Math.max(
							da_theoretical(testAntenna, testAzimuths[x], angles.center),
							da_theoretical(testAntenna, testAzimuths[x], angles.up),
							da_theoretical(testAntenna, testAzimuths[x], angles.down)
						);
						ff10 = reg2_50(testDistances[x]) * 2.5;
						skywave = genSkywave(testAntenna.lat, testAntenna.lon, protectedCoordinates.lat, protectedCoordinates.lon, {curve: "US", mode: 10});
						testField = testRms * skywave.ff10 / 100000;
						break;
					case "SW50":
						angles = departureAngles(testDistances[x]);
						if (testAntenna.dir_ind == 'Y') testRms = Math.max(
							da_augmented(testAntenna, testAzimuths[x], angles.center),
							da_augmented(testAntenna, testAzimuths[x], angles.up),
							da_augmented(testAntenna, testAzimuths[x], angles.down)
						);
						else testRms = Math.sqrt(testAntenna.power) * Math.max(
							da_theoretical(testAntenna, testAzimuths[x], angles.center),
							da_theoretical(testAntenna, testAzimuths[x], angles.up),
							da_theoretical(testAntenna, testAzimuths[x], angles.down)
						);
						ff50 = reg2_50(testDistances[x]);
						testField = testRms * ff50;
						break;
					default:
						testField = 100;
				}

				if (testField > .001) {
					var allowedField = (options.protectedField / protectionRatio);
					var conversionFactor = allowedField / testField;	
					
					output.push({
						protectedBearing: gc_bear(protectedAntenna.lat, Math.abs(protectedAntenna.lon), protectedCoordinates.lat, Math.abs(protectedCoordinates.lon)),
						protectedDistance:  gc_dist(protectedAntenna.lat, Math.abs(protectedAntenna.lon), protectedCoordinates.lat, Math.abs(protectedCoordinates.lon)),
						protectedCoordinates: protectedCoordinates,
						testBearing: testAzimuths[x],
						testDistance: testDistances[x],
						testPaths: testPaths[x],
						allowedField: allowedField,
						testField: testField,
						testRms: testRms,
						conversionFactor: conversionFactor,
						protectedHours: protectedAntenna.hours,
						skywave: skywave
					});
				}
				// console.log(x, testAzimuths[x], testDistances[x], testPaths[x], testRms, testField);
				x++;
		});

	} catch(e) {
		console.error(e, protectedStation, testPaths, testAzimuths, testDistances, protectedContour, options);
	}
	// console.log(protectedContour);
	// console.log("output", output);
	if (output.length > 0) {
		output.sort( (a,b) => a.conversionFactor - b.conversionFactor);
		var worstConversionFactor = Math.min(1, output[0].conversionFactor);
		const newField = (options.protectedField / protectionRatio) / worstConversionFactor;
		console.log("newfield", newField, options.protectedField, protectionRatio, worstConversionFactor);
		const newInterferingContour = am_contour(testAntenna, testStation.am_frequency, 1, {model: options.ixModel, field: newField, conductivity: profile});
		add_point_to_map("nixPoint" + rando, "Green", output[0].protectedCoordinates);
		if (worstConversionFactor <= 1) add_contour_to_map("nix" + rando,"Green",newInterferingContour);
		return output;
	}else{
		return "Output Missing";
	}
}

const omniAntenna = {
	augs: null,
	dir_ind: 'N',
	hours: 'DAY',
	power: '0.25',
	rms_theo: "273.7",
	towers: [
		{
			a: null,
			b: null,
			c: null,
			d: null,
			height: 80,
			orientation: 0,
			phase: 0,
			ratio: 1,
			ref_switch: 0,
			spacing: 0,
			tl_type: "NON",
			tower_id: 1
		}
	]
}

function createOmni250(station) {
	if (!station.antennas) {
		console.error(`No Daytime Antenna found in `, station);
		return station;
	}
	var omniStation = structuredClone(station);
	const dayAntenna = station.antennas.find( (antenna) => antenna.hours === 'DAY' || antenna.hours ==='UNL');
	if (!dayAntenna) {
		console.error(`No Daytime Antenna found in `, station);
		return station;
	}
	if (dayAntenna.dir_ind == 'Y') {
		var replacementAntenna = structuredClone(omniAntenna);
		replacementAntenna.lat = dayAntenna.lat;
		replacementAntenna.lon = dayAntenna.lon;
		omniStation.antennas = [replacementAntenna];
		return omniStation;
	}else{
		var replacementAntenna = structuredClone(dayAntenna);
		replacementAntenna.power = "0.25";
		omniStation.antennas = [replacementAntenna];
		return omniStation;
	}
}

function day_allocation(testStation, hours) {
	if (!hours) hours = "DAY";

	console.time("allocation");
	protectedStations = amdata.filter( (station) => (Math.abs(station.am_frequency - testStation.am_frequency) <= 20 && station.country_code === "US" && station.current_status_code !== 'SAV' && station.current_status_code !== 'REV') );
	// console.log(protectedStations);

	var output = [];

	protectedStations.forEach( (protectedStation) => {
		try{
			if (protectedStation.afac_facility_id != testStation.afac_facility_id) {

				if (protectedStation.station_class_code === 'C' && testStation.station_class_code === 'C') {
					var testOmni250 = createOmni250(testStation);
					var protectedOmni250 = createOmni250(protectedStation);

					if (Math.abs(protectedStation.am_frequency - testStation.am_frequency)==20) {
						protection = contour_protect(testOmni250, protectedOmni250, {protectedModel: 'G', protectedField: 5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}else{
						protection = contour_protect(testOmni250, protectedOmni250, {protectedModel: 'G', protectedField: 0.5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}
					
					// console.log(protection);
					try {
						if (typeof(protection) === 'object') {
							output.push({
								conversion_factor: protection[0].conversionFactor,
								application_id: protectedStation.aapp_application_id,
								callsign: `Omni250 ${protectedStation.aapp_callsign} ${protectedStation.am_frequency}${protectedStation.station_class_code}`,
								facility_id: protectedStation.afac_facility_id,
								hours: protection[0].protectedHours,
								protection: protection
							});
						}
					} catch (error) {
						// console.error(error, protection);
					}
				}else{

					if (Math.abs(protectedStation.am_frequency - testStation.am_frequency)==20) {
						protection = contour_protect(testStation, protectedStation, {protectedModel: 'G', protectedField: 5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}else{
						protection = contour_protect(testStation, protectedStation, {protectedModel: 'G', protectedField: 0.5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}
					
					// console.log(protection);
					try {
						if (typeof(protection) === 'object') {
							output.push({
								conversion_factor: protection[0].conversionFactor,
								application_id: protectedStation.aapp_application_id,
								callsign: `${protectedStation.aapp_callsign} ${protectedStation.am_frequency}${protectedStation.station_class_code}`,
								facility_id: protectedStation.afac_facility_id,
								hours: protection[0].protectedHours,
								protection: protection
							});
						}
					} catch (error) {
						// console.error(error, protection);
					}

					if (Math.abs(protectedStation.am_frequency - testStation.am_frequency)==20) {
						protection = contour_protect(protectedStation, testStation, {protectedModel: 'G', protectedField: 5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}else{
						protection = contour_protect(protectedStation, testStation, {protectedModel: 'G', protectedField: 0.5, protectedHours: hours, ixHours: hours, ixModel: 'G'});
					}
					
					// console.log(protection);
					try {
						if (typeof(protection) === 'object') {
							output.push({
								conversion_factor: protection[0].conversionFactor,
								application_id: protectedStation.aapp_application_id,
								callsign: `${protectedStation.aapp_callsign} ${protectedStation.am_frequency}${protectedStation.station_class_code}`,
								facility_id: protectedStation.afac_facility_id,
								hours: protection[0].protectedHours,
								incoming: 1,
								protection: protection
							});
						}
					} catch (error) {
						// console.error(error, protection);
					}
				}

			}
		} catch(e) {
			console.error(e);
		}

	});

	output.sort((a,b) => a.conversion_factor - b.conversion_factor);

	console.timeEnd("allocation");
	console.log(output);
	return output;
}

function modelLookup(country_code) {
	switch(country_code) {
		default:
			return {"curve" : "R2", "mode": 50, level: 50, conductivity: 'R2'};
		case "US":
			return {"curve" : "US", "mode": 10, level: 25, conductivity: 'M3'};
		case "CA":
			return {"curve" : "CAN", "mode": 10, level: 50, conductivity: 'R2'};
		case "CAOLD":
			return {"curve": "CAN4A", "mode": 10, level: 50, conductivity: 'R2'};
		case "MX":
			return {"curve" : "MEX", "mode": 10, level: 50, conductivity: 'R2'};
	}
}

function rss_protect(testStation, protectedStation, options) {
	var output = [];

	if (!options) options = {};

	options.model = options.model ?? modelLookup(protectedStation.country_code);
	options.ignore = [testStation.afac_facility_id];
	// output.model = model;
	testStation.antennas.forEach( (antenna) => { //for each interfering antenna system
		try {
				if (!protectedStation.antennas) return output;
				protectedStation.antennas.forEach( (protectedAntenna) => { //for each protected antenna system.  Here we will filter out daytime and critical hour systems, since RSS protection is only for nighttime/unlimited
				if (protectedAntenna.hours === 'DAY' || protectedAntenna.hours === 'CRI');
				else if ("O" === (protectedAntenna.mex_status ?? protectedAntenna.can_status ?? protectedAntenna.itu_status));
				else {

					ix_signal = sw_at_dest(antenna, {lat: protectedAntenna.lat, lon: protectedAntenna.lon}, options.model); //interfering signal level
					protected_rss = rss_sw({lat: protectedAntenna.lat, lon: protectedAntenna.lon}, protectedStation.am_frequency, options);

					relationship = Math.abs(Number(testStation.am_frequency) - Number(protectedStation.am_frequency));

					if (relationship == 0) ix_limit = ix_signal.field * 20;
					else if (relationship == 10) ix_limit = ix_signal.field * 2;
					else ix_limit = 0;

					conversion_factor = Infinity;
					if (model.level == 25) {
						allowable_limit = Math.min(
							protected_rss.rss25 / 4,
							protected_rss.min25
						);
						protected_rss.rss = protected_rss.rss25;
					}else{
						allowable_limit = Math.min(
							protected_rss.rss50 / 2,
							protected_rss.min50
						);
						protected_rss.rss = protected_rss.rss50;
					}

					if (ix_limit != 0) {
						conversion_factor = allowable_limit / ix_limit;
					}

					output.push({
						hours: antenna.hours,
						ix_signal: ix_signal,
						protected_rss: protected_rss,
						protectedCoordinates: {lat: protectedAntenna.lat, lon: protectedAntenna.lon},
						relationship: relationship,
						allowable_limit: allowable_limit,
						conversionFactor: conversion_factor,
						limit: ix_limit,
						margin: ix_signal.radiation * (conversion_factor - 1),
						model: model,
						intl_status: protectedAntenna.mex_status ?? protectedAntenna.can_status ?? protectedAntenna.itu_status ?? protectedAntenna.ifrb_list_flg
					});
				}
			});
		} catch(error) {
			console.log(error);
		}
		
	});

	return output;
}

function rss_allocation(testStation, hours) {

	if (!hours) hours = "NIG";

	console.time("allocation");

	protectedStations = amdata.filter( (station) => { //pick stations for RSS protection
		if (station.country_code == 'US') {
			if (Math.abs(station.am_frequency - testStation.am_frequency) <= 10 && station.station_class_code !== 'A') {
				return true;
			}else{
				return false;
			}
		}else{
			if ((station.am_frequency == testStation.am_frequency )&& station.station_class_code !== 'A') {
				return true;
			}else{
				return false;
			}
		}
 	});
	// && station.country_code === "US"
	// console.log(protectedStations);

	var output = [];

	protectedStations.forEach( (protectedStation) => {
		// console.log(`RSS Protecting ${protectedStation.aapp_callsign}`);
		protection = rss_protect(testStation, protectedStation);

		protection.forEach( (result) => {
			if (result.conversionFactor && (result.hours===hours || result.hours === "UNL")) {
				output.push({
					conversionFactor: result.conversionFactor,
					application_id: protectedStation.aapp_application_id,
					callsign: protectedStation.aapp_callsign,
					facility_id: protectedStation.afac_facility_id,
					hours: result.hours,
					protection: result,
					protection_type: "rss"
				});
			}
		});

	});

	protectedStations = amdata.filter( (station) => { //pick stations for Contour protection
		if (station.country_code == 'US') {
			if (Math.abs(station.am_frequency - testStation.am_frequency) <= 10 && station.station_class_code == 'A') {
				return true;
			}else{
				return false;
			}
		}else{
			if ((station.am_frequency == testStation.am_frequency ) && station.station_class_code == 'A') {
				return true;
			}else{
				return false;
			}
		}
 	});

	protectedStations.forEach( (protectedStation) => {
		switch(protectedStation.country_code) {
			case "CA":
				protection = contour_protect(testStation, protectedStation, {protectedModel: 'CAN50', ixModel: 'CAN10', protectedField: 0.5, protectedHours: hours, ixHours: hours});
				break;
			case "MX":
				console.log(`MX Contour Protecting ${protectedStation.aapp_callsign}`);
				protection = contour_protect(testStation, protectedStation, {protectedModel: 'MEX50', ixModel: 'MEX10', protectedField: 0.5, protectedHours: hours, ixHours: hours});
				console.log(protection);
				break;
			case "US":
				console.log(`US Contour Protecting ${protectedStation.aapp_callsign}`);
				protection = contour_protect(testStation, protectedStation, {protectedModel: 'SW50', ixModel: 'SW10', protectedField: 0.5, protectedHours: hours, ixHours: hours});
				console.log(protection);
				break;
			default:
				protection = contour_protect(testStation, protectedStation, {protectedModel: 'R250', ixModel: 'R250', protectedField: 0.5, protectedHours: hours, ixHours: hours});
		}

		if (protection != -1) {
			output.push({
				conversionFactor: protection[0].conversionFactor,
				application_id: protectedStation.aapp_application_id,
				callsign: protectedStation.aapp_callsign,
				facility_id: protectedStation.afac_facility_id,
				hours: protection[0].protectedHours,
				protection: protection,
				protection_type: "contour"
			});
		}

	});

	output.sort((a,b) => a.conversionFactor - b.conversionFactor);

	console.timeEnd("allocation");
	return output;
}

function newStation() {
	return {
		"aapp_application_id": "newStation",
		"aapp_file_num": "BL-20050909AGB",
		"aapp_callsign": "NEW",
		"service_code": "AM",
		"purpose_code": "L2C",
		"current_status_code": "GRA",
		"discriminator_code": "AM",
		"active_ind": "Y",
		"sub_purpose_code": null,
		"original_purpose_code": null,
		"auth_type_code": "L",
		"original_auth_type_code": "C",
		"construction_complete_ind": "N",
		"afac_community_city": "CITY",
		"afac_community_state_code": "ST",
		"country_code": "US",
		"am_frequency": "1420",
		"afac_facility_id": 9999999,
		"station_class_code": "B",
		"antennas": [ newAntenna("UNL") ]
	};
}

function newAntenna(hours) {
	return {
		"hours": hours,
		"ant_id": "newAntenna",
		"dir_ind": "N",
		"power": "1.000",
		"lat": 35,
		"lon": -90,
		"rms_theo": "300",
		"rms_std": null,
		"rms_aug": null,
		"specified_q": null,
		"intl_id": null,
		"augs": null,
		"towers": [newTower(1)]
	}
}

function newTower(id) {
	return {
		"tower_id": id,
		"ratio": "1",
		"phase": "0",
		"spacing": "0",
		"orientation": "0",
		"height": "120",
		"tl_type": "NON",
		"a": "0.0",
		"b": "0.0",
		"c": "0.0",
		"d": "0.0",
		"ref_switch": "0"
	}
}

function newAug(id) {
	return {
		"id": id,
		"az": "0",
		"span": "90.0",
		"rad": "1000"
	}
}

function svg_destination(lat1, lon1, brng, dt, r) {
	brng = deg2rad(brng);
	x = r * dt * Math.sin(brng);
	y = r * dt * Math.cos(brng);

	return {
		x: lon1 + x,
		y: lat1 - y
	};
}

function tower_plot(towers) {
    count = 1;
    plot_size = 300;
    plot_mid = plot_size / 2;
    plot_rad = plot_mid-10;
    output_html = '';
    output_html += `<svg height='${plot_size}' width='${plot_size}'>\n`;
    output_html += `<text class=svg_text x=0 y=15>Tower Array Layout</text>\n`;
    output_html += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_mid}' y2='0' style='stroke:black;stroke-width:1' />`;
    output_html += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_size}' y2='${plot_mid}' style='stroke:black;stroke-width:1' />`;
    output_html += `<line x1='${plot_mid}' y1='${plot_mid}' x2='0' y2='${plot_mid}' style='stroke:black;stroke-width:1' />`;
    output_html += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_mid}' y2='${plot_size}' style='stroke:black;stroke-width:1' />`;

    max_spacing = 1;
	if (towers.length > 1) {
		for (x=1; x < towers.length; x++) {
			console.log(towers[x]);
			if (towers[x].ref_switch ==1) {
				rel_to_fix(towers[x], towers[x-1]);
			}
		}
	}


    towers.forEach( (tower) => {
		max_spacing = Math.max(max_spacing, tower.spacing);
    });

    towers.forEach( (tower) => {
        coords = svg_destination(plot_mid,plot_mid,tower.orientation, tower.spacing, plot_rad/max_spacing);
        output_html += `<circle fill=white stroke=black cx=${coords.x} cy=${coords.y} r=10 caption='${tower.orientation}-${tower.spacing}'/>`;
        output_html += `<text x=${coords.x} y=${coords.y} font-color=white text-anchor=middle dominant-baseline=central>${tower.tower_id}</text>`;
    });
    
    output_html += "</svg>\n";
    return output_html;
}

function polarplot(ant_id) {
	antenna = radiatStation.antennas.find( (antenna) => antenna.ant_id === ant_id);

	svg = polarplotSVG(antenna);

	document.getElementById('radiatOutput').innerHTML = svg;
}

function polarplotSVG(antenna) {
	plot_size = 800;
	plot_mid = plot_size / 2;
	plot_rad = plot_mid - 5;

	theo_pattern = [];
	std_pattern = [];
	aug_pattern = [];

	svg = `<svg class=polarplot height='${plot_size}' width='${plot_size}'>`;

	for (b=0; b<360; b+=10) { //#10 degree radials
        if(b%90 == 0) {
            continue;
        }else if (b%30 == 0){
            dest1 = svg_destination(plot_mid,plot_mid,b,.1,plot_rad);
        }else{
            dest1 = svg_destination(plot_mid,plot_mid,b,.2,plot_rad);
        }
        dest2 = svg_destination(plot_mid,plot_mid,b,1,plot_rad);
        svg += `<line x1='${dest1.x}' y1='${dest1.y}' x2='${dest2.x}' y2='${dest2.y}' style='stroke:gray;stroke-width:1' />`;
    }

	for(d=0.1; d<1; d+=0.1) {
        svg += "<polygon style='fill:none;stroke:gray;stroke-width:1;stroke-dasharray:5 5' points='";
        circle = [];
        for (i=0; i<360; i++) {
                // #this will show the 0.1*max boundaries
                dest=svg_destination(plot_mid,plot_mid,i,d,plot_rad);
                circle.push(`${dest.x},${dest.y}`);
        }
        svg += circle.join(" ");
        svg += "'/>\n";
    }

	for (az=0; az<360; az++) {
		theo_pattern.push(da_theoretical(antenna, az, 0));
		std_pattern.push(da_standard(antenna, az, 0));
		aug_pattern.push(da_augmented(antenna, az, 0));
	}

	maxrad = Math.max(...theo_pattern, ...std_pattern, ...aug_pattern);

	division = roundX(maxrad / 10, 3);

	theo_pattern = theo_pattern.map( (rad) => rad / maxrad);
	std_pattern = std_pattern.map( (rad) => rad / maxrad);
	aug_pattern = aug_pattern.map( (rad) => rad / maxrad);

    
    for (i=0; i<360; i++) {
            // #this will show the unrotated pattern
            dest=svg_destination(plot_mid,plot_mid,i,theo_pattern[i],plot_rad);
            theo_pattern[i] = `${dest.x},${dest.y}`;

			dest=svg_destination(plot_mid,plot_mid,i,std_pattern[i],plot_rad);
            std_pattern[i] = `${dest.x},${dest.y}`;

			dest=svg_destination(plot_mid,plot_mid,i,aug_pattern[i],plot_rad);
            aug_pattern[i] = `${dest.x},${dest.y}`;
    }
	svg += "<polygon style='fill:none;stroke:blue;stroke-width:2' points='" + theo_pattern.join(" ") + "'/>\n";
	svg += "<polygon style='fill:none;stroke:red;stroke-width:2' points='" + std_pattern.join(" ") + "'/>\n";
	svg += "<polygon style='fill:none;stroke:green;stroke-width:2' points='" + aug_pattern.join(" ") + "'/>\n";

    // svg += `<text class=svg_text x=0 y=15>${label}</text>\n`;
    // svg += `<text class=svg_text x=0 y=25>Each Division is:</text>\n`;
    // svg += `<text class=svg_text x=0 y=35>${division} mV/m</text>\n`;
    svg += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_mid}' y2='0' style='stroke:black;stroke-width:2' />`;
    svg += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_size}' y2='${plot_mid}' style='stroke:black;stroke-width:2' />`;
    svg += `<line x1='${plot_mid}' y1='${plot_mid}' x2='0' y2='${plot_mid}' style='stroke:black;stroke-width:2' />`;
    svg += `<line x1='${plot_mid}' y1='${plot_mid}' x2='${plot_mid}' y2='${plot_size}' style='stroke:black;stroke-width:2' />`;

	label = `<table class=polarplot><tr><th class=blue>Theoretical</tr><tr><th class=red>Standard</tr><tr><th class=green>Augmented</tr><tr><th>Each Division is<br>${division} mV/m</tr></table>`;

	svg += `</svg><br>\n`;
	return `<div>${svg} ${label}</div>`;
}

function appInfo(application_id) {
	station = amdata.find( (station) => station.aapp_application_id == application_id);

	html = `<div class=info><table><tr><th colspan=100%>${station.aapp_callsign} - ${station.aapp_file_num}</tr><tr><th colspan=100%>${station.aapp_receipt_date ?? ""}</tr><tr><td><a style="text-transform: capitalize;">${station.afac_community_city}</a><td>${station.afac_community_state_code}${station.country_code!="US"?"("+station.country_code+")":""}</tr><tr><td>${station.am_frequency}${station.station_class_code}<td>${station.current_status_code}<td>${station.original_purpose_code ? station.original_purpose_code + station.purpose_code : station.purpose_code}</tr></table></div>`;

	return html;
}

let day_of_year = [0,15,46,74,105,135,166,196,227,258,288,319,349];
let month_name = ["Err","Jan",'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let fractional_year = day_of_year.map(day => (2 * Math.PI / 365.25) * (day - .75));
let eq_time = fractional_year.map(fy => 229.18 * (.000075 + .001868*Math.cos(fy) - .032077*Math.sin(fy) - 0.014615*Math.cos(2 * fy) - 0.040849 * Math.sin(2 * fy)));
let declination = fractional_year.map(fy => 0.006918 - 0.399912*Math.cos(fy) + 0.070257 * Math.sin(fy) - 0.006758 * Math.cos(2 * fy) + 0.000907 * Math.sin(2 * fy) - 0.002697 * Math.cos(3 * fy) + 0.00148 * Math.sin(3 * fy));

function round_15(time) {
    return (Math.round(time / 15) * 15);
}

function srss_time(lat, lon, month) {
    //lat, lon in degrees
    //month integer 1 = JAN, 12=DEC

    //based on month, find "day of year" as the 15th of each month
    // day_of_year = [0,15,46,74,105,135,166,196,227,258,288,319,349];
    // month_name = ["Err","Jan",'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    //we'll assume UTC hour=12 to cancel out that term of the equation!
    //fractional year is calculated, in radians!

    // fractional_year = (2 * Math.PI / 365.25) * (day_of_year[month] - .75);

    // eq_time = 229.18 * (.000075 + .001868*Math.cos(fractional_year) - .032077*Math.sin(fractional_year) - 0.014615*Math.cos(2 * fractional_year) - 0.040849 * Math.sin(2 * fractional_year));

    // declination = 0.006918 - 0.399912*Math.cos(fractional_year) + 0.070257 * Math.sin(fractional_year) - 0.006758 * Math.cos(2 * fractional_year) + 0.000907 * Math.sin(2 * fractional_year) - 0.002697 * Math.cos(3 * fractional_year) + 0.00148 * Math.sin(3 * fractional_year);

    hour_angle = rad2deg(Math.acos( Math.cos(deg2rad(90.833))/(Math.cos(deg2rad(lat)) * Math.cos(declination[month])) - Math.tan(deg2rad(lat))*Math.tan(declination[month])));

    sunrise = (720 - 4 * (lon + hour_angle) - eq_time[month]) ;
    sunset = (720 - 4 * (lon - hour_angle) - eq_time[month]) ;

    sunrise_rounded = round_15(sunrise);
    sunset_rounded = round_15(sunset);

    //output in UTC hours, minutes
    sunrise_h = Math.floor(sunrise/60);
    sunrise_m = Math.floor(sunrise % 60);

    //output in UTC hours, minutes
    sunrise_h_r = Math.floor(sunrise_rounded/60);
    sunrise_m_r = Math.floor(sunrise_rounded % 60);

    //output in UTC hours, minutes
    sunset_h = Math.floor(sunset/60);
    sunset_m = Math.floor(sunset % 60);

    //output in UTC hours, minutes
    sunset_h_r = Math.floor(sunset_rounded/60);
    sunset_m_r = Math.floor(sunset_rounded % 60);

    return {
        "sunrise" : sunrise, 
        "sunrise_h" : sunrise_h, 
        "sunrise_m": sunrise_m, 
        "sunset" : sunset, 
        "sunset_h" : sunset_h, 
        "sunset_m" : sunset_m,
        "sunrise_rounded" : sunrise_rounded, 
        "sunrise_h_r" : sunrise_h_r, 
        "sunrise_m_r": sunrise_m_r, 
        "sunset_rounded" : sunset_rounded, 
        "sunset_h_r" : sunset_h_r, 
        "sunset_m_r" : sunset_m_r,  
        "month_name" : month_name[month], 
        "declination" : rad2deg(declination[month]), 
        "eq_time" : eq_time[month], 
        "hour_angle" : hour_angle
	};
}

function srssTimes (lat, lon) {
	result = [];
	for (var i = 1; i<= 12; i++) {
		result[i] = srss_time(lat, lon, i);
	}
	return result;
}

function skywave_curve(antenna, azimuth, distance, step, model) {
	//generate locations array
	var locations = [];
	for (var dist = 100; dist <= distance; dist += step) {
		const endpoint = gc_dest(antenna.lat, antenna.lon, dist, azimuth);
		locations.push({lat: endpoint[1], lon: endpoint[0], dist: dist});
	}

	locations.forEach( (location) => {
		location.result = sw_at_dest(antenna, location, model);
		location.field = location.result.field;
	});

	return locations;
}

function skywaveGrid(antenna, contour, model) {
	const bbox = turf.bbox(contour);

	// const size = Math.sqrt( Math.pow((bbox[1] - bbox[0]),2) + Math.pow((bbox[3] - bbox[2]),2) ) / 1000;
	// console.log(bbox, size);
	var area = turf.area(contour) / 100000;
	var size = Math.sqrt(area) / 1000;
	console.log(area,size);
	var grid =turf.squareGrid(bbox, size, {units: 'kilometers', mask: contour});
	// grid.features = grid.features.filter( (feature) => turf.booleanWithin(feature, contour));

	grid.features.forEach( (feature) => {
		var center = turf.center(feature);
		var result = sw_at_dest(antenna, {lat: center.geometry.coordinates[1], lon: center.geometry.coordinates[0]}, model);
		feature.properties.field = result.field;
	})

	return grid;
}



const figure8_emv = [133.0,138.5,144.0,149.0,152.0,155.0,157.0,160.0,162.0,154.0,165.5,166.8,168.0,169.1,170.0,171.0,172.0,173.0,173.8,174.5,175.3,176.1,177.0,177.5,178.4,179.0,179.9,180.5,181.2,182.0,182.7,183.4,184.3,185.0,185.9,186.2,187.1,187.9,188.2,189.2,190.0,190.7,191.5,192.2,192.9,193.6,194.2,195.0,195.8,196.6,197.2,198.0,198.8,199.3,200.0,200.8,201.5,202.3,203.0,203.5,204.2,205.2,206.1,207.0,207.8,208.3,209.5,210.4,211.1,212.1,213.0,214.0,215.0,216.0,217.0,218.0,219.1,220.0,221.2,222.3,223.7,224.5,225.8,227.0,228.4,230.0,231.1,232.8,234.0,235.3,237.0,238.4,240.0,241.8,243.2,245.0,246.4,248.0,250.0,251.7,253.3,255.0,257.0,259.0,261.0,263.0,264.6,266.0,268.0,269.5,271.0,272.0,272.8,273.5,273.9,274.0,274.0,273.9,273.6,273.0,272.3,270.8,269.0,267.0,265.0,262.0];

const figure8_speed = 299.7925;

function figure8(input) {
	// input object:
	// frequency (kHz)
	// callsign
	// power (kW)
	// height (unit dependent)
	// length (unit dependent)
	// count
	// units

	var resultObj = {
		result: "fail",
		reason: "incomplete",
		input: input
	}

	try {
		const freqMhz = input.frequency / 1000;
		var lambda = {};
		lambda.meters = figure8_speed / freqMhz;
		lambda.feet = lambda.meters / 0.3028;
		const hmax = lambda.meters * 0.625;

		var height = {};
		var grounds = {};

		switch(input.units) {
			case "meters":
				height.meters = input.height;
				height.feet = input.height / .3028;
				height.wavelengths = input.height / lambda.meters;
				height.degrees = height.wavelengths * 360;
				grounds.meters = input.length;
				grounds.feet = input.length / .3028;
				grounds.wavelengths = input.length / lambda.meters;
				grounds.degrees = grounds.wavelengths * 360;
				break;
			case "feet":
				height.meters = input.height * .3028;
				height.feet = input.height;
				height.wavelengths = input.height / lambda.feet;
				height.degrees = height.wavelengths * 360;
				grounds.meters = input.length * .3028;
				grounds.feet = input.length;
				grounds.wavelengths = input.length / lambda.feet;
				grounds.degrees = grounds.wavelengths * 360;
				break;
			case "degrees":
				height.degrees = input.height;
				height.wavelengths = input.height/360;
				height.meters = input.height * lambda.meters / 360;
				height.feet = input.height * lambda.feet / 360;
				grounds.degrees = input.length;
				grounds.wavelengths = input.length/360;
				grounds.meters = input.length * lambda.meters / 360;
				grounds.feet = input.length * lambda.feet / 360;
				break;
			default:
				resultObj.reason = "Invalid Units";
				return resultObj;
		}

		var offsets = {};
		offsets.i0 = Math.floor(height.wavelengths / .005);
		offsets.i1 = offsets.i0 - 10;
		offsets.i2 = offsets.i1 + 1;

		if (offsets.i1 < 0 || offsets.i2 >= figure8_emv.length) {
			resultObj.reason = "Invalid offsets";
			resultObj.offsets = offsets;
			return resultObj;
		}

		var fields = {};
		fields.e0 = figure8_emv[offsets.i1] + (figure8_emv[offsets.i2] - figure8_emv[offsets.i1]) * (height.wavelengths - .005 * offsets.i0) / .005;
		fields.e1 = fields.e0;
		fields.e3 = fields.e0 * Math.sqrt(input.power);

		grounds.ngrm = Math.max(90, input.count);
		grounds.ngrd = Math.min(120, grounds.ngrm);

		fields.correction_factor = 0;
		if (input.count >= 90 && input.count<120) {
			fields.correction_factor = Math.min(fields.correction_factor, -1 * (0.2 * (120 - grounds.ngrd)));
			fields.e1 += fields.correction_factor;
		}

		grounds.correction_length = 0;
		if (grounds.wavelengths <= 0.24) {
			grounds.correction_length = -1 * (2 * Math.floor((0.25 - grounds.wavelengths) * 100));
		}
		fields.e1 += grounds.correction_length;
		fields.e2 = fields.e1 * Math.sqrt(input.power);

		//final unit adjustments
		fields.e0m = fields.e0*1.609344;
		fields.e1m = fields.e1*1.609344;
		fields.e2m = fields.e2*1.609344;
		fields.e3m = fields.e3*1.609344;
		fields.correction_factorm = fields.correction_factor * 1.609344;
		grounds.correction_lengthm = grounds.correction_length*1.609344;

		resultObj.fields = fields;
		resultObj.offsets = offsets;
		resultObj.lambda = lambda;
		resultObj.height = height;
		resultObj.grounds = grounds;
		resultObj.result="Success"
		resultObj.reason="";
		return resultObj;
	} catch(e) {
		resultObj.reason = e;
		return resultObj;
	}
	return resultObj;
}

function realerfc(x) {
	var a1,a2,a3,a4,a5,p,t;
	a1 = .2548296;
	a2 = -.2844967;
	a3 = 1.4214137;
	a4 = -1.4531520;
	a5 = 1.0614054;
	p = .3275911;
	t = 1. / (1. + p*x);
	return t*(a1 + t*(a2 + t*(a3 + t*(a4 + t*(a5)))))*Math.exp(-Math.pow(x,2));
}

function salzer_f(x, y, n){
	return 2.*x - 2.*x*Math.cosh(n*y)*Math.cos(2.*x*y) + n*Math.sinh(n*y)*Math.sin(2.*x*y);
}

function salzer_g(x, y, n){
	return 2.*x*Math.cosh(n*y)*Math.sin(2.*x*y) + n*Math.sinh(n*y)*Math.cos(2.*x*y);
}

function salzer(z) {
	// double x = real(z);
	// double y = imag(z);
	const x = z[0];
	const y = z[1];


	var SUM=[0,0];
	if (y != 0) {
		const n = Math.min(Math.floor(Math.abs(80./y)), 50);
		// console.log(`Salzer x: ${x} y: ${y} n: ${n}`);
		for (var i=1; i<=n; i++) {
			const mult = Math.exp(-.25 * Math.pow(i,2)) / (Math.pow(i,2) + 4.*Math.pow(x,2));
			SUM = complexAdd(SUM, [mult * salzer_f(x,y,i), mult * salzer_g(x,y,i)]);  
			// console.log(`Salzer Sum ${i}: ${SUM}`);
		}
	}
	var salzer = complexMultiply(SUM, [-2. * Math.exp(-Math.pow(x,2)) / pi,0]);
	// console.log("Pre-Salzer:",salzer);
	if (x != 0) {
		// salzer -= Math.exp(-Math.pow(x,2)) * (1.-Math.cos(x*y) + j*Math.sin(x*y))/(pi*x);
		const sinxy = Math.sin(x*y);
		const cosxy = Math.cos(x*y);
		const w = [ //complex number
			Math.exp(-x*x) * sinxy / (pi * x),
			0
		];
		salzer = complexSubtract(salzer, complexMultiply(w, [sinxy, cosxy]));
	}else{
		// salzer -= j*y / pi;
		salzer = complexSubtract(salzer, [0, y/pi]);
	}

	if (x >= 0) {
		// salzer += realerfc(x);
		// console.log("realerfc(x): ", realerfc(x), "Salzer:", salzer);
		salzer = complexAdd(salzer, [realerfc(x),0]);
	}else{
		// salzer += 2. - realerfc(-x);
		// console.log("realerfc(-x): ", realerfc(-x), "Salzer:", salzer);
		salzer = complexAdd(salzer, [2-realerfc(-x), 0]);
	}
	return salzer;
}

function w_function(z) {
	const c1 = .4613135;
	const c2 = .09999216;
	const c3 = .002883894;
	const d1 = .1901635;
	const d2 = 1.7844927;
	const d3 = 5.5253437;
	var output = [0,0]; // complex
	output = complexAdd(output, w_factor(c1, z, d1));
	output = complexAdd(output, w_factor(c2, z, d2));
	output = complexAdd(output, w_factor(c3, z, d3));
	output = complexMultiply([0,1], complexMultiply(z,output));
	return output;
}

function w_factor(c, z, d) {
	return complexDivide([c,0], complexSubtract(complexMultiply(z,z), [d,0]));
}

function sommerfield(rho) {
	const rhoroot = complexSqrt(rho);
	// console.log(rhoroot);
	var za = [0,0];

	if (rhoroot[0] > 3.9 || rhoroot[1] > 3.0) {
		// 3rd method
		// console.log("3rd Sommerfield");
		var w = w_function(rhoroot);
		w = complexMultiply(w, rhoroot);
		w = complexMultiply([0,Math.sqrt(pi)], w);
		za = complexAdd([1,0], w);
	} else if (complexAbs(rhoroot) > 1) {
		// console.log("2nd Sommerfield");
		// 2nd method
		var erfc = salzer(complexMultiply([0,-1], rhoroot));
		erfc = complexMultiply(complexExp(complexMultiply([-1,0],rho)), erfc);
		erfc = complexMultiply(erfc, rhoroot);
		erfc = complexMultiply(erfc, [0,Math.sqrt(pi)]);
		za = complexAdd([1,0], erfc);
	} else {
		// 1st method
		var term = [1,0];
		var SUM = [1,0];
		for (var i=1; i<=33; i++) {
			// term = term * (-2 * rho) / (2 * i - 1);
			var A = [-2 / (2*i - 1),0];
			A = complexMultiply(rho, A);
			term = complexMultiply(term, A);
			// console.log(A, rho, term, SUM);
			SUM = complexAdd(SUM, term);
			if (complexAbs(term) < (complexAbs(SUM)/100000)) break;
		}
		za = complexAdd(SUM, complexMultiply(complexMultiply([0,1], rhoroot), complexMultiply(complexExp(complexMultiply([-1,0],rho)), [Math.sqrt(pi),0])));
	}
	return za;
}

function surface(rho, delta) {
	const za = sommerfield(rho);
	const rhoroot = complexSqrt(rho);
	var zadj;
	if (complexAbs(rho) > 0.5) {
		// console.log("Zadj3", za);
		// input.debug.surfaceMethod = "Zadj3";
		zadj = zadj3(delta, rho, za);
	}else{
		// console.log("Series");
		// input.debug.surfaceMethod = "Series";
		const z1 = complexMultiply([0,1],rhoroot);
		var z3 = complexPow(complexMultiply(delta,z1),3);
		// input.debug.z1 = z1;
		// input.debug.z3 = z3;
		// z3 = complexMultiply(complexMultiply(z3, z3), z3);
		zadj = complexSubtract(za, complexMultiply(z3,
			complexSubtract(series1(z1), complexMultiply(z3,
				complexSubtract(series2(z1), complexMultiply(z3, series3(z1)))
		))));
	}
	return complexAbs(zadj);
}

function zadj1(delta, rho, za) {
	const a = complexMultiply(za, complexAdd(complex(1),complexMultiply(complex(2),rho)));
	const b = complexSqrt(complexMultiply(complex(pi), rho));
	var c = complexSubtract(a,complex(1));
	// console.log(a,b,c);
	c = complexSubtract(c, complexMultiply(j, b));
	c = complexMultiply(c, complex(1/2));
	c = complexMultiply(c, complexPow(delta,3));
	return complexAdd(za, c);
}

function zadj2(delta, rho, za) {
	const a = complexMultiply(za, complexSubtract(complexDivide(complexPow(rho,2), complex(2)), complex(1)));
	var b = complexSubtract(complex(1), rho);
	b = complexMultiply(b, complexSqrt(complexMultiply(complex(pi), rho)));
	b = complexMultiply(j, b);
	var c = complexMultiply(complex(5/6), complexPow(rho,2));
	c = complexAdd(c, complex(1));
	c = complexSubtract(c, complexMultiply(complex(2), rho));
	var d = complexAdd(a,b);
	d = complexAdd(d,c);
	d = complexMultiply(d, complexPow(delta,6));
	return complexAdd(zadj1(delta,rho,za), d);
}

function zadj3(delta, rho, za) {
	var a = complexSubtract(complex(35/8), complexDivide(complexPow(rho,2), complex(4)));
	a = complexAdd(a, complexDivide(complexPow(rho,3), complex(6)));
	a = complexMultiply(za,a);
	var b = complexSubtract(complex(35/8), complexMultiply(complex(35/8),rho));
	b = complexAdd(b, complexMultiply(complex(31/16), complexPow(rho,2)));
	b = complexSubtract(b, complexMultiply(complex(5/16),complexPow(rho,3)));
	b = complexMultiply(b, complexMultiply(j, complexSqrt(complexMultiply(complex(pi),rho))));
	var c = complexSubtract(complex(35/8), complexMultiply(complex(35/4), rho));
	c = complexAdd(c, complexMultiply(complex(67/12),complexPow(rho,2)));
	c = complexSubtract(c, complexMultiply(complex(5/3),complexPow(rho,3)));
	var d = complexSubtract(a,b);
	d = complexSubtract(d,c);
	d = complexMultiply(d, complexPow(delta,9));
	return complexAdd(zadj2(delta,rho,za), d);
}

function series1(z) {
	const sqrtpi = Math.sqrt(3.1415927);
	var oddterm = complexMultiply(complex(4/(3*sqrtpi)),z);
	var eventerm = complex(1);
	var SUM = complexAdd(eventerm, complexMultiply(complex(2),oddterm));
	var term = complex(0);
	var TEST = complex(0);
	const zsquared = complexMultiply(z,z);
	//for i in range(2,50):
	for (var i=2; i<=50; i++) {
		if (i%2 == 0){
			// eventerm = 2.*eventerm*zsquared/(i + 2.);
			eventerm = complexMultiply(complex(2/(i+2)),eventerm);
			eventerm = complexMultiply(zsquared,eventerm);
			term = eventerm;
		}else{
			// oddterm = 2.*oddterm*zsquared/(i + 2.);
			oddterm = complexMultiply(complex(2/(i+2)),oddterm);
			oddterm = complexMultiply(zsquared,oddterm);
			term = oddterm;
		}
		// SUM += term * (i+1.);
		// console.log(i, eventerm, oddterm, SUM);
		SUM = complexAdd(SUM, complexMultiply(term,complex(i+1)));
		if (complexAbs(complexSubtract(SUM,TEST)) < (complexAbs(TEST)/1000000)) {
			break;
		}
		TEST=SUM;
	}
	return complexMultiply(SUM,complex(sqrtpi/2));
}

function series2(z) {
	const sqrtpi = Math.sqrt(3.1415927);
	var oddterm = complexDivide(z,complex(6));
	var eventerm = complexDivide(complex(8), complex(15*sqrtpi));
	var SUM = complexAdd(complexMultiply(complex(7),eventerm), complexMultiply(complex(2*8),oddterm));
	var term = complex(0);
	var TEST = complex(0);
	const zsquared = complexMultiply(z,z);
	//for i in range(2,50):
	for (var i=2; i<=50; i++) {
		if (i%2 == 0){
			// eventerm = 2.*eventerm*zsquared/(i + 2.);
			eventerm = complexMultiply(complex(2/(i+5)),eventerm);
			eventerm = complexMultiply(zsquared,eventerm);
			term = eventerm;
		}else{
			// oddterm = 2.*oddterm*zsquared/(i + 2.);
			oddterm = complexMultiply(complex(2/(i+5)),oddterm);
			oddterm = complexMultiply(zsquared,oddterm);
			term = oddterm;
		}
		// SUM += term * (i+1.);
		// console.log(i, eventerm, oddterm, SUM);
		SUM = complexAdd(SUM, complexMultiply(term,complex((i+1)*(i+7))));
		if (complexAbs(complexSubtract(SUM,TEST)) < (complexAbs(TEST)/1000000)) {
			break;
		}
		TEST=SUM;
	}
	return complexMultiply(SUM,complex(sqrtpi/8));
}

function series3(z) {
	const sqrtpi = Math.sqrt(3.1415927);
	var oddterm = complexMultiply(complex(32/(945*sqrtpi)),z);
	var eventerm = complex(1/24);
	var SUM = complexAdd(complexMultiply(complex(126),eventerm), complexMultiply(complex(2*147),oddterm));
	var term = complex(0);
	var TEST = complex(0);
	const zsquared = complexMultiply(z,z);
	//for i in range(2,50):
	for (var i=2; i<=50; i++) {
		if (i%2 == 0){
			// eventerm = 2.*eventerm*zsquared/(i + 2.);
			eventerm = complexMultiply(complex(2/(i+8)),eventerm);
			eventerm = complexMultiply(zsquared,eventerm);
			term = eventerm;
		}else{
			// oddterm = 2.*oddterm*zsquared/(i + 2.);
			oddterm = complexMultiply(complex(2/(i+8)),oddterm);
			oddterm = complexMultiply(zsquared,oddterm);
			term = oddterm;
		}
		// SUM += term * (i+1.);
		// console.log(i, eventerm, oddterm, SUM);
		SUM = complexAdd(SUM, complexMultiply(term,complex((i+1)*(i*i + 20*i+126))));
		if (complexAbs(complexSubtract(SUM,TEST)) < (complexAbs(TEST)/1000000)) {
			break;
		}
		TEST=SUM;
	}
	return complexMultiply(SUM,complex(sqrtpi/48));
}

function gwave(input) {

	input.debug = {};

	if (input.frequency > 2) input.frequency /= 1000;
	if (input.frequency > 2 || input.frequency < 0.5) return -1; 

	const wavelength = c_in_air / (input.frequency * 1e6);
	const x = 2*Math.pow(c_in_air*1e-5,2) * input.sigma/input.frequency;
	const b2 = Math.fround(Math.atan2(input.epsilon,x));
	const b1 = Math.fround(Math.atan2(input.epsilon-1,x));
	const b = 2*b2 - b1; //numerical distance phase
	const p = Math.fround(pi * input.distance * Math.pow(Math.cos(b2),2) / (wavelength * x * Math.cos(b1))); //numerical distance magnitude
	const k = Math.fround(Math.pow(wavelength / (2 * pi * adjusted_earth_radius), 1/3) * Math.sqrt(x * Math.cos(b1))/Math.cos(b2)); //Norton's K
	const rho = complexPolar(p,b);
	const rhoroot = complexSqrt(rho);
	const delta = complexPolar(k, pi * 3/4 - b/2);
	const chi = (input.distance / adjusted_earth_radius) * Math.pow(2*pi*adjusted_earth_radius/wavelength, 1/3);
	const critical_distance = 80 * Math.pow(1.3333, .6666) / Math.pow(input.frequency, .3333);

	var attenuation;

	if (input.distance < critical_distance) {
		attenuation = surface(rho, delta);
		// console.log("Surface Attenuation", attenuation);
		input.method = "Surface";
	}else{
		// console.log("Residues",input.distance, critical_distance);
		attenuation = residues(chi, k, b/2, delta);
		input.method = "Residues";
	}

	// console.log(`x: ${x}, b2: ${b2}, b1: ${b1}, b: ${b}, p: ${p}, k: ${k}, rho: ${rho}, rhoroot: ${rhoroot}, delta: ${delta}, chi: ${chi}, critical_distance: ${critical_distance}, attenuation: ${attenuation}`);

	input.attenuation = attenuation;
	input.rho = rho;
	input.rhoroot = rhoroot;
	input.delta = delta;
	input.x = x;
	input.b2 = b2;
	input.b1 = b1;
	input.b = b;
	input.p = p;
	input.k = k;
	input.chi = chi;
	input.critical_distance = critical_distance;
	input.output = (Math.sqrt(input.erp) * attenuation * input.field / input.distance);
	input.single_precision = Math.fround(input.output);
	return input.output;
}

function tfn(airy) {
// 	Function producing TAU0 or TAU1 from the amplitude AIRY0 or AIRY1:
	return complexMultiply(complex(airy / Math.pow(2,1/3)), complexExp([0,pi/3]));
}


function taufn0(tau, delta) {
	const c3 = complexMultiply(complex(-2/3),tau);
	const c5 = complexMultiply(complex(-4/5), complexPow(tau,2));
	const c6 = complexMultiply(complex(14/9),tau);
	// c7 = -(5.+8.* pow(tau,3.))/7.
	const c7 = complexDivide( complexAdd(complex(5), complexMultiply(complex(8), complexPow(tau,3))),complex(-7));
	// c8 = 58./15.* pow(tau,2.)
	const c8 = complexMultiply(complex(58/15), complexPow(tau,2));
	// c9 = -tau*(2296./567. +16./9. * pow(tau,3.) )
	var c9 = complexMultiply(complex(16/9), complexPow(tau,3));
	c9 = complexAdd(complex(2296/567), c9);
	c9 = complexMultiply(tau,c9);
	c9 = complexMultiply(complex(-1), c9);
	// c10 = 47./35. + 4656./525.* pow(tau,3.)
	var c10 = complexMultiply(complex(4656/525), complexPow(tau,3));
	c10 = complexAdd(complex(47/35), c10);

	var output = (c10);
	output = complexAdd(c9, complexMultiply(delta,output));
	output = complexAdd(c8, complexMultiply(delta,output));
	output = complexAdd(c7, complexMultiply(delta,output));
	output = complexAdd(c6, complexMultiply(delta,output));
	output = complexAdd(c5, complexMultiply(delta,output));
	output = complexAdd(complex(1/2), complexMultiply(delta,output));
	output = complexAdd(c3, complexMultiply(delta,output));
	output = complexAdd(complex(0), complexMultiply(delta,output));
	output = complexAdd(complex(-1), complexMultiply(delta,output));
	output = complexAdd(tau, complexMultiply(delta,output));
	return output;
}

function taufn1(tau, q) {
	//print(t,q)
	// complex<double> d1 = -1./(2.*t);
	const d1 = complexDivide(complex(-1/2), tau);
	// complex<double> d2 = -1./(8.*pow(t,3));
	const d2 = complexDivide(complex(-1/8),complexPow(tau,3));
	// complex<double> d3 = -(1./pow(t,2))*(1./12. + 1./(16.*pow(t,3)));
	var d3 = complexDivide(complex(1/16), complexPow(tau,3));
	d3 = complexAdd(complex(1/12),d3);
	d3 = complexMultiply(complexDivide(complex(-1),complexPow(tau,2)),d3);
	// complex<double> d4 = -(1.0/pow(t,4))*( 7.0/96.0 + 5.0/(128.0*pow(t,3) ) );
	var d4 = complexDivide(complex(5/128),complexPow(tau,3));
	d4 = complexAdd(complex(7/96), d4);
	d4 = complexMultiply(complexDivide(complex(-1),complexPow(tau,4)),d4);
	// complex<double> d5 = -(1.0/pow(t,3))*(1.0/40.0 + (1.0/pow(t,3))*(21.0/320. + 7.0/(256.0*pow(t,3)) ));
	var d5 = complexDivide(complex(7/56),complexPow(tau,3));
	d5 = complexAdd(complex(21/320), d5);
	d5 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d5);
	d5 = complexAdd(complex(1/40), d5);
	d5 = complexMultiply(complexDivide(complex(-1),complexPow(tau,3)),d5);
	// complex<double> d6 = -(1.0/pow(t,5)) * ( 29.0/ 720.0 + 1.0/(pow(t,3)) * ( 77.0/1280.0 + 21.0/(1024.0*pow(t,3)) ));
	var d6 = complexDivide(complex(21/1024),complexPow(tau,3));
	d6 = complexAdd(complex(77/1280), d6);
	d6 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d6);
	d6 = complexAdd(complex(29/720), d6);
	d6 = complexMultiply(complexDivide(complex(-1),complexPow(tau,5)),d6);
	// complex<double> d7 = -(1.0/pow(t,4))*(1.0/112.0 + (1.0/pow(t,3))*(19.0/360.0 + (1.0/pow(t,3))*( 143.0/2560 + 33.0/( 2048.0 * pow(t,3) ) )));
	var d7 = complexDivide(complex(33/2048),complexPow(tau,3));
	d7 = complexAdd(complex(143/2560), d7);
	d7 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d7);
	d7 = complexAdd(complex(19/360), d7);
	d7 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d7);
	d7 = complexAdd(complex(1/112), d7);
	d7 = complexMultiply(complexDivide(complex(-1),complexPow(tau,4)),d7);
	// complex<double> d8 = -(1.0/pow(t,6))*( 97.0/4480 + (1.0/pow(t,3))*(163.0/2560 + (1.0/pow(t,3))*(429.0/8192 + 429.0/( 32768.0 * pow(t,3) ) )));
	var d8 = complexDivide(complex(429/32768),complexPow(tau,3));
	d8 = complexAdd(complex(49/8192), d8);
	d8 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d8);
	d8 = complexAdd(complex(163/2560), d8);
	d8 = complexMultiply(complexDivide(complex(1),complexPow(tau,3)),d8);
	d8 = complexAdd(complex(97/4480), d8);
	d8 = complexMultiply(complexDivide(complex(-1),complexPow(tau,6)),d8);
	// complex<double> out = t + q*(d1 + q*(d2 + q*(d3 + q*(d4 + q*(d5 + q*(d6 + q*(d7 + q*(d8))))))));

	var out = d8;
	out = complexAdd(d7, complexMultiply(q,out));
	out = complexAdd(d6, complexMultiply(q,out));
	out = complexAdd(d5, complexMultiply(q,out));
	out = complexAdd(d4, complexMultiply(q,out));
	out = complexAdd(d3, complexMultiply(q,out));
	out = complexAdd(d2, complexMultiply(q,out));
	out = complexAdd(d1, complexMultiply(q,out));
	out = complexAdd(tau, complexMultiply(q,out));

	return out;
}

function gw_chart(frequency) {
	var chart = {};
	am_sigmas.forEach( (sigma) => {
		chart[sigma] = [];
		am_distances.forEach( (dist) => {
			const input = {
				sigma: sigma,
				epsilon: (sigma==5000)?80:15,
				frequency: frequency,
				erp: 1,
				field: 100,
				distance: dist
			};
			chart[sigma].push(gwave(input));
		});
	});
	return chart;
}


function airy0(s) {
	 if(s < 10) {
	 	return a0[s];
	 }else{
		const x_s = 3. * pi * (4*(s+1) - 1)/8;
		return (Math.pow((x_s),2 / 3.0) * (1 + 5 / 48 * Math.pow(1.0 / (x_s),2.0)));
	}
}

function airy1(s) {
	if(s < 10) {
		return a1[s];
	}else{
		const y_s = (3.0 * pi * (4 * (s+1) - 3) / 8.0);
		return (Math.pow((y_s),2 / 3) * (1 - 7 / 48 * Math.pow(1.0 / (y_s),2.0)));
	}
}

function deltau(T, D, DELDEL) {
	var output = complexMultiply(T,complexPow(D,2));
	output = complexMultiply(complex(2), output);
	output = complexSubtract(output, complex(1));
	output = complexDivide(DELDEL, output);
	return output;
}

const residue_options = {
	precision: 1e-5,
	fineness: 1e-3,
	maxterms: 50,
	minsteps: 5
}

function residues(chi, k, psi, delta) {
	var deldel, delnew; //complex
	var test = complex(0);
	var zs = complex(0);
	var numpoints = 0;
	var tau=[];
	var qsqr = complexPow(complexDivide(complex(1),delta), 2);
	const N = Math.max(5, Math.floor(complexAbs(delta) / residue_options.fineness));
	// console.log(`Residues N: ${N}`);

	for (var s=1; s <= residue_options.maxterms; s++) {
		const tau0 = tfn(airy0(s-1));
		const tau1 = tfn(airy1(s-1));
		// console.log(`\tTau0: ${tau0}\tTau1: ${tau1}`);

		if ( complexAbs(complexMultiply(tau0,complex(Math.pow(k,2)))) < 0.16) {
			// console.log("Small k");
			tau[s] = taufn0(tau0, delta);
		}else if ( complexAbs(complexMultiply(tau1,complex(Math.pow(k,2)))) > 1.44) {
			// console.log("Large K");
			tau[s] = taufn1(tau1, complexDivide(complex(1), delta));
		}else{
			// console.log("Integrating");
			var T = tau0;
			// deldel = complexDivide(delta, complex(N));
			var z1;
			if ( complexAbs(delta) >= residue_options.fineness * residue_options.minsteps) {
				z1 = complexMultiply(complex(residue_options.fineness / complexAbs(delta)), delta);
			}else{
				z1 = complexDivide(delta, complex(residue_options.minsteps));
			}
			var del1 = complex(0);

			while (complexAbs(del1) - complexAbs(delta) < 0) {
				deldel = complexMultiply(z1, complex(Math.min(1,complexAbs(complexSubtract( complexMultiply(complex(2), complexMultiply(T, complexPow(del1,2))) , complex(1))))));
				T = taustep(T,del1,deldel);
				// console.log(T, del1, deldel);
				del1 = complexAdd(del1,deldel);
			}

			tau[s] = taustep(T, del1, complexSubtract(delta, del1));

			numpoints = s;
			// for (var i=1; i <= N+1; i++) {
			// 	const TK1 = deltau(T, del1, deldel);
			// 	del1 = complexAdd(del1, complexDivide(deldel,complex(2)));
			// 	const TK2 = deltau(complexAdd(T,complexDivide(TK1,complex(2))), del1, deldel);
			// 	const TK3 = deltau(complexAdd(T,complexDivide(TK2,complex(2))), del1, deldel);
			// 	del1 = complexAdd(del1, complexDivide(deldel,complex(2)));
			// 	const TK4 = deltau(complexAdd(T,TK3), del1, deldel);
			// 	T = complexAdd(T, complexDivide(complexAdd(complexAdd(TK1, complexMultiply(complex(2),TK2)), complexAdd(TK4, complexMultiply(complex(2),TK3))),complex(6)))
			// }
			// tau[s] = T;
		}

		const numerator = complexExp(complexMultiply(complexMultiply(j, tau[s]), complex(chi)));
		const denominator = complexSubtract(complexMultiply(complex(2), tau[s]), qsqr);
		// console.log(numerator, denominator);
		zs = complexAdd(zs, complexDivide(numerator, denominator));
		if (complexAbs(complexSubtract(test, zs)) < residue_options.precision * complexAbs(test)) {
			// console.log("Precision Break",test, zs);
			break;
		}
		test = zs;
	}
	// console.log(tau);

	return complexAbs(zs) * Math.fround(Math.sqrt(2*pi*chi));
}


function taustep(TA, dell, delde) {
	var a = complexPow(dell,2);
	a = complexMultiply(complex(2), complexMultiply(TA, a));
	a = complexSubtract(a, complex(1));
	a = complexDivide(delde, a);

	var b = complexPow(dell,2);
	b = complexMultiply(complex(2), complexMultiply(TA, b));
	b = complexSubtract(b, complex(1));
	b = complexDivide(complexPow(delde,2), complexPow(b,3));

	var c = complexMultiply(dell, complexPow(TA,2));
	c = complexMultiply(complex(4), c);
	c = complexAdd(c,complex(1));
	c = complexMultiply(dell, c);
	c = complexSubtract(complexMultiply(complex(2), TA), c);
	c = complexMultiply(c, dell);

	var output = complexAdd(TA, a);
	output = complexAdd(output, complexMultiply(b,c));
	return output;
}

function complexPolar(r,a) {
	return [
		r * Math.cos(a),
		r * Math.sin(a)
	]
}

function complex(a) {
	return [a,0];
}

function complexAbs([a,b]) {
	return Math.sqrt(a*a + b*b);
}

function complexSqrt([c,d]) {
	const a = Math.sqrt( (c + Math.sqrt(c*c + d*d)) / 2);
	const b = ((d<0)?-1:1) * Math.sqrt( (-c + Math.sqrt(c*c + d*d)) / 2);
	return [a,b];
}

function complexExp([a,b]) {
	const A = Math.fround(Math.exp(a) * Math.cos(b));
	const B = Math.fround(Math.exp(a) * Math.sin(b));
	return [A,B];
}

function complexCos(z) {
	return [
		Math.cos(z[0]) * Math.cosh(z[1]),
		-Math.sin(z[0])*Math.sinh(z[1])
	];
}

function complexMultiply(z1, z2) {
	return [
		z1[0] * z2[0] - z1[1] * z2[1],
		z1[0] * z2[1] + z1[1] * z2[0]
	]
}

function complexDivide([a,b], [c,d]) {
	const A = (a*c + b*d) / (c*c + d*d);
	const B = (b*c - a*d) / (c*c + d*d);
	return [A,B];
}

function complexAdd(z1, z2) {
	return [
		z1[0] + z2[0],
		z1[1] + z2[1]
	];
}

function complexSubtract(z1, z2) {
	return [
		z1[0] - z2[0],
		z1[1] - z2[1]
	];
}

function complexPow([a,b],n) {
	const r = complexAbs([a,b]);
	const theta = Math.atan2(b,a);
	const R = Math.pow(r,n);
	const T = theta * n;
	return [
		R * Math.cos(T),
		R * Math.sin(T)
	]
}

function compareCurves(array1, array2) {
	if (array1.length != array2.length) return "Different Sizes";
	for (var i=0; i<array1.length; i++) {
		result = {
			i: i,
			a1: array1[i],
			a2: array2[i],
			d: array2[i] - array1[i],
			p: 100 * Math.abs(array2[i]-array1[i]) / array1[i]
		};
		if (result.p > .001) console.log(result);
	}
}

function gwFit(freq, dist, rad, field, resolution) {
	var error = 0;
	if (freq > 2) {
		freq /= 1000;
	}

	var output = {
		result: "error",
		iterations: 0
	}

	if (freq > 2 || freq < 0.5) {
		return {result: "error", detail: "Invalid Frequency"};
	}

	if (field==0) return {result: "error", detail: "Invalid measured field"};

	var input = {
		frequency: freq,
		sigma: 10,
		epsilon: 15,
		distance: dist,
		erp: 1,
		field: rad
	};

	while(Math.abs(error-1) > resolution) {
		output.iterations++;
		error = field / gwave(input);
		input.sigma *= error;

		if (input.sigma <= 0.1) {
			output.sigma = 0.1;
			output.detail = "Sigma <0.1";
			return output;
		};
		if (input.sigma > 5000) {
			output.sigma = 5000;
			output.detail = "Sigma >5000";
			return output;
		};
	}

	output.result="Success";
	output.sigma = input.sigma;
	output.detail = input;
	return output;
}

function gwaveDistance(input, resolution) {
	var error = 0;
	input.distance = 200;
	resolution = resolution ?? 0.0001;
	while (Math.abs(error - 1) > resolution) {
		error = input.target / gwave(input);
		input.distance /= error;
		// console.log(input.distance, error);
		if (input.distance < 0.1) return 0.1;
		if (input.distance > 5000) return 5000;
	}
	return input.distance;
}

function isOldCA(facilityId) {
// $old_canadian["106062"] = "540 CBK Watrous SK";    
// $old_canadian["100571"] = "640 CBN St Johns NF";
// $old_canadian["188558"] = "690 CBF Montreal QC";
// $old_canadian["120429"] = "690 CBF Montreal QC";
// $old_canadian["190079"] = "690 CBF Montreal QC";
// $old_canadian["136769"] = "740 CBL Toronto ON";
// $old_canadian["98913"] = "860 CJBC Toronto ON";
// $old_canadian["99242"] = "990 CBW Winnipeg MB";
// $old_canadian["99454"] = "1010 CBR Calgary AB";
// $old_canadian["100717"] = "1130 CKWX Vancouver BC";
// $old_canadian["105856"] = "1550 CBE Windsor ON";

	const oldCanadians = [
		106062,
		100571,
		188558,
		120429,
		190079,
		136769,
		98913,
		99242,
		99454,
		100717,
		105856
	];

	return oldCanadians.includes(Number(facilityId));
}

function timezone(lat, lon) {
	return {
		name: "demo",
		utcOffset: -5,
		dtOffset: -4
	}
}

function diurnalFactors(origin, mid, end, frequency) {
	const srssOriginTimes = srssTimes(origin.lat, origin.lon);
	const srssEndTimes = srssTimes(end.lat, end.lon);
	const srssMidTimes = srssTimes(mid.lat, mid.lon);

	//find the timezone and utc offsets for each point
	//Wow, this is expensive ... in the meantime we're going to simulate
	const srssOriginTz = timezone(origin.lat, origin.lon);
	const srssEndTz = timezone(end.lat, end.lon);
	const srssMidTz = timezone(end.lat, end.lon);

	//Now for each month we find the factors
	var factors = [];
	factors[0] = {
		origin: srssOriginTimes,
		mid: srssMidTimes,
		end: srssEndTimes,
		origintz: srssOriginTz,
		endtz: srssEndTz,
		midtz: srssMidTz
	};
	for (var month=1; month <= 12; month++) 	{
		factors[month] = {
			sunrise: {},
			sunset: {}
		};
		//sunrise factors
		// factors[month].sunriseDifference = srssOriginTimes[month].sunrise - srssMidTimes[month].sunrise;
		if (month >= 4 && month <= 10) { //DST
			for (var t=0; t <= 3; t += 0.25) {
				const txTime = (6 - srssOriginTz.dtOffset + t) * 60; //Computation time is referenced from 6 AM of the interfering station
				const rxTime = srssMidTimes[month].sunrise_rounded;
				// console.log(txTime, rxTime, frequency);
				factors[month].sunrise[t] = diurnalInterpolate(txTime - rxTime, frequency, psrConstants);
			}
		}else{
			for (var t=0; t <= 3; t += 0.25) { //Standard Time
				const txTime = (6 - srssOriginTz.utcOffset + t) * 60; //Computation time is referenced from 6 AM of the interfering station
				const rxTime = srssMidTimes[month].sunrise_rounded;
				// console.log(txTime, rxTime, frequency);
				factors[month].sunrise[t] = diurnalInterpolate(txTime - rxTime, frequency, psrConstants);
			}
		}

		factors[month].sunsetDifference = srssOriginTimes[month].sunset_rounded - srssMidTimes[month].sunset_rounded;
		for (var t=0.25; t <= 2; t += 0.25) {
			factors[month].sunset[t] = diurnalInterpolate(factors[month].sunsetDifference + 60 * t, frequency, pssConstants);
		}
	}

	return factors;
}

const pssConstants = {
	constants: [ //These are in reverse order from the rules, organized from low to high instead.
			[-0.0024,0.0141,-0.0141,0.0091],
			[-0.0012,0.0122,-0.0076,0.0076],
			[0.0018,0.0052,0.0069,0.0042],
			[0.001,0.0135,0.0103,0.0047],
			[-0.0043,0.0452,-0.004,0.0103],
			[0.0152,-0.0002,0.0786,-0.0185],
			[0.0203,0.0132,0.1166,-0.034],
			[0.0278,0.0458,0.1473,-0.0486],
			[0.0002,0.3024,-0.054,0.0086],
			[0.0382,0.3706,-0.0673,0.0171],
			[0.1186,0.4281,-0.0799,0.0197],
			[0.3003,0.405,-0.0961,0.0256],
			[0.5486,0.1401,0.0952,-0.0288],
			[0.6756,0.1518,0.0279,-0.0163],
			[0.7196,0.3583,-0.228,0.0611],
			[0.9495,-0.0187,0.072,-0.029]
		],
	lower: -2,
	upper: 1.75
}

const psrConstants = {
	constants: [
			[1.3084, .0083, -.0155, .0144],
			[1.3165, -.4919, 0.6011, -0.1884],
			[1.0079, .0296, .1488, -0.0452],
			[.7773, .3751, -0.1911, 0.0736],
			[.6230, .1547, 0.2654, -0.1006],
			[.3718, .1178, 0.3632, -0.1172],
			[.2151, .0737, 0.4167, -0.1413],
			[.2027, -.2560, 0.7269,-0.2577],
			[.1504, -.2325, 0.5374, -0.1729],
			[.1057, -.2092, 0.4148, -0.1239],
			[.0642, -.1295, 0.2583, -0.0699],
			[.0446, -.1002, 0.1754, -0.0405],
			[.0148, .0135, 0.0462, 0.0010]
		],
	lower: -2,
	upper: 1
}

function diurnalInterpolate(time, frequency, table) {
	// Time comes in as minutes before or after SR or SS, e.g. 72 or -33
	//convert that to hours
	const timeHours = time / 60;

	// Frequency needs to be in MHz
	if (frequency > 2) frequency /= 1000;

	var result = {
		timeHours: roundX(timeHours,3),
		timeLow: roundX(timeHours,3),
		timeHigh: roundX(timeHours,3),
		factorHigh: 1,
		factorLow: 1,
		factor: 1,
		index: -1
	}

	if (timeHours > table.upper || timeHours < table.lower) {
		return result;
	}

	//time is somewhere in the chart, so we need to index it.
	result.index = Math.floor((timeHours - table.lower)/.25);

	// console.log(time, result.index, frequency);
	try {
		result.factorLow = diurnalCalc(table.constants[result.index], frequency);
		result.factorHigh = diurnalCalc(table.constants[result.index + 1], frequency);
		result.timeLow = table.lower + 0.25 * result.index;
		result.timeHigh = result.timeLow + 0.25;
	}
	catch(e) {
		console.error(e, result);
	}


	result.factor = semilog_interpolate(result.timeLow, result.timeHigh, result.factorLow, result.factorHigh, timeHours);

	return result;

}

function diurnalCalc(row, frequency) {
	try {
		var result = row[0];
		result += row[1] * Math.pow(frequency, 1);
		result += row[2] * Math.pow(frequency, 2);
		result += row[3] * Math.pow(frequency, 3);
		return Math.min(result,1);
	} catch(e) {
		return 1;
	}

}