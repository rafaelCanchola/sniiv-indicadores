import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActionArea, IconButton} from "@material-ui/core";
import TableIcon from '@material-ui/icons/Toc';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    rootSelected: {
        display: 'flex',
        backgroundColor: '#dbdbdb',

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
    children: any,
    callBack:any,
    mobile:boolean,
    selected: boolean
}

export default function CardVivienda(props:CardProps) {
    const classes = useStyles();
    return (
        <Fragment>
            { props.mobile ?
                    <Card className={props.selected? classes.rootSelected:classes.root}>
                        <div className={classes.details}>
                            {props.children.map((child:any,key:any) =>
                                <div className={classes.controls}>
                                    <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                        <EqualizerIcon fontSize={'large'}/>
                                    </IconButton>
                                </div>
                            )}
                        </div>
                        <CardMedia className={classes.cover} image={props.image} title={props.title}/>
                    </Card>
                :
                <Card className={props.selected? classes.rootSelected:classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <CardActionArea onClick={() => props.callBack([10,props.obj-1])}>
                            <Typography variant="subtitle2" color="textSecondary">
                                {props.obj !== 8 && props.obj} {props.title}
                            </Typography>
                            </CardActionArea>
                        </CardContent>
                        <div className={classes.controls}>
                            {props.children.slice(0,2).map((child:any,key:any) =>
                                <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                    <EqualizerIcon fontSize={'medium'}/>
                                </IconButton>
                            )}
                        </div>
                        <div className={classes.controls}>
                            {props.children.slice(2).map((child:any,key:any) =>
                                <IconButton aria-label="Gráfica" onClick={() => props.callBack([props.obj,child])} key={key} >
                                    <EqualizerIcon fontSize={'medium'}/>
                                </IconButton>
                            )}
                        </div>
                    </div>
                    <CardMedia className={classes.cover} image={props.image} title={props.title}/>
                </Card>
            }
        </Fragment>
    )
}