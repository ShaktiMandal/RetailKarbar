import {
    ADDPRODUCT,
    ADD_FAVOURITE_DONE,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_FAILED,
    CLEARPRODUCTLIST,
    LOADING,
    UNAUTHORIZED
} from './ActionTypes';

import fetch from 'node-fetch';
import { CallApI, FormServiceRequest } from './Action';

export const ChooseAddProduct = (props) => (dispatch) =>
{
    dispatch({
        type: ADDPRODUCT
    });
}

export const FetchProductDetails = (requestDetails) => async (dispatch) => {
       
    let response;
    try{
        let fetchRequest = {
            method:'GET',
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json'
            }
        }

        let searchParams = {
            "Product": requestDetails
        }
        
        let query = Object.keys(searchParams).map(
                                                    param => encodeURIComponent(param) + 
                                                    ' = ' + encodeURIComponent(searchParams[param])
                                            )
                                            .join('&');
        dispatch({
            type: CLEARPRODUCTLIST
        });
        
       dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : true
        }
        });
        switch(requestDetails)
        {
            case "OutOfStock":
                {

                    if(process.env.NODE_ENV === 'production')
                    {
                        response = await fetch('/Product/GetOutOfStockProducts', fetchRequest);
                    }
                    else
                    {
                        response = await fetch("http://localhost:5000/Product/GetOutOfStockProducts", fetchRequest);
                    }                    
                    break;
                }
            case "Favourite":
                {
                    if(process.env.NODE_ENV === 'production')
                    {
                        response = await fetch('/Product/GetYourFavourites', fetchRequest);
                    }
                    else
                    {
                        response = await fetch("http://localhost:5000/Product/GetYourFavourites", fetchRequest);
                    } 
                    
                    break;
                }
            default:
                if(process.env.NODE_ENV === 'production')
                {
                    response = await fetch('/Product/FetchProduct?'+ query, fetchRequest);
                }
                else
                {
                    response = await fetch("http://localhost:5000/Product/FetchProduct?" + query, fetchRequest);                
                } 
        }
        dispatch({
            type: LOADING,
            payload: {
                DisplayLoading : false
            }
        }); 
           
        if(response.status === 401)
        {
            dispatch({
                type: UNAUTHORIZED
            })
        }
        let responseData =  await response.json();    
        if(responseData.Success)
        {
            dispatch({
                type: FETCH_PRODUCTS,
                payload: responseData
            })
        }
        else
        {
            dispatch({
                type: FETCH_PRODUCTS_FAILED,
                payload: responseData
            })
        }
    }
    catch(error)
    {
        dispatch({
            type: FETCH_PRODUCTS_FAILED,
            payload: {
                Success: false,
                ErrorMsg: "Unable to fetch product details, Please try again."           
            }
        })
    }    
}

export const UpdateFavouriteProduct = (requestDetails) => async (dispatch) => {

    try{
             
        dispatch({
            type: LOADING,
            payload: {
                DisplayLoading : true
            }
            });

        CallApI('/Product/AddToFavourite', FormServiceRequest('POST', requestDetails))
        .then(response => response.json())
        .then(result => {
            if(result.Success)
            {
                dispatch({
                    type: ADD_FAVOURITE_DONE,
                    payload: result
                });

                CallApI('/Product/GetYourFavourites', FormServiceRequest('GET', {}))
                .then(response => response.json())
                .then(result => {
                    if(result.Success)
                    {
                        dispatch({
                            type: FETCH_PRODUCTS,
                            payload: result
                        })
                    }
                    else
                    {
                        dispatch({
                            type: FETCH_PRODUCTS_FAILED,
                            payload: {
                                Success: false,
                                ErrorMsg: "Unable to fetch product details, Please try again."           
                            }
                        })
                    }
                })
                .catch( error => {
                    dispatch({
                        type: FETCH_PRODUCTS_FAILED,
                        payload: {
                            Success: false,
                            ErrorMsg: "Unable to fetch product details, Please try again."           
                        }
                    })
                })
            }
        })
        .catch(error => {
            dispatch({
                type: FETCH_PRODUCTS_FAILED,
                payload: {
                    Success: false,
                    ErrorMsg: error
                    
                }
            })
        })

       
        dispatch({
            type: LOADING,
            payload: {
                DisplayLoading : false
            }
            });
    }
    catch(error)
    {
        dispatch({
            type: FETCH_PRODUCTS_FAILED,
            payload: {
                Success: false,
                ErrorMsg: "Unable to fetch product details, Please try again."
                
            }
        })
    }  
}

export const ClearProductList = () => async dispatch => {
    dispatch({
        type: CLEARPRODUCTLIST
    })
}