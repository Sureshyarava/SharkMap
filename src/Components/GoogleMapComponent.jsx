// import React from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const API_KEY = import.meta.env.VITE_API_KEY;

// const containerStyle = {
//   width: '510px', 
//   height: '495px', 
//   margin: '0 auto', 
//   borderRadius: '35%', 
//   boxShadow: '0 2px 8px rgba(0,0,0,0.2)', 
//   overflow: 'hidden', 
//   position: 'relative' 
// };


// const wrapperStyle = {
//   width: '750px', 
//   height: '500px', 
//   overflow: 'hidden',
//   margin: '0 auto',
//   borderRadius: '8px',
//   position: 'relative',
//   display: 'flex', 
//   alignItems: 'center', 
//   justifyContent: 'center' 
// };

// // Overlay to make map unresponsive
// const overlayStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 10, 
//   backgroundColor: 'transparent', 
//   pointerEvents: 'auto' 
// };

// const center = { lat: 0, lng: 0 };
// const zoom = 0; 

// function GoogleMapComponent() {
//   const mapOptions = {
//     zoom: zoom,
//     center: center,
//     minZoom: 0, 
//     maxZoom: 10, 
//     restriction: {
//       latLngBounds: {
//         north: 85,   
//         south: -85,  
//         east: 180,   
//         west: -180,  
//       },
//       strictBounds: true  
//     },
//     disableDefaultUI: true,
//     gestureHandling: 'auto', 
//     draggable: true, 
//     zoomControl: false, // Disable zoom controls (+ and - buttons)
//     scrollwheel: true,
//     disableDoubleClickZoom: false, 
//     keyboardShortcuts: false,
//     mapTypeControl: false, // Disable map type control
//     streetViewControl: false, // Disable street view control
//     fullscreenControl: false, // Disable fullscreen control
//     mapTypeId: 'roadmap',
//     styles: [
//       {
//         featureType: 'all',
//         elementType: 'labels',
//         stylers: [{ visibility: 'off' }]
//       },
//       // Show country labels
//       {
//         featureType: 'administrative.country',
//         elementType: 'labels.text',
//         stylers: [
//           { visibility: 'on' },
//           { color: '#2c3e50' },
//           { weight: 'bold' },
//           { fontSize: '14px' }
//         ]
//       },
      
//       {
//         featureType: 'administrative.country',
//         elementType: 'labels.text.stroke',
//         stylers: [
//           { visibility: 'on' },
//           { color: '#ffffff' },
//           { weight: 2 }
//         ]
//       },
    
//       {
//         featureType: 'landscape',
//         elementType: 'all',
//         stylers: [{ color: '#ffffff' }] // White land areas
//       },
//       {
//         featureType: 'water',
//         elementType: 'all',
//         stylers: [{ color: '#7ec8e3' }] // Blue water
//       },
//       {
//         featureType: 'road',
//         elementType: 'all',
//         stylers: [{ visibility: 'off' }] // Hide roads
//       },
//       // Show country borders
//       {
//         featureType: 'administrative.country',
//         elementType: 'geometry.stroke',
//         stylers: [
//           { visibility: 'on' },
//           { color: '#95a5a6' },
//           { weight: 1 }
//         ]
//       },
//       {
//         featureType: 'poi',
//         elementType: 'all',
//         stylers: [{ visibility: 'off' }] // Hide points of interest
//       },
//       // Hide world boundaries and coordinate lines
//       {
//         featureType: 'administrative',
//         elementType: 'geometry',
//         stylers: [{ visibility: 'off' }]
//       },
//       // Hide equator and other coordinate lines
//       {
//         featureType: 'transit',
//         elementType: 'geometry',
//         stylers: [{ visibility: 'off' }]
//       },
//       // Hide any remaining geographic lines
//       {
//         featureType: 'all',
//         elementType: 'geometry.stroke',
//         stylers: [{ visibility: 'simplified' }]
//       }
//     ]
//   };

//   return (
//     <div style={wrapperStyle}>
//       <LoadScript googleMapsApiKey={API_KEY}>
//         <div style={containerStyle}>
//           <GoogleMap
//             mapContainerStyle={{width: '100%', height: '100%'}}
//             center={center}
//             zoom={zoom}
//             options={mapOptions}
//           >
//           </GoogleMap>
//         </div>
//       </LoadScript>
//     </div>
//   );
// }

// export default GoogleMapComponent;