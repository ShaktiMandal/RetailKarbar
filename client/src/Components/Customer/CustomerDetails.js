import React from "react";
import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import Aux from "../../HOC/Auxiliary";
import classes from "./CustomerDetails.module.css";
import Input from '../../Containers/ToolBar/Input/Input';
import Button  from '../../Containers/ToolBar/Button/button';
import AvatarImage from '../../Assests/Logo/Avatar.png';
import CashIcon   from '../../Assests/Logo/Cash-icon.png';
import CreditCardIcon from '../../Assests/Logo/credit-cards.png';
import DebitCardIcon  from '../../Assests/Logo/debit-card.png';
import CashFrom from  '../../Containers/Forms/Payment/CashPayment';
import CardFrom from  '../../Containers/Forms/Payment/CardPayment';
import SuccessTransaction from '../../Containers/Forms/Payment/SuccessfulTransaction';
import TransactionImage from '../../Assests/Logo/Successful-transaction.png';
import CloseButton from "../../Containers/ToolBar/FormCloseButton/FormCloseButton";
import ErrorBox from '../../Containers/ToolBar/Error/Error';
import InformationBox from '../../Containers/ToolBar/Information/Information';
import CheckOut from "./Customers";
import Validator from '../../Validator/Validator';
import Receipt from '../../Containers/ToolBar/PrintForm/Receipt'
import {
            AddYourCustomer,
            AddYourDealer,
            MakeYourPayment, 
            CustomerValidationError, 
            PaymentValidationError, 
            ResetTransactionDetails,
            PrintYourReceipt,
            ClearError
        } from '../../Store/Actions/CustomerDetailsAction';
import {
    ClearOrderList
} from '../../Store/Actions/OrderAction';

import {
    ResetPaymentDetails
} from '../../Store/Actions/PaymentAction';

class CustomerDetails extends Component {

    constructor(props)
    {
        super(props);
        this.fullScreenModel = React.createRef();
    }

    componentWillUnmount()
    {
        debugger;
        this.props.ResetTransactionDetails();       
        this.props.ResetPaymentDetails();
        Validator.ClearErrors();
    }

    OnCustomerValueChange = (event) =>{

        event.preventDefault();
        let customerData = this.props.customerDetails;

        switch(event.target.id)
        {
            case "customerName":
                {
                    customerData.CustomerName = event.target.value;
                    break;
                }
            case "phoneNumber":
                {
                    customerData.PhoneNumber = event.target.value;
                    break;
                }
            default:
                break;
        }

        this.setState({
            CustomerDetails: customerData
        })
    }

    OnDealerValueChange = (event) =>{

        event.preventDefault();
        let dealerData = this.props.dealerDetails;

        switch(event.target.id)
        {
            case "companyName":
                {
                    dealerData.CompanyName = event.target.value;
                    break;
                }
            case "dealerName":
                {
                    dealerData.DealerName = event.target.value;
                    break;
                }
            case "phoneNumber":
                {
                    dealerData.PhoneNumber = event.target.value;
                    break;
                }
            default:
                break;
        }

        this.setState({
            DealerDetails: dealerData
        })
    }

    OnPaymentValueChange = (event) => {

        let paymentDetails = this.props.paymentDetails;

        debugger;
        switch(event.target.id)
        {            
            case "givenCash":
            {
                this.props.paymentDetails.GivenAmount = event.target.value;
                this.props.paymentDetails.ChangeAmount = event.target.value - this.props.totalAmount;
                if(this.props.ChangeAmount !== 0)
                {
                    this.setState({ChangeAmount: this.props.paymentDetails.ChangeAmount});
                }
                
                break; 
            }
            // case "changeAmount":
            // {
            //     paymentDetails.ChangeAmount = event.target.value;
            //     break;
            // }
            case "cardNumber":
            {
                paymentDetails.CardNumber = event.target.value;
                break;
            }
            case "cardMemberName":
            {
                paymentDetails.CardMemberName = event.target.value;
                break;
            }
            case "cvvNumber":
            {
                paymentDetails.CVVNumber = event.target.value;
                break;
            }
            case "expairyDate":
            {
                paymentDetails.ExpairyDate = event.target.value;
                break;
            }
            default:
                break;
        }
    }

