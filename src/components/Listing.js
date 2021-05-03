import {Card, CardContent, CardHeader, IconButton} from '@material-ui/core'
import {connect} from 'react-redux';
import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import Text from './Text'
import {Row, Col} from '../layout/Flexbox'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

import dayjs from 'dayjs';
import DeleteButton from './DeleteButton'
import { Delete } from '@material-ui/icons';
import AddListing from './AddListing'
import FavoriteButton from './FavoriteButton'

const styles=(theme)=>({
    ...theme.spreadThis,
    select:{
        height: '40px',
        width:'120px',
        marginRight:'20px'
    },
    card:{
        margin:'10px',
        width:'300px',
        height:'330px',
        boxShadow:'0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        position:'relative'
    },
    roundButton:{
        float:'right',
        borderRadius:'30px',
        backgroundColor:'#304af2',
        textTransform:'none',
        padding:'4px 10px',
        "&:hover": {
            backgroundColor: '#556af4ff',
          }
    },
    verticalCenterCol:{
        position:'absolute',
        top:'50%',
        transform:'translate(0, -50%)'
    },
    topCorner:{
        position:'absolute',
        right:'20px',
        top:'20px'
    },
    header:{
        position:'relative',
    },
    content:{
        position:'relative'
    }
})

class home extends Component{

    render(){
        const {classes} = this.props;
        const {title, listing_id, item_condition, price, posting_date, days_active, rent, salary, description, category, username, isFavorited} = this.props.data;

        let mon = price;
        let monTopic  =''
        let butColor = '#30b7f2'
        if(category==='Item'){
            monTopic="Price"
            mon = price;
        }
        if(category==='Job'){
            monTopic="Salary"
            mon = salary
            butColor = '#fd4372'
        }
        if(category==='Housing'){
            monTopic="Rent"
            mon = rent+'/mo'
            butColor='#3a68ff'
        }

        return (
            <Card className={classes.card}>
                <CardHeader className={classes.header} title={<Text fontWeight={700} fontSize={24}>
                    <div style={{width:'75%'}}>
                        {title}
                        <Text fontWeight={600} fontSize={14}>
                            {item_condition!==null ? (
                                item_condition
                            ):(
                                ''
                            )}
                        </Text>
                    </div>
                    
                    <div className={classes.topCorner} style={{float:'right'}}>
                            <Button className={classes.roundButton} style={{backgroundColor:butColor}} color={butColor} >
                                <Text fontWeight={500} fontSize={14} color="white">
                                    {category}
                                </Text>
                            </Button>
                            
                            </div>
                            <div style={{right:'24px', position:'absolute', top:'54px', float:'right', textAlign:'right'}}>
                                <Text color="aaa" fontSize={16} fontWeight={300} >
                                {dayjs(posting_date).format('MMM D')}
                                </Text>
                                <Text color="aaa" fontSize={16} fontWeight={300}>
                                Active: {days_active} days
                                </Text>
                            </div>
                </Text>}/>
                <CardContent >
                    <div style={{position:'absolute', top:'120px'}}>
                    <Text fontWeight={300} fontSize={15}>
                        {description}
                    </Text>
                
                    </div>

                    <div style={{position:'absolute', bottom:'66px', left:'20px'}}>
                            <Text color="#3c3c3c" fontWeight={500} fontSize={18}>
                                {monTopic}
                            </Text> 
                    </div>


                    <div style={{position:'absolute', bottom:'22px', left:'20px'}}>
                            <Text fontStyle="italic" color="#3c3c3c" fontWeight={700} fontSize={32}>
                                ${mon}
                            </Text> 
                    </div>

                    <div style={{position:'absolute', bottom:'82px', right:'18px'}}>
                        {username===this.props.viewingUser && (
                                <Row>
                                    <Col>
                                        <AddListing edit={true} info={this.props.data}/>
                                    </Col>
                                    <Col>
                                        <DeleteButton listing_id={listing_id}/>
                                    </Col>
                                </Row>
                                
                                
                            )}
                    </div>
                    <div style={{position:'absolute', bottom:'22px', right:'20px'}}>
                        <Row>
                        <Col size={.5} style={{marginRight:'5px'}}>
                            
                            
                        </Col>
                        <Col size={.5}>
                            {(this.props.viewingUser !== "" && this.props.viewingUser!==undefined && this.props.viewingUser!==null) && (
                                <FavoriteButton id={listing_id} key={isFavorited} isFavorited={isFavorited} listing_id={listing_id} color={butColor} />
                            )}
                            
                        </Col>
                        </Row>
                    </div>
                    
                    
                    
                </CardContent>
            </Card>
            
        )
    }
}

export default (withStyles(styles)(home))