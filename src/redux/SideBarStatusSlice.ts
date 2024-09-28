import {createSlice} from "@reduxjs/toolkit";

const sideBarStatusSlice = createSlice({
    name: 'SideBarStatus',
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

export const {toggle, enable, disable} = sideBarStatusSlice.actions

export const SBS_Reducer = sideBarStatusSlice.reducer

export default sideBarStatusSlice