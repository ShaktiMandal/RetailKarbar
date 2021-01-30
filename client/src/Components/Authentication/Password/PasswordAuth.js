import React from "react";
import {Component} from "react";
import {withRouter} from "react-router"
import Aux from "../../../HOC/Auxiliary";
import {connect} from 'react-redux';
import UpdatePassword from '../../../Containers/Forms/Password/Password';
import PropTypes from 'prop-types';
import Validator from '../../../Validator/Validator';
import ResetPasswordScreen from './ResetPasswordScreen';
import {UserPasswordReset, PasswordResetError, PasswordResetWindowClose} from '../../../Store/Actions/PasswordResetAction';


class ResetPassword extends Component{
    constructor(props)
    {
        super(props);
    }

    OnClose = () =>{
        
        Validator.ClearErrors();
        this.props.PasswordResetWindowClose();
        this.props.history.replace("/");
    }

    OnCloseErrorPanel =() =>{
        Validator.ClearErrors();
        this.props.PasswordResetWindowClose();
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

    OnChangePassword = (event) =>{  

        event.preventDefault();
        var {UserId, NewPasscode, ConfPasscode} = this.props.passwordResetDetails;        
        Validator.FromValidation({UserId, Passcode:NewPasscode, ConfPasscode});
        const errors = Validator.GetErrors();        
        errors.length === 0 ? this.props.UserPasswordReset({UserId, NewPasscode, ConfPasscode}) : this.props.PasswordResetError(errors)
    }

    OnValueChange = (event) => {
        event.preventDefault();
        var data = this.props.passwordResetDetails;
        
        if( event.target.id === "userid")
        {
            data.UserId = event.target.value;
        }
        if(event.target.id === "passcode")
        {
            data.NewPasscode = event.target.value;
        }   
        if(event.target.id === "confPasscode")
        {
            data.ConfPasscode = event.target.value;
        }  
        this.setState({UserData: data});   
    }

    render()
    {
           
        if(this.props.isPasswordReSet)
        {
            this.props.history.replace('/Authentication/LogIn');
        }
        return(
            <Aux>
                <ResetPasswordScreen 
                OnChangePassword = {this.OnChangePassword}
                OnValueChange = {this.OnValueChange}
                OnCloseClick={this.OnClose}
                OnKeyPress = {this.OnKeyPress}
                OnCloseErrorPanel = {this.OnCloseErrorPanel}
                PasscodeValue = {this.props.passwordResetDetails.NewPasscode}
                ConfirmPasscodeValue = {this.props.passwordResetDetails.ConfPasscode}
                UserIdValue  = {this.props.passwordResetDetails.UserId}
                PasscodeId = "passcode"
                ConfirmPasscodeId ="confPasscode"
                UserId = "userid"
                ErrorMsg = {this.props.passwordResetErrors}
                />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {

    return {        
        passwordResetDetails: state.PasswordResetReducer.ResetPasswordDetails,
        isPasswordReSet : state.PasswordResetReducer.IsPasswordReSet,
        passwordResetErrors : state.PasswordResetReducer.PasswordResetErrors
    };
}

ResetPassword.propTypes = {

    passwordResetDetails: PropTypes.object.isRequired,
    UserPasswordReset: PropTypes.func.isRequired,
    PasswordResetError: PropTypes.func.isRequired,
    PasswordResetWindowClose: PropTypes.func.isRequired,
    passwordResetErrors: PropTypes.string,
    isPasswordReSet: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
    UserPasswordReset,
    PasswordResetError,
    PasswordResetWindowClose
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));