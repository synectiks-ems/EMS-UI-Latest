// Libraries
import React from 'react';
import { CustomNavigationBar } from '../dashboard/components/CustomNav';

class Overview extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <CustomNavigationBar />
        <div className="scroll-canvas scroll-canvas--dashboard monitor-main-body">
          <div className="container overview-container">
            <div className="overview-header">Monitor your applications and infrastructure</div>
            <div className="overview-description">
              Get full stack visibility, find and fix problems, optimize your performance, and understand customer
              behavior all in one place.
              <a href="#">Learn more</a>
            </div>
            <div className="row">
              <div className="col-md-4 overview-item-container">
                <img src="/public/img/monitor-icons/monitor_view_metrics.jpg" className="item-image" />
                <div className="item-header">Monitor &amp; Visualize Metrics</div>
                <div className="item-description">
                  Metrics are numerical values available from Azure Resources helping you understand the health,
                  operation &amp; performance of your system.
                </div>
                <button className="alert-blue-button m-t-2">Explore Metrics</button>
              </div>
              <div className="col-md-4 overview-item-container">
                <img src="/public/img/monitor-icons/query_analyze.png" className="item-image" />
                <div className="item-header">Query &amp; Analyze Logs</div>
                <div className="item-description">
                  Logs are activity logs, diagnostic logs and telemetry from monitoring solutions; Analytics queries
                  help with troubleshooting &amp; visualizations.
                </div>
                <button className="alert-blue-button m-t-2">Search Logs</button>
              </div>
              <div className="col-md-4 overview-item-container">
                <a>
                  <img src="/public/img/monitor-icons/alert_actions.png" className="item-image" />
                  <div className="item-header">Setup Alert &amp; Actions</div>
                  <div className="item-description">
                    Alerts notify you of critical conditions and potentially take corrective automated actions based on
                    triggers from metrics or logs.
                  </div>
                  <button className="alert-blue-button m-t-2">Manage Alert</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Overview;
