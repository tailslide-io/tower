import { createSlice } from '@reduxjs/toolkit';
import { fetchFlagById } from '../flags/flagsReducer';

const initialState = [];

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
  },
});

export default logsSlice.reducer;
