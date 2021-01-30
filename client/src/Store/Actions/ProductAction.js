import {
    ADDPRODUCT,
    ADD_FAVOURITE_DONE,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_FAILED,
    CLEARPRODUCTLIST,
    LOADING,
    UNAUTHORIZED
} from './ActionTypes';
import {SetLoading} from './CommonActions';

import fetch from 'node-fetch';

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
                    response = await fetch("http://localhost:5000/Product/GetOutOfStockProducts", fetchRequest);
                    break;
                }
            case "Favourite":
                {
                    response = await fetch("http://localhost:5000/Product/GetYourFavourites", fetchRequest);
                    break;
                }
            default:
                response = await fetch("http://localhost:5000/Product/FetchProduct?" + query, fetchRequest);                
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
        let fetchRequest ={
            method:'POST',
            credentials: 'include',
            headers: { 
                'Accept' : 'application/json, text/plain',
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestDetails)
        }        
        dispatch({
            type: LOADING,
            payload: {
                DisplayLoading : true
            }
            });
        let response = await fetch("http://localhost:5000/Product/AddToFavourite", fetchRequest);      
        let responseData =  await response.json(); 
        dispatch({
            type: LOADING,
            payload: {
                DisplayLoading : false
            }
            });
        if(responseData.Success)
        {
            dispatch({
                type: ADD_FAVOURITE_DONE,
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

export const ClearProductList = () => dispatch => {
    dispatch({
        type: CLEARPRODUCTLIST
    })
}