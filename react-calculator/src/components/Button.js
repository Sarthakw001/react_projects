import React from "react";
import './button.css';


const Button = ({value,onClick,className}) =>{
    return(
        <button className={className} onClick={onClick}>
            {value}
        </button>
    )
}

export default Button;

