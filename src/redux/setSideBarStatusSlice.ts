import {createSlice} from "@reduxjs/toolkit";

const setSideBarStatusSlice = createSlice({
    name: 'setSideBarStatus',
    initialState: {
        isActive: false
    },
    reducers: {
        toggle: (state) => {
            state.isActive = !state.isActive
        },
        enable: (state) => {
            state.isActive = true
        },
        disable: (state) => {
            state.isActive = false
        }
    }
})

export const {toggle, enable, disable} = setSideBarStatusSlice.actions

export const SSBS_Reducer = setSideBarStatusSlice.reducer

export default setSideBarStatusSlice