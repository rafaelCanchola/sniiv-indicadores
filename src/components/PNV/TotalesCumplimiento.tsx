import React, {useState} from 'react';
import * as dc from "dc";
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';
import ReactECharts from "echarts-for-react";

import pnv2021 from "../../assets/images/pnv2021.png";

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
            width:"80%",
            height: "auto"
        }
    })

);

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

export default function TotalesCumplimiento(props:CumplimientoProps){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const classes = useStyles();
    const option = {
        xAxis: {
            data: props.data.map((d: AxisChart) => d.trimestre),
            axisLabel: {
                inside: true,
                color: '#fff'
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

            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999',
                formatter: "{value} %"
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
                        <Paper elevation={3} className={classes.paper}>
                            <h1>{props.title}</h1>
                            <h5>{props.periodo}</h5>
                            <AutorenewIcon fontSize={'large'} onClick={() => {
                                setReiniciarS(!reiniciarS);
                                dc.filterAll(props.seccion)
                            }}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} sm={12} md={9} >
                        <Paper elevation={3} className={classes.paper}>
                            <h2>{props.titleBar}</h2>
                            <ReactECharts option={option} onEvents={onEvents} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Paper elevation={3} className={classes.paper}>
                            <h2>{props.titleTrimestral}</h2>
                            <a href={'https://www.gob.mx/cms/uploads/attachment/file/643644/PNV_28.05.2021.pdf'} target={"_blank"}><img src={pnv2021} className={classes.image} /></a>
                        </Paper>
                    </Grid>

                </Grid>
        </div>
    )
}