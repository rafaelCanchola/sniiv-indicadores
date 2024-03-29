import React, {Fragment, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactECharts from "echarts-for-react";
import CardObjetivo from '../MUIComponents/CardObjetivo';

import {colorBrewer} from "../../../utils/colorBrewer";

import pnv2021 from "../../../assets/images/pnv2021.png";
import objetivo1 from "../../../assets/images/obj1.png";
import objetivo2 from "../../../assets/images/obj2.png";
import objetivo3 from "../../../assets/images/obj3.png";
import objetivo5 from "../../../assets/images/obj5.png";
import objetivo6 from "../../../assets/images/obj6.png";

import {useStyles} from "../../../utils/Style";
import CardBanner from "../MUIComponents/CardBanner";
import {MobileSize} from "../../../utils/Utils";
import IndicadoresBienestar from "../ComponentesPaginas/IndicadoresBienestar";


export default function ObjetivoPNV(props:any){
    const classes = useStyles();
    const isMobile = MobileSize();
    const [objetivo,setObjetivo] = useState(0);

    const bienestar2 = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/0dbOa_A1Rv2zirBGGCuwDg/content/pnv.jpeg?&a=true'

    const objetivos = [
        {
            "title":"Objetivo 1",
            "obj": "Garantizar el ejercicio del derecho a la vivienda adecuada a todas las personas, especialmente a los grupos en mayor condición de discriminación y vulnerabilidad, a través de soluciones financieras, técnicas y sociales de acuerdo con las necesidades específicas de cada grupo de población.",
            "more": "",
            "img":objetivo1,
            color:colorBrewer.Objetivos[0],
            "size":2,
            index:0,
            tabla:props.objs.Objetivo1
        },
        {
            "title":"Objetivo 2",
            "obj":"Garantizar la coordinación entre los organismos nacionales de vivienda y los distintos órdenes de gobierno para el uso eficiente de los recursos públicos",
            "more":"",
            "img":objetivo2,
            color:colorBrewer.Objetivos[1],
            "size":2,
            index:1,
            tabla:props.objs.Objetivo2
        },
        {
            "title":"Objetivo 3",
            "obj":"Fomentar conjuntamente con el sector social y privado, condiciones que propicien el ejercicio del derecho a la vivienda adecuada.",
            "more":"",
            "img":objetivo3,
            color:colorBrewer.Objetivos[2],
            "size":2,
            index:2,
            tabla:props.objs.Objetivo3
        },
        {
            "title":"Objetivo 4",
            "obj":"Asegurar el derecho a la información y la rendición de cuentas de todos los actores del sistema de vivienda adecuada.",
            "more":"",
            "img":objetivo6,
            color:colorBrewer.Objetivos[3],
            "size":2,
            index:3,
            tabla:props.objs.Objetivo4
        },
        {
            "title":"Objetivo 5",
            "obj":"Establecer un modelo de ordenamiento territorial y gestión del suelo que considere la vivienda adecuada como elemento central de planeación de territorio.",
            "more":"",
            "img":objetivo5,
            color:colorBrewer.Objetivos[4],
            "size":2,
            index:4,
            tabla:props.objs.Objetivo5
        }
    ]
    const sankey = {
        tooltip:{
            formatter: '{b}: {c} acciones puntuales ',
        },
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
            links: props.sankey
        }
    }

    const handleCallback = (childData: any) => {
        setObjetivo(childData)
    }

    return(
        <Fragment>
            <CardBanner
                hasButton={true}
                isBig={true}
                isMobile={isMobile}
                subtitle={'El Programa Nacional de Vivienda es un programa especial derivado del Plan Nacional de Desarrollo 2019-2024.'}
                title={'¿Qué es el Programa Nacional de Vivienda?'} image={bienestar2}
                more1={'El Programa Nacional de Vivienda 2021-2024 es el instrumento de planeación de la política nacional de vivienda. Este programa es pionero al integrar por primera vez el derecho humano del acceso a la vivienda adecuada, que considera los siguientes siete elementos establecidos por ONU-Hábitat: seguridad de la tenencia; disponibilidad de servicios, materiales, instalaciones e infraestructura; asequibilidad, habitabilidad, accesibilidad; ubicación y adecuación cultural.'}
                more2={'El Programa está compuesto por cinco objetivos prioritarios: 21 estrategias prioritarias y 113 acciones puntuales cuyo cumpliento se realizará en conjunto entre la Comisión Nacional de Vivienda (CONAVI), el Fondo de la Vivienda del Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado (FOVISSSTE), el Instituto del Fondo Nacional de la Vivienda para los Trabajadores (INFONAVIT), Sociedad Hipotecaria Federal (SHF) y la Secretaría de Desarrollo Agrario, Territorial y Urbano (SEDATU) y, el Instituto Nacional de Suelo Sustentable (INSUS).'} />
            <Paper className={classes.paperContainer4}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <h3 className={classes.textColor}>{"5 objetivos prioritarios"}</h3>
                            <h3 className={classes.textColor}>{"113 acciones puntuales"}</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} >
                            <Paper elevation={0} className={classes.paperImage4}>
                                <h3 className={classes.textColor}>{"Conoce el Programa Nacional de Vivienda"}</h3>
                            <a href={'https://www.gob.mx/cms/uploads/attachment/file/643644/PNV_28.05.2021.pdf'} target={"_blank"} rel={"noreferrer"}><img src={pnv2021} className={classes.imagePNV} alt={"PNV"}/></a>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                                <br/>
                                <Paper elevation={3} className={classes.paper}>
                                    <h4 className={classes.textColorGrey}>{"Distribución de las acciones puntuales, según objetivo prioritario y organismo de vivienda"}</h4>
                                    <ReactECharts option={sankey} />
                                    <h5 className={classes.textColorGrey}>{"*La suma de las acciones por ONAVI es superior a 113, pues una acción puede ser atendida por más de una ONAVI"}</h5>
                                </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems={'center'} >
                        {isMobile ?
                            <Fragment >
                                {objetivos.slice(0,3).map(card =>
                                    <Fragment key={card.obj}>
                                        <Grid item xs={4}>
                                            <CardObjetivo callBack={handleCallback} title={card.title} content={card.obj} more={card.more} image={card.img} tabla={card.tabla} index={card.index} color={card.color}/>
                                        </Grid>
                                        <br/>
                                    </Fragment>
                                )}
                                <Grid item xs={2}></Grid>
                                {objetivos.slice(3).map(card =>
                                    <Fragment key={card.obj}>
                                        <Grid item xs={4}>
                                            <CardObjetivo callBack={handleCallback} title={card.title} content={card.obj} more={card.more} image={card.img} tabla={card.tabla} index={card.index} color={card.color}/>
                                        </Grid>
                                        <br/>
                                    </Fragment>
                                )}
                            </Fragment>
                            :
                            <Grid item xs={12} sm={12} md={3}>
                                {objetivos.map(card =>
                                    <Fragment key={card.obj}>
                                        <Grid item xs={12}   >
                                            <CardObjetivo callBack={handleCallback} title={card.title} content={card.obj} more={card.more} image={card.img} tabla={card.tabla} index={card.index} color={card.color}/>
                                        </Grid>
                                        <br/>
                                    </Fragment>
                                )}
                            </Grid>
                        }

                        <Grid item xs={12} sm={12} md={9}>
                            <IndicadoresBienestar indicadorIndex={objetivo} info={objetivos[objetivo].obj} image={objetivos[objetivo].img} color={objetivos[objetivo].color} tabla={objetivos[objetivo].tabla} fichas={props.bienestar}/>
                        </Grid>
                    </Grid>
                <br/><br/><br/>
            </div>
            </Paper>
        </Fragment>

    )
}