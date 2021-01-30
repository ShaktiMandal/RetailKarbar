'user strict'
import React from "react";
import {Component} from "react";
import {withRouter, Redirect} from 'react-router';
import Aux from "../../../HOC/Auxiliary";
import LogIn from '../../../Containers/Forms/LogIn/LogIn';
import LogInScreen from './LogInScreen'
import Validator from '../../../Validator/Validator';
import {connect} from 'react-redux';
import {UserLogIn, LogInError, LogInWindowClose} from '../../../Store/Actions/AuthActions'
import PropTypes from 'prop-types';


class LogInAuth extends Component {

    constructor(props)
    {
        super(props);
        Validator.ClearErrors();
    }

    OnClose = () =>{

        Validator.ClearErrors();
        this.props.LogInWindowClose();
        this.props.history.replace("/");
    }

    OnCloseErrorPanel = () => {
        Validator.ClearErrors();
        this.props.LogInWindowClose();
    }
    
    OnUserLogIn = event =>{
           
        event.preventDefault();
        const {UserId, Passcode} = this.props.userCredential;
        Validator.UserIdValidation({UserId, Passcode});
        const errors = Validator.GetErrors();
        errors.length === 0 ? this.props.UserLogIn({UserId, Passcode}) : this.props.LogInError(errors);
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

    OnValueChange = (event) =>{

        event.preventDefault();
        var data = this.props.userCredential;  
            
        if( event.target.id === "userid")
        {
            data.UserId = event.target.value;
        }
        if(event.target.id === "passcode")
        {
            data.Passcode = event.target.value;
        }    

        this.setState({
            UserData: data
        });
    }

    render()
    {    
        console.log("Hey, I am inside my home");
        if(this.props.isUserAuthenticated)
        {
            return (<Redirect exact to='/Home'/>)
        }
        
        return(
            <Aux>
                <LogInScreen
                    OnLogIn={this.OnUserLogIn} 
                    OnCloseClick={this.OnClose} 
                    OnValueChange = {this.OnValueChange}
                    OnKeyPress = {this.OnKeyPress}
                    UserIdValue = {this.props.userCredential.UserId}
                    PassValue = {this.props.userCredential.Passcode}
                    UserId = "userid"
                    Passcode = "passcode" 
                    ErrorMsg = {this.props.LogInErrors} 
                    OnCloseErrorPanel = {this.OnCloseErrorPanel}                
                />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {

    return {        
        userCredential: state.AuthReducer.UserData,
        isUserLoggedIn: state.AuthReducer.IsUserLoggedIn,
        LogInErrors : state.AuthReducer.LogInErrors,
        isUserAuthenticated: state.AuthReducer.IsUserAuthenticated
    };
}

LogInAuth.propTypes = {

    userCredential: PropTypes.object.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,
    UserLogIn: PropTypes.func.isRequired,
    LogInError: PropTypes.func.isRequired,
    LogInWindowClose: PropTypes.func.isRequired,
    LogInErrors: PropTypes.string,
    isUserAuthenticated: PropTypes.bool
}

const mapDispatchToProps = {
        UserLogIn,
        LogInError,
        LogInWindowClose
}

export default connect(mapStateToProps, mapDispatchToProps ) (withRouter(LogInAuth));