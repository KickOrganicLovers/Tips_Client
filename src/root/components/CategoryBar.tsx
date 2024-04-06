import React, {useContext} from "react";
import styled from "styled-components";
import Category from "./Category";
import {ContextToCategoryBar} from "./CategoryBtn";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const CategoryBar: React.FC = () => {
    const SSOCB = useSelector<RootState, RootState['setStatusOfCategoryBtn']>((state) => state.setStatusOfCategoryBtn)
    return (<Wrapper isActive={SSOCB.isActive}>
        <S_ul>
            <S_li>
                <Category title={'test'} details={['りんご', 'ごりら', 'らっぱ']}/>
            </S_li>
            <S_li>
                <Category title={'test1'} details={['梶本', '高松', '西村']}/>
            </S_li>
        </S_ul>
    </Wrapper>)
}

export default CategoryBar

const Wrapper = styled.div<{ isActive: boolean }>`
    width: 20%;
    min-width: 200px;
    height: 100%;
    background-color: maroon;
    box-sizing: border-box;
    @media screen and (max-width: 1024px) {
        min-width: 0px;
        width: ${(props) => {console.log(props.isActive) 
            return props.isActive ? '200px' : '0px'}};
        transition: 0.5s;
        overflow: hidden;
    }`

const S_ul = styled.ul`
    padding: 0px;
    margin: 0px`

const S_li = styled.li`

    list-style: none;
    background-color: maroon`
