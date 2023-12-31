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
        axios.post(`${BackendLink}/api/get-user/`, {"token": sessionStorage.getItem("token")}).then((response) => {
            setUsername(response.data.username)
        }).catch(() => console.log(404))
    }, [])

    useEffect(() => {
        axios.get(`${BackendLink}/api/msgs/`).then((response) => {
            setMessages(response.data)
        }).catch(() => console.log(404))
    }, [])

    useEffect(() => {
        chatSocket.onmessage = function (e) {
            let message = JSON.parse(e.data)
            
            if (message.type === 'sendMessage') {
                messages.push(message)
                setMessages([...messages])
            
            } else if (message.type === 'deleteMessage') {
                setMessages(messages.filter((msg) => message.id !== msg.id))

            } else if (message.type === 'updateMessage') {
                for (let i = 0 ; i < messages.length ; i++) {
                    if (messages[i].id === message.id) {
                        messages[i] = message  
                        setMessages([...messages])
                        setEditId(0)
                        break
                    }
                }
            }

            // axios.get(`${BackendLink}/api/msgs/`).then((response) => {
            //     setMessages(response.data)
            // }).catch(() => console.log(404))
        };
    }, [messages])

    return (
        <section className="sec-view">
            {messages.toReversed().map((msg) => {
                let origin = (username === msg.user.username) ? 'sent' : 'received'
                return <Message key={`msg__${msg.id}`} setEditId={setEditId} origin={origin} message={msg} editing={editId === msg.id} />
            })}
        </section>
    );
}

