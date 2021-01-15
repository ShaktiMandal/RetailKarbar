import React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import Aux from "../../../HOC/Auxiliary";
import Register from '../../../Containers/Forms/Register/RegisterUser';
import Validator from "../../../Validator/Validator";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RegisterScreen from './RegisterScreen';
import {  UserRegister, RegisterError, RegisterWindowClose } from '../../../Store/Actions/RegisterAction'


class RegisterAuth extends Component{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        
    }

    OnClose = () =>{

        Validator.ClearErrors();
        this.props.RegisterWindowClose();
        this.props.history.replace("/");
    }

    OnCloseErrorPanel = () =>{
        Validator.ClearErrors();
        this.props.RegisterWindowClose();
    }

    OnRegisterUser = (event) =>{

        debugger;
        event.preventDefault();
        var data = this.props.registerDetails;        
        Validator.FromValidation(data);
        const errors = Validator.GetErrors();
        errors.length === 0 ? this.props.UserRegister(data) : this.props.RegisterError(errors)
    }

    OnValueChange = (event) =>{

        var data = this.props.registerDetails;
      
        if( event.target.id === "userid")
        {
            data.UserId = event.target.value;
        }
        if(event.target.id === "passcode")
        {
            data.Passcode = event.target.value;
        }   
        if(event.target.id === "confPasscode")
        {
            data.ConfPasscode = event.target.value;
        }  
        this.setState({UserData: data}); 
    }

    OnKeyPress = (event) =>{ 
       
        var typedChar = event.keyCode; 
        console.log(event.keyCode);

        let isAcceptingValue  = (typedChar >= 48 && typedChar <= 57) || (typedChar >= 1 && typedChar <= 31)

        if(isAcceptingValue)
        {
            return true;
        }
        else{   
            event.preventDefault();     
            return false;
        }
    }

    render()
    {
        debugger;
        if(this.props.isRegisterCompleted)
        {
            this.props.history.replace('/Authentication/LogIn');
        }
        return(
            <Aux>
                <RegisterScreen 
                    OnRegisterUser = {this.OnRegisterUser}
                    OnValueChange = {this.OnValueChange}
                    OnKeyPress = {this.OnKeyPress}
                    OnCloseClick={this.OnClose}
                    OnCloseErrorPanel = {this.OnCloseErrorPanel}
                    PasscodeValue = {this.props.registerDetails.Passcode}
                    ConfPasscodeValue = {this.props.registerDetails.ConfPasscode}
                    UserIdValue  = {this.props.registerDetails.UserId}
                    PasscodeId = "passcode"
                    ConfPasscodeId ="confPasscode"
                    UserId = "userid"
                    ErrorMsg = {this.props.registerErrors}
                />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        registerDetails: state.RegisterReducer.UserData,
        isRegisterCompleted: state.RegisterReducer.IsRegisterCompleted,
        registerErrors: state.RegisterReducer.RegisterErrors        
    }   
};
 
RegisterAuth.propTypes = {
    registerDetails: PropTypes.object.isRequired,
    registerErrors: PropTypes.string.isRequired,
    UserRegister: PropTypes.func.isRequired,
    RegisterError: PropTypes.func.isRequired,
    RegisterWindowClose: PropTypes.func.isRequired,
    isRegisterCompleted: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
    RegisterWindowClose,
    RegisterError,
    UserRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterAuth));