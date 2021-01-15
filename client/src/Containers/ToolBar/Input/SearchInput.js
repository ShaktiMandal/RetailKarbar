import React from 'react';
import classes from './SearchInput.module.css'
import Aux from '../../../HOC/Auxiliary';
import searchIcon from '../../../Assests/Logo/SearchIcon.png';


const SearchInput = (props) =>{

    return (
        <Aux>
            <input    
            style={props.AddtionalStyle}            
            className={classes.AnotherSearchInput} 
            type="text"
            placeholder = {props.PlaceHolderText}
            value= {props.SearchItem}
            onChange = {props.onUpdateValue}
            onFocus = {props.OnFocusInput}                
            />  
        </Aux>
    )
}

export default SearchInput;