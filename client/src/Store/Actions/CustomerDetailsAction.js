import * as ActionTypes from './ActionTypes';
import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const AddYourCustomer = (customerDetails) => async (dispatch) => {

    var requestData = {
            CustomerName: customerDetails.CustomerName,
            PhoneNumber: customerDetails.PhoneNumber,
            CustomerId: customerDetails.PhoneNumber + Date.now() + new Date().getTime()
        }
    
        SetInProgressMsg("Adding new Customer.....", dispatch)
        .then(() => CallApI('/Customer/AddCustomer', FormServiceRequest('POST', requestData)))
        .then(response => response.json())
        .then(responseData => {
        RemoveInProgressMsg(dispatch);
        if(responseData.Success)
        {
            if(responseData.error.length === 0)
            {
                dispatch({
                    type: ActionTypes.ADDCUSTOMER_SUCCESSFULLY,
                    payload: {
                        Success: responseData.Success,
                        CustomerDetails: responseData.response,
                        ErrorMsg: ""
                    }
                })
            }
            else
            {

                dispatch({
                    type: ActionTypes.EXISTINGCUSTOMER,
                    payload:{
                        Success: responseData.Success,
                        CustomerDetails: responseData.response,
                        ErrorMsg: responseData.error
                    }
                })
            }
        }
        else{

            dispatch({
                type: ActionTypes.ADDCUSTOMER_FAILED,
                payload: {
                    Success: responseData.Success,
                    ErrorMsg: responseData.error
                }
            })
        }
    })
    .catch(error => {
        RemoveInProgressMsg(dispatch);
        dispatch({
            type: ActionTypes.ADDCUSTOMER_FAILED,
            payload: {
                Success: false,
                ErrorMsg: error
            }
        })
    })
}

export const AddYourDealer = (dealerDetails, orderDetails) => async (dispatch) => {

    var requestData = {
        CompanyName: dealerDetails.CompanyName,
        DealerName : dealerDetails.DealerName,
        PhoneNumber: dealerDetails.PhoneNumber,
        OrderId : orderDetails.OrderId,
        DealerId   : dealerDetails.PhoneNumber + Date.now() + new Date().getTime()
        }
    
        SetInProgressMsg("Adding new dealer.....", dispatch)
        .then(() => CallApI('/Dealer/AddDealer', FormServiceRequest('POST', requestData)))
        .then(response => response.json())
        .then(responseData => {
            RemoveInProgressMsg(dispatch);
        if(responseData.Success)
        {
            dispatch({
                type: ActionTypes.ADDDEALER,
                payload: 
                {
                    DealerDetails: responseData.response,
                    ErrorMsg: responseData.Error
                }
            });

          
        }
        else
        { 
            dispatch({
                type: ActionTypes.ADDDEALERFAILED,
                payload: 
                {
                    DealerDetails: responseData.response,
                    ErrorMsg: responseData.Error
                }
            })
        }
    })
    .catch(error => {
        RemoveInProgressMsg(dispatch);
        dispatch({
            type: ActionTypes.ADDDEALERFAILED,
            payload: {
                Success: false,
                ErrorMsg: error
            }
        })
    })
}

export const MakeYourPayment = (paymentDetails, customerDetails, orderDetails, totalAmount) => async (dispatch) => {

    if(paymentDetails.PaymentType === "Cash")
    {
        const { GivenAmount} = paymentDetails;
        paymentDetails.ChangeAmount = GivenAmount - totalAmount;
        paymentDetails.PaymentType = "Cash"

        let requestData = {
            CustomerId: customerDetails.CustomerId,
            OrderId: orderDetails.OrderId,
            PaymentType: "Cash",
            DueAmount : totalAmount - GivenAmount,
            PaidAmount: GivenAmount,
            CustomerOrder: orderDetails,
            IsDealer : customerDetails.IsDealer
        }

        SetInProgressMsg("Saving customer order.....", dispatch)
        .then(() => CallApI('/Customer/SaveCustomerOrder', FormServiceRequest('POST', requestData)))
        .then(response => response.json())
        .then(responseData => {
        RemoveInProgressMsg(dispatch);
            if(responseData.Success)
            {
                paymentDetails.IsPaymentSuccessful = responseData.Success;            
                dispatch({
                    type: ActionTypes.PAYMENT_SUCCESSFULLY,
                    payload: {
                        Success: responseData.Success,
                        ErrorMsg: ""
                    }
                });
            }
            else
            {
                paymentDetails.IsPaymentSuccessful = responseData.Success;            
                dispatch({
                    type: ActionTypes.PAYMENTFAILED,
                    payload: {
                        Success: responseData.Success,
                        ErrorMsg: responseData.error
                    }
                });
            }
        })
        .catch(error => {
            paymentDetails.IsPaymentSuccessful = false;            
            dispatch({
                type: ActionTypes.PAYMENTFAILED,
                payload: {
                    Success: false,
                    ErrorMsg: error
                }
            })
        })     
    }
    else
    {
            paymentDetails.PaymentType = "Card";

            dispatch({
                type: ActionTypes.CARDPAYMENT,
                payload: {
                    PaymentDetails: paymentDetails
                }
            })
    }
}

