export default function Message(props) {
    return (
        <div className={props.type}>
            <div className={props.msgType}>
                <p className="user">{props.user}</p>
                <p className="message">{props.msg}</p>
                <p className="time">{props.time}</p>
                
            </div>
        </div>
    );
}