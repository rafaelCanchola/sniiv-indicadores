import React, {useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import BienestarBarChart from "../Graficas/eCharts/BienestarBarChart";
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
import TableMUIPNV from "../Tablas/TableMUIPNV";

import conavi from "../../../assets/images/conavi.png";
import fovissste from "../../../assets/images/fovissste.png";
import infonavit from "../../../assets/images/infonavit.png";
import insus from "../../../assets/images/insus.png";
import shf from "../../../assets/images/shf.png";
import sedatu from "../../../assets/images/sedatu.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import TableMUIViv from "../Tablas/TableMUIViv";
import {ind_b1} from "../../../json/Bienestar/fichas_ind_b1";
import {ind_b2} from "../../../json/Bienestar/fichas_ind_b2";
import {ind_b3} from "../../../json/Bienestar/fichas_ind_b3";
import {ind_b4} from "../../../json/Bienestar/fichas_ind_b4";
import {ind_b5} from "../../../json/Bienestar/fichas_ind_b5";
import {ind_b6} from "../../../json/Bienestar/fichas_ind_b6";
import {ind_b7} from "../../../json/Bienestar/fichas_ind_b7";
import {ind_b8} from "../../../json/Bienestar/fichas_ind_b8";
import {ind_b9} from "../../../json/Bienestar/fichas_ind_b9";
import {ind_b10} from "../../../json/Bienestar/fichas_ind_b10";
import {ind_b11} from "../../../json/Bienestar/fichas_ind_b11";
import {ind_b12} from "../../../json/Bienestar/fichas_ind_b12";
import {ind_b13} from "../../../json/Bienestar/fichas_ind_b13";
import {ind_b14} from "../../../json/Bienestar/fichas_ind_b14";
import {ind_b15} from "../../../json/Bienestar/fichas_ind_b15";


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
        mainColumn:{
            flexBasis: '70%'
        }
    })
);

interface IndicadoresProps {
    indicadorIndex:number
}


interface AxisChart{
    [x: string]:any;
}

export default function IndicadoresBienestar(props:IndicadoresProps){
    const classes = useStyles();

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
    ];

    return(
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <h1>{"Indicadores del bienestar"}</h1>
                <BienestarBarChart tableData={bienestar} indicadorIndex={props.indicadorIndex}/>
            </Paper>
        </div>
    )
}