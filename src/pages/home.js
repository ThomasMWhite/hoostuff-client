import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button, Tab, Tabs} from '@material-ui/core'
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
        width:'100%'
    },
    tab:{
        padding: '0px 0px'
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

    state = {
        value: 0,
        all: 0,
        item: 0,
        job: 0,
        housing: 0
    }

    componentDidMount(){
        this.props.getAllListings('all', {username: this.props.username, password: this.props.password})
        let item =0
        let all = 0
        let housing = 0
        let job = 0
        axios.get('/category/Item')
            .then(res=>{
                item = res.data.number_listings
                axios.get('/category/Job')
                    .then(res=>{
                        job = res.data.number_listings
                        axios.get('/category/Housing')
                            .then(res=>{
                                housing = res.data.number_listings
                                all = housing+job+item
                                this.setState({item: item, all: all, job: job, housing: housing})
                            })
                    })
            })
            
    }

    handleTabChange = (event, val) =>{
        this.setState({value: val})
        if(val===0){
            this.props.getAllListings('all', {username: this.props.username, password: this.props.password})
        }
        if(val===1){
            this.props.getAllListings('item', {username: this.props.username, password: this.props.password})
        }
        if(val===2){
            this.props.getAllListings('job', {username: this.props.username, password: this.props.password})
        }
        if(val===3){
            this.props.getAllListings('housing', {username: this.props.username, password: this.props.password})
        }
    }
    
    render(){
        const {classes, listings, username} = this.props;
        const {housing, job, all, item} = this.state

        
        let listingArray = []
        if(listings!==null && listings!==undefined && listings!=={}){
            Object.keys(listings).forEach(function(key) {
                listingArray.push(listings[key]);
              });
        }
        

        let listingsFull = listingArray.map(d=>(
            <li className="wrap-grid" style={{flex: '0 0 80px'}}>
                <Listing id={d.listing_id} data={d} viewingUser={username}/>
            </li>
        ))

        return (
            <div>
                <div className={classes.backgroundBar}>
                    <div style={{textAlign:'center', color:'white', paddingTop:'5px'}}>
                    <div className="center-page">
                        <Row>
                            <Col>
                                <Tabs
                                    value={this.state.value}
                                    indicatorColor="#3a3a3a"
                                    textColor="white"
                                    onChange={this.handleTabChange}
                                    aria-label="disabled tabs example"
                                    >
                                        <Tab className={classes.tab} label={'All ['+all+']'} />
                                        <Tab className={classes.tab} label={"Items ["+item+']'} />
                                        <Tab className={classes.tab} label={"Jobs ["+job+']'}/>
                                        <Tab className={classes.tab}label={"Housing ["+housing+']'} />
                                </Tabs>
                            </Col>
                            <Col size={3}>
                                <div style={{float:'right', marginTop:'5px'}}>
                                {username!=='' && (<AddListing/>)}
                                </div>
                            </Col>
                            <Col size={1}>

                            </Col>
                        </Row>

                        </div>
                        
                    </div>
                    <div className="center-page">
                        
                    </div>
                </div>
                <div className="center-page" style={{paddingTop:'20px'}}>
                    <ul className="wrap-container" style={{paddingLeft:'20px'}}>
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
    password: PropTypes.string.isRequired,
    listings: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username,
    password: state.password,
    listings: state.listings
})

const mapActionsToProps = {
    getAllListings
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home))