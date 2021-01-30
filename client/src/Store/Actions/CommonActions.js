import {LOADING} from './ActionTypes';

export const SetLoading = (value) => (dispatch) =>{

    console.log("calling setLoading function");
       
    dispatch({
        type: LOADING,
        payload: {
            DisplayLoading : value
        }
    })
}