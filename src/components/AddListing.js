import {Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Tab, Tabs, Select, MenuItem, IconButton} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import Text from './Text'
import {Row, Col} from '../layout/Flexbox'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import {addListing, clearErrors} from '../redux/dataActions'

const styles=(theme)=>({
    ...theme.spreadThis,
    dialog:{
        width:'500px',
        height:'500px'
    },
    select:{
        height: '40px',
        width:'120px',
        marginRight:'20px'
    },
    roundButton:{
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
    textField:{
        marginTop:'5px',
        marginBottom:'5px'
    },
    initialButton:{
        backgroundColor:'white',
        borderRadius: '32px',
        padding: '5px 19px',
        "&:hover": {
            backgroundColor: '#dedee0',
          }
    }
})

class AddListing extends Component{
    state = {
        open: false,
        submitted: false,
        rent:'',
        price:'',
        days_active:'',
        title:'',
        description:'',
        item_condition:'',
        errors: {},
        value: 0
    }

    handleSubmit = ()=>{
        const formData = {
            title: this.state.title,
            description: this.state.description,
            days_active: parseInt(this.state.days_active)           
        }
        let type = 'item'
        if(this.state.value==0){
            formData.item_condition = this.state.item_condition
            formData.price = parseInt(this.state.price)
        }
        if(this.state.value==1){
            formData.salary = parseInt(this.state.price)
            type = 'job'
        }
        if(this.state.value==2){
            formData.rent = parseInt(this.state.price)
            type='housing'
        }

        this.setState({submitted:true})

        console.log(formData)

        let userData = {
            username: this.props.username,
            password: this.props.password
        }

        if(this.props.edit){
            type = this.props.info.listing_id
            console.log(type)
        }

        this.props.addListing(formData, userData, type, this.props.edit)
    }

    handleTabChange = (event, val) =>{
        if(this.props.edit){return;}
        this.setState({value: val})
    }

    handleClose = ()=>{
        this.setState({open:false, submitted:false})
    }

    handleOpen = ()=>{
        this.setState({open:true})

        
        if(this.props.edit){

            let info = this.props.info
            let val = 0
            let p = 0

            if(info.category==='Item'){
                p = info.price
                val = 0
            }
            if(info.category==='Job'){
                p = info.salary
                val = 1
            }
            if(info.category==='Housing'){
                p = info.rent
                val = 2
            }

            
            console.log('setting everything')
            console.log(this.props.info)
            this.setState({
                value: val,
                price: p,
                title: info.title,
                description: info.description,
                category: info.category,
                days_active: info.days_active,
                item_condition: info.item_condition
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    
    render(){
        const {classes} = this.props;

        const {error, param} = this.state

        let errorMes = error
        let errorType = param

        let priceType = ['price', 'Price', this.state.price]
        if(this.state.value==1){
            priceType = ['salary', 'Salary', this.state.salary]
        }
        if(this.state.value==2){
            priceType = ['rent', 'Rent', this.state.rent]
        }

        if(this.state.submitted && !this.props.loading && !this.props.error){
            this.handleClose()
        }

        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth maxWidth="sm"
                >
                    <DialogTitle>

                                {/* <Text fontWeight={600} style={{marginBottom:'10px'}}>
                                    Add Listing
                                </Text> */}
                            <Tabs
                                value={this.state.value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleTabChange}
                                aria-label="disabled tabs example"
                                centered
                            >
                                <Tab label="Item" />
                                <Tab label="Job"/>
                                <Tab label="Housing" />
                            </Tabs>
                        
                    </DialogTitle>

                    <DialogContent>
                    <TextField variant='outlined' name="title" label="Title" 
                            helperText={errorType==="title"?errorMes: null} error={errorType==="title"} className={classes.textField} value={this.state.title}
                            onChange={this.handleChange} fullWidth/>

                    <TextField variant='outlined' name="description" multiline rows={2} label="Description"
                            helperText={errorType==="description"?errorMes: null} error={errorType==="description"} className={classes.textField} value={this.state.description}
                            onChange={this.handleChange} fullWidth/>

                    {this.state.value===0 && (
                        <Select variant="outlined" name="item_condition"  label="Item Condition" className={classes.TextField}
                        value={this.state.item_condition} helperText={errorType==="item_condition"?errorMes: null} error={errorType==="item_condition"} onChange={this.handleChange} fullWidth>
                            <MenuItem value="" disabled>
                                                           Item Condition
                                                        </MenuItem>
                            <MenuItem value='Brand New'>Brand New</MenuItem>
                            {/* <MenuItem value='Like New'>Like New</MenuItem> */}
                            <MenuItem value='Very Good'>Very Good</MenuItem>
                            <MenuItem value='Good'>Good</MenuItem>
                            <MenuItem value='Ok'>Ok</MenuItem>
                            <MenuItem value='Worn'>Worn</MenuItem>
                        </Select>
                    )}
                    
                    <Row>
                        <Col size={1}>
                            <TextField variant="outlined" type="number" name="days_active" label="Days Active" className={classes.TextField}
                            value={this.state.days_active} helperText={errorType==="days_active"?errorMes: null} error={errorType==="days_active"} onChange={this.handleChange} fullWidth/>

                        </Col>
                        <Col size={1}>
                            <TextField variant="outlined" type="number" name='price' label={priceType[1]} className={classes.TextField}
                            value={this.state.price} helperText={errorType===priceType[0] ?errorMes: null} error={errorType===priceType[0]} onChange={this.handleChange} fullWidth/>
                        
                        </Col>
                    </Row>

                    
                    

                    <Button type="submit" variant="contained" color="primary" style={{marginBottom:'7px', marginTop:'5px', outline:'none'}} className={classes.wideButton} onClick={this.handleSubmit}>
                        Submit
                                
                    </Button>

                        
                        
                        
                    </DialogContent>
                </Dialog>
                {this.props.edit ? (
                    <IconButton color='white' size="small" onClick={this.handleOpen}>
                        <EditIcon />
                    </IconButton>
                ):(
                    <Button onClick={this.handleOpen} className={classes.initialButton}>
                        Add Listing
                    </Button>
                )}
                
            </Fragment>
            
            
        )
    }
}

AddListing.propTypes = {
    error: PropTypes.string.isRequired,
    param: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    addListing: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state)=>({
    error: state.error,
    param: state.param,
    username: state.username,
    password: state.password,
    loading: state.loading
})

const mapActionsToProps = {
    clearErrors, addListing
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddListing))