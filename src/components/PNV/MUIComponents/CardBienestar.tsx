import React, { Fragment, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Button, CardActionArea, IconButton} from "@material-ui/core";
import TableIcon from '@material-ui/icons/Toc';
import {useStyles} from "../../../utils/Style";
import InfoIcon from '@material-ui/icons/Info';
import Avatar from "@material-ui/core/Avatar";

import objetivo1 from "../../../assets/images/obj1.png";
import objetivo2 from "../../../assets/images/obj2.png";
import objetivo3 from "../../../assets/images/obj3.png";
import objetivo5 from "../../../assets/images/obj5.png";
import objetivo6 from "../../../assets/images/obj6.png";
import {colorBrewer} from "../../../utils/colorBrewer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
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

    const useMyStyle = makeStyles((theme:Theme) =>
        createStyles({
            obj1: {
                backgroundColor: colorBrewer.Objetivos[0],
            },
            obj2: {
                backgroundColor: colorBrewer.Objetivos[1],
            },
            obj3: {
                backgroundColor: colorBrewer.Objetivos[2],
            },
            obj4: {
                backgroundColor: colorBrewer.Objetivos[3],
            },
            obj5: {
                backgroundColor: colorBrewer.Objetivos[4],
            },
        }));
    const myClass = useMyStyle();

    const [obj1, setObj1] = useState(false);
    const [obj2, setObj2] = useState(false);
    const [obj3, setObj3] = useState(false);
    const [obj4, setObj4] = useState(false);
    const [obj5, setObj5] = useState(false);

    const handleClickOpen1 = () => {setObj1(true);}
    const handleClickOpen2 = () => {setObj2(true);}
    const handleClickOpen3 = () => {setObj3(true);}
    const handleClickOpen4 = () => {setObj4(true);}
    const handleClickOpen5 = () => {setObj5(true);}

    const handleClickClose1 = () => {setObj1(false);}
    const handleClickClose2 = () => {setObj2(false);}
    const handleClickClose3 = () => {setObj3(false);}
    const handleClickClose4 = () => {setObj4(false);}
    const handleClickClose5 = () => {setObj5(false);}

    const images = [
        {img:objetivo1, color:myClass.obj1,object:obj1},
        {img:objetivo2,color:myClass.obj2,object:obj2},
        {img:objetivo3,color:myClass.obj3,object:obj3},
        {img:objetivo5,color:myClass.obj4,object:obj4},
        {img:objetivo6,color:myClass.obj5,object:obj5},
    ]

    const clicks = [[handleClickOpen1,handleClickClose1],[handleClickOpen2,handleClickClose2],[handleClickOpen3,handleClickClose3],[handleClickOpen4,handleClickClose4],[handleClickOpen5,handleClickClose5]]
    const objs = [obj1,obj2,obj3,obj4,obj5]
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
                            <Button onClick={() => props.callBack([props.obj,child])} key={key} onMouseOver={clicks[key][0]} onMouseOut={clicks[key][1]} className={classes.textColorGrey} >
                                {objs[key] ?"Objetivo "+(key+1):<Avatar aria-label="avatar" className={images[key].color}><img src={images[key].img} className={classes.imageIcon} alt={"Imagen"}/></Avatar>}
                            </Button>
                        )}
                    </div>
                    <div className={classes.controls}>
                        {props.children.slice(3).map((child:any,key:any) =>
                            <Button onClick={() => props.callBack([props.obj,child])} key={key} onMouseOver={clicks[key+3][0]} onMouseOut={clicks[key+3][1]} className={classes.textColorGrey}>
                                {objs[key+3] ?"Objetivo "+(key+4):<Avatar aria-label="avatar" className={images[key+3].color}><img src={images[key+3].img} className={classes.imageIcon} alt={"Imagen"}/></Avatar>}
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
            :<Card className={classes.rootBienestar}>
                <CardActionArea onClick={() => props.callBack([props.obj,0])}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.title}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
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