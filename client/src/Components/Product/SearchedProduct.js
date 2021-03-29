import React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../HOC/Auxiliary';
import Productitem from '../../Containers/ToolBar/ProductList/ProductItem';
import OrderItem from '../../Containers/ToolBar/ProductList/OrderItem';
import classes from './SearchedProduct.module.css';
import '../../Containers/ToolBar/Input/SearchInput.module.css';
import SuccessTransaction from '../../Containers/Forms/Payment/SuccessfulTransaction';
import TransactionImage from '../../Assests/Logo/No_Cart_Img.png';
import {FetchProductDetails, UpdateFavouriteProduct,  ClearProductList} from '../../Store/Actions/ProductAction';
import {PlaceYourOrder} from '../../Store/Actions/CustomerDetailsAction';
import NotFoundMessage from '../../Containers/ToolBar/MessageBox/NotFoundMessage';
import Loading from '../../Containers/ToolBar/Loading/Loading';
import AnimatedText from '../../Containers/ToolBar/SearchText/SearchText';


import {
            AddItemToCart,              
            ShowYourCartItem, 
            RemoveItemFromCart,
            ReduceProductCount           
        } from '../../Store/Actions/OrderAction';

class SearchedProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            IsCartItemToBeDisplayed: false,
            IsUserAskToPlaceOrder : false
        }
    }

    componentDidMount() 
    {
    }

    OnIncreaseProdCount = (index, event) => {
        event.preventDefault();
        let productItem = this.props.orderList[index];
        this.props.AddItemToCart(productItem, this.props.orderList);
    }

    OnDecreaseProdCount = (index, event) => {
        event.preventDefault();
        if(index !== -1 && this.props.orderList[index].ItemCount > 1)
        {
            this.props.ReduceProductCount(index, this.props.orderList);
        }
    }

    OnAddProduct = (event, index) =>{  
        event.preventDefault();      
        if(index != -1)
        {
            let selectedItem =  this.props.productList[index]
            this.props.AddItemToCart(selectedItem, this.props.orderList);
            this.setState({
                OrderItems: this.props.orderList,
                TotalPrice: this.props.totalPrice
            });
        }      
    }

    OnAddFavourite = (event, index) =>{
        event.preventDefault();
           
        if(index != -1)
        {
            let selectedItem =  this.props.productList[index]
            this.props.UpdateFavouriteProduct(selectedItem);            
        }
    }

    OnShowCartItem = (event) => {
        event.preventDefault();
        this.setState({IsCartItemToBeDisplayed: true});
        this.props.ClearProductList();
    }

    OnRemoveItem = (index, event) => {
        event.preventDefault();
        this.props.RemoveItemFromCart(index, this.props.orderList);
    }

    OnCheckOut = (event) => {
        event.preventDefault();
        this.props.PlaceYourOrder(this.props.orderList, this.props.totalPrice);
        this.props.history.push('/Customer/CustomerDetails');
    }

    OrderItemChange = (idxValue, event) =>{
        console.log(event.target.value);
       this.setState((event) => {
           console.log(idxValue, event);
       });
    }

    OnMainMenu = (event) =>{
        this.props.history.push('/Customer/CustomerDetails');
    }

    OnCloseClick = (event) => {

        console.log("Order Item close")
    }

    OnPlaceOrder = (event) => {
           
        this.setState({IsUserAskToPlaceOrder: true});        
    }

    OnSearch = (event) =>
    {
           
        event.preventDefault();
        this.setState({IsUserAskToPlaceOrder: false}); 
        this.setState({IsCartItemToBeDisplayed: false})
        var searchItem = event.target.value;
        console.log("Searched Item", searchItem);
        this.props.FetchProductDetails();
    }

    CreateOrderElement()
    {
           
        if(this.props.orderList.length > 0)
        {         
            return ( <div className={classes.OrderDetails}>
                         <div className={classes.CheckoutArea}>
                            <div>
                                Total Amount: {this.props.totalPrice}
                            </div>                        
                            <div>
                                <button 
                                className={classes.CheckoutButton}
                                onClick={this.OnCheckOut}
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                        <ul className={classes.listStyle}>                            
                                { this.props.orderList.map( (item, index) =>{
                                    return(   
                                        <div className={classes.ItemContainer}>
                                            <li 
                                                id  = {item.Id}
                                                className={classes.liOrderDetails}>
                                                <OrderItem
                                                ProductName = {item.ProductName}
                                                ProductPrice = {item.Price}
                                                ItemCount = {item.ItemCount} 
                                                OnRemoveItem = {(event) => {this.OnRemoveItem(index, event)}}
                                                OnAddProductCount = {(event) => {this.OnIncreaseProdCount(index, event)} }
                                                OnDelProductCount = {(event) => {this.OnDecreaseProdCount(index, event)}}
                                                OrderItemChange = {(event)=> this.OrderItemChange(index, event)}
                                                />                                     
                                            </li>    
                                        </div>     
                                    )})}                                    
                    </ul>       
            </div>)
        }
        else{
            
            if(this.state.IsUserAskToPlaceOrder === false){
                return ( <div className={classes.OrderDetails}>
                    <SuccessTransaction 
                        IsFromCart = "true"
                        OnPlaceOrder = {this.OnPlaceOrder}
                        ButtonType = "button"
                        Caption = "Main Menu"
                        Message = "No Item In Cart.Please place Order"
                        TransactionImage = {TransactionImage}/>                            
                </div> )
            }
        }
    }

    CreateProductElement()
    {
        if(this.props.isShowLoading === true)
        {
            return( <Loading LoadingMessage="Fetching products..."/> );
        };
       let styleToBeDisplayed = this.props.isProductSearched ? classes.DisplayProductArea : classes.DisplayProductAreaWithoutBg
        return (
            <div className={classes.ProductListContainer}>
                <div className={classes.DisplayProdMobView}>
                {
                    this.props.productList.length > 0 ?
                    <div className={classes.MobileViewContainer}>
                        <ul className={classes.ItemList}>
                            {
                                this.props.productList.map( (item, index) => {
                                    
                                        return(
                                            <div>
                                            <div className={classes.ProductDetails}>
                                            <section>
                                                <div><strong>Product Name :</strong> {item.ProductName}</div>
                                                <div><strong>Stock :</strong> {item.Stock}</div>
                                                <div><strong> Manufacturer Name :</strong> {item.Manufacturer}</div>
                                                <div><strong>  Expairy Date :</strong> {item.ExpairyDate}</div>
                                            </section>    
                                            <section className={classes.DisplayActionBarOnMobile}>
                                            <div>
                                                <button onClick={ (event) => this.OnAddFavourite(event, index)}
                                                    style={{
                                                            userSelect: "none",
                                                            margin: "auto",
                                                            fontSize: "20px",
                                                            border: "none",
                                                            background: "transparent"
                                                        }}>&#x2764;</button>
                                            </div>
                                            <div>
                                                <button onClick={(event) => this.OnAddProduct(event,index)}
                                                style={{
                                                        userSelect: "none",
                                                        margin: "auto",
                                                        fontSize: "30px",
                                                        border: "none",
                                                        background: "transparent"
                                                    }}>&#x2b;</button>
                                            </div> 
                                            </section>                                                   
                                        </div>                                   
                                        </div>
                                        )
                                })
                            }
                        </ul>
                                                                                           
                    </div>  : this.props.isProductSearched  ? <NotFoundMessage Message="Oops! There is not such product"/> : null
                }
                </div>
                <div className={classes.DisplayDesktopView}>
                    <div className={styleToBeDisplayed}>
                    {
                        this.props.productList.length > 0 ?
                        <div className={classes.SearchResultWrappingDiv}> 
                                <div className={classes.PaymentOrderHeader}>
                                    <div>
                                        Product Name
                                    </div>
                                    <div>
                                        Stock
                                    </div>
                                    <div>
                                        Manufacturer Name
                                    </div>
                                    <div>
                                        Expairy Date
                                    </div>
                                </div>  
                                <ul className={classes.listStyle}>                    
                                {                                
                                    this.props.productList.map( (item, index) =>{                                                   
                                    return(  
                                        <li id = {index}>
                                            <Productitem        
                                            ProductName = {item.ProductName} 
                                            Stock = {item.Stock}
                                            Manufacturer = {item.Manufacturer} 
                                            ExpairyDate = {item.ExpairyDate}                          
                                            OnAddProduct = {(event) => this.OnAddProduct(event, index)}
                                            OnAddFavourite = {(event) => this.OnAddFavourite(event,index)}/>  
                                        </li>
                                    )})                            
                                }
                                </ul> 
                            </div>: this.props.isProductSearched ?
                            <NotFoundMessage Message="Oops! There is not such product"/> : null
                            }
                        </div>
                </div>
            </div>              
        )      
    }

    render()
    { 
        return(
         <Aux>
          
            <div className={classes.SearchResultContainer}>                           
                {
                    this.CreateProductElement()
                }
            </div>
         </Aux>
        )
    }
}


