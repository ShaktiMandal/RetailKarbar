import * as ActionTypes from './ActionTypes';

export const AddItemToCart = (productItem, orderList) => (dispatch) => {

    if(productItem)
    {
        let productCount = 0;
        let matchedItem = orderList.find(item => item.Id === productItem._id 
                                                             || item.Id === productItem.Id);
        if( orderList.length > 0 && matchedItem !== undefined )
        {
            let matchedIndex = orderList.map( item => item.Id)
                                        .indexOf(productItem._id === undefined ? 
                                                productItem.Id : productItem._id);
            let itemPrice =  orderList[matchedIndex].Price / orderList[matchedIndex].ItemCount;
            orderList[matchedIndex].ItemCount = orderList[matchedIndex].ItemCount + 1;
            orderList[matchedIndex].Price     = itemPrice * orderList[matchedIndex].ItemCount;                      
        }
        else
        {
            let item = {
                Id: productItem._id,
                ProductName: productItem.ProductName,
                Price: productItem.Price,
                ItemCount : 1
            } 
            orderList.push(item);           
        }

        let totalPurchaseAmount = orderList.reduce( (accumulator, currentValue) =>{
                productCount = productCount + currentValue.ItemCount;
                return accumulator + currentValue.Price;
        }, 0.00);

        dispatch({
            type: ActionTypes.ORDERPRODUCT_SUCCESSFULLY,
            payload: {
                OrderList: orderList,
                TotalAmount: totalPurchaseAmount,
                NoOfProducts: productCount
            }
        })
    }
    else{

        dispatch({
            type: ActionTypes.ORDERPRODUCT_FAILED,
            payload: []
        })
    }
}

export const ShowYourCartItem = () => async (dispatch) =>{

    dispatch({
        type: ActionTypes.DISPLAYORDERITEM
    });
}

export const ClearOrderList = () => async (dispatch) =>{

    dispatch({
        type: ActionTypes.CLEARORDERLIST
    })
}

export const RemoveItemFromCart = (index, orderList) => (dispatch) =>{

    if(index !== -1)
    {
        orderList.splice(index, 1);
    }   

    let productCount = 0;
    let totalPurchaseAmount = orderList.reduce( (accumulator, currentValue) =>{

        productCount = productCount + currentValue.ItemCount;
            return accumulator + currentValue.Price;
    }, 0.00);

    dispatch({
        type: ActionTypes.REMOVEPRODUCTFROMCART,
        payload: {
            OrderList: orderList,
            TotalAmount: totalPurchaseAmount,
            NoOfProducts: productCount
        }
    })
}

export const ReduceProductCount = (index, orderList) => (dispatch) => {

    let productCount = 0;
    let itemPrice    = orderList[index].Price / orderList[index].ItemCount;  

    orderList[index].ItemCount = orderList[index].ItemCount - 1;
    orderList[index].Price     = orderList[index].ItemCount * itemPrice;

    let totalPurchaseAmount = orderList.reduce( (accumulator, currentValue) =>{
        productCount = productCount + currentValue.ItemCount;
        return accumulator + currentValue.Price;
    }, 0.00);

    dispatch({
        type: ActionTypes.ORDERPRODUCT_SUCCESSFULLY,
        payload: {
            OrderList: orderList,
            TotalAmount: totalPurchaseAmount,
            NoOfProducts: productCount
        }
    })
}

