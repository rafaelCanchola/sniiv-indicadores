import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActionArea, IconButton} from "@material-ui/core";
import TableIcon from '@material-ui/icons/Toc';
import {useStyles} from "../../../utils/Style";
import InfoIcon from '@material-ui/icons/Info';

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
    const webCardView =
        props.children.length > 0 ?
            <Card className={classes.rootBienestar}>
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
            :<Card className={classes.rootBienestar}>
                <CardActionArea onClick={() => props.callBack([props.obj,0])}>
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

    return (
        <Fragment>
            {props.mobile ?
                props.children.length > 0 ?
                    <Card className={classes.rootBienestar}>
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
                    <Card className={classes.rootBienestar}>
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
                 webCardView
                }


        </Fragment>
    )
}