import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

const LineChart = ({
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
      backgroundColor: `rgba(255, 167, 51, .8)`,
      content: 'Threshold',
      position: 'start',
      rotation: 270,
      font: {
        size: 10,
      }
    },
    scaleID: 'y',
    value: threshold,
  };

  const requestData = [
    {
      label: "Failures",
      data: failureData,
      fill: "start",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, "rgba(255, 0, 0, 0.75)");
        gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.3)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
        return gradient;
      },
      borderColor: `${theme.palette.error.light}`,
      pointBackgroundColor: `${theme.palette.error.light}`,
      borderWidth: 1.5,
      pointRadius: 2,
      pointHoverRadius: 5,
      yAxisID: 'y1',
    },
    {
      label: "Successes",
      data: successData,
      fill: "start",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, "rgba(0, 175, 0, 0.75)");
        gradient.addColorStop(0.5, "rgba(0, 175, 0, 0.3)");
        gradient.addColorStop(1, "rgba(0, 175, 0, 0)");
        return gradient;
      },
      borderColor: `${theme.palette.success.light}`,
      pointBackgroundColor: `${theme.palette.success.light}`,
      borderWidth: 1.5,
      pointRadius: 2,
      pointHoverRadius: 5,
      yAxisID: 'y1',
    }
  ]

  const data = () => {
    let data = {
      labels: timestamps,
      datasets: [
        {
          label: "Error Rate %",
          data: errorRates,
          borderColor: `${theme.palette.primary.main}`,
          borderWidth: 2,
          fill: "start",
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
          yAxisID: 'y',
        }
      ]
    };

    if (showMore) {
      data.datasets.push(...requestData)
    }

    return data
  };

const options = () => {
  return {
    maintainAspectRatio: true,
    responsive: true,
    animation: {
      duration: 0
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Error Rate %'
        },
        min: 0,
        max: 100,
      },
      y1: {
        display: showMore,
        position: 'right',
        title: {
          display: true,
          text: "Requests"
        }
      },
    },
    elements: {
      line: {
        tension: 0.3
      }
    },
    plugins: {
      title: {
        display: true,
        text: `Requests in Last ${windowString}`
      },
      filler: {
        propagate: false
      },
      annotation: {
        annotations: {
          annotation1,
        }
      },
    },
    interaction: {
      intersect: true
    }
  } 
};

  return (
    <>
      <Line data={data()} options={options()} />
    </>
  )
}

export default LineChart

