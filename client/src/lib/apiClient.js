import axios from 'axios'; // tbd - install axios
import * as routes from '../constants/apiRoutes';

const apiClient = {
  async createApp(appName) {
    try {
      const { data } = await axios.post(routes.createAppsUrl(), appName);
      return data.payload;
    } catch (e) {}
  },
  async fetchApps() {
    try {
      const { data } = await axios.get(routes.fetchAppsUrl());
      return data.payload;
    } catch (e) {}
  },
  async fetchAppById(appId) {
    try {
      const { data } = await axios.get(routes.fetchAppByIdUrl(appId));
      return data.payload;
    } catch (e) {}
  },
  async deleteApp(appId) {
    try {
      const { data } = await axios.delete(routes.deleteAppUrl(appId));
      return data.payload;
    } catch (e) {}
  },
  // getAppById: '',
  async updateApp(appId, body) {
    try {
      const { data } = await axios.patch(routes.patchAppUrl(appId), body);
      return data.payload;
    } catch (e) {}
  },

  // flags
  async fetchFlagsByAppId(appId) {
    try {
      const { data } = await axios.get(routes.fetchFlagsByAppIdUrl(appId));
      return data.payload;
    } catch (e) {}
  },

  async fetchFlagById(flagId) {
    try {
      const { data } = await axios.get(routes.fetchFlagUrl(flagId));

      return data.payload;
    } catch (e) {}
  },

  async updateFlag(flagId, body) {
    try {
      const { data } = await axios.patch(routes.updateFlagUrl(flagId), body);
      return data.payload;
    } catch (e) {}
  },

  async toggleFlag(flagId, body) {
    try {
      const { data } = await axios.patch(routes.toggleFlagUrl(flagId), body);
      return data.payload;
    } catch (e) {}
  },

  async createFlag(appId, body) {
    try {
      const { data } = await axios.post(routes.createFlagUrl(appId), body);
      return data.payload;
    } catch (e) {}
  },

  async deleteFlag(flagId) {
    try {
      const { data } = await axios.delete(routes.deleteFlagUrl(flagId));
      return data.payload;
    } catch (e) {}
  },

  // logs
  async fetchLogs() {
    try {
      const { data } = await axios.get(routes.fetchLogsUrl());
      return data.payload;
    } catch (e) {}
  },

  // keys
  async fetchKey() {
    try {
      const { data } = await axios.get(routes.fetchKeysUrl());
      return data.payload.id
    } catch (e) {}
  },

  async createKey() {
    try {
      const { data } = await axios.post(routes.createKeysUrl());
      return data.payload.id
    } catch (e) {}
  },

  // TS data

  // async fetchTimeSeries(flagId, window, bucket) {
  //   try {
  //     const { data } = await axios.get(routes.timeSeriesUrl(flagId, window, bucket))
  //     return data.payload
  //   } catch (e) {}
  // }
  async fetchFlagTimeSeriesData(url, timeRange, timeBucket, abortSignal) {
    const params = { timeRange, timeBucket };

    try {
      const response = await axios.get(url, {
        params,
        signal: abortSignal,
      });
      return response.data.payload;
    } catch (e) {}
  },
};

export default apiClient;
