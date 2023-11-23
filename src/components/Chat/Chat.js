import axios from "axios";
import { BackendLink, chatSocket, username } from "../../settings";

import Message from '../Message/Message';
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

import "./Chat.css"

export default function Chat(props) {
    const { editId, setEditId } = props
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            axios.get(`${BackendLink}/api/msgs/`).then((response) => {
                setMessages(response.data)
            }).catch((response) => console.log(404))
            setEditId(0)
        };

        axios.get(`${BackendLink}/api/msgs/`).then((response) => {
        setMessages(response.data)
        }).catch((response) => console.log(404))
    }, [])

    return (
        <section>
            {messages.map((msg) => { 
                let origin = (username === msg.username) ? 'sent' : 'received'
                return <Message key={`msg__${msg.id}`} setEditId={setEditId} origin={origin} message={msg} editing={editId === msg.id} />
            })}
        </section>
    );
}

