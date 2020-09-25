export class AnalyticsEditorCtrl {
  panel: any;
  panelCtrl: any;
  dataSetInfo: any;
  lineDataSetInfo: any;
  chartTitle: any;
  xAxisLabel: any;
  yAxisLabel: any;
  /** @ngInject */
  constructor($scope: any) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.dataSetInfo = this.panel.dataSetInfo;
    this.lineDataSetInfo = this.panel.lineDataSetInfo;
    this.chartTitle = this.panel.chartTitle;
    this.xAxisLabel = this.panel.xAxisLabel;
    this.yAxisLabel = this.panel.yAxisLabel;
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

  onChangeLineDataSetInfo() {
    this.panel.lineDataSetInfo = this.lineDataSetInfo;
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
    templateUrl: 'public/app/plugins/panel/analytics-data-source/partials/editor.html',
    controller: AnalyticsEditorCtrl,
  };
}
