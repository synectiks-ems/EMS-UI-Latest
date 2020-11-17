// Libraries
import React from 'react';
import { connect } from 'react-redux';
import CustomDashboardLoader from '../custom-dashboard-loader';
import { backendSrv } from 'app/core/services/backend_srv';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { updateLocation } from 'app/core/actions';
import { CustomNavigationBar } from 'app/core/components/CustomNav';

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
    const activeTab: any = localStorage.getItem('active-home-tab');
    backendSrv.search({}).then((result: any) => {
      const retData = this.manipulateData(result);
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
    const retData: any = [];
    for (let i = 0; i < result.length; i++) {
      const dash = result[i];
      if (dash.type === 'dash-db') {
        retData.push(result[i]);
      }
    }
    return retData;
  }

  toggleTab = (activeTab: any) => {
    this.setState({
      activeTab: activeTab,
    });
    localStorage.setItem('active-home-tab', activeTab);
  };

  createNavigationTabs = (list: any) => {
    const retData = [];
    const { activeTab } = this.state;
    for (let i = 0; i < list.length; i++) {
      const dash = list[i];
      retData.push(
        <NavItem className="cursor-pointer">
          <NavLink
            className={`${activeTab === i ? 'active' : ''}`}
            onClick={() => {
              this.toggleTab(i);
            }}
          >
            <i className="fa fa-cog"></i>
            {dash.title}
          </NavLink>
        </NavItem>
      );
    }
    return retData;
  };

  createTabContent = (list: any) => {
    const retData = [];
    const { activeTab } = this.state;
    for (let i = 0; i < list.length; i++) {
      const dash = list[i];
      retData.push(
        <TabPane tabId={i}>
          <div className="dashboard-list-container">
            <div className="dashboard-settings__content">
              <div key={dash.id}>
                {activeTab === i && (
                  <CustomDashboardLoader
                    $scope={this.props.$scope}
                    $injector={this.props.$injector}
                    urlUid={dash.uid}
                    urlSlug={dash.slug}
                  />
                )}
              </div>
            </div>
          </div>
        </TabPane>
      );
    }
    return retData;
  };

  render() {
    const { dashboardList, activeTab } = this.state;
    return (
      <div>
        <CustomNavigationBar />
        <div className="scroll-canvas--dashboard dashboard-landing-page">
          <Nav tabs>{this.createNavigationTabs(dashboardList)}</Nav>
          <TabContent activeTab={activeTab}>{this.createTabContent(dashboardList)}</TabContent>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: any) => state;

const mapDispatchToProps = {
  updateLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
