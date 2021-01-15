import React from "react";
import Aux from '../../../HOC/Auxiliary';
import classes from '../Password/Password.module.css';
import Button from '../../ToolBar/Button/button';
import AvatarImage from '../../../Assests/Logo/Avatar.png';
import LogInBackgroundImg from '../../../Assests/Logo/LogIn.png';
import ErrorBox from '../../ToolBar/Error/Error';
import CloseButton from "../../ToolBar/FormCloseButton/FormCloseButton";
import Input from "../../ToolBar/Input/Input";

const UpdatePassword = (props) =>{
    
    console.log(props);
    var ErrorContainer = props.ErrorMsg.length === 0 ? null :
                        <div className={classes.ErrorDiv}>
                            <ErrorBox CloseErrorPanel = {props.OnCloseErrorPanel}  ErrorMsg={props.ErrorMsg}/>      
                        </div>
        return(            
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.logInContainer}>
                        {ErrorContainer}  
                        <div className={classes.CloseBtnDiv}>
                            <CloseButton OnCloseClick ={props.OnCloseClick}/>      
                        </div>  
                    
                        <form onSubmit={props.OnChangePassword} className={classes.logInform} noValidate> 
                            <img src={AvatarImage} className={classes.avatarImage} alt="image missing"/>
                            <h2>Reset Password</h2>
                            <div className={classes.inputdiv}>
                                    <Input type="tel" 
                                    id = {props.UserId}
                                    IsRequired 
                                    RequiredLength="10"
                                    InputPattern = "/d*"
                                    OnChange={props.OnValueChange}
                                    InputValue ={props.UserIdValue}
                                    OnKeyPress ={props.OnKeyPress}
                                    />
                                    <h5>Mobile Number</h5>
                            </div>
                            <div className={classes.inputdiv }>
                                <Input type="password" 
                                id = {props.PasscodeId}
                                IsRequired 
                                InputPattern = "/d*"
                                OnChange={props.OnValueChange}
                                InputValue ={props.PasscodeValue}                               
                                />
                                <h5>Passcode</h5>
                            </div>
                            <div className={classes.inputdiv}>
                                <Input 
                                type="password" 
                                InputPattern = "/d*"
                                id = {props.ConfirmPasscodeId} 
                                IsRequired 
                                InputValue ={props.ConfirmPasscodeValue}
                                OnChange={props.OnValueChange}                                
                                />
                                <h5>Confirm Passcode</h5>
                            </div>   
                            <div className={classes.logInBtn}>
                                <Button 
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
                                Value="Reset Password" 
                                ButtonType="submit"
                                ></Button>
                            </div>                         
                        </form>                        
                    </div>                    
                </div>
            </Aux>
        );
}

export default UpdatePassword;