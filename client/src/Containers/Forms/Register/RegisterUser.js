import React from "react";
import Aux from '../../../HOC/Auxiliary';
import classes from '../LogIn/logIn.module.css';
import Button from '../../ToolBar/Button/button';
import AvatarImage from '../../../Assests/Logo/Avatar.png';
import LogInBackgroundImg from '../../../Assests/Logo/LogIn.png';
import ErrorBox from '../../ToolBar/Error/Error';
import CloseButton from "../../ToolBar/FormCloseButton/FormCloseButton";
import Input from "../../ToolBar/Input/Input";

const Register = (props) =>{

    var ErrorContainer = props.ErrorMsg.length === 0 ? null :
                            <div className={classes.ErrorDiv}>
                                <ErrorBox 
                                CloseErrorPanel = {props.OnCloseErrorPanel}
                                ErrorMsg={props.ErrorMsg}/>      
                            </div>
        return(            
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.LeftDiv}>
                        <img src={LogInBackgroundImg} alt="image missing" className={classes.leftImage}></img>
                    </div>
                    <div className={classes.rightDiv}>  
                        {ErrorContainer}             
                        <div className={classes.CloseBtnDiv}>
                            <CloseButton OnCloseClick ={props.OnCloseClick}/>      
                        </div>    
                        <div className={classes.logInContainer}> 
                            <div className={classes.logInform} noValidate> 
                                <img src={AvatarImage} className={classes.avatarImage} alt="image missing"/>
                                <h2>Register</h2>
                                <div className={classes.inputdiv}>
                                    <Input type="tel" 
                                    IsRequired 
                                    RequiredLength="10"
                                    MinLength="10"
                                    InputPattern = "/d*"
                                    id = {props.UserId}
                                    OnKeyPress = {props.OnKeyPress}
                                    OnChange = {props.OnValueChange}
                                    InputValue ={props.UserIdValue}
                                    />
                                    <h5>Mobile Number</h5>
                                </div>
                                <div className={classes.inputdiv }>
                                    <Input 
                                    type="password"                                   
                                    InputPattern = "/d*"
                                    IsRequired 
                                    id = {props.PasscodeId}                                  
                                    InputValue ={props.PasscodeValue}
                                    OnChange = {props.OnValueChange}
                                    />
                                    <h5>Passcode</h5>
                                </div>
                                <div className={classes.inputdiv }>
                                    <Input 
                                    type="password"
                                    InputPattern = "/d*"
                                    IsRequired 
                                    id = {props.ConfPasscodeId}                                   
                                    InputValue ={props.ConfPasscodeValue}
                                    OnChange = {props.OnValueChange}
                                    />
                                    <h5>Confirm Passcode</h5>
                                </div>   
                                <div className={classes.logInBtn}>
                                    <Button 
                                    Value="Register" 
                                    ButtonType="submit"
                                    OnClick = {props.OnRegisterUser}
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
                                   }}
                                    ></Button>
                                </div>                         
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
           
        );
}

export default Register;