import React, {useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableIcon from '@material-ui/icons/TableChart';
import TuneIcon from '@material-ui/icons/Tune';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactECharts from "echarts-for-react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";

import conavi from "../../assets/images/conavi.png";
import fovissste from "../../assets/images/fovissste.png";
import infonavit from "../../assets/images/infonavit.png";
import insus from "../../assets/images/insus.png";
import shf from "../../assets/images/shf.png";
import sedatu from "../../assets/images/sedatu.png";
import CardVivienda from "./MUICompponents/CardVivienda";
import CardObjetivo from "./MUICompponents/CardObjetivo";

import {indicadorViv1} from "../../json/PNV/fichas_ind_v1";

import TableMUIViv from "./Tablas/TableMUIViv";
import {totales} from "../../json/PNV/totalCumplimiento";
import TotalesCumplimiento from "./TotalesCumplimiento";
import Typography from "@material-ui/core/Typography";


import vivienda from "../../assets/images/house-tr.png";
import seguridad from "../../assets/images/seguridad-tr.png";
import accesibilidad from "../../assets/images/accesibilidad-tr.png";
import servicios from "../../assets/images/servicios-tr.png";
import ubicacion from "../../assets/images/ubicacion-tr.png";
import cultura from "../../assets/images/cultura-tr.png";
import habitabilidad from "../../assets/images/habitabilidad-tr.png";
import asequibilidad from "../../assets/images/asequibilidad-tr.png";

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
        }
    })
);

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

export default function ViviendaAdecuada(props:CumplimientoProps){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
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

    const elementos =[
        {
            num: 1,
            title: "SEGURIDAD EN LA TENENCIA",
            image:seguridad,
            more:"",
            size:3,
        },
        {
            num: 2,
            title: "DISPONIBILIDAD DE SERVICIOS",
            image:servicios,
            more:"",
            size:3,
        },
        {
            num: 3,
            title: "ASEQUIBILIDAD",
            image:asequibilidad,
            more:"",
            size:3,
        },
        {
            num: 4,
            title: "HABITABILIDAD",
            image:habitabilidad,
            more:"",
            size:3,
        },
        {
            num: 5,
            title: "ACCESIBILIDAD",
            image:accesibilidad,
            more:"",
            size:4,
        },
        {
            num: 6,
            title: "UBICACIÓN",
            image:ubicacion,
            more:"",
            size:4,
        },
        {
            num: 7,
            title: "ADECUACIÓN CULTURAL",
            image:cultura,
            more:"",
            size:4,
        },
    ]

    return(
        <div className={classes.root}>
                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={0} className={classes.paper}>
                            <h1>{"Vivienda Adecuada"}</h1>
                            <h5>{"Indicadores complementarios"}</h5>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {elementos.slice(0,4).map(card =>
                            <Paper elevation={0} className={classes.paper}>
                                <CardVivienda obj={card.num} title={card.title} more={card.more} image={card.image}/>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper elevation={3} className={classes.paper}>
                            <img src={vivienda} className={classes.image} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        {elementos.slice(4).map(card =>
                            <Paper elevation={0} className={classes.paper}>
                                <CardVivienda obj={card.num} title={card.title} more={card.more} image={card.image}/>
                            </Paper>
                        )}
                    </Grid>

                </Grid>

            <Grid container spacing={2} alignItems={'center'} >
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={3} className={classes.paper}>



                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >Ficha Técnica</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <TableMUIViv data={indicadorViv1}/>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Grid>

            </Grid>


        </div>
    )
}