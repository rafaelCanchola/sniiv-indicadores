import React, {useState} from 'react';
import * as dc from "dc";
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableIcon from '@material-ui/icons/TableChart';
import TuneIcon from '@material-ui/icons/Tune';
import ReactECharts from "echarts-for-react";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import TableMUIPNV from "./Tablas/TableMUIPNV";

import conavi from "../../assets/images/conavi.png";
import fovissste from "../../assets/images/fovissste.png";
import infonavit from "../../assets/images/infonavit.png";
import insus from "../../assets/images/insus.png";
import shf from "../../assets/images/shf.png";
import sedatu from "../../assets/images/sedatu.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import TableMUIViv from "./Tablas/TableMUIViv";
import {indicadorViv1} from "../../json/PNV/fichas_ind_v1";
import {ind_b1} from "../../json/Bienestar/fichas_ind_b1";
import {ind_b2} from "../../json/Bienestar/fichas_ind_b2";
import {ind_b3} from "../../json/Bienestar/fichas_ind_b3";
import {ind_b4} from "../../json/Bienestar/fichas_ind_b4";
import {ind_b5} from "../../json/Bienestar/fichas_ind_b5";
import {ind_b6} from "../../json/Bienestar/fichas_ind_b6";
import {ind_b7} from "../../json/Bienestar/fichas_ind_b7";
import {ind_b8} from "../../json/Bienestar/fichas_ind_b8";
import {ind_b9} from "../../json/Bienestar/fichas_ind_b9";
import {ind_b10} from "../../json/Bienestar/fichas_ind_b10";
import {ind_b11} from "../../json/Bienestar/fichas_ind_b11";
import {ind_b12} from "../../json/Bienestar/fichas_ind_b12";
import {ind_b13} from "../../json/Bienestar/fichas_ind_b13";
import {ind_b14} from "../../json/Bienestar/fichas_ind_b14";
import {ind_b15} from "../../json/Bienestar/fichas_ind_b15";


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,

        },
        typo:{
            textAlign:"center",
            color: theme.palette.text.secondary,

        },
        image:{
            width:"80%",
            height: "auto"
        },
        details: {
            alignItems: 'center',
        },
        column: {
            flexBasis: '50%',
        },
    })
);

interface CumplimientoProps {

}


interface AxisChart{
    [x: string]:any;
}

export default function IndicadoresBienestar(props:CumplimientoProps){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);
    const classes = useStyles();
    const assignColor = (obj:number) =>{
        if(obj === 1){
            return '#dd7671';
        }else if(obj === 2){
            return '#f5ce85';
        }else if(obj === 3){
            return '#a485c2';
        }else if(obj === 4){
            return '#e3a277';
        }else if(obj === 5){
            return '#95ce9c';
        }
    }

    const onaIcons = {
        CONAVI:conavi,
        FOVISSSTE:fovissste,
        INFONAVIT:infonavit,
        INSUS:insus,
        SHF:shf,
        SEDATU:sedatu
    }

    const handleClickOpen1 = () => {
        setOpen1(true);
    }
    const handleClose1 = () => {
        setOpen1(false);
    }

    const handleClickOpen3 = () => {
        setOpen3(true);
    }
    const handleClose3 = () => {
        setOpen3(false);
    }

    const bienestar = [
        {
            titulo:"Meta del Bienestar del Objetivo Prioritario 1",
            data: ind_b1,
            parametros:[
                {
                    titulo:"Parametro 1 del Objetivo Prioritario 1",
                    data: ind_b2
                },
                {
                    titulo:"Parametro 2 del Objetivo Prioritario 1",
                    data: ind_b3
                },
            ]
        },

        {
            titulo:"Meta del Bienestar del Objetivo Prioritario 2",
            data: ind_b4,
            parametros:[
                {
                    titulo:"Parametro 1 del Objetivo Prioritario 2",
                    data: ind_b5
                },
                {
                    titulo:"Parametro 2 del Objetivo Prioritario 2",
                    data: ind_b6
                },
            ]
        },
        {
            titulo:"Meta del Bienestar del Objetivo Prioritario 3",
            data: ind_b7,
            parametros:[
                {
                    titulo:"Parametro 1 del Objetivo Prioritario 3",
                    data: ind_b8
                },
                {
                    titulo:"Parametro 2 del Objetivo Prioritario 3",
                    data: ind_b9
                },
            ]
        },
        {
            titulo:"Meta del Bienestar del Objetivo Prioritario 4",
            data: ind_b10,
            parametros:[
                {
                    titulo:"Parametro 1 del Objetivo Prioritario 4",
                    data: ind_b11
                },
                {
                    titulo:"Parametro 2 del Objetivo Prioritario 4",
                    data: ind_b12
                },
            ]
        },
        {
            titulo:"Meta del Bienestar del Objetivo Prioritario 5",
            data: ind_b13,
            parametros:[
                {
                    titulo:"Parametro 1 del Objetivo Prioritario 5",
                    data: ind_b14
                },
                {
                    titulo:"Parametro 2 del Objetivo Prioritario 5",
                    data: ind_b15
                },
            ]
        },
    ]

    return(
        <div className={classes.root}>
            <Grid container spacing={2} alignItems={'center'} >
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h1>{"Indicadores del bienestar"}</h1>
                    </Paper>
                </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Paper elevation={3} className={classes.paper}>
                    {
                        bienestar.map((param:any,key:number) =>
                            <Accordion key={param.titulo+key} TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.typo}>{param.titulo}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                        <Typography className={classes.typo}>
                                            <TableMUIPNV data={param.data}/>
                                        </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                    {
                                        param.parametros.map((param1:any,key1:number) =>
                                            <div className={classes.column} key={param1.titulo+key1}>
                                                <Accordion  TransitionProps={{ unmountOnExit: true }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                      aria-controls="panel1a-content"
                                                                      id="panel1a-header"
                                                    >
                                                        <Typography className={classes.typo}>{param1.titulo}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={classes.details}>
                                                        <Typography className={classes.typo}>
                                                            <TableMUIViv data={param1.data}/>
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>

                                        )
                                    }
                                </AccordionDetails>
                            </Accordion>

                        )
                    }

                </Paper>
            </Grid>
            </Grid>

        </div>
    )
}