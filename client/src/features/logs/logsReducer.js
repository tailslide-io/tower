import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import { fetchFlagById } from '../flags/flagsReducer';

const initialState = [];

export const fetchLogs = createAsyncThunk('/logs', async () => {
  const data = await apiClient.fetchLogs();
  return data;
});

const logsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlagById.fulfilled, (state, action) => {
      const returnedLogs = action.payload.logs;
      if (returnedLogs.length === 0) return state;

      const flagId = returnedLogs[0].flag_id;
      return state.filter((log) => log.flag_id !== flagId).concat(returnedLogs);
    });
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default logsSlice.reducer;
