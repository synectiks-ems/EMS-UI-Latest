import Chart from 'chart.js';
export class PieRenderer {
  constructor(private panel: any) {
    // this.initConfig();
  }
  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }
  charts: any = [];

  initConfig(dataSets: any, label: any) {
    return {
      type: 'pie',
      data: dataSets,
      options: {
        responsive: true,
        title: {
          display: true,
          text: label,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    };
  }

  manipulateData(responseData: any) {
    const retData: any = {};
    const backgroundColor = ['rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)'];
    const dataSets: any = {};
    const labels: any = {};
    for (let i = 0; i < responseData.length; i++) {
      let target = responseData[i].target;
      let key = target;
      if (this.panel.keyRegex) {
        const keyRegex = new RegExp(this.panel.keyRegex, 'g');
        key = target.replace(keyRegex, '');
      }
      if (this.panel.regex) {
        const flags = (this.panel.caseSensitive ? '' : 'i') + (this.panel.global ? 'g' : '');
        const regex = new RegExp(this.panel.regex, flags);
        target = target.replace(regex, '');
      }
      dataSets[key] = dataSets[key] || {
        data: [],
        label: this.panel.label,
        backgroundColor,
      };
      dataSets[key].data.push(responseData[i].datapoints[0][0]);
      dataSets[key].label = key;
      dataSets[key].backgroundColor = backgroundColor;
      labels[key] = labels[key] || [];
      labels[key].push(target.trim());
    }
    retData.dataSets = dataSets;
    retData.labels = labels;
    return retData;
  }

  createChart(isLoading: any, responseData: any, parentElement: any) {
    if (isLoading) {
    } else {
      if (this.charts && this.charts.length > 0) {
        const length = this.charts.length;
        for (let i = 0; i < length; i++) {
          this.charts[i].update();
        }
      } else {
        const retData = this.manipulateData(responseData);
        const dataSets = retData.dataSets;
        const labels = retData.labels;
        const keys = Object.keys(dataSets);
        let canvasHTML = '';
        for (let i = 0; i < keys.length; i++) {
          canvasHTML += "<canvas class='pie-chart pie-chart-" + i + "'></canvas>";
        }
        parentElement.html(canvasHTML);
        for (let i = 0; i < keys.length; i++) {
          const canvas = parentElement.find('.pie-chart-' + i)[0];
          const ctx = canvas.getContext('2d');
          const config: any = this.initConfig({ datasets: [dataSets[keys[i]]], labels: labels[keys[i]] }, keys[i]);
          this.charts.push(new Chart(ctx, config));
        }
      }
    }
  }

  destroyChart() {
    const length = this.charts.length;
    for (let i = 0; i < length; i++) {
      this.charts[i].destroy();
    }
    this.charts = [];
  }
}
