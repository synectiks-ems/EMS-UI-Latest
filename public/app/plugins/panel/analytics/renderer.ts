import Chart from 'chart.js';
export class AnalyticsRenderer {
  MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(private panel: any) {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  config = {};
  chart: any = null;

  initConfig(responseData: any) {
    const dataSets = this.createDataSet(responseData);
    this.config = {
      type: 'line',
      data: dataSets,
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.panel.chartTitle,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.panel.xAxisLabel,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.panel.yAxisLabel,
              },
            },
          ],
        },
      },
    };
  }

  createDataSet(responseData: any) {
    if (!responseData) {
      return {};
    }
    const retData: any = {};
    const tempData = [];
    const { dataSets, labels } = responseData;
    retData.labels = labels;
    const { dataSetInfo } = this.panel;
    const length = dataSets.length > dataSetInfo.length ? dataSetInfo.length : dataSets.length;
    for (let i = 0; i < length; i++) {
      const dataSet = dataSets[i];
      const info = dataSetInfo[i];
      tempData.push({
        label: info.label,
        backgroundColor: info.backgroundColor,
        borderColor: info.borderColor,
        data: dataSet,
        fill: info.fill,
      });
    }
    retData.datasets = tempData;
    return retData;
  }

  createChart(isLoading: any, responseData: any, ctx: any) {
    if (isLoading) {
      // retHtml +=
      //     '<div class="badge-conainer badge-data-loading query-transaction--loading">Your data is loading....</div>';
    } else {
      if (this.chart) {
        this.chart.update();
      } else {
        this.initConfig(responseData);
        this.chart = new Chart(ctx, this.config);
      }
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = null;
  }
}
