export class AnalyticsEditorCtrl {
  panel: any;
  panelCtrl: any;
  totalDataSets: any;
  dataSetInfo: any;
  chartTitle: any;
  xAxisLabel: any;
  yAxisLabel: any;
  /** @ngInject */
  constructor($scope: any) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.totalDataSets = this.panel.totalDataSets;
    this.dataSetInfo = this.panel.dataSetInfo;
    this.chartTitle = this.panel.chartTitle;
    this.xAxisLabel = this.panel.xAxisLabel;
    this.yAxisLabel = this.panel.yAxisLabel;
  }

  setDataSetInfo() {
    if (this.dataSetInfo.length < this.totalDataSets) {
      const diffLength = this.totalDataSets - this.dataSetInfo.length;
      for (let i = 0; i < diffLength; i++) {
        this.dataSetInfo.push({});
      }
    } else {
      this.dataSetInfo.length = this.totalDataSets;
    }
    this.panel.dataSetInfo = this.dataSetInfo;
  }

  onChangeTotalDataSets() {
    this.setDataSetInfo();
    this.panel.totalDataSets = this.totalDataSets;
  }

  onChangeChartTitle() {
    this.panel.chartTitle = this.chartTitle;
  }

  onChangeXAxisLabel() {
    this.panel.xAxisLabel = this.xAxisLabel;
  }

  onChangeYAxisLabel() {
    this.panel.yAxisLabel = this.yAxisLabel;
  }

  onChangeDataSetInfo() {
    this.panel.dataSetInfo = this.dataSetInfo;
  }

  render() {
    this.panelCtrl.reConfigChart();
  }
}

/** @ngInject */
export function analyticsEditor($q: any, uiSegmentSrv: any) {
  'use strict';
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/app/plugins/panel/analytics/partials/editor.html',
    controller: AnalyticsEditorCtrl,
  };
}
