// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the 'topographic' tile layer
let topographic = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://opentopomap.org/'>OpenTopoMap</a> contributors"
});

// Add an alternative satellite imagery layer
let satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics"
});

let myMap = L.map("map", { 
  center: [20, 0], // Adjusted center for global view
  zoom: 2, // Adjusted zoom level to ensure global earthquake visibility
  layers: [topographic] // Default layer to match reference image
});

// Create layer groups for earthquakes and tectonic plates
let earthquakes = L.layerGroup();
let tectonicPlates = L.layerGroup();

// Define baseMaps and overlays
let baseMaps = {
  "Street Map": basemap,
  "Topographic Map": topographic,
  "Satellite Map": satellite
};

let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add a control to the map to switch between layers
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Make a request that retrieves the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(function (data) {
  console.log("Earthquake data loaded:", data); // Debugging line to ensure data loads

  // This function returns the style data for each of the earthquakes we plot on
  function styleInfo(feature) {
      return {
          opacity: 1,
          fillOpacity: 0.6, // Make circles slightly more transparent
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: "black", // Add black border for contrast
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.7
      };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
      return depth > 90 ? "#ff5f65" :
             depth > 70 ? "#fca35d" :
             depth > 50 ? "#fdb72a" :
             depth > 30 ? "#f7db11" :
             depth > 10 ? "#dcf400" : "#a3f600";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
      return magnitude === 0 ? 2 : magnitude * 5; // Slightly increase size for visibility
  }

  // Add a GeoJSON layer to the earthquakes layer group
  L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
          layer.bindPopup(
              `<strong>Magnitude:</strong> ${feature.properties.mag}<br>
               <strong>Location:</strong> ${feature.properties.place}<br>
               <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`
          );
      }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap);

  // Create a legend control object.
  let legend = L.control({ position: "bottomright" });

  // Then add all the details for the legend
  legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      div.style.background = "white";
      div.style.padding = "8px";
      div.style.borderRadius = "5px";
      div.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.5)";
      
      let depths = [-10, 10, 30, 50, 70, 90],
          colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];

      div.innerHTML += "<strong>Depth (km)</strong><br>";

      // Loop through our depth intervals to generate a label with a colored square for each interval.
      for (let i = 0; i < depths.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> ' +
              depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
      }
      return div;
  };
  
  legend.addTo(myMap);
});

// OPTIONAL: Step 2
// Make a request to get our Tectonic Plate geoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function (plate_data) {
  L.geoJson(plate_data, {
      color: "orange",
      weight: 2.5 // Increase thickness for better visibility
  }).addTo(tectonicPlates);

  tectonicPlates.addTo(myMap);
});