import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardHeader, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {useStyles} from "../../../utils/Style";
import Grid from "@material-ui/core/Grid";
import {Fragment, useState} from 'react';
import {MobileSize} from "../../../utils/Utils";
import TableMUIObjetivo from '../Tablas/TableMUIObjetivo';
import red from "@material-ui/core/colors/red";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CardActionArea from "@material-ui/core/CardActionArea";
import BienestarBarChart from "../Graficas/eCharts/BienestarBarChart";

interface CardProps{
    title: string,
    content: string,
    image: any,
    more: string,
    tabla:any,
    index:number,
    color:any,
    callBack:any
}

export default function MediaCard(props:CardProps) {
    const classes = useStyles();
    const isMobile = MobileSize();
    const useMyStyle = makeStyles((theme:Theme) =>
        createStyles({
                avatar: {
                    backgroundColor: props.color,
                },
            }));
    const myClass = useMyStyle();


    return (
        <Fragment>
            <Card>
                <CardActionArea onClick={() => props.callBack(props.index)}>
                    <CardHeader avatar={<Avatar aria-label="avatar" className={myClass.avatar}><img src={props.image} className={classes.imageIcon} alt={"Imagen"}/></Avatar>} title={!isMobile && props.title} className={classes.textCardBlack}/>
                </CardActionArea>
                </Card>
        </Fragment>

    );
}