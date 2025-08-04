import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_API_KEY;

const containerStyle = {
  width: '510px',
  height: '495px',
  overflow: 'hidden',
  margin: '0 auto',
  border: '2px solid #ccc',
  borderRadius: '8px'
};

const center = { lat: 0, lng: 0 }; // Center of the world
const zoom = -2;

function GoogleMapComponent() {
  const mapOptions = {
    zoom: zoom,
    center: center,
    restriction: {
      latLngBounds: {
        north: 85,   
        south: -85,  
        east: 179.99999999,   
        west: -179.9999999,  
      },
      strictBounds: true  // This prevents the map from repeating
    },
    disableDefaultUI: true,
    gestureHandling: 'auto',
    draggable: true,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    mapTypeId: 'roadmap'
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;