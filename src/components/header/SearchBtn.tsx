import React, {useCallback} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {clickHomeBtn, clickSearchBtn} from "../../redux/setPageModeSlice";
import {useNavigate} from "react-router-dom";

const SearchBtn: React.FC = () => {
    const navigate = useNavigate()
    const SPM = useSelector<RootState, RootState['setPageMode']>((state) => {
        return state.setPageMode
    })
    const dispatch = useDispatch<AppDispatch>()

    const clickEventHandler = () => {
        navigate('/search')
        togglePageMode()
    }

    const togglePageMode = useCallback(() => {
        dispatch(clickSearchBtn())
    }, [dispatch])

    return (
        <S_AiOutlineSearch onClick={clickEventHandler} pageMode={SPM.pageMode}/>
    )
}


export default SearchBtn

const S_AiOutlineSearch = styled(AiOutlineSearch)<{ pageMode: string }>`
    font-size: 25px;
    color: ${(props) => {
        return props.pageMode === 'search' ? 'white' : 'darkgrey'
    }}`