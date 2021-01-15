import classes from './NotFoundMessage.module.css';
import React from 'react';
import NotFoundImg from '../../../Assests/Logo/looking-into-telescope_4.png';

const NotFoundMessage = (props) => {

    return(
        <div className={classes.notfound}>
            <img src={NotFoundImg} className={classes.NotFoundImgClass}/>
            <div className={classes.notfound404}>
                <h1>{props.Message}</h1>                
            </div>
        </div>
    )
}

export default NotFoundMessage;