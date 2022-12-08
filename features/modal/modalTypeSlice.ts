import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface ModalTypeState {
    value: string
}

const initialState: ModalTypeState = {
    value: '',
};

export const modalTypeSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalType: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
})

export const {setModalType} = modalTypeSlice.actions;

export const getModalType = (state: RootState) => state.modal.value;

export default modalTypeSlice.reducer;
