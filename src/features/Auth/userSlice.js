import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

//tạo async action
export const register = createAsyncThunk('user/register', async (payload) => {
    // call api to register
    const data = await userApi.register(payload);

    //save data local storage
    localStorage.setItem('access_token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));

    //return user data
    return data.user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        settings: {},
    },
    reducers: {},
    extraReducers: {
        //tự định nghĩa action type (<=> 'user/register/fullfilled')
        [register.fulfilled]: (state, action) => {
            state.current = action.payload; //action.payload = return data.user ở trên
        },
    },
});

const { reducer } = userSlice;

export default reducer; //default export
