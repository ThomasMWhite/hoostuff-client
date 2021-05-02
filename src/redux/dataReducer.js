import { CardActionArea } from '@material-ui/core';
import {SET_LISTINGS, SET_AUTHENTICATED, LOADING, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED, ADD_LISTING, SET_FAVORITES} from './types';

const initialState = {
    listings: [],
    username: "",
    password: "",
    loading: false,
    error: "",
    param: ""
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_LISTINGS:

            state.listings = action.payload;
            return {
                ...state,
            }
        case LOADING:
            return {
                ...state, 
                loading: true
            }
        case SET_ERRORS:{
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                param: action.payload.param
            }
        }
        case CLEAR_ERRORS:{
            return {
                ...state,
                loading: false,
                error: "",
                param: ""
            }
        }
        case ADD_LISTING:{
            window.location.reload(false)
            return {
                ...state
            }
        }
        case SET_FAVORITES:{
            console.log(action.payload.favorited)
            console.log(action.payload.all)
            for (var key in action.payload.all){
                // console.log(key)
                let isFavorited = false
                for(var j=0; j<action.payload.favorited.length; j++)
                {
                    if(action.payload.favorited[j]===action.payload.all[key].listing_id)
                    {
                        isFavorited = true
                    }
                }
                action.payload.all[key].isFavorited = isFavorited
                // console.log(state.listings[key].listing_id +' '+ isFavorited)
            }
            state.listings = action.payload.all
            return {
                ...state
            }
        }
        case SET_AUTHENTICATED:
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.error = "";
            state.param = "";
            state.listings = [];
            return {
                ...state
            }
        case SET_UNAUTHENTICATED:{
            state.username = ''
            state.password = ''
            return{
                ...state
            }
        }
        default:
            return state
    }
}