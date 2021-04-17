import {
    ADDPRODUCT,
    ADD_FAVOURITE_DONE,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_FAILED,
    CLEARPRODUCTLIST
} from './ActionTypes';

import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const ChooseAddProduct = (props) => (dispatch) =>
{
    dispatch({
        type: ADDPRODUCT
    });
}

export const FetchProductDetails = (requestDetails) => async (dispatch) => {
      
   
    let fetchUrl = GetUrl(requestDetails);

    SetInProgressMsg("Fetching Products....", dispatch)    
    .then (() =>  CallApI(fetchUrl, FormServiceRequest('GET', {})))       
    .then(response => response.json())
    .then(result => {
        RemoveInProgressMsg(dispatch);
        if(result.Success)
        {
            dispatch({
                type: FETCH_PRODUCTS,
                payload: result
            });
        }
        else
        {
            dispatch({
                type: FETCH_PRODUCTS_FAILED,
                payload: result
            })
        }
    })
    .catch( error => {
        RemoveInProgressMsg(dispatch);
        dispatch({
            type: FETCH_PRODUCTS_FAILED,
            payload: {
                Success: false,
                ErrorMsg: "Unable to fetch product details, Please try again."           
            }
        })
    });
}

export const UpdateFavouriteProduct = (requestDetails) => async (dispatch) => {

    try{

        SetInProgressMsg("Setting Your Favourite....", dispatch)
        .then (() =>  CallApI('/Product/AddToFavourite', FormServiceRequest('POST', requestDetails)))       
        .then(response => response.json())
        .then(result => {
            RemoveInProgressMsg(dispatch);
            if(result.Success)
            {
                dispatch({
                    type: ADD_FAVOURITE_DONE,
                    payload: result
                });

                
                SetInProgressMsg("Fetching Your Favourit....", dispatch)
                .then(() => CallApI('/Product/GetYourFavourites', FormServiceRequest('GET', {})))                
                .then(response => response.json())
                .then(result => {
                    RemoveInProgressMsg(dispatch);
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
                    RemoveInProgressMsg(dispatch);
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
            RemoveInProgressMsg(dispatch);
            dispatch({
                type: FETCH_PRODUCTS_FAILED,
                payload: {
                    Success: false,
                    ErrorMsg: error
                    
                }
            })
        })
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


const GetUrl = (details) => {

    let fetchUrl;
    let searchParams = {
        "Product": details
    }
    
    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
                                        .join('&');
    switch(details)
    {
        case "OutOfStock":
            {
                fetchUrl = '/Product/GetOutOfStockProducts';
                break;
            }
        case "Favourite":
            {
                fetchUrl = '/Product/GetYourFavourites';
                break;
            }
        default:
            {
                fetchUrl = '/Product/FetchProduct?' + query;
                break;
            }
    }
    return fetchUrl;
}