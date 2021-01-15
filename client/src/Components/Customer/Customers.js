import React from 'react';
import {Component} from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Customers.module.css';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CustomerResult from './CustomerSearchResult';
import OrderList from '../Order/Order';
import Payment from '../Payment/Payment';
import Loading from '../../Containers/ToolBar/Loading/Loading';
import NotFoundMessage from '../../Containers/ToolBar/MessageBox/NotFoundMessage';
import Validator from '../../Validator/Validator';
import {
    UpdateDuePayment,
    ResetPaymentDetails,
    AddPaymentValidation
} from '../../Store/Actions/PaymentAction';
import {
    GetCustomerDetails, 
    DeleteCustomer, 
    GetProductDetails,
    GetOrderDetails,
    GetDueOrders,
    ResetOrderHistory,
    OnFilterOrderItems
} from '../../Store/Actions/CustomersAction';
import SearchProductImg from '../../Assests/Logo/Customer-Searching-Manager.png'
import { resolve } from 'path';


class Customers extends Component
{   
    constructor(props)
    {
        super(props);
        this.state = {
            CustomerSelectionIndex : -1,
            IsCustomerSelectionDisplay: true,
            ChosenOption: "",
            PaymentType:"",
            GivenAmount: 0.00,
            ChangeAmount: 0.00,
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems: [],
            SelectedPayableItem: []
        }
    }
    
    OnInputChange = (event) =>
    {
        event.preventDefault();
        this.props.GetCustomerDetails(event.target.value);

    }

    OnReturnOrder = (index) =>
    {
      
    }

    OnCloseErrorPanel = (event) =>{
        event.preventDefault();
        Validator.ClearErrors();
        this.props.ResetPaymentDetails();
    }

    OnCloseClick = (event) =>{

        this.props.ResetPaymentDetails();
        this.props.ResetOrderHistory();   

        this.setState({
            IsCustomerSelectionDisplay: true,
            ChosenOption: "",
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems : [],
            SelectedPayableItem: []
        });
    }

    OnDuePayment = (event, index) =>{
        event.preventDefault();
        this.setState({IsCustomerSelectionDisplay: false});
        this.setState({ChosenOption: "DuePayment"});
        this.props.GetOrderDetails(this.props.customerDetails[index].CustomerId);        
    }

    OnShowPurchaseHistory = (event, index) =>{

        event.preventDefault();
        this.setState({
            IsCustomerSelectionDisplay: false,
            ChosenOption: "OrderHistory",
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems : [],
            SelectedPayableItem: []
        });
        this.props.GetOrderDetails(this.props.customerDetails[index].CustomerId);        
    }

    OnDueOrderDetails = (event, index) => {
        event.preventDefault();
        this.setState({ChosenOption: "OrderHistory"});
        if(this.props.listOfOrders !== undefined 
            && this.props.listOfOrders.length > 0)
        {
            this.props.GetDueOrders(this.props.listOfOrders, index)
        }
    }

    OnOrderSearch = (event) => {
        debugger;
        event.preventDefault();
        if(this.state.FilteredOrderItems.length === 0)
        {
            this.state.FilteredOrderItems = this.props.listOfOrders;        
        }
        
        this.props.OnFilterOrderItems(this.state.FilteredOrderItems, event.target.value);            
    }

