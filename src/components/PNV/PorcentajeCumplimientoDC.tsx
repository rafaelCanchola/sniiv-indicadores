import React, {useState} from 'react';
import * as dc from "dc";
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';

import BarChart from "./Graficas/CumplimientoDC/BarChart";
import PieChart from "./Graficas/CumplimientoDC/PieChart";
import RowChart from "./Graficas/CumplimientoDC/RowChart";
import MostrarAcciones from "./Graficas/CumplimientoDC/Cifras";
import {DataContext} from './Graficas/Context/CumplimientoContext';
import pnv2021 from "../../assets/images/pnv2021.png"


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
    title: string;
    titleTrimestral: string;
    titleCifras: string;
    titlePie: string;
    titlePie2: string;
    titleRow1: string;
    titleRow2: string;
    titleBar: string;
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

export default function PorcentajeCumplimientoDC(props:CumplimientoProps){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const classes = useStyles();
     console.log(props.data)
    return(
        <div className={classes.root}>
                <DataContext seccion={props.seccion} data={props.data} aAxis={props.aAxis} bAxis={props.bAxis} cAxis={props.cAxis} dAxis={props.dAxis} eAxis={props.eAxis} fAxis={props.fAxis} gAxis={props.gAxis} hAxis={props.hAxis}>

                    <Grid container spacing={2} alignItems={'center'} >

                        <Grid item xs={12} sm={12} md={6}>
                            <Paper elevation={3} className={classes.paper}>
                                <RowChart modoValue={modo} titulo={props.titleRow1}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper elevation={3} className={classes.paper}>
                                <PieChart modoValue={modo} titulo={props.titlePie}/>
                            </Paper>
                        </Grid>

                    </Grid>
                </DataContext>
        </div>
    )
}