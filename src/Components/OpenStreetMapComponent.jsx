import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { markerData } from '../data/markerData';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom colored markers
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: white;
      font-weight: bold;
    "></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const OpenStreetMapComponent = () => {
  // Center coordinates and zoom level
  const latitude = 0; 
  const longitude = 0; 
  const position = [latitude, longitude]; 
  const zoom = 2; 

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Render markers */}
      {markerData.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={createCustomIcon(marker.color)}
        >
          <Popup>
            <div style={{ padding: '5px', maxWidth: '200px' }}>
              <h3 style={{ margin: '0 0 8px 0', color: marker.color, fontSize: '16px' }}>
                {marker.name}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                {marker.info}
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMapComponent;
