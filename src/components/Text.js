import { Component } from "react"
import {Typography, Box} from "@material-ui/core"

//The 
export default function Text(props){
    return(
        <Typography style={props.style ? props.style:{}}>
            <Box className={props.className ? (props.className):{}} fontStyle={props.fontStyle ? (props.fontStyle):"none"} fontWeight={props.fontWeight ? (props.fontWeight):(400)} fontSize={props.fontSize ? (props.fontSize):(20)}
            color={props.color ? (props.color):('black')}>
                {props.children}
            </Box>
        </Typography>
    )
    
}