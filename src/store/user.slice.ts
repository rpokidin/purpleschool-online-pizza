import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import type { Profile, LoginResponse } from "../interfaces/user.interface";
import type { RootState } from "./store";

export const JWT_PERSISTENT_STATE = 'userData';

interface UserState {
  jwt: string | null;
  loginState: null | 'rejected' | 'registered';
  profile?: Profile | null;
}

const initialState: UserState = {
  jwt: loadState<{ jwt: string | null }>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  loginState: null,
  profile: null
};

export const login = createAsyncThunk<LoginResponse, { email: string; password: string }>(
  'user/login',
  async ({ email, password }) => {
    const response = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, { email, password });
    return response.data;
  }
);

export const register = createAsyncThunk<LoginResponse, { email: string; password: string; name: string }>(
  'user/register',
  async ({ email, password, name }) => {
    const response = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, { email, password, name });
    return response.data;
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  'user/getProfile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const response = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = state.loginState = state.profile = null;
    }
  },
  extraReducers: (builder) => builder
    .addCase(login.fulfilled, (state, { payload }) => {
      state.jwt = payload.access_token;
      state.loginState = null;
    })
    .addCase(login.rejected, (state) => {
      state.loginState = 'rejected';
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.jwt = payload.access_token;
      state.loginState = 'registered';
    })
    .addCase(register.rejected, (state) => {
      state.loginState = 'rejected';
    })
    .addCase(getProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
    })
    .addCase(getProfile.rejected, (_, { payload }) => {
      console.error('Failed to load profile:', payload);
    })
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
