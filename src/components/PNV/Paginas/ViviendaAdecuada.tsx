import React, {useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableIcon from '@material-ui/icons/TableChart';
import TuneIcon from '@material-ui/icons/Tune';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactECharts from "echarts-for-react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";

import CardVivienda from "../MUIComponents/CardVivienda";

import {indicadorViv1} from "../../../json/Vivienda/fichas_ind_v1";
import {indicadorViv2} from "../../../json/Vivienda/fichas_ind_v2";
import {indicadorViv3} from "../../../json/Vivienda/fichas_ind_v3";
import {indicadorViv4} from "../../../json/Vivienda/fichas_ind_v4";
import {indicadorViv5} from "../../../json/Vivienda/fichas_ind_v5";
import {indicadorViv6} from "../../../json/Vivienda/fichas_ind_v6";
import {indicadorViv7} from "../../../json/Vivienda/fichas_ind_v7";
import {indicadorViv8} from "../../../json/Vivienda/fichas_ind_v8";

import vivienda from "../../../assets/images/house-tr.png";
import seguridad from "../../../assets/images/seguridad-tr.png";
import accesibilidad from "../../../assets/images/accesibilidad-tr.png";
import servicios from "../../../assets/images/servicios-tr.png";
import ubicacion from "../../../assets/images/ubicacion-tr.png";
import cultura from "../../../assets/images/cultura-tr.png";
import habitabilidad from "../../../assets/images/habitabilidad-tr.png";
import asequibilidad from "../../../assets/images/asequibilidad-tr.png";
import {IndicadorVivienda} from "../ComponentesPaginas/IndicadorVivienda";

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
        image:{
            width:"100%",
            height: "auto"
        }
    })
);

interface ViviendaProps {

}


interface AxisChart{
    [x: string]:any;
}

export default function ViviendaAdecuada(props:ViviendaProps){
    const [indicador,setIndicador] = useState(0);
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);
    const classes = useStyles();


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

    const elementos =[
        {
            num: 1,
            title: "SEGURIDAD EN LA TENENCIA",
            image:seguridad,
            more:"",
            size:3,
        },
        {
            num: 2,
            title: "DISPONIBILIDAD DE SERVICIOS",
            image:servicios,
            more:"",
            size:3,
        },
        {
            num: 3,
            title: "ASEQUIBILIDAD",
            image:asequibilidad,
            more:"",
            size:3,
        },
        {
            num: 4,
            title: "HABITABILIDAD",
            image:habitabilidad,
            more:"",
            size:3,
        },
        {
            num: 5,
            title: "ACCESIBILIDAD",
            image:accesibilidad,
            more:"",
            size:4,
        },
        {
            num: 6,
            title: "UBICACIÓN",
            image:ubicacion,
            more:"",
            size:4,
        },
        {
            num: 7,
            title: "ADECUACIÓN CULTURAL",
            image:cultura,
            more:"",
            size:4,
        },
    ]

    const indicadores = [
        {
            titulo: "Seguridad en la tenencia",
            tipo:'none',
        },
        {
            titulo: "Disponibilidad de Servicios",
            tipo:'none',
        },
        {
            titulo: "Asequibilidad",
            tipo:'waterfall',
            data: [{ficha:indicadorViv1}],
            chartTitle:'Proporción de viviendas particulares habitadas según motivo de renta',
            grafica:[5782349, 25403, 188464, 309176, 460831, 558275, 1269756, 2970444],
            label:['Total','No sabe', 'Invertir en persona','No le interesa', 'Otra', 'Mensualidad menor', 'Facilidad de mudar', 'Sin crédito']
        },
        {
            titulo: "Habitabilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas particulares habitadas propias, según respuesta del informante, que declararon estar muy satisfechos y algo satisfechos con la calidad y aspectos de la vivienda'],
            data: [{ficha:indicadorViv2},{ficha:indicadorViv3}],
            grafica:[{chart:[14390038,5725273,5218505,15583020,3729173,31425730]},{chart:[18050877,18097127,15238794,21183163,21435472,20095401]}],
            label:[{chartLabel:['Grietas en techos','Marcos de las puertas','Hundimiento del piso','Filtración de agua','Fractura de columnas','Sistema eléctrico']},
                {chartLabel: ['Calidad del piso','Calidad de los muros y techos','Pintura, recubrimientos y otros acabados','Iluminación natural','Ventilación natural','Protección que les da contra la lluvia, frío, calor o viento']}]
        },
        {
            titulo: "Accesibilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas que perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad'],
            data: [{ficha:indicadorViv4},{ficha:indicadorViv5}],
            grafica:[{chart:[4507772,3480530,4325469,4325469]},{chart:[14559735]}],
            label:[{chartLabel: ['Poner pasamanos','Ampliar puertas','Poner rampas','Adecuar baños']},
                {chartLabel: ['perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad ']}]
        },
        {
            titulo: "Ubicación",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas propias, según grado de satisfacción con la distancia-tiempo entre la vivienda y tipo de servicios','Porcentaje de viviendas que declararon presentar problemáticas de contaminación, ruido, inseguridad y vandalismo','Porcentaje Problemáticas de contaminación, ruido, inseguridad y vandalismo'],
            data: [{ficha:indicadorViv6},{ficha:indicadorViv7}],
            grafica:[{chart:[29340302,24979438,26872910,25330965,23724488,17060862]},{chart:[13755640,16949152,6567779,8405756,10930621,15524909]}],
            label:[{chartLabel: ['Centros escolares','Mercados o centros comerciales','Trabajo','Centros de salud','Parques o espacios deportivos','Centros de recreación o instalaciones culturales']},
                {chartLabel:['Exceso de ruido','Basura tirada en las calles','Contaminación del ambiente por fábricas o construcciones','Deterioro por abandono de viviendas o espacios públicos','Problema tienen con el vandalismo, grafitis, pintas, vidrios rotos','Problema tienen con los robos o asaltos']}]
        },
        {
            titulo: "Adecuación cultural",
            tipo:'bar',
            chartTitle:'Porcentaje de viviendas que declararon tener un alto grado de identidad con sus gustos, costumbres y tradiciones',
            data: [{ficha:indicadorViv8}],
            grafica:[28881734],
            label:['Vivienda se identifica con sus gustos, costumbres y tradiciones']
        },

    ]

    const handleCallback = (childData: any) => {
        setIndicador(childData)
    }

            return(
        <div className={classes.root}>
                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={0} className={classes.paper}>
                            <h1>{"Vivienda Adecuada"}</h1>
                            <h5>{"Indicadores complementarios"}</h5>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {elementos.slice(0,4).map(card =>
                            <Paper elevation={0} className={classes.paper} key={card.num+card.title}>
                                <CardVivienda callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image}/>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper elevation={3} className={classes.paper}>
                            <img src={vivienda} className={classes.image} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {elementos.slice(4).map(card =>
                            <Paper elevation={0} className={classes.paper} key={card.num+card.title}>
                                <CardVivienda callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            {indicador === 0 ? <></> : indicadores[indicador-1].tipo === 'none'? <></> : <IndicadorVivienda indicador={indicadores[indicador-1]}/>}
            <br/><br/><br/>
        </div>
    )
}