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
import {colorBrewer} from "../../colorBrewer";

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
    const assignColor = (obj: number) => {
        switch (obj) {
            case 0:
                return colorBrewer.ViviendaColor[0]
                break;
            case 1:
                return colorBrewer.ViviendaColor[1]
                break;
            case 2:
                return colorBrewer.ViviendaColor[2]
                break;
            case 3:
                return colorBrewer.ViviendaColor[3]
                break;
            case 4:
                return colorBrewer.ViviendaColor[4]
                break;
            case 5:
                return colorBrewer.ViviendaColor[5]
                break;
            default:
                return colorBrewer.ViviendaColor[Math.floor(Math.random() * 6) + 0]
        }

    };
    let dataBar: any[]
    if(props.indicador.tipo === 'waterfall'){
        dataBar = props.indicador.grafica
    }
    else {
        dataBar = props.indicador.grafica[props.indicadorIndex].map((d: AxisChart,key:number) =>
            ({value:(d),itemStyle:{color: assignColor(key)}}))
    }
    return(
        <div className={classes.root}>
            {props.indicador.tipo === 'dual' ?
                <Grid container spacing={2}  >
                    <BarChart title={props.indicador.chartTitle[props.indicadorIndex]} data={dataBar} label={props.indicador.label[props.indicadorIndex]} />
                </Grid>
            : props.indicador.tipo === 'waterfall' ?
                    <Grid container spacing={2}  >
                        <Waterfall title={props.indicador.chartTitle} data={dataBar} label={props.indicador.label} />
                    </Grid>
                    :
                        <Grid container spacing={2}  >
                            <BarChart title={props.indicador.chartTitle} data={dataBar} label={props.indicador.label} />
                        </Grid>
            }
            <Grid container spacing={2}  >
                <Grid item xs={12} sm={12} md={12} >
                    <Paper elevation={3} className={classes.paper}>
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
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}