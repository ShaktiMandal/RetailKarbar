import {GetCurrentDate} from '../Helper';
const Validator = (function(){
    'user strict'

    var errorMessage = "";
    const UserIdValidation = function(data){
      
        this.ClearErrors();
        var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


        if(data.UserId === "" && data.Passcode === "")
        {
            errorMessage = "Invalid user details";
            return;
        }
        
        if(data.UserId.length !== 10)
        {
            errorMessage = "Please enter a valid mobile number";
            return;
        }

        if(data.Passcode.length < 6)
        {
            errorMessage = "Passcode should be more than 6 digits";
            return;
        }
    };

    const OnValidateResetPassword = (data) =>{
           
           
        ClearErrors();

        if(data.UserId === "" 
        ||  data.ConfPasscode === "" 
        || data.Passcode === "")
        {
            errorMessage = "Invalid user details";
            return;
        }

        if(data.UserId.length !== 10)
        {
            errorMessage = "Please enter a valid mobile number";
            return;
        }

        if(data.Passcode.length < 6)
        {
            errorMessage = "Passcode should be more than 6 digits";
            return;
        }

        if(data.ConfPasscode !== data.Passcode)
        {
            errorMessage = "Both Passcode should be same";
            return;
        }
    }

    const ProductValidation = function(data)
    {
        ClearErrors();  
           
        const {ProductName, Price, Stock, Manufacturer, ExpairyDate} = data;

        if(ProductName === "" 
        || Price === "" 
        || Stock === "" 
        || Manufacturer === ""
        || ExpairyDate === null
        || ExpairyDate === undefined
        )
        {
            errorMessage = "Please enter valid details";
            return;
        }
       
        if(ExpairyDate.split('-').join('') <= GetCurrentDate().split('-').join(''))
        {
            errorMessage = "Expairy date can not be past date";
            return;
        }
    }

    const CustomerValidation = function(customerDetails, orderDetails)
    {
           
        this.ClearErrors();
        const {OrderId} = orderDetails;
        const {CustomerName, PhoneNumber } = customerDetails;

        if( OrderId.length === 0 )
        {
            errorMessage = "Please place the order before payment";
            return;
        }

        if(CustomerName.length === 0 || PhoneNumber.length === 0)
        {
            errorMessage = "Please enter customer details";
            return;
        }

        if(CustomerName.length < 3)
        {
            errorMessage = "Customer name should more 3 digits";
            return
        }
        
        if(PhoneNumber.length !== 10)
        {
            errorMessage = "Please enter valid phone number";
            return;
        }
    }

    const DealerValidation = function(dealerDetails, orderDetails)
    {
           
        this.ClearErrors();
        const {OrderId} = orderDetails;
        const {CompanyName, DealerName, PhoneNumber } = dealerDetails;

        if( OrderId.length === 0 )
        {
            errorMessage = "Please place an order for the dealer first";
            return;
        }

        if(CompanyName.length === 0 
            || DealerName.length === 0
            || PhoneNumber.length === 0
            )
        {
            errorMessage = "Please enter valid dealer details";
            return;
        }

        if(CompanyName.length  < 4)
        {
            errorMessage = "Company name should be more than 4 digits";
            return;
        }

        if( DealerName.length < 4)
        {
            errorMessage = "Dealer name should be more than 4 digits";
            return;
        }

        if(PhoneNumber.length !== 10)
        {
            errorMessage = "Please enter valid phone number";
            return;
        }
    }

    const PaymentDetailsValidation = function(transactionDetails, paymentDetails, orderDetails){

           
        this.ClearErrors();
        if(transactionDetails.CustomerId.length === 0)
        {
            errorMessage = "Please create customer/dealer first";
            return;
        }

        if(paymentDetails.GivenAmount === 0 
            ||paymentDetails.GivenAmount === 0.00 ||
            paymentDetails.GivenAmount === undefined )
            {
                errorMessage = "Please enter given amount";
            }

        if(orderDetails.PaidAmount === 0 || orderDetails.PaidAmount === 0.00)
        {
            errorMessage = "There was not order has been placed, please place the order first";
            return;
        }
    }

    const DuePaymentValidation = function(transactionDetails){

           
        this.ClearErrors();
        if(transactionDetails.DueOrders.length === 0)
        {
            errorMessage = "There is no order to pay";
            return;
        }      

        if(transactionDetails.GivenAmount === 0 
            ||transactionDetails.GivenAmount === 0.00 ||
            transactionDetails.GivenAmount === undefined )
            {
                errorMessage = "Please enter payment details";
            }
    }

    const ClearErrors = () =>
    {
        errorMessage = "";
    }

    function GetErros() {
        return errorMessage;
    }

    return  {
        FromValidation : OnValidateResetPassword,
        UserIdValidation : UserIdValidation,
        ProductValidation : ProductValidation,
        CustomerValidation: CustomerValidation,
        PaymentDetailsValidation: PaymentDetailsValidation,
        DealerValidation: DealerValidation,
        DuePaymentValidation: DuePaymentValidation,
        ClearErrors : ClearErrors,
        GetErrors: GetErros
    }
})();

export default Validator;