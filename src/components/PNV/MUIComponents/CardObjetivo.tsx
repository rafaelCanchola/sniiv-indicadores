import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import {makeStyles} from "@material-ui/core/styles";

interface CardProps{
    title: string,
    content: string,
    image: any,
    more: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    text:{
        fontSize:10,
        color:theme.palette.text.secondary,
    },
    image:{
        width:"65%",
        height:"auto"
    }
}));

export default function MediaCard(props:CardProps) {
    const classes = useStyles();
    return (
        <Card >
            <CardHeader avatar={<Avatar aria-label="avatar" className={classes.avatar}><img src={props.image} className={classes.image}/></Avatar>} title={props.title} className={classes.text}/>
            <CardContent>
                <Typography className={classes.text} variant={"body2"}>
                    {props.content}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Conoce más</Button>
            </CardActions>
        </Card>
    );
}