import React from "react";
import styled from "styled-components";

const Category: React.FC = () => {
    return (<Wrapper>
        カテゴリーで探す
    </Wrapper>)
}

const Wrapper = styled.div`
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    font-size: 1.5vh;
    padding-left: 1vw;
    color: white;
    background-color: #2d2d2d;
    border-bottom: white;
    border-bottom: solid white 2px;
    white-space: nowrap`


export default Category