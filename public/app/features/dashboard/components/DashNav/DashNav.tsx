// Libaries
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { e2e } from '@grafana/e2e';
// Utils & Services
import { appEvents } from 'app/core/app_events';
import { PlaylistSrv } from 'app/features/playlist/playlist_srv';
// Components
// import { DashNavButton } from './DashNavButton';
// import { DashNavTimeControls } from './DashNavTimeControls';
// import { ModalsController } from '@grafana/ui';
import { BackButton } from 'app/core/components/BackButton/BackButton';
// State
import { updateLocation } from 'app/core/actions';
// Types
import { DashboardModel } from '../../state';
import { CoreEvents, StoreState } from 'app/types';
// import { ShareModal } from 'app/features/dashboard/components/ShareModal';
// import { SaveDashboardModalProxy } from 'app/features/dashboard/components/SaveDashboard/SaveDashboardModalProxy';

// import BottomSection from '../../../../core/components/sidemenu/BottomSection';

export interface OwnProps {
  dashboard: DashboardModel;
  editview: string;
  isEditing: boolean;
  isFullscreen: boolean;
  $injector: any;
  updateLocation: typeof updateLocation;
  onAddPanel: () => void;
  dontRenderTitle?: boolean;
}

export interface StateProps {
  location: any;
}

type Props = StateProps & OwnProps;

export class DashNav extends PureComponent<Props> {
  playlistSrv: PlaylistSrv;

  constructor(props: Props) {
    super(props);
    this.playlistSrv = this.props.$injector.get('playlistSrv');
  }

  onDahboardNameClick = () => {
    appEvents.emit(CoreEvents.showDashSearch);
  };

  onFolderNameClick = () => {
    appEvents.emit(CoreEvents.showDashSearch, {
      query: 'folder:current',
    });
  };

  onClose = () => {
    if (this.props.editview) {
      this.props.updateLocation({
        query: { editview: null },
        partial: true,
      });
    } else {
      this.props.updateLocation({
        query: { panelId: null, edit: null, fullscreen: null, tab: null },
        partial: true,
      });
    }
  };

  onToggleTVMode = () => {
    appEvents.emit(CoreEvents.toggleKioskMode);
  };

  onOpenSettings = () => {
    this.props.updateLocation({
      query: { editview: 'settings' },
      partial: true,
    });
  };

  onStarDashboard = () => {
    const { dashboard, $injector } = this.props;
    const dashboardSrv = $injector.get('dashboardSrv');

    dashboardSrv.starDashboard(dashboard.id, dashboard.meta.isStarred).then((newState: any) => {
      dashboard.meta.isStarred = newState;
      this.forceUpdate();
    });
  };

  onPlaylistPrev = () => {
    this.playlistSrv.prev();
  };

  onPlaylistNext = () => {
    this.playlistSrv.next();
  };

  onPlaylistStop = () => {
    this.playlistSrv.stop();
    this.forceUpdate();
  };

  renderDashboardTitleSearchButton() {
    // const { dashboard } = this.props;

    // const folderTitle = dashboard.meta.folderTitle;
    // const haveFolder = dashboard.meta.folderId > 0;

    return (
      <>
        {/* <div>
        </div> */}
        {this.isSettings && <span className="navbar-settings-title">&nbsp;/ Settings</span>}
        <div className="navbar__spacer" />
      </>
    );
  }

  get isInFullscreenOrSettings() {
    return this.props.editview || this.props.isFullscreen;
  }

  get isSettings() {
    return this.props.editview;
  }

