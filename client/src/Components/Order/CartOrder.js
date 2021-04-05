import React from 'react';
import {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import OrderItem from '../../Containers/ToolBar/ProductList/OrderItem';
import classes from './../Product/SearchedProduct.module.css';
import '../../Containers/ToolBar/Input/SearchInput.module.css';
import SuccessTransaction from '../../Containers/Forms/Payment/SuccessfulTransaction';
import TransactionImage from '../../Assests/Logo/No_Cart_Img.png';
import {PlaceYourOrder} from '../../Store/Actions/CustomerDetailsAction';
import {
    AddItemToCart,              
    ShowYourCartItem, 
    RemoveItemFromCart,
    ReduceProductCount           
} from '../../Store/Actions/OrderAction';

class CartOrder extends Component {

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

    

    CreateCartOrderComponent()
    {        
            
            if(this.props.orderList.length > 0)
            {      
                return(   
                 <div className={classes.OrderDetails}>
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
                </div>
                )
            }
            else{

                    if(this.props.isDisplayCartItem)
                    {
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
        

    render() {

        var component = this.CreateCartOrderComponent();

        return (
        
        <React.Fragment>
                {component}
        </React.Fragment>)

    }
}

const mapStateToProps = (state) => {

    return{
        
        orderList: state.OrderReducer.OrderItems,
        totalPrice: state.OrderReducer.TotalPrice,
        totalProductCount: state.OrderReducer.NoOfProducts,
        isAuthenticatedUser: state.ProductReducer.IsUserAuthenticated,
        isUserUnAuthorized : state.ProductReducer.IsUserUnAuthorized,
        loadingMessage : state.ProductReducer.LoadingMessage,
        isProductSearched : state.ProductReducer.IsProductSearched,
        isDisplayCartItem: state.OrderReducer.IsCartItemDispayed,        
        selectedNavigationPath : state.AuthReducer.SelectedNavigationPath,
        errorMsg : state.ProductReducer.ErrorMsg
    }
};

const mapDispatchToProps = {
    
    AddItemToCart,
    PlaceYourOrder,
    ShowYourCartItem,
    RemoveItemFromCart,
    ReduceProductCount
}

CartOrder.propsTypes = {

    FetchProductDetails: PropTypes.func.isRequired,
    AddItemToCart : PropTypes.func.isRequired,
    ShowYourCartItem: PropTypes.func.isRequired,
    RemoveItemFromCart: PropTypes.func.isRequired,
    ReduceProductCount: PropTypes.func.isRequired,
    PlaceYourOrder : PropTypes.func.isRequired,
    UpdateFavouriteProduct : PropTypes.func.isRequired,
    orderList: PropTypes.array,
    totalPrice: PropTypes.number,
    totalProductCount : PropTypes.number.isRequired,
    isAuthenticatedUser: PropTypes.bool.isRequired,
    isUserUnAuthorized: PropTypes.bool.isRequired,
    isProductSearched : PropTypes.bool.isRequired,
    isDisplayCartItem: PropTypes.bool.isRequired,
    loadingMessage: PropTypes.string,
    selectedNavigationPath: PropTypes.string.isRequired,    
    errorMsg: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartOrder));

