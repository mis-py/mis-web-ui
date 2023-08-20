import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

import { baseUrl } from "config/variables";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth", 
  async (params) => {
    let config = { 
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
    }

    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/token`,
        { username: params.username, password: params.password },
        config
      );
      
      localStorage.setItem('token', data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);

      return data;
    } catch (error){
      console.error(error);
    }
  }
);

const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
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
      localStorage.removeItem('token');
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
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
    .addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
      state.data = null;
    })
    .addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.loading = false;
      state.data = payload;
      state.userInfo = payload;
      state.userToken = payload.access_token;
      state.isAuthenticated = true;
    })
    .addCase(fetchAuth.rejected, (state, { payload }) => {
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
