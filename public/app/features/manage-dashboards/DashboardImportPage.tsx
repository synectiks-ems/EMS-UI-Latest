import React, { FormEvent, PureComponent } from 'react';
import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { css } from 'emotion';
import { AppEvents, NavModel } from '@grafana/data';
// import { Button, stylesFactory, Input, TextArea, Field, Form, Legend } from '@grafana/ui';
// import { Button, stylesFactory, TextArea, Field, Form, Legend } from '@grafana/ui';
// import { Button, stylesFactory, Form, Legend } from '@grafana/ui';
import { Button, stylesFactory, Form } from '@grafana/ui';
// import Page from 'app/core/components/Page/Page';
import CustomPage from 'app/core/components/Page/CustomPage';
import { connectWithCleanUp } from 'app/core/components/connectWithCleanUp';
import { ImportDashboardOverview } from './components/ImportDashboardOverview';
// import { DashboardFileUpload } from './components/DashboardFileUpload';
// import { validateDashboardJson, validateGcomDashboard } from './utils/validation';
// import { validateDashboardJson } from './utils/validation';
import { fetchGcomDashboard, importDashboardJson } from './state/actions';
import appEvents from 'app/core/app_events';
import { getNavModel } from 'app/core/selectors/navModel';
import { StoreState } from 'app/types';
import { FolderDTO } from 'app/types';
// import { DashboardSection} from '../types';
import ManageDashboards from '../search/components/CustomManageDashboards';
import { config } from '../config';
interface OwnProps {
  failedDashboards: any;
}

interface ConnectedProps {
  navModel: NavModel;
  isLoaded: boolean;
  folder?: FolderDTO;
}
interface DispatchProps {
  fetchGcomDashboard: typeof fetchGcomDashboard;
  importDashboardJson: typeof importDashboardJson;
}

