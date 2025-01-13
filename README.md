Figure R3 of 47 CFR 73.190 (https://www.ecfr.gov/current/title-47/chapter-I/subchapter-C/part-73/subpart-A/section-73.190) contains a map of estimated ground conductivity in the United States.

This data is used to predict the propagation of AM signals across the United States. A higher ground conductivity indicates better AM propagation characteristics.  The map shows that the ground conductivity in the U.S. ranges between 0.5 and 30 millimhos (or millisiemens) per meter.  The conductivity of seawater is 5,000 millimhos per meter, resulting in the best propagation of AM signals.

The FCC also provides a page with a higher resolution color image of the map, along with digitized conductivity data in the form of m3.seq, m3hw.seq and r2.seq
https://www.fcc.gov/media/radio/m3-ground-conductivity-map

These digital sequence files are not well documented.

This project has taken those conductivity sequence files and restructured them as json objects.  It has also corrected a number of mistakes and inconsistencies within the data, including reversed conductivity values for certain segments, disjointed segment endpoints, and some typographical errors.

This project also provides a reference method of reading the conductivity segments to construct a conductivity profile that can be used to calculate an AM groundwave service or interference contour.