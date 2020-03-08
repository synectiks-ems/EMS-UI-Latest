// Libraries
import React from 'react';
import { connect } from 'react-redux';
import CustomDashboardLoader from '../custom-dashboard-loader';
import { backendSrv } from 'app/core/services/backend_srv';
// Services & Utils
export interface Props {
  $scope: any;
  $injector: any;
}
export interface State {
  activeDash: any;
  dashboardList: any[];
}

class DashboardList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeDash: -1,
      dashboardList: [],
    };
  }

  componentDidMount() {
    backendSrv.search({ limit: 20 }).then((result: any) => {
      this.setState({
        dashboardList: result,
      });
      if (result && result.length > 0) {
        this.setState({
          activeDash: result[0].id,
        });
      }
    });
  }

  createDashboard = (dashboardList: any[]) => {
    let retData = [];
    for (let i = 0; i < dashboardList.length; i++) {
      const dashboard = dashboardList[i];
      retData.push(
        <div key={dashboard.id}>
          {this.state.activeDash === dashboard.id && (
            <CustomDashboardLoader
              $scope={this.props.$scope}
              $injector={this.props.$injector}
              urlUid={dashboard.uid}
              urlSlug={dashboard.slug}
            />
          )}
        </div>
      );
    }
    return retData;
  };

  createAside = (dashboardList: any[]) => {
    let retData = [];
    const { activeDash } = this.state;
    for (let i = 0; i < dashboardList.length; i++) {
      const dashboard = dashboardList[i];
      retData.push(
        <a
          className={`dashboard-nav-item dashboard-settings__nav-item ${activeDash === dashboard.id ? 'active' : ''}`}
          onClick={e => this.activeDashboard(dashboard.id)}
        >
          <div className="tab-title">{dashboard.title}</div>
        </a>
      );
    }
    return retData;
  };

  activeDashboard = (id: any) => {
    this.setState({
      activeDash: id,
    });
  };

  render() {
    const { dashboardList } = this.state;
    return (
      <React.Fragment>
        <div className="dashboard-list-container">
          <aside className="aside-container dashboard-settings__aside"> {this.createAside(dashboardList)} </aside>
          <div className="dashboard-settings__content"> {this.createDashboard(dashboardList)} </div>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state: any) => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
