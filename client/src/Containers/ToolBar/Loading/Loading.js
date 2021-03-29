import e from 'cors';
import React from 'react';
import classes from './Loading.module.css';

const Loading = (props) => {

  let displayMessageArray = [];
  let displayMessage = props.LoadingMessage !== undefined &&  props.LoadingMessage.length > 0 ? props.LoadingMessage : "Loading....";

  for(let index = 0; index < displayMessage.length ; index++)
  { 
    if(displayMessage[index] !== ' ')
    {
      displayMessageArray[index] = <span style={{["--i"]: (index + 1).toString()}}>{displayMessage[index]}</span>;   
    }
    else
    {
      displayMessageArray[index] = <span style={{["--i"]: (index + 1).toString()}}>&nbsp; &nbsp;</span>;   
    }
  }

   return (
       <React.Fragment>
          <div className={classes.Loader}>
            {displayMessageArray}           
          </div>
        </React.Fragment>
   );
}

export default Loading;