import axios from "axios";
import { chatSocket, BackendLink } from "../../settings";

import React, { useEffect, useState } from "react";

import Icon from "../Icon"

import "./InputMessage.css"

export default function InputMessage(props) {
    const [ message, setMessage ] = useState('')
    const [ username, setUsername] = useState('Admin');
    useEffect(() => {
        axios
            .post('http://127.0.0.1:8000/api/get-user/', {"token": sessionStorage.getItem("token")})
            .then((response) => {setUsername(response.data.username)})
            .catch((error) => console.log(404))
    }, [])

    function sendMessage(e) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) {
            chatSocket.send(JSON.stringify({ type:"send", message: message, username: username }));
            setMessage('')
        }
    }

    return (
        <footer>
            <form className="form-input" onSubmit={sendMessage}>
                <textarea className="autoresize input-message" name="message" placeholder="Digite uma mensagem..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyUp={(e) => {if (e.key === "Enter") sendMessage(e)}}/>
                <button className="interactive btn-send" type="submit"><Icon name="send" color="white" /></button>
            </form>
        </footer>
    );
}