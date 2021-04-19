import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {

    CustomerDetails : {
        CustomerName : "",
        PhoneNumber  : "",
        CustomerId: "",
        DueAmount: 0.00,
        IsCustomerCreated: false
    },

    OrderDetails: {
        OrderId:"",
        CustomerId: "",
        CustomerType: "",
        PaymentType: "",
        PaidAmount: 0.00,
        DebtAmount: 0.00,
        CustomerOrders: {}
    },

    DealerDetails:
    {
        CompanyName: "",
        DealerName: "",
        PhoneNumber: "",
        DealerId:"",
        IsDealerCreated: false
    },

    ErrorOnAddCustomer : "",
    ErrorOnAddDealer : "",
    ErrorOnPayment: "",
    InformationMessage : "",
    Success: false    
}


const CustomerDetailsReducer = (state = initialState, action) =>{

    const {type, payload} = action;

    switch(type)
    {
        case ActionTypes.ADDCUSTOMER_SUCCESSFULLY:
            {
                return{
                    ...state,
                    CustomerDetails: {
                        CustomerName: payload.CustomerDetails.CustomerName,
                        PhoneNumber: payload.CustomerDetails.PhoneNumber,
                        CustomerId: payload.CustomerDetails.CustomerId,
                        IsCustomerCreated: true
                    },     
                    InformationMessage : "Customer added successfully",               
                    ErrorOnAddCustomer: "",
                    ErrorOnPayment : ""
                }
                break;
            }
        case ActionTypes.ADDCUSTOMER_FAILED:
            {
                return{
                    ...state,
                    ErrorOnAddCustomer: payload.ErrorMsg,
                    ErrorOnPayment : ""
                }
                break;
            }
        case ActionTypes.PAYMENTFAILED:
            {
                return{
                    ...state,
                    ErrorOnAddCustomer: "",
                    ErrorOnPayment : payload.ErrorMsg
                }
                break;
            }
        case ActionTypes.EXISTINGCUSTOMER:
            {
                   
                return{
                    ...state,
                    CustomerDetails: {
                        CustomerName: payload.CustomerDetails.CustomerName,
                        PhoneNumber: payload.CustomerDetails.PhoneNumber,
                        CustomerId: payload.CustomerDetails.CustomerId,
                        IsCustomerCreated: true
                    }, 
                    ErrorOnAddCustomer: payload.ErrorMsg,
                    ErrorOnPayment : ""
                }
                break;
            }        
        case ActionTypes.CLEARERROR:
            {         
                          
                return{
                    ...state,
                    CustomerDetails : {
                            CustomerName: payload.CustomerDetails.CustomerName,
                            PhoneNumber: payload.CustomerDetails.PhoneNumber,
                            CustomerId: payload.CustomerDetails.CustomerId,
                            IsCustomerCreated: payload.CustomerDetails.IsCustomerCreated,
                            DueAmount: payload.CustomerDetails.DueAmount
                        },
                    DealerDetails:
                        {
                            CompanyName: payload.DealerDetails.CompanyName,
                            DealerName: payload.DealerDetails.DealerName,
                            PhoneNumber: payload.DealerDetails.PhoneNumber,
                            DealerId:payload.DealerDetails.DealerId,
                            IsDealerCreated: false
                        },
                    ErrorOnAddCustomer: "",
                    ErrorOnAddDealer : "",
                    InformationMessage: ""
                }
                break;
            }
        case ActionTypes.CLEARMSG:
            {
                   
                return {
                    ...state,
                    CustomerDetails : {
                        CustomerName: payload.CustomerDetails.CustomerName,
                        PhoneNumber: payload.CustomerDetails.PhoneNumber,
                        CustomerId: payload.CustomerDetails.CustomerId,
                        IsCustomerCreated: payload.CustomerDetails.IsCustomerCreated
                    },
                    ErrorOnAddCustomer: "",
                    InformationMessage:""
                }
            }
        case ActionTypes.PLACEDORDERS:
            {
                return{
                    ...state,
                    OrderDetails : 
                    {
                        OrderId: payload.OrderId,
                        CustomerId: state.CustomerDetails.CustomerId,
                        CustomerType: "",
                        PaymentType: "",  
                        GivenAmount: state.OrderDetails.PaidAmount,
                        ChangeAmount: state.OrderDetails.DebtAmount,                     
                        CustomerOrders: payload.CustomerOrder
                    },                    
                    TotalPaybleAmount: payload.TotalPaybleAmount,
                }
                break;
            }
        case ActionTypes.RESETTRANSACTIONDETAILS:
            {
                   
               return {                
                ...state,
                CustomerDetails : {
                    CustomerName : "",
                    PhoneNumber  : "",
                    CustomerId: "",
                    DueAmount: 0.00,
                    IsCustomerCreated: false
                },
                DealerDetails:
                {
                    CompanyName: "",
                    DealerName: "",
                    PhoneNumber: "",
                    DealerId:"",
                    IsDealerCreated: false
                },
                TotalPaybleAmount :0.00,
                ErrorOnAddCustomer : "",
                ErrorOnAddDealer : "",
                InformationMessage : "",
                ErrorOnPayment  : "",
                Success: false    
               }
            }
        case ActionTypes.ADDDEALER:
        {
               
            return {
            
                ...state,
                DealerDetails: {
                    CompanyName: payload.DealerDetails.CompanyName,
                    DealerName: payload.DealerDetails.DealerName,
                    PhoneNumber: payload.DealerDetails.PhoneNumebr,
                    DealerId: payload.DealerDetails.DealerId,
                    IsCustomerCreated: true
                },     
                InformationMessage : "Dealer added successfully",               
                ErrorOnAddDealer: "",
                ErrorOnPayment : ""
            }
        }
        case ActionTypes.ADDDEALERFAILED:
        {
               
            return {
            
                ...state,                   
                InformationMessage : "",               
                ErrorOnAddDealer: payload.ErrorMsg,
                ErrorOnPayment : ""
            }
        }
        case ActionTypes.EXISTINGDEALER:
            {
                   
                return{
                    ...state,
                    DealerDetails: {
                        CompanyName: payload.DealerDetails.CompanyName,
                        DealerName: payload.DealerDetails.DealerName,
                        PhoneNumber: payload.DealerDetails.PhoneNumebr,
                        DealerId: payload.DealerDetails.DealerId,
                        IsCustomerCreated: true
                    }, 
                    ErrorOnAddDealer: payload.ErrorMsg,
                    InformationMessage: "",
                    ErrorOnPayment : ""
                }
                break;
            }
        default:
            return state;
    }
}

export default CustomerDetailsReducer;