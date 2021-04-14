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

import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';
import fetch from 'node-fetch';

export const UserLogIn = (requestDetails) => async dispatch => {
        
    SetInProgressMsg("Logging in....")
    .then(() =>  CallApI('/Authentication/User/LogIn', FormServiceRequest('POST', requestDetails)))       
    .then(response => response.json())
    .then(result => {
    RemoveInProgressMsg();
    if(result.Success)
    {
        const {UserId, Passcode} = requestDetails;
        localStorage.setItem("UserId", result.UserId);        
        dispatch({
            type:AUTHENTICATION_SUCCESS,
            payload: result
        })

        dispatch({
            type: USER_LOGIN,
            payload: {UserId, Passcode}
        }); 
    }
    else
    {
        dispatch({

            type: AUTHENTICATION_FAILED,
            payload : result
        });

        dispatch({
            type: LOGIN_ERROR,
            payload: 
            {
                ErrorMsg : result.error
            } 
        });
    }});
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
        
    SetInProgressMsg("Logging out....")
    .then(() =>  CallApI('/Authentication/User/LogOut', FormServiceRequest('POST', {})))       
    .then(response => response.json())
    .then(result => {
    RemoveInProgressMsg();
    if(result.Success)
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
            }})       
    }});
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
    //var response = await responseData.json();
    // console.log("This is on page load response", responseData);
    // responseData.json().then( result => {
    //     console.log("Print out the result", result);
    // })
    // .catch(error => console.log("there is an error ->", error));
   // console.log("Printing the response", response);
    
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
