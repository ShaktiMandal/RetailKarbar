import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    UserData:{
        UserId : "",
        Passcode: "",
        ConfPasscode:""
    },
    IsRegisterCompleted: false,
    RegisterErrors: ""
}

const RegisterReducer = (state = initialState, action) =>{

    const {type, payload} = action;
    switch (type)
    {
        case actionTypes.USER_REGISTER:
            {       
                           
                return{
                    ...state,                                    
                    UserData: payload,
                    IsRegisterCompleted: true,
                    RegisterErrors: ""
                };                
            }
        case actionTypes.REGISTER_ERROR:
            {         
                return{
                    ...state,
                    IsRegisterCompleted: false,
                    RegisterErrors: payload.ErrorMsg
                };
            }
        case actionTypes.REGISTER_FAILED:
            {
                return{
                    ...state,
                    IsRegisterCompleted: false,
                    RegisterErrors: ""
                };
            }
        case actionTypes.REGISTER_WINDOW_CLOSED: 
            {       
                var {UserId, Passcode, ConfPasscode} = payload;
                return{
                    ...state,
                    UserData: {UserId, Passcode, ConfPasscode}, 
                    IsRegisterCompleted: false,         
                    RegisterErrors: ""
                };
            }
        default:
            return state;
    }
};

export default RegisterReducer;