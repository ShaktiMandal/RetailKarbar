import {
    USER_PASSWORD_RESET, 
    PASSWORD_RESET_FAILED, 
    PASSWORD_RESET_ERROR, 
    PASSWORDRESET_WINDOW_CLOSED
    
} from './ActionTypes';

export const UserPasswordReset = (data) => async dispatch => {

    try{

            var {UserId, NewPasscode, ConfPasscode} = data;
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
                    Passcode: NewPasscode, 
                    ConfPasscode:ConfPasscode
                })
            }

            var response = await fetch('http://localhost:5000/Authentication/PasswordReset/ResetPassword', options);
            var responseData = await response.json();

            if(responseData.Success)
            {
                dispatch({
                    type: USER_PASSWORD_RESET,
                    payload: {UserId, NewPasscode, ConfPasscode}
                });         
            }
            else{
                dispatch({
                    type: PASSWORD_RESET_ERROR,
                    payload: {      
                        ErrorMsg: responseData.error
                        
                    }
                }) 
            }
    }
    catch(error)
    {
        dispatch({
            type: PASSWORD_RESET_ERROR,
            payload: {      
                ErrorMsg: "Something went wrong, Please try again after sometime."
                
            }
        }) 
    }
}

export const PasswordResetError = (errors) =>  async dispatch => {

    debugger;
    
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

