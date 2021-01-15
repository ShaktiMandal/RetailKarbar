import React from "react";
import Aux from '../../../HOC/Auxiliary';
import Button from '../../ToolBar/Button/button';
import OrderItem from '../../ToolBar/ProductList/OrderItem';
import classes from './PurchaseHistory.module.css'
import Input from "../../ToolBar/Input/Input";

const PurchaseHistory = (props) => {

    return(
        <Aux>
            <div className={classes.PurchaseHistoryDiv}>
            {
                <ul className={classes.UlOrderDetails}>
                    {
                        props.PurchaseDetails.map( (item, index) => {
                            return(
                                    <li 
                                    key  = {index}
                                    className={classes.liOrderDetails}>
                                        <OrderItem                                           
                                        ProductName = {item.ProductName}
                                        StockCount  = {item.StockCount}
                                        ProductPrice = {item.ProductPrice} 
                                        EditContent = ""
                                        DelContent = "" 
                                        ItemCount = {item.StockCount} 
                                       />                                     
                                    </li> 
                                );      
                            }
                        )
                    }
                </ul>
            }
           <div className={classes.logInBtn}>
                <Button 
                Value="Close"
                OnClick = {props.OnClose} 
                ButtonType = "button"
                ButtonStyle ={{     
                    width: "100%",                         
                    border: "none",
                    outline: "none",
                    height: 35,
                    color: "white",
                    fontSize: 20,
                    backgroundColor: "lightseagreen",
                    textAlign: "center",
                    userSelect: "none"
                }}></Button>
            </div> 
            </div>           
        </Aux>
    )
}

export default PurchaseHistory;