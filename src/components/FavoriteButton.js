import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button, Tab, Tabs, Card, CardContent, IconButton} from '@material-ui/core'
import axios from "axios";

import {favoriteListing, unfavoriteListing} from '../redux/dataActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles=(theme)=>({
    ...theme.spreadThis
})



class FavoriteButton extends Component{

    handleFavorite = ()=>{
        if(this.props.isFavorited){
            this.props.unfavoriteListing(this.props.listing_id, {username: this.props.username, password: this.props.password})
        }else{
            this.props.favoriteListing(this.props.listing_id, {username: this.props.username, password: this.props.password})
        }
    }
    render(){
        let topColor = this.props.isFavorited ? 'white' : '#000'
        return(
            <IconButton aria-label="delete listing" size="large" style={{color: this.props.color}} onClick={this.handleFavorite}>
                {this.props.isFavorited ? (<FavoriteIcon size="large"/>):(<FavoriteIconOutlined size="large"/>)}
            </IconButton>
        )
    }
}



FavoriteButton.propTypes = {
    favoriteListing: PropTypes.func.isRequired,
    unfavoriteListing: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username,
    password: state.password
})

const mapActionsToProps = {
    unfavoriteListing,
    favoriteListing
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(FavoriteButton))