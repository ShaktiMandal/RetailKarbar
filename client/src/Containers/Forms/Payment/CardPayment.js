import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from './PaymentFrom.module.css';
import Input from '../../ToolBar/Input/Input';
import Button  from '../../../Containers/ToolBar/Button/button';
import ErrorBox from '../../ToolBar/Error/Error';

const CardForm = (props) =>{

    let ErrorElement =  props.ErrorMsg.length > 0 ?               
    <div className={classes.ErrorDiv}>
       <ErrorBox ErrorMsg={props.ErrorMsg}
       CloseErrorPanel = {props.CloseErrorPanel}
       />      
   </div> : null

    return(
        <Aux>
            <form noValidate className={classes.CashPaymentForm}>
                {ErrorElement}             
                <div className={classes.CashPaymentDiv}>                
                    <div className={classes.inputdiv }>
                        <Input type="number"      
                        id = "cardNumber"                     
                        IsRequired 
                        RequiredLength="100"
                        OnChange={props.OnValueChange}
                        InputValue ={props.CardNumber}
                        />
                        <h5>Card Number</h5>
                    </div>
                    <div className={classes.inputdiv }>
                        <Input type="text"                                
                        id = "cardMemberName"
                        IsRequired                         
                        OnChange={props.OnValueChange}
                        InputValue ={props.CardMemberName}
                        />
                        <h5>Card Member Name</h5>
                    </div>
                    <div className={classes.inputdiv }>
                        <Input type="number"                                
                        id = "cvvNumber"
                        IsRequired 
                        RequiredLength="3"
                        OnChange={props.OnValueChange}
                        InputValue ={props.CVVNumber}
                        />
                        <h5>CVV Number</h5>
                    </div>
                    <div className={classes.inputdiv}>
                        <Input type="date"                                
                        id = "expairyDate"
                        IsRequired                       
                        OnChange={props.OnValueChange}
                        InputValue ={props.ExpairyDate}
                        />
                        <h5>Expiry Date</h5>
                    </div>
                    <div className={classes.PaymentFooter}>  
                    <Button 
                        ButtonStyle ={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            height: 30,
                            color: "white",
                            fontSize: 20,
                            backgroundColor: "lightseagreen",
                            textAlign: "center",
                            userSelect: "none"
                        }}
                        Value="Make Payment" 
                        ButtonType="button"
                        OnClick = {
                            props.OnPayment
                        }
                        ></Button>                        
                    </div>
                </div>
            </form>
        </Aux>
    )
}

export default CardForm;