import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActionArea, IconButton} from "@material-ui/core";
import TableIcon from '@material-ui/icons/Toc';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: "40%",
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

interface CardProps{
    obj: number,
    title: string,
    image: any,
    more: string,
    callBack:any,
    children:any,
    mobile:boolean
}

export default function CardBienestar(props:CardProps) {
    const classes = useStyles();
    const clicke = () => {
        props.callBack([props.obj,0]);
    }
    return (
        <Fragment>
            {props.mobile ?
                props.children.length > 0 ?
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            {props.children.map((child:any,key:any) =>
                                <div className={classes.controls}>
                                    <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                        <TableIcon fontSize={'large'}/>
                                    </IconButton>
                                </div>
                            )}
                        </div>
                        <CardMedia className={classes.cover} image={props.image} title={props.title}/>
                    </Card>
                    :
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <div className={classes.controls}>
                                <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,0])} >
                                    <TableIcon fontSize={'large'}/>
                                </IconButton>
                            </div>
                        </div>
                        <CardMedia className={classes.cover} image={props.image}title={props.title}/>
                    </Card>
                :
                 props.children.length > 0 ?
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {props.title}
                                    </Typography>
                                </CardContent>
                                <div className={classes.controls}>
                                    {props.children.slice(0,3).map((child:any,key:any) =>
                                        <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                            <TableIcon fontSize={'large'}/>
                                        </IconButton>
                                    )}
                                </div>
                                <div className={classes.controls}>
                                    {props.children.slice(3).map((child:any,key:any) =>
                                        <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                            <TableIcon fontSize={'large'}/>
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                            <CardMedia className={classes.cover} image={props.image} title={props.title}/>
                        </Card>
                        :<Card className={classes.root}>
                            <CardActionArea onClick={clicke}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography variant="h6" color="textSecondary">
                                            {props.title}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </CardActionArea>
                            <CardMedia className={classes.cover} image={props.image}title={props.title}/>
                        </Card>
                }


        </Fragment>
    )
}