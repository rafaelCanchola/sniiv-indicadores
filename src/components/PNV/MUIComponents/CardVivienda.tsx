import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActionArea, IconButton} from "@material-ui/core";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
    selected: boolean,
    cardName:any
}

export default function CardVivienda(props:CardProps) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(false);
    const [message, setMessage] = React.useState(50);
    return (
        <Fragment>
            { props.mobile ?
                <Fragment>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <div className={classes.controls}>
                                    <Button onClick={() => props.callBack([10,props.obj-1])}  >
                                        <InfoIcon fontSize={'medium'}/> <Typography variant="body2" color="textSecondary">{props.title}</Typography>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    {props.children.map((child:any,key:any) =>
                            <Card className={classes.root}>
                                <div className={classes.details}>
                                    <div className={classes.controls}>
                                        <Button onClick={() => props.callBack([props.obj,child])} key={key} >
                                            <EqualizerIcon fontSize={'medium'}/> <Typography variant="body2" color="textSecondary">{props.cardName[child]}</Typography>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                    )}
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Fragment>
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
                            {props.children.slice(0,4).map((child:any,key:any) =>
                                <IconButton aria-label="Gráfica" onMouseOver={() => {setAnchorEl(true);setMessage(child)}} onMouseOut={() => {setAnchorEl(false);setMessage(50)}} onClick={() => props.callBack([props.obj,child])} key={key} >
                                    <EqualizerIcon fontSize={'medium'}/>
                                </IconButton>
                            )}
                        </div>
                        <div className={classes.controls}>
                            {props.children.slice(4).map((child:any,key:any) =>
                                <IconButton aria-label="Gráfica" onMouseOver={() => {setAnchorEl(true);setMessage(child)}} onMouseOut={() => {setAnchorEl(false);setMessage(50)}} onClick={() => props.callBack([props.obj,child])} key={key} >
                                    <EqualizerIcon fontSize={'medium'}/>
                                </IconButton>
                            )}
                        </div>
                        {anchorEl && <Typography variant="body2" color="textSecondary">{props.cardName[message]}</Typography>}
                    </div>
                    <CardMedia className={classes.cover} image={props.image} title={props.title}/>
                </Card>
            }
        </Fragment>
    )
}