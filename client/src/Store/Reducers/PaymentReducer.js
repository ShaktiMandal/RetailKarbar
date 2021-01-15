import * as ActionTypes from '../Actions/ActionTypes';

const initialState = {

    PaymentDetails: {       
        PaymentType:"Cash",
        GivenAmount: 0.00,
        ChangeAmount: 0.00,
        CardMemberName: "",
        CardNumber : "",
        CVVNumber: "",
        ExpairyDate: "",
        IsPaymentSuccessful: false
    },
    TotalPaybleAmount :0.00,   
    ErrorOnPayment  : "",
    Success: false    
}

const PaymentReducer = (state = initialState, action ) => {

    const {type, payload} = action;

    switch(type)
    {
        case ActionTypes.PAYMENT_SUCCESSFULLY:
            {
                debugger;
                return{
                    ...state,
                    Success: payload.Success,
                    ErrorOnAddCustomer: "",
                    ErrorOnPayment : "",
                }
                break;
        }
        case ActionTypes.CASHPAYMENT:
        {

            return{
                ...state,
                Success: payload.Success,
                PaymentDetails: payload.PaymentDetails,
                ErrorOnAddCustomer: "",
                ErrorOnPayment : ""
            }
            break;
        }
        case ActionTypes.CARDPAYMENT:
        {
            return{
                ...state,
                Success: payload.Success,
                PaymentDetails: payload.PaymentDetails,
                ErrorOnAddCustomer: "",
                ErrorOnPayment : ""
            }
            break;
        }
        case ActionTypes.VALIDATION_ERROR:
            {
                debugger;
                return {
                    ...state,
                    ErrorOnPayment: payload.Error
                }
                break;
            }
        case ActionTypes.PAYMENTFAILED:
            {
                return{
                    ...state,
                    Success: false,
                    PaymentDetails: {       
                        PaymentType:"Cash",
                        GivenAmount: 0.00,
                        ChangeAmount: 0.00,
                        CardMemberName: "",
                        CardNumber : "",
                        CVVNumber: "",
                        ExpairyDate: "",
                        IsPaymentSuccessful: false
                    },
                    ErrorOnPayment: payload.Error
                }
                break;
        }
        case ActionTypes.RESETPAYMENTDETAILS:
        {
            return{
                ...state,
                PaymentDetails: {       
                    PaymentType:"Cash",
                    GivenAmount: 0.00,
                    ChangeAmount: 0.00,
                    CardMemberName: "",
                    CardNumber : "",
                    CVVNumber: "",
                    ExpairyDate: "",
                    IsPaymentSuccessful: false
                },
                TotalPaybleAmount :0.00,   
                ErrorOnPayment  : "",
                Success: false
            }
            break;
        }
        default:
            return state;
    }

}

export default PaymentReducer;