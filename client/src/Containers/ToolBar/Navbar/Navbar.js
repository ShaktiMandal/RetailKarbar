import React from "react";
import {Component} from "react";
import Aux from '../../../HOC/Auxiliary';
import classes from './Navbar.module.css';
import Hamburger from '../HamburgerIcon/HamburgerIcon';

const Navbar = (props) => {

       return (
        <Aux>
            <nav className={classes.navStyle} id="navStyle">     
                <div className={classes.left}>            
                    <Hamburger clicked={props.hamburgerClicked}/>
                </div>
            </nav>
        </Aux>      
       );
}
export default Navbar;