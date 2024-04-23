import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl, api_token } from "redux/api/RtkDefaultQuery";

export const userLogin = createAsyncThunk(
  "auth/login", 
  async ({username, password}, { rejectWithValue }) => {

    let config = { 
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    }

    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/token`,
        { username, password },
        config
      );

      if (data.status == false){
        return rejectWithValue(data.result);
      }
    
      localStorage.setItem(api_token, data.result.access_token);
      return data;
    } catch (error){
      rejectWithValue(error);
    }
  }
);

const userToken = localStorage.getItem(api_token)
  ? localStorage.getItem(api_token)
  : null

const isAuthenticated = userToken !== null;

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  isAuthenticated,
  error: null,
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem(api_token);
      state.data = null;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userLogin.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
      state.data = null;
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.loading = false;
      state.data = payload;
      state.userInfo = payload;
      state.userToken = payload.access_token;
      state.isAuthenticated = true;
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
      state.status = "error";
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    })
    .addDefaultCase((state, action) => {})
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
