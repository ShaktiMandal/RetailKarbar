import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {

    ProductList: [],
    IsProductSearched: false,
    IsFavouriteAdded: false,
    IsUserAuthenticated: false,
    IsShowLoading: false,
    IsUserUnAuthorized : false,
    ErrorMsg: ""
}

const ProductReducer = (state = initialState, action) =>{

    const {type, payload} = action;
    switch(type)
    {
       case ActionTypes.ADDPRODUCT:
           {            
                return {
                    ...state,
                    IsUserAuthenticated : true,
                    ErrorMsg: ""
                }
                break;
           }
        
        case ActionTypes.ADDPRODUCT_ERROR:
            {
                return {
                    ...state,
                    IsUserAuthenticated : false,
                    ErrorMsg: payload.ErrorMsg
                }
            }
        case ActionTypes.FETCH_PRODUCTS:
            {
                   
                return {
                    ...state,
                    IsProductSearched: true,
                    ProductList: payload.ProductList
                }
                break;
            }
        case ActionTypes.ADD_FAVOURITE_DONE:
            {
                   
                return {
                    ...state,
                    IsFavouriteAdded: payload.Success,
                    // ProductList: payload.ProductList
                }
                break;
            }
        case ActionTypes.CLEARPRODUCTLIST:
            {
                return {
                    ...state,
                    IsProductSearched: false,
                    IsFavouriteAdded: false,
                    IsUserAuthenticated: false,
                    IsShowLoading: false,
                    ProductList: [],
                    ErrorMessage: ""
                }
                break;
            }
        case ActionTypes.FETCH_PRODUCTS_FAILED:
            {
                return {
                    ...state,
                    IsProductSearched : true,
                    ProductList: []
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

            case ActionTypes.UNAUTHORIZED:
            {    
                           
                    return {
                        ...state,
                        IsUserUnAuthorized: true,
                        ErrorMsg: ""
                    }
                    break;
            }
        default:
            return state;
    }
}

export default ProductReducer;