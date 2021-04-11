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
import Loading from '../../Containers/ToolBar/Loading/Loading';

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
            SelectedPayableItem: [],
            CustomerDetials : {}
        }
    }
    
    OnInputChange = (event) =>
    {
        event.preventDefault();
        this.props.GetCustomerDetails(event.target.value);
    }

    OnReturnOrder = (index) =>
    {
        this.props.ResetPaymentDetails();
        this.props.ResetOrderHistory();   

        this.setState({
            IsCustomerSelectionDisplay: true,
            ChosenOption: "",
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems : [],
            SelectedPayableItem: []
        });

        this.props.history.push('/Customer/Customers');
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
            GivenAmount: 0.00,
            ChangeAmount: 0.00,
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems : [],
            SelectedPayableItem: []
        });
    }

    OnDuePayment = async (event, index) =>{
        event.preventDefault();
        this.setState({IsCustomerSelectionDisplay: false});
        this.setState({ChosenOption: "DuePayment"});
        this.state.CustomerDetials = this.props.customerDetails[index];
        await this.props.GetOrderDetails(this.props.customerDetails[index].CustomerId);        
    }

    OnShowPurchaseHistory = async (event, index) =>{

        event.preventDefault();
        this.setState({
            IsCustomerSelectionDisplay: false,
            ChosenOption: "OrderHistory",
            TotalDueAmtToPay: 0.00,
            FilteredOrderItems : [],
            SelectedPayableItem: []
        });
        await this.props.GetOrderDetails(this.props.customerDetails[index].CustomerId);        
    }

    OnDueOrderDetails = async (event, index) => {
        event.preventDefault();
        this.setState({ChosenOption: "OrderHistory"});
        if(this.props.listOfOrders !== undefined 
            && this.props.listOfOrders.length > 0)
        {
            await this.props.GetDueOrders(this.props.listOfOrders, index)
        }
    }

    OnOrderSearch = (event) => {
           
        event.preventDefault();
        if(this.state.FilteredOrderItems.length === 0)
        {
            this.state.FilteredOrderItems = this.props.listOfOrders;        
        }
        
        this.props.OnFilterOrderItems(this.state.FilteredOrderItems, event.target.value);            
    }

    OnPayment = async (event) =>
    {
        event.preventDefault();
        let saveOrderDetails = {
            GivenAmount: this.state.GivenAmount,
            DueOrders: []
        };
        let givenAmount =  this.state.GivenAmount;
        let isAmountPaid = false;
           
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
        error.length === 0 ? await this.props.UpdateDuePayment(saveOrderDetails.DueOrders) : this.props.AddPaymentValidation(error);
    }

    OnOrderItemSelection = (event) => {
       var isItemAlreadySelected = false;
       var selectedIndex = event.target.id.split('-')[1];
       var isChecked = event.target.checked;
       var SelectedItem = this.props.listOfOrders[Number(selectedIndex)];
          
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
            case "DuePayment":
                return(
                    <Payment
                    customerDetails = {this.state.CustomerDetials}
                    paymentDetails = {this.state.SelectedPayableItem.length > 0 ?
                         this.state.SelectedPayableItem : this.props.listOfOrders}
                    OnCashPayment= {this.OnCashPayment}
                    OnCreditPayment = {this.OnCreditPayment}
                    OnDebitPayment  = {this.OnDebitPayment}
                    OnPaymentValueChange = {this.OnPaymentValueChange}
                    OnPayment = {this.OnPayment}
                    OnMainMenu = {this.OnMainMenu}
                    OnReturnHome = {this.OnReturnOrder}
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
                var givenCash = event.target.value.length > 0 ? parseInt(event.target.value) : 0;
                this.setState({
                    GivenAmount: givenCash === 0 ? null : givenCash,
                    ChangeAmount: this.props.listOfOrders.reduce((accumulator, currentvalue) => {
                        return accumulator + currentvalue.DueAmount
                    }, 0.00).toFixed(2) - givenCash
                })               
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
        if(this.props.loadingMessage.length !== 0 )
        {
            return <Loading LoadingMessage={this.props.loadingMessage}/>
        }

        let CustomerResultArea = 
        <CustomerResult        
        customerDetails       = {this.props.customerDetails}
        OnShowPurchaseHistory = {this.OnShowPurchaseHistory}
        OnDuePayment          = {this.OnDuePayment}
        OnReturnOrder         = {this.OnReturnOrder}
        LoadingMessage         = {this.props.loadingMessage}
        IsCustomerSearched    = {this.props.isCustomerSearched}
        />;
       
        let elementToBeDisplayed = this.ChooseYourAction();
        

        return(
            <Aux>
                <div className={classes.Container}>                      
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
        loadingMessage : state.CustomersReducer.LoadingMessage,
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
    loadingMessage : PropTypes.string,
    errorOnOrder   : PropTypes.string,
    paymentError   : PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Customers));