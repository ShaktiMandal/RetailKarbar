import React from 'react';
import {Component} from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Products.module.css';
import ErrorBox from '../../Containers/ToolBar/Error/Error';
import Button from '../../Containers/ToolBar/Button/button';
import Input from '../../Containers/ToolBar/Input/Input';
import OrderItem from '../../Containers/ToolBar/ProductList/OrderItem';
import OrderItemImage from '../../Assests/Logo/Order-item.png';
import CloseButton from "../../Containers/ToolBar/FormCloseButton/FormCloseButton";

class Products extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            orderItemCount: 0,
            CartItems : []            
        }
    }

    componentDidMount()
    {
                   
    }

    OnAddWholesaler = (event) =>{
        console.log("Add Customer");
    }

    OnCloseClick = (event) =>{
        console.log("closing tab")
    }

    OnBasketClick = (event) =>{
        console.log("basket click")
    }

    OnAddOrder(index){
        var items = this.state.CartItems;
        items.push(this.state.listOfOrders[index]);
        this.setState({ 
            CartItems: items,
            orderItemCount: this.state.CartItems.length
        });
    }

    OnDelete(index)
    {
        var items = this.state.listOfOrders;
        items.splice(index, 1);
        this.setState({
            listOfOrders: items           
        });
    }

    OnSearchOrder = (event) =>
    {
        let searchText = event.target.value;
        let filteredItem = this.state.listOfOrders.filter( item => item.ProductName.includes(searchText));
        this.setState({listOfOrders: filteredItem});
    }

    render()
    {
        return(
            <Aux>
                <div className={classes.ProductContainer}>
                        <div className ={classes.WholesalerContainer}>
                            <div className={classes.CloseBtnDiv}>
                                <CloseButton OnCloseClick ={this.OnCloseClick}/>      
                            </div> 
                            <form onSubmit={this.OnAddProduct} className={classes.AddProductFrom} noValidate>                            
                                <div className={classes.ErrorDiv}>
                                    <ErrorBox ErrorMsg={this.state.ErrorMsg}/>      
                                </div> 
                                <h4>Add Wholesaler</h4>
                                <div className={classes.inputdiv}>
                                        <Input type="text"                                    
                                        IsRequired 
                                        RequiredLength="100" 
                                        OnChange={this.OnNameChange}
                                        InputValue ={this.state.WholesalerName}
                                        />
                                        <h5>Wholesaler Name</h5>
                                </div>
                                <div className={classes.inputdiv }>
                                    <Input type="number"                            
                                    IsRequired 
                                    RequiredLength="10"
                                    OnChange={this.OnPhoneNumChange}
                                    InputValue ={this.state.PhoneNumber}
                                    />
                                    <h5>Phone Number</h5>
                                </div>                               
                                <div className={classes.WholesalerSelecion}>
                                   <h5>Select Wholesaler Name</h5>
                                   <select>
                                       <option>Test1</option>
                                       <option>Test2</option>
                                       <option>Test3</option>
                                   </select>
                                </div>                        
                                <div className={classes.CreateWholesaler}>
                                    <Button 
                                    OnClick = {this.OnAddWholesaler}
                                    Value="Add Product" 
                                    ButtonType="submit"
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
                            </form>
                        </div>                    
                        <div className ={classes.OrderSearchArea}>  
                            <div className={classes.SearchArea}>
                                <div className={classes.SearchCriteria}>                                  
                                    <input  
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        outline: "none",
                                        color: "white",                                   
                                        verticalAlign: "end",
                                        width: "100%"
                                    }}    
                                    className={classes.SearchInput}                              
                                    type="text"
                                    placeholder="Search Your Order..."
                                    onChange = {this.OnSearchOrder}
                                    />
                                </div> 
                                <div className={classes.ItemBasket}> 
                                    <input type="image" src={OrderItemImage}
                                    onClick ={ this.OnBasketClick}
                                    style={{                                   
                                        width: "50px",
                                        height: "50px",
                                    }}/> 
                                    <h3
                                    style={{     
                                        marginTop: "0px",                                   
                                        color: "white"
                                    }}>{this.state.orderItemCount}</h3>                                
                                </div>
                            </div>
                            <div className={classes.OrderList}>
                                {
                                    this.state.listOfOrders.length === 0 ? 
                                    <h3>Order Item is Empty</h3>   :

                                    <ul>
                                    {
                                        this.state.listOfOrders.map( (item, index) => {
                                            return(
                                                <li 
                                                key  = {index}
                                                className={classes.liOrderDetails}>
                                                    <OrderItem                                           
                                                    ProductName = {item.ProductName}
                                                    StockCount  = {item.StockCount}
                                                    ProductPrice = {item.ProductPrice} 
                                                    EditContent = "&#10010;"
                                                    DelContent = "&#10005;"                                                                                                   OnEdit = {this.OnEdit}
                                                    OnDelete = {() => this.OnDelete(index)}
                                                    OnEdit  = {() => this.OnAddOrder(index)}
                                                    ItemCount = {item.StockCount} 
                                                    OrderItemChange = {(event)=> this.OrderItemChange(index, event)}/>                                     
                                                </li> 
                                            );                                        
                                        })
                                    }
                                </ul>
                                }
                                
                            </div>
                        </div>
                </div>
            </Aux>
        )
    }
}

export default Products;