  renderBackButton() {
    return (
      <div className="navbar-edit">
        <BackButton onClick={this.onClose} aria-label={e2e.pages.Dashboard.Toolbar.selectors.backArrow} />
      </div>
    );
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

  // render() {
  //   const { dashboard, onAddPanel, location, dontRenderTitle } = this.props;
  //   const { canStar, canSave, canShare, showSettings, isStarred } = dashboard.meta;
  //   const { snapshot } = dashboard;
  //   const snapshotUrl = snapshot && snapshot.originalUrl;
  //   return (
  //     <div>
  //       <div className="page-nav" style={{ width: '100%', background: 'white', height: '51px', marginBottom: '5px' }}>
  //         <div className="dash-nav" style={{ display: 'flex', justifyContent: 'space-between' }}>
  //           <div></div>
  //           <div className="search-name p-1 text-center" style={{ paddingTop: '10px' }}>
  //             <label className="gf-form--has-input-icon mr-auto">
  //               <input
  //                 type="text"
  //                 placeholder="Search"
  //                 className="gf-form-input"
  //                 onClick={this.onDahboardNameClick}
  //                 style={{
  //                   width: '30vw',
  //                   height: '30px',
  //                   backgroundColor: '#edebe9',
  //                   borderRadius: '5px',
  //                 }}
  //               />
  //               {/* <input type="text" className="gf-form-input search-width" placeholder="Search"> */}
  //               <i className="gf-form-input-icon fa fa-search"></i>
  //             </label>
  //           </div>
  //           <div className="white-color p-r-1" style={{ display: 'flex', alignItems: 'center' }}>
  //             <div
  //               className="navbar"
  //               style={{ paddingLeft: '10px', height: '51px', background: 'white', boxShadow: 'none', border: 'none' }}
  //             >
  //               {this.isInFullscreenOrSettings && this.renderBackButton()}
  //               {!dontRenderTitle && this.renderDashboardTitleSearchButton()}

  //               {this.playlistSrv.isPlaying && (
  //                 <div className="navbar-buttons navbar-buttons--playlist">
  //                   <DashNavButton
  //                     tooltip="Go to previous dashboard"
  //                     classSuffix="tight"
  //                     icon="fa fa-step-backward"
  //                     onClick={this.onPlaylistPrev}
  //                   />
  //                   <DashNavButton
  //                     tooltip="Stop playlist"
  //                     classSuffix="tight"
  //                     icon="fa fa-stop"
  //                     onClick={this.onPlaylistStop}
  //                   />
  //                   <DashNavButton
  //                     tooltip="Go to next dashboard"
  //                     classSuffix="tight"
  //                     icon="fa fa-forward"
  //                     onClick={this.onPlaylistNext}
  //                   />
  //                 </div>
  //               )}

  //               <div id="chge_icon-color" className="navbar-buttons navbar-buttons--actions">
  //                 {canSave && (
  //                   <DashNavButton
  //                     tooltip="Add panel"
  //                     classSuffix="add-panel"
  //                     icon="gicon gicon-add-panel"
  //                     onClick={onAddPanel}
  //                   />
  //                 )}

  //                 {canStar && (
  //                   <DashNavButton
  //                     tooltip="Mark as favorite"
  //                     classSuffix="star"
  //                     icon={`${isStarred ? 'fa fa-star' : 'fa fa-star-o'}`}
  //                     onClick={this.onStarDashboard}
  //                   />
  //                 )}

  //                 {canShare && (
  //                   <ModalsController>
  //                     {({ showModal, hideModal }) => (
  //                       <DashNavButton
  //                         tooltip="Share dashboard"
  //                         classSuffix="share"
  //                         icon="fa fa-share-square-o"
  //                         onClick={() => {
  //                           showModal(ShareModal, {
  //                             dashboard,
  //                             onDismiss: hideModal,
  //                           });
  //                         }}
  //                       />
  //                     )}
  //                   </ModalsController>
  //                 )}

  //                 {canSave && (
  //                   <ModalsController>
  //                     {({ showModal, hideModal }) => (
  //                       <DashNavButton
  //                         tooltip="Save dashboard"
  //                         classSuffix="save"
  //                         icon="fa fa-save"
  //                         onClick={() => {
  //                           showModal(SaveDashboardModalProxy, {
  //                             dashboard,
  //                             onDismiss: hideModal,
  //                           });
  //                         }}
  //                       />
  //                     )}
  //                   </ModalsController>
  //                 )}

  //                 {snapshotUrl && (
  //                   <DashNavButton
  //                     tooltip="Open original dashboard"
  //                     classSuffix="snapshot-origin"
  //                     icon="gicon gicon-link"
  //                     href={snapshotUrl}
  //                   />
  //                 )}

  //                 {showSettings && (
  //                   <DashNavButton
  //                     tooltip="Dashboard settings"
  //                     classSuffix="settings"
  //                     icon="gicon gicon-cog"
  //                     onClick={this.onOpenSettings}
  //                   />
  //                 )}
  //               </div>

  //               {/* <div className="navbar-buttons navbar-buttons--tv">
  //           <DashNavButton
  //             tooltip="Cycle view mode"
  //             classSuffix="tv"
  //             icon="fa fa-desktop"
  //             onClick={this.onToggleTVMode}
  //           />
  //         </div> */}

  //               {!dashboard.timepicker.hidden && (
  //                 <div className="navbar-buttons">
  //                   <DashNavTimeControls dashboard={dashboard} location={location} updateLocation={updateLocation} />
  //                 </div>
  //               )}
  //             </div>
  //             {/* <div id="chge_icon-color">
  //               {showSettings && (
  //                 <DashNavButton
  //                   tooltip="Dashboard settings"
  //                   classSuffix="settings"
  //                   icon="gicon gicon-cog"
  //                   onClick={this.onOpenSettings}
  //                 />
  //               )}
  //             </div> */}
  //             {/* <div id="chge_icon-color">
  //               <DashNavButton
  //                 tooltip="Cycle view mode"
  //                 classSuffix="tv"
  //                 icon="fa fa-desktop"
  //                 onClick={this.onToggleTVMode}
  //               />
  //             </div> */}
  //             <a href="/profile" className="sidemenu-link">
  //               <span className="icon-circle sidemenu-icon">
  //                 <img src="/public/img/user_profile.png" />
  //               </span>
  //             </a>
  //             {/* <i className="gf-form-input-icon fa fa-cog" style={{ fontSize: '20px', marginRight: '10px' }}></i> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state: StoreState) => ({
  location: state.location,
});

const mapDispatchToProps = {
  updateLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashNav);
