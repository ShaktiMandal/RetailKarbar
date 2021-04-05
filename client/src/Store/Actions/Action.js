import { rejects } from 'assert'
import { resolve } from 'path'
import {LOADING} from './ActionTypes'

export const FormServiceRequest = (methodName, requestData) => {

    if(methodName === 'POST')
    {
        return {

            method: methodName,
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json',
                'Authorization': null
               },
    
               body: JSON.stringify(requestData)
        }
    }
    else
    {
        return {

            method: methodName,
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json',
                'Authorization': null
               }
        }
    }
    
}

export const CallApI = async (apiUrl, request) => {

    if(process.env.NODE_ENV === 'production')
    {
        return await fetch(apiUrl, request);
    }
    else
    {
        return await fetch('http://localhost:5000' + apiUrl, request);
    }
}

export const DispatchAction = (dispatch, dispatchDetails) =>{

    dispatch(dispatchDetails);
}

export const FormSearchParam = (paramDetails) => {

    let searchParams = {
        "Product": paramDetails
    }
    
    return Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
                                        .join('&');
}

export const SetInProgressMsg = async (loadingMessage) => (dispatch) => {

    return new Promise((resolve, rejects) => {
        return resolve( dispatch({
            type: LOADING,
            payload: {
                LoadingMessage : loadingMessage
            }
        }));
    })
}

export const RemoveInProgressMsg = () => (dispatch) => {
    dispatch({
        type: LOADING,
        payload: {
            LoadingMessage : ""
        }
    })
}