import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";


const pageModeSlice = createSlice({
    name: 'PageMode',
    initialState: {
        pageMode: 'home'
    },
    reducers: {
        setPageMode: (state, action) => {
            if(state.pageMode !== action.payload)
                state.pageMode = action.payload
        }
    }
})

export const {setPageMode} = pageModeSlice.actions

export const PM_Reducer = pageModeSlice.reducer

export default pageModeSlice