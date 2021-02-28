import React from 'react';
import {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Aux from '../../HOC/Auxiliary';
import classes from './Layout.module.css';
import Navbar from '../../Containers/ToolBar/Navbar/Navbar';
import SideBar from '../../Containers/ToolBar/SideBar/SideBar';
import BackgroundImage from '../../Assests/Image/LandingBackgroundImage.jpg';

class Layout extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isSideBarDisplay: false,
            isLogInDisplay: false
        };
    }    

    DisplaySideBar()
    {
        this.setState({isSideBarDisplay: false})
    }

    hamburgerClickedHandler = () => {
        this.setState((prevState) =>
        { 
            return this.state.isSideBarDisplay = !prevState.isSideBarDisplay;
        });
    }

    OnSidebarClicked = () =>{
        this.setState({isSideBarDisplay: false});        
    }

    OnClickContainer = (event) =>{
        console.log("Container clicked");
    }
    
    render()
    {
        console.log("Hamburger clicked", this.state.isSideBarDisplay );
        var sideBar   = this.state.isSideBarDisplay ?   <SideBar clicked={this.OnSidebarClicked} Opened={this.state.isSideBarDisplay} closed={this.DisplaySideBar}/> : null;
   
        return(
            <Aux>
                <main className={classes.mainContainer}>                   
                     {this.props.children}
                </main>
            </Aux>
        );    
    }
}

export default Layout;