type Props = OwnProps & ConnectedProps & DispatchProps;
class DashboardImportUnConnected extends PureComponent<Props> {
  onFileUpload = (event: FormEvent<HTMLInputElement>) => {
    const { importDashboardJson } = this.props;
    const file = event.currentTarget.files && event.currentTarget.files.length > 0 && event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      const readerOnLoad = () => {
        return (e: any) => {
          let dashboard: any;
          try {
            dashboard = JSON.parse(e.target.result);
          } catch (error) {
            appEvents.emit(AppEvents.alertError, [
              'Import failed',
              'JSON -> JS Serialization failed: ' + error.message,
            ]);
            return;
          }
          importDashboardJson(dashboard);
        };
      };
      reader.onload = readerOnLoad();
      reader.readAsText(file);
    }
  };

  getDashboardFromJson = (formData: { dashboardJson: string }) => {
    // this.props.importDashboardJson(JSON.parse(formData.dashboardJson));
    // const { navModel } = this.props;
    // console.log(`navModel : `, navModel);
    let section = JSON.parse(localStorage.getItem(`selectedSection`));
    if (section.expanded) {
      console.log(`DashboardImport selectedSection >> `, section);
      let url = new URLSearchParams(location.search);
      let id = url.get(`id`);
      let isFolder = url.get(`isFolder`);
      console.log(`Id: ${id}, isFolder ${isFolder}`);
      let requestOptionsGet: any = {
        method: `GET`,
      };
      fetch(`${config.LIST_DASHBOARD}?id=${id}&isFolder=${isFolder}`, requestOptionsGet)
        .then(response => response.json())
        .then((response: any) => {
          console.log(`List of collector/dashboards: `, response);
          let a = [];
          for (let i = 0; i < response.length; i++) {
            const ds = response[i];
            let dashboard: any;
            try {
              dashboard = JSON.parse(ds.dashboardJson);
              dashboard.uid = ``;
              dashboard.id = null;
              // this.props.importDashboardJson(dashboard);
              // check for existing dashboard
              let DelObj = {
                OrgId: 1,
                FolderId: section.id,
                Slug: dashboard.title,
              };
              let reqOptDel: any = {
                method: `DELETE`,
                headers: {
                  ...{ 'Content-Type': 'application/json;charset=UTF-8' },
                },
                body: JSON.stringify(DelObj),
              };
              fetch(`${config.DELETE_DASHBOARD}`, reqOptDel)
                .then(rs => rs.json())
                .then((rs: any) => {
                  console.log(`existing dashboard status : `, rs.message);
                });
              let SaveDashboardCommand = {
                Dashboard: dashboard,
                UserId: 1,
                Overwrite: true,
                Message: `Importing dashboard for brighton`,
                OrgId: 1,
                FolderId: section.id,
                IsFolder: false,
              };
              let requestOptions: any = {
                method: `POST`,
                headers: {
                  ...{ 'Content-Type': 'application/json;charset=UTF-8' },
                },
                body: JSON.stringify(SaveDashboardCommand),
              };
              console.log(requestOptions);
              fetch(`${config.IMPORT_DASHBOARD}`, requestOptions)
                .then(resp => resp.json())
                .then((resp: any) => {
                  console.log(`Dashboard Import response :::`, resp);
                  appEvents.emit(AppEvents.alertSuccess, [``, `Dashboard imported successfully`]);
                });
            } catch (error) {
              a[i] = ds;
              console.log(`failed dashboard : `, error);
              appEvents.emit(AppEvents.alertError, [``, `Dashboard could not be imported. Please check the logs`]);
              // appEvents.emit(AppEvents.alertError, [
              //   'Import failed',
              //   'JSON -> JS Serialization failed: ' + error.message,
              // ]);
              // return;
            }
          }
        });
    } else {
      appEvents.emit(AppEvents.alertError, [`Dashboard import failed`, `Please select a folder to import dashboards`]);
    }
    console.log(`Dashboard import completed`);
  };

  getGcomDashboard = (formData: { gcomDashboard: string }) => {
    let dashboardId;
    const match = /(^\d+$)|dashboards\/(\d+)/.exec(formData.gcomDashboard);
    if (match && match[1]) {
      dashboardId = match[1];
    } else if (match && match[2]) {
      dashboardId = match[2];
    }

    if (dashboardId) {
      this.props.fetchGcomDashboard(dashboardId);
    }
  };

  renderImportForm() {
    const styles = importStyles();

    return (
      <>
        {/* <div className={styles.option}>
          <DashboardFileUpload onFileUpload={this.onFileUpload} />
        </div> */}
        {/* <div className={styles.option}>
          <Legend>Import via grafana.com</Legend>
          <Form onSubmit={this.getGcomDashboard} defaultValues={{ gcomDashboard: '' }}>
            {({ register, errors }) => (
              <Field invalid={!!errors.gcomDashboard} error={errors.gcomDashboard && errors.gcomDashboard.message}>
                <Input
                  name="gcomDashboard"
                  placeholder="Grafana.com dashboard url or id"
                  type="text"
                  ref={register({
                    required: 'A Grafana dashboard url or id is required',
                    validate: validateGcomDashboard,
                  })}
                  addonAfter={<Button type="submit">Load</Button>}
                />
              </Field>
            )}
          </Form>
        </div> */}
        <div className={styles.option}>
          {/* <Legend>Import via panel json</Legend> */}
          <Form onSubmit={this.getDashboardFromJson} defaultValues={{ dashboardJson: '' }}>
            {({ register, errors }) => (
              <>
                {/* <Field invalid={!!errors.dashboardJson} error={errors.dashboardJson && errors.dashboardJson.message}>
                  <TextArea
                    name="dashboardJson"
                    ref={register({
                      required: 'Need a dashboard json model',
                      validate: validateDashboardJson,
                    })}
                    rows={10}
                  />
                </Field> */}
                <Button type="submit">Import Dashboards</Button>
              </>
            )}
          </Form>
        </div>
      </>
    );
  }

  render() {
    const { isLoaded, navModel, folder } = this.props;
    return (
      <CustomPage navModel={navModel}>
        <CustomPage.Contents>
          {isLoaded ? <ImportDashboardOverview /> : this.renderImportForm()}
          <ManageDashboards folder={folder}></ManageDashboards>
          {/* {!failedDashboards && failedDashboards.length > 0 && <div>List of failed dashboards</div>} */}
        </CustomPage.Contents>
      </CustomPage>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'import', undefined, true),
  isLoaded: state.importDashboard.isLoaded,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = {
  fetchGcomDashboard,
  importDashboardJson,
};

export const DashboardImportPage = connectWithCleanUp(
  mapStateToProps,
  mapDispatchToProps,
  state => state.importDashboard
)(DashboardImportUnConnected);
export default DashboardImportPage;
DashboardImportPage.displayName = 'DashboardImport';

const importStyles = stylesFactory(() => {
  return {
    option: css`
      margin-bottom: 32px;
    `,
  };
});

// const getRequestOptions = (type: any, extraHeaders: any, body?: any) => {
//   let requestOptions: any = {};
//   requestOptions = {
//     method: type,
//     headers: {
//       ...extraHeaders,
//     },
//   };
//   if (body) {
//     requestOptions[`body`] = body;
//   }
//   return requestOptions;
// };
