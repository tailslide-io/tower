import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

const initialState = [];

// createApp => router.post('/apps', appControllers.createApp);
// getApps => router.get('/apps', appControllers.getApps);
// getAppById => router.get('/apps/:appId', appControllers.getApp);
// updateApp => router.patch('/apps/:appId', appControllers.updateApp);
// deleteApp => router.delete('/apps/:appId', appControllers.deleteApp);

export const fetchApps = createAsyncThunk('apps/fetchApps', async () => {
  const data = await apiClient.fetchApps();
  return data;
});

export const fetchAppById = createAsyncThunk('apps/fetchApp', async (appId) => {
  const data = await apiClient.fetchAppById(appId);
  console.log(data, 'in thunk');
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
      console.log(action);
      return action.payload;
    });
    builder.addCase(fetchAppById.fulfilled, (state, action) => {
      console.log(action);
      // if we can find the app in apps, we replace it
      // else we append it
      const fetchedApp = action.payload;
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
      console.log(action);
      return state.concat(action.payload);
    });
    builder.addCase(deleteApp.fulfilled, (state, action) => {
      const appId = action.payload.id;
      return state.filter((app) => app.id !== appId);
    });
    builder.addCase(updateApp.fulfilled, (state, action) => {
      const updatedApp = action.payload;
      const appId = updatedApp.id;
      return state.map((app) => (app.id === appId ? updatedApp : app));
    });
  },
});

export default appSlice.reducer;
