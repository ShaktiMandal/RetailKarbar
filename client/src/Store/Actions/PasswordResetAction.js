import {
    USER_PASSWORD_RESET,     
    PASSWORD_RESET_ERROR, 
    PASSWORDRESET_WINDOW_CLOSED
    
} from './ActionTypes';

import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const UserPasswordReset = (data) => async dispatch => {

    var {UserId, NewPasscode, ConfPasscode} = data;
    let requestDetails = { 
        UserId:UserId, 
        Passcode: NewPasscode, 
        ConfPasscode:ConfPasscode
    };

    SetInProgressMsg("Updating password....", dispatch)
    .then (() =>  CallApI('/PasswordReset/ResetPassword', FormServiceRequest('POST', requestDetails)))       
    .then(response => response.json())
    .then(result => {
        RemoveInProgressMsg(dispatch);
        if(result.Success)
        {
            dispatch({
                type: USER_PASSWORD_RESET,
                payload: {UserId, NewPasscode, ConfPasscode}
            });  
        }
        else
        {
            dispatch({
                type: PASSWORD_RESET_ERROR,
                payload: {      
                    ErrorMsg: result.error
                    
                }
            });
        }
    })
    .catch(error => {
        dispatch({
            type: PASSWORD_RESET_ERROR,
            payload: {      
                ErrorMsg: "Something went wrong, Please try again after sometime."
                
            }
        });
    });
}

export const PasswordResetError = (errors) =>  async dispatch => {
    
    return dispatch({
        type: PASSWORD_RESET_ERROR,
        payload: {      
            ErrorMsg: errors
        }
    })
};

export const PasswordResetWindowClose = () => async dispatch => {

    return dispatch({
    type: PASSWORDRESET_WINDOW_CLOSED,
    payload: {            
        UserId: "",
        NewPasscode: "",
        ConfPasscode: "",
        ErrorMsg: ""
        }
    })
}

