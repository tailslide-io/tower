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
  windowString,
  showMore
}) => {
  const theme = useTheme();

  Chart.defaults.font.size = 14;
  Chart.defaults.font.family = "'Work Sans', sans-serif";
  Chart.defaults.color = theme.palette.text.primary;

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

  const errorObj = {
    label: "Error Rate %",
    data: errorRates,
    borderColor: `${theme.palette.primary.main}`,
    borderWidth: 2,
    fill: false,
    backgroundColor: (context) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 450);
      gradient.addColorStop(0, "rgba(34, 133, 225, .75)");
      gradient.addColorStop(0.5, "rgba(34, 133, 225, .3)");
      gradient.addColorStop(1, "rgba(34, 133, 225, 0)");
      return gradient;
    },
    tension: .3,
    pointBackgroundColor: `${theme.palette.primary.main}`,
    pointRadius: 2,
    pointHoverRadius: 5,
    type: "line",
    yAxisID: 'y1',
  }

  const data = () => {

    let data = {
    labels: timestamps,
    datasets: [
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
  };

  if (showMore) {
    data.datasets.unshift(errorObj)
  }

  return data
}

  const options = () => {
    return {  
      plugins: {
        title: {
          display: true,
          text: `Error Rate in Last ${windowString}`
        },
        annotation: {
          annotations: () => {
          return showMore
            ? { annotation1 }
            : null
          }
        }, 
      },
      animation: {
        duration: 0
      },
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
           },
        },
        y: {
          title: {
            display: true,
            text: 'Requests'
          },
        },
        y1: {
          display: showMore,
          position: 'right',
          title: {
            display: true,
            text: "Error Rate %"
          },
          min: 0,
          max: 100,
        }
      }
    }
  }


  return <Bar data={data()} options={options()} />
}

export default BarChart

