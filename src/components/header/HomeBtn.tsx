import React, {useCallback} from "react";
import {AiOutlineHome} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {clickHomeBtn} from "../../redux/setPageModeSlice";
import {useNavigate} from "react-router-dom";

const HomeBtn: React.FC = () => {

    const navigate = useNavigate()

    const SPM = useSelector<RootState, RootState['setPageMode']>((state) => {
        return state.setPageMode
    })
    const dispatch = useDispatch<AppDispatch>()

    const clickEventHandler = () => {
        navigate('/')
        togglePageMode()
    }

    const togglePageMode = useCallback(() => {
        dispatch(clickHomeBtn())
    }, [dispatch])

    return (
        <S_AiOutlineHome pageMode={SPM.pageMode} onClick={clickEventHandler}/>
    )
}

export default HomeBtn

const S_AiOutlineHome = styled(AiOutlineHome)<{ pageMode: string }>`
    font-size: 25px;
    color: ${(props) => {
        return props.pageMode === 'home' ? 'white' : 'darkgrey'
    }}`