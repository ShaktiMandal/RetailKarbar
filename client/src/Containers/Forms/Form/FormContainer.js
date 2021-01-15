import React from "react";
import Aux from '../../../HOC/Auxiliary';
import classes from './FormContainer.module.css';
import logIn  from '../LogIn/LogIn';
import Register from '../Register/RegisterUser';
import LogInBackgroundImg from '../../../Assests/Logo/LogIn.png';

const Form = (props) => {

    var path  = props.location.pathName;
    if(path)
    {
        path = path.split("/");
        if(path[1] === "LogIn")
        {
            FormType = logIn;
        }
        else if(path[1] === "Register")
        {
            FormType = Register;
        }
    }
    return(            
        <Aux>
           <div className={classes.Container}>
                <div className={classes.LeftDiv}>
                    <img src={LogInBackgroundImg} alt="image missing" className={classes.leftImage}></img>
                </div>
                <div className={classes.rightDiv}>                   
                    <div className={classes.logInContainer}> 
                        <FormType/>
                    </div>
                 </div>
            </div>
        </Aux>
    )
}

export default Form;