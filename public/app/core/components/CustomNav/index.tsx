// Libaries
import React, { PureComponent } from 'react';

export class CustomNavigationBar extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showSearch: false,
    };
  }

  onClickLogout = (e: any) => {
    window.location.href = '/logout';
  };

  onClickSearchBox = (e: any) => {
    this.setState({
      showSearch: true,
    });
  };

  onClickBackdrop = () => {
    this.setState({
      showSearch: false,
    });
  };

  render() {
    const { showSearch } = this.state;
    return (
      <div className="top-nav-bar">
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <div className="search-box-container">
          <label className="gf-form--has-input-icon mr-auto">
            <input
              type="text"
              placeholder="Search resources, services, and docs"
              className="gf-form-input search-box"
              onClick={this.onClickSearchBox}
            />
            <i className="gf-form-input-icon fa fa-search"></i>
          </label>
          {showSearch && (
            <React.Fragment>
              <div className="search-menu"></div>
              <div className="search-backdrop" onClick={this.onClickBackdrop}></div>
            </React.Fragment>
          )}
        </div>
        <div className="icon-container">
          <a href="/dashboards" className="icon">
            <i className="fa fa-terminal"></i>
          </a>
          <a href="/dashboardlist" className="icon">
            <i className="fa fa-folder"></i>
          </a>
          <a className="icon" href="/plugins">
            <i className="fa fa-cog"></i>
          </a>
          <div className="icon">
            <i className="fa fa-bell"></i>
          </div>
          <div className="icon" onClick={this.onClickLogout}>
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
      </div>
    );
  }
}
