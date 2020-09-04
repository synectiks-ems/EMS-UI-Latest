import React, { PureComponent } from 'react';
export class CustomSideMenu extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeMenuLink: '',
      activeSubMenuLink: '',
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
        if (item.subMenu && item.subMenu.length > 0) {
          for (let j = 0; j < item.subMenu.length; j++) {
            const sMenu = item.subMenu[j];
            if (pathName.indexOf(sMenu.activeSLink) !== -1) {
              this.setState({
                activeSubMenuLink: sMenu.activeSLink,
              });
              break;
            }
          }
        }
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
      link: '/activity-log',
      text: 'Activity Log',
      cssClass: 'activity-log',
      activeLink: '/activity-log',
    },
    {
      link: '/plugins/xformation-alertmanager-ui-plugin/page/monitoralerts',
      text: 'Alerts',
      cssClass: 'alerts',
      activeLink: 'plugins/xformation-alertmanager-ui-plugin',
      subMenu: [
        {
          link: '/plugins/xformation-alertmanager-ui-plugin/page/monitoralerts',
          text: 'Dashboard',
          cssClass: 'dashboard',
          activeSLink: 'plugins/xformation-alertmanager-ui-plugin/page/monitoralerts',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: '/plugins/xformation-alertmanager-ui-plugin/page/alertrulebuilder',
          text: 'New Alert Rule',
          cssClass: 'new-alert-rule',
          activeSLink: 'plugins/xformation-alertmanager-ui-plugin/page/alertrulebuilder',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
      ],
    },
    {
      link: 'plugins/xformation-perfmanager-ui-plugin/page/managedashboard',
      text: 'Metrics',
      cssClass: 'metrics',
      activeLink: 'plugins/xformation-perfmanager-ui-plugin',
      subMenu: [
        {
          link: 'plugins/xformation-perfmanager-ui-plugin/page/catalog',
          text: 'Catalog',
          cssClass: 'metrics-catalog',
          activeSLink: 'plugins/xformation-perfmanager-ui-plugin/page/catalog',
          activeLink: 'plugins/xformation-perfmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-perfmanager-ui-plugin/page/library',
          text: 'Library',
          cssClass: 'metrics-library',
          activeSLink: 'plugins/xformation-perfmanager-ui-plugin/page/library',
          activeLink: 'plugins/xformation-perfmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-perfmanager-ui-plugin/page/collectionview',
          text: 'Collection',
          cssClass: 'metrics-collection',
          activeSLink: 'plugins/xformation-perfmanager-ui-plugin/page/collectionview',
          activeLink: 'plugins/xformation-perfmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-alertmanager-ui-plugin/page/managealertrule',
          text: 'Rule',
          cssClass: 'metrics-rule',
          activeSLink: 'plugins/xformation-alertmanager-ui-plugin/page/managealertrule',
          activeLink: 'plugins/xformation-perfmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-perfmanager-ui-plugin/page/preferences',
          text: 'Preferences',
          cssClass: 'metrics-preferences',
          activeSLink: 'plugins/xformation-perfmanager-ui-plugin/page/preferences',
          activeLink: 'plugins/xformation-perfmanager-ui-plugin',
        },
      ],
    },
    {
      link: '/logs',
      text: 'Logs',
      cssClass: 'logs',
      activeLink: '/logs',
    },
    {
      link: '/service-health',
      text: 'Service Health',
      cssClass: 'service-health',
      activeLink: '/service-health',
    },
    {
      link: '/workbooks',
      text: 'Workbooks',
      cssClass: 'workbooks',
      activeLink: '/workbooks',
    },
    {
      link: 'plugins/xformation-compliancemanager-ui-plugin/page/dashboard',
      text: 'Compliance',
      cssClass: 'compliance',
      activeLink: 'plugins/xformation-compliancemanager-ui-plugin',
      subMenu: [
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/dashboard',
          text: 'Dashboard',
          cssClass: 'compliance-dashboard',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/dashboard',
          activeLink: 'plugins/xformation-compliancemanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/compliancerulesets',
          text: 'Compliance Rulesets',
          cssClass: 'compliance-rulesets',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/compliancerulesets',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: '/gsl-builder',
          text: 'GSL Builder',
          cssClass: 'compliance-builder',
          activeSLink: '',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceremediation',
          text: 'Remediation',
          cssClass: 'compliance-remediation',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceremediation',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceassessmenthistory',
          text: 'Assessment History',
          cssClass: 'compliance-assessment',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceassessmenthistory',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceexclusions',
          text: 'Exclusions',
          cssClass: 'compliance-exclusions',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/complianceexclusions',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
        {
          link: 'plugins/xformation-compliancemanager-ui-plugin/page/compliancepolicy',
          text: 'Compliance Policies',
          cssClass: 'compliance-exclusions',
          activeSLink: 'plugins/xformation-compliancemanager-ui-plugin/page/compliancepolicy',
          activeLink: 'plugins/xformation-alertmanager-ui-plugin',
        },
      ],
    },
    {
      link: 'plugins/xformation-servicedesk-ui-plugin/page/dashboard',
      text: 'Tickets',
      cssClass: 'tickets',
      activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
      subMenu: [
        {
          link: 'plugins/xformation-servicedesk-ui-plugin/page/dashboard',
          text: 'Dashboard',
          cssClass: 'tickets-dashboard',
          activeSLink: 'plugins/xformation-servicedesk-ui-plugin/page/dashboard',
          activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
        },
        {
          link: 'plugins/xformation-servicedesk-ui-plugin/page/allcontacts',
          text: 'Contacts',
          cssClass: 'tickets-contacts',
          activeSLink: 'plugins/xformation-servicedesk-ui-plugin/page/allcontacts',
          activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
        },
        {
          link: 'plugins/xformation-servicedesk-ui-plugin/page/allcompanies',
          text: 'Companies',
          cssClass: 'tickets-companies',
          activeSLink: 'plugins/xformation-servicedesk-ui-plugin/page/allcompanies',
          activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
        },
        {
          link: 'plugins/xformation-servicedesk-ui-plugin/page/tickets',
          text: 'Reports',
          cssClass: 'tickets-reports',
          activeSLink: 'plugins/xformation-servicedesk-ui-plugin/page/tickets',
          activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
        },
        {
          link: 'plugins/xformation-servicedesk-ui-plugin/page/opentickets',
          text: 'Preferences',
          cssClass: 'tickets-preferences',
          activeSLink: 'plugins/xformation-servicedesk-ui-plugin/page/opentickets',
          activeLink: 'plugins/xformation-servicedesk-ui-plugin/',
        },
      ],
    },
  ];
  insights: any = [
    {
      link: '/applications',
      text: 'Applications',
      cssClass: 'applications',
      activeLink: '/applications',
    },
    {
      link: '/virtual-machines',
      text: 'Virtual Machines',
      cssClass: 'virtual-machines',
      activeLink: '/virtual-machines',
    },
    {
      link: '/networks',
      text: 'Networks (preview)',
      cssClass: 'networks',
      activeLink: '/networks',
    },
    {
      link: '/jobs',
      text: 'Jobs',
      cssClass: 'jobs',
      activeLink: '/jobs',
    },
  ];
  settings: any = [
    {
      link: '/diagnostic-settings',
      text: 'Diagnostic Settings',
      cssClass: 'diagnostic-settings',
      activeLink: '/diagnostic-settings',
    },
    {
      link: '/plugins/xformation-rbac-ui-plugin/page/home',
      text: 'RBAC Settings',
      cssClass: 'diagnostic-settings',
      activeSLink: '/plugins/xformation-rbac-ui-plugin/page/home',
      activeLink: '/plugins/xformation-rbac-ui-plugin',
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
      activeSubMenuLink: menuItem.activeLink,
    });
  };

  onClickSubLink = (e: any, sMenuItem: any) => {
    this.setState({
      activeMenuLink: sMenuItem.activeLink,
      activeSubMenuLink: sMenuItem.activeSLink,
    });
  };

  createOpenMenu = (menuItems: any) => {
    const retItem: any = [];
    const { activeMenuLink, activeSubMenuLink } = this.state;
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      const subMenuItems = [];
      if (menuItem.subMenu && menuItem.subMenu.length > 0) {
        for (let j = 0; j < menuItem.subMenu.length; j++) {
          subMenuItems.push(
            <li>
              <a
                className={`menu-item ${activeSubMenuLink === menuItem.subMenu[j].activeSLink ? 'active' : ''}`}
                href={menuItem.subMenu[j].link}
                onClick={(e: any) => this.onClickSubLink(e, menuItem.subMenu[j])}
              >
                <div className={`menu-item-image ${menuItem.subMenu[j].cssClass}`}></div>
                <div className="menu-item-text">{menuItem.subMenu[j].text}</div>
              </a>
            </li>
          );
        }
      }
      retItem.push(
        <li className="item">
          <a
            href={menuItem.link}
            className={`menu-item ${activeMenuLink === menuItem.activeLink ? 'active' : ''}`}
            onClick={(e: any) => this.onClickLink(e, menuItem)}
          >
            <div className={`menu-item-image ${menuItem.cssClass}`}></div>
            <div className="menu-item-text">{menuItem.text}</div>
          </a>
          {subMenuItems.length > 0 && <ul className="sub-menu">{subMenuItems}</ul>}
        </li>
      );
    }
    return retItem;
  };

  createCloseMenu = (menuItems: any) => {
    const retItem: any = [];
    const { activeMenuLink, activeSubMenuLink } = this.state;
    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];
      const subMenuItems = [];
      if (menuItem.subMenu && menuItem.subMenu.length > 0) {
        for (let j = 0; j < menuItem.subMenu.length; j++) {
          subMenuItems.push(
            <li>
              <a
                className={`menu-item ${activeSubMenuLink === menuItem.subMenu[j].activeSLink ? 'active' : ''}`}
                href={menuItem.subMenu[j].link}
                onClick={(e: any) => this.onClickSubLink(e, menuItem.subMenu[j])}
              >
                <div className={`menu-item-image ${menuItem.subMenu[j].cssClass}`}></div>
                <div className="menu-item-text">{menuItem.subMenu[j].text}</div>
              </a>
            </li>
          );
        }
      }
      retItem.push(
        <li className="item">
          <a
            href={menuItem.link}
            className={`menu-item ${activeMenuLink === menuItem.activeLink ? 'active' : ''}`}
            onClick={(e: any) => this.onClickLink(e, menuItem)}
          >
            <div className={`menu-item-image ${menuItem.cssClass}`}></div>
            <div className="menu-item-text">{menuItem.text}</div>
          </a>
          {subMenuItems.length > 0 && <ul className="sub-menu">{subMenuItems}</ul>}
        </li>
      );
    }
    return retItem;
  };

  render() {
    return [
      <div className="sidemenu__logo_small_breakpoint">
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
          <ul>{this.createOpenMenu(this.mainMenu)}</ul>
          <div className="menu-item-header">INSIGHTS</div>
          <ul>{this.createOpenMenu(this.insights)}</ul>
          <div className="menu-item-header">SETTINGS</div>
          <ul>{this.createOpenMenu(this.settings)}</ul>
        </div>
        <div className="close-menu">
          <div className="sidemenu-search-container">
            <div className="side-menu-toggle" onClick={this.onClickToggleMenu}>
              <i className="fa fa-arrow-right right-arrow"></i>
            </div>
          </div>
          <ul>{this.createCloseMenu(this.mainMenu)}</ul>
          <div className="menu-item-header"></div>
          <ul>{this.createCloseMenu(this.insights)}</ul>
          <div className="menu-item-header"></div>
          <ul>{this.createCloseMenu(this.settings)}</ul>
        </div>
      </div>,
    ];
  }
}
