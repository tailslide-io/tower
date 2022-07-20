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
  getAppById: '',
  updateApp: '',

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
      console.log(data);

      return data.payload;
    } catch (e) {}
  },
};

export default apiClient;
