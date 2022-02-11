import React, {useEffect, useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableIcon from '@material-ui/icons/Toc';
import ReactECharts from "echarts-for-react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import TableMUIPNV from "../Tablas/TableMUIPNV";

import conavi from "../../../assets/images/conavi.png";
import fovissste from "../../../assets/images/fovissste.png";
import infonavit from "../../../assets/images/infonavit.png";
import insus from "../../../assets/images/insus.png";
import shf from "../../../assets/images/shf.png";
import sedatu from "../../../assets/images/sedatu.png";
import {colorBrewer} from "../../../utils/colorBrewer";
import {assignObjetivosColor, assignStateColor} from "../../../utils/Utils";
import {useStyles} from "../../../utils/Style";


interface CumplimientoProps {
    data: any;
    data2:any;
    seccion: string;
    titleRow: string;
    titleBar: string;
    periodo:string;
    fichaPie: any;
    fichaPie3: any;
    titleCifras: string;
    titlePie: string;
    titlePie2: string;
    titleRow1: string;
    titleRow2: string;
    titleInforme: string;
    aAxis: string;
    bAxis: string;
    cAxis: string;
    dAxis: string;
    eAxis: string;
    fAxis: string;
    gAxis: string;
    hAxis: string;
}

interface AxisChart{
    [x: string]:any;
}

export default function PorcentajeCumplimientoBienestar(props:CumplimientoProps){
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {setWidth(window.innerWidth);}
    useEffect(() => {window.addEventListener('resize', handleWindowSizeChange);return () => {window.removeEventListener('resize', handleWindowSizeChange);}}, []);

    const isMobile = width <= 768;

    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);
    const classes = useStyles();

    const onaIcons = {
        CONAVI:conavi,
        FOVISSSTE:fovissste,
        INFONAVIT:infonavit,
        INSUS:insus,
        SHF:shf,
        SEDATU:sedatu
    }
    const orderPie = (data:any,objective:number) =>{
        let dataPie = props.data.filter((d: any) => d[props.hAxis] === objective)[0];
        let reduceDataPie = Object.keys(dataPie).reduce((obj:any,key:any) => {if(key !== props.hAxis && key !== props.fAxis && key !== props.aAxis){obj[key]=dataPie[key]}return obj},{})
        let mapDatapie = Object.keys(reduceDataPie).map((d:any) => ({name:d,value:reduceDataPie[d],itemStyle:{color: assignStateColor(d,props.bAxis,props.cAxis,props.dAxis,props.eAxis)}}))
        return {
            title: {
                text: 'Objetivo '+objective,
            },
            tooltip: {},
            legend: {
                top: 'bottom',
                left: 'center'
            },
            series: [
                {
                    type: 'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,

                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 5,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: mapDatapie.slice(0).sort(function(a,b) {return b.value - a.value;})
                },
            ],
            color:colorBrewer.Objetivos,
        }

    }
    let dataRow = props.data.map((d: AxisChart,key:number) =>
        ({value:parseInt(((d[props.bAxis]+d[props.cAxis] )/d[props.aAxis]*100).toString()),title:key+1,itemStyle:{color: assignObjetivosColor(d[props.hAxis])}, detail:{offsetCenter: [0,''+((key*22)-45)+'%']}}))
        .reverse()
    let labelDataRow = props.data.map((d: AxisChart) => "Objetivo "+d[props.hAxis]).reverse()
    let dataBar = props.data2.map((d: AxisChart) =>
        ({value:(d[props.aAxis] === 0 ? 0 : parseInt(((d[props.bAxis]+d[props.cAxis] )/d[props.aAxis]*100).toString())),itemStyle:{color: assignObjetivosColor(d[props.hAxis])}}))
    let labelDataBar = props.data2.map((d: AxisChart) => d[props.gAxis])

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
    const iconHeight = isMobile ? 20: 40;
    const iconWidth = isMobile ? 40: 80;
    const RowChart = {

        tooltip: {

        },
        xAxis: {
            axisLabel: {
                color: '#999',
                formatter: "{value} %",
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },

        },
        yAxis: {
            axisTick: {
                show: true
            },
            axisLine: {
                show: false
            },
            z: 10,
            axisLabel: {
                inside: true,
                color: '#fff',
            },
            data: labelDataRow,
        },
        grid:{
            left:'7%',
            right:'7%',
            top:'5%',
            bottom:'10%',
        },
        series: [
            {
                type: 'bar',
                showBackground: true,
                label:{
                    show:true,
                    position:"right",
                    type:"value",
                    formatter: (data:any) => data.value+" %",

                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: dataRow
            }
        ],
        color:colorBrewer.Objetivos,
    };

    const GaugeChart = {
        tooltip: { },
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: true,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 40
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: 50
                },
                data: dataRow,
                title: {
                    fontSize: 14
                },
                detail: {
                    width: 35,
                    height: 10,
                    fontSize: 14,
                    color: 'inherit',
                    borderColor: 'inherit',
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: '{value}%',
                    offsetCenter: [0,'-40%']
                },
            }
        ]
    }
    const BarChart = {
        tooltip: {},
        yAxis: {
            axisLabel: {
                color: '#999',
                formatter: "{value} %"
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        xAxis: {
            axisLine: {
                show: false
            },
            z: 10,
            axisLabel: {
                inside: false,
                margin:20,
                formatter: (value:any) => '{' + value + '| }',
                rich: {
                    value: {
                        lineHeight: 5,
                        align: 'center',
                        fontSize: 10,
                    },
                    CONAVI:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.CONAVI
                        },
                    },
                    FOVISSSTE:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.FOVISSSTE
                        },
                    },
                    INFONAVIT:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.INFONAVIT
                        },
                    },
                    SHF:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.SHF
                        },
                    },
                    INSUS:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.INSUS
                        },
                    },
                    SEDATU:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.SEDATU
                        },
                    },
                }
            },
            data: labelDataBar,
        },
        grid:{
            left:'6%',
            right:'5%',
            top:'5%'
        },
        series: [
            {
                type: 'bar',
                showBackground: false,
                label:{
                    show:false,
                    position:"top",
                    type:"value",
                    formatter: (data:any) => data.value +" %",
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: dataBar
            },
        ],
        color:colorBrewer.Objetivos,
    };

    return(
        <div className={classes.root}>
                <Grid container spacing={2} alignItems={'center'} >
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={0} className={classes.paper}>
                                <h2>{props.titleRow}</h2>
                                <h3>{props.periodo}</h3>
                                <TableIcon fontSize={'large'} onClick={handleClickOpen1}/>
                                <Paper elevation={3} className={classes.paper}>
                                <ReactECharts option={GaugeChart} className={classes.gauge} />
                                    {
                                        //<ReactECharts option={RowChart} />
                                    }
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Paper elevation={0} className={classes.paper}>
                                <h2>{props.titleBar}</h2>
                                <h3>{props.periodo}</h3>
                                <br/>
                                <br/>
                                <Paper elevation={3} className={classes.paper}>
                                    <ReactECharts option={BarChart} opts={{ renderer: 'svg' }}  />
                                </Paper>
                            </Paper>
                        </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={0} className={classes.paper}>
                            <h2>{props.titlePie}</h2>
                            <h3>{props.periodo}</h3>
                            <TableIcon fontSize={'large'} onClick={handleClickOpen3}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={1}>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <ReactECharts option={orderPie(props.data,1)} opts={{ renderer: 'svg' }}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <ReactECharts option={orderPie(props.data,2)} opts={{ renderer: 'svg' }}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <ReactECharts option={orderPie(props.data,3)} opts={{ renderer: 'svg' }}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <ReactECharts option={orderPie(props.data,4)} opts={{ renderer: 'svg' }}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Paper elevation={3} className={classes.paper}>
                            <ReactECharts option={orderPie(props.data,5)} opts={{ renderer: 'svg' }}  />
                        </Paper>
                    </Grid>
                </Grid>
            <Dialog fullScreen={isMobile} open={open1} onClose={handleClose1} aria-labelledby={'customized-dialog-title'} maxWidth={"md"}>
                <DialogTitle>
                    Ficha Técnica
                </DialogTitle>
                <DialogContent dividers>
                    <TableMUIPNV data={props.fichaPie}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose1} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullScreen={isMobile} open={open3} onClose={handleClose3} aria-labelledby={'customized-dialog-title'} maxWidth={"md"}>
                <DialogTitle>
                    Ficha Técnica
                </DialogTitle>
                <DialogContent dividers>
                    <TableMUIPNV data={props.fichaPie3}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose3} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}