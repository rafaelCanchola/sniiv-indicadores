import React, {Fragment, useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import BienestarBarChart from "../Graficas/eCharts/BienestarBarChart";
import {useStyles} from "../../../utils/Style";
import TableMUIObjetivo from "../Tablas/TableMUIObjetivo";
import {MobileSize} from "../../../utils/Utils";

interface IndicadoresProps {
    indicadorIndex:number,
    info:any;
    image:any;
    color:any;
    tabla:any;
    fichas:any;
}

export default function IndicadoresBienestar(props:IndicadoresProps){
    const classes = useStyles();
    const useMyStyle = makeStyles((theme:Theme) =>
        createStyles({
            avatar: {
                backgroundColor: props.color,
                alignSelf:'center'
            },
        }));
    const myClass = useMyStyle();

    const isMobile = MobileSize();
    const bienestar = [
        {
            titulo:"Objetivo Prioritario 1",
            pdfName:'obj_1',
            data: props.fichas[0],
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 1",
                    data: props.fichas[1],
                    pdfName:'obj_2',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 1",
                    data: props.fichas[2],
                    pdfName:'obj_3',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 2",
            pdfName:'obj_4',
            data: props.fichas[3],
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 2",
                    data: props.fichas[4],
                    pdfName:'obj_5',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 2",
                    data: props.fichas[5],
                    pdfName:'obj_6',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 3",
            pdfName:'obj_7',
            data: props.fichas[6],
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 3",
                    data: props.fichas[7],
                    pdfName:'obj_8',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 3",
                    data: props.fichas[8],
                    pdfName:'obj_9',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 4",
            pdfName:'obj_10',
            data: props.fichas[9],
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 4",
                    data: props.fichas[10],
                    pdfName:'obj_11',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 4",
                    data: props.fichas[11],
                    pdfName:'obj_12',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 5",
            pdfName:'obj_13',
            data: props.fichas[12],
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 5",
                    data: props.fichas[13],
                    pdfName:'obj_14',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 5",
                    data: props.fichas[14],
                    pdfName:'obj_15',
                },
            ]
        },
    ];
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
    return(
        <Fragment>
                    <Paper elevation={3} className={classes.paper} >
                        <Grid container >
                            <Grid item xs={3} md={5}></Grid>
                            <Grid item xs={2} md={1}>
                                <Avatar aria-label="avatar" className={myClass.avatar}><img src={props.image} className={classes.imageIcon} alt={"Imagen"}/></Avatar>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <h3 className={classes.textColorBlack}>Objetivo {props.indicadorIndex+1}</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <p className={classes.body}>
                                    {props.info}
                                </p>
                                <Button size="small" onMouseOver={() => setAnchorEl(true)} onMouseOut={() => setAnchorEl(false)} className={classes.textCard} onClick={clickTableMap[props.indicadorIndex].func}>
                                    {anchorEl ? "Conoce más" :<MoreHorizIcon />}
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>
            <BienestarBarChart tableData={bienestar} indicadorIndex={props.indicadorIndex}/>
            <Dialog fullScreen={isMobile} open={clickTableMap[props.indicadorIndex].state} onClose={clickTableMap[props.indicadorIndex].func} aria-labelledby={'customized-dialog-title'} maxWidth={"md"} >
                <DialogTitle>
                    {"Acciones puntuales del Objetivo "+(props.indicadorIndex+1)+ ' del PNV 2021-2024'}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}  >
                        <Grid item xs={12} sm={12} md={12}>
                            <TableMUIObjetivo data={props.tabla}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={clickTableMap[props.indicadorIndex].func} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}