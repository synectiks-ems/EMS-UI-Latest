import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import appEvents from '../../app_events';
// import TopSection from './TopSection';
// import BottomSection from './BottomSection';
// import config from 'app/core/config';
import { CoreEvents } from 'app/types';
// import { Branding } from 'app/core/components/Branding/Branding';

// const homeUrl = config.appSubUrl || '/';

export class SideMenu extends PureComponent<any, any> {
  toggleSideMenuSmallBreakpoint = () => {
    appEvents.emit(CoreEvents.toggleSidemenuMobile);
  };
  constructor(props: any) {
    super(props);
    this.state = {
      activeMenuLink: '',
    };
  }

  handleLocationChange = () => {
    const pathName = location.pathname;
    // let isActive = false;
    const totalItem = this.mainMenu.length;
    if (pathName === '/') {
      this.setState({
        activeMenuLink: '/',
      });
      return;
    }
    for (let i = 0; i < totalItem; i++) {
      const item = this.mainMenu[i];
      if (pathName.indexOf(item.activeLink) !== -1 && item.activeLink !== '/') {
        this.setState({
          activeMenuLink: item.activeLink,
        });
        // isActive = true;
        break;
      }
    }
  };

  componentDidMount() {
    const that = this;
    window.addEventListener('locationchange', () => {
      that.handleLocationChange();
    });

    history.pushState = (f =>
      function pushState(this: any) {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      })(history.pushState);

    history.replaceState = (f =>
      function replaceState(this: any) {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      })(history.replaceState);

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });

    this.handleLocationChange();
  }

  mainMenu: any = [
    {
      link: '/',
      text: 'Overview',
      cssClass: 'overview',
      activeLink: '/',
    },
    {
      link: '',
      text: 'Activity Log',
      cssClass: 'activity-log',
    },
    {
      link: '/plugins/xformation-alertmanager-ui-plugin/page/monitoralerts',
      text: 'Alerts',
      cssClass: 'alerts',
      activeLink: 'plugins/xformation-alertmanager-ui-plugin',
    },
    {
      link: '',
      text: 'Metrics',
      cssClass: 'metrics',
    },
    {
      link: '',
      text: 'Logs',
      cssClass: 'logs',
    },
    {
      link: '',
      text: 'Service Health',
      cssClass: 'service-health',
    },
    {
      link: '',
      text: 'Workbooks',
      cssClass: 'workbooks',
    },
  ];
  insights: any = [
    {
      link: '',
      text: 'Applications',
      cssClass: 'applications',
    },
    {
      link: '',
      text: 'Virtual Machines',
      cssClass: 'virtual-machines',
    },
    {
      link: '',
      text: 'Networks (preview)',
      cssClass: 'networks',
    },
    {
      link: '',
      text: 'Jobs',
      cssClass: 'jobs',
    },
  ];
  settings: any = [
    {
      link: '',
      text: 'Diagnostic Settings',
      cssClass: 'diagnostic-settings',
    },
  ];

  onClickToggleMenu = (e: any) => {
    //This is patch to toggle the menu
    //never directly use dom elements like this
    const grafanaApp: any = document.getElementsByClassName('grafana-app');
    if (grafanaApp.length > 0) {
      grafanaApp[0].classList.toggle('wide-side-menu');
    }
  };

  onClickLink = (e: any, menuItem: any) => {
    this.setState({
      activeMenuLink: menuItem.activeLink,
    });
  };

  createOpenMenu = (menuItems: any) => {
    const retItem: any = [];
    const { activeMenuLink } = this.state;
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      retItem.push(
        <a
          href={menuItem.link}
          className={`menu-item ${activeMenuLink === menuItem.activeLink ? 'active' : ''}`}
          onClick={(e: any) => this.onClickLink(e, menuItem)}
        >
          <div className={`menu-item-image ${menuItem.cssClass}`}></div>
          <div className="menu-item-text">{menuItem.text}</div>
        </a>
      );
    }
    return retItem;
  };

  createCloseMenu = (menuItems: any) => {
    const retItem: any = [];
    const { activeMenuLink } = this.state;
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      retItem.push(
        <a
          href={menuItem.link}
          className={`menu-item ${activeMenuLink === menuItem.activeLink ? 'active' : ''}`}
          onClick={(e: any) => this.onClickLink(e, menuItem)}
        >
          <div className={`menu-item-image ${menuItem.cssClass}`}></div>
        </a>
      );
    }
    return retItem;
  };

  render() {
    return [
      <div className="sidemenu__logo_small_breakpoint" onClick={this.toggleSideMenuSmallBreakpoint} key="hamburger">
        <i className="fa fa-bars" />
        <span className="sidemenu__close">
          <i className="fa fa-times" />
          &nbsp;Close
        </span>
      </div>,
      <div className="menu-item-container">
        <div className="open-menu">
          <div className="sidemenu-search-container">
            <label className="gf-form--has-input-icon mr-auto">
              <input type="text" placeholder="Search" className="gf-form-input sidemenu-search-box" />
              <i className="gf-form-input-icon fa fa-search"></i>
            </label>
            <div className="side-menu-toggle" onClick={this.onClickToggleMenu}>
              <i className="fa fa-arrow-left left-arrow"></i>
            </div>
          </div>
          {this.createOpenMenu(this.mainMenu)}
          <div className="menu-item-header">INSIGHTS</div>
          {this.createOpenMenu(this.insights)}
          <div className="menu-item-header">SETTINGS</div>
          {this.createOpenMenu(this.settings)}
        </div>
        <div className="close-menu">
          <div className="sidemenu-search-container">
            <div className="side-menu-toggle" onClick={this.onClickToggleMenu}>
              <i className="fa fa-arrow-right right-arrow"></i>
            </div>
          </div>
          {this.createCloseMenu(this.mainMenu)}
          <div className="menu-item-header"></div>
          {this.createCloseMenu(this.insights)}
          <div className="menu-item-header"></div>
          {this.createCloseMenu(this.settings)}
        </div>
      </div>,
    ];
  }
}
