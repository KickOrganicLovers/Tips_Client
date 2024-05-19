import React from "react";
import styled from "styled-components";
import ArticlePage from "./root/ArticlePage";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import CategoryBar from "./sidebar/CategoryBar";
import {Route, Routes} from "react-router-dom";
import SearchPage from "./search/SearchPage";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";
import CreateArticlePage from "./create_article/CreateArticlePage";
import UserProfilePage from "./user_profile/UserProfilePage";

const Main: React.FC = () => {
    const SBS = useSelector<RootState, RootState['SideBarStatus']>((state) => {
        return state.SideBarStatus
    })

    return (
        <Wrapper>
            <FadeLayer isActive={SBS.isActive}/>
            <Routes>
                <Route path={'/'} element={<ArticlePage/>}/>
                <Route path={'/search'} element={<SearchPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/signup'} element={<SignupPage/>}/>
                <Route path={'/create_article'} element={<CreateArticlePage/>}/>
                <Route path={'/user_profile'} element={<UserProfilePage/>}/>
            </Routes>
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
    @media screen and (max-width: 1024px) {
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