import React, { Component } from 'react';
import classes from './App.module.css';
import {withRouter, Redirect} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import LogIn from './Components/Authentication/LogIn/LogInAuth';
import NotFound from './Components/Authentication/LogIn/NotFound';
import Register from './Components/Authentication/Register/RegisterAuth';
import ResetPassword from './Components/Authentication/Password/PasswordAuth';
import Home from './Components/Product/Product';
import Search from './Components/Product/SearchedProduct';
import CustomerDetails from './Components/Customer/CustomerDetails';
import AddProduct from './Components/Product/AddProduct';
import Customers from './Components/Customer/Customers';
import Products from './Components/Product/Products';
import CartOrders from './Components/Order/CartOrder';
import Button from './Containers/ToolBar/Button/button'
import {
  UserLogOut, 
  OnLoadPage,
  NavigationMenuSelection
} from './Store/Actions/AuthActions';

import {
  FetchProductDetails,
  ClearProductList
} from './Store/Actions/ProductAction';

import {
  ShowYourCartItem,
  ClearOrderList
} from './Store/Actions/OrderAction';

import {
  GetCustomerDetails
} from './Store/Actions/CustomersAction';

import SideBar from './Containers/ToolBar/SideBar/SideBar';
import Navbar from './Containers/ToolBar/Navbar/Navbar';
import CartImage from '../src/Assests/Logo/shopping-cart-white.png';
import LogoImg from '../src/Assests/Logo/MyLogo.png';
import { resolve } from 'path';


class App extends Component {

  constructor(props)
  {
      super(props);
      this.state ={
        isSideBarDisplay: true
      }
  }

  componentDidMount()
  {  
    this.props.OnLoadPage();
  }

