import React, {createContext, useCallback, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {toggle} from "../../redux/setStatusOfCategoryBtn";

export const ContextToCategoryBar = createContext(false)

const CategoryBtn: React.FC = () => {

    const SSOCB = useSelector<RootState, RootState['setStatusOfCategoryBtn']>((state) => state.setStatusOfCategoryBtn)
    const dispatch = useDispatch<AppDispatch>()


    const clickEventHandler = useCallback(() => {
        dispatch(toggle())
    }, [dispatch])

    return (
        <S_p isActive={SSOCB.isActive} onClick={clickEventHandler}>category</S_p>
    )
}

export default CategoryBtn

const S_p = styled.p<{isActive: boolean}>`
    margin: 0px;
    color: ${(props) => {return props.isActive ? 'white' : 'darkgrey'}} ;
    font-family: 'Poppins', sans-serif;`