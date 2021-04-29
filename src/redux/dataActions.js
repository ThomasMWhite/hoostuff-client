import {SET_LISTINGS, SET_AUTHENTICATED, LOADING, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED} from './types';

import axios from "axios"

export const loginUser = (userData, history) =>(dispatch)=>{
    dispatch({type: LOADING})
    axios.post('/login', userData)
        .then(res=>{
            dispatch({type: CLEAR_ERRORS})
            dispatch({type: SET_AUTHENTICATED, payload: userData})
            history.push('/')
        })
        .catch(err=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logoutUser = () =>(dispatch)=>{
    dispatch({type: SET_UNAUTHENTICATED})
}