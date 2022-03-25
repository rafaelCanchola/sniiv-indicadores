import React, {Fragment, useState} from "react";
import Paper from "@material-ui/core/Paper";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import TableIcon from "@material-ui/icons/Toc";
import ReactECharts from "echarts-for-react";

import {colorBrewer} from "../../../utils/colorBrewer";
import {assignStateColor, MobileSize} from "../../../utils/Utils";

import conavi from "../../../assets/images/conavi.png";
import fovissste from "../../../assets/images/fovissste.png";
import infonavit from "../../../assets/images/infonavit.png";
import insus from "../../../assets/images/insus.png";
import shf from "../../../assets/images/shf.png";
import sedatu from "../../../assets/images/sedatu.png";

import TableMUIPNV from "../Tablas/TableMUIPNV";
import {useStyles} from "../../../utils/Style";
import Leyenda from "../MUIComponents/Leyenda";


interface IndicadorViviendaProps {
    indicador:any,
    indicadorIndex:number
}


function namePieFormatter(value:string){
    switch (value){
        case 'concluida':
            return 'Concluida'
        case 'enProceso':
            return 'En proceso'
        case 'porIniciar':
            return 'Por Iniciar'
        case 'sinRealizar':
            return 'No se realizarán'
    }
}

function orderPie(myProps:any,objective:number){
    let dataPie = myProps.data.filter((d: any) => d[myProps.hAxis] === objective)[0];
    let reduceDataPie = Object.keys(dataPie).reduce((obj:any,key:any) => {if(key !== myProps.hAxis && key !== myProps.fAxis && key !== myProps.aAxis){obj[key]=dataPie[key]}return obj},{})
    let mapDatapie = Object.keys(reduceDataPie).map((d:any) => ({name:namePieFormatter(d),value:reduceDataPie[d],itemStyle:{color: assignStateColor(d,myProps.bAxis,myProps.cAxis,myProps.dAxis,myProps.eAxis)}}))
    const sum = mapDatapie.reduce((prev, current) => prev + current.value, 0);

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
                    show: true,
                    position: 'center',
                    formatter: () => {return sum + ' acciones' },
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


export function IndicadoresPNV(props:IndicadorViviendaProps){

    const isMobile = MobileSize();

    const classes = useStyles();
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);

    const [tableHover1, setTableHover1] = useState(false);
    const [tableHover2, setTableHover2] = useState(false);

    const onaIcons = {
        CONAVI:conavi,
        FOVISSSTE:fovissste,
        INFONAVIT:infonavit,
        INSUS:insus,
        SHF:shf,
        SEDATU:sedatu
    }

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
    const iconHeight = isMobile ? 20: 30;
    const iconWidth = isMobile ? 35: 60;

    const barData = props.indicador.data.filter((dat:any) => dat.obj === props.indicadorIndex+1);
    const labelBarData = barData.map((dat:any) => dat.name.slice(0,4))
    const GaugeChart = {
        tooltip: {
            formatter:'Objetivo {b} <br/><b>{c}%</b>',
        },
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
                data: props.indicador.data,
                title: {
                    show:false,
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
                    CONA:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.CONAVI
                        },
                    },
                    FOVI:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.FOVISSSTE
                        },
                    },
                    INFO:{
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
                    INSU:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.INSUS
                        },
                    },
                    SEDA:{
                        height:iconHeight,
                        width: iconWidth,
                        backgroundColor: {
                            image: onaIcons.SEDATU
                        },
                    },
                }
            },
            data: labelBarData,
        },
        grid:{
            left:'12%',
            right:'10%',
            top:'12%'
        },
        series: [
            {
                type: 'bar',
                showBackground: false,
                label:{
                    show:true,
                    position:"top",
                    type:"value",
                    formatter: (data:any) => data.value == 0 ? "NA" :data.value +" %",
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: barData//props.indicador.data
            },
        ],
        color:colorBrewer.Objetivos,
    };

    const propsPie = {
        data: props.indicador.data,
        aAxis:props.indicador.label[0],
        bAxis:props.indicador.label[1],
        cAxis:props.indicador.label[2],
        dAxis:props.indicador.label[3],
        eAxis:props.indicador.label[4],
        fAxis:props.indicador.label[5],
        gAxis:props.indicador.label[6],
        hAxis:props.indicador.label[7],
    }

    return(
        <div className={classes.root}>
            {props.indicador.tipo === 'gauge' &&
            <Paper elevation={0} className={classes.paper}>
                <h2>{props.indicador.title}</h2>
                <h3>{props.indicador.trimestre}</h3>
                <Button size="large" className={classes.textCard} onMouseOver={() => setTableHover1(true)}
                        onMouseOut={() => setTableHover1(false)} onClick={handleClickOpen1}>
                    {tableHover1 ? "Ficha técnica" : <TableIcon fontSize={"large"}/>}
                </Button>
                <Leyenda/>
                <Paper elevation={3} className={classes.paper}>
                    <ReactECharts option={GaugeChart} className={classes.gauge}/>
                </Paper>
            </Paper>
            }
            {props.indicador.tipo === 'bar' &&
            <Paper elevation={0} className={classes.paper}>
                <h2>{props.indicador.title}</h2>
                <h3>{props.indicador.trimestre}</h3>
                <Leyenda/>
                <Paper elevation={3} className={classes.paper}>
                    <ReactECharts option={BarChart}/>
                </Paper>
            </Paper>
            }
            {props.indicador.tipo === 'pie' &&
            <Fragment>
                <Paper elevation={0} className={classes.paper}>
                    <h2>{props.indicador.title}</h2>
                    <h3>{props.indicador.trimestre}</h3>
                    <Button size="large" className={classes.textCard} onMouseOver={() => setTableHover2(true)}
                            onMouseOut={() => setTableHover2(false)} onClick={handleClickOpen3}>
                        {tableHover2 ? "Ficha técnica" : <TableIcon fontSize={"large"}/>}
                    </Button>
                    <Paper elevation={3} className={classes.paper}>
                        <ReactECharts option={orderPie(propsPie, props.indicadorIndex + 1)}/>
                    </Paper>
                </Paper>
            </Fragment>
            }
            <Dialog fullScreen={isMobile} open={open1} onClose={handleClose1} aria-labelledby={'customized-dialog-title'} maxWidth={"md"}>
                <DialogTitle>
                    Ficha Técnica
                </DialogTitle>
                <DialogContent dividers>
                    <TableMUIPNV data={props.indicador.label[0]} id={props.indicador.label[0].Nombre} pdfName={"ind_"+props.indicador.label[0].Nombre}/>
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
                    <TableMUIPNV data={props.indicador.label[props.indicador.label.length-1]} id={"PNV"+ props.indicador} pdfName={"PNV"+ props.indicador}/>
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