    OnPayment = (event) =>
    {
        event.preventDefault();
        let saveOrderDetails = {
            GivenAmount: this.state.GivenAmount,
            DueOrders: []
        };
        let givenAmount =  this.state.GivenAmount;
        let isAmountPaid = false;
        debugger;
        this.props.listOfOrders.map( item => {
            
            if( item.DueAmount === 0.00 
                ||  item.DueAmount === 0)
            {
                return;
            }
            
            const savedOrderItem = {};

            if(item.DueAmount === givenAmount && isAmountPaid === false)
            {  

                savedOrderItem.OrderId = item.OrderId;                
                savedOrderItem.DueAmount = 0.00;
                savedOrderItem.PaidAmount = item.PaidAmount + givenAmount;
                savedOrderItem.Orders = item.Orders;
                saveOrderDetails.DueOrders.push(savedOrderItem);
                givenAmount = 0.00;
                isAmountPaid = true;
            }
            if(item.DueAmount > givenAmount && isAmountPaid === false)
            {

                savedOrderItem.OrderId = item.OrderId;
                savedOrderItem.GivenAmount = givenAmount;
                savedOrderItem.DueAmount = item.DueAmount - givenAmount;
                savedOrderItem.PaidAmount = item.PaidAmount + givenAmount;
                savedOrderItem.Orders = item.Orders
                saveOrderDetails.DueOrders.push(savedOrderItem);

                givenAmount = 0.00;
                isAmountPaid = true;
            }
            if(item.DueAmount < givenAmount
                && isAmountPaid === false
                )
            {
             
                savedOrderItem.OrderId = item.OrderId;
                savedOrderItem.GivenAmount = givenAmount;
                givenAmount = givenAmount - item.DueAmount;
                savedOrderItem.DueAmount = 0.00;
                savedOrderItem.PaidAmount = item.PaidAmount + item.DueAmount;
                savedOrderItem.Orders = item.Orders
                saveOrderDetails.DueOrders.push(savedOrderItem);
            }
        });
        debugger
        Validator.DuePaymentValidation(saveOrderDetails);
        var error = Validator.GetErrors();
        error.length === 0 ? this.props.UpdateDuePayment(saveOrderDetails.DueOrders) : this.props.AddPaymentValidation(error);
    }

    OnOrderItemSelection = (event) => {
       var isItemAlreadySelected = false;
       var selectedIndex = event.target.id.split('-')[1];
       var isChecked = event.target.checked;
       var SelectedItem = this.props.listOfOrders[Number(selectedIndex)];
       debugger;
       if(this.state.SelectedPayableItem.length > 0)
       {
            isItemAlreadySelected = this.state.SelectedPayableItem.findIndex(item => item.OrderId === SelectedItem.OrderId) !== -1;
       }
       
       if(isChecked)
       {
           if(isItemAlreadySelected === false)
           {
                this.setState({
                    TotalDueAmtToPay : this.state.TotalDueAmtToPay + SelectedItem.DueAmount               
                });
                this.state.SelectedPayableItem.push(SelectedItem);
           }
       }
       else
       {
            this.setState({TotalDueAmtToPay: this.state.TotalDueAmtToPay - SelectedItem.DueAmount});
            this.state.SelectedPayableItem.splice(SelectedItem);
       }       
    }

    OnPayHere = () => {

       this.setState({
            IsCustomerSelectionDisplay: false,
            ChosenOption: "DuePayment",
            TotalDueAmtToPay: 0.00
        })
    }

    ChooseYourAction()
    {        
        switch(this.state.ChosenOption)
        {
            case "OrderHistory": 
                return(
                    <OrderList
                        OnCloseClick = {this.OnCloseClick}
                        IsOrderItemSelected  = {this.OnOrderItemSelection}
                        OnPayHere = {this.OnPayHere}
                        TotalSelectedAmount = {this.state.TotalDueAmtToPay}
                        OnOrderSearch = { this.OnOrderSearch}
                        OnCloseErrorPanel = {this.OnCloseErrorPanel}
                        listOfOrders = {this.props.listOfOrders}
                        ErrorMsg = {this.props.errorOnOrder}
                        />
                )
                break;
            case "DuePayment":
                return(
                    <Payment
                    paymentDetails = {this.state.SelectedPayableItem.length > 0 ?
                         this.state.SelectedPayableItem : this.props.listOfOrders}
                    OnCashPayment= {this.OnCashPayment}
                    OnCreditPayment = {this.OnCreditPayment}
                    OnDebitPayment  = {this.OnDebitPayment}
                    OnPaymentValueChange = {this.OnPaymentValueChange}
                    OnPayment = {this.OnPayment}
                    OnMainMenu = {this.OnMainMenu}
                    OnDueOrderDetails = {this.OnDueOrderDetails}
                    CloseErrorPanel = {this.OnCloseErrorPanel}
                    OnCloseClick    = {this.OnCloseClick}
                    PaymentType = {this.state.PaymentType}
                    ChangeAmount = {this.state.ChangeAmount}
                    GivenAmount  = {this.state.GivenAmount}
                    ErrorMsg = {this.props.paymentError}   
                    IsPaymentSuccessful = {this.props.isPaymentSuccessful}                     
                />
                )
                break;
            case "ReturnOrder":
                break;
            default:
                return "";
        }
    }

    OnCashPayment = () =>
    {
        this.setState({PaymentType : "Cash"})
    }

    OnCreditPayment = () =>
    {
        this.setState({PaymentType : ""})
    }

