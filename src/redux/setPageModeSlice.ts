import {createSlice} from "@reduxjs/toolkit";

const setPageModeSlice = createSlice({
    name: 'setPageMode',
    initialState: {
        pageMode: 'home'
    },
    reducers: {
        clickSearchBtn: (state) => {
            if (state.pageMode === 'home') {
                state.pageMode = 'search'
            }
        },
        clickHomeBtn: (state) => {
            if (state.pageMode === 'search') {
                state.pageMode = 'home'
            }
        }
    }
})

export const {clickSearchBtn, clickHomeBtn} = setPageModeSlice.actions

export const SPM_Reducer = setPageModeSlice.reducer

export default setPageModeSlice