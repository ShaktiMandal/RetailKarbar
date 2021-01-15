import classes from './SearchText.module.css';
import React from 'react';

const AnimatedSearchText = (props) => {

    return(
        <div className ={classes.TextDiv}>
          <h1 className={classes.SearchText}>{props.Text} </h1> 
        </div>
    )
}

export default AnimatedSearchText;