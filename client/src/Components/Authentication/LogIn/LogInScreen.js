import React from 'react';
import classes from './LogInScreen.module.css';
import AvatarImage from '../../../Assests/Logo/Avatar.png';
import Hyperlink from "../../../Containers/ToolBar/Hyperlink/Hyperlink";
import Input from "../../../Containers/ToolBar/Input/Input";

const LogInScreen = (props) => {

    return(

        <React.Fragment>
            <div className={classes.logInContainer}> 
                <div className={classes.DisplayImage}>                 
                </div>

                <div className={classes.AuthenticatedArea}>
                    <div className={classes.TopBar}>                  
                    </div>
                    <div  className={classes.logInform}> 
                        <img src={AvatarImage} className={classes.avatarImage} alt="image missing"/>
                        <div>                           
                            {props.ErrorMsg.length === 0 ? null : <h4 style={{textAlign:"center", color: "red"}}>{props.ErrorMsg}</h4>}
                        </div>
                        <div className={classes.inputdiv}>
                            <Input type="tel"      
                            id = {props.UserId}
                            IsRequired 
                            RequiredLength="10"                                                    
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
                        <div className={classes.HyperLinkItem}>
                            <div className={classes.SignUpLink}>
                                <Hyperlink className={classes.SignUp} LinkedTo='../Authentication/Register'> Sign up </Hyperlink>
                            </div>
                            <div className={classes.ForgotPasswordLink}>
                                <Hyperlink LinkedTo='../Authentication/Password'>Forgot Password?</Hyperlink>
                            </div>
                           
                        </div>      
                        <div className={classes.logInBtn}>
                            <input 
                            Value="Log In"                             
                            onClick = {props.OnLogIn}
                            type="button"/>                               
                        </div>                         
                    </div>
                    <div className={classes.BottomBar}> </div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default LogInScreen;