// src/components/ChartComponent.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//import { useAppSelector } from '../redux/hooks';
 import { useSelector } from 'react-redux';

import '../styles/Chart.css'
import { RootState } from '../redux/store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  channel: number;
  title: string;
  windowWidth: number;
  autoRange: boolean;
  yMin?: number;
  yMax?: number;
  triggerChannel?: number;
  triggerAxis?: 'x' | 'y' | 'z' ;
  triggerLevel?: number;
  useTrigger: boolean;
  updateInterval: number;
}


const ChartComponent: React.FC<ChartComponentProps> = ({  
  channel,
  title,
  windowWidth,
  autoRange,
  yMin,
  yMax,
  triggerChannel,
  triggerAxis,
  triggerLevel,
  useTrigger,
  updateInterval

}) => {

  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: []
  });

  const allData = useSelector((state: RootState) => state.data.data);
  const chartRef = useRef<ChartJS<"line"> | null>(null);


  useEffect(() => {
    const updateChart = () => {
      const data = allData.find((d) => d.channel === channel);
      if (data) {
        const newChartData: ChartData<'line'> = {
          labels: data.dataPoints.slice(-windowWidth).map((_, index) => index.toString()),
          datasets: [
            {
              label: 'X Axis',
              data: data.dataPoints.slice(-windowWidth).map((point) => point.x),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              tension: 0,
            },
            {
              label: 'Y Axis',
              data: data.dataPoints.slice(-windowWidth).map((point) => point.y),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              tension: 0,
            },
            {
              label: 'Z Axis',
              data: data.dataPoints.slice(-windowWidth).map((point) => point.z),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0,
            },
          ],
        };
        setChartData(newChartData);
      }
    };

    const intervalId = setInterval(updateChart, updateInterval);

    return () => clearInterval(intervalId);
  }, [channel, windowWidth, allData, updateInterval]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: autoRange ? undefined : yMin,
        max: autoRange ? undefined : yMax,
      },
    },
    animation: {
      duration: 0,  // Set animation duration in milliseconds
    },
  };

  return (
    <div style={{ height: '300px', marginBottom: '20px' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;