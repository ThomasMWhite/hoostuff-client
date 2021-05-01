import {SET_LISTINGS, SET_AUTHENTICATED, LOADING, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED} from './types';

import axios from "axios"

export const loginUser = (userData, history) =>(dispatch)=>{
    dispatch({type: LOADING})
    axios.get('/account', {
        auth: {
            username: userData.username,
            password: userData.password
        }
    })
        .then(res=>{
            console.log(res)
            dispatch({type: CLEAR_ERRORS})
            dispatch({type: SET_AUTHENTICATED, payload: userData})
            history.push('/')
        })
        .catch(err=>{
            dispatch({
                type: SET_ERRORS,
                payload: "Incorrect username or password"
            })
        })
}

export const logoutUser = () =>(dispatch)=>{
    dispatch({type: SET_UNAUTHENTICATED})
}

export const signupUser = (userData, history) => (dispatch)=>{
    console.log('signing up user')
    dispatch({type: CLEAR_ERRORS})

    dispatch({type: LOADING})
    
    axios.post('/account', userData)
        .then(res=>{
            console.log(res)
            dispatch({type: CLEAR_ERRORS})
            dispatch({type: SET_AUTHENTICATED, payload: userData})
            history.push('/')
        })
        .catch(err=>{
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getAllListings = () => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    console.log('getting listings')
    axios.get('/listing')
        .then(res=>{
            dispatch({
            type: SET_LISTINGS,
            payload: res.data
        })
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}