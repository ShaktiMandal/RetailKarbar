import React from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Payment.module.css';
import TransactionImage from '../../Assests/Logo/Successful-transaction.png';
import Button  from '../../Containers/ToolBar/Button/button';
import CashIcon   from '../../Assests/Logo/Cash-icon.png';
import CreditCardIcon from '../../Assests/Logo/credit-cards.png';
import DebitCardIcon  from '../../Assests/Logo/debit-card.png';
import CashFrom from  '../../Containers/Forms/Payment/CashPayment';
import CardFrom from  '../../Containers/Forms/Payment/CardPayment';
import SuccessTransaction from '../../Containers/Forms/Payment/SuccessfulTransaction';
import CloseButton from "../../Containers/ToolBar/FormCloseButton/FormCloseButton";

const PaymentDetails = (props) => {

       
    let totalDebitAmount = 0.00;
    var PaymentType = props.IsPaymentSuccessful ? SuccessTransaction 
        : props.PaymentType === "Cash"
        ? CashFrom : CardFrom; 

    return(
        <Aux>
            <div className={classes.PaymentContainer}>              
                <div className={classes.DuePaymentOrderContainer}>
                    <CloseButton OnCloseClick ={props.OnCloseClick}/> 
                    <div className={classes.OrderHeader}>
                        <div>
                            Order Id
                        </div>
                        <div>
                            Amount
                        </div>
                    </div>
                    <ul>
                        {
                            props.paymentDetails.map( (item, index) => {                             
                                if(item.DueAmount === 0.00 || item.DueAmount === 0)
                                {
                                    return;
                                }
                                   
                                totalDebitAmount = totalDebitAmount + item.DueAmount;                               
                                return(
                                    <li className={classes.DuePaymentOrderList}>
                                        <div>
                                            {item.OrderId} 
                                        </div>
                                        <div>
                                            {item.DueAmount.toFixed(2)}
                                        </div>
                                        {/* <div onClick = {(event) => {props.OnDueOrderDetails(event,index)}}>
                                            <img src={OrderImg}  className={classes.OrderIcon}/>
                                        </div> */}
                                    </li>
                                )
                            })
                            }
                    </ul>
                </div>
                <div className={classes.PaymentArea}>     
                    <div className={classes.PayAmount}>
                        <h2>Pay :  {totalDebitAmount === 0 ? "0.00" : totalDebitAmount.toFixed(2)}</h2>
                    </div> 
                    <div className={classes.PaymentDetails}>
                        <PaymentType
                        TransactionImage={TransactionImage}
                        OnValueChange ={ props.OnPaymentValueChange}
                        GivenCash ={props.GivenAmount}
                        ChangeAmount ={props.ChangeAmount}
                        CardNumber = {props.paymentDetails.CardNumber}
                        CardMemberName = {props.paymentDetails.CardMemberName} 
                        CVVNumber = {props.paymentDetails.CVVNumber} 
                        ExpairyDate = {props.paymentDetails.ExpairyDate}
                        OnPayment ={ props.OnPayment}
                        OnReturnHome = {props.OnReturnHome}
                        Caption = "Main Menu"
                        Message = "Transaction Successful"
                        ButtonType = "button"
                        ErrorMsg = {props.ErrorMsg}
                        CloseErrorPanel = {props.CloseErrorPanel}
                        />                              
                    </div>  
                    <div className={classes.PaymentType}>
                        <Button
                        OnClick = {props.OnCashPayment}
                        ButtonType="image"
                        Src={CashIcon}
                        ButtonStyle ={{
                            width: "40px",
                            borderRadius: "50%",
                            outline: "none",
                            height: "40px",               
                            userSelect: "none",
                            color: "white",
                            backgroundColor: "white",
                            ToolTip: "Cash Payment"
                        }}
                        ></Button>
                            <Button
                        OnClick = {props.OnCreditPayment}
                        ButtonType="image"
                        Src={CreditCardIcon}
                        ButtonStyle ={{
                            width: "40px",
                            borderRadius: "50%",
                            outline: "none",
                            height: "40px",               
                            userSelect: "none",
                            color: "white",
                            backgroundColor: "white"
                        }}
                        ></Button>
                        <Button
                        OnClick = {props.OnDebitPayment}
                        ButtonType="image"
                        Src={DebitCardIcon}
                        ButtonStyle ={{
                            width: "40px",
                            borderRadius: "50%",
                            outline: "none",
                            height: "40px",               
                            userSelect: "none",
                            color: "white",
                            backgroundColor: "white"
                        }}
                        ></Button>                           
                        </div>                      
                </div>
            </div>
        </Aux>
    )
}

export default PaymentDetails;