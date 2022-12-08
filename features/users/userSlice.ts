import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface UserState {
    value: number
}

const initialState: UserState = {
    value: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

export const {setUser} = userSlice.actions;

export const getUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
