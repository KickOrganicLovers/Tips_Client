import React from "react";
import styled from "styled-components";

export default class Footer extends React.Component<any, any> {
    render() {
        return <S_footer>This is footer</S_footer>
    }
}

const S_footer = styled.footer`
    height: 20vh;
    background-color: blue`;