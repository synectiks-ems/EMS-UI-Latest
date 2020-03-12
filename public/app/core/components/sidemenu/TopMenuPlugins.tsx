import React, { SFC } from 'react';
import SideMenuPluginsDropDown from './SideMenuPluginsDropDown';

export interface Props {
  links: any;
}

const TopMenuPlugins: SFC<Props> = props => {
  const { links } = props;
  return (
    <div className="sidemenu-item dropdown">
      <a className="sidemenu-link">
        <span className="icon-circle sidemenu-icon">
          <i className="fa fa-ellipsis-h"></i>
        </span>
      </a>
      <SideMenuPluginsDropDown links={links} />
    </div>
  );
};

export default TopMenuPlugins;
