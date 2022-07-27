import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

const payload = [
  {
      "timestamp": 1658784598065,
      "success": 20,
      "failure": 8
  },
  {
      "timestamp": 1658784658065,
      "success": 9,
      "failure": 10
  },
  {
      "timestamp": 1658784718065,
      "success": 34,
      "failure": 26
  },
  {
      "timestamp": 1658784778065,
      "success": 11,
      "failure": 12
  },
  {
      "timestamp": 1658784838065,
      "success": 17,
      "failure": 8
  },
  {
      "timestamp": 1658784898065,
      "success": 21,
      "failure": 5
  },
  {
      "timestamp": 1658784958065,
      "success": 15,
      "failure": 9
  },
  {
      "timestamp": 1658785018065,
      "success": 30,
      "failure": 10
  },
  {
      "timestamp": 1658785078065,
      "success": 13,
      "failure": 6
  },
  {
      "timestamp": 1658785138065,
      "success": 8,
      "failure": 5
  }
]

const timestamps = payload.map(data => new Date(data.timestamp).toLocaleTimeString('en-US', { timeStyle:'short', hour12: false }))
const successData = payload.map(data => data.success)
const failureData = payload.map(data => data.failure)
const errorRates = payload.map(data => data.failure / (data.failure + data.success) * 100)



const TestChart = () => {
  const theme = useTheme();

  const annotation1 = {
    type: 'line',
    borderColor: `${theme.palette.secondary.main}`,
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 3,
    label: {
      display: true,
      backgroundColor: `${theme.palette.secondary.light}`,
      content: 'Err Threshold',
      position: 'end'
    },
    scaleID: 'y',
    value: 60,
  };

  const data = () => {
    return {
    labels: timestamps,
    datasets: [
      {
        label: "Error Rate",
        data: errorRates,
        backgroundColor: `${theme.palette.primary.main}`,
        borderColor: `${theme.palette.primary.main}`,
        fill: false,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 5,
        type: "line",
        order: 0,
        tension: .3,
       },
      {
        label: 'Failures',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, "rgba(255, 0,0, 1)");
          gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.8)");
          gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
          return gradient;
        },
        borderColor: `${theme.palette.error.main}`,
        borderWidth: 1.5,
        data: failureData,
      },
      {
        label: 'Successes',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, "rgba(0, 175, 0, 1)");
          gradient.addColorStop(0.5, "rgba(0, 175, 0, 0.7)");
          gradient.addColorStop(1, "rgba(0, 175, 0, 0)");
          return gradient;
        },
        borderColor: `${theme.palette.success.main}`,
        borderWidth: 1.5,
        data: successData,
      },
    ]
  }
}

  const options = {
      plugins: {
        title: {
          display: true,
          text: 'Error Rate in Last 10 Minutes'
        },
        annotation: {
          annotations: {
            annotation1,
          }
        },
      },
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
           },
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    };


  return <Bar data={data()} options={options} />
}

export default TestChart

