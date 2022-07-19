import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

const initialState = [];

export const fetchAppsByAppId = createAsyncThunk(
  'flags/fetchAppFlags',
  async (appId) => {
    const data = await apiClient.fetchFlagsByAppId(appId);
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
    builder.addCase(fetchAppsByAppId.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export default flagsSlice.reducer;
