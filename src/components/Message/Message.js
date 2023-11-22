import { useEffect } from "react";
import { chatSocket, BackendLink, username } from "../../settings";

export default function Message(props) {

    function deleteMessage(e, id, message) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) {
            chatSocket.send(JSON.stringify({ type:"delete", id:id, message: message, username: username }));
        }
    }

    return (
        <div className={props.type}>
            <div className={props.msgType}>
                <p className="user">{props.user}</p>
                <p className="message">{props.msg}</p>
                <p className="time">{props.time}</p>
                <button onClick={(e) => {deleteMessage(e, props.id, props.msg)}}>delete</button>
            </div>
        </div>
    );
}