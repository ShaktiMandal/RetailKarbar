import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from './RedirectItem.module.css';


const RedirectItem = (props) => {
       
    return(                
        <div className={classes.RedirectContainer}>
            <div className={classes.RedirectIcon} onClick ={()=> props.OnClick(props.RedirectedTo)}>
                <img src={props.RedicrectImage}/>
            </div>
        </div>
    )
}

export default RedirectItem;