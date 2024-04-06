import {createSlice} from "@reduxjs/toolkit";

const setStatusOfCategoryBtnSlice = createSlice({
    name: 'setStatusOfCategoryBarSlice',
    initialState: {
        isActive: false
    },
    reducers: {
        toggle: (state) => {
            state.isActive = !state.isActive
        }
    }
})

export const {toggle} = setStatusOfCategoryBtnSlice.actions

export const SSOCB_Reducer = setStatusOfCategoryBtnSlice.reducer

export default setStatusOfCategoryBtnSlice