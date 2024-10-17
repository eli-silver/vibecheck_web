// src/components/ChartContainer.tsx

import React from 'react';
import { useAppSelector } from '../redux/hooks';
import ChartComponent from './ChartComponent';
import '../styles/ChartContainer.css';

const ChartContainer: React.FC = () => {
  const sensors = useAppSelector(state => state.sensor);

  // Filter enabled sensors
  const enabledSensors = Object.entries(sensors)
    .filter(([_, sensorState]) => sensorState.isEnabled)
    .map(([key]) => parseInt(key));

  return (
    <div className="chart-container">
      {enabledSensors.map((channel) => (
        <ChartComponent 
          key={channel} 
          channel={channel} 
          title={`Accelerometer ${channel + 1}`} 
        />
      ))}
    </div>
  );
};

export default ChartContainer;