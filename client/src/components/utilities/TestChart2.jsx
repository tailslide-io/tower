import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
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

const TestChart2 = ({ showMore }) => {
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
    value: 60,
  };

  const errorObj = {
    label: "Error Rate %",
    data: errorRates,
    borderColor: `${theme.palette.primary.main}`,
    borderWidth: 3,
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
    yAxisID: 'y1',
  }

  const data = () => {
    let data = {
      labels: timestamps,
      datasets: [
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

    if (showMore) {
      data.datasets.unshift(errorObj)
    }

    return data
  };

  const options = () => {
    return {
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
          display: showMore,
          position: 'right',
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Error Rate %"
          },
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
          text: 'Requests in Last 10 Minutes'
        },
        filler: {
          propagate: false
        },
        annotation: {
          annotations: () => {
          return showMore
            ? { annotation1 }
            : null
          }
        }, 
      },
      interaction: {
        intersect: true
      }
    }
  }
  
  return (
    <>
      <Line data={data()} options={options()} />
    </>
  )
}

export default TestChart2
