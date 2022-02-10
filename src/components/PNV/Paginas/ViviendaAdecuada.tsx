import React, {Fragment, useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import CardVivienda from "../MUIComponents/CardVivienda";
import {IndicadorVivienda} from "../ComponentesPaginas/IndicadorVivienda";

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
import {useStyles} from "../../../utils/Style";

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
            children:[0,1]
        },
        {
            num: 2,
            title: "DISPONIBILIDAD DE SERVICIOS",
            image:servicios,
            more:"",
            children:[0,1,2]
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
            tipo:'dual',
            data:[{ficha:indicadorViv2},{ficha:indicadorViv3}],
            chartTitle:['Porcentaje viviendas rentadas o prestadas','Porcentaje de viviendas propias sin escrituras o propias en proceso de pago sin escrituras'],
            grafica:[[27.7,],[17.5]],
            label:[{chartLabel:['Viviendas']},{chartLabel:['Viviendas']}],

        },
        {
            titulo: "Disponibilidad de Servicios",
            tipo:'dual',
            data:[{ficha:indicadorViv2},{ficha:indicadorViv3},{ficha:indicadorViv4}],
            chartTitle:['Porcentaje de viviendas con sistema de captación pluvial','Porcentaje de viviendas con ecotecnia: luz eléctrica de panel solar','Porcentaje de viviendas con servicio sanitario con biodigestor'],
            grafica:[[0.3],[0.1],[1.7]],
            label:[{chartLabel:['Viviendas']},{chartLabel:['Viviendas']},{chartLabel:['Viviendas']}],
        },
        {
            titulo: "Asequibilidad",
            tipo:'waterfall',
            data: [{ficha:indicadorViv1}],
            chartTitle:'Proporción de viviendas particulares habitadas según motivo de renta',
            grafica:[100,0.4,3.3,5.3,8,9.7,22,51.4],
            label:['Total','No sabe', 'Prefiere invertir en su persona (viajes, estudios, negocio)','No le interesa comprar', 'Otra', 'La mensualidad es menor que una hipoteca', 'Por facilidad de poder mudarse, si cambia de ciudad o empleo', 'No tiene acceso a crédito (hipotecario o bancario) / No tiene recursos']
        },
        {
            titulo: "Habitabilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas particulares habitadas propias, según respuesta del informante, que declararon estar muy satisfechos y algo satisfechos con la calidad y aspectos de la vivienda'],
            data: [{ficha:indicadorViv2},{ficha:indicadorViv3}],
            grafica:[[40.8,16.2,14.8,44.2,10.6,89.1,],[75.5,75.7,63.8,88.6,89.7,84.1]],
            label:[{chartLabel:['Grietas o cuarteaduras en techos o muros','Pandeos o deformaciones en los marcos de las puertas o ventanas','Levantamientos o hundimientos del piso','Humedad o filtraciones de agua en cimientos, muros o techos','Fracturas, pandeos o deformación de columnas, vigas o trabes','Sistema eléctrico (muros, techos, etcétera)']},
                {chartLabel: ['Calidad del piso','Calidad de los muros y techos','Pintura, recubrimientos y otros acabados','Iluminación natural','Ventilación natural','Protección que les da contra la lluvia, frío, calor o viento']}]
        },
        {
            titulo: "Accesibilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas que perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad'],
            data: [{ficha:indicadorViv4},{ficha:indicadorViv5}],
            grafica:[[12.8,9.9,12.3,12.9],[41.3,]],
            label:[{chartLabel: ['Poner pasamanos','Ampliar puertas','Poner rampas','Adecuar baños']},
                {chartLabel: ['Percepción de problemas  que tienen falta de rampas']}]
        },
        {
            titulo: "Ubicación",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas propias, según grado de satisfacción con la distancia-tiempo entre la vivienda y tipo de servicios','Porcentaje de viviendas que declararon presentar problemáticas de contaminación, ruido, inseguridad y vandalismo','Porcentaje Problemáticas de contaminación, ruido, inseguridad y vandalismo'],
            data: [{ficha:indicadorViv6},{ficha:indicadorViv7}],
            grafica:[[83.2,70.8,76.2,71.8,67.3,48.4,],[39,48,18.6,23.8,31,44]],
            label:[{chartLabel: ['Centros escolares','Mercados o centros comerciales','Trabajo','Centros de salud','Parques o espacios deportivos','Centros de recreación o instalaciones culturales']},
                {chartLabel:['Exceso de ruido','Basura tirada en las calles','Contaminación del ambiente por fábricas o construcciones','Deterioro por abandono de viviendas o espacios públicos','Problema tienen con el vandalismo, grafitis, pintas, vidrios rotos','Problema tienen con los robos o asaltos']}]
        },
        {
            titulo: "Adecuación cultural",
            tipo:'bar',
            chartTitle:'Porcentaje de viviendas que declararon tener un alto grado de identidad con sus gustos, costumbres y tradiciones',
            data: [{ficha:indicadorViv8}],
            grafica:[[81.9,]],
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
                                            <Fragment key={key}>
                                                {(key === elementos.length-1)? <Grid item xs={4}></Grid> : <></>}
                                                <Grid item xs={4}>
                                                    <CardVivienda mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image}/>
                                                </Grid>
                                            </Fragment>
                                        )}
                                        </Grid>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper elevation={0} className={classes.paper}>
                                {indicador[0] === 0 ? <img src={vivienda} className={classes.image} alt={"vivienda"} /> : indicadores[indicador[0]-1].tipo === 'none'? <img src={vivienda} className={classes.image} alt={"vivienda"}/> : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                    :
                    <Fragment>
                        <Grid item xs={12} sm={3} md={3}>
                            <Paper elevation={0} className={classes.paperImage}><br/></Paper>
                        {elementos.slice(0,4).map((card:any,key:number )=>
                            <Paper elevation={0} className={classes.paperImage} key={key}>
                            <CardVivienda  mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                            </Paper>
                        )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={0} className={classes.paperImage}>
                            {indicador[0] === 0 ? <img src={vivienda} className={classes.image} alt={"vivienda"} /> : indicadores[indicador[0]-1].tipo === 'none'? <img src={vivienda} className={classes.image} alt={"vivienda"}/> : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                        </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <Paper elevation={0} className={classes.paperImage}><br/><br/></Paper>
                            {elementos.slice(4).map((card:any,key:number ) =>
                                <Paper elevation={0} className={classes.paperImage} key={key}>
                                <CardVivienda mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                                </Paper>
                                    )}
                        </Grid>
                    </Fragment>
                }

            </Grid>
            <br/><br/><br/>
        </div>
    )
}


