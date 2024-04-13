import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./Main";
import {Provider} from "react-redux";
import store from "../redux/store";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header/>
                <Main/>
                {/*<Footer/>*/}
            </Provider>
        )
    }
}

