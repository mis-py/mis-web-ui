// loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        startLoading: () => true,
        stopLoading: () => false,
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
