import React from 'react';
import classes from './Loading.module.css';

const Loading = (props) => {

   return (
       <React.Fragment>
    
          {/* <div className={classNamees.busyloader}>           
            <h3 style={{zIndex: 1000, color: "white"}}>{props.LoadingMessage}</h3>
          </div> */}
          <div className={classes.Loader}>
            <span style={{["--i"]: "1"}}>L</span>
            <span style={{["--i"]: "2"}}>o</span>
            <span style={{["--i"]: "3"}}>a</span>
            <span style={{["--i"]: "4"}}>d</span>
            <span style={{["--i"]: "5"}}>i</span>
            <span style={{["--i"]: "6"}}>n</span>
            <span style={{["--i"]: "7"}}>g</span>
            <span style={{["--i"]: "8"}}>.</span>
            <span style={{["--i"]: "9"}}>.</span>
            <span style={{["--i"]: "10"}}>.</span>
            <span style={{["--i"]: "11"}}>.</span>
          </div>
        </React.Fragment>
   );
}

export default Loading;