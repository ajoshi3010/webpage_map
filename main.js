import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, TileWMS, Vector as VectorSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';

const map = new Map({
  target: 'map-container',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: './data/barren.json',
      }),
    }),
  ],
  view: new View({
    center: [17.387140, 78.491684],
    zoom: 2,
  }),
});

const drawSource = new VectorSource();
const drawLayer = new VectorLayer({
  source: drawSource,
});

const draw = new Draw({
  source: drawSource,
  type: 'Polygon',
});
map.addInteraction(draw);

draw.on('drawend', function (event) {
  const geojsonFormat = new GeoJSON();
  const geojson = geojsonFormat.writeFeature(event.feature);
  console.log(geojson);
  // You can now use the 'geojson' object as needed.
});

map.addLayer(drawLayer);
