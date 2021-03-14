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
                <img src={props.TransactionImage}  
                style={{
                    width: "30%",
                    height: "60%"
                }}/>
                <h3>{props.Message}</h3>
                <div className = {actionClass}>
                    <div>
                        <h2 
                            onClick = {props.OnReceiptPrint}
                            style={{
                            cursor: "pointer"}}> Receipt Here
                        </h2>
                    </div>

                    <div style={{margin : "auto"}}>
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
                                                    backgroundColor: "transparent",
                                                    textAlign: "center",
                                                    userSelect: "none",
                                                    fontWeight: "bold"
                                                }}></Button>
              
                        }
                    </div>

                </div>  
            </div>
        </Aux>
    )
}

export default SuccessTransaction;