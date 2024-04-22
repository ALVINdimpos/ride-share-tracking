// RouteInfo.jsx
import  { useState, useEffect } from 'react';
import { stops } from '../data/data'; 
import { calculateDistance, calculateETA } from '../utils/utils'; 

const RouteInfo = () => {
    const [driverLocationIndex, setDriverLocationIndex] = useState(0);

    // Update driver's location index at intervals
    useEffect(() => {
        const interval = setInterval(() => {
            setDriverLocationIndex((prevIndex) =>
                prevIndex < stops.length - 1 ? prevIndex + 1 : prevIndex
            );
        }, 5000); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, []);

    // Calculate driver's location and next stop
    const driverLocation = stops[driverLocationIndex];
    const nextStop = stops[driverLocationIndex + 1] ? stops[driverLocationIndex + 1].name : '';

    // Calculate distance from driver's location to next stop
    const distanceToNextStop = calculateDistance(driverLocation, stops[driverLocationIndex + 1]);

    return (
        <div className="bg-white rounded-md shadow-md p-4 mb-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Route Information</h2>
                <p className="text-lg">From {stops[0].name} to {stops[stops.length - 1].name}</p>
                <p className="text-lg">Next Stop: {nextStop}</p>
                <p className="text-lg">Distance to Next Stop: {distanceToNextStop / 1000} km</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-900">ETA to Next Stop</h2>
                <p className="text-lg">{calculateETA(driverLocationIndex + 1, stops)} minutes</p>
            </div>
        </div>
    );
};

export default RouteInfo;
