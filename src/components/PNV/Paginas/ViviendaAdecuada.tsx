import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CardVivienda from "../MUIComponents/CardVivienda";
import {IndicadorVivienda} from "../ComponentesPaginas/IndicadorVivienda";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";

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
import CardImgVivienda from '../MUIComponents/CardImgVivienda';
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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
        },
        body:{
            fontSize: 12,
        },
    })
);

interface ViviendaProps {

}

export default function ViviendaAdecuada(props:ViviendaProps){
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {setWidth(window.innerWidth);}
    useEffect(() => {window.addEventListener('resize', handleWindowSizeChange);return () => {window.removeEventListener('resize', handleWindowSizeChange);}}, []);

    const isMobile = width <= 768;

    const [indicador,setIndicador] = useState([0,0]);
    const classes = useStyles();

    const elementos =[
        {
            num: 1,
            title: "SEGURIDAD EN LA TENENCIA",
            image:seguridad,
            more:"",
            children:[]
        },
        {
            num: 2,
            title: "DISPONIBILIDAD DE SERVICIOS",
            image:servicios,
            more:"",
            children:[]
        },
        {
            num: 3,
            title: "ASEQUIBILIDAD",
            image:asequibilidad,
            more:"",
            children:[]
        },
        {
            num: 4,
            title: "HABITABILIDAD",
            image:habitabilidad,
            more:"",
            children:[0,1]
        },
        {
            num: 5,
            title: "ACCESIBILIDAD",
            image:accesibilidad,
            more:"",
            children:[0,1]
        },
        {
            num: 6,
            title: "UBICACIÓN",
            image:ubicacion,
            more:"",
            children:[0,1]
        },
        {
            num: 7,
            title: "ADECUACIÓN CULTURAL",
            image:cultura,
            more:"",
            children:[]
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
            grafica:[5782349,25403,188464,309176,460831,558275,1269756,2970444],

            label:['Total','No sabe', 'Invertir en persona','No le interesa', 'Otra', 'Mensualidad menor', 'Facilidad de mudar', 'Sin crédito']
        },
        {
            titulo: "Habitabilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas particulares habitadas propias, según respuesta del informante, que declararon estar muy satisfechos y algo satisfechos con la calidad y aspectos de la vivienda'],
            data: [{ficha:indicadorViv2},{ficha:indicadorViv3}],
            grafica:[[14390038,5725273,5218505,15583020,3729173,31425730,],[18050877,18097127,15238794,21183163,21435472,20095401]],
            label:[{chartLabel:['Grietas en techos','Marcos de las puertas','Hundimiento del piso','Filtración de agua','Fractura de columnas','Sistema eléctrico']},
                {chartLabel: ['Calidad del piso','Calidad de los muros y techos','Pintura, recubrimientos y otros acabados','Iluminación natural','Ventilación natural','Protección que les da contra la lluvia, frío, calor o viento']}]
        },
        {
            titulo: "Accesibilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas que perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad'],
            data: [{ficha:indicadorViv4},{ficha:indicadorViv5}],
            grafica:[[4507772,3480530,4325469,4325469],[14559735,]],
            label:[{chartLabel: ['Poner pasamanos','Ampliar puertas','Poner rampas','Adecuar baños']},
                {chartLabel: ['perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad ']}]
        },
        {
            titulo: "Ubicación",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas propias, según grado de satisfacción con la distancia-tiempo entre la vivienda y tipo de servicios','Porcentaje de viviendas que declararon presentar problemáticas de contaminación, ruido, inseguridad y vandalismo','Porcentaje Problemáticas de contaminación, ruido, inseguridad y vandalismo'],
            data: [{ficha:indicadorViv6},{ficha:indicadorViv7}],
            grafica:[[29340302,24979438,26872910,25330965,23724488,17060862,],[13755640,16949152,6567779,8405756,10930621,15524909]],
            label:[{chartLabel: ['Centros escolares','Mercados o centros comerciales','Trabajo','Centros de salud','Parques o espacios deportivos','Centros de recreación o instalaciones culturales']},
                {chartLabel:['Exceso de ruido','Basura tirada en las calles','Contaminación del ambiente por fábricas o construcciones','Deterioro por abandono de viviendas o espacios públicos','Problema tienen con el vandalismo, grafitis, pintas, vidrios rotos','Problema tienen con los robos o asaltos']}]
        },
        {
            titulo: "Adecuación cultural",
            tipo:'bar',
            chartTitle:'Porcentaje de viviendas que declararon tener un alto grado de identidad con sus gustos, costumbres y tradiciones',
            data: [{ficha:indicadorViv8}],
            grafica:[[28881734,]],
            label:{chartLabel:['Vivienda se identifica con sus gustos, costumbres y tradiciones']}
        },

    ]

    const handleCallback = (childData: any) => {
        setIndicador(childData)
    }

    return(
        <div className={classes.root}>
            <Grid container spacing={2}  >
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <h1>{"Vivienda Adecuada"}</h1>
                        <h5>{"Indicadores complementarios"}</h5>
                        <RefreshIcon fontSize={'large'} onClick={() => setIndicador([0,0])} />
                    </Paper>
                </Grid>
                {isMobile ?
                    <Grid container spacing={2}  >
                        <Grid item xs={12} sm={12} md={12} >
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography
                                        className={classes.body}>Selecciona un indicador</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Grid container spacing={2}  >
                                            {elementos.map((card:any,key:number) =>
                                            <Fragment>
                                                {(key === elementos.length-1)? <Grid item xs={4}></Grid> : <></>}
                                                <Grid item xs={4}>
                                                    <CardImgVivienda children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image}/>
                                                </Grid>
                                            </Fragment>
                                        )}
                                        </Grid>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper elevation={3} className={classes.paper}>
                                {indicador[0] === 0 ? <img src={vivienda} className={classes.image} alt={"vivienda"}/> : indicadores[indicador[0]-1].tipo === 'none'? <img src={vivienda} className={classes.image} alt={"vivienda"}/> : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                    :
                    <Fragment>
                        <Grid item xs={12} sm={3} md={3}>
                        {elementos.slice(0,4).map(card =>
                            <CardVivienda children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                        )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} className={classes.paper}>
                            {indicador[0] === 0 ? <img src={vivienda} className={classes.image} alt={"vivienda"} /> : indicadores[indicador[0]-1].tipo === 'none'? <img src={vivienda} className={classes.image} alt={"vivienda"}/> : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                        </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            {elementos.slice(4).map(card =>
                                <CardVivienda children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                            )}
                        </Grid>
                    </Fragment>
                }

            </Grid>
            <br/><br/><br/>
        </div>
    )
}


