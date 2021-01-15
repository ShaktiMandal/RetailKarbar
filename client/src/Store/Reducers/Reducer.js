import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import RegisterReducer from './RegisterReducer';
import PasswordResetReducer from './PasswordResetReducer';
import AddProductReducer from './AddProductReducer';
import ProductReducer from './ProductReducer';
import OrderReducer from './OrderReducer';
import CustomerDetailsReducer from './CustomerDetailsReducer';
import CustomersReducer from './CustomersReducer';
import PaymentReducer from './PaymentReducer';


const reducer = combineReducers({
    AuthReducer,
    RegisterReducer,
    PasswordResetReducer,
    ProductReducer,
    AddProductReducer,
    OrderReducer,
    CustomerDetailsReducer,
    CustomersReducer,
    PaymentReducer
});

export default reducer;