import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";

const SearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(setPageMode('search'))
    })
    return (<Wrapper>

    </Wrapper>)
}

export default SearchPage

const Wrapper = styled.div``

const S_img = styled.img``

const S_h1 = styled.h1``

const S_div = styled.div``

const S_input_text = styled.input``