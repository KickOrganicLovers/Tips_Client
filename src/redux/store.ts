import {configureStore} from "@reduxjs/toolkit";
import {SSOCB_Reducer} from "./setStatusOfCategoryBtn";

const store = configureStore({
    reducer: {
        setStatusOfCategoryBtn: SSOCB_Reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
