import {
        USER_LOGIN, 
        USER_LOGOUT,
        LOGIN_FAILED, 
        LOGIN_ERROR, 
        AUTHENTICATION_FAILED,
        AUTHENTICATION_SUCCESS,
        LOGIN_WINDOW_CLOSED,
        NAVIGATIONITEM,
        ONLOADPAGE
    } from './ActionTypes';

import fetch from 'node-fetch';

export const UserLogIn = (data) => async dispatch => {
    debugger;
    try{
        var {UserId, Passcode} = data; 
        var headerOptions = {

            method: 'POST',
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json',
                'Authorization': null
               },
            body: JSON.stringify({ UserId:UserId, Passcode: Passcode })
        }
        
        var response = await fetch('http://localhost:5000/Authentication/User/LogIn', headerOptions);
        if(response === undefined)
        {
            dispatch({
                type: LOGIN_ERROR,
                payload: 
                {
                    ErrorMsg :  "Unable to load due to Internet/Server connection."                    
                } 
            });   
        }
        else
        {    
            var responseData = await response.json();         
            if(!responseData.Success)
            {
                dispatch({

                    type: AUTHENTICATION_FAILED,
                    payload : responseData
                });

                dispatch({
                    type: LOGIN_ERROR,
                    payload: 
                    {
                        ErrorMsg : responseData.error
                    } 
                });
            }
            else
            {            
                const {token} = responseData;
        
                dispatch({
                    type:AUTHENTICATION_SUCCESS,
                    payload: responseData
                })

                dispatch({
                    type: USER_LOGIN,
                    payload: {UserId, Passcode}
                }); 
            }
        }
              
    }
    catch(error)
    {
        var errorMsg = error;
        return dispatch({
            type: LOGIN_ERROR,
            payload: { 
                ErrorMsg : "Unexpected Error Occured. Please try again."                
            }
        })
    }   
}

export const LogInError = (errors) =>  dispatch => {

    return dispatch({
        type: LOGIN_ERROR,
        payload: {      
            ErrorMsg: errors
        }
    })
};

export const LogInWindowClose = () => dispatch => {

    return dispatch({
        type: LOGIN_WINDOW_CLOSED,
        payload: {            
            UserId: "",
            Passcode: "",
            ErrorMsg: ""
        }
    })
}

export const UserLogOut = () => async dispatch => {

    var headerOptions = {

        method: 'POST',
        credentials: 'include',
        headers: { 
            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
           }
    }

    var response = await fetch('http://localhost:5000/Authentication/User/LogOut', headerOptions);
    var responseData = await response.json();

    if(responseData.Success)
    {
        dispatch({
            type: USER_LOGOUT,
            payload: {            
                UserId: "",
                Passcode: "",
                ErrorMsg: ""
            }
        });
    }
}

export const NavigationMenuSelection = (navigationPath) => dispatch => {
    debugger;
    switch(navigationPath)
    {
        case "/Product/OrderProduct" :
        {       
            dispatch({
                type: NAVIGATIONITEM,
                payload: {
                    NavigationPath: "OrderProduct"
                }
            });
            break;
        }
        case "/Product/OutOfStocks" :
        {
            dispatch({
                type: NAVIGATIONITEM,
                payload: {
                    NavigationPath: "OutOfStock"
                }
            });
            break;
        }
        case '/Product/Favourite' :
        {
            dispatch({
                type: NAVIGATIONITEM,
                payload: {
                    NavigationPath: "Favourite"
                }
            });
            break;
        }
        case '/Product/AddProduct':
        {
            dispatch({
                type: NAVIGATIONITEM,
                payload: {
                    NavigationPath: "AddProduct"
                }
            });
            break;
        }
    }
}

export const OnLoadPage = () => async dispatch => {

    debugger;
    var request = {

        method: 'GET',
        credentials: 'include',
        headers: { 
            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
           }        
    }

    const responseData = await fetch('http://localhost:5000/', request);
    const response = await responseData.json();
    debugger; 
    var HeaderItems = {};
    var headers = responseData.headers.entries();
    for(var pair of responseData.headers)
    {
        console.log("Printing Header", pair);
        HeaderItems[pair[0]] = pair[1]; 
    }
    debugger;
    if(HeaderItems['is-userloggedin'] !== undefined 
       && HeaderItems['is-userloggedin'] === "true")
    {        
        dispatch({
            type:AUTHENTICATION_SUCCESS           
        })

        dispatch({
            type: USER_LOGIN           
        }); 
    }
    else{
        dispatch({
            type: USER_LOGOUT
        })
    }
}