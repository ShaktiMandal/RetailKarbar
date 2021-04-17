import React from 'react'
import classes from './NotFound.module.css'

const NotFound = () => {

    var isUserLoggedIn = sessionStorage.getItem("UserId") !== null ? true : false;
    return (
        <div className={classes.NotFound}>
           
                <span> We are sorry! </span>
                <span> The page you are looking for is not available on our site. </span>
                <span> Please go to <a href={isUserLoggedIn ? '/Home' : '/'}> Retail Karbar </a>  home page. </span>
      
        </div>
    )
}

export default NotFound;
