import React from 'react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';

const MAPTILER_API_KEY = import.meta.env.VITE_MAP_TILE_API_KEY; // Replace with your key
const MAPTILER_MAP_ID = import.meta.env.VITE_MAP_ID;

const MapTilerComponent = () => {
  return (
    <Map
      initialViewState={{
        longitude: -122.4376,
        latitude: 37.7577,
        zoom: 13
      }}
      mapStyle={`https://api.maptiler.com/maps/${MAPTILER_MAP_ID}/style.json?key=${MAPTILER_API_KEY}`}
    >
      <NavigationControl position="top-right" />
    </Map>
  );
};

export default MapTilerComponent;
