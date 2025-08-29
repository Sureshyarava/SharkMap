import React from 'react';
import Map from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import tonerStyle from '../assets/toner.json';

const OpenFreeMapComponent = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Map
      mapStyle={tonerStyle}
      initialViewState={{
        longitude: -82.3248,
        latitude: 29.6516,
        zoom: 5
      }}
    />
  </div>
);

export default OpenFreeMapComponent;
