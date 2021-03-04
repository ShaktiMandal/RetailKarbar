import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from './RedirectItem.module.css';


const RedirectItem = (props) => {
       
    return(                
        <div className={classes.RedirectContainer}>            
                <img src={props.RedicrectImage} onClick ={()=> props.OnClick(props.RedirectedTo)}/>          
        </div>
    )
}

export default RedirectItem;