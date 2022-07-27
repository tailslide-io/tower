// apps
export const fetchAppsUrl = () => '/api/apps';
export const createAppsUrl = () => '/api/apps';
export const fetchAppByIdUrl = (appId) => `/api/apps/${appId}`;
export const deleteAppUrl = (appId) => `/api/apps/${appId}`;
export const patchAppUrl = (appId) => `/api/apps/${appId}`;

// flags
export const fetchFlagsByAppIdUrl = (appId) => `/api/apps/${appId}/flags`;
export const fetchFlagUrl = (flagId) => `/api/flags/${flagId}`;
export const createFlagUrl = (appId) => `/api/apps/${appId}/flags`;
export const updateFlagUrl = (flagId) => `/api/flags/${flagId}`;
export const toggleFlagUrl = (flagId) => `/api/flags/${flagId}/toggle`;
export const deleteFlagUrl = (flagId) => `/api/flags/${flagId}`;

// logs
export const fetchLogsUrl = () => '/api/logs';

// keys
export const fetchKeysUrl = () => '/api/keys';
export const createKeysUrl = () => '/api/keys';

// timeseries
// export const timeSeriesUrl = (flagId, window, bucket) => `/api/flags/${flagId}/timeseries?timeRange=${window}&bucketSize=${bucket}`
export const fetchFlagTimeSeriesDataUrl = (flagId) => `/api/flags/${flagId}/timeseries`;
