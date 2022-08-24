import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import {
  objectKeysSnakeToCamel,
  objectsKeysSnakeToCamel,
} from '../../lib/utils';

const initialState = [];

export const fetchFlagsByAppId = createAsyncThunk(
  'flags/fetchAppFlags',
  async (appId) => {
    const data = await apiClient.fetchFlagsByAppId(appId);
    return data;
  }
);

export const fetchFlagById = createAsyncThunk(
  'flags/fetchFlagById',
  async (flagId) => {
    const data = await apiClient.fetchFlagById(flagId);
    return data;
  }
);

export const createFlagByAppId = createAsyncThunk(
  'flags/createFlagByAppId',
  async ({ appId, body, callback }) => {
    const data = await apiClient.createFlag(appId, body);

    if (callback) {
      callback();
    }
    return data;
  }
);

export const updateFlagById = createAsyncThunk(
  'flags/updateFlagById',
  async ({ flagId, body, callback }) => {
    const data = await apiClient.updateFlag(flagId, body);

    if (callback) {
      callback();
    }
    return data;
  }
);

export const deleteFlagById = createAsyncThunk(
  'flags/deleteFlagById',
  async ({ flagId, callback }) => {
    const data = await apiClient.deleteFlag(flagId);

    if (callback) {
      callback();
    }
    return data;
  }
);

export const toggleFlagById = createAsyncThunk(
  'flags/toggleFlagById',
  async ({ flagId, body, callback }) => {
    const data = await apiClient.toggleFlag(flagId, body);

    if (callback) {
      callback();
    }
    return data;
  }
);

export const updateNewestFlags = createAction('flags/updateNewestFlags');

const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlagsByAppId.fulfilled, (state, action) => {
      const flags = objectsKeysSnakeToCamel(action.payload);
      if (flags.length === 0) {
        return state;
      }
      const appId = flags[0].appId;
      return state.filter((flag) => flag.appId !== appId).concat(flags);
    });
    builder.addCase(fetchFlagById.fulfilled, (state, action) => {
      let { logs, ...flagWithoutLogs } = action.payload;
      flagWithoutLogs = objectKeysSnakeToCamel(flagWithoutLogs);
      const exists = state.find((flag) => flag.id === flagWithoutLogs.id);
      if (exists) {
        return state.map((flag) =>
          flag.id === flagWithoutLogs.id ? flagWithoutLogs : flag
        );
      } else {
        return state.concat(flagWithoutLogs);
      }
    });
    builder.addCase(updateFlagById.fulfilled, (state, action) => {
      const updatedFlag = objectKeysSnakeToCamel(action.payload);
      return state.map((flag) => {
        const result = flag.id === updatedFlag.id ? updatedFlag : flag;
        return result;
      });
    });
    builder.addCase(toggleFlagById.fulfilled, (state, action) => {
      const updatedFlag = objectKeysSnakeToCamel(action.payload);
      return state.map((flag) => {
        const result = flag.id === updatedFlag.id ? updatedFlag : flag;
        return result;
      });
    });
    builder.addCase(updateNewestFlags, (state, action) => {
      let appId = action.payload?.subject.match(/apps\.(\d+)\.update/)[1];
      appId = Number(appId);
      const flags = objectsKeysSnakeToCamel(action.payload.data);
      const filteredFlags = state.filter((flag) => flag.appId !== appId);
      return filteredFlags.concat(flags);
    });
    builder.addCase(deleteFlagById.fulfilled, (state, action) => {
      let flagId = action.payload;
      flagId = Number(flagId);
      const filteredFlags = state.filter((flag) => flag.id !== flagId);
      return filteredFlags;
    });
    builder.addCase(createFlagByAppId.fulfilled, (state, action) => {
      const newFlag = objectKeysSnakeToCamel(action.payload);
      return state.concat(newFlag);
    });
  },
});

export default flagsSlice.reducer;
