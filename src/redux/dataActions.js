import {SET_LISTINGS, SET_AUTHENTICATED, LOADING, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED, ADD_LISTING, SET_FAVORITES} from './types';

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

export const clearErrors = () =>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
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

const getFavorites = (userData) => (dispatch) =>{
    console.log('hello')
    console.log(userData)
    
}

export const getAllListings = (type, userData) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    console.log('getting listings')

    let route = '/listing'
    if(type!=='all'){
        route= route + '/'+type
    }
    
    axios.get(route)
        .then(res1=>{
            
            if(userData.username===''){
                dispatch({type: SET_FAVORITES, payload: {all: res1.data, favorited: []}})
                return;
            }
            console.log('got past that')
            axios.get('/favorite', {
                auth: {
                    username: userData.username,
                    password: userData.password
                }
            })
                .then(res=>{
                    console.log('iaejfoij')
                    console.log(res.data)
                    dispatch({type: SET_FAVORITES, payload: {all: res1.data, favorited: res.data.listing_ids}})
                })
                .catch(err=>{
                    console.log('error loading data')
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

export const getMyListings = (userData) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    console.log('getting my listings')

    let route = '/listing/mine'
    
    axios.get(route, {
        auth: {
            username: userData.username,
            password: userData.password
        }
    })
        .then(res1=>{

            axios.get('/favorite', {
                auth: {
                    username: userData.username,
                    password: userData.password
                }
            })
                .then(res=>{
                    console.log('iaejfoij')
                    console.log(res.data)
                    dispatch({type: SET_FAVORITES, payload: {all: res1.data, favorited: res.data.listing_ids}})
                })
                .catch(err=>{
                    console.log('error loading data')
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

export const addListing = (listingData, userData, type, edit) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    console.log('getting listings')
    let route = '/listing/'+type

    

    dispatch({type: LOADING})

    if(edit){
        route = '/listing/'+type
        axios.put(route, listingData, {
            auth: {
                username: userData.username,
                password: userData.password
            }
        })
            .then(res=>{
                listingData.category = type
                dispatch({type:CLEAR_ERRORS})
                dispatch({type:ADD_LISTING})
            console.log(res)
            })
            .catch(err=>{
                console.log(err.response)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
    }
    else{
        axios.post(route, listingData, {
            auth: {
                username: userData.username,
                password: userData.password
            }
        })
            .then(res=>{
                listingData.category = type
                dispatch({type:CLEAR_ERRORS})
                dispatch({type:ADD_LISTING})
            console.log(res)
            })
            .catch(err=>{
                console.log(err.response)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
    }

    
}

export const deleteListing = (listing_id, userData, type) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    console.log('getting listings')
    let route = '/listing/'+listing_id

    dispatch({type: LOADING})

    axios.delete(route, {
        auth: {
            username: userData.username,
            password: userData.password
        }
    })
        .then(res=>{
            dispatch({type:CLEAR_ERRORS})
            dispatch({type:ADD_LISTING})
            console.log(res)
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const favoriteListing = (listing_id2, userData) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    dispatch({type: LOADING})

    axios.post('/favorite', {listing_id: listing_id2}, {
        auth: {
            username: userData.username,
            password: userData.password
        }
    })
        .then(res=>{
            dispatch({type:CLEAR_ERRORS})
            dispatch({type:ADD_LISTING})
            console.log(res)
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const unfavoriteListing = (listing_id2, userData) => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
    dispatch({type: LOADING})

    console.log(listing_id2)

    axios.delete('/favorite/'+listing_id2, {
        auth: {
            username: userData.username,
            password: userData.password
        }
    })
        .then(res=>{
            dispatch({type:CLEAR_ERRORS})
            dispatch({type:ADD_LISTING})
            console.log(res)
        })
        .catch(err=>{
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

