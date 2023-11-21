import axios from "axios";
import { chatSocket, username } from "../../settings";

import Message from '../Message/Message';
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

import "./Chat.css"

export default function Chat(props) {
    const [messages, setMessages] = useState([]);

    function formatTime(timeStamp) {
        var date = new Date(timeStamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();

        if (hours < 10) {
            hours = "0" + date.getHours();
        }

        if (minutes < 10) {
            minutes = "0" + date.getMinutes();
        }

        return hours + ":" + minutes;
    }

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            messages.push(data);
            // setMessages([...messages]);
            axios.get('http://127.0.0.1:8000/api/msgs/').then((response) => {
                setMessages(response.data)
            }).catch((response) => console.log(404))
        };
    }, [messages])

    function renderMessages() {
        return (messages.map(m => 
            (username === m.username) ? 
            (<Message type='sent' msgType='box-sent' user={m.username} msg={m.content} time={formatTime(m.date)} />) : 
            (<Message type='box-received' user={m.username} msg={m.content} time={formatTime(m.date)} />)))
    }

    function Messages() {
        return <>{renderMessages()}</>
    }

    return (
        <Messages />
    );
}

