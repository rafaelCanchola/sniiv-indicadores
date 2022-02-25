import * as React from 'react';
import Card from '@material-ui/core/Card';
import {CardHeader} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {useStyles} from "../../../utils/Style";
import {Fragment} from 'react';
import {MobileSize} from "../../../utils/Utils";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";

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