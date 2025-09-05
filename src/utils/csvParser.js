import Papa from 'papaparse';

/**
 * Parse CSV data and return formatted data for map markers
 * @param {string} csvFilePath - Path to the CSV file
 * @returns {Promise<Array>} - Array of parsed shark data
 */
export const parseSharkData = (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const formattedData = results.data
            .filter(row => {
              // Filter out rows with missing critical data
              return row.latitude && 
                     row.longitude && 
                     !isNaN(parseFloat(row.latitude)) && 
                     !isNaN(parseFloat(row.longitude));
            })
            .map((row, index) => ({
              id: index + 1,
              year: row.year || 'Unknown',
              latitude: parseFloat(row.latitude),
              longitude: parseFloat(row.longitude),
              species: row.species || 'Unknown Species',
              outcome: row.outcome || 'Unknown',
              // Add any other fields from your CSV
              rawData: row // Keep original data for reference
            }));
          
          resolve(formattedData);
        } catch (error) {
          reject(new Error(`Error parsing CSV data: ${error.message}`));
        }
      },
      error: (error) => {
        reject(new Error(`Error reading CSV file: ${error.message}`));
      }
    });
  });
};

/**
 * Load CSV file from public folder
 * @param {string} fileName - Name of the CSV file in public folder
 * @returns {Promise<Array>} - Parsed shark data
 */
export const loadSharkDataFromFile = async (fileName) => {
  try {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    return parseSharkData(csvText);
  } catch (error) {
    console.error('Error loading CSV file:', error);
    throw error;
  }
};

/**
 * Get marker color based on outcome
 * @param {string} outcome - The outcome from CSV data
 * @returns {string} - Hex color code
 */
export const getMarkerColor = (outcome) => {
  // Always return red color for all markers
  return '#DC2626';
};

/**
 * Format popup content for shark incident
 * @param {Object} incident - Shark incident data
 * @returns {Object} - Formatted popup content
 */
export const formatPopupContent = (incident) => {
  return {
    title: `Shark Incident - ${incident.year}`,
    species: incident.species,
    outcome: incident.outcome,
    year: incident.year,
    coordinates: `${incident.latitude.toFixed(4)}, ${incident.longitude.toFixed(4)}`,
    color: '#DC2626' // Always use red color
  };
};
