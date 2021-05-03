import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button, Tab, Tabs, Card, CardContent} from '@material-ui/core'
import axios from "axios";

import {Row, Col} from '../layout/Flexbox'
import Text from '../components/Text'
import Listing from '../components/Listing'
import AddListing from '../components/AddListing'
import PhoneIcon from '@material-ui/icons/Phone';

import {getMyListings} from '../redux/dataActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TodayIcon from '@material-ui/icons/Today';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Today } from "@material-ui/icons";


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
    },
    card:{
        width:'96%',
        boxShadow:'0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        position:'relative'
    },
})

class profile extends Component{

    state = {
        value: 0,
        info: {}
    }

    componentDidMount(){
        this.props.getMyListings({username: this.props.username, password: this.props.password})

        console.log(this.props.username)
        console.log(this.props.password)

        axios.get('/account', {
            auth: {
                username: this.props.username,
                password: this.props.password
            }
        })
            .then(res=>{
                console.log(res.data)
                this.setState({info: res.data})
            })
            .catch(err=>{
                console.log('error loading data')
            })
    }
    
    render(){
        const {classes, listings, username} = this.props;

        const {first_name, last_name, street_number, street, city, state, zip, email, dob_year, dob_month, dob_day, phone_list} = this.state.info

        let listingArray = []
        if(listings!==null && listings!==undefined && listings!=={}){
            Object.keys(listings).forEach(function(key) {
                listingArray.push(listings[key]);
              });
        }
        

        let listingsFull = listingArray.map(d=>(
            <li className="wrap-grid" style={{flex: '0 0 80px'}}>
                <Listing data={d}/>
            </li>
        ))

        return (
            <div>
                <div className={classes.backgroundBar}>
                    <div style={{textAlign:'center', color:'white', paddingTop:'5px'}}>
                        <div className="center-page">
                            
                            

                        </div>
                        
                    </div>
                </div>
                <div className="center-page" style={{padding:'40px'}}>
                    <Card className={classes.card}>
                        <CardContent>

                        <Text color="black" fontWeight={600} fontSize ={36}>
                                {first_name} {last_name}
                            </Text>
                    <Row style={{marginTop:'20px'}}>
                        <Col size={1}>
                        <TodayIcon color="primary"/>
                            <Text>
                                
                                Birthday: {dob_month}/{dob_day}/{dob_year}
                            </Text>
                        </Col>
                        <Col size={1}>
                        <MailOutlineIcon color="primary"/>
                            <Text>
                                
                                Email: {email}
                            </Text>
                        </Col>
                        <Col size={1}>
                        <LocationOnIcon color="primary"/>
                            <Text>
                                
                                Address: {street_number} {street}
                            </Text>
                            <Text>
                                
                                {city}, {state} {zip}
                            </Text>
                        </Col>
                        <Col size={1}>
                            <PhoneIcon color="primary"/>
                            {phone_list && <Text>

                                Phone: {phone_list[0].area_code}-{phone_list[0].phone_number} <br/>
                                Type: {phone_list[0].type}
                            </Text>}
                        </Col>
                    </Row>
                    <div style={{backgroundColor:'#304af2', marginTop:'20px', width:'100%', height:'6px'}}/>
                        </CardContent>
                    </Card>
                    
                    <Text color="black" fontWeight={600} fontSize ={24} style={{marginTop:'30px', marginBottom:'-50px'}}>
                                Listings
                            </Text>

                            

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

profile.propTypes = {
    getMyListings: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    listings: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username,
    password: state.password,
    listings: state.listings
})

const mapActionsToProps = {
    getMyListings
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(profile))