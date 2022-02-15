import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {useStyles} from "../../../utils/Style";

interface CardProps{
    title: string,
    content: string,
    image: any,
    more: string,
    tabla:any
}

export default function MediaCard(props:CardProps) {
    const classes = useStyles();
    return (
        <Card >
            <CardHeader avatar={<Avatar aria-label="avatar" className={classes.avatar}><img src={props.image} className={classes.imageIcon} alt={"Imagen"}/></Avatar>} title={props.title} className={classes.textCard}/>
            <CardContent>
                <Typography className={classes.textCard} variant={"body2"}>
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Conoce más</Button>
            </CardActions>
        </Card>
    );
}