    OnDebitPayment = () =>
    {
        this.setState({PaymentType : ""})
    }

    OnPaymentValueChange = (event) => {

        switch(event.target.id)
        {            
            case "givenCash":
            {
                console.log("Type of given amount", typeof(event.target.value));
                this.setState({
                    GivenAmount: parseInt(event.target.value),
                    ChangeAmount: this.props.listOfOrders.reduce((accumulator, currentvalue) => {
                        return accumulator + currentvalue.DueAmount
                    }, 0.00).toFixed(2) - parseInt(event.target.value)
                })               
                break; 
            }
            case "changeAmount":
            {
                this.setState({ChangeAmount:  parseInt(event.target.id)});
                break;
            }
            default:
                break;
        }
    }

    OnMainMenu = (event) => {     
        this.props.ResetPaymentDetails(); 
        this.props.ResetOrderHistory();
        this.setState({
            IsCustomerSelectionDisplay: true,
            ChosenOption: ""
        });
    }

    render()
    { 
        debugger;
      
        let CustomerResultArea = 
        <CustomerResult        
        customerDetails       = {this.props.customerDetails}
        OnShowPurchaseHistory = {this.OnShowPurchaseHistory}
        OnDuePayment          = {this.OnDuePayment}
        OnReturnOrder         = {this.OnReturnOrder}
        IsShowLoading         = {this.props.isShowLoading}
        IsCustomerSearched    = {this.props.isCustomerSearched}
        />;
        
        let elementToBeDisplayed = this.ChooseYourAction();

        return(
            <Aux>
                <div className={classes.Container}>  
                    <img src={SearchProductImg} className={classes.DisplayImage}/>                      
                    <div className={this.state.IsCustomerSelectionDisplay ? 
                        classes.SearchDisplayDiv :classes.SearchDiv}>                       
                        {CustomerResultArea}
                    </div>    
                    <div className={this.state.IsCustomerSelectionDisplay ? 
                        classes.SelectionArea :classes.SelectionDisplayArea}>

                       {elementToBeDisplayed}
                    </div>                
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {   
    return{
        customerDetails: state.CustomersReducer.CustomerDetails,
        productDetails : state.CustomersReducer.ProductDetails,
        isPaymentSuccessful : state.PaymentReducer.Success,
        listOfOrders : state.CustomersReducer.OrderDetails,
        isCustomerAgreedToDelete:  state.CustomersReducer.IsAgreedToDelete,
        isEditCustomer : state.CustomersReducer.IsEditCustomer,
        isDisplayHistory: state.CustomersReducer.IsDisplayHistory,
        errorOnOrder  : state.CustomersReducer.Error,
        isCustomerSearched : state.CustomersReducer.IsCustomerSearched,
        isShowLoading : state.CustomersReducer.IsShowLoading,
        paymentError : state.PaymentReducer.ErrorOnPayment
    }
};

const mapDispatchToProps = {
    GetCustomerDetails,
    GetProductDetails,
    DeleteCustomer,
    GetOrderDetails,
    GetDueOrders,
    UpdateDuePayment,
    ResetPaymentDetails,
    ResetOrderHistory,
    OnFilterOrderItems,
    AddPaymentValidation
}

Customers.propTypes = {
    GetCustomerDetails: PropTypes.func.isRequired,
    GetProductDetails : PropTypes.func.isRequired,
    DeleteCustomer : PropTypes.func.isRequired,
    GetOrderDetails: PropTypes.func.isRequired,
    GetDueOrders : PropTypes.func.isRequired,
    UpdateDuePayment: PropTypes.func.isRequired,
    ResetPaymentDetails: PropTypes.func.isRequired,
    ResetOrderHistory : PropTypes.func.isRequired,
    OnFilterOrderItems : PropTypes.func.isRequired,
    AddPaymentValidation: PropTypes.func.isRequired,
    customerDetails: PropTypes.array.isRequired,
    productDetails : PropTypes.array.isRequired,
    listOfOrders   : PropTypes.array.isRequired,
    isCustomerAgreedToDelete : PropTypes.bool.isRequired,
    isDisplayHistory : PropTypes.bool.isRequired,
    isEditCustomer : PropTypes.bool.isRequired,
    isCustomerSearched: PropTypes.bool.isRequired,
    isShowLoading: PropTypes.bool.isRequired,
    errorOnOrder   : PropTypes.string,
    paymentError   : PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Customers));