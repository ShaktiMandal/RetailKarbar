import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import classes from './ProductItem.module.css'

const ProductItem = (props) => {

    let expDate = GetFormatedExpDate(props.ExpairyDate);
    debugger;


    return(
        <Aux>
            <div className={classes.itemDiv}>
                <div className={classes.itemDescription}>
                    <p>{props.ProductName}</p>
                </div>
                <div className={classes.itemDescription}>
                    <p>{props.Stock}</p>
                </div>
                <div className={classes.itemDescription}>
                    <p>{props.Manufacturer}</p>
                </div>
                <div className={classes.itemDescription}>
                    <p>{expDate}</p>
                </div>
                <div className={classes.itemDescription}>
                    <button 
                    onClick={props.OnAddFavourite}
                    style={{
                            fontSize: "20px",
                            margin: "auto",
                            userSelect: "none",
                        }}>&#x2764;</button>
                            
                </div>
                <div className={classes.itemDescription}>
                    <button onClick={props.OnAddProduct}
                    style={{
                            userSelect: "none",
                            margin: "auto",
                            fontSize: 30,
                        }}>&#x2b;</button>
                </div>
            </div>
        </Aux>
    )
}

function GetFormatedExpDate(expDate)
{
    debugger;
    let dateLength = expDate.indexOf("T");
    let dateAlone = expDate.slice(0, dateLength);
    
    return dateAlone;
}

export default ProductItem;