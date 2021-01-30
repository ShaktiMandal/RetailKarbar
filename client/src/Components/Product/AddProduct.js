import React from 'react';
import {Component} from 'react';
import {withRouter, Redirect} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Aux from '../../HOC/Auxiliary';
import Button from '../../Containers/ToolBar/Button/button';
import Input from '../../Containers/ToolBar/Input/Input';
import SuccessTransaction from '../../Containers/Forms/Payment/SuccessfulTransaction';
import AddProductImage from '../../Assests/Logo/Add-product.png';
import CloseButton from "../../Containers/ToolBar/FormCloseButton/FormCloseButton";
import ErrorBox from '../../Containers/ToolBar/Error/Error';
import InformationBox from '../../Containers/ToolBar/Information/Information';
import {AddYourProduct, AddProductOnError, WindowClosed, ClearError} from '../../Store/Actions/AddProductAction';
import {FetchProductDetails} from '../../Store/Actions/ProductAction';
import Validator from '../../Validator/Validator';
import classes from './AddProduct.module.css';

class AddProduct extends Component{

    componentDidMount()
    {
           
        this.props.FetchProductDetails("");
    }

    OnAddProduct = (event) => {
        event.preventDefault();
        Validator.ProductValidation(this.props.productDetails);
        const errors = Validator.GetErrors();
        errors.length === 0 ? this.props.AddYourProduct(this.props.productDetails) : this.props.AddProductOnError(errors);        
    }
    
    OnCloseClick = (event) =>{

        Validator.ClearErrors();
        this.props.WindowClosed();
        this.props.history.replace("/");
    }

    CloseErrorPanel = (event) => {                
        event.preventDefault();
        this.props.ClearError(this.props.informationMessage.length > 0 ? false : true, this.props.customerDetails);
    }

    OnValueChange = (event) =>{

           
        event.preventDefault();
          

        let data = this.props.productDetails;
        if(data)
        {        
            if(this.props.fetchedProductDetails !== undefined
                && event.target.id === "productName"
                && this.props.fetchedProductDetails.length > 0
                )
            {
                data.Price = "";
                data.Stock = "";
                data.ExpairyDate = new Date("<YYYY-mm-dd>");
                data.Manufacturer = "";  
                
                this.props.fetchedProductDetails.forEach(item => 
                    {
                        if(item.ProductName === event.target.value)
                        {
                               
                        data.Price = item.Price;
                        data.Stock = item.Stock;
                        data.ExpairyDate = item.ExpairyDate.slice(0, item.ExpairyDate.indexOf("T"));
                        data.Manufacturer = item.Manufacturer;                      
                        }                        
                });
                
            }    
            switch(event.target.id)
            {
                case "productName":
                    {
                        data.ProductName = event.target.value;
                        break;
                    }
                case "productPrice":
                    {
                        data.Price = event.target.value;
                        break;
                    }
                case "productStock":
                    {
                        data.Stock = event.target.value;
                        break;
                    }
                case "productManufacturer":
                    {
                        data.Manufacturer = event.target.value;
                        break;
                    }
                case "expairyDate":
                    {      
                        data.ExpairyDate = event.target.value
                        break;
                    }
            }
        }

        this.setState({
            ProductDetails: data
        })
    }

    OnCloseErrorPanel = () =>
    {
        Validator.ClearErrors();
        this.props.WindowClosed();
    }

     OnSelect(event){

           
        let data = event;
    }

