import React from 'react';
import Aux from '../../HOC/Auxiliary';
import classes from './Customers.module.css';
import CustomerAvatarIcon from '../../Assests/Logo/Customer-Avatar.png';
import OrderImg from '../../Assests/Logo/Order-report.png';
import Payment from '../../Assests/Logo/Payment-due.png';
import ReturnOrder from '../../Assests/Logo/return-order.png';
import NotFoundMessage from '../../Containers/ToolBar/MessageBox/NotFoundMessage';
import Loading from '../../Containers/ToolBar/Loading/Loading';
import AnimatedText from '../../Containers/ToolBar/SearchText/SearchText';

const CustomerResult = (props) => {
    
       
    if(props.IsShowLoading === true)
    {
        return( <Loading LoadingMessage="Fetching cutomers..."/> );
    };

    return(
        <Aux>
            <div className={classes.SearchResultDiv}>
            {
                props.customerDetails.length > 0 ? 
                <ul>
                    {
                            props.customerDetails.map( (item, index) => {
                            return(
                                <li>
                                    <div className={classes.CustomerContainer}>
                                        <div className={classes.CustomerAvatar}>
                                            <img src= {CustomerAvatarIcon} className={classes.CustomerAvatarImg}/>
                                        </div>
                                        <div className={classes.CustomerDetails }>
                                            <section>
                                                <div><strong>Customer Name :</strong> {item.CustomerName}</div>
                                                <div><strong>Phone Number :</strong> {item.PhoneNumber}</div>
                                                <div><strong> Customer Id :</strong> {item.CustomerId}</div>
                                            </section>                                                       
                                        </div>
                                        <div className={classes.CustomerAction}>
                                            <div onClick={ (event) => props.OnShowPurchaseHistory(event, index)}>
                                                <img src={OrderImg}  className={classes.OrderIcon}/>
                                            </div>
                                            <div onClick={(event) => {props.OnDuePayment(event, index)}}>
                                                <img src={Payment} className={classes.OrderIcon}/>
                                            </div>                                         
                                        </div>                                                    
                                    </div>                                                
                                </li>
                            )
                        })
                    }
                </ul> : props.IsCustomerSearched ? <NotFoundMessage Message="Oops! There is no such customer"/> : null
            }
            </div>
        </Aux>
    )
}

export default CustomerResult;
