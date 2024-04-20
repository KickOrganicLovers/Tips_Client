import {createSlice} from "@reduxjs/toolkit";
import {LoginScheme} from "../typs";

const loginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: {
        isLoggedIn: false,
        loginStatus: {
            error: undefined,
            username: undefined
        }
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserName: (state, action) => {
            state.loginStatus.username = action.payload
        },
        setErrorMessage: (state, action) => {
            state.loginStatus.error = action.payload
        }
    }
})

export  const {setIsLoggedIn, setUserName, setErrorMessage} = loginStatusSlice.actions

export const LS_Reducer = loginStatusSlice.reducer

export default loginStatusSlice