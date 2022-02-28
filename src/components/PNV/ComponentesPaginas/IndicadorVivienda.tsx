import React from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TableMUIViv from "../Tablas/TableMUIViv";
import Waterfall from "../Graficas/eCharts/Waterfall";
import BarChart from "../Graficas/eCharts/BarChart";
import {colorBrewer} from "../../../utils/colorBrewer";
import { assignColor} from "../../../utils/Utils";
import BarChartNumber from "../Graficas/eCharts/BarChartNumber";
import {useStyles} from "../../../utils/Style";
import PieChart from "../Graficas/eCharts/PieChart";
import Paper from "@material-ui/core/Paper";


interface IndicadorViviendaProps {
    indicador:any,
    indicadorIndex:any,
}

interface AxisChart{
    [x: string]:any;
}

export function IndicadorVivienda(props:IndicadorViviendaProps){
    const classes = useStyles();
    let colors = assignColor(10)
    let dataBar: any[]
    props.indicador.grafica[props.indicadorIndex].sort((a:any,b:any) => {return a - b})
    if(props.indicador.tipo === 'waterfall'){
        dataBar = props.indicador.grafica[props.indicadorIndex]
    }
    else if(props.indicador.tipo === 'pie'){
        dataBar = props.indicador.grafica[props.indicadorIndex].map((d: AxisChart,key:number) =>
            ({value:(d),name:props.indicador.label[props.indicadorIndex].chartLabel[key],itemStyle:{color: colorBrewer.T4Green[key]}}))
    }
    else{
        dataBar = props.indicador.grafica[props.indicadorIndex].map((d: AxisChart,key:number) =>
            ({value:(d),itemStyle:{color: colorBrewer.T4Green[key]}}))
    }
    return(
        <div className={classes.root}>
            <h3 className={classes.textColorGrey}>{props.indicador.titulo}</h3>
            {props.indicador.tipo === 'dual' &&
            <Grid container spacing={2}>
                <BarChart title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar}
                          label={props.indicador.label[props.indicadorIndex]}
                          xAxis={props.indicador.xAxis[props.indicadorIndex]}
                          yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
            </Grid>
            }
            {props.indicador.tipo === 'waterfall' &&
            <Grid container spacing={2}>
                <Waterfall title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar}
                           label={props.indicador.label[props.indicadorIndex]}
                           xAxis={props.indicador.xAxis[props.indicadorIndex]}
                           yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
            </Grid>
            }
            {props.indicador.tipo === 'dualBar' &&
            <Grid container spacing={2}>
                <BarChartNumber title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar}
                                label={props.indicador.label[props.indicadorIndex]}
                                xAxis={props.indicador.xAxis[props.indicadorIndex]}
                                yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
            </Grid>
            }
            {props.indicador.tipo === 'pie' &&
            <Grid container spacing={2}  >
                <PieChart title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar}
                           label={props.indicador.label[props.indicadorIndex]}
                           xAxis={props.indicador.xAxis[props.indicadorIndex]}
                           yAxis={props.indicador.yAxis[props.indicadorIndex]}/>
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