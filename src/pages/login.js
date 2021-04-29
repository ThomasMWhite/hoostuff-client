import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import axios from "axios";
import {connect} from 'react-redux';

import {Row, Col} from '../layout/Flexbox'
import Text from '../components/Text'
import Listing from '../components/Listing'
import AddListing from '../components/AddListing'
import {TextField, Card, CardContent, CardHeader} from '@material-ui/core'
import PropTypes from 'prop-types';
import {loginUser} from '../redux/dataActions'


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
        height:'400px',
        borderRadius:'25px',
        boxShadow:'0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'

    },
})

class login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password:'',
            errors: {},
        }
    }

    submitForm = (event)=>{
        event.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    
    render(){
        const {classes} = this.props;
        const {errors} = this.state;

        return (
            <div>
                {/* <div className={classes.backgroundBar}>
                    <div style={{textAlign:'center', color:'white', paddingTop:'5px'}}>
                        Here you could add the sorting stuff
                    </div>
                    <div className="center-page">
                        <AddListing/>
                    </div>
                </div> */}
                <div className="center-page" style={{paddingTop:'20px'}}>
                    <ul className="wrap-container">
                        <div style={{margin:'auto'}}>
                        <Card className={classes.loginCard}>
                            <CardHeader/>
                            <CardContent>
                                <Text fontWeight={600} fontSize={24} style={{marginBottom:'40px', textAlign:'center'}}>
                                    The UVA Craigslist
                                </Text>
                                <form noValidate onSubmit={this.submitForm}>

                                    <TextField variant="outlined" name="username" type="username" label="Username" className={classes.TextField}
                                    value={this.state.username} helperText={errors.username} error={errors.username ? true: false} onChange={this.handleChange} fullWidth/>

                                    <TextField id="outlined-password-input" variant="outlined" name="password" type="password" label="Password" className={classes.TextField}
                                    value={this.state.password} helperText={errors.password} error={errors.password ? true: false} onChange={this.handleChange} fullWidth/>

                                    <Button color="primary" variant="contained" type="submit" className={classes.wideButton} onClick={this.submitForm}>
                                        Login
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                        </div>
                    </ul>
                </div>
            </div>
            
        )
    }
}

login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({

})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))