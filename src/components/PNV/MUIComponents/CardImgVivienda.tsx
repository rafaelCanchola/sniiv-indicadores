import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {IconButton} from "@material-ui/core";
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
    children: any,
    callBack:any
}

export default function CardVivienda(props:CardProps) {
    const classes = useStyles();
    return (
        <Fragment>
            { props.children.length > 0 ?
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
            }
        </Fragment>
    )
}