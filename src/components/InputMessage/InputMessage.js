import axios from "axios";
import { chatSocket, BackendLink } from "../../settings";

import React, { useEffect, useState } from "react";

import Icon from "../Icon"

import "./InputMessage.css"

export default function InputMessage(props) {
    const { editId } = props
    const [ message, setMessage ] = useState('')
    const [ username, setUsername] = useState('Admin');

    useEffect(() => {
        axios.post(`${BackendLink}/api/get-user/`, {"token": sessionStorage.getItem("token")}).then((response) => {
            setUsername(response.data.username)
        }).catch((error) => console.log(404))
    }, [])

    useEffect(() => {
        if (editId !== 0) axios.get(`${BackendLink}/api/msg/${editId}`).then((response) => {
            setMessage(response.data.content)
        }).catch(() => console.log(404))
    }, [editId])

    return (
        <footer>
            {(editId !== 0) ? <FormEditMessage message={message} setMessage={setMessage} editId={editId} /> : <FormInputMessage message={message} setMessage={setMessage} username={username} />}
        </footer>
    );
}

function FormInputMessage(props) {
    const  {message, setMessage, username} = props
    
    function sendMessage(e) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) {
            chatSocket.send(JSON.stringify({ type:"send", message: message, username: username }));
            setMessage('')
        }
    }
    return (
        <form className="form-input" onSubmit={sendMessage}>
            <div className="form-container">
                <textarea className="autoresize input-message" name="message" placeholder="Digite uma mensagem..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyUp={(e) => {if (e.key === "Enter") sendMessage(e)}}/>
                <button className="interactive btn-send" type="submit"><Icon name="send" color="white" /></button>
            </div>
        </form>
    )
}

function FormEditMessage(props) {
    const  {editId, message, setMessage} = props
    
    function updateMessage(e) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) {
            chatSocket.send(JSON.stringify({ type:"update", id: editId, message: message }));
            setMessage('')
        }
    }
    return (
        <form className="form-input" onSubmit={updateMessage}>
            <h2 className="edit-alert">Editando mensagem...</h2>
            <div className="form-container">
                <textarea className="autoresize input-message" name="message" placeholder="Digite uma mensagem..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyUp={(e) => {if (e.key === "Enter") updateMessage(e)}}/>
                <button className="interactive btn-send" type="submit"><Icon name="send" color="white" /></button>
            </div>
        </form>
    )

}

