import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import {
  objectKeysSnakeToCamel,
  objectsKeysSnakeToCamel,
} from '../../lib/utils';

const initialState = [];

export const fetchApps = createAsyncThunk('apps/fetchApps', async () => {
  const data = await apiClient.fetchApps();
  return data;
});

export const fetchAppById = createAsyncThunk('apps/fetchApp', async (appId) => {
  const data = await apiClient.fetchAppById(appId);
  return data;
});

export const createApp = createAsyncThunk(
  '/apps/createApp',
  async ({ body, callback }) => {
    const data = await apiClient.createApp(body);
    if (callback) {
      callback();
    }
    return data;
  }
);

export const deleteApp = createAsyncThunk('apps/deleteApp', async (appId) => {
  const data = await apiClient.deleteApp(appId);
  return data;
});

export const updateApp = createAsyncThunk(
  'apps/updateApp',
  async ({ appId, body, callback }) => {
    const data = await apiClient.updateApp(appId, body);
    if (callback) {
      callback();
    }
    return data;
  }
);

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApps.fulfilled, (state, action) => {
      return objectsKeysSnakeToCamel(action.payload);
    });
    builder.addCase(fetchAppById.fulfilled, (state, action) => {
      const fetchedApp = objectKeysSnakeToCamel(action.payload);
      const exists = state.find((app) => app.id === fetchedApp.id);
      if (exists) {
        return state.map((app) =>
          app.id === fetchedApp.id ? fetchedApp : app
        );
      } else {
        return state.concat(fetchedApp);
      }
    });
    builder.addCase(createApp.fulfilled, (state, action) => {
      return state.concat(objectKeysSnakeToCamel(action.payload));
    });
    builder.addCase(deleteApp.fulfilled, (state, action) => {
      const appId = action.payload.id;
      return state.filter((app) => app.id !== appId);
    });

    builder.addCase(updateApp.fulfilled, (state, action) => {
      const updatedApp = objectKeysSnakeToCamel(action.payload);
      const appId = updatedApp.id;
      return state.map((app) => (app.id === appId ? updatedApp : app));
    });
  },
});

export default appSlice.reducer;
