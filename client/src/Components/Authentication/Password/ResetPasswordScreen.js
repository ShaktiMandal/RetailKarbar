import React from 'react';
import classes from './ResetPassword.module.css';
import AvatarImage from '../../../Assests/Logo/Avatar.png';
import Input from "../../../Containers/ToolBar/Input/Input";

const ResetPasswordScreen = (props) => {

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
                            IsRequired 
                            RequiredLength="10" 
                            id = {props.UserId}
                            OnChange = {props.OnValueChange}
                            InputValue ={props.UserIdValue}
                            />
                            <h5>Mobile Number</h5>
                        </div>
                        <div className={classes.inputdiv }>
                            <Input 
                            type="password"  
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
                            IsRequired 
                            id = {props.ConfirmPasscodeId}                                   
                            InputValue ={props.ConfPasscodeValue}
                            OnChange = {props.OnValueChange}
                            />
                            <h5>Confirm Passcode</h5>
                        </div>     
                        <div className={classes.logInBtn}>
                            <input 
                            Value="Reset Password"                             
                            onClick = {props.OnChangePassword}
                            type="button"/>                               
                        </div>                         
                    </div>
                    <div className={classes.BottomBar}> </div>
                </div>
            </div>             
        </React.Fragment>
    )
}

export default ResetPasswordScreen;