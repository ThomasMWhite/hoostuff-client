import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import axios from "axios";

import {Row, Col} from '../layout/Flexbox'
import Text from '../components/Text'
import Listing from '../components/Listing'
import AddListing from '../components/AddListing'

import {getAllListings} from '../redux/dataActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const styles=(theme)=>({
    ...theme.spreadThis,
    select:{
        height: '40px',
        width:'120px',
        marginRight:'20px'
    },
    backgroundBar:{
        backgroundColor:'#304af2',
        height:'30px',
        width:'100%'
    }
})

// const data = [
//     {
//         title: "Here is title",
//         condition: "Like new",
//         price: 250,
//         initialPosting: Date.now(),
//         category: "Furniture",
//         description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
//     },
//     {
//         title: "The second item",
//         condition: "Acceptable",
//         price: 120,
//         initialPosting: Date.now(),
//         category: "Textbook",
//         description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
//     },
//     {
//         title: "Here is title",
//         condition: "Like new",
//         price: 250,
//         initialPosting: Date.now(),
//         category: "Furniture",
//         description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
//     },
//     {
//         title: "The second item",
//         condition: "Acceptable",
//         price: 120,
//         initialPosting: Date.now(),
//         category: "Textbook",
//         description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
//     }
// ]

class home extends Component{

    componentDidMount(){
        this.props.getAllListings()
    }
    
    render(){
        const {classes, listings} = this.props;

        
        let listingArray = []
        Object.keys(listings).forEach(function(key) {
            listingArray.push(listings[key]);
          });

        let listingsFull = listingArray.map(d=>(
            <li className="wrap-grid" style={{flex: '0 0 80px'}}>
                <Listing data={d}/>
            </li>
        ))

        return (
            <div>
                <div className={classes.backgroundBar}>
                    <div style={{textAlign:'center', color:'white', paddingTop:'5px'}}>
                        Here you could add the sorting stuff
                    </div>
                    <div className="center-page">
                        <AddListing/>
                    </div>
                </div>
                <div className="center-page" style={{paddingTop:'20px'}}>
                    <ul className="wrap-container">
                        {listingsFull}
                    </ul>
                </div>
            </div>
            
        )
    }
}

home.propTypes = {
    getAllListings: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    listings: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username,
    listings: state.listings
})

const mapActionsToProps = {
    getAllListings
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home))