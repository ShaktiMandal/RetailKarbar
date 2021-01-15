import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from './HamburgerIcon.module.css';

const Hamburger = (props) =>{

    return(
        <Aux>
            <div className={classes.hamburgerIcon} onClick={props.clicked}>
                <div className={classes.Line1}></div>
                <div className={classes.Line2}></div>
                <div className={classes.Line3}></div>
                <div className={classes.Line4}></div>
            </div>
        </Aux>
    )
}

export default Hamburger;