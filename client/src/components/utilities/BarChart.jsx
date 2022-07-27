import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

const BarChart = ({
  timestamps,
  successData,
  failureData,
  errorRates,
  threshold,
  windowString
}) => {
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
    scaleID: 'y1',
    value: threshold,
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
        yAxisID: 'y1',
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
        yAxisID: 'y',
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
        yAxisID: 'y',
      },
    ]
  }
}

  const options = {
      plugins: {
        title: {
          display: true,
          text: `Error Rate in Last ${windowString}`
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
          title: {
            display: true,
            text: 'Requests'
          },
          stacked: true
        },
        y1: {
          display: true,
          position: 'right',
          title: {
            display: true,
            text: "Error Rate %"
          },
          min: 0,
          max: 100,
        }
      }
    };


  return <Bar data={data()} options={options} />
}

export default BarChart
