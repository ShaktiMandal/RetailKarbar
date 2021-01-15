import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from '../FormCloseButton/FormCloseButton.module.css';

const FormCloseButton = (props) => {

    return(
            <Aux>
                <div className={classes.CloseBtnDiv}>
                    <span className={classes.closebtn} onClick={props.OnCloseClick}>&#215;</span>                
                </div>
            </Aux>
        )
}

export default FormCloseButton;