export const CustomerValidationError = (errors) => (dispatch) => {

    return dispatch({
        type:  ActionTypes.ADDCUSTOMER_FAILED,
        payload: {   
            Success: false,   
            ErrorMsg: errors
        }
    })
}

export const PaymentValidationError = (errors) => (dispatch) => {

    return dispatch({
        type:  ActionTypes.ADDCUSTOMER_FAILED,
        payload: {   
            Success: false,   
            ErrorMsg: errors
        }
    })
}

export const ClearError = (isError, customerData) => (dispatch) =>{

       
   isError ?  dispatch({
        type: ActionTypes.CLEARERROR,
        payload: {

            CustomerDetails : {
                CustomerName : "",
                PhoneNumber  : "",
                CustomerId: customerData.CustomerId,
                DueAmount: 0.00,
                IsCustomerCreated: false
            },
            DealerDetails:
            {
                CompanyName: "",
                DealerName: "",
                PhoneNumber: "",
                DealerId: customerData.DealerId,
                IsDealerCreated: false
            }
        }        
    })
    : dispatch({
        type: ActionTypes.CLEARMSG,
        payload: {

            CustomerDetails : {
                CustomerName : "",
                PhoneNumber  : "",       
                CustomerId   : customerData.CustomerId,      
                IsCustomerCreated: true
            }
        }
    })
}

export const PlaceYourOrder = (orderDetails, totalOrderAmount) => (dispatch) => {
    
    if(orderDetails.length > 0)
    {
        dispatch({
            type:ActionTypes.PLACEDORDERS,
            payload: {
                CustomerOrder: orderDetails,
                OrderId: Date.now() + new Date().getTime(),
                TotalPaybleAmount: totalOrderAmount.toFixed(2)
            }
        })
    }
}

export const ResetTransactionDetails = () => async (dispatch) => {

    dispatch({
        type: ActionTypes.RESETTRANSACTIONDETAILS
    })
}

export const PrintYourReceipt = (customerDetails, paymentDetails, orderDetails) => async dispatch => {

       
//     const {CustomerName, PhoneNumber} = customerDetails;
//     const {GivenAmount, ChangeAmount} = paymentDetails;
//     const {OrderId, CustomerOrders} = orderDetails;

}

export const AddYourCustomerAndPay = (paymentDetails, customerDetails, orderDetails, totalAmount) => async (dispatch) => {

    var requestData = {
            CustomerName: customerDetails.CustomerName,
            PhoneNumber: customerDetails.PhoneNumber,
            CustomerId: customerDetails.PhoneNumber + Date.now() + new Date().getTime()
         }

        SetInProgressMsg("Making payment.....", dispatch)
        .then(() => CallApI('/Customer/AddCustomer', FormServiceRequest('POST', requestData)))
        .then(response => response.json())
        .then(responseData => {
        RemoveInProgressMsg(dispatch);
            if(responseData.Success)
            {
                if(paymentDetails.PaymentType === "Cash")
                {
                    const { GivenAmount} = paymentDetails;
                    paymentDetails.ChangeAmount = GivenAmount - totalAmount;
                    paymentDetails.PaymentType = "Cash"
            
                    let requestData = {
                        CustomerId: responseData.response.CustomerId,
                        OrderId: orderDetails.OrderId,
                        PaymentType: "Cash",
                        DueAmount : totalAmount - GivenAmount,
                        PaidAmount: GivenAmount,
                        CustomerOrder: orderDetails,
                        IsDealer : customerDetails.IsDealer
                    }

                    SetInProgressMsg("Making payment.....", dispatch)
                    .then(() => CallApI('/Customer/SaveCustomerOrder', FormServiceRequest('POST', requestData)))
                    .then(response => response.json())
                    .then(responseData => {
                    RemoveInProgressMsg(dispatch);
                        if(responseData.Success)
                        {
                            paymentDetails.IsPaymentSuccessful = true;            
                            dispatch({
                                type: ActionTypes.PAYMENT_SUCCESSFULLY,
                                payload: {
                                    Success: true,
                                    ErrorMsg: ""
                                }
                            });
                        }
                        else
                        {
                            paymentDetails.IsPaymentSuccessful = false;            
                            dispatch({
                                type: ActionTypes.PAYMENTFAILED,
                                payload: {
                                    Success: false,
                                    ErrorMsg: responseData.error
                                }
                            })
                        }
                    })
                }
                else
                {
                    paymentDetails.PaymentType = "Card";        
                    dispatch({
                        type: ActionTypes.CARDPAYMENT,
                        payload: {
                            PaymentDetails: paymentDetails
                        }
                    })
                }
            }
            else
            {
                dispatch({
                    type: ActionTypes.ADDCUSTOMER_FAILED,
                    payload: {
                        Success: responseData.Success,
                        ErrorMsg: responseData.error
                    }
                });
            }
        })
        .catch (error => {
            dispatch({
                type: ActionTypes.ADDCUSTOMER_FAILED,
                payload: {
                    Success: false,
                    ErrorMsg: error
                }
            });
        })
}
