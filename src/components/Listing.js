import {Card, CardContent, CardHeader} from '@material-ui/core'

import { Component, Fragment } from "react";
import {withStyles} from '@material-ui/core/styles'
import Text from './Text'
import {Row, Col} from '../layout/Flexbox'
import Button from '@material-ui/core/Button'


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
        boxShadow:'0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
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
    }
})

class home extends Component{
    
    render(){
        const {classes} = this.props;
        const {title, condition, price, initialPosting, description, category} = this.props.data;

        return (
            <Card className={classes.card}>
                <CardHeader title={<Text fontWeight={600}>
                    {title}
                </Text>}/>
                <CardContent>
                    <Text fontWeight={300} fontSize={14}>
                        {description}
                    </Text>
                    <Row style={{marginTop:'80px', position:'relative'}}>
                        <Col size={1}>
                            <Text fontStyle="italic" color="#3c3c3c" fontWeight={700} fontSize={32}>
                                ${price}
                            </Text>
                        </Col>
                        
                        <Col size={1} style={{marginLeft:'20px'}}>
                            <Text fontSize={14} className={classes.verticalCenterCol}>
                                {condition}
                            </Text>
                        </Col>

                        <Col size={1}>
                            <div className={classes.verticalCenterCol}>
                            <Button className={classes.roundButton} >
                                <Text fontWeight={500} fontSize={14} color="white">
                                    {category}
                                </Text>
                            </Button>
                            </div>
                        </Col>
                    </Row>
                    
                    
                    
                </CardContent>
            </Card>
            
        )
    }
}

export default withStyles(styles)(home)