import React, {useCallback} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setHomeMode, setSearchMode} from "../../redux/PageModeSlice";
import {useNavigate} from "react-router-dom";

const SearchBtn: React.FC = () => {
    const navigate = useNavigate()
    const SPM = useSelector<RootState, RootState['PageMode']>((state) => {
        return state.PageMode
    })
    const dispatch = useDispatch<AppDispatch>()

    const clickEventHandler = () => {
        navigate('/search')
        launchDispatch()
    }

    const launchDispatch = useCallback(() => {
        dispatch(setSearchMode())
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