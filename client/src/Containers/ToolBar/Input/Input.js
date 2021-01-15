import React from 'react';
import classes from './Input.module.css'


const Input = (props) =>{
    
    return (
        <input type={props.type} 
        list= {props.listName}
        autoComplete = "off"
        style = {props.CustomizeStyle}
        placeholder={props.placeholder} 
        required={props.IsRequired}   
        maxLength={props.RequiredLength}
        minLength ={props.MinLength}
        pattern={props.InputPattern}
        onChange ={props.OnChange} 
        onKeyDown = {props.OnKeyPress}  
        value= {props.InputValue}   
        id = {props.id}  
        className={classes.InputStyle}
        />
    )
}

export default Input;