const uiUrl = 'http://100.64.108.25:4000/';
const catalogSrvUrl = `http://100.64.108.25:5040/api/`;
export const config = {
  LIST_DASHBOARD: catalogSrvUrl + 'listDashboard',
  DELETE_DASHBOARD: uiUrl + 'api/dashboards/deleteDashboard',
  IMPORT_DASHBOARD: uiUrl + 'api/dashboards/db',
};
