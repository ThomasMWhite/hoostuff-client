import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button, Tab, Tabs, Card, CardContent, IconButton} from '@material-ui/core'
import axios from "axios";

import {deleteListing} from '../redux/dataActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DeleteIcon from '@material-ui/icons/Delete';

const styles=(theme)=>({
    ...theme.spreadThis
})

class DeleteButton extends Component{
    render(){
        return(
            <IconButton size="small" aria-label="delete listing" onClick={() =>{this.props.deleteListing(this.props.listing_id, {username: this.props.username, password: this.props.password})}}>
                <DeleteIcon />
            </IconButton>
        )
    }
}



DeleteButton.propTypes = {
    deleteListing: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username,
    password: state.password
})

const mapActionsToProps = {
    deleteListing
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DeleteButton))