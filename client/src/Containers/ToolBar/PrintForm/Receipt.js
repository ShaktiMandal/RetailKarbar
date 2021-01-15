import React from 'react';
import classes from './Receipt.module.css'

const Receipt = (props) => {    
    debugger;
    return (
        <React.Fragment>
            <div id={props.id} ref={props.reference} className ={classes.PrintContainer}>
                <div className={classes.Header}>
                    <div><h2>{props.CustomerDetails.CustomerName}</h2></div>
                    <div><h2>{props.CustomerDetails.PhoneNumber}</h2></div>
                </div>
                <div className={classes.OrderIdDetails}>
                    <div><h2>Order Id</h2></div>
                    <div><h2>{props.OrderDetails.OrderId}</h2></div>
                </div>
                <div className={classes.CashDetails}>
                    <div><h2>Pay : {props.PaymentDetails.GivenAmount}</h2></div>
                    <div><h2>Due : {props.PaymentDetails.ChangeAmount}</h2></div>
                </div>
                <div className={classes.OrderList}>
                    <ul className={classes.OrderItemUl}>
                            {                               
                                props.OrderDetails.CustomerOrders.map(order => {
                                    return(
                                        <li className = {classes.OrderItem}>
                                            <div className = {classes.OrderItemContainer}>
                                                <div>
                                                    {order.ProductName}
                                                </div>
                                                <div>
                                                    {order.Price}
                                                </div>
                                                <div>
                                                    {order.ItemCount}
                                                </div>
                                            </div>                                                                
                                        </li>
                                    )                                                        
                                } )
                            }
                    </ul>
                </div>
                <div className={classes.Footer}>
                    <h2>Thank You! Waiting For Your Next Visit</h2>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Receipt;