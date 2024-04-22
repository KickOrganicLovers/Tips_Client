import styled from "styled-components";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";

const CreateArticlePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(setPageMode('create_article'))
    })
    return (
        <Wrapper>

        </Wrapper>
    )
}

export default CreateArticlePage

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    background-color: #424242;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }

`