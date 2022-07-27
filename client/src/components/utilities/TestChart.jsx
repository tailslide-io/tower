import { useTheme } from '@mui/material/styles';
import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);

const payload = [
  {
    timestamp: 1658784598065,
    success: 20,
    failure: 8,
  },
  {
    timestamp: 1658784658065,
    success: 9,
    failure: 10,
  },
  {
    timestamp: 1658784718065,
    success: 34,
    failure: 26,
  },
  {
    timestamp: 1658784778065,
    success: 11,
    failure: 12,
  },
  {
    timestamp: 1658784838065,
    success: 17,
    failure: 8,
  },
  {
    timestamp: 1658784898065,
    success: 21,
    failure: 5,
  },
  {
    timestamp: 1658784958065,
    success: 15,
    failure: 9,
  },
  {
    timestamp: 1658785018065,
    success: 30,
    failure: 10,
  },
  {
    timestamp: 1658785078065,
    success: 13,
    failure: 6,
  },
  {
    timestamp: 1658785138065,
    success: 8,
    failure: 5,
  },
];

const TestChart = ({ data }) => {
  const theme = useTheme();
  const timestamps = data.map((data) =>
    new Date(data.timestamp).toLocaleTimeString('en-US')
  );
  const successData = data.map((data) => data.success);
  const failureData = data.map((data) => data.failure);
  const errorRates = data.map(
    (data) => (data.failure / (data.failure + data.success)) * 100
  );

  const graphData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Error Rate',
        data: errorRates,
        backgroundColor: `${theme.palette.primary.main}`,
        borderColor: `${theme.palette.primary.main}`,
        fill: false,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 5,
        type: 'line',
        order: 0,
        tension: 0.3,
      },
      {
        label: 'Failures',
        backgroundColor: `${theme.palette.error.light}`,
        data: failureData,
      },
      {
        label: 'Successes',
        backgroundColor: `${theme.palette.success.light}`,
        data: successData,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Error Rate in Last 10 Minutes',
      },
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: 'Requests',
        },
        stacked: true,
      },
    },
  };

  return <Bar data={graphData} options={options} />;
};

export default TestChart;
