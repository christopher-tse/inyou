import React from 'react';

const Button = (props) => {
    return (
        <button className={`btn ${props.btntype}`} onClick={props.onclick}>{props.text}</button>
    )
}

export default Button