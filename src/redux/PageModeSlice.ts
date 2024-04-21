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
        },
        setSignupMode: (state) => {
            if(state.pageMode != 'signup'){
                state.pageMode = 'signup'
            }
        },
        setCreateArticleMode: (state) => {
            if(state.pageMode != 'createArticle'){
                state.pageMode = 'createArticle'
            }
        }
    }
})

export const {setSearchMode, setHomeMode, setLoginMode, setSignupMode, setCreateArticleMode} = pageModeSlice.actions

export const PM_Reducer = pageModeSlice.reducer

export default pageModeSlice