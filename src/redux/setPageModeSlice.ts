import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";


const setPageModeSlice = createSlice({
    name: 'setPageMode',
    initialState: {
        pageMode: 'home'
    },
    reducers: {
        clickSearchBtn: (state) => {
            if (state.pageMode !== 'search') {
                state.pageMode = 'search'
            }
        },
        clickHomeBtn: (state) => {
            if (state.pageMode !== 'home') {
                state.pageMode = 'home'
            }
        },
        clickLoginBtn: (state) => {
            if(state.pageMode !== 'login') {
                state.pageMode = 'login'
            }
        }
    }
})

export const {clickSearchBtn, clickHomeBtn, clickLoginBtn} = setPageModeSlice.actions

export const SPM_Reducer = setPageModeSlice.reducer

export default setPageModeSlice