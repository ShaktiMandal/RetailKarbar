import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from './Information.module.css';

const Information = (props) => {

    return(
        <Aux>
            <div className={classes.alert}>
            <span className={classes.closebtn} onClick={props.CloseErrorPanel}>&times;</span> 
            <strong> </strong> {props.InformationMsg}
            </div>
        </Aux>
    )
}

export default Information;