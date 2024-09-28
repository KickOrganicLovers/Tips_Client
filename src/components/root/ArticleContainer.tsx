import styled from "styled-components";
import React from "react";
import {ArticleScheme} from "../../types";

const ArticleContainer: React.FC<ArticleScheme> = (props: ArticleScheme) => {
    return (
        <Wrapper>
            <ImgWrapper><img/></ImgWrapper>
            <SentenceWrapper>{props.title}</SentenceWrapper>
        </Wrapper>
    )
}

export default ArticleContainer

const Wrapper = styled.div`
    ////margin: 20px;
    //width: 15vw;
    //height: 15vw;
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    animation: fadeIn 0.5s ease-in-out;
    height: 0;
    padding-bottom: 100%;
    position: relative;`

const SentenceWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: grey;
    color: white`

const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: #2d2d2d;`