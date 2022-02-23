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

interface CardProps{
    title: string,
    content: string,
    image: any,
    more: string,
    tabla:any,
    index:number,
    color:any
}

export default function MediaCard(props:CardProps) {
    const classes = useStyles();

    const useMyStyle = makeStyles((theme:Theme) =>
        createStyles({
                avatar: {
                    backgroundColor: props.color,
                },
            }));
    const myClass = useMyStyle();

    const isMobile = MobileSize();
    const [openTable1, setOpenTable1] = useState(false);
    const [openTable2, setOpenTable2] = useState(false);
    const [openTable3, setOpenTable3] = useState(false);
    const [openTable4, setOpenTable4] = useState(false);
    const [openTable5, setOpenTable5] = useState(false);

    const handleClickOpenTable1 = () => {setOpenTable1(!openTable1);}
    const handleClickOpenTable2 = () => {setOpenTable2(!openTable2);}
    const handleClickOpenTable3 = () => {setOpenTable3(!openTable3);}
    const handleClickOpenTable4 = () => {setOpenTable4(!openTable4);}
    const handleClickOpenTable5 = () => {setOpenTable5(!openTable5);}

    const clickTableMap = [
        {state:openTable1,func:handleClickOpenTable1},
        {state:openTable2,func:handleClickOpenTable2},
        {state:openTable3,func:handleClickOpenTable3},
        {state:openTable4,func:handleClickOpenTable4},
        {state:openTable5,func:handleClickOpenTable5},
    ]

    const [anchorEl, setAnchorEl] = React.useState(false);

    return (
        <Fragment>
            <Card >
                {// @ts-ignore
                <CardHeader avatar={<Avatar aria-label="avatar" className={myClass.avatar}><img src={props.image} className={classes.imageIcon} alt={"Imagen"}/></Avatar>} title={props.title} className={classes.textCardBlack}/>
                }
                <CardContent>
                    <Typography className={classes.textCard} variant={"body2"}>
                        {props.content}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button size="small" onMouseOver={() => setAnchorEl(true)} onMouseOut={() => setAnchorEl(false)} className={classes.textCard} onClick={clickTableMap[props.index].func}>
                        {anchorEl ? "Conoce más" :<MoreHorizIcon />}
                    </Button>
                </CardActions>
            </Card>
            <Dialog fullScreen={isMobile} open={clickTableMap[props.index].state} onClose={clickTableMap[props.index].func} aria-labelledby={'customized-dialog-title'} maxWidth={"md"} >
                <DialogTitle>
                    {"Fichas Técnicas del Objetivo "+(props.index+1)}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}  >
                        <Grid item xs={12} sm={12} md={12}>
                            <TableMUIObjetivo data={props.tabla}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={clickTableMap[props.index].func} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>

    );
}