import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button, IconButton} from '@material-ui/core'
import axios from "axios";
import {connect} from 'react-redux';

import {Row, Col} from '../layout/Flexbox'
import Text from '../components/Text'
import Listing from '../components/Listing'
import AddListing from '../components/AddListing'
import {TextField, Card, CardContent, CardHeader, Select, MenuItem, InputLabel} from '@material-ui/core'

import PropTypes from 'prop-types';
import {signupUser} from '../redux/dataActions'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { isThisMonth } from "date-fns";
import { ThreeSixtySharp } from "@material-ui/icons";

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
    },
    loginCard:{
        marginTop:'70px',
        width:'500px',
        height:'500px',
        borderRadius:'25px',
        boxShadow:'0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'

    },
    content:{
        position:'relative'
    },
    backButton:{
        position:'absolute',
        top:'16px',
        left:'20px'
    }
})

const stateList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

class signup extends Component{
    constructor(){
        super();
        this.state = {
            panel: 0,
            selectedDate:'',
            username: '',
            password:'',
            confirmPassword:'',
            first_name:'',
            last_name:'',
            dob_year:'',
            dob_month:'',
            dob_day:'',
            email:'',
            street_number:'',
            street:'',
            city:'',
            state:'',
            zip:'',
            error: '',
            errorParam: ''
        }
    }

    changePanel = (num) =>{
        this.setState({panel:num})
    }

    submitForm = ()=>{
        console.log('gooo')
        if(this.state.password!==this.state.confirmPassword){
            this.setState({error: 'passwords do not match', errorParam: 'confirmPassword'})
            console.log(this.state)
            return;
        }

        const userData = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob_year: this.state.dob_year,
            dob_month: this.state.dob_month,
            dob_day: this.state.dob_day,
            street_number: parseInt(this.state.street_number),
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: parseInt(this.state.zip),
        }

        console.log('submitting')

        this.props.signupUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    handleChangeDate=(event)=>{
        let list = event.target.value.split('-')
        console.log(list)
        this.setState({
            selectedDate: event.target.value,
            dob_month: parseInt(list[1]),
            dob_day: parseInt(list[2]),
            dob_year: parseInt(list[0])
        })
    }

    hasNumbers = (t)=>
    {
        if(t==='') return true;

        return /^\d+$/.test(t)
    }   

    handleChangeNumbersOnly = (event) => {
        if(this.hasNumbers(event.target.value)){
            this.setState({
                [event.target.name]:event.target.value
            });
        }
        
    };
    
    render(){
        const {classes, error, param} = this.props;
        const {panel} = this.state;

        let stateOptions = stateList.map(t=>(
            <MenuItem value={t}>{t}</MenuItem>
        ))

        let errorMes = error
        if(this.state.error!=='')
        {
            errorMes = this.state.error
        }

        let errorType = param
        if(this.state.errorParam!=='')
        {
            errorType = this.state.errorParam
        }

        // if(errorType!==''){
        //     if(errorType==='email' || errorType==='confirmPassword' || errorType==='password' || errorType==='username'){
        //         this.changePanel(0)
        //     }
        //     else{
        //         this.changePanel(1)
        //     }
        // }
        

        return (
            <div>
                <div className="center-page" style={{paddingTop:'20px'}}>
                    <ul className="wrap-container">
                        <div style={{margin:'auto'}}>
                        <Card className={classes.loginCard}>
                            <CardHeader/>
                            <CardContent className={classes.content}>
                                {panel===0?(
                                    <Text fontWeight={600} fontSize={24} style={{marginBottom:'40px', textAlign:'center'}}>
                                    Create an Account
                                    </Text>
                                ):(
                                    <Text fontWeight={600} fontSize={24} style={{marginBottom:'40px', textAlign:'center'}}>
                                    Just a Little More
                                    </Text>
                                )}

                                {panel===1&&(
                                    <IconButton className={classes.backButton} color="primary" onClick={()=>{this.changePanel(0)}}>
                                        <KeyboardBackspaceIcon/>
                                    </IconButton>
                                )}
                                

                                    {panel===0 ? (
                                        <div>

                                        <TextField variant="outlined" name="email" type="email" label="Email" className={classes.TextField}
                                        value={this.state.email} helperText={errorType==="email"?errorMes: null} error={errorType==="email"} onChange={this.handleChange} fullWidth/>

                                        <TextField variant="outlined" name="username" type="username" label="Username" className={classes.TextField}
                                        value={this.state.username} helperText={errorType==="username"?errorMes: null} error={errorType==="username"} onChange={this.handleChange} fullWidth/>

                                        <TextField id="outlined-password-input" variant="outlined" name="password" type="password" label="Password" className={classes.TextField}
                                        value={this.state.password} helperText={errorType==="password"?errorMes: null} error={errorType==="password"} onChange={this.handleChange} fullWidth/>

                                        <TextField id="outlined-password-input" variant="outlined" name="confirmPassword" type="password" label="Confirm Password" className={classes.TextField}
                                        value={this.state.confirmPassword} helperText={errorType==="confirmPassword"?errorMes: null} error={errorType==="confirmPassword" ? true: false} onChange={this.handleChange} fullWidth/>

                                        <Button color="primary" variant="contained" type="submit" className={classes.wideButton} onClick={()=>{this.changePanel(1)}}>
                                            Next
                                        </Button>
                                        </div>
                                    ):null}

                                    {panel===1 ? (
                                        <div>
                                            <Row>
                                                <Col size={1}>
                                                    <TextField variant="outlined" name="first_name" type="first_name" label="First Name" className={classes.TextField}
                                                    value={this.state.first_name} helperText={errorType==="first_name"?errorMes: null} error={errorType==="first_name"} onChange={this.handleChange} fullWidth/>
                                                </Col>
                                                <Col size={1}>
                                                    <TextField variant="outlined" name="last_name" type="last_name" label="Last Name" className={classes.TextField}
                                                    value={this.state.last_name} helperText={errorType==="last_name"?errorMes: null} error={errorType==="last_name"} onChange={this.handleChange} fullWidth/>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col size={.5}>
                                                    <TextField variant="outlined" name="street_number" type="street_number" label="Street Number" className={classes.TextField}
                                                    value={this.state.street_number} helperText={errorType==="street_number"?errorMes: null} error={errorType==="street_number"} onChange={this.handleChangeNumbersOnly} fullWidth/>
                                                </Col>
                                                <Col size={1}>
                                                    <TextField variant="outlined" name="street" type="street" label="Street" className={classes.TextField}
                                                    value={this.state.street} helperText={errorType==="street"?errorMes: null} error={errorType==="street"} onChange={this.handleChange} fullWidth/>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col size={1}>
                                                    <TextField variant="outlined" name="city" type="city" label="City" className={classes.TextField}
                                                    value={this.state.city} helperText={errorType==="city"?errorMes: null} error={errorType==="city"} onChange={this.handleChange} fullWidth/>
                                                </Col>
                                                <Col size={1}>
                                                    <Select variant="outlined" name="state" label="State" className={classes.TextField}
                                                    value={this.state.state} helperText={errorType==="state"?errorMes: null} error={errorType==="state"} onChange={this.handleChange} fullWidth>
                                                        
                                                        <MenuItem value="" disabled>
                                                            State
                                                        </MenuItem>
                                                        {stateOptions}
                                                    </Select>
                                                </Col>
                                                <Col size={1}>
                                                    <TextField variant="outlined" name="zip" type="zip" label="Zip" className={classes.TextField}
                                                    value={this.state.zip} helperText={errorType==="zip"?errorMes: null} error={errorType==="zip"} onChange={this.handleChangeNumbersOnly} fullWidth/>
                                                </Col>
                                            </Row>

                                            <Row>
                                            <TextField
                                                id="date"
                                                label="Birthday"
                                                type="date"
                                                defaultValue="1999-05-24"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                onChange={this.handleChangeDate}
                                                value={this.state.selectedDate}
                                                helperText={(errorType==="dob_year" || errorType==='dob_month' || errorType==='dob_day')? 'Invalid date': null} error={errorType==="dob_year" || errorType==='dob_month' || errorType==='dob_day'}
                                            />
                                            </Row>

                                        <Button color="primary" variant="contained" className={classes.wideButton} onClick={this.submitForm}>
                                            Submit
                                        </Button>
                                        </div>
                                    ):null}

                            </CardContent>
                        </Card>
                        </div>
                    </ul>
                </div>
            </div>
            
        )
    }
}

signup.propTypes = {
    signupUser: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    param: PropTypes.string.isRequired
}

const mapStateToProps = (state)=>({
    error: state.error,
    param: state.param
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup))