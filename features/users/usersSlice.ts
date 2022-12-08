import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import axios from 'axios'

export interface UsersState {
    value: object,
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
    value: {},
    status: 'idle',
};

export const dataAsync = createAsyncThunk(
    'users/fetchData',
    async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return response.data.map((v: any) => ({...v, modified: false}));
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<object>) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(dataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(dataAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
})

export const {setUsers} = usersSlice.actions;

export const getUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;