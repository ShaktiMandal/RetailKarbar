import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import Button  from '../../ToolBar/Button/button';
import classes from './PaymentFrom.module.css';

const SuccessTransaction = (props) =>{
    
    let actionClass = [classes.ActionBar];
    if(props.IsTransactionSuccessful === false 
        || props.IsTransactionSuccessful === undefined)
    {
        actionClass = [classes.NoActionBar];
    }
    return(
        <Aux>
            <div className={classes.TransactionDiv}>
                <img src={props.TransactionImage}  className={classes.TransactionImg}/>
                <h3>{props.Message}</h3>
                <div className = {actionClass}>  
                    {              
                        props.IsFromCart === "true" ?
                        <Button 
                        OnClick = {props.OnPlaceOrder}
                                    Value="Place Order" 
                                    ButtonType="button"
                                    ButtonStyle ={{   
                                        margin : "auto",   
                                        border: "none",
                                        outline: "none",
                                        height: "35px",                                       
                                        fontSize: "20px",
                                        backgroundColor: "transparent",
                                        textAlign: "center",
                                        userSelect: "none",
                                        fontWeight: "bold"
                                        
                                    }}></Button> : 
                                    props.IsTransactionSuccessful === true ?

                                    <Button 
                                    OnClick = {props.OnReturnHome}
                                                Value="Back To Home" 
                                                ButtonType="button"
                                                ButtonStyle ={{     
                                                    
                                                    margin : "auto",   
                                                    border: "none",
                                                    outline: "none",
                                                    height: "35px",                                                   
                                                    fontSize: "20px",
                                                    backgroundColor: "forestgreen",
                                                    textAlign: "center",
                                                    userSelect: "none",
                                                    fontWeight: "bold",
                                                    width: "100%",
                                                    padding: "5px",
                                                    color: "white"
                                                }}></Button> : null
              
                        }

                </div>  
            </div>
        </Aux>
    )
}

export default SuccessTransaction;