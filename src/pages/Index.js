import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import Header from "../components/Header/Header"
import Chat from "../components/Chat/Chat"
import InputMessage from "../components/InputMessage/InputMessage"

import "./pages.css"

export default function Index(props) {
    const navigate = useNavigate()
    const [editId, setEditId] = useState(0)

    useEffect(() => {
        let token = sessionStorage.getItem('token')
        if (token === 'false' || token === null)  navigate('/');
    }, [])
    
    return (<div className="view">
        <Header />
        <Chat setEditId={setEditId} editId={editId}/>
        <InputMessage editId={editId} />
    </div>);
}