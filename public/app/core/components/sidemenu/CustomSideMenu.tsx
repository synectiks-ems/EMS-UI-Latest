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
      text: 'Dashboard',
      cssClass: 'dashboard',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Preference',
      cssClass: 'preference',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Admission',
      cssClass: 'admission',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Attendance',
      cssClass: 'attendance',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Exam',
      cssClass: 'exam',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Fee',
      cssClass: 'fee',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Library',
      cssClass: 'library',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Transport',
      cssClass: 'transport',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Student',
      cssClass: 'student',
      activeLink: '/',
    },
    {
      link: '/',
      text: 'Networks(Preview)',
      cssClass: 'networks',
      activeLink: '/',
    },
  ];
  // insights: any = [
  //   {
  //     link: '/applications',
  //     text: 'Applications',
  //     cssClass: 'applications',
  //     activeLink: '/applications',
  //   },
  //   {
  //     link: '/virtual-machines',
  //     text: 'Virtual Machines',
  //     cssClass: 'virtual-machines',
  //     activeLink: '/virtual-machines',
  //   },
  //   {
  //     link: '/networks',
  //     text: 'Networks (preview)',
  //     cssClass: 'networks',
  //     activeLink: '/networks',
  //   },
  //   {
  //     link: '/jobs',
  //     text: 'Jobs',
  //     cssClass: 'jobs',
  //     activeLink: '/jobs',
  //   },
  // ];
  settings: any = [
    {
      link: '/',
      text: 'Preference',
      cssClass: 'preference',
      activeLink: '/',
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
          {/* <div className="menu-item-header">INSIGHTS</div>
          <ul>{this.createOpenMenu(this.insights)}</ul> */}
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
          {/* <ul>{this.createCloseMenu(this.insights)}</ul> */}
          {/* <div className="menu-item-header"></div> */}
          <ul>{this.createCloseMenu(this.settings)}</ul>
        </div>
      </div>,
    ];
  }
}
