import axios from "axios";
import { chatSocket, BackendLink, username } from "../../settings";

import React, { useEffect, useState } from "react";

import Icon from "../Icon"

import "./InputMessage.css"

export default function InputMessage(props) {
    const [ message, setMessage ] = useState('')

    function sendMessage(e) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) {
            chatSocket.send(JSON.stringify({ message: message, username: username }));
            setMessage('')
        }
    }

    return (
        <footer>
            <form className="form-input" onSubmit={sendMessage}>
                <textarea className="autoresize input-message" name="message" placeholder="Menssagem" onChange={(e) => setMessage(e.target.value)} value={message} onKeyUp={(e) => {if (e.key === "Enter") sendMessage(e)}}/>
                <button className="interactive btn-send" type="submit"><Icon name="send" color="white" /></button>
            </form>
        </footer>
    );
}