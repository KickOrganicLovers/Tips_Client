import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
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

