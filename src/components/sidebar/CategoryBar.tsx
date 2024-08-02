import React, {useContext} from "react";
import styled from "styled-components";
import CategoryList from "./CategoryList";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import AccountBanner from "./AccountBanner";
import Category from "./Category";

const CategoryBar: React.FC = () => {
    const SBS = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    return (<Wrapper isActive={SBS.isActive}>
        <AccountBanner/>
        <Category/>
        <S_ul>
            <S_li>
                <CategoryList title={'test'} details={['りんご', 'ごりら', 'らっぱ']}/>
            </S_li>
            <S_li>
                <CategoryList title={'test1'} details={['梶本', '高松', '西村']}/>
            </S_li>
        </S_ul>
    </Wrapper>)
}

export default CategoryBar

const Wrapper = styled.div<{ isActive: boolean }>`
    width: 20%;
    min-width: 200px;
    height: 100%;
    background-color: #2d2d2d;
    box-sizing: border-box;
    @media screen and (max-width: 1024px) {
        min-width: 0px;
        height: 92vh;
        width: ${(props) => {
            return props.isActive ? '40vw' : '0px'
        }};
        transition: width 0.5s;
        position: absolute;
        right: 0px;
        z-index: 50;
        overflow-x: hidden;
        overflow-y: scroll;
    }`

const S_ul = styled.ul`
    padding: 0px;
    margin: 0px`

const S_li = styled.li`

    list-style: none;
    background-color: #2d2d2d`