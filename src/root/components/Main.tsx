import React from "react";
import styled from "styled-components";
import ArticleWrapper from "./ArticleWrapper";
import CategoryBar from "./CategoryBar";

export default class Main extends React.Component<any, any> {
    render() {
        return <Wrapper>
            <ArticleWrapper/>
            <CategoryBar/>
        </Wrapper>;
    }
}
const Wrapper = styled.div`
    width: 100vw;
    height: 92vh;
    justify-content: space-between;
    display: flex;
    flex-direction: row;`