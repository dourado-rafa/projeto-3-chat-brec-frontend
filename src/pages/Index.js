import React from "react";

import Header from "../components/Header/Header"
import Chat from "../components/Chat/Chat"
import InputMessage from "../components/InputMessage/InputMessage"

import "./pages.css"

export default function Index(props) {

    return (<div className="view">
        <Header />
        <Chat />
        <InputMessage />
    </div>);
}