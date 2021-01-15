import React from "react";
import Aux from '../../../HOC/Auxiliary';
import Button from '../../ToolBar/Button/button';
import Input from "../../ToolBar/Input/Input";
import classes from './EditFrom.module.css'



const EditFrom = (props) =>{

return(
    <Aux>
        <form onSubmit={props.OnEditDetails} 
              className={classes.FromContainer} 
              style={props.EditFromStyle} noValidate> 
            <h2>{props.HeaderText}</h2>
            <div className={classes.inputdiv}>
                    <Input type="text" 
                    InputValue = {props.FirstInputValue}                    
                    OnChange={props.OnFirstValueChange}/>
                    <h5>{props.FirstInputLabel}</h5>
            </div>
            <div className={classes.inputdiv }>
                <Input 
                type="number"  
                InputValue = {props.SecondInputValue}    
                OnChange={props.OnSecondValueChange}/>
                <h5>{props.SecondInputLabel}</h5>
            </div>  
            <div className={classes.inputdiv}>
                <Input 
                type="number"
                OnChange={props.OnThirdValueChange}
                InputValue = {props.ThirdInputValue} 
                />
                <h5>{props.ThirdInputLabel}</h5>
            </div>      
            <div className={classes.Selectiondiv}>
                <h5>{props.SelectionHeader}</h5>
                <select>
                    {
                        props.SelectionOptions.map( (item , index) =>{
                            return (<option>{item}</option>)
                        })
                    }
                </select>
            </div>           
            <div className={classes.logInBtn}>
                <Button 
                Value="Update" 
                ButtonType = "submit"
                ButtonStyle ={{     
                    width: "100%",                         
                    border: "none",
                    outline: "none",
                    height: 35,
                    color: "white",
                    fontSize: 20,
                    backgroundColor: "lightseagreen",
                    textAlign: "center",
                    userSelect: "none"
                }}></Button>
            </div>                         
        </form>
    </Aux>
    )
}


export default EditFrom;


