import React from 'react'
import Aux from '../../../HOC/Auxiliary';
import classes from './Messagebox.module.css';
import Button from '../../ToolBar/Button/button';
 
const MessageBox = (props) =>{

    return(
        <Aux>
            <div className={classes.MessageContainer}>
                <div className={classes.TextMessage}>
                    <h3>{props.MessageText}</h3>
                </div>
                <div className={classes.ActionDiv}>
                    <Button 
                        OnClick = {props.OnStop}
                        Value={props.StopActionText}                                                                   
                        ButtonStyle ={{     
                            width: "20%",                         
                            border: "none",
                            outline: "none",
                            height: 35,
                            color: "white",
                            fontSize: 20,
                            backgroundColor: "lightseagreen",
                            textAlign: "center",
                            userSelect: "none",
                            float: "right"
                    }}></Button>
                    <Button 
                        OnClick = {props.OnProceed}
                        Value={props.ContinueActionText}                                                                  
                        ButtonStyle ={{     
                            width: "20%",                         
                            border: "none",
                            outline: "none",
                            height: 35,
                            color: "white",
                            fontSize: 20,
                            backgroundColor: "lightseagreen",
                            textAlign: "center",
                            userSelect: "none",
                            float: "right"
                    }}></Button>
                </div>
            </div>
        </Aux>
    )
}

export default MessageBox;