import React, { FC } from 'react';
import _ from 'lodash';
import TopSectionItem from './TopSectionItem';
import config from '../../config';
import TopMenuPlugins from './TopMenuPlugins';

const TopSection: FC<any> = () => {
  const navTree = _.cloneDeep(config.bootData.navTree);
  const mainLinks = _.filter(navTree, item => !item.hideFromMenu);

  return (
    <div className="sidemenu__top">
      {mainLinks.map((link, index) => {
        return link.id.indexOf('plugin-page') === -1 && <TopSectionItem link={link} key={`${link.id}-${index}`} />;
      })}
      <TopMenuPlugins links={mainLinks} />
    </div>
  );
};

export default TopSection;
