import React, { Fragment } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReactECharts from "echarts-for-react";

import trimestral from "../../../assets/images/trimestral.png";
import {useStyles} from "../../../utils/Style";
import {MobileSize, ordinalNumber} from "../../../utils/Utils";
import CardBanner from "../MUIComponents/CardBanner";


interface CumplimientoProps {
    data: any;
    periodo: string;
    seccion: string;
    callBack:any,
    callBack2:any,
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

export default function TotalesCumplimientoBienestar(props:CumplimientoProps){
    const classes = useStyles();
    const isMobile = MobileSize();
    const bienestar1 = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/jqSkhFwsSC27_u5Lm0tIaw/content/cumplimiento.jpg?&a=true'

    const option = {
        xAxis: {
            name:'Trimestre',
            nameLocation:'center',
            data: props.data.map((d: AxisChart) => d.trimestre),
            axisLabel: {
                inside: true,
                color: '#595959',
                formatter: (value:any) => ordinalNumber(value)+' trimestre',
            },
            axisTick: {
                show: true
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            name:'Porcentaje',
            nameLocation:'center',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999',
                formatter: "{value} %",
                show:false,
            }
        },

        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            dimension: 1,
            inRange: {
                color: ['#FD665F','#FFCE34','#65B581']
            }
        },
        series: [
            {
                type: 'bar',
                showBackground: true,
                label:{

                    show:true,
                    position:"top",
                    type:"value",
                    formatter: (data:any) => parseInt(data.value) +" %",

                },

                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: props.data.map((d: AxisChart) => d.aCabo/d.total*100)
            }
        ]
    };

    const onChartClick = (params:any) => {
        props.callBack(params.name);

    };
    const onEvents = {
        click: onChartClick,
    };

    return(
        <Fragment>
            <CardBanner subtitle={props.periodo}
                        title={props.title}
                        image={bienestar1}
                        more1={'El Programa Nacional de Vivienda 2021-2024 se fundamenta en cinco principios: la persona al centro de todas las decisiones en el sector vivienda; el uso eficiente de los recursos públicos; la coordinación entre los distintos órdenes de gobierno y la colaboración amplia con todos los sectores de la sociedad; la rendición de cuentas y el combate a la corrupción, y por primera vez, la generación de un modelo integral de ordenamiento territorial.'}
                        more2={'El seguimiento y evaluación del PNV 2021-2024, a través de un informe trimestral de resultados, permitirá identificar los avances  y áreas de oportunidad en sus cinco objetivos prioritarios, para alcanzar sus grandes metas a 2024, por medio de acciones y monto invertido de los programas de apoyo a la vivienda; así como de convenios, lineamientos, sistemas de información, capacitación, asesorías, acuerdos, desarrollo de nuevos productos, entre otras importantes estrategias'}
                        isMobile={isMobile}/>
            <Paper className={classes.paperContainer3}>
            <div className={classes.root}>
                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} sm={12} md={3} >
                        <Paper elevation={0} className={classes.paperImage3}>
                            <h2 className={classes.textColor}>{props.titleTrimestral}</h2>
                            <a href={'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/4B9gmHHOQ9m69oVBdVEIFA/content/3er_informe_trimestral_PNV.pdf'} target={"_blank"} rel={"noreferrer"}><img src={trimestral} className={classes.imagePNV} alt={"Reporte trimestral"} /></a>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} >
                        <Paper elevation={0} className={classes.paperImage3}>
                            <Paper elevation={3} className={classes.paper}>
                                <h2 className={classes.textColorGrey}>{props.titleBar}</h2>
                                <AutorenewIcon className={classes.textColorGrey} fontSize={'large'} onClick={() => {props.callBack2()}}/>
                                <ReactECharts option={option} onEvents={onEvents} />
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            </Paper>

        </Fragment>
    )
}