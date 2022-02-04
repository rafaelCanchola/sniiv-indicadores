import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import TableMUIViv from "../Tablas/TableMUIViv";
import ReactECharts from "echarts-for-react";
import DualBarChart from "../Graficas/eCharts/DualBarChart";

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

interface IndicadorViviendaProps {
    indicador:any,
}

export function IndicadorVivienda(props:IndicadorViviendaProps){
    const classes = useStyles();
    const barChart = {
        xAxis: {
            data: ['Grietas en techos','Marcos de las puertas','Hundimiento del piso','Filtración de agua','Fractura de columnas','Sistema eléctrico'],
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
                data: [14390038,5725273,5218505,15583020,3729173,31425730]
            }
        ]
    }

    return(
<div className={classes.root}>
            {props.indicador.tipo === 'dual' ?
                <Grid container spacing={2}  >
                    {props.indicador.grafica.map((indicadorChart: any, key: number) =>
                        <DualBarChart title={props.indicador.chartTitle[key]} data={indicadorChart.chart} label={props.indicador.label[key].chartLabel} key={key+props.indicador.titulo}/>
                    )}
                </Grid>
            :
                <Fragment>
                </Fragment>
            }
    <Grid container spacing={2}  >
            {props.indicador.tipo === 'dual' ?
                <Fragment>
                    {props.indicador.data.map((indicadorFicha: any, key: number) =>
                        <Grid item xs={12} sm={12} md={6} key={props.indicador.chartTitle[key]+key}>
                            <Paper elevation={3} className={classes.paper}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography
                                            className={classes.body}>Ficha Técnica</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <TableMUIViv data={indicadorFicha.ficha}/>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Grid>
                    )}
                </Fragment>
                :
                <Fragment>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >{props.indicador.chartTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <TableMUIViv data={props.indicador.data[0].ficha}/>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>
                </Fragment>

            }

        </Grid>
    </div>
    )
}