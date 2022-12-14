/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LoginPayload, User, UserInfo } from '../../types';
import { axiosInstance, STACK_EXCHANGE_URL } from '../../utils';
import { CreateAsyncThunkTypes } from '../store/index';

export const getUserList = createAsyncThunk<
  Array<UserInfo>,
  undefined,
  CreateAsyncThunkTypes
>('user/getUser', async (_, thunkAPI) => {
  try {
    const { page, sortOption, timeStamp, inName } = thunkAPI.getState().user;
    const fromdate = timeStamp.toString().slice(0, 10);
    const todate = Date.now().toString().slice(0, 10);
    const response = await axios.get(
      `${STACK_EXCHANGE_URL}/users?page=${page}&pagesize=72&fromdate=${fromdate}&todate=${todate}&order=desc&sort=${sortOption}&inname=${inName}&site=stackoverflow`
    );
    return response.data.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Too much request!');
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  CreateAsyncThunkTypes
>('user/loginUser', async (payload, thunkAPI) => {
  try {
    const { email, password } = payload;
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    const userInfo = await axiosInstance.get('/v1/user', {
      headers: {
        Authorization: `Bearer ${response.headers.authorization}`,
      },
    });
    return {
      ...userInfo.data.data,
      token: response.headers.authorization,
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      return thunkAPI.rejectWithValue('Check your email and password.');
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk<
  undefined,
  LoginPayload,
  CreateAsyncThunkTypes
>('user/registerUser', async (payload, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/v1/sign-up', payload);
    return;
  } catch (error: any) {
    if (error.response.data.status === 409) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
