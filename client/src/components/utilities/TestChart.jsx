import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

// const payload = [
//   {
//       "timestamp": 1658784598065,
//       "success": 20,
//       "failure": 8
//   },
//   {
//       "timestamp": 1658784658065,
//       "success": 9,
//       "failure": 10
//   },
//   {
//       "timestamp": 1658784718065,
//       "success": 34,
//       "failure": 26
//   },
//   {
//       "timestamp": 1658784778065,
//       "success": 11,
//       "failure": 12
//   },
//   {
//       "timestamp": 1658784838065,
//       "success": 17,
//       "failure": 8
//   },
//   {
//       "timestamp": 1658784898065,
//       "success": 21,
//       "failure": 5
//   },
//   {
//       "timestamp": 1658784958065,
//       "success": 15,
//       "failure": 9
//   },
//   {
//       "timestamp": 1658785018065,
//       "success": 30,
//       "failure": 10
//   },
//   {
//       "timestamp": 1658785078065,
//       "success": 13,
//       "failure": 6
//   },
//   {
//       "timestamp": 1658785138065,
//       "success": 8,
//       "failure": 5
//   }
// ]

const randomNum = () => {
  return Math.floor(Math.random() * 30)
}

const payload = [
  {
      "timestamp": 1658784598065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784658065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784718065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784778065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784838065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784898065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658784958065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658785018065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658785078065,
      "success": randomNum(),
      "failure": randomNum()
  },
  {
      "timestamp": 1658785138065,
      "success": randomNum(),
      "failure": randomNum()
  }
]



const timestamps = payload.map(data => new Date(data.timestamp).toLocaleTimeString('en-US', { timeStyle:'short', hour12: false }))
const successData = payload.map(data => data.success)
const failureData = payload.map(data => data.failure)
const errorRates = payload.map(data => data.failure / (data.failure + data.success) * 100)



const TestChart = ({ showMore }) => {
  const theme = useTheme();

  Chart.defaults.font.size = 14;
  Chart.defaults.font.family = "'Work Sans', sans-serif";
  Chart.defaults.color = '#24384e'

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
    scaleID: 'y1',
    value: 60,
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

  // const errorObj2 = {
  //   label: "Error Rate",
  //   data: errorRates,
  //   backgroundColor: `${theme.palette.primary.main}`,
  //   borderColor: `${theme.palette.primary.main}`,
  //   fill: false,
  //   pointHoverRadius: 10,
  //   pointHoverBorderWidth: 5,
  //   type: "line",
  //   order: 0,
  //   tension: .3,
  //   yAxisID: 'y1',
  //  }

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
          text: 'Error Rate in Last 10 Minutes'
        },
        annotation: {
          annotations: () => {
          return showMore
            ? { annotation1 }
            : null
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

export default TestChart

