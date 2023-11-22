import axios from "axios";
import { chatSocket, username } from "../../settings";

import Message from '../Message/Message';
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

import "./Chat.css"

export default function Chat(props) {
    const [messages, setMessages] = useState([]);

    function formatTime(timeStamp) {
        let date = new Date(timeStamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) hours = "0" + date.getHours();
        if (minutes < 10) minutes = "0" + date.getMinutes();
        
        return hours + ":" + minutes;
    }

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            axios.get('http://127.0.0.1:8000/api/msgs/').then((response) => {
                setMessages(response.data)
            }).catch((response) => console.log(404))
        };

        axios.get('http://127.0.0.1:8000/api/msgs/').then((response) => {
        setMessages(response.data)
        }).catch((response) => console.log(404))
    }, [])

    return (
        <section>
            {messages.map((msg) => { 
                let origin = (username === msg.username) ? 'sent' : 'received'
                return <Message origin={origin} key={`msg__${msg.id}`} id={msg.id} user={msg.username} msg={msg.content} time={formatTime(msg.date)} />
            })}
        </section>
    );
}

