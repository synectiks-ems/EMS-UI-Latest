// Libraries
import React from 'react';
import { connect } from 'react-redux';
import CustomDashboardLoader from '../custom-dashboard-loader';
import { backendSrv } from 'app/core/services/backend_srv';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { updateLocation } from 'app/core/actions';

// Services & Utils
export interface Props {
  $scope: any;
  $injector: any;
  updateLocation: typeof updateLocation;
  location: any;
}
export interface State {
  dashboardList: any;
  collapsed: boolean;
  activeTab: any;
}

class DashboardList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dashboardList: {},
      collapsed: false,
      activeTab: 0,
    };
  }

  componentDidMount() {
    const activeDash = localStorage.getItem('activeDash');
    const activeTab: any = localStorage.getItem('activeTab');
    backendSrv.search({ limit: 20 }).then((result: any) => {
      const retData = this.manipulateData(result);
      if (activeDash) {
        const keys = Object.keys(retData);
        let key = keys[0];
        if (activeTab) {
          key = keys[activeTab];
        }
        if (retData[key]) {
          retData[key].activeDash = parseInt(activeDash, 10);
        }
      }
      this.setState({
        dashboardList: retData,
      });
    });
    if (activeTab) {
      this.setState({
        activeTab: parseInt(activeTab, 10),
      });
    }
  }

  manipulateData(result: any) {
    const retData: any = {};
    for (let i = 0; i < result.length; i++) {
      const dash = result[i];
      if (dash.type === 'dash-db') {
        retData[dash.folderId] = retData[dash.folderId] || { dashboards: [] };
        retData[dash.folderId].title = dash.folderTitle;
        if (retData[dash.folderId].dashboards.length === 0) {
          retData[dash.folderId].activeDash = 0;
        }
        retData[dash.folderId].dashboards.push(dash);
      }
    }
    return retData;
  }

  createDashboard = (dashboardList: any[], activeDash: any) => {
    let retData = [];
    for (let i = 0; i < dashboardList.length; i++) {
      const dashboard = dashboardList[i];
      if (dashboard.type === 'dash-db') {
        retData.push(
          <div key={dashboard.id}>
            {activeDash === i && (
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
    }
    return retData;
  };

  createAside = (folder: any, key: any) => {
    let retData = [];
    const dashboards = folder.dashboards;
    for (let i = 0; i < dashboards.length; i++) {
      const dashboard = dashboards[i];
      if (dashboard.type === 'dash-db') {
        retData.push(
          <a
            className={`dashboard-nav-item dashboard-settings__nav-item ${folder.activeDash === i ? 'active' : ''}`}
            onClick={e => this.activeDashboard(i, key)}
          >
            <div className="tab-title">{dashboard.title}</div>
          </a>
        );
      }
    }
    return retData;
  };

  activeDashboard = (id: any, key: any) => {
    const { dashboardList } = this.state;
    dashboardList[key].activeDash = id;
    this.setState({
      dashboardList,
    });
    localStorage.setItem('activeDash', id);
  };

  collapseAside = (e: any) => {
    e.preventDefault();
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  toggleTab = (activeTab: any) => {
    this.setState({
      activeTab: activeTab,
    });
    localStorage.setItem('activeTab', activeTab);
    const { dashboardList } = this.state;
    const keys = Object.keys(dashboardList);
    if (keys[activeTab] && dashboardList[keys[activeTab]]) {
      localStorage.setItem('activeDash', dashboardList[keys[activeTab]].activeDash);
    }
  };

  createNavigationTabs = (list: any) => {
    const retData = [];
    const keys = Object.keys(list);
    const { activeTab } = this.state;
    for (let i = 0; i < keys.length; i++) {
      const folder = list[keys[i]];
      retData.push(
        <NavItem className="cursor-pointer">
          <NavLink
            className={`${activeTab === i ? 'active' : ''}`}
            onClick={() => {
              this.toggleTab(i);
            }}
          >
            {folder.title}
          </NavLink>
        </NavItem>
      );
    }
    return retData;
  };

  createTabContent = (list: any) => {
    const { collapsed } = this.state;
    const retData = [];
    const keys = Object.keys(list);
    for (let i = 0; i < keys.length; i++) {
      const folder = list[keys[i]];
      const aside = this.createAside(folder, keys[i]);
      const dashboardContent = this.createDashboard(folder.dashboards, folder.activeDash);
      retData.push(
        <TabPane tabId={i}>
          <div className="dashboard-list-container">
            <aside className={`aside-container dashboard-settings__aside ${collapsed ? 'collapse' : ''}`}>
              <a onClick={this.collapseAside} className="aside-a collapse-button text-left">
                <i className="fa fa-bars"></i>
              </a>
              {aside}
            </aside>
            <div className="dashboard-settings__content"> {dashboardContent} </div>
          </div>
        </TabPane>
      );
    }
    return retData;
  };

  render() {
    const { dashboardList, activeTab } = this.state;
    return (
      <React.Fragment>
        <Nav tabs>{this.createNavigationTabs(dashboardList)}</Nav>
        <TabContent activeTab={activeTab}>{this.createTabContent(dashboardList)}</TabContent>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state: any) => state;

const mapDispatchToProps = {
  updateLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
