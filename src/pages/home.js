import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import axios from "axios";

import {Row, Col} from '../layout/Flexbox'
import Text from '../components/Text'


const styles=(theme)=>({
    ...theme.spreadThis,
    select:{
        height: '40px',
        width:'120px',
        marginRight:'20px'
    }
})

class home extends Component{
    
    render(){
        const {classes} = this.props;

        return (
            <div>
                hello
            </div>
            
        )
    }
}

export default withStyles(styles)(home)