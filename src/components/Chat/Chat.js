import axios from "axios";
import { BackendLink, chatSocket } from "../../settings";

import Message from '../Message/Message';
import React, { useEffect, useState } from "react";

import "./Chat.css"

export default function Chat(props) {
    const { editId, setEditId } = props
    const [messages, setMessages] = useState([]);
    const [ username, setUsername] = useState('');

    useEffect(() => {
        axios
            .post(`${BackendLink}/api/get-user/`, {"token": sessionStorage.getItem("token")})
            .then((response) => {setUsername(response.data.username)})
            .catch(() => console.log(404))
    }, [])

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            axios.get(`${BackendLink}/api/msgs/`).then((response) => {
                setMessages(response.data)
            }).catch(() => console.log(404))
            setEditId(0)
        };

        axios.get(`${BackendLink}/api/msgs/`).then((response) => {
        setMessages(response.data)
        }).catch(() => console.log(404))
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

