export default function Message(props) {
    return (
        <div className={props.type}>
            <p>
                {props.user}: {props.msg} às {props.time}
            </p>
        </div>
    );
}