import React from 'react';
import classNamees from './Loading.module.css';
import Image from '../../../Assests/Logo/spinner4.gif';

const Loading = (props) => {

   return (
       <React.Fragment>
    
          <div className={classNamees.busyloader}>           
            <h3 style={{zIndex: 1000, color: "white"}}>{props.LoadingMessage}</h3>
          </div>
        </React.Fragment>
   );
}

export default Loading;