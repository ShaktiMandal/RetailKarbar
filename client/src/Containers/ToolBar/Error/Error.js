import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from '../Error/Error.module.css';

const Error = (props) => {

    return(
            <Aux>
                <div className={classes.alert}>
                <span className={classes.closebtn} onClick={props.CloseErrorPanel}>&times;</span> 
                <strong> </strong> {props.ErrorMsg}
                </div>
            </Aux>
    )
}

export default Error;