import React from "react";
import classes from './logIn.module.css';
import Aux from '../../../HOC/Auxiliary';
import Button from '../../ToolBar/Button/button'
import AvatarImage from '../../../Assests/Logo/Avatar.png';
import LogInBackgroundImg from '../../../Assests/Logo/LogIn.png';
import ErrorBox from '../../ToolBar/Error/Error';
import Hyperlink from "../../ToolBar/Hyperlink/Hyperlink";
import CloseButton from "../../ToolBar/FormCloseButton/FormCloseButton";
import Input from "../../ToolBar/Input/Input";

const logIn = (props) => { 
      
        var ErrorContainer = props.ErrorMsg.length === 0 ? null :
                            <div className={classes.ErrorDiv}>
                                <ErrorBox CloseErrorPanel = {props.OnCloseErrorPanel}  ErrorMsg={props.ErrorMsg}/>      
                            </div>
        return(  
            <Aux>
            <div className={classes.Container}>
                 {/* <div className={classes.LeftDiv}>
                     <img src={LogInBackgroundImg} alt="image missing" className={classes.leftImage}></img>
                 </div> */}
                 <div className={classes.rightDiv}> 
                    {ErrorContainer}                    
                    <div className={classes.CloseBtnDiv}>
                        <CloseButton OnCloseClick ={props.OnCloseClick}/>      
                    </div>                          
                     <div className={classes.logInContainer}> 
                        <div onSubmit={()=> props.OnLogIn(props.UserIdValue, props.PassValue)} className={classes.logInform}> 
                            <img src={AvatarImage} className={classes.avatarImage} alt="image missing"/>
                            <h2>Log In</h2>
                            <div className={classes.inputdiv}>
                                    <Input type="tel"                                     
                                    id = {props.UserId}
                                    IsRequired 
                                    RequiredLength="10"
                                    InputPattern="[0-9]"
                                    OnKeyPress = {props.OnKeyPress}
                                    OnChange={props.OnValueChange}
                                    InputValue ={props.UserIdValue}
                                    />
                                    <h5>Mobile Number</h5>
                            </div>
                            <div className={classes.inputdiv }>
                                <Input type="password" 
                                id = {props.Passcode}
                                IsRequired 
                                OnChange={props.OnValueChange}
                                InputValue ={props.PassValue}
                                />
                                <h5>Passcode</h5>
                            </div>
                            <div>
                                <Hyperlink LinkedTo='../Authentication/Password'>Forgot Password</Hyperlink>
                            </div>      
                            <div className={classes.logInBtn}>
                                <Button 
                                Value="Log In" 
                                OnClick = {props.OnLogIn}
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
                        </div>
                     </div>
                  </div>
             </div>
         </Aux>  
        );
}

export default logIn;