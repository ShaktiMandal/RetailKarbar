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
    
    try{
        
        var response ;  
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
        
        if(process.env.NODE_ENV === 'production')
        {
            response = await fetch('/Authentication/User/LogIn', headerOptions);
        }
        else
        {
            response = await fetch('http://localhost:5000/Authentication/User/LogIn', headerOptions);
        }
        
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
                localStorage.setItem("UserId", responseData.UserId);        
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

    var response;
    var headerOptions = {

        method: 'POST',
        credentials: 'include',
        headers: { 
            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
           }
    }

    if(process.env.NODE_ENV === 'production')
    {
        response = await fetch('/Authentication/User/LogOut', headerOptions);
    }
    else
    {
        response = await fetch('http://localhost:5000/Authentication/User/LogOut', headerOptions);
    }
    
    var responseData = await response.json();

    if(responseData.Success)
    {
        if(localStorage.getItem("UserId") !== null)
        {
            localStorage.removeItem("UserId");
        }

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

    var responseData;
    var request = {

        method: 'GET',
        credentials: 'include',
        headers: { 
            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
           }        
    }
    debugger;
    console.log("This is on page load");
    if(process.env.NODE_ENV === 'production')
    {
        console.log("This is on page load - Production");
        responseData  = await fetch('/', request);
    }
    else
    {
        responseData = await fetch('http://localhost:5000/', request);
    }

    debugger;
    var response = await responseData.json();
    // console.log("This is on page load response", responseData);
    // responseData.json().then( result => {
    //     console.log("Print out the result", result);
    // })
    // .catch(error => console.log("there is an error ->", error));
    console.log("Printing the response", response);
    
    var HeaderItems = {};

    for(var pair of responseData.headers)
    {
        console.log("Printing Header", pair);
        HeaderItems[pair[0]] = pair[1]; 
    }
       
    if(HeaderItems['is-userloggedin'] !== undefined 
       && HeaderItems['is-userloggedin'] === "true")
    {  
        console.log("This is on page load response - successful authentication");      
        dispatch({
            type:AUTHENTICATION_SUCCESS, 
            payload :{
              //  IsInvalidUrl : response.IsInvalidUrl
            }         
        })

        dispatch({
            type: USER_LOGIN           
        }); 
    }
    else{
        dispatch({
            type: USER_LOGOUT,
            payload :{
                //IsInvalidUrl : response.IsInvalidUrl
            } 
        })
    }
}