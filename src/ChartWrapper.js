import Chart from 'chart.js/dist/Chart.js';

let chart;
export default {
  createCharts: function ({ totalCases, recoveredCases, deathCases, labels }) {
    if (chart) {
      chart.data.datasets[0].data = deathCases;
      chart.data.datasets[1].data = recoveredCases;
      chart.data.datasets[2].data = totalCases;
      chart.update();
      return;
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: labels,
        datasets: [{
          label: 'Deaths',
          data: deathCases,
          borderColor: 'red',
          backgroundColor: 'red',
          cubicInterpolationMode: 'monotone'
        }, {
          label: 'Recovered cases',
          data: recoveredCases,
          borderColor: 'greenyellow',
          backgroundColor: 'greenyellow',
          cubicInterpolationMode: 'monotone'
        }, {
          label: 'All corona cases',
          data: totalCases,
          borderColor: 'steelblue',
          backgroundColor: 'steelblue',
          cubicInterpolationMode: 'monotone'
        }]
      },

      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: "#CCC", // this here
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: "#CCC", // this here
            }
          }]
        }
      }

    });
  },
  updateChartData: function (data) {

  }

}