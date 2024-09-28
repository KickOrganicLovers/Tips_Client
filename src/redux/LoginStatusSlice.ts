import {createSlice} from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: {
        isLoggedIn: false,
        errorMessage: '',
        userStatus: {
            userNumber: 0,
            username: '',
            profileImg: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/notLoggedIn-profile.jpeg',
            introduction: ''
        }
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserStatus: (state, action) => {
            state.userStatus = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    }
})

export  const {setIsLoggedIn, setUserStatus, setErrorMessage} = loginStatusSlice.actions

export const LS_Reducer = loginStatusSlice.reducer

export default loginStatusSlice