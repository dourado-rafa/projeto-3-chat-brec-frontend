
import { chatSocket } from "../../settings";
import Icon from "../Icon";

import "./Message.css"

export default function Message(props) {
    const { setEditId, editing } = props
    const { origin, message} = props
    console.log(message)

    function deleteMessage(e, id) {
        e.preventDefault()
        if (chatSocket.readyState === chatSocket.OPEN) chatSocket.send(JSON.stringify({ type: "delete", id: id }));
    }
    
    return (
        <div className={origin}>
            <div className={`box-${origin} ${(editing) ? 'editing' : ' '}`}>
                <div className="message-header">
                    <p className="user">{message.user.username}</p>
                    {(origin === 'sent') && <div className="message-buttons">
                        <button onClick={(e) => {deleteMessage(e, message.id)}}><Icon name='delete' size={1}/></button>
                        <button onClick={(e) => {setEditId(message.id)}}><Icon name='edit' size={1}/></button>
                    </div>}
                </div>
                <p className="message">{message.content}</p>
                <p className="time">{formatTime(message.date)}</p>
            </div>
        </div>
    );
}

function formatTime(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + date.getHours();
    if (minutes < 10) minutes = "0" + date.getMinutes();
     
    return hours + ":" + minutes;
}