import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

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

// get all Flags for a specific Application -> router.get('/apps/:appId/flags', flagControllers.getFlags);
// get a specific Flag by FlagId -> router.get('/flags/:flagId', flagControllers.getFlag);
// add a Flag for a specific Application -> router.post('/apps/:appId/flags')
// edit a specific Flag by FlagId -> router.patch('/flags/:flagId')
// delete a specific Flag by FlagId -> router.delete('/flags/:flagId')

const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlagsByAppId.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchFlagById.fulfilled, (state, action) => {
      const { logs, ...flagWithoutLogs } = action.payload;
      const exists = state.find((flag) => flag.id === flagWithoutLogs.id);
      if (exists) {
        return state.map((flag) =>
          flag.id === flagWithoutLogs.id ? flagWithoutLogs : flag
        );
      } else {
        return state.concat(flagWithoutLogs);
      }
    });
  },
});

export default flagsSlice.reducer;
