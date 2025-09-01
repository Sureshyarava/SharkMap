import React, { useState } from 'react';
import Map, { Marker, Popup } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import tonerStyle from '../assets/toner.json';
import { markerData } from '../data/markerData';

const OpenFreeMapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        mapStyle={tonerStyle}
        initialViewState={{
          zoom: 0
        }}
        onClick={() => setSelectedMarker(null)}
      >
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
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: marker.color,
                border: '3px solid white',
                cursor: 'pointer',
                boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
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
            offset={[0, -15]}
            className="custom-popup"
          >
            <div style={{ 
              padding: '12px', 
              maxWidth: '220px',
              fontFamily: 'Arial, sans-serif'
            }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                color: selectedMarker.color,
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {selectedMarker.name}
              </h3>
              <p style={{ 
                margin: '0 0 8px 0', 
                fontSize: '14px', 
                color: '#333',
                lineHeight: '1.4'
              }}>
                {selectedMarker.info}
              </p>
              <div style={{ 
                fontSize: '12px', 
                color: '#666',
                borderTop: '1px solid #eee',
                paddingTop: '8px'
              }}>
                <strong>Coordinates:</strong><br/>
                Lat: {selectedMarker.lat.toFixed(4)}<br/>
                Lng: {selectedMarker.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default OpenFreeMapComponent;