    render()
    {
        let errorPanel = this.props.errorMsg.length > 0 ?
            <div className={classes.ErrorDiv}>
                <ErrorBox 
                    ErrorMsg={this.props.errorMsg}
                    CloseErrorPanel = {this.OnCloseErrorPanel}
                />      
            </div> : this.props.informationMessage ? 
            <div className={classes.ErrorDiv}>
                <InformationBox 
                    CloseErrorPanel = {this.CloseErrorPanel}
                    InformationMsg={this.props.informationMessage}/>      
            </div> : null;

        return(
            <Aux>
                <div className={classes.ProductAddContainer}>
                    <div className={classes.LeftContainer}>
                        <SuccessTransaction     
                        ButtonType = "hidden"                   
                        TransactionImage ={AddProductImage}
                        Message = "Add Your Product"/>                        
                    </div>
                    <div className={classes.RightContainer}>
                        <div className={classes.CloseBtnDiv}>
                            <CloseButton OnCloseClick ={this.OnCloseClick}/>      
                            {errorPanel}
                        </div> 
                        <div className={classes.AddContainer}>   
                                                 
                            <form onSubmit={this.OnAddProduct}  className={classes.AddProductFrom} noValidate>                            
                                
                                <h2>Add Product</h2>
                                <div className={classes.inputdiv}>
                                        <Input type="text" 
                                        listName ="ProductList"
                                        id = "productName"                               
                                        IsRequired 
                                        RequiredLength="100" 
                                        OnChange={this.OnValueChange}
                                        InputValue ={this.props.productDetails.ProductName}
                                        />                                        
                                        <h5>Product Name</h5>
                                        <datalist id="ProductList" onSelect={this.OnSelect}>
                                            {                                             
                                                this.props.fetchedProductDetails.map((item, key) =>
                                                <option key={key} value={item.ProductName} />
                                            )}
                                        </datalist>
                                </div>
                                <div className={classes.inputdiv}>
                                        <Input type="number" 
                                        id = "productPrice"                               
                                        IsRequired 
                                        RequiredLength="15" 
                                        OnChange={this.OnValueChange}
                                        InputValue ={this.props.productDetails.Price}
                                        />
                                        <h5>Product Price</h5>
                                </div>
                                <div className={classes.inputdiv }>
                                    <Input type="number"  
                                    id = "productStock"                            
                                    IsRequired 
                                    RequiredLength="6"
                                    OnChange={this.OnValueChange}
                                    InputValue ={this.props.productDetails.Stock}
                                    />
                                    <h5>Stock</h5>
                                </div>   
                                <div className={classes.inputdiv }>
                                    <Input type="text"  
                                    id = "productManufacturer"                                
                                    IsRequired                           
                                    OnChange={this.OnValueChange}
                                    InputValue ={this.props.productDetails.Manufacturer}
                                    />
                                    <h5>Manufacturer</h5>
                                </div>                             
                                <div className={classes.inputdiv }>
                                    <h5>Expairy Date</h5>
                                    <Input type="date" 
                                    id="expairyDate"                                
                                    IsRequired                           
                                    OnChange={this.OnValueChange}
                                    InputValue ={this.props.productDetails.ExpairyDate}
                                />          
                                </div>                                              
                                <div className={classes.logInBtn}>
                                    <Button 
                                    OnClick = {this.OnAddProduct}
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
                    </div>
                </div>
            </Aux>
        )
    }
}


const mapStateToProps = (state) =>{
    return{       
        productDetails: state.AddProductReducer.ProductDetails,
        isProdAddedSuccessfully: state.AddProductReducer.IsProdAddedSuccessfully,
        informationMessage: state.AddProductReducer.InformationMessage,
        errorMsg  : state.AddProductReducer.AddOnError,
        fetchedProductDetails : state.ProductReducer.ProductList
    };
}

const mapDispatchToProps = {
    AddYourProduct,
    AddProductOnError,
    WindowClosed,
    FetchProductDetails,
    ClearError
}

AddProduct.propTypes = {
    FetchProductDetails: PropTypes.func.isRequired,
    AddYourProduct: PropTypes.func.isRequired,
    AddProductOnError: PropTypes.func.isRequired,
    WindowClosed: PropTypes.func.isRequired,
    ClearError: PropTypes.func.isRequired,
    productDetails: PropTypes.object.isRequired,
    isProdAddedSuccessfully: PropTypes.bool,
    informationMessage: PropTypes.string,
    errorMsg: PropTypes.string
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProduct));