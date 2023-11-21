import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Link from 'ol/interaction/Link';
import Draw from 'ol/interaction/Draw';

// import ol from 'ol';
var drawSource = new VectorSource();
var drawLayer = new VectorLayer({
  source: drawSource
  // style: new ol.style.Style({
  //   fill: new ol.style.Fill({
  //     color: 'rgba(255, 255, 255, 0.2)'
  //   }),
  //   stroke: new ol.style.Stroke({
  //     color: '#ffcc33',    
  //     width: 2
  //   }),
  //   image: new ol.style.Circle({
  //     radius: 7,
  //     fill: new ol.style.Fill({
  //       color: '#ffcc33'
  //     })
  //   })
  // })
});


const map=new Map({
  target: 'map-container',
  layers: [
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: './data/barren.json',
      }),
    }),
    drawLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
var draw = new Draw({
  source: drawSource,
  type: 'Polygon'
});
map.addInteraction(draw);
draw.on('drawend', function(event) {
  var geojsonFormat = new GeoJSON();
  var geojson = geojsonFormat.writeFeature(event.feature);
  console.log(geojson);
  // You can now use the 'geojson' object as needed.
});
map.addInteraction(new Link());
