import { useEffect } from "react";
import { chatSocket, BackendLink } from "../../settings";
import Icon from "../Icon";

import "./Message.css"

export default function Message(props) {

    function deleteMessage(e, id) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) chatSocket.send(JSON.stringify({ type: "delete", id: id }));
    }
    function editMessage(e, id) {
        e.preventDefault()
    }

    return (
        <div className={props.origin}>
            <div className={`box-${props.origin}`}>
                <div className="message-header">
                    <p className="user">{props.user}</p>
                    <div className="message-buttons">
                        <button onClick={(e) => {deleteMessage(e, props.id)}}><Icon name='delete' size={1}/></button>
                        <button onClick={(e) => {editMessage(e, props.id)}}><Icon name='edit' size={1}/></button>
                    </div>
                </div>
                <p className="message">{props.msg}</p>
                <p className="time">{props.time}</p>
            </div>
        </div>
    );
}