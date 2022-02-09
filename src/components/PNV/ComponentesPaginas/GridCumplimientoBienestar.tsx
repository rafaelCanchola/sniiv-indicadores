import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import CardBienestar from "../MUIComponents/CardBienestar";

import objetivo from "../../../assets/images/objetivo.png";
import estatus from "../../../assets/images/estatus.png";
import onavi from "../../../assets/images/onavi.png";
import indicadores from "../../../assets/images/indicadores.png";
import programa from "../../../assets/images/programanacional.png";

import {assignObjetivosColor} from "../../../utils/Utils";
import {IndicadoresPNV} from "./IndicadoresPNV";

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
            color: theme.palette.text.secondary,
        },
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
export default function GridCumplimientoBienestar(props:CumplimientoProps){
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {setWidth(window.innerWidth);}
    useEffect(() => {window.addEventListener('resize', handleWindowSizeChange);return () => {window.removeEventListener('resize', handleWindowSizeChange);}}, []);

    const isMobile = width <= 768;

    const [indicador,setIndicador] = useState([0,0]);
    const classes = useStyles();
    let dataRow = props.data.map((d: AxisChart,key:number) =>
        ({value:parseInt(((d[props.bAxis]+d[props.cAxis] )/d[props.aAxis]*100).toString()),title:key+1,itemStyle:{color: assignObjetivosColor(d[props.hAxis])}, detail:{offsetCenter: [0,''+((key*22)-45)+'%']}}))
        .reverse()
    let labelDataRow = props.data.map((d: AxisChart) => "Objetivo "+d[props.hAxis]).reverse()
    let dataBar = props.data2.map((d: AxisChart) =>
        ({value:(d[props.aAxis] === 0 ? 0 : parseInt(((d[props.bAxis]+d[props.cAxis] )/d[props.aAxis]*100).toString())),itemStyle:{color: assignObjetivosColor(d[props.hAxis])}}))
    let labelDataBar = props.data2.map((d: AxisChart) => d[props.gAxis])



    const graficas =[
        {
            num: 1,
            title: props.titleRow,
            image:objetivo,
            more:"",
            children:[]
        },
        {
            num: 2,
            title: props.titleBar,
            image:onavi,
            more:"",
            children:[]
        },
        {
            num: 3,
            title: props.titlePie,
            image:estatus,
            more:"",
            children:[0,1,2,3,4]
        },
        {
            num: 4,
            title: "Indicadores del bienestar",
            image:indicadores,
            more:"",
            children:[0,1,2,3,4]
        },

    ]
    const indicadoresB = [
        {
            title: props.titleRow,
            trimestre: props.periodo,
            data: dataRow,
            label:[props.fichaPie],
            tipo: 'gauge'
        },
        {
            title: props.titleBar,
            trimestre: props.periodo,
            data: dataBar,
            label: labelDataBar,
            tipo: 'bar'
        },
        {
            title: props.titlePie,
            trimestre: props.periodo,
            data: props.data,
            label: [props.aAxis,props.bAxis,props.cAxis,props.dAxis,props.eAxis,props.fAxis,props.gAxis,props.hAxis,props.fichaPie3],
            tipo: 'pie'
        },
        {
            title: 'Indicadores del bienestar',
            trimestre: props.periodo,
            data:'',
            label:'',
            tipo: 'row'
        }
    ]

    const handleCallback = (childData: any) => {
        setIndicador(childData)
    }

    return(
        <div className={classes.root}>
            <Grid container spacing={2}  >

                {isMobile ?
                    <Grid container spacing={2}  >
                        <Grid item xs={12} sm={12} md={12} >
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography className={classes.body}>Selecciona un indicador</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Grid container spacing={2}  >
                                            {graficas.map((card:any,key:number) =>
                                                <Fragment key={key}>
                                                    <Grid item xs={6}>
                                                        <CardBienestar mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                                                    </Grid>
                                                </Fragment>
                                            )}
                                        </Grid>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Paper elevation={3} className={classes.paper}>
                                {indicador[0] === 0 ? <img src={programa} className={classes.image} alt={"vivienda"} /> : <IndicadoresPNV indicador={indicadoresB[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                    :
                    <Fragment>
                        <Grid item xs={12} sm={3} md={3}>
                            {graficas.slice(0,2).map(card =>
                                <CardBienestar mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={3} className={classes.paper}>
                                {indicador[0] === 0 ? <img src={programa} className={classes.image} alt={"vivienda"} /> : <IndicadoresPNV indicador={indicadoresB[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            {graficas.slice(2).map(card =>
                                <CardBienestar mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} more={card.more} image={card.image} key={card.num+card.title}/>
                            )}
                        </Grid>
                    </Fragment>
                }

            </Grid>
            <br/><br/><br/>
        </div>
    )
}


