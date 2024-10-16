// src/components/ChartComponent.tsx

import React, { useMemo, useRef, useEffect } from 'react';
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
import '../styles/Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent: React.FC = () => {
  const plotSettings = useAppSelector(state => state.plot);
  const data = useAppSelector((state) => state.serial.data.find((d) => d.channel === 0));
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);


  const chartData: ChartData<'line'> = useMemo(() => {
    const dataPoints = data?.dataPoints || [];
    const startIndex = Math.max(0, dataPoints.length - plotSettings.windowWidth);
    const visibleDataPoints = dataPoints.slice(startIndex);

    return {
      labels: visibleDataPoints.map((_, index) => index.toString()),
      datasets: [
        {
          label: 'X Axis',
          data: visibleDataPoints.map((point) => point.x),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Y Axis',
          data: visibleDataPoints.map((point) => point.y),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Z Axis',
          data: visibleDataPoints.map((point) => point.z),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  }, [data, plotSettings.windowWidth]);
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 1,
    scales: {
      y: {
        beginAtZero: false,
        min: plotSettings.autoRange ? undefined : plotSettings.yMin,
        max: plotSettings.autoRange ? undefined : plotSettings.yMax,
      },
    },
    animation: {
      duration: 0,
    },
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      const resizeObserver = new ResizeObserver(() => {
        chart.resize();
      });

      resizeObserver.observe(chart.canvas);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [chartRef]);

  return (
    <div className="chart-container">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;