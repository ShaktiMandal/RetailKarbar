import {
    ORDERPRODUCT_SUCCESSFULLY,
    ORDERPRODUCT_FAILED,
    DISPLAYORDERITEM,
    REMOVEPRODUCTFROMCART,
    CLEARORDERLIST
} from '../Actions/ActionTypes';

const InitialState = {    
    OrderItems: [],
    TotalPrice: 0.00,
    NoOfProducts: 0,
    OrderError: "",
    IsCartItemDispayed: false
};

const OrderReducer = (state=InitialState, action) =>{

    const {type, payload} = action;

    switch(type)
    {
        case REMOVEPRODUCTFROMCART:
        case ORDERPRODUCT_SUCCESSFULLY:
            {  
                return {
                    ...state,
                    OrderItems: payload.OrderList,   
                    TotalPrice: payload.TotalAmount,  
                    NoOfProducts: payload.NoOfProducts,             
                    OrderError: ""
                }
                break;
            }
        case ORDERPRODUCT_FAILED:
            {
                return {
                    ...state,
                    TotalPrice: 0.00,
                    OrderItems: [],
                    OrderError: "Unable to place an order. Please try after some time."
                }
                break;
            }
        case DISPLAYORDERITEM:
            {
                   
                return{
                    ...state,
                    IsCartItemDispayed: true
                }
            }
        case CLEARORDERLIST:
            {
                   
                return{
                    ...state,
                    OrderItems: [],
                    TotalPrice: 0.00,
                    NoOfProducts: 0,
                    OrderError: "",
                    IsCartItemDispayed: false
                }
            }
        default:
            return state;
    }
}

export default OrderReducer;