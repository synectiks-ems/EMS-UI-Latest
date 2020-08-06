const uiUrl = 'http://localhost:3000/';
const catalogSrvUrl = `http://localhost:4000/api/`;
export const config = {
  LIST_DASHBOARD: catalogSrvUrl + 'listDashboard',
  DELETE_DASHBOARD: uiUrl + 'api/dashboards/deleteDashboard',
  IMPORT_DASHBOARD: uiUrl + 'api/dashboards/db',
};
