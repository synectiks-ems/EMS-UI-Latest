import React, { PureComponent } from 'react';
import appEvents from '../../app_events';
// import TopSection from './TopSection';
// import BottomSection from './BottomSection';
// import config from 'app/core/config';
import { CoreEvents } from 'app/types';
// import { Branding } from 'app/core/components/Branding/Branding';

// const homeUrl = config.appSubUrl || '/';

export class SideMenu extends PureComponent {
  toggleSideMenuSmallBreakpoint = () => {
    appEvents.emit(CoreEvents.toggleSidemenuMobile);
  };
  constructor(props: any) {
    super(props);
  }
  mainMenu: any = [
    {
      link: '',
      text: 'Overview',
      cssClass: 'overview',
    },
    {
      link: '',
      text: 'Activity Log',
      cssClass: 'activity-log',
    },
    {
      link: '',
      text: 'Alerts',
      cssClass: 'alerts',
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
  insights: any = [];
  settings: any = [];

  onClickToggleMenu = (e: any) => {
    //This is patch to toggle the menu
    //never directly use dom elements like this
    const grafanaApp: any = document.getElementsByClassName('grafana-app');
    if (grafanaApp.length > 0) {
      grafanaApp[0].classList.toggle('wide-side-menu');
    }
  };

  createOpenMenu = (menuItems: any) => {
    const retItem: any = [];
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      retItem.push(
        <a className="menu-item">
          <div className={`menu-item-image ${menuItem.cssClass}`}></div>
          <div className="menu-item-text">{menuItem.text}</div>
        </a>
      );
    }
    return retItem;
  };

  createCloseMenu = (menuItems: any) => {
    const retItem: any = [];
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      retItem.push(
        <div className="menu-item">
          <div className={`menu-item-image ${menuItem.cssClass}`}></div>
        </div>
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
        </div>
        <div className="close-menu">
          <div className="sidemenu-search-container">
            <div className="side-menu-toggle" onClick={this.onClickToggleMenu}>
              <i className="fa fa-arrow-right right-arrow"></i>
            </div>
          </div>
          {this.createCloseMenu(this.mainMenu)}
        </div>
      </div>,
    ];
  }
}
