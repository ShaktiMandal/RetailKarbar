import * as ActionTypes from './ActionTypes';
import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const UpdateDuePayment = (requestDetails) => async(dispatch) =>{

    SetInProgressMsg("Updating due payment....", dispatch)
    .then (() =>  CallApI('/Customer/UpdateDuePayment', FormServiceRequest('PUT', requestDetails)))       
    .then(response => response.json())
    .then(result => {
        RemoveInProgressMsg(dispatch);
        ResetPaymentDetails();
        if(result.Success)
        {
            dispatch({
                type:ActionTypes.PAYMENT_SUCCESSFULLY,
                payload :{
                    Success: result.Success,
                    Error:""
                }
            })
        }
        else
        {
            dispatch({
                type:ActionTypes.PAYMENTFAILED,
                payload :{
                    Success: result.Success,
                    Error: result.Error
                }
            })
        }
    })
    .catch( error => {
        RemoveInProgressMsg(dispatch);
        dispatch({
            type:ActionTypes.PAYMENTFAILED,
            payload :{
                Success: false,
                Error: "Unable to update due payment, something went wrong. Please try again."
            }
        })
    });
}

export const ResetPaymentDetails =  () => async disptach =>{

    disptach({
        type: ActionTypes.RESETPAYMENTDETAILS
    })
}

export const AddPaymentValidation =  (error) => async disptach => {

    disptach({
        type: ActionTypes.VALIDATION_ERROR,
        payload: {
            Success: false,
            Error: error
        }
    })
}