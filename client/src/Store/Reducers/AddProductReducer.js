import {
    ADDPRODUCT_SUCCESSFULLY,
    ADDPRODUCT_FAILED, 
    ADD_PRODUCTWINDOW_CLOSED,
    ADDPRODUCT_CLEARMSG,
    ADDPRODUCT_CLEARERROR
    
} from '../Actions/ActionTypes';
import {GetCurrentDate} from '../../Helper';

let initialState = {

    ProductDetails:{
        ProductName:"",
        Price: "",
        Stock: "",
        Manufacturer: "",
        IsFavourite: false,
        ExpairyDate: GetCurrentDate()
    },
    IsProdAddedSuccessfully : false,
    InformationMessage : "",
    AddOnError: ""
}

const AddProductReducer = (state = initialState, action) =>{

    const {type, payload} = action;
    switch(type)
    {        
        case ADDPRODUCT_SUCCESSFULLY:
            {
                return{
                    ...state,
                    ProductDetails: {
                        ProductName:"",
                        Price: "",
                        Stock: "",
                        Manufacturer: "",
                        ExpairyDate: new Date("<YYYY-mm-dd>")
                    },
                    IsProdAddedSuccessfully: payload.Success,
                    InformationMessage: "Product Succeddfully added",
                    AddOnError: ""               
                }
            }
            break;
        case ADDPRODUCT_FAILED:
            {
                return{
                    ...state,
                    AddOnError: payload.ErrorMsg              
                }
            }
            break;
        case ADD_PRODUCTWINDOW_CLOSED:
            {
                return{
                    ...state,
                    AddOnError: ""
                }
            }
        case ADDPRODUCT_CLEARMSG:
            {
                return{
                    ...state,
                    AddOnError: "",                   
                    InformationMessage: ""
                }
            }
        case ADDPRODUCT_CLEARERROR:
            {
                return{
                    ...state,
                    AddOnError: "",
                    InformationMessage: ""
                }
            }
        default:
            {
                return state;
            }
    }
};

export default AddProductReducer;
