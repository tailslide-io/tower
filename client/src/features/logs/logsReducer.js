import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const logsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default logsSlice.reducer;
