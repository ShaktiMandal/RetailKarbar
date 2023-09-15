import {
            USER_REGISTER, 
            REGISTER_ERROR, 
            REGISTER_WINDOW_CLOSED
            
        } from './ActionTypes';

import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const UserRegister = (data) => async dispatch => {

    var {UserId, Passcode, ConfPasscode} = data;
    var requestDetails = { 
        UserId:UserId, 
        Passcode: Passcode, 
        ConfPasscode:ConfPasscode
    }

    SetInProgressMsg("Logging in....", dispatch)
    .then(() =>  CallApI('/Authentication/RegisterUser/Register', FormServiceRequest('POST', requestDetails)))       
    .then(response => response.json())
    .then(result => {
        RemoveInProgressMsg(dispatch);
        if(result.Success)
        {

            dispatch({
                type: USER_REGISTER,
                payload: {UserId, Passcode, ConfPasscode}
            }); 
        }
        else
        {            
            dispatch({
                type: REGISTER_ERROR,
                payload: {      
                    ErrorMsg: result.error
                }
            })
        }
    })
    .catch(error => {
        RemoveInProgressMsg(dispatch);
        dispatch({
            type: REGISTER_ERROR,
            payload: {      
                ErrorMsg: "Something went wrong while registering the user"
                }
        })
    });  
}

export const RegisterError = (errors) =>  dispatch => {

    return dispatch({
        type: REGISTER_ERROR,
        payload: {      
            ErrorMsg: errors
        }
    })
};

export const RegisterWindowClose = () => dispatch => {

    return dispatch({
        type: REGISTER_WINDOW_CLOSED,
        payload: {            
            UserId: "",
            Passcode: "",
            ConfPasscode: "",
            ErrorMsg: ""
        }
    })
}

