import React from 'react';

export default function Icon(props) {

    const defaultStyle = {
        color: props.color,
        width: 'min-content',
        height: 'min-content',
        textShadow: (props.shadow ? '2px 2px rgba(0, 0, 0, 0.8)' : ''),
        fontSize: `${props.size}rem`,
    }
    const style = {...defaultStyle, ...props.style}

    return (<i className={`material-icons ${props.className}`} style={style} onClick={props.onClick}>{props.name}</i>);
}

Icon.defaultProps = {
    size: '2rem',
    color: '',
    shadow: false,
    className: '',
    style: {},
}