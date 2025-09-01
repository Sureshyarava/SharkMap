import React from 'react';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl/maplibre';
import { markerData } from '../data/markerData';

const MAPTILER_API_KEY = import.meta.env.VITE_MAP_TILE_API_KEY; // Replace with your key
const MAPTILER_MAP_ID = import.meta.env.VITE_MAP_ID;

const MapTilerComponent = () => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  return (
    <Map
      initialViewState={{
        zoom: 0
      }}
      mapStyle={`https://api.maptiler.com/maps/${MAPTILER_MAP_ID}/style.json?key=${MAPTILER_API_KEY}`}
    >
      <NavigationControl position="top-right" />
      
      {/* Render markers */}
      {markerData.map((marker) => (
        <Marker
          key={marker.id}
          longitude={marker.lng}
          latitude={marker.lat}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedMarker(marker);
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: marker.color,
              border: '2px solid white',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {marker.id}
          </div>
        </Marker>
      ))}

      {/* Popup for selected marker */}
      {selectedMarker && (
        <Popup
          longitude={selectedMarker.lng}
          latitude={selectedMarker.lat}
          onClose={() => setSelectedMarker(null)}
          closeButton={true}
          closeOnClick={false}
          offsetTop={-15}
        >
          <div style={{ padding: '10px', maxWidth: '200px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: selectedMarker.color }}>
              {selectedMarker.name}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              {selectedMarker.info}
            </p>
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
              Lat: {selectedMarker.lat.toFixed(4)}, Lng: {selectedMarker.lng.toFixed(4)}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapTilerComponent;
