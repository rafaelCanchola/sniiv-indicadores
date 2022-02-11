import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReactECharts from "echarts-for-react";

import trimestral from "../../../assets/images/trimestral.png";
import {useStyles} from "../../../utils/Style";
import {ordinalNumber} from "../../../utils/Utils";

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
        <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={0} className={classes.paper}>
                            <h1>{props.title}</h1>
                            <Paper elevation={3} className={classes.paper}>
                            <h5>{props.periodo}</h5>
                            <AutorenewIcon fontSize={'large'} onClick={() => {
                                props.callBack2()
                            }}/>
                            </Paper>

                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} sm={12} md={3} >
                        <Paper elevation={0} className={classes.paper}>
                            <h2>{props.titleTrimestral}</h2>
                            <Paper elevation={3} className={classes.paper}>
                                <a href={'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/4B9gmHHOQ9m69oVBdVEIFA/content/3er_informe_trimestral_PNV.pdf'} target={"_blank"} rel={"noreferrer"}><img src={trimestral} className={classes.imagePNV} alt={"Reporte trimestral"} /></a>
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} >
                        <Paper elevation={0} className={classes.paper}>
                            <h2>{props.titleBar}</h2>
                            <Paper elevation={3} className={classes.paper}>
                                <ReactECharts option={option} onEvents={onEvents} />
                            </Paper>
                        </Paper>
                    </Grid>


                </Grid>
        </div>
    )
}