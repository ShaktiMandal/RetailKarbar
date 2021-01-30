import React from 'react';
import {Component} from 'react'
import classes from './Order.module.css';
import Aux from '../../HOC/Auxiliary';
import {connect} from 'react-redux';
import {WithRouter} from 'react-router';
import PropTypes from 'prop-types';
import CustomerResult from '../Customer/CustomerSearchResult';
import OrderImg from '../../Assests/Logo/Order-report.png';
import ErrorBox from '../../Containers/ToolBar/Error/Error';
import ExpandIcon  from '../../Assests/Logo/expand-Icon.png';
import CloseButton from "../../Containers/ToolBar/FormCloseButton/FormCloseButton";
import ProductNotFound from '../../Assests/Logo/Page_not_found_404.jpg';
import NotFoundMessage from '../../Containers/ToolBar/MessageBox/NotFoundMessage';


const CustomerOrderList = (props) => {

    var ErrorContainer = props.ErrorMsg.length === 0 ? null :
                        <div className={classes.ErrorDiv}>
                            <ErrorBox CloseErrorPanel = {props.OnCloseErrorPanel}  ErrorMsg={props.ErrorMsg}/>      
                        </div>
    return(
        <Aux>
            <div className={classes.rightDiv}> 
                {ErrorContainer}                    
                <div className={classes.CloseBtnDiv}>
                    <CloseButton OnCloseClick ={props.OnCloseClick}/>      
                </div>                          
                <div className={classes.OrderList}> 
                    <div className= {classes.OrderSearchArea}>
                        <input 
                        onChange = {props.OnOrderSearch}
                        type="text" 
                        placeholder="Enter Order Id"/>
                    </div>
                    {
                        props.TotalSelectedAmount !== undefined && props.TotalSelectedAmount !== 0.00 ?
                        <div className={classes.TotalDueAmtToPay}>
                            <div>
                                Total Pay : {props.TotalSelectedAmount}
                            </div>
                            <div>
                                <input type="button" value="Pay Here" onClick={props.OnPayHere}/>
                            </div>
                        </div> : null
                    }
                   
                    {                       
                        props.listOfOrders.length > 0 ? 
                        <ul className={classes.OrderListUl}>
                        {                           
                            props.listOfOrders.map( (item, index) => {
                                   
                                return(
                                    <li id= {"Id-" + index} className={classes.OrderListItem}>
                                        <div className = {classes.OrderListItemContainer}>                                    
                                            <div className={classes.ExpanderArea}>
                                                <div className={classes.CheckBox}>
                                                   <input id={"Id-" + index} type= "checkbox" className={classes.OrderSelection} onChange={(event) =>{                                                     
                                                        return props.IsOrderItemSelected(event)
                                                   }}/>
                                                </div>
                                                <div className={classes.OrderIdDisplay}>
                                                   Order Id: {item.OrderId}
                                                </div>
                                                <div className={classes.OrderAmtDisplay}>
                                                   Due Amount: {item.DueAmount.toFixed(2)}
                                                </div>
                                                <div className={classes.OrderExpander}>
                                                    <img src={ExpandIcon} className={classes.ExpandImg} />
                                                </div>
                                            </div>
                                            <div className={classes.ExpanderDispArea}>
                                                <ul className={classes.OrderItemUl}>
                                                    {
                                                        item.Orders.map(order => {
                                                            return(
                                                                <li className = {classes.OrderItem}>
                                                                    <div className = {classes.OrderItemContainer}>
                                                                        <div className={classes.ProductDescription}>
                                                                            {order.ProductName}
                                                                        </div>
                                                                        <div className={classes.Price}>
                                                                           {order.Price}
                                                                        </div>
                                                                        <div className={classes.ProductCount}>
                                                                            {order.ItemCount}
                                                                        </div>
                                                                    </div>                                                                
                                                                </li>
                                                            )                                                        
                                                        } )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                )                                
                            })
                        }
                    </ul> : <NotFoundMessage Message="Oops! There is not such order"/>                  
                    }                                       
                </div>
            </div>
        </Aux>
    )

}

export default CustomerOrderList;