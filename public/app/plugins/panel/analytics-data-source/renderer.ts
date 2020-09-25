import Chart from 'chart.js';
export class AnalyticsRenderer {
  constructor(private panel: any) {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  config = {};
  chart: any;

  initConfig(responseData: any) {
    const dataSets = this.createDataSet(responseData);
    this.config = {
      type: 'bar',
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
              ticks: {
                maxRotation: 0,
                callback: (value: any, index: any, values: any) => {
                  const maxLength = this.panel.dataSetInfo.maxLength || 10;
                  if (value.length > maxLength) {
                    value = value.substring(0, maxLength) + '...';
                  }
                  return value;
                },
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
              ticks: {
                beginAtZero: true,
                min: this.panel.dataSetInfo.minY ? parseInt(this.panel.dataSetInfo.minY, 10) : 0,
                max: this.panel.dataSetInfo.maxY ? parseInt(this.panel.dataSetInfo.maxY, 10) : 100,
                stepSize: this.panel.dataSetInfo.stepSize ? parseInt(this.panel.dataSetInfo.stepSize, 10) : 10,
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
    responseData = this.manipulateData(responseData);
    const { bar, line, labels } = responseData;
    retData.labels = labels;
    const { dataSetInfo, lineDataSetInfo } = this.panel;
    if (lineDataSetInfo.showLine) {
      tempData.push({
        type: 'line',
        label: lineDataSetInfo.label,
        borderColor: lineDataSetInfo.borderColor,
        borderWidth: 2,
        fill: false,
        data: line,
      });
    }
    tempData.push({
      type: 'bar',
      label: dataSetInfo.label,
      borderColor: dataSetInfo.borderColor,
      backgroundColor: dataSetInfo.backgroundColor,
      borderWidth: 2,
      data: bar,
      fill: dataSetInfo.fill || false,
    });
    retData.datasets = tempData;
    return retData;
  }

  manipulateData(responseData: any) {
    const length = responseData.length;
    const bar = [];
    const line = [];
    const labels = [];
    for (let i = 0; i < length; i++) {
      const data = responseData[i];
      if (data.datapoints) {
        bar.push(data.datapoints[0][0]);
        if (data.datapoints[0].length > 2) {
          line.push(data.datapoints[0][1]);
        }
      }
      let target = data.target;
      if (this.panel.dataSetInfo.regex) {
        const flags = (this.panel.dataSetInfo.caseSensitive ? '' : 'i') + (this.panel.dataSetInfo.global ? 'g' : '');
        const regex = new RegExp(this.panel.dataSetInfo.regex, flags);
        target = target.replace(regex, '');
      }
      labels.push(target.trim());
    }
    return { bar, line, labels };
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
