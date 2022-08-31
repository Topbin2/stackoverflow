import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from '../../types';
import { STACK_EXCHANGE_URL } from '../../utils';
import { CreateAsyncThunkTypes } from '../store/index';

export const getUser = createAsyncThunk<
  Array<User>,
  undefined,
  CreateAsyncThunkTypes
>('user/getUser', async (_, thunkAPI) => {
  try {
    const { page, sortOption, timeStamp, inName } = thunkAPI.getState().user;
    const response = await axios.get(
      `${STACK_EXCHANGE_URL}/users?page=${page}&pagesize=72&fromdate=${timeStamp}&todate=${Date.now()}&order=desc&sort=${sortOption}&inname=${inName}&site=stackoverflow`
    );
    return response.data.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
