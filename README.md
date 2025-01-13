# Introduction

[Figure R3 of 47 CFR 73.190](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-C/part-73/subpart-A/section-73.190) contains a map of estimated ground conductivity in the United States.

This data is used to predict the propagation of AM signals across the United States. A higher ground conductivity indicates better AM propagation characteristics.  The map shows that the ground conductivity in the U.S. ranges between 0.5 and 30 millimhos (or millisiemens) per meter.  The conductivity of seawater is 5,000 millimhos per meter, resulting in the best propagation of AM signals.

[The FCC also provides a page](https://www.fcc.gov/media/radio/m3-ground-conductivity-map) with a higher resolution color image of the map, along with digitized conductivity data in the form of m3.seq, m3hw.seq and r2.seq

These digital sequence files are not well documented.

# Purpose
This project has restructured the sequence files as standard json objects.  It has also corrected a number of mistakes and inconsistencies within the data, including reversed conductivity values for certain segments, disjointed segment endpoints, and some typographical errors.

This project also provides a reference method of reading the conductivity segments to construct a conductivity profile that can be used to calculate an AM groundwave service or interference contour.

# Conductivity File Structures
The m3.seq and m3hw.seq files were structured such that each line represents a conductivity segment, with an ID number, lat/lon of the endpoints, and the ground conductivity values of the two sides of the line.  The first conductivity value corresponds to the North side of the segment (or East if it's a longitudinal line).

The r2.seq file is structured differently, with more of a "polyline" style, combining strings of segments and then again providing a pair of conductivities for either side of the combined polyline.

To be more consistent, The conductivity JSON objects use the same format for both m3 and r2 data.  The data is structured into an array of segments.  Each segment is an array with: 
```
[
    segment id,
    lat1,
    lon1,
    lat2,
    lon2,
    sigma1 (n/e),
    sigma2 (s/w),
    bearing1 (point 1 to point 2),
    bearing2 (point 2 to point 1)
]
```
The bearings between segment endpoints were not included in the original sequnce files but have proven useful to spare the constant recalculation of their values.
# Usage

A simple API server is provided with the endpoints /m3 and /r2
required parameters are:
lat: test point latitude in degrees North
lon: test point longitude in degrees West (positive or negative values are accepted, but all are subsequently adjusted into the Western hemisphere)
dist: maximum distance in kilometers (typically 1300 km)
interval: degrees between test paths (typically 1, 5, or 10)


# Installation
Clone this git\
cd into the destination folder\
run: 
```
npm install
node server.js
```

The server will begin running on localhost port 3000.

# Examples
http://localhost:3000/m3?lat=30&lon=90&dist=1300&interval=1
\
http://localhost:3000/r2?lat=30&lon=90&dist=1300&interval=1