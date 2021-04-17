import {
    GOTCUSTOMERDETAILS,
    GETPURCHASEHISTORY,
    NOCUSTOMERDETAILS,
    CUSTOMERDETAILSERROR,
    PRODUCTRETRIEVINGERROR,
    NOPRODUCTHISTORY,
    ORDERFETCHINGERROR,
    GOTORDERDETAILS,
    NOORDERFOUND,
    RESETORDERHISTORY,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_FAILED,
    LOADING
} from './ActionTypes';
import { CallApI, FormServiceRequest, RemoveInProgressMsg, SetInProgressMsg } from './Action';

export const GetCustomerDetails = (customer) =>async  (dispatch)=> {

    let searchParams = {
        'Customer': customer
    }
    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
                                        .join('&'); 

    SetInProgressMsg("Fetching Customers....", dispatch)
    .then (() =>  CallApI('/Customer/GetCustomers?' + query, FormServiceRequest('GET', {})))       
    .then(response => response.json())
    .then(result => {
        RemoveInProgressMsg(dispatch);
        if(result.Success)
        {
            dispatch({
                type: result.CustomerDetails.length > 0 ?  GOTCUSTOMERDETAILS : NOCUSTOMERDETAILS,
                payload: {
                    CustomerDetails: result.CustomerDetails.length > 0 ? result.CustomerDetails : [],
                    Error: result.Error
                }
            })
        }
        else
        {
            dispatch({
                type: CUSTOMERDETAILSERROR,
                payload: {
                    CustomerDetails: [],
                    Error: result.Error
                }
            })
        }
    })
    .catch(error => {

        RemoveInProgressMsg(dispatch);
        dispatch({
            type: CUSTOMERDETAILSERROR,
            payload: {
                CustomerDetails: [],
                Error: "Unable to find customers, something went wrong. please try after sometime."
            }
        })
    });
}

export const GetProductDetails = (phoneNumber) => async(dispatch) =>{

    let searchParams = {
        'PhoneNumber': phoneNumber
    };

    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
                                        .join('&');     

    SetInProgressMsg("Fetching Products....", dispatch)
    .then (() =>  CallApI('/Customer/GetProducts?' + query, FormServiceRequest('GET', {})))       
    .then(response => response.json())
    .then(result => {
        if(result.Success)
        {
            RemoveInProgressMsg(dispatch);
            dispatch({
                type:  result.productDetails.length > 0 ? GETPURCHASEHISTORY : PRODUCTRETRIEVINGERROR,
                payload: {
                    ProductDetails: result.productDetails.length > 0 ? result.productDetails: [],
                    Error: result.Error
                }
            })
        }
        else
        {
            dispatch({
                type:  NOPRODUCTHISTORY,
                payload: {
                    ProductDetails: [],
                    Error: result.Error
                }
            })
        }
    })
    .catch(error => {

        RemoveInProgressMsg(dispatch);
        dispatch({
            type: NOPRODUCTHISTORY,
            payload: {
                ProductDetails: [],
                Error: "Unable to find products, something went wrong. please try after sometime."
            }
        })
    });
}

export const GetOrderDetails = (customerId) => async dispatch =>{

   
    let searchParams = {
        "CustomerId": customerId
    }
    
    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
    
                                        .join('&');
    
    SetInProgressMsg("Fetching Customer Order....", dispatch)
    .then (() =>  CallApI('/Customer/GetCustomerOrders?' + query, FormServiceRequest('GET', {})))       
    .then(response => response.json())
    .then(result => {
        if(result.Success)
        {
            RemoveInProgressMsg(dispatch);
            dispatch({
                type: result.OrderDetails.length > 0 ?  GOTORDERDETAILS : NOORDERFOUND,
                payload: {
                    OrderDetails: result.OrderDetails.length > 0 ?  
                    result.OrderDetails: [],
                    Error: result.Error
                }
            });
        }
        else
        {
            dispatch({
                type: ORDERFETCHINGERROR,
                payload: {
                    OrderDetails: [],
                    Error: result.Error
                }
            });
        }
    })
    .catch( error => {

        RemoveInProgressMsg(dispatch);
        dispatch({
            type: ORDERFETCHINGERROR,
            payload: {
                OrderDetails: [],
                Error: "Unable to fetch order, something went wrong. Please try after sometime."
            }
        });
       
    });
}

export const GetDueOrders = (orderList, index) => async (dispatch) => {

    dispatch({
        type: GOTORDERDETAILS,
        payload: {
            OrderDetails: orderList.filter( item => {
                if(item.OrderId === orderList[index].OrderId)
                {
                    return item
                }
            }),
            Error: ""
        }
    })
}

export const GetOutOfStockProducts = () => async (dispatch) => {

    SetInProgressMsg("Fetching out of stocks product....", dispatch)
    .then (() =>  CallApI('/Product/GetOutOfStockProducts', FormServiceRequest('GET', {})))       
    .then(response => response.json())
    .then(result => {
        if(result.Success)
        {
            RemoveInProgressMsg(dispatch);
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
            });
        }
    })
    .catch( error => 
    {
        RemoveInProgressMsg(dispatch);
    });
}

export const OnFilterOrderItems = (listOfOrders, searchItem) =>  (dispatch) => {

           
    var filteredLits = listOfOrders.filter(item => {            
        if(item.OrderId.includes(searchItem))
        {
            return item;
        }
    });

    if(searchItem === "")
    {
        filteredLits = listOfOrders;
    }

    dispatch({
        type: GOTORDERDETAILS,
        payload: {
            OrderDetails: filteredLits,
            Error: ""
        }
    });
} 

export const ResetOrderHistory = () => async dispatch => {
    dispatch({
        type: RESETORDERHISTORY
    })
}