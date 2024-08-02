import {createSlice} from "@reduxjs/toolkit";

const fadeLayerStatusSlice = createSlice({
    name: 'FadeLayerStatus',
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

export const {toggle, enable, disable} = fadeLayerStatusSlice.actions

export const FLS_Reducer = fadeLayerStatusSlice.reducer

export default fadeLayerStatusSlice