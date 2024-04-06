import styled from "styled-components";
import React from "react";

const ArticleContainer: React.FC = () => {





    return (
        <Wrapper>
            <ImgWrapper></ImgWrapper>
            <SentenceWrapper></SentenceWrapper>
        </Wrapper>
    )
}

export default ArticleContainer

const Wrapper = styled.div`
    ////margin: 20px;
    //width: 15vw;
    //height: 15vw;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background-color: yellow`

const SentenceWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: white;`

const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: maroon;`