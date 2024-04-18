import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";


const pageModeSlice = createSlice({
    name: 'PageMode',
    initialState: {
        pageMode: 'home'
    },
    reducers: {
        setSearchMode: (state) => {
            if (state.pageMode !== 'search') {
                state.pageMode = 'search'
            }
        },
        setHomeMode: (state) => {
            if (state.pageMode !== 'home') {
                state.pageMode = 'home'
            }
        },
        setLoginMode: (state) => {
            if(state.pageMode !== 'login') {
                state.pageMode = 'login'
            }
        }
    }
})

export const {setSearchMode, setHomeMode, setLoginMode} = pageModeSlice.actions

export const PM_Reducer = pageModeSlice.reducer

export default pageModeSlice