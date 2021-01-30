import * as ActionTypes from '../Actions/ActionTypes';


let initialState = {

    CustomerDetails: [],
    ProductDetails: [],
    OrderDetails : [],
    IsAgreedToDelete: false,
    IsEditCustomer: false,
    IsDisplayHistory: false,
    IsCustomerSearched : false,
    IsShowLoading: false,
    Error: ""
}

const CustomerReducer = (state = initialState, action) => {

    let {type, payload} = action;
       
    switch(type)
    {

        case ActionTypes.GOTCUSTOMERDETAILS:
            {
                return{

                    ...state,
                    IsCustomerSearched : true,
                    CustomerDetails: payload.CustomerDetails,
                    Error: ""
                }
                break;
            }
        case ActionTypes.NOCUSTOMERDETAILS:
            {
                return{

                    ...state,
                    IsCustomerSearched: true,
                    CustomerDetails: [],
                    Error: payload.Error
                }
                break;
            }
        case ActionTypes.CUSTOMERDETAILSERROR:
            {
                return{
                    ...state,
                    CustomerDetails: [],
                    Error: payload.Error
                }
                break;
            }
        case ActionTypes.DELETECUSTOMER:
            {
                return{
                    ...state
                }
                break;
            }
        case ActionTypes.GETPURCHASEHISTORY:
            {
                return{
                    ...state
                }
                break;
            }
        case ActionTypes.GOTORDERDETAILS:
            {
                return{
                    ...state,
                    OrderDetails: payload.OrderDetails,
                    Error : payload.Error
                }
                break;
            }
            case ActionTypes.NOORDERFOUND:
                {
                    return{
                        ...state,
                        OrderDetails: [],
                        Error: payload.Error
                    }
                    break;
                }
            case ActionTypes.ORDERFETCHINGERROR:
                {
                    return{
                        ...state,
                        OrderDetails: [],
                        Error: payload.Error
                    }
                    break;
                }
            case ActionTypes.RESETORDERHISTORY:
                {
                    return{
                        ...state,                        
                        ProductDetails: [],
                        OrderDetails : [],
                        IsAgreedToDelete: false,
                        IsEditCustomer: false,
                        IsDisplayHistory: false,
                        Error: ""
                    }
                    break;
                }
            case ActionTypes.LOADING:
                {    
                               
                        return {
                            ...state,
                            IsShowLoading : payload.DisplayLoading,
                            ErrorMsg: ""
                        }
                        break;
                }
        default:
           return state;
    }
}

export default CustomerReducer;