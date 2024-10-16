import React from 'react';
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
import { useAppSelector } from '../redux/hooks';

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
  windowWidth: number;
  autoRange: boolean;
  yMin?: number;
  yMax?: number;
  triggerChannel?: number;
  triggerAxis?: 'x' | 'y' | 'z';
  triggerLevel?: number;
  useTrigger: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  channel,
  windowWidth,
  autoRange,
  yMin,
  yMax,
  triggerChannel,
  triggerAxis,
  triggerLevel,
  useTrigger,
}) => {
  const data = useAppSelector((state) => state.serial.data.find((d) => d.channel === channel));

  const chartData: ChartData<'line'> = {
    labels: data?.dataPoints.map((_, index) => index.toString()) || [],
    datasets: [
      {
        label: 'X Axis',
        data: data?.dataPoints.map((point) => point.x) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Y Axis',
        data: data?.dataPoints.map((point) => point.y) || [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Z Axis',
        data: data?.dataPoints.map((point) => point.z) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

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
      duration: 0,
    },
  };

  return (
    <div style={{ height: '300px', marginBottom: '20px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;