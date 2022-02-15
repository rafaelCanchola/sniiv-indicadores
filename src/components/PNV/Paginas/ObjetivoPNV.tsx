import React, { Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactECharts from "echarts-for-react";
import CardObjetivo from '../MUIComponents/CardObjetivo';

import {objetivosONAVI} from "../../../json/PNV/objetivosONAVI";
import {colorBrewer} from "../../../utils/colorBrewer";

import pnv2021 from "../../../assets/images/pnv2021.png";
import objetivo1 from "../../../assets/images/obj1.png";
import objetivo2 from "../../../assets/images/obj2.png";
import objetivo3 from "../../../assets/images/obj3.png";
import objetivo4 from "../../../assets/images/obj4.png";
import objetivo5 from "../../../assets/images/obj5.png";
import objetivo6 from "../../../assets/images/obj6.png";

import bienestar2 from "../../../assets/images/bienestar/bienestar2.png";
import pnv from "../../../assets/images/bienestar/pnv.png";

import {useStyles} from "../../../utils/Style";
import CardBanner from "../MUIComponents/CardBanner";
import {MobileSize} from "../../../utils/Utils";


interface CumplimientoProps {
    data: any;
    periodo: string;
    seccion: string;
    callBack:any;
    title: string;
    titleTrimestral: string;
    titleCifras: string;
    titleBar: string;
    titleInforme: string;
    aAxis: string;
    bAxis: string;
    cAxis: string;
}

interface AxisChart{
    [x: string]:any;
}

export default function ObjetivoPNV(){
    const classes = useStyles();
    const isMobile = MobileSize();

    const objetivos = [
        {
            "title":"Objetivo 1",
            "obj": "Garantizar el ejercicio del derecho a la vivienda adecuada a todas las personas, especialmente a los grupos en mayor condición de discriminación y vulnerabilidad, a través de soluciones financieras, técnicas y sociales de acuerdo con las necesidades específicas de cada grupo de población.",
            "more": "",
            "img":objetivo1,
            "size":2
        },
        {
            "title":"Objetivo 2",
            "obj":"Garantizar la coordinación entre los organismos nacionales de vivienda y los distintos órdenes de gobierno para el uso eficiente de los recursos públicos",
            "more":"",
            "img":objetivo2,
            "size":2
        },
        {
            "title":"Objetivo 3",
            "obj":"Fomentar conjuntamente con el sector social y privado, condiciones que propicien el ejercicio del derecho a la vivienda adecuada.",
            "more":"",
            "img":objetivo3,
            "size":2
        },
        {
            "title":"Objetivo 4",
            "obj":"Asegurar el derecho a la información y la rendición de cuentas de todos los actores del sistema de vivienda adecuada.",
            "more":"",
            "img":objetivo6,
            "size":2
        },
        {
            "title":"Objetivo 5",
            "obj":"Establecer un modelo de ordenamiento territorial y gestión del suelo que considere la vivienda adecuada como elemento central de planeación de territorio.",
            "more":"",
            "img":objetivo5,
            "size":2
        }
    ]
    const sankey = {
        tooltip:{},
        series: {
            type: 'sankey',
            layout: 'none',
            layoutIterations:0,
            emphasis:{focus:'adjacency'},
            data: [
                {
                    name: 'Objetivo 1',
                    itemStyle: {color:colorBrewer.Objetivos[0]},
                },
                {
                    name: 'Objetivo 2',
                    itemStyle: {color:colorBrewer.Objetivos[1]},
                },
                {
                    name: 'Objetivo 3',
                    itemStyle: {color:colorBrewer.Objetivos[2]},
                },
                {
                    name: 'Objetivo 4',
                    itemStyle: {color:colorBrewer.Objetivos[3]},
                },
                {
                    name: 'Objetivo 5',
                    itemStyle: {color:colorBrewer.Objetivos[4]},
                },
                {
                    name: 'CONAVI'
                },
                {
                    name: 'FOVISSSTE'
                },
                {
                    name: 'INFONAVIT'
                },
                {
                    name: 'INSUS'
                },
                {
                    name: 'SEDATU'
                },
                {
                    name: 'SHF'
                },
            ],
            links: objetivosONAVI
        }
    }

    return(
        <Fragment>
            <CardBanner isMobile={isMobile} subtitle={'El Programa Nacional de Vivienda es un programa especial derivado del Plan Nacional de Desarrollo 2019-2024.'} title={'¿Qué es el Programa Nacional de Vivienda?'} image={bienestar2} more1={'Incorpora los siete elementos de la vivienda adecuada establecidos por ONU-Hábitat: seguridad de la tenencia; disponibilidad de servicios, materiales, instalaciones e infraestructura; asequibilidad, habitabilidad, accesibilidad; ubicación y adecuación cultural. De esta manera, se busca que todos los actores impulsen estos criterios en los planes, reglas y programas de cada institución.'} more2={'La nueva política de vivienda coloca su énfasis en los grupos más vulnerables, y devolviéndoles el acceso a la vivienda adecuada como derecho; esto en consonancia con el objetivo 2. Política Social del Plan Nacional de Desarrollo 2021-2024. Lo anterior, tomando en cuenta que la vivienda ha dejado de ser un producto comercial escindido del territorio y se ha convertido, vista desde la política pública, en un espacio habitacional inherentemente vinculado al territorio.'} />
            <Paper className={classes.paperContainer}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={3} >
                            <h2 className={classes.textColor}>{"Programa Nacional de Vivienda"}</h2>
                            <a href={'https://www.gob.mx/cms/uploads/attachment/file/643644/PNV_28.05.2021.pdf'} target={"_blank"} rel={"noreferrer"}><img src={pnv2021} className={classes.image} alt={"Imagen"}/></a>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                                <br/>
                                <h3 className={classes.textColor}>{"5 objetivos prioritarios"}</h3>
                                <h3 className={classes.textColor}>{"113 acciones puntuales"}</h3>
                                <Paper elevation={3} className={classes.paper}>
                                    <ReactECharts option={sankey} />
                                </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={'center'} >
                        <Grid item xs={12} sm={12} md={1}></Grid>
                        {objetivos.map(card =>
                            //@ts-ignore
                            <Grid item xs={12} sm={12} md={card.size} key={card.obj}  >
                                    <CardObjetivo title={card.title} content={card.obj} more={card.more} image={card.img}/>
                            </Grid>
                        )}
                    </Grid>
                <br/><br/><br/>
            </div>
            </Paper>
        </Fragment>

    )
}