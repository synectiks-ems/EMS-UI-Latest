// Libaries
import React, { PureComponent } from 'react';

export class CustomNavigationBar extends PureComponent<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
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
            />
            <i className="gf-form-input-icon fa fa-search"></i>
          </label>
        </div>
        <div className="icon-container">
          <div className="icon">
            <i className="fa fa-terminal"></i>
          </div>
          <div className="icon">
            <i className="fa fa-folder"></i>
          </div>
          <div className="icon">
            <i className="fa fa-cog"></i>
          </div>
          <div className="icon">
            <i className="fa fa-bell"></i>
          </div>
          <div className="icon">
            <i className="fa fa-user-circle"></i>
          </div>
        </div>
      </div>
    );
  }
}
