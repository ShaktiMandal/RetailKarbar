import {
            USER_REGISTER, 
            REGISTER_FAILED, 
            REGISTER_ERROR, 
            REGISTER_WINDOW_CLOSED
            
        } from './ActionTypes';

export const UserRegister = (data) => async dispatch => {

    try{
        var response;
        var {UserId, Passcode, ConfPasscode} = data;
        const options = 
        {
            method:'POST',
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                UserId:UserId, 
                Passcode: Passcode, 
                ConfPasscode:ConfPasscode
            })
        };

        if(process.env.NODE_ENV === 'production')
        {
            response = await fetch('/Authentication/RegisterUser/Register', options);
        }
        else
        {
            response = await fetch('http://localhost:5000/Authentication/RegisterUser/Register', options);
        } 

        var responseData = await response.json();

        if(responseData.Success)
        {
            dispatch({
                type: USER_REGISTER,
                payload: {UserId, Passcode, ConfPasscode}
            });        
        }
        else{            
                dispatch({
                    type: REGISTER_ERROR,
                    payload: {      
                        ErrorMsg: responseData.error
                    }
            })
        }
    }
    catch(error)
    {
        dispatch({
            type: REGISTER_ERROR,
            payload: {      
                ErrorMsg: "Something went wrong while registering the user"
                }
        })
    }    
};

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