const mapStateToProps = (state) => {

    return{
        productList: state.ProductReducer.ProductList,
        orderList: state.OrderReducer.OrderItems,
        totalPrice: state.OrderReducer.TotalPrice,
        totalProductCount: state.OrderReducer.NoOfProducts,
        isAuthenticatedUser: state.ProductReducer.IsUserAuthenticated,
        isUserUnAuthorized : state.ProductReducer.IsUserUnAuthorized,
        isShowLoading : state.ProductReducer.IsShowLoading,
        isProductSearched : state.ProductReducer.IsProductSearched,
        isDisplayCartItem: state.OrderReducer.IsCartItemDispayed,        
        selectedNavigationPath : state.AuthReducer.SelectedNavigationPath,
        errorMsg : state.ProductReducer.ErrorMsg
    }
};

const mapDispatchToProps = {
    FetchProductDetails,
    AddItemToCart,
    PlaceYourOrder,
    ShowYourCartItem,
    RemoveItemFromCart,
    ReduceProductCount,
    UpdateFavouriteProduct,
    ClearProductList
}

SearchedProduct.propsTypes = {

    FetchProductDetails: PropTypes.func.isRequired,
    AddItemToCart : PropTypes.func.isRequired,
    ShowYourCartItem: PropTypes.func.isRequired,
    RemoveItemFromCart: PropTypes.func.isRequired,
    ReduceProductCount: PropTypes.func.isRequired,
    PlaceYourOrder : PropTypes.func.isRequired,
    UpdateFavouriteProduct : PropTypes.func.isRequired,
    ClearProductList: PropTypes.func.isRequired,
    productList: PropTypes.array.isRequired,
    orderList: PropTypes.array,
    totalPrice: PropTypes.number,
    totalProductCount : PropTypes.number.isRequired,
    isAuthenticatedUser: PropTypes.bool.isRequired,
    isUserUnAuthorized: PropTypes.bool.isRequired,
    isProductSearched : PropTypes.bool.isRequired,
    isDisplayCartItem: PropTypes.bool.isRequired,
    isShowLoading: PropTypes.bool.isRequired,
    selectedNavigationPath: PropTypes.string.isRequired,    
    errorMsg: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchedProduct));
