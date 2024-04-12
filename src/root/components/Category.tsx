import React from "react";
import styled from "styled-components";

const Category: React.FC = () => {
    return (<Wrapper>
        <S_div>カテゴリーで探す</S_div>
    </Wrapper>)
}

const Wrapper = styled.div`
    height: 40px;
    width: 100%;
    background-color: #2d2d2d;
    box-sizing: border-box;
    border-bottom: white;
    position: relative;
    border-bottom: solid white 2px`

const S_div = styled.div`
    position: absolute;
    top: 8px;
    left: 10px;
    font-size: 15px;
    color: white;
    white-space: nowrap;`

export default Category