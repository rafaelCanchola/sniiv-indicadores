import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import TableMUIViv from "../Tablas/TableMUIViv";
import Waterfall from "../Graficas/eCharts/Waterfall";
import BarChart from "../Graficas/eCharts/BarChart";
import {colorBrewer} from "../../../utils/colorBrewer";
import {assign4TColor, assignColor, SaveToPDF} from "../../../utils/Utils";
import BarChartNumber from "../Graficas/eCharts/BarChartNumber";
import {useStyles} from "../../../utils/Style";


interface IndicadorViviendaProps {
    indicador:any,
    indicadorIndex:any,
}

interface AxisChart{
    [x: string]:any;
}

export function IndicadorVivienda(props:IndicadorViviendaProps){
    const onButtonClick = () => SaveToPDF("ind_"+props.indicador.pdfName[props.indicadorIndex],"Indicador"+props.indicadorIndex,160,290)
    const classes = useStyles();
    let colors = assignColor(10)
    let dataBar: any[]
    if(props.indicador.tipo === 'waterfall'){
        dataBar = props.indicador.grafica[props.indicadorIndex]
    }
    else {
        dataBar = props.indicador.grafica[props.indicadorIndex].map((d: AxisChart,key:number) =>
            ({value:(d),itemStyle:{color: colorBrewer.T4Green[colors[key]]}}))
    }
    return(
        <div className={classes.root}>
            <h3 className={classes.textColorGrey}>{props.indicador.titulo}</h3>
            {props.indicador.tipo === 'dual' ?
                <Grid container spacing={2}  >
                    <BarChart title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} xAxis={props.indicador.xAxis[props.indicadorIndex]} yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
                </Grid>
            : props.indicador.tipo === 'waterfall' ?
                    <Grid container spacing={2}  >
                        <Waterfall title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} xAxis={props.indicador.xAxis[props.indicadorIndex]} yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
                    </Grid>
                    : props.indicador.tipo === 'dualBar' ?
                        <Grid container spacing={2}  >
                            <BarChartNumber title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} xAxis={props.indicador.xAxis[props.indicadorIndex]} yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
                        </Grid>
                            :
                        <Grid container spacing={2}  >
                            <BarChart title={props.indicador.chartTitle} data={dataBar} label={props.indicador.label} xAxis={props.indicador.xAxis[props.indicadorIndex]} yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
                        </Grid>
            }
            {props.indicador.data[props.indicadorIndex] !== undefined?
                <Grid container spacing={2}  >
                    <Grid item xs={12} sm={12} md={12} >
                        <Accordion >
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography
                                    className={classes.body}>Ficha Técnica</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <TableMUIViv data={props.indicador.data[props.indicadorIndex].ficha} id={"Indicador"+props.indicadorIndex} pdfName={"ind_"+props.indicador.pdfName[props.indicadorIndex]}/>
                                   </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            :
                <></>
            }

        </div>
    )
}