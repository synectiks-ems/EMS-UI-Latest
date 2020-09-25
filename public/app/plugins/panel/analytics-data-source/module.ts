import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import { analyticsEditor } from './editor';
import { AnalyticsRenderer } from './renderer';

class AnalyticsCtrl extends MetricsPanelCtrl {
  static templateUrl = './partials/module.html';
  panelDefaults = {
    dataSetInfo: {},
    lineDataSetInfo: {
      showLine: true,
    },
    chartTitle: '',
    xAxisLabel: 'X axis',
    yAxisLabel: 'Y axis',
  };
  isLoading: any;
  analyticsRenderer: any = null;
  data: any;
  dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    line: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
    ],
    bar: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
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
  }

  onInitEditMode() {
    this.addEditorTab('Options', analyticsEditor, 1);
  }

  onDataReceived(dataList: any) {
    this.data = dataList;
    // this.data = this.dummyData;
    if (this.analyticsRenderer) {
      this.analyticsRenderer.destroyChart();
    }
    this.render();
  }

  render() {
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
        renderData.createChart(ctrl.isLoading, ctrl.data, ctx);
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
