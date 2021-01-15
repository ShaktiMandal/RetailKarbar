import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Hyperlink.module.css';

const Hyperlink = (props) =>{

    return(
        <Link  to={props.LinkedTo} className={classes.LinkStyle}>{props.children}</Link>
    )
}

export default Hyperlink;