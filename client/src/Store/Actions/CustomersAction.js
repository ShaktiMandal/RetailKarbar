import fetch from 'node-fetch';
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
} from './ActionTypes'
import { json } from 'body-parser';

export const GetCustomerDetails = (customer) =>async  (dispatch)=> {

    let request = {

        method: "GET",
        credentials: 'include',
        headers:{

            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
        }
    };

    console.log("Selected customer", customer);

    let searchParams = {
        'Customer': customer
    }
    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
                                        .join('&'); 

    dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : true
        }
    });
    const response = await fetch("http://localhost:5000/Customer/GetCustomers?" + query, request);
    const responseData = await response.json();
    dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : false
        }
    });
    if(responseData.Error.length === 0)
    {
        dispatch({
            type: responseData.CustomerDetails.length > 0 ?  GOTCUSTOMERDETAILS : NOCUSTOMERDETAILS,
            payload: {
                CustomerDetails: responseData.CustomerDetails.length > 0 ? responseData.CustomerDetails : [],
                Error: responseData.Error
            }
        })
    }
    else{

        dispatch({
            type: CUSTOMERDETAILSERROR,
            payload: {
                CustomerDetails: [],
                Error: responseData.Error
            }
        })
    }
}

export const DeleteCustomer = () => (dispatch) =>{

}

export const GetProductDetails = (phoneNumber) => async(dispatch) =>{

    let request = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept'      : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
        }
    };
    
    console.log("Request Data", request);

    var url = new URL('http://localhost:5000/Customer/GetProducts');
    url.SearchParams({
        PhoneNumber: phoneNumber
    });
    // const response = await fetch('http://localhost:5000/Customer/GetProducts/' + phoneNumber, request);

    const response = await fetch(url);
    //  const response = await fetch(url , request);
    const responseData = await response.json();

    if(responseData.Error.length === 0)
    {
        dispatch({
            type:  responseData.productDetails.length > 0 ? GETPURCHASEHISTORY : PRODUCTRETRIEVINGERROR,
            payload: {
                ProductDetails: responseData.productDetails.length > 0 ? responseData.productDetails: [],
                Error: responseData.Error
            }
        })
    }
    else{
            dispatch({
                type:  NOPRODUCTHISTORY,
                payload: {
                    ProductDetails: [],
                    Error: responseData.Error
                }
            })
    }    
}

export const GetOrderDetails = (customerId) => async dispatch =>{

    let request = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept'      : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
        }
    };

    let searchParams = {
        "CustomerId": customerId
    }
    
    let query = Object.keys(searchParams).map(
                                                param => encodeURIComponent(param) + 
                                                ' = ' + encodeURIComponent(searchParams[param])
                                        )
    
                                        .join('&');
        
    dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : true
        }
        });
    const response = await fetch("http://localhost:5000/Customer/GetCustomerOrders?" + query, request);
    const responseData = await response.json();
       
    dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : false
        }
        });

    if(responseData.Error.length === 0)
    {
        dispatch({
            type: responseData.OrderDetails.length > 0 ?  GOTORDERDETAILS : NOORDERFOUND,
            payload: {
                OrderDetails: responseData.OrderDetails.length > 0 ?  
                responseData.OrderDetails: [],
                Error: responseData.Error
            }
        })
    }
    else{

        dispatch({
            type: ORDERFETCHINGERROR,
            payload: {
                OrderDetails: [],
                Error: responseData.Error
            }
        })
    }
}

export const GetDueOrders = (orderList, index) => (dispatch) => {

       
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

    let request = {
        method: "GET",
        credentials: 'include',
        headers:{

            'Accept' : 'application/json, text/plain',
            'content-type': 'application/json',
            'Authorization': null
        }
    };

    const response = await fetch("http://localhost:5000/Product/GetOutOfStockProducts", request);
    const responseData = await response.json();

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