    OnCreateCustomer = (event) => {
        debugger;
        event.preventDefault();  
        Validator.ClearErrors();  
        Validator.CustomerValidation(this.props.customerDetails, this.props.customerOrders);
        const error = Validator.GetErrors();
        error.length === 0 ? this.props.AddYourCustomer(this.props.customerDetails) : this.props.CustomerValidationError(error);        
    }

    OnCreateDealer = (event) => {
        debugger;
        event.preventDefault();
        Validator.ClearErrors();  
        Validator.DealerValidation(this.props.dealerDetails, this.props.customerOrders);
        const error = Validator.GetErrors();
        error.length === 0 ? this.props.AddYourDealer(this.props.dealerDetails, this.props.customerOrders) : this.props.CustomerValidationError(error);
    }

    OnCashPayment = (event) =>{
       event.preventDefault();
       this.props.paymentDetails.PaymentType = "Cash"
       this.setState({
             PaymentDetails: this.props.paymentDetails
       })
    }

    OnCreditPayment = (event) =>{        
      event.preventDefault();
      this.props.paymentDetails.PaymentType = "Card"
      this.setState({
            PaymentDetails: this.props.paymentDetails
      })
    }

    OnDebitPayment = (event) => {
        event.preventDefault();
        this.props.paymentDetails.PaymentType = "Card"
        this.setState({
              PaymentDetails: this.props.paymentDetails
        })
    }

    OnPrintRecipt= (event) => {
        debugger;
        event.preventDefault();
        var printElement = document.getElementById("ReceiptId");
        const orderHTML = '<html><head><title></title></head><body>' + printElement + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHTML;
        window.print();
        document.body.innerHTML = oldPage
    }

    OnPrint =() =>{
        document.close();
    }

    OnPayment = (event) =>{
        debugger;
        event.preventDefault();
        Validator.ClearErrors(); 
        let customerDetails;
        if(this.props.selectedNavigationPath === 'OutOfStock')
        {
            customerDetails = {
                CompanyName: this.props.dealerDetails.CompanyName,
                DealerName: this.props.dealerDetails.DealerName,
                PhoneNumber: this.props.dealerDetails.PhoneNumber,
                CustomerId:this.props.dealerDetails.DealerId,
                IsDealer : true
            }
        }
        else
        {
            customerDetails = {
                CustomerName: this.props.customerDetails.CustomerName,
                PhoneNumber: this.props.customerDetails.PhoneNumber,
                CustomerId : this.props.customerDetails.CustomerId,
                DueAmount : this.props.customerOrders.DueAmount,
                IsDealer : false
            }
        };

        Validator.PaymentDetailsValidation(customerDetails, 
                                                        this.props.paymentDetails,
                                                        this.props.customerOrders, 
                                                        this.props.totalAmount);
        const errors = Validator.GetErrors();
        errors.length === 0 ?   this.props.MakeYourPayment(this.props.paymentDetails,
                                                            customerDetails,
                                                            this.props.customerOrders,
                                                            this.props.totalAmount)
                                : this.props.PaymentValidationError(errors);
      
    }

    OnMainMenu = (event) => {
        this.setState({Success: false});
        this.props.ResetTransactionDetails();
        this.props.history.push('/Product/Search');
    }

    OnReturnHome = (event) =>{
        debugger;
        event.preventDefault();
        this.setState({Success: false});
        this.props.ResetTransactionDetails();
        this.props.history.push('/Customer/Customers');
    }

    OnCloseClick = (event) =>{      
        debugger;  
        this.props.history.push('/Product/Search');
    }

    CloseErrorPanel = (event) => {                
        event.preventDefault();
        this.props.ClearError(this.props.informationMessage.length > 0 ? false : true, this.props.customerDetails);
    }

    render()
    {
        var PaymentType = this.props.isPaymentSuccessful ? SuccessTransaction 
                                                         : this.props.paymentDetails.PaymentType === "Cash"
                                                         ? CashFrom : CardFrom;
        var ReceiptElement = this.props.isPaymentSuccessful ? 
        <Receipt 
        id="ReceiptId"       
        ref =  {this.fullScreenModel}
        PaymentDetails = {this.props.paymentDetails} 
        CustomerDetails = {this.props.customerDetails}
        OrderDetails    = {this.props.customerOrders}
        /> : null;
                                                         
        debugger;
        var ErrorElement = this.props.customerError.length > 0 ?  
        <div className={classes.ErrorDiv}>
            <ErrorBox 
            CloseErrorPanel = {this.CloseErrorPanel}
            ErrorMsg={this.props.customerError}/>      
        </div> : this.props.informationMessage.length > 0 ? 
        <div className={classes.ErrorDiv}>
            <InformationBox 
            CloseErrorPanel = {this.CloseErrorPanel}
            InformationMsg={this.props.informationMessage}/>      
        </div> : null;
       
        return (
            <Aux>
                {ReceiptElement}
                <div className={classes.CustomerAndPayment}>
                    <div className={classes.CustomerArea}>   
                        <div className={classes.CloseBtnDiv}>
                            <CloseButton OnCloseClick ={this.OnCloseClick}/>      
                        </div>    
                       { this.props.selectedNavigationPath === 'OutOfStock' ?
                        <div className={classes.DealerDetails}>
                            {ErrorElement} 
                            <div className={classes.inputdiv}>                                   
                                <Input type="text" 
                                id = "companyName"
                                IsRequired                                     
                                OnChange={this.OnDealerValueChange}
                                InputValue ={this.props.dealerDetails.CompanyName}
                                />
                                <h5>Company Name</h5>
                            </div>
                            <div className={classes.inputdiv }>                                   
                                <Input type="text" 
                                id = "dealerName"
                                IsRequired                                     
                                OnChange={this.OnDealerValueChange}
                                InputValue ={this.props.dealerDetails.DealerName}
                                />
                                    <h5>Dealer Name</h5>
                            </div>
                            <div className={classes.inputdiv }>
                                <Input type="number"                                
                                id = 'phoneNumber'
                                IsRequired 
                                RequiredLength=""
                                OnChange={this.OnDealerValueChange}
                                InputValue ={this.props.dealerDetails.PhoneNumber}
                                />
                                <h5>Phone Number</h5>
                            </div>

                            <div className={classes.logInBtn}>
                                <Button 
                                    OnClick = {this.OnCreateDealer}
                                    ButtonStyle ={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    height: 35,
                                    color: "white",
                                    fontSize: 20,
                                    backgroundColor: "lightseagreen",
                                    textAlign: "center",
                                    userSelect: "none"
                                }}
                                Value="Add Dealer"/>
                             </div>
                        </div> :
                                                      
                        <div className={classes.DealerDetails}> 
                            {ErrorElement}                               
                                <div className={classes.inputdiv }>                                   
                                    <Input type="text" 
                                    id = "customerName"
                                    IsRequired                                     
                                    OnChange={this.OnCustomerValueChange}
                                    InputValue ={this.props.customerDetails.CustomerName}
                                    />
                                     <h5>Customer Name</h5>
                                </div>
                                <div className={classes.inputdiv }>
                                    <Input type="number"                                
                                    id = 'phoneNumber'
                                    IsRequired 
                                    RequiredLength=""
                                    OnChange={this.OnCustomerValueChange}
                                    InputValue ={this.props.customerDetails.PhoneNumber}
                                    />
                                    <h5>Phone Number</h5>
                                </div>

                                <div className={classes.logInBtn}>
                                    <Button 
                                     OnClick = {this.OnCreateCustomer}
                                     ButtonStyle ={{
                                         width: "100%",
                                        border: "none",
                                        outline: "none",
                                        height: 35,
                                        color: "white",
                                        fontSize: 20,
                                        backgroundColor: "lightseagreen",
                                        textAlign: "center",
                                        userSelect: "none"
                                    }}
                                    Value="Create Customer"></Button>
                                </div>   
                        </div>  
                        }
                    </div>                   
                    <div className={classes.PaymentArea}>                      
                       <div className={classes.PaymentHeader}>
                        <div>
                          <h2 style={{
                              width: "auto"
                          }}>Pay :  {this.props.totalAmount === 0 ? "0.00" : this.props.totalAmount}</h2>
                        </div> 
                        {
                            this.props.isPaymentSuccessful ?  <div>
                            <h2 
                            onClick={this.OnPrintRecipt}
                            style={{textAlign: "right", 
                            paddingRight:"10px", 
                            cursor: "pointer"}}> Receipt Here</h2>
                            </div> : null
                        }
                       
                       </div>
                       <div className={classes.PaymentDetails}>
                           <PaymentType
                           TransactionImage={TransactionImage}
                           OnValueChange ={ this.OnPaymentValueChange}
                           GivenCash ={this.props.paymentDetails.GivenAmount}
                           ChangeAmount ={this.props.paymentDetails.GivenAmount === "" ? 
                                            "0.00"
                                            : this.props.paymentDetails.ChangeAmount
                                        }
                           CardNumber = {this.props.paymentDetails.CardNumber}
                           CardMemberName = {this.props.paymentDetails.CardMemberName} 
                           CVVNumber = {this.props.paymentDetails.CVVNumber} 
                           ExpairyDate = {this.props.paymentDetails.ExpairyDate}
                           OnPayment ={ this.OnPayment}
                           OnClick = {this.OnMainMenu}
                           OnReturnHome = {this.OnReturnHome}
                           Caption = "Main Menu"
                           Message = "Transaction Successful"
                           ButtonType = "button"
                           ErrorMsg = {this.props.paymentError}
                           CloseErrorPanel = {this.CloseErrorPanel}
                           />                              
                        </div> 
                        <div className={classes.PaymentType}>
                            <Button
                            OnClick = {this.OnCashPayment}
                            ButtonType="image"
                            Src={CashIcon}
                            ButtonStyle ={{
                                width: "50px",
                                borderRadius: "50%",
                                outline: "none",
                                height: "50px",               
                                userSelect: "none",
                                color: "white",
                                backgroundColor: "white",
                                ToolTip: "Cash Payment"
                           }}
                            ></Button>
                             <Button
                            OnClick = {this.OnCreditPayment}
                            ButtonType="image"
                            Src={CreditCardIcon}
                            ButtonStyle ={{
                                width: "50px",
                                borderRadius: "50%",
                               outline: "none",
                               height: "50px",               
                               userSelect: "none",
                               color: "white",
                               backgroundColor: "white"
                           }}
                            ></Button>
                             <Button
                            OnClick = {this.OnDebitPayment}
                            ButtonType="image"
                            Src={DebitCardIcon}
                            ButtonStyle ={{
                                width: "50px",
                                borderRadius: "50%",
                               outline: "none",
                               height: "50px",               
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
}

const mapStateToProps = (state) => {

    return{
        customerOrders : state.CustomerDetailsReducer.OrderDetails,
        customerDetails:state.CustomerDetailsReducer.CustomerDetails,
        paymentDetails:  state.PaymentReducer.PaymentDetails,
        dealerDetails: state.CustomerDetailsReducer.DealerDetails,
        isSuccess: state.CustomerDetailsReducer.Success,
        isPaymentSuccessful: state.PaymentReducer.Success,
        totalAmount: state.CustomerDetailsReducer.TotalPaybleAmount,
        paymentError: state.PaymentReducer.ErrorOnPayment,
        customerError: state.CustomerDetailsReducer.ErrorOnAddCustomer,
        informationMessage: state.CustomerDetailsReducer.InformationMessage,
        selectedNavigationPath : state.AuthReducer.SelectedNavigationPath,
    }
}

CustomerDetails.propTypes = {
    AddYourCustomer: PropTypes.func.isRequired,
    MakeYourPayment : PropTypes.func.isRequired,
    PaymentValidationError: PropTypes.func.isRequired,
    ClearError: PropTypes.func.isRequired,
    CustomerValidation: PropTypes.func.isRequired,
    ResetTransactionDetails: PropTypes.func.isRequired,
    ResetPaymentDetails : PropTypes.func.isRequired,
    ClearOrderList: PropTypes.func.isRequired,
    PrintYourReceipt: PropTypes.func.isRequired,
    customerDetails: PropTypes.object.isRequired,
    paymentDetails: PropTypes.object.isRequired,
    paymentError : PropTypes.string.isRequired,
    customerError: PropTypes.string.isRequired,
    totalAmount  : PropTypes.number.isRequired,
    customerOrders : PropTypes.array.isRequired,
    informationMessage : PropTypes.string.isRequired,
    selectedNavigationPath: PropTypes.string.isRequired
}

const mapDispatchToProps = {
    AddYourCustomer,
    AddYourDealer,
    MakeYourPayment,
    CustomerValidationError,
    PaymentValidationError,
    ResetTransactionDetails,
    ClearError,
    ClearOrderList,
    ResetPaymentDetails,
    PrintYourReceipt
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerDetails));