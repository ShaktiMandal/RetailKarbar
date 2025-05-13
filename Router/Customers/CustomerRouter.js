import express from 'express';
import cors from "cors";
import Customer from "../../Model/CustomersModel/CustomerDeatils.js";
import CustomerPurchase from "../../Model/CustomersModel/CustomerPurchase.js";
import OrderDetails from "../../Model/OrderModel/OrderModel.js";

const router = express.Router();

router.post('/AddCustomer', (req, res, next) => {

    console.log("In Service 2", req.body);
    Customer.findOne({PhoneNumber: req.body.PhoneNumber})
            .then( result => {
                if(result)
                {
                    res.status(200).send({
                        Success: true,
                        response: result,
                        error: "Customer already exists"                        
                    })
                }
                else{

                    let customerData = new Customer({
                        CustomerName: req.body.CustomerName,
                        PhoneNumber: req.body.PhoneNumber,
                        CustomerId: req.body.CustomerId
                    });

                    customerData.save()
                                .then(result => {
                                    if(result)
                                    {
                                        res.status(200).send({
                                            Success: true,
                                            response: result,
                                            error: ""                        
                                        })
                                    }
                                    else{
                                        res.status(404).send({
                                            Success: false,
                                            response: result,
                                            error: "Unable to save the customer"                        
                                        })
                                    }
                                })
                                .catch(error => {
                                    console.log("there is an error", error);
                                    res.status(404).send({
                                        Success: false,                                     
                                        error: "There is a problem while saving the customer, Please try again after sometime."                        
                                    })
                                })
                }
            })
            .catch(error => {
                console.log("there is an error1", error);
                res.status(404).send({
                    Success: false,                                     
                    error: "There is a problem while saving the customer, Please try again after sometime."                        
                })
            })
});

router.post('/SaveCustomerOrder', (req,res,next) =>{
    
    let {
        CustomerId, 
        OrderId, 
        DueAmount, 
        PaidAmount, 
        PaymentType, 
        CustomerOrder,
        IsDealer
    } = req.body;

    let SaveCustomerOrder = new CustomerPurchase({
        CustomerId: CustomerId,
        OrderId: OrderId,
        TotalDueAmount:DueAmount,
        TotalPaidAmount: PaidAmount,
        PaymentType:PaymentType,
        IsDealer: IsDealer
    });    

    SaveCustomerOrder.save()
                 .then(result => {
                     if(result)
                     {                                         
                        let Order = new OrderDetails({
                            OrderId: OrderId,
                            DueAmount: DueAmount,
                            PaidAmount: PaidAmount,
                            Orders : CustomerOrder.CustomerOrders
                        });

                        Order.save()
                            .then(result => {                              
                                if(result)
                                {
                                    res.status(200).send({
                                        Success: true,
                                        error: ""
                                    });
                                }
                                else
                                {
                                    res.status(200).send({
                                        Success: false,
                                        error: "Something went wrong while saving order details."
                                    });
                                }                                          
                            })
                            .catch( error => {
                                res.status(404).send({
                                    Success: false,
                                    error: error
                                })
                            })               
                     }
                     else{
                        res.status(200).send({
                            Success: false,
                            error: "Something went wrong while saving order details."
                        })
                     }
                 })
                 .catch( error => {                  
                    res.status(404).send({
                        Success: false,
                        error: error
                    })
                 })
});

router.get('/GetCustomers', (req,res,next) => {

    let requestParam = {};
    for (const key in req.query) {
        requestParam[key.trim()] = req.query[key].trim();
    }

    Customer.find({CustomerName: {$regex : new RegExp(requestParam.Customer)}})
            .then(result => {
                if(result)
                {
                    res.status(200).send({  
                        Success: true,                      
                        CustomerDetails: result,  
                        Error: ""                      
                    });
                }
                else{
                    res.status(200).send({ 
                        Success: false,                       
                        CustomerDetails: [], 
                        Error: 'There is no customer found. Please add the customer'                       
                    });
                }
            })
            .catch(error => {
                res.status(200).send({       
                    Success: false,                 
                    CustomerDetails: [],  
                    Error: 'Unable to retrieve customer details'                      
                });
            })

});

router.get('/GetProducts/', (req,res,next) =>{

    let {PhoneNumber} = req.body;

    console.log("Search criteria", req.param);
    
    CustomerPurchase.find({'Customer.PhoneNumber': "1232132123"})
                    .then( result => {
                        console.log(result);
                        res.status(200).send({
                            PurchaseDetails: result,
                            Error: ""
                        })
                    })
                    .catch(error => {
                        //console.log("Error", error);
                    })
})

router.get('/GetCustomerOrders', (req,res,next) => {
    
    let requestParam = {};
    for (const key in req.query) {
        requestParam[key.trim()] = req.query[key].trim();
    }
    
    CustomerPurchase.find({CustomerId: requestParam.CustomerId})
                    .then(result => {
                            if(result)
                            {             
                                let orderIds = result.map( item => item.OrderId );                           
                                
                                OrderDetails.find({OrderId: {$in: orderIds}})
                                            .then( result => {
                                                
                                                res.status(200).send({
                                                    Success: true,
                                                    OrderDetails: result,
                                                    Error: ""
                                                })
                                            })
                                            .catch(error => {
                                                res.status(200).send({
                                                    Success: false,
                                                    OrderDetails: [],
                                                    Error: error
                                                })
                                            })

                            }
                            else
                            {
                                res.status(200).send({   
                                    Success: false,                     
                                    CustomerDetails: [], 
                                    Error: 'There is no order placed fot this customer.'                       
                                });
                        }
                    })                   
                    .catch( error => {
                        res.status(404).send({
                            Success: false,
                            CustomerDetails: [], 
                            Error: 'There is something wrong, please try after sometimes.' 
                        })
                    })
    

})

router.put('/UpdateDuePayment', (req,res,next) => {

    let paymentOrderDetails = req.body;
    let result = paymentOrderDetails.map( item=> {

        return OrderDetails.updateOne(
                                {OrderId: {$in: item.OrderId}},
                                {$set: {
                                    PaidAmount : item.PaidAmount,
                                    DueAmount: item.DueAmount                                    
                                }}
                           )
    });

    Promise.all(result)
           .then(result => {             
               if(result.length > 0)
               {
                   res.status(200).send({
                       Success: true,
                       Error: ""
                   });
               }
               else
               {
                    res.status(200).send({
                        Success: false,
                        Error: "Unable to update the paid amount. Please try again after sometime."
                    });
               }
           })
           .catch(error => {
                res.status(400).send({
                    Success: false,
                    Error: error
                });
           });

})

export default router;