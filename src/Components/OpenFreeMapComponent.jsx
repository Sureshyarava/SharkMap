import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import tonerStyle from '../assets/toner.json';
import Papa from 'papaparse';

const OpenFreeMapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [sharkData, setSharkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSharkData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/sharks.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedData = results.data
              .filter(row => {
                // Filter out rows with missing critical data
                return row.LatGIS && 
                       row.LonGIS && 
                       !isNaN(parseFloat(row.LatGIS)) && 
                       !isNaN(parseFloat(row.LonGIS));
              })
              .map((row, index) => ({
                id: index + 1,
                lat: parseFloat(row.LatGIS),
                lng: parseFloat(row.LonGIS),
                year: row.Year || 'Unknown',
                species: row.Species || 'Unknown',
                outcome: row.Outcome || 'Unknown'
              }));
            
            setSharkData(formattedData);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Failed to parse shark data');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error loading CSV file:', err);
        setError('Failed to load shark data');
        setLoading(false);
      }
    };

    loadSharkData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading shark data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px',
        color: '#d32f2f'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        mapStyle={tonerStyle}
        initialViewState={{
          zoom: 0
        }}
        onClick={() => setSelectedMarker(null)}
      >
        {/* Render shark attack markers */}
        {sharkData.map((shark) => (
          <Marker
            key={shark.id}
            longitude={shark.lng}
            latitude={shark.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedMarker(shark);
            }}
          >
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#8b0000', // Dark red color for shark markers
                border: '1px solid white',
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Marker>
        ))}

        {/* Popup for selected shark attack */}
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
              maxWidth: '250px',
              fontFamily: 'Arial, sans-serif'
            }}>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                color: '#d32f2f',
                fontSize: '16px',
                fontWeight: 'bold',
                borderBottom: '2px solid #d32f2f',
                paddingBottom: '4px'
              }}>
                🦈 Shark Attack Details
              </h3>
              
              <div style={{ 
                fontSize: '14px', 
                color: '#333',
                lineHeight: '1.5'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Year:</strong> <span style={{ color: '#666' }}>{selectedMarker.year}</span>
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <strong>Species:</strong> <span style={{ color: '#666' }}>{selectedMarker.species}</span>
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <strong>Outcome:</strong> 
                  <span style={{ 
                    color: selectedMarker.outcome === 'Fatal' ? '#d32f2f' : '#388e3c',
                    fontWeight: 'bold',
                    marginLeft: '4px'
                  }}>
                    {selectedMarker.outcome}
                  </span>
                </div>
              </div>
              
              <div style={{ 
                fontSize: '12px', 
                color: '#666',
                borderTop: '1px solid #eee',
                paddingTop: '8px',
                marginTop: '12px'
              }}>
                <strong>Location:</strong><br/>
                Latitude: {selectedMarker.lat.toFixed(4)}<br/>
                Longitude: {selectedMarker.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default OpenFreeMapComponent;
