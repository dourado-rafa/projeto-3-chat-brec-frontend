import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

import Header from "../components/Header/Header"
import Chat from "../components/Chat/Chat"
import InputMessage from "../components/InputMessage/InputMessage"

import "./pages.css"

export default function Index(props) {
    const navigate = useNavigate()

    useEffect(() => {
        let haveToken = localStorage.getItem('token') === 'true'
        if (!haveToken) {
            console.log('Você não está logado!');
            navigate('/');
        }
    }, [])
    
    return (<div className="view">
        <Header />
        <Chat />
        <InputMessage />
    </div>);
}