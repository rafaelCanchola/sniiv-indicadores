import React from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import BienestarBarChart from "../Graficas/eCharts/BienestarBarChart";

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
            titulo:"Objetivo Prioritario 1",
            pdfName:'obj_1',
            data: ind_b1,
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 1",
                    data: ind_b2,
                    pdfName:'obj_2',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 1",
                    data: ind_b3,
                    pdfName:'obj_3',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 2",
            pdfName:'obj_4',
            data: ind_b4,
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 2",
                    data: ind_b5,
                    pdfName:'obj_5',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 2",
                    data: ind_b6,
                    pdfName:'obj_6',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 3",
            pdfName:'obj_7',
            data: ind_b7,
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 3",
                    data: ind_b8,
                    pdfName:'obj_8',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 3",
                    data: ind_b9,
                    pdfName:'obj_9',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 4",
            pdfName:'obj_10',
            data: ind_b10,
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 4",
                    data: ind_b11,
                    pdfName:'obj_11',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 4",
                    data: ind_b12,
                    pdfName:'obj_12',
                },
            ]
        },
        {
            titulo:"Objetivo Prioritario 5",
            pdfName:'obj_13',
            data: ind_b13,
            parametros:[
                {
                    titulo:"Parámetro 1 del Objetivo Prioritario 5",
                    data: ind_b14,
                    pdfName:'obj_14',
                },
                {
                    titulo:"Parámetro 2 del Objetivo Prioritario 5",
                    data: ind_b15,
                    pdfName:'obj_15',
                },
            ]
        },
    ];

    return(
        <BienestarBarChart tableData={bienestar} indicadorIndex={props.indicadorIndex}/>
    )
}