import { Component } from "react"
import AppBar from '@material-ui/core/Appbar'
import {Dialog, DialogContent, DialogContentText, DialogTitle, withStyles } from "@material-ui/core"
import {Row, Col, Grid} from './Flexbox'
import Text from '../components/Text'
import {Link} from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { ThreeSixtySharp } from "@material-ui/icons"
import Logo from '../images/logo'
import {logoutUser} from '../redux/dataActions'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const styles = (theme) =>({
    ...theme.spreadThis,
    button:{
        textTransform:'none'
    }
})

class Navbar extends Component{

    state = {
        open:false
    }
    
    handleOpen = ()=>{
        this.setState({open:true})
    }

    handleClose = ()=>{
        this.setState({open:false})
    }

    logout = () =>{
        this.props.logoutUser()
    }

    render(){
        const {classes, username} = this.props
        const {open} = this.state


        return (
            <AppBar position='relative' elevation={0} style={{backgroundColor:'transparent', height:'80px'}}>
                <div className="center-page">
                    <div style={{marginTop:'20px', marginBottom:'20px'}}>
                        <Row>
                            <Col size={3}>
                                <Link to='/'>
                                    <Logo/>
                                </Link>
                                
                            </Col>
                            {username==="" ?(
                                <Col style={{paddingRight:'40px'}}>
                                <Link to='/login'>
                                <Button component={Link} to={"/login"} className={classes.button} onClick={this.handleOpen}>
                                    <Text fontWeight={400} fontSize={16}>Sign in</Text>
                                </Button>
                                </Link>

                                <Link to='/signup'>
                                <Button variant="outlined" className={classes.button} onClick={this.handleOpen}>
                                    <Text fontWeight={400} fontSize={16}>Sign up</Text>
                                </Button>
                                </Link>
                                
                                </Col>
                            ):(
                                <Col style={{paddingRight:'40px'}}>
                                    <Link to='/profile'>
                                    <Button className={classes.button} onClick={this.handleOpen}>
                                        <Text fontWeight={400} fontSize={16}>Profile</Text>
                                    </Button>
                                    </Link>

                                    <Button variant="outlined" className={classes.button} onClick={this.logout}>
                                        <Text fontWeight={400} fontSize={16}>Logout</Text>
                                    </Button>
                                
                                </Col>
                            )}
                            
                        </Row>
                    </div>
                </div>
                
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    signupUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = (state)=>({
    username: state.username
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar))