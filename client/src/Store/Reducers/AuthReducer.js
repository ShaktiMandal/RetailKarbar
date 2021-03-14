import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    UserData:{
        UserId : "",
        Passcode: "",
    },
    IsUserLoggedIn: false,
    LogInErrors: "",
    IsUserAuthenticated: false,
    IsInvalidRoute: false,
    SelectedNavigationPath : ""
}

const AuthReducer = (state=initialState, action) =>{

    const {type, payload} = action;
    switch (type)
    {
        case actionTypes.USER_LOGIN:
            {               
                return{
                    ...state,
                    IsUserLoggedIn: true,
                    LogInErrors: ""
                };                
            }
        case actionTypes.LOGIN_ERROR:
            {
                return{
                    ...state,
                    IsUserLoggedIn: false,
                    LogInErrors: payload.ErrorMsg
                };
            }
        case actionTypes.LOGIN_FAILED:
            {
                return{

                };
            }
        case actionTypes.AUTHENTICATION_SUCCESS:
            {
                return {
                    ...state,
                    IsUserAuthenticated: true
                };
            }
        case actionTypes.AUTHENTICATION_FAILED:
            {
                localStorage.removeItem('token');
                localStorage.removeItem('exparitionTime');

                return {
                    ...state,
                    IsUserAuthenticated: false
                };
            }
        case actionTypes.LOGIN_WINDOW_CLOSED: 
            {
                var {UserId, Passcode} = payload;
                return{
                    ...state,
                    UserData: {UserId, Passcode},
                    IsUserLoggedIn: false,
                    LogInErrors: ""
                };
            }
        case actionTypes.USER_LOGOUT: 
            {       
                return{
                    ...state,
                    UserData:{
                        UserId : "",
                        Passcode: "",
                    },              
                    IsUserLoggedIn: false,
                    IsUserAuthenticated: false,
                    IsInvalidUrl: payload.IsInvalidUrl,
                    LogInErrors: ""
                };
            }
        case actionTypes.NAVIGATIONITEM: 
            {    
                return{
                    ...state,   
                    SelectedNavigationPath: payload.NavigationPath
                };
            }
        case actionTypes.ONLOADPAGE: 
        {
            return {
                ...state, 
                ErrorMsg: payload.ErrorMsg
            }
        }
        default:         
            return state;
    }
};

export default AuthReducer;