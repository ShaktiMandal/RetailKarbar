import React from 'react';
import classes from './button.module.css'


const button = (props) =>{

    return (    
        <input 
        title ={props.ToolTip}        
        type={props.ButtonType} 
        value={props.Value}
        src={props.Src}
        onClick = {props.OnClick}
        className={classes.buttonStyle} 
        style={props.ButtonStyle}>{props.children}</input>
)}

export default button;