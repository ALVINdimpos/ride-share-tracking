/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import RouteInformation from './container/RouteInformation';
import ETANextStop from './container/ETANextStop';
import { stops } from './data/data'; // Importing stops data from a separate file

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: -1.939826787816454,
  lng: 30.0445426438232,
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBpJL6jIAAzOGyIj0CGF56KBLawI7yXcLc',
  });

  const [map, setMap] = useState(null);
  const [driverLocationIndex, setDriverLocationIndex] = useState(0);

  const onLoad = useCallback((map) => setMap(map), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocationIndex((prevIndex) =>
        prevIndex < stops.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const driverLocation = stops[driverLocationIndex];
  const nextStop = stops[driverLocationIndex + 1] ? stops[driverLocationIndex + 1].name : '';

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Real-Time Ride-Share Tracking</h1>
      <RouteInformation stops={stops} driverLocationIndex={driverLocationIndex} nextStop={nextStop} />
      <ETANextStop stops={stops} driverLocationIndex={driverLocationIndex} />
      {isLoaded ? (
        <div className="relative w-full h-80 mb-6 overflow-hidden">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
          >
            {stops.map((stop, index) => (
              <Marker
                key={index}
                position={stop}
                label={{ text: stop.name, color: 'white', fontWeight: 'bold' }} // Set label color and style here
              />
            ))}
            {driverLocation && (
              <Marker
                position={driverLocation}
                icon={{
                  url: 'https://static-00.iconduck.com/assets.00/taxi-driver-illustration-512x399-htvnrr03.png',
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            )}
            <Polyline path={stops} options={{ strokeColor: '#FF0000' }} />
          </GoogleMap>
        </div>
      ) : (
        <div className="text-xl font-semibold text-center text-gray-700 mb-6">Loading...</div>
      )}
      <div className="text-lg text-center text-blue-900">Have a safe and enjoyable journey!</div>
    </div>
  );
};

export default App;
