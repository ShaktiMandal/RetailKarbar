import React from 'react';
import classes from './NavigationItem.module.css';
import {Link} from 'react-router-dom';

const NavigationItem = (props) =>{
    return(
        <li className={classes.liStyle} >
                <Link className={classes.anchorStyle} to={props.LinkedTo}>{props.children}</Link>
        </li>
    )
}
 
export default NavigationItem;