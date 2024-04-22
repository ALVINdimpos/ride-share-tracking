/* eslint-disable react/prop-types */
import { calculateETA, calculateDistance } from '../utils/utils'; 

const RouteInformation = ({ stops, driverLocationIndex, nextStop }) => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 mb-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-900">Route Information</h2>
                <p className="text-lg">From {stops[0].name} to {stops[stops.length - 1].name}</p>
                <p className="text-lg">Next Stop: {nextStop}</p>
              
                <p className="text-lg">Distance: {calculateDistance(stops[driverLocationIndex], stops[driverLocationIndex + 1]) / 1000} km</p>
               
                <p className="text-lg">Estimated Time: {calculateETA(driverLocationIndex, stops)} minutes to {nextStop} minutes</p>
            </div>
            {/* ... */}
        </div>
    );
};

export default RouteInformation;
