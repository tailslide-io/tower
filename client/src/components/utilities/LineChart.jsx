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
  windowString
}) => {
  const theme = useTheme();

  console.log(theme.palette.error.light)
  console.log(theme.palette.success.light)


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
        label: "Error Rate %",
        data: errorRates,
        fill: false,
        borderColor: `${theme.palette.primary.main}`,
        borderWidth: 3,
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: .3,
        pointBackgroundColor: `${theme.palette.primary.main}`,
        pointRadius: 2,
        pointHoverRadius: 5,
        yAxisID: 'y1',
      },
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
        yAxisID: 'y',
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
        yAxisID: 'y',
      },

    ]
  };
};

const options = {
  maintainAspectRatio: true,
  responsive: true,
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
        text: 'Requests'
      }
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
      text: `Error Rate in Last ${windowString}`
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
};

  return (
    <>
      <Line data={data()} options={options} />
    </>
  )
}

export default LineChart

