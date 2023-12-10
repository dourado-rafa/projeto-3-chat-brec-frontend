
import { chatSocket } from "../../settings";
import Icon from "../Icon";

import "./Message.css"

export default function Message(props) {
    const { setEditId, editing } = props
    const { origin, message} = props

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
    let weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    let now = new Date(Date.now()+1)
    let date = new Date(timeStamp * 1000);

    let day = date.getDate()
    if (day < 10) day = "0" + day;
    let month = date.getMonth()
    if (month < 10) month = "0" + month;
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    let lastWeek = new Date(now.getTime() - 7*24*60*60*1000)
    console.log(lastWeek)
    
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
        return `Hoje, ${hours}:${minutes}`
    } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && lastWeek.getDate() < date.getDate()) {
        return `${weekDays[date.getDay()]}, ${hours}:${minutes}`
    } else {
        return `${day}/${month}/${date.getFullYear()}, ${hours}:${minutes}`
    }
}