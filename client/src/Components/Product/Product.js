import React from 'react';
import {Component} from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Product.module.css';
import Button from '../../Containers/ToolBar/Button/button'
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ChooseAddProduct } from '../../Store/Actions/ProductAction';
import ErrorBox from '../../Containers/ToolBar/Error/Error';

class Product extends Component {
    
    OnAddProduct = (event) =>{
        event.preventDefault();
        this.props.ChooseAddProduct();
        this.props.history.push('/Product/AddProduct');
    }

    OnOrder = (event) =>{
        event.preventDefault();
        this.props.ChooseAddProduct();
        this.props.history.push('/Product/Search');
    }

    render()
    {
        let displayErrorBox = this.props.errorMsg.length > 0 ?
                <div className={classes.ErrorDiv}>
                    <ErrorBox ErrorMsg={this.props.errorMsg}/>      
                </div> : null;

        return(
            <Aux>
                {displayErrorBox}
                <div className={classes.containerDiv}> 
                    <div className={classes.AddProductDiv}>

                    <Button
                     ButtonStyle ={{
                        width: "200px",
                        border: 'none',
                        outline: "none",
                        height: "50px",               
                        userSelect: "none",
                        color: "white",
                        fontSize: '20px',
                        backgroundColor: "red",
                        ToolTip: ""
                        
                   }}
                   OnClick = {this.OnAddProduct}
                   ButtonType="button"
                   Value= "Add Product">
                </Button>
                </div>
                <div className={classes.OrderProductDiv}>
                <Button
                     ButtonStyle ={{
                        width: "200px",
                        border: 'none',
                        outline: "none",
                        height: "50px",               
                        userSelect: "none",
                        color: "white",
                        fontSize: '20px',
                        margin: '2px',
                        backgroundColor: "green",
                        ToolTip: ""
                        
                   }}
                   OnClick = {this.OnOrder}           
                   ButtonType="button"
                   Value="Order Product">
                    </Button>
                </div> 
                  
                           
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) =>  {
    return {
                isAuthenticatedUser: state.ProductReducer.IsUserAUthenticated,
                errorMsg: state.ProductReducer.ErrorMsg
        };
};

Product.propTypes = {
    ChooseAddProduct: PropTypes.func.isRequired,
    isAuthenticatedUser: PropTypes.bool,
    errorMsg:  PropTypes.string
};

const mapDispatchToProps = {
    ChooseAddProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));