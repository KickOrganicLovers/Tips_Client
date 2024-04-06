import React from "react";
import styled from "styled-components";
import ArticleContainer from "./ArticleContainer";

const containers = () => {
    const items = []
    for (let i: number = 0; i <= 11; i++) {
        items.push(<ArticleContainer/>)
    }
    return items
}

const ArticleWrapper: React.FC = () => {
    return <Wrapper>
        {containers()}
    </Wrapper>
}

export default ArticleWrapper

const Wrapper = styled.div`
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 15px;
    width: 80%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: lightgray;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`