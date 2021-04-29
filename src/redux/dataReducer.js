import {SET_LISTINGS, SET_AUTHENTICATED, LOADING, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED} from './types';

const initialState = {
    listings: [],
    username: "",
    password: "",
    loading: false,
    errors: {}
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
                errors: action.payload.errors
            }
        }
        case CLEAR_ERRORS:{
            return {
                ...state,
                loading: false,
                errors:{}
            }
        }
        case SET_AUTHENTICATED:
            state.username = action.payload.username;
            state.password = action.payload.password;
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