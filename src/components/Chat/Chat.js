import axios from "axios";
import { chatSocket, username } from "../../settings";

import Message from '../Message/Message';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import "./Chat.css"

export default function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState(true);

    function formatTime(timeStamp) {
        var date = new Date(timeStamp * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return hours + ":" + minutes;
    }

    function MessageRender(messages) {
        messages.map((message) => {
            var time = formatTime(message.date);
            var msg = message.message;
            var user = message.username;
            // return
        })
    }
{/* <><Message type='' user={user} msg={msg} time={time} /></> */}

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            messages.push(data);
            setMessages(messages);
        };
    }, []);

    return (
        <div class="chat__item__container" id="id_chat_item_container" style={{ fontSize: 20 }}>

        </div>
    );
}

