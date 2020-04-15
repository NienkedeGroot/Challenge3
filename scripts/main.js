// API van mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibmllbmllZGciLCJhIjoiY2s4dWpqMG5rMDl1ZTNob2t3Y2s2NzVvbyJ9.y4YfwJsuliigd53EMCO3Gw';

// API van openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '5376730bab2eb7b2655a4a577d8b03ce';

// De plaatsen waar het 'weer' word laten zien
var cities = [
  {
    name: 'Monster',
    coordinates: [4.172568, 52.023033]
  },
  {
    name: 'sGravenzande',
    coordinates: [4.166954, 52.000454]
  },
  {
    name: 'Naaldwijk',
    coordinates: [4.207764, 51.991287]
  },
  {
    name: 'Poeldijk',
    coordinates: [4.218751, 52.022400]
  },
  {
    name: 'Wateringen',
    coordinates: [4.273020, 52.023189]
  },
  {
    name: 'Kwinsheul',
    coordinates: [4.255484, 52.013874]
  },
  {
    name: 'Honselersdijk',
    coordinates: [4.236450, 52.002517]
  },
  {
    name: 'De Lier',
    coordinates: [4.250813, 51.973414]
  },
  {
    name: 'Maasdijk',
    coordinates: [4.213995, 51.957742]
  },
];

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [4.208641, 52.001541],
  zoom: 11
});

// map.on('load', function () {

//   // laad een extern bestand
//   map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {

//       // voeg image toe
//       map.addImage('cat', image);

//       // defineer een punt in het geheugen
//       map.addSource('point', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [{
//             type: 'Feature',
//             geometry: {
//               type: 'Point',
//               coordinates: [4.32284, 52.067101]
//             }
//           }]
//         }
//       });

//       // plak de nieuwe source 'point' op de kaart in een eigen layer
//       map.addLayer({
//         id: 'points',
//         type: 'symbol',
//         source: 'point',
//         layout: {
//           'icon-image': 'cat',
//           'icon-size': 0.25
//         }
//       });
//     }
//   );
//   });


// haal de data van het weer op, en zet het op de kaart
map.on('load', function () {
  cities.forEach(function(city) {

    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Hier word het weer van nu op de plaatsen gezet bij City's die hierboven staan
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Plaats het weer icoontje op de kaart
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}




// markers neerzetten om te landen

//Monster
var popup1 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>Monster</h3><p>Ruimte om te landen aan de Tweetandschelp straat</p>');

// Adding a marker based on lon lat coordinates
var marker1 = new mapboxgl.Marker()
  .setLngLat([4.160787, 52.020350])
  .setPopup(popup1)
  .addTo(map);

//sGravenzande
  var popup2 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>sGravenzande</h3><p>Ruimte om te landen aan de Rijnvaartweg</p>');

// Adding a marker based on lon lat coordinates
var marker2 = new mapboxgl.Marker()
  .setLngLat([4.173443, 52.003382])
  .setPopup(popup2)
  .addTo(map);


//Naaldwijk
  var popup3 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>Naaldwijk</h3><p>Ruimte om te landen in het centrum van Naaldwijk</p>');

// Adding a marker based on lon lat coordinates
var marker3 = new mapboxgl.Marker()
  .setLngLat([4.204154, 51.992540])
  .setPopup(popup3)
  .addTo(map);


//Maasdijk
var popup4 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>Maasdijk</h3><p>Ruimte om te landen bij sportcafe Maasdijk</p>');

// Adding a marker based on lon lat coordinates
var marker4 = new mapboxgl.Marker()
  .setLngLat([4.207642, 51.958533])
  .setPopup(popup4)
  .addTo(map);


//De Lier
var popup5 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>De Lier</h3><p>Ruimte om te landen aan de Burgermeester van doornlaan</p>');

// Adding a marker based on lon lat coordinates
var marker5 = new mapboxgl.Marker()
  .setLngLat([4.240833, 51.972099])
  .setPopup(popup5)
  .addTo(map);


//Honselersdijk
var popup6 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>Honserlersdijk</h3><p>Ruimte om te landen aan de Johan van Oldenbarneveldtstraat</p>');

// Adding a marker based on lon lat coordinates
var marker6 = new mapboxgl.Marker()
  .setLngLat([4.237235, 52.007625])
  .setPopup(popup6)
  .addTo(map);

//Poeldijk
var popup7 = new mapboxgl.Popup().setHTML('<h2>Landingsruimte</h2><h3>Poeldijk</h3><p>Ruimte om te landen op het voetbalveld van Verburch</p>');

// Adding a marker based on lon lat coordinates
var marker7 = new mapboxgl.Marker()
  .setLngLat([4.240049, 52.025149])
  .setPopup(popup7)
  .addTo(map);































