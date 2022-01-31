import React, {Fragment, useState} from 'react';
import ReactECharts from "echarts-for-react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TableIcon from "@material-ui/icons/InsertChart";
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
import TableMUIPNV from "../../Tablas/TableMUIPNV";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import TableMUIViv from "../../Tablas/TableMUIViv";


interface BarProps {
    tableData:any;
}

 const minValue = (value:string) =>{
    if(value.includes("Porcentaje")){
        return 8;
    }
    else if(value.includes("Millones") || value.includes("acciones")){
        return 300000;
    }
    else if(value.includes("Días")){
        return 50;
    }
    else if(value.includes("construcción")){
        return 1;
    }
    else if(value.includes("Créditos")){
        return 30000;
    }
    else {
        return 1000;
    }
}

const maxValue = (value:string) =>{
    if(value.includes("Porcentaje")){
        return 50;
    }
    else if(value.includes("Millones") ){
        return 1500000;
    }
    else if(value.includes("acciones")){
        return 600000;
    }
    else if(value.includes("Días")){
        return 100;
    }
    else if(value.includes("construcción")){
        return 15;
    }
    else if(value.includes("Créditos")){
        return 300000;
    }
    else {
        return 10000;
    }
}

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
        },
        typo:{
            textAlign:"center",
            color: theme.palette.text.secondary,

        },
        details: {
            alignItems: 'center',
        },
        column: {
            flexBasis: '50%',
        },


    })
);
export default function BarCharts(props:BarProps){
    const classes = useStyles();
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const handleClickOpen1 = () => {setOpen1(!open1);}
    const handleClickOpen2 = () => {setOpen2(!open2);}
    const handleClickOpen3 = () => {setOpen3(!open3);}
    const handleClickOpen4 = () => {setOpen4(!open4);}
    const handleClickOpen5 = () => {setOpen5(!open5);}

    const clicks = [
        <TableIcon fontSize={'large'} onClick={handleClickOpen1}/>,
        <TableIcon fontSize={'large'} onClick={handleClickOpen2}/>,
        <TableIcon fontSize={'large'} onClick={handleClickOpen3}/>,
        <TableIcon fontSize={'large'} onClick={handleClickOpen4}/>,
        <TableIcon fontSize={'large'} onClick={handleClickOpen5}/>,
    ];
    const clickMap = [
        {state:open1,func:handleClickOpen1},
        {state:open2,func:handleClickOpen2},
        {state:open3,func:handleClickOpen3},
        {state:open4,func:handleClickOpen4},
        {state:open5,func:handleClickOpen5},
    ]
    const unidadMedida = "Unidad de medida";
    const tendenciaEsp = "Tendencia esperada";
    const serieHistorica = "SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO";
    console.log(minValue("Porcentaje"))


    const chartTemplate = (param: any) =>
        ({
            grid:{
                left:3,
                    right:(param.data[unidadMedida].includes("Millones"))?39:20,
            },
            yAxis: {
                data: Object.keys(param.data[serieHistorica]).map((arr:any) => arr),
                    axisLabel: {inside: true, color: '#575151'}, axisTick: {show: true}, axisLine: {show: false}, z: 10
            },
            xAxis:{axisLine: {show: false}, axisTick: {show: false}, axisLabel: {color: '#999', formatter: ""}},
            visualMap: {orient: 'horizontal', left: 'center', min: minValue(param.data[unidadMedida]), max: maxValue(param.data[unidadMedida]), dimension: 0, inRange: {color: (param.data[tendenciaEsp].includes("Descendente"))?['#65B581','#FFCE34','#FD665F']:['#FD665F','#FFCE34','#65B581']}},
            series: [
                {type: 'bar', showBackground: true, label:{show:true, position:"right", type:"value", formatter: (data:any) =>(data.value === 0)?"":(param.data[unidadMedida].includes("Porcentaje"))?parseInt(data.value) +" %":parseInt(data.value).toLocaleString()},
                    emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}},
                    data: Object.keys(param.data[serieHistorica]).map((arr:any) => param.data[serieHistorica][arr])
                }]
        })
    const bienestarTitles = props.tableData.map((param:any) => param.titulo)
    const bienestarUnidades = props.tableData.map((param:any) => param.data[unidadMedida])
    const bienestarTendencia = props.tableData.map((param:any) => param.data[tendenciaEsp])
    const bienestarCharts = props.tableData.map((param:any) => chartTemplate(param));


    return(
        <div className={classes.root}>
            <Grid container spacing={2} alignItems={'center'} >
                {bienestarCharts.map((data:any,key:number) =>
                    <Fragment key={key+100}>
                        {(key===0)? <Grid item xs={12} sm={12} md={1} key={key+200} ></Grid>: <></>}
                        <Grid item xs={12} sm={12} md={2}  >
                            <Paper elevation={3} className={classes.paper}>
                                <h3>{bienestarTitles[key]}</h3>
                                <h4>{bienestarUnidades[key]}</h4>
                                <h5>{"Tendencia "+bienestarTendencia[key]}</h5>
                                {clicks[key]}
                                <ReactECharts option={data} />
                            </Paper>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
            {
                props.tableData.map((param:any,key:number) =>
                        <Dialog open={clickMap[key].state} onClose={clickMap[key].func} aria-labelledby={'customized-dialog-title'} maxWidth={"xl"} key={param.titulo + key}>
                            <DialogTitle>
                                {"Parametros y Fíchas Técnicas de la Meta del Objetivo "+(key+1)}
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={2} alignItems={'center'} >
                                {
                                    param.parametros.map((param1:any,key1:number) => <Grid item xs={12} sm={12} md={6}><Paper elevation={3} className={classes.paper}><h3>{param1.data["Nombre"]}</h3><h4>{param1.data[unidadMedida]}</h4><h5>{"Tendencia "+param1.data[tendenciaEsp]}</h5><ReactECharts option={chartTemplate(param1)}/></Paper></Grid>)
                                }

                                </Grid>
                                <Accordion key={param.titulo+key} TransitionProps={{ unmountOnExit: true }}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.typo}>{"Fichas Técnicas del Objetivo "+(key+1)} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TableMUIPNV data={param.data}/>
                                </AccordionDetails>
                                <AccordionDetails>
                                    {
                                        param.parametros.map((param1:any,key1:number) =>
                                            <div className={classes.column} key={param1.titulo+key1}>
                                                <Accordion  TransitionProps={{ unmountOnExit: true }}>
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                                      aria-controls="panel1a-content"
                                                                      id="panel1a-header"
                                                    >
                                                        <Typography className={classes.typo}>{param1.titulo}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={classes.details}>
                                                        <Typography className={classes.typo}>
                                                            <TableMUIViv data={param1.data}/>
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>

                                        )
                                    }
                                </AccordionDetails>
                                </Accordion>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={clickMap[key].func} color={'primary'}>
                                    Cerrar
                                </Button>
                            </DialogActions>
                        </Dialog>
                )
            }
            {/*<Dialog open={open1} onClose={handleClickOpen1} aria-labelledby={'customized-dialog-title'} maxWidth={"xl"}>
                <DialogTitle>
                    Ficha Técnica
                </DialogTitle>
                <DialogContent dividers>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClickOpen1} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>*/
            }

        </div>

        )
}

