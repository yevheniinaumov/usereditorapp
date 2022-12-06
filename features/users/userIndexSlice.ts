import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface UserIndexState {
    value: number
}

const initialState: UserIndexState = {
    value: 0,
};

export const userIndexSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIndex: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
})

export const {setUserIndex} = userIndexSlice.actions;

export const getUserIndex = (state: RootState) => state.user.value;

export default userIndexSlice.reducer;
