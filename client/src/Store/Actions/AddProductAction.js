import {
    ADDPRODUCT_SUCCESSFULLY,
    ADDPRODUCT_FAILED,
    ADD_PRODUCTWINDOW_CLOSED,
    ADDPRODUCT_CLEARERROR,
    ADDPRODUCT_CLEARMSG ,
    FETCH_PRODUCTS  
} from './ActionTypes'
import { CallApI, DispatchAction, FormSearchParam, FormServiceRequest, SetInProgressMsg } from './Action';

export const AddYourProductAsync = (productDetails) => async (dispatch) => {

            CallApI('/Product/AddProduct', FormServiceRequest('POST', productDetails))
            .then( response => response.json())
            .then( result => {
                if(result.Success)
                {
                    CallApI('/Product/FetchProduct?' + FormSearchParam(""), FormServiceRequest('GET', {}))
                    .then(response => response.json())
                    .then(productList => {
                        if(productList)
                        {
                            dispatch({
                                type: FETCH_PRODUCTS,
                                payload: productList
                            });

                            dispatch({
                                type: ADDPRODUCT_SUCCESSFULLY,
                                payload: result,
                                ErrorMsg: ""
                            });
                        }
                    })
                }
                else
                {
                    dispatch({
                        type: ADDPRODUCT_FAILED,
                        payload: result,
                        ErrorMsg: ""
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: ADDPRODUCT_FAILED,
                    payload: {Success : false},
                    ErrorMsg: error
                })
            })
}

export const AddProductOnError = (error) => (dispatch) => {

    dispatch({
        type: ADDPRODUCT_FAILED,
        payload: {
            ErrorMsg : error
        }
    })
};

export const WindowClosed = () => async (dispatch) =>{
    dispatch({
        type: ADD_PRODUCTWINDOW_CLOSED,
        payload: {
            Success: false,
            ErrorMsg: ""
        }
    })
};

export const ClearError = (isError, customerData) => (dispatch) =>{
       
   isError ?  dispatch({
        type: ADDPRODUCT_CLEARERROR           
    })
    : dispatch({
        type: ADDPRODUCT_CLEARMSG
    })
}