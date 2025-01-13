const express = require('express');
const app= express();
const readm3 = require('./readm3.js');


app.get('/m3', (req, res) => {
    // console.log(req);
    res.writeHead(200, {"Content-Type": "application/json"});
    let conductivities;
    try {
        console.log(req.query);
        let lat = req.query.lat;
        let lon = req.query.lon;
        let interval = req.query.interval;
        let maxdist = req.query.dist;

        if (validate(maxdist, lat, lon, interval)) {
            conductivities = readm3.getAllPaths([lat,lon], interval, maxdist, 'm3');
        }else{
            conductivities = {result: "error", error: "validation"};
        }

        
    } catch(e) {
        conductivities = {result: "error", error: e};
    }


    res.end(JSON.stringify(conductivities));
});

app.get('/r2', (req, res) => {
    // console.log(req);
    res.writeHead(200, {"Content-Type": "application/json"});
    let conductivities;
    try {
        console.log(req.query);
        let lat = req.query.lat;
        let lon = req.query.lon;
        let interval = req.query.interval;
        let maxdist = req.query.dist;

        if (validate(maxdist, lat, lon, interval)) {
            conductivities = readm3.getAllPaths([lat,lon], maxdist, 1300, 'r2');
        }else{
            conductivities = {result: "error", error: "validation"};
        }

        
    } catch(e) {
        conductivities = {result: "error", error: e};
    }


    res.end(JSON.stringify(conductivities));
});

app.listen(3000,() => {
    console.log("Server started on Port 3000");
});

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