  OnLogIn = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }

  OnLogOut = (event) =>{
    event.preventDefault();
    this.props.ClearOrderList();
    this.props.ClearProductList();
    this.props.UserLogOut();
    this.props.history.push('/');
  }

  OnRegister = (event) =>{
    event.preventDefault();
    this.props.history.push('/Authentication/Register');
  }

  OnSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    var routePath = this.props.location.pathname;
       
    switch(routePath)
    {
      case '/Product/Search':
        {
          this.props.FetchProductDetails(event.target.value);
          break;
        }
      case '/Customer/Customers':
        {
          this.props.GetCustomerDetails(event.target.value);
          break;
        }
    }
  }

  OnShowCartItem = (event) => {
       
    this.props.ClearProductList();
    this.props.ShowYourCartItem();
    this.props.history.push('/Customer/Cart'); 
  }

  OnRedirect = (path) =>{
           
    switch(path)
    {
      case '/Product/OrderProduct' :
      {       
        this.props.ClearProductList();
        this.props.history.push('/Product/Search');
        break;
      }
      case '/Product/OutOfStocks' :
      {        
        this.props.ClearProductList();
        this.props.history.push('/Product/Search');
        this.props.FetchProductDetails('OutOfStock');
        break;
      }
      case '/Product/Favourite' :
      {        
        this.props.ClearProductList();
        this.props.history.push('/Product/Search');
        this.props.FetchProductDetails('Favourite');
        break;
      }
      case '/Product/AddProduct' :
      {
        this.props.ClearProductList();
        this.props.history.push(path);
        break;
      }
      case '/Customer/Customers' :
      {
          this.props.ClearProductList();
          this.props.history.push(path);
          break;
      }
      default:
      {
        this.props.ClearProductList();
        this.props.ClearOrderList();
        this.props.history.push('/Authentication/LogIn');
      }
    }
    this.props.NavigationMenuSelection(path);
  }

  hamburgerClickedHandler = () => {
    this.setState((prevState) =>
    { 
        return this.state.isSideBarDisplay = !prevState.isSideBarDisplay;
    })
  }

  OnReturnHome = (event) =>
  {
       
    event.preventDefault();
    this.props.history.push("/");
  }
  
  render() {

    let placeHolderText;
    let isSessionActive; 

    if(this.props.location.pathname === "/Product/Search")
    {
      placeHolderText = "Enter Product Name"
    }

    if(this.props.location.pathname === "/Customer/Customers")
    {
      placeHolderText = "Enter Customer Name"
    }
    debugger;
    let isSearchRoute = (this.props.location.pathname === "/Product/Search" 
                     || this.props.location.pathname === '/Customer/Customers');

    if(localStorage.getItem("UserId") !== null)
    {
      isSessionActive = true;
    }
    else
    {
      isSessionActive = false;
    }
                    
    return (      
      <div className={classes.BackgroundDiv}>
        <Layout> 
          <div className={classes.LayoutDiv}>           
            <div className={classes.Topbar}>
              <div className={classes.TopbarRight}>
              { isSessionActive ? <Navbar hamburgerClicked = {this.hamburgerClickedHandler}/> : null }
                            
              </div>
              <div className={classes.TopbarMiddle}>
                <div className={classes.Logo}>
                  <img  src ={LogoImg} onClick = {this.OnReturnHome}/>
                </div>
                <div className={classes.TextSearch}>
                  { isSearchRoute && isSessionActive  ? 
                    <input 
                    onChange = {this.OnSearch}
                    type="text" 
                    placeholder={placeHolderText}/> : null
                  }
                </div>
              </div>
              <div className={classes.TopbarLeft}>
                {
                  isSessionActive  ? 
                  <div className={classes.CartItemStyle} onClick={this.OnShowCartItem}>
                    <img className={classes.CartImageStyle} src={CartImage}/>
                    <label className={classes.CartItemCountStyle} >{this.props.totalProductCount}</label>
                  </div> : null
                }   
                
                <div>
                  <Button
                    OnClick = { isSessionActive  ? this.OnLogOut : this.OnLogIn}
                    Value= { (this.props.isUserLoggedIn || isSessionActive ) ? "Log Out" : ""}
                    ButtonType= "button"
                    ButtonStyle ={{   
                      float: 'right',
                      border:'none',
                      outline: "none",                              
                      background: 'transparent',
                      padding: '5px',
                      height: '40px',
                      color: "white",
                      fontSize: '15px',
                      marginRight:'10px',
                      textAlign: "center",
                      userSelect: "none"
                    }}></Button>
                </div>    
              </div>
            </div>
            <div className= { isSessionActive  ? 
                             this.state.isSideBarDisplay ? classes.ContentAreaOpened : classes.ContentArea
                            : null
                            }>
                { (this.props.isUserLoggedIn || isSessionActive ) ?
                  <SideBar clicked={this.OnSidebarClicked} 
                  IsEligibleForMobile = {false}
                  OnRedirect = {this.OnRedirect}
                  Opened={this.state.isSideBarDisplay} 
                  closed={this.DisplaySideBar}/> : null
                }
          

              <div className={classes.MainContent}>                
                  {            
                    isSessionActive  ?               
                    <Switch>  
                      <Route path="/Home"   exact component={Home}/>
                      <Route path="/Product/Search" exact component={Search}/>
                      <Route path="/Customer/CustomerDetails" exact component={CustomerDetails}/>
                      <Route path="/Product/AddProduct" exact component={AddProduct}/>
                      <Route path="/Customer/Customers" exact component={Customers}/>
                      <Route path="/Customer/Cart" exatc component ={CartOrders}/>
                      <Route path="/Product/Products" exact component={Products}/>  
                      <Route path="/" component={NotFound} />                      
                    </Switch> : 
                    <Switch>  
                        <Route path = '/' exact component={LogIn}/>
                        <Route path="/Authentication/Register" exact component={Register} />
                        <Route path="/Authentication/Password" exact component={ResetPassword}/>
                        <Route path="/" component={NotFound} />                       
                          
                    </Switch>                     
                  }
              </div>
              
             
            </div>   
            {isSessionActive  ?
            <SideBar clicked={this.OnSidebarClicked} 
                  IsEligibleForMobile = {true}
                  OnRedirect = {this.OnRedirect}
                  Opened={this.state.isSideBarDisplay} 
                  closed={this.DisplaySideBar}/> : null}
          </div>    
        </Layout>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      isUserLoggedIn : state.AuthReducer.IsUserLoggedIn,
      isInvalidUrl : state.AuthReducer.IsInvalidUrl,
      totalProductCount: state.OrderReducer.NoOfProducts
  }
}

const mapDispatchToProps = {
  UserLogOut,
  NavigationMenuSelection,
  FetchProductDetails,
  ShowYourCartItem,
  ClearProductList,
  ClearOrderList,
  GetCustomerDetails,
  OnLoadPage
}

App.propTypes = {
  UserLogOut : PropTypes.func.isRequired,
  OnLoadPage : PropTypes.func.isRequired,
  NavigationMenuSelection: PropTypes.func.isRequired,
  FetchProductDetails: PropTypes.func.isRequired,
  GetCustomerDetails: PropTypes.func.isRequired,
  ShowYourCartItem : PropTypes.func.isRequired,
  ClearProductList: PropTypes.func.isRequired,
  ClearOrderList  : PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isInvalidUrl: PropTypes.bool,
  selectedNavigationPath : PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));