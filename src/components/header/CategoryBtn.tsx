import React, {createContext, Dispatch, useCallback, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {toggle as SBS_toggle} from "../../redux/SideBarStatusSlice";
import {toggle as FLS_toggle} from "../../redux/FadeLayerStatusSlice"

import {AiOutlineMenu} from "react-icons/ai";


const CategoryBtn: React.FC = () => {

    const SBS = useSelector<RootState, RootState['SideBarStatus']>((state) => {
        return state.SideBarStatus
    })
    const dispatch = useDispatch<AppDispatch>()


    const clickEventHandler = () => {
        dispatch(FLS_toggle())
        // dispatch(SBS_toggle())
        // dispatch(FLS_toggle())
    }

    return (
        <S_AiOutlineMenu isActive={SBS.isActive} onClick={clickEventHandler}/>
    )
}

export default CategoryBtn


const S_AiOutlineMenu = styled(AiOutlineMenu)<{ isActive: boolean }>`
    width: auto;
    height: 3vh;
    color: ${(props) => {
        return props.isActive ? 'white' : 'darkgrey'
    }};
    font-size: 25px;`