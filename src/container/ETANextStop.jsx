/* eslint-disable react/prop-types */
import { calculateETA } from '../utils/utils'; // Update the path accordingly

const ETANextStop = ({ stops, driverLocationIndex }) => {
    return (
        <div className="bg-white rounded-md shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold text-blue-900">ETA to Next Stop</h2>
            {/* Use calculateETA function */}
            <p className="text-lg">{calculateETA(driverLocationIndex + 1, stops)} minutes</p>
        </div>
    );
};

export default ETANextStop;
