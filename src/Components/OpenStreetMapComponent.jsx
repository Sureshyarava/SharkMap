import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OpenStreetMapComponent = () => {
  // Center coordinates and zoom level
  const latitude = 51.505; // Replace with your desired latitude
  const longitude = -0.09; // Replace with your desired longitude
  const position = [latitude, longitude]; // Replace with your desired lat,lng
  const zoom = 13; // Adjust zoom level as needed

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default OpenStreetMapComponent;
