import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import Button  from '../../ToolBar/Button/button';
import classes from './PaymentFrom.module.css';

const SuccessTransaction = (props) =>{
       
    return(
        <Aux>
            <div className={classes.TransactionDiv}>
                <img src={props.TransactionImage}  
                style={{
                    width: "60%",
                    height: "60%"
                }}/>
                <h3>{props.Message}</h3>
                <h2 
                            onClick = {props.OnReceiptPrint}
                            style={{textAlign: "right", 
                            paddingRight:"10px", 
                            cursor: "pointer"}}> Receipt Here</h2>
                {
              
                props.IsFromCart === "true" ?
                                
                <Button 
                OnClick = {props.OnPlaceOrder}
                            Value="Place Order" 
                            ButtonType="button"
                            ButtonStyle ={{     
                                width: "30%",                         
                                border: "none",
                                outline: "none",
                                height: 35,
                                color: "white",
                                fontSize: 20,
                                backgroundColor: "lightseagreen",
                                textAlign: "center",
                                userSelect: "none"
                            }}></Button> : 

                            <Button 
                            OnClick = {props.OnReturnHome}
                                        Value="Back To Home" 
                                        ButtonType="button"
                                        ButtonStyle ={{     
                                            width: "70%",                         
                                            border: "none",
                                            outline: "none",
                                            height: 35,
                                            color: "white",
                                            fontSize: 20,
                                            backgroundColor: "lightseagreen",
                                            textAlign: "center",
                                            userSelect: "none"
                                        }}></Button>
                
               }
                           
            </div>
        </Aux>
    )
}

export default SuccessTransaction;