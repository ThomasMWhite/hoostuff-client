import {Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import Text from './Text'
import {Row, Col} from '../layout/Flexbox'
import Button from '@material-ui/core/Button'


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
    }
})

class home extends Component{
    state = {
        open: false,
        loading: false,
        errors: {}
    }

    handleClose = ()=>{
        this.setState({open:false})
    }

    handleOpen = ()=>{
        this.setState({open:true})
    }
    
    render(){
        const {classes} = this.props;

        const {errors, loading} = this.state

        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth maxWidth="sm"
                >
                    <DialogTitle>
                        <Text fontWeight={600}>
                            Add Listing
                        </Text>
                    </DialogTitle>

                    <DialogContent>
                    <TextField variant='outlined' name="header" type="text" label="Title" 
                            error={errors && errors.header} helperText={errors ? (errors.header):null} className={classes.textField} 
                            onChange={this.handleChange} fullWidth defaultValue={this.state.header}/>

                    <TextField variant='outlined' name="header" type="text" multiline rows={2} label="Description"
                            error={errors && errors.header} helperText={errors ? (errors.header):null} className={classes.textField} 
                            onChange={this.handleChange} fullWidth defaultValue={this.state.header}/>

                    <Button type="submit" variant="contained" color="primary" style={{marginBottom:'7px', marginTop:'5px', outline:'none'}} className={classes.wideButton} disabled={loading}>
                        Submit
                        {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner}/>
                        )}
                                
                    </Button>

                        
                        
                        
                    </DialogContent>
                </Dialog>
                <Button onClick={this.handleOpen}>
                    Add Listing
                </Button>
            </Fragment>
            
            
        )
    }
}

export default withStyles(styles)(home)