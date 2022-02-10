import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import TableMUIViv from "../Tablas/TableMUIViv";
import Waterfall from "../Graficas/eCharts/Waterfall";
import BarChart from "../Graficas/eCharts/BarChart";
import {colorBrewer} from "../../../utils/colorBrewer";
import {assign4TColor, assignColor} from "../../../utils/Utils";
import BarChartNumber from "../Graficas/eCharts/BarChartNumber";

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
    indicadorIndex:any,
}

interface AxisChart{
    [x: string]:any;
}

export function IndicadorVivienda(props:IndicadorViviendaProps){

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
            <h3>{props.indicador.titulo}</h3>
            {props.indicador.tipo === 'dual' ?
                <Grid container spacing={2}  >
                    <BarChart title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} />
                </Grid>
            : props.indicador.tipo === 'waterfall' ?
                    <Grid container spacing={2}  >
                        <Waterfall title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} />
                    </Grid>
                    : props.indicador.tipo === 'dualBar' ?
                        <Grid container spacing={2}  >
                            <BarChartNumber title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} />
                        </Grid>
                            :
                        <Grid container spacing={2}  >
                            <BarChart title={props.indicador.chartTitle} data={dataBar} label={props.indicador.label} />
                        </Grid>
            }
            <Grid container spacing={2}  >
                <Grid item xs={12} sm={12} md={12} >
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography
                                className={classes.body}>Ficha Técnica</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <TableMUIViv data={props.indicador.data[props.indicadorIndex].ficha}/>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}