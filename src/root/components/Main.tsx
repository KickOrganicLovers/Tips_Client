import React from "react";
import styled from "styled-components";
import ArticleWrapper from "./ArticleWrapper";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import CategoryBar from "./CategoryBar";
import {Fa0} from "react-icons/fa6";

const Main: React.FC = () => {
    const SSOCB = useSelector<RootState, RootState['setStatusOfCategoryBtn']>((state) => {
        return state.setStatusOfCategoryBtn
    })
    const SPM = useSelector<RootState, RootState['setPageMode']>((state) => {
        return state.setPageMode
    })

    return (
        <Wrapper>
            <FadeLayer isActive={SSOCB.isActive}/>
            {(() => {
                console.log(SPM.pageMode)
                return SPM.pageMode === 'home' ? <ArticleWrapper/> : <h1>this is test</h1>
            })()}
            <CategoryBar/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 92vh;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`

const FadeLayer = styled.div<{ isActive: boolean }>`
    display: none;
    @media screen and (max-width: 1024px){
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.2;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 25;
        display: ${(props) => {
    return props.isActive ? 'inline-block' : 'none'
}};`

export default Main