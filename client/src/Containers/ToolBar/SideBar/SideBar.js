import React from "react";
import classes from './SideBar.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import RedirectItem from '../NavigationItem/RedirectItem';
import AddProduct from '../../../Assests/Logo/sidebar-addproduct-white.png';
import OrderProduct from '../../../Assests/Logo/Order-item-white.png';
import OutOfStockProduct from '../../../Assests/Logo/sidebar-outofstock-White.png';
import FavProduct from '../../../Assests/Logo/side-addfavourite-white.png';
import Customer from '../../../Assests/Logo/Sidebar-customer-white.png';

const SideBar = (props) =>{
    
    let classList = [classes.SideBar,  classes.Close];
    if(props.Opened && props.IsEligibleForMobile === false)
    {
        classList = [classes.SideBar, classes.Open];
    }
    else
    {
        classList = [classes.BottomBar, classes.Open];
    }
    return(
        <div className={classList.join(" ")} onClick={props.clicked}> 
            <RedirectItem 
                OnClick = {props.OnRedirect}
                RedirectedTo = '/Product/AddProduct'
                RedicrectImage = {AddProduct}
               />
            <RedirectItem 
                OnClick = {props.OnRedirect}
                RedirectedTo = '/Product/OrderProduct'
                RedicrectImage = {OrderProduct}
               />
            <RedirectItem 
                OnClick = {props.OnRedirect}
                RedirectedTo = '/Product/OutOfStocks'
                RedicrectImage = {OutOfStockProduct}
                />
            <RedirectItem 
                OnClick = {props.OnRedirect}
                RedirectedTo = '/Product/Favourite'
                RedicrectImage = {FavProduct}/>
            <RedirectItem 
                OnClick = {props.OnRedirect}
                RedirectedTo = '/Customer/Customers'
                RedicrectImage = {Customer}
                />          
        </div>
    )
}

export default SideBar;