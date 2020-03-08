import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { analyticsEditor } from './editor';
import { AnalyticsRenderer } from './renderer';

class AnalyticsCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {
    totalDataSets: 1,
    dataSetInfo: [] as any[],
    chartTitle: '',
    xAxisLabel: 'X axis',
    yAxisLabel: 'Y axis',
  };
  isLoading: any;
  analyticsRenderer: any = null;
  dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    dataSets: [
      [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
    ],
  };

  randomScalingFactor() {
    return Math.floor(Math.random() * 100);
  }

  constructor($scope: any, $injector: any) {
    super($scope, $injector);
    this.isLoading = false;
    _.defaults(this.panel, this.panelDefaults);
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onAnalyticsPanelRefreshed.bind(this));
  }

  onAnalyticsPanelRefreshed() {
    this.isLoading = true;
    this.getData().then(response => {
      this.isLoading = false;
      this.render();
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({});
      }, 1000);
    });
  }

  onInitEditMode() {
    this.addEditorTab('Options', analyticsEditor, 1);
  }

  onDataReceived() {
    this.render();
  }

  render() {
    // const badgeHtml = analyticsRenderer.createChart(this.isLoading, this.responseData);
    if (!this.analyticsRenderer) {
      this.analyticsRenderer = new AnalyticsRenderer(this.panel);
    }
    return super.render(this.analyticsRenderer);
  }

  reConfigChart() {
    if (this.analyticsRenderer) {
      this.analyticsRenderer.destroyChart();
      super.render(this.analyticsRenderer);
    }
  }

  link(scope: any, elem: any, attrs: any, ctrl: AnalyticsCtrl) {
    function renderPanel(renderData: any) {
      const canvas = elem.find('canvas')[0];
      const ctx = canvas.getContext('2d');
      if (!ctrl.isLoading) {
        canvas.style.display = '';
        elem.find('.data-loading').remove();
        renderData.createChart(ctrl.isLoading, ctrl.dummyData, ctx);
      }
    }

    ctrl.events.on('render', renderData => {
      if (renderData) {
        renderPanel(renderData);
      }
      ctrl.renderingCompleted();
    });
  }
}

export { AnalyticsCtrl, AnalyticsCtrl as PanelCtrl };
