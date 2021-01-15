import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    
    ResetPasswordDetails:{
        UserId : "",
        NewPasscode: "",
        ConfPasscode:""
    },
    isPasswordReSet: false,
    PasswordResetErrors: ""
}

const PasswordResetReducer = (state = initialState, action) =>{

    debugger;
    const {type, payload} = action;
    switch (type)
    {        
        case actionTypes.USER_PASSWORD_RESET:
            {               
                return{
                    ...state,       
                    IsPasswordReSet: true,                           
                    ResetPasswordDetails: payload,
                    PasswordResetErrors: ""
                };                
            }
        case actionTypes.PASSWORD_RESET_ERROR:
            {         
                return{
                    ...state,
                    IsPasswordReSet: false,
                    PasswordResetErrors: payload.ErrorMsg
                };
            }
        case actionTypes.PASSWORD_RESET_FAILED:
            {
                return{
                    ...state,
                    IsPasswordReSet: false,
                };
            }
        case actionTypes.PASSWORDRESET_WINDOW_CLOSED: 
            {       
                var {UserId, NewPasscode, ConfPasscode} = payload;
                return{
                    ...state,
                    IsPasswordReSet: false,
                    ResetPasswordDetails: {UserId, NewPasscode, ConfPasscode},                   
                    PasswordResetErrors: ""
                };
            }
        default:
            return state;
    }
};

export default PasswordResetReducer;