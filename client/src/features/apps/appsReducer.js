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

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApps.fulfilled, (state, action) => {
      console.log(action);
      return action.payload;
    });
    builder.addCase(createApp.fulfilled, (state, action) => {
      console.log(action);
      return state.concat(action.payload);
    });
    builder.addCase(deleteApp.fulfilled, (state, action) => {
      const appId = action.payload.id;
      return state.filter((app) => app.id !== appId);
    });
  },
});

export default appSlice.reducer;
