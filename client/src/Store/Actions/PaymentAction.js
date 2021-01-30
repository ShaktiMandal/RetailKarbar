import * as ActionTypes from './ActionTypes';
import fetch from 'node-fetch';

export const UpdateDuePayment = (paymentDetails) => async(dispatch) =>{

    let requestData = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
        },
        body: JSON.stringify(paymentDetails)
    }

    const response =  await fetch("http://localhost:5000/Customer/UpdateDuePayment", requestData);
    const responseData = await response.json();

       
    if(responseData.Success)
    {
        ResetPaymentDetails();
        dispatch({
            type:ActionTypes.PAYMENT_SUCCESSFULLY,
            payload :{
                Success: true,
                Error:""
            }
        })
    }
    else{
        dispatch({
            type:ActionTypes.PAYMENTFAILED,
            Payload :{
                Success: false,
                Error: responseData.Error
            }
        })
    }

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