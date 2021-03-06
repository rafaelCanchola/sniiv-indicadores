import React, {useState} from 'react';
import ReactECharts from "echarts-for-react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ChartIcon from "@material-ui/icons/InsertChart";
import TableIcon from "@material-ui/icons/Toc";
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
import {MobileSize, oneDecimalNumber} from "../../../../utils/Utils";


interface BarProps {
    tableData:any;
    indicadorIndex:number
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
            padding: theme.spacing(1),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
        },
        colorBlack:{
            color: theme.palette.text.primary,
            fontFamily:'Montserrat',
        },
        colorGrey:{
            color: theme.palette.text.secondary,
            fontFamily:'Montserrat',
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
        textCard:{
            fontSize:10,
            color:theme.palette.text.secondary,
            fontFamily:'Montserrat',
            textAlign:'justify'
        },


    })
);
export default function BienestarBarChart(props:BarProps){

    const isMobile = MobileSize();

    const classes = useStyles();

    const [tableHover1, setTableHover1] = useState(false);
    const [tableHover2, setTableHover2] = useState(false);

    const [openChart1, setOpenChart1] = useState(false);
    const [openChart2, setOpenChart2] = useState(false);
    const [openChart3, setOpenChart3] = useState(false);
    const [openChart4, setOpenChart4] = useState(false);
    const [openChart5, setOpenChart5] = useState(false);
    const [openTable1, setOpenTable1] = useState(false);
    const [openTable2, setOpenTable2] = useState(false);
    const [openTable3, setOpenTable3] = useState(false);
    const [openTable4, setOpenTable4] = useState(false);
    const [openTable5, setOpenTable5] = useState(false);
    const handleClickOpenChart1 = () => {setOpenChart1(!openChart1);}
    const handleClickOpenChart2 = () => {setOpenChart2(!openChart2);}
    const handleClickOpenChart3 = () => {setOpenChart3(!openChart3);}
    const handleClickOpenChart4 = () => {setOpenChart4(!openChart4);}
    const handleClickOpenChart5 = () => {setOpenChart5(!openChart5);}
    const handleClickOpenTable1 = () => {setOpenTable1(!openTable1);}
    const handleClickOpenTable2 = () => {setOpenTable2(!openTable2);}
    const handleClickOpenTable3 = () => {setOpenTable3(!openTable3);}
    const handleClickOpenTable4 = () => {setOpenTable4(!openTable4);}
    const handleClickOpenTable5 = () => {setOpenTable5(!openTable5);}


    const clickChartFunc = [
        [handleClickOpenChart1,handleClickOpenTable1],
        [handleClickOpenChart2,handleClickOpenTable2],
        [handleClickOpenChart3,handleClickOpenTable3],
        [handleClickOpenChart4,handleClickOpenTable4],
        [handleClickOpenChart5,handleClickOpenTable5],
    ]
    const clickChartMap = [
        {state:openChart1,func:handleClickOpenChart1},
        {state:openChart2,func:handleClickOpenChart2},
        {state:openChart3,func:handleClickOpenChart3},
        {state:openChart4,func:handleClickOpenChart4},
        {state:openChart5,func:handleClickOpenChart5},
    ]

    const clickTableMap = [
        {state:openTable1,func:handleClickOpenTable1},
        {state:openTable2,func:handleClickOpenTable2},
        {state:openTable3,func:handleClickOpenTable3},
        {state:openTable4,func:handleClickOpenTable4},
        {state:openTable5,func:handleClickOpenTable5},
    ]
    const unidadMedida = "Unidad de medida";
    const tendenciaEsp = "Tendencia esperada";
    const serieHistorica = "SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO";


    const chartTemplate = (param: any) =>
        ({
            grid:{
                left:'9%',
                right:(param.data[unidadMedida].includes("Millones"))?39:20,
            },
            yAxis: {
                name:'Año',
                nameLocation:'center',
                data: Object.keys(param.data[serieHistorica]).map((arr:any) => arr),
                axisLabel: {inside: true, color: '#575151'}, axisTick: {show: true}, axisLine: {show: false}, z: 10
            },
            xAxis:{axisLine: {show: false}, axisTick: {show: false}, axisLabel: {color: '#999', formatter: ""}},
            visualMap: {orient: 'horizontal', left: 'center', min: minValue(param.data[unidadMedida]), max: maxValue(param.data[unidadMedida]), dimension: 0, inRange: {color: (param.data[tendenciaEsp].includes("Descendente"))?['#65B581','#FFCE34','#FD665F']:['#FD665F','#FFCE34','#65B581']}},
            series: [
                {type: 'bar', showBackground: true, label:{show:true, position:"right", type:"value", formatter: (data:any) =>(data.value === 0)?"":(param.data[unidadMedida].includes("Porcentaje"))?oneDecimalNumber(data.value) +" %":parseInt(data.value).toLocaleString()},
                    emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}},
                    data: Object.keys(param.data[serieHistorica]).map((arr:any) => param.data[serieHistorica][arr])
                }]
        })
    const bienestarTitles = props.tableData.map((param:any) => param.titulo)
    const bienestarObjetivo = props.tableData.map((param:any) => param.data["Nombre"])
    const bienestarActualiza = props.tableData.map((param:any) => param.data["Periodicidad o frecuencia de medición"])
    const bienestarUnidades = props.tableData.map((param:any) => param.data[unidadMedida])
    const bienestarMore = props.tableData.map((param:any) => param.more)
    const bienestarCharts = props.tableData.map((param:any) => chartTemplate(param));


    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <h4 className={classes.colorBlack}>{bienestarTitles[props.indicadorIndex]}</h4>
                <h5 className={classes.colorGrey}>{bienestarObjetivo[props.indicadorIndex]}</h5>
                <h5 className={classes.colorGrey}>{"Frecuencia de medición: "+bienestarActualiza[props.indicadorIndex]}</h5>
                <h5 className={classes.colorGrey}>{bienestarUnidades[props.indicadorIndex]}</h5>
                <h5 className={classes.colorGrey}>{bienestarMore[props.indicadorIndex]}</h5>
                <Grid container>
                    <Grid item xs={12}>
                        <Button size="small" className={classes.textCard} onMouseOver={() => setTableHover1(true)} onMouseOut={() => setTableHover1(false)}  onClick={clickChartFunc[props.indicadorIndex][0]}>
                            {tableHover1 ? "Parámetros" :<ChartIcon />}
                        </Button>
                        <Button size="small" className={classes.textCard} onMouseOver={() => setTableHover2(true)} onMouseOut={() => setTableHover2(false)}  onClick={clickChartFunc[props.indicadorIndex][1]}>
                            {tableHover2 ? "Ficha técnica" :<TableIcon />}
                        </Button>
                    </Grid>

                </Grid>
                <ReactECharts option={bienestarCharts[props.indicadorIndex]} />
            </Paper>
            <Dialog fullScreen={isMobile} open={clickTableMap[props.indicadorIndex].state} onClose={clickTableMap[props.indicadorIndex].func} aria-labelledby={'customized-dialog-title'} maxWidth={"md"} >
                <DialogTitle>
                    {"Ficha Técnica de la Meta del Objetivo "+(props.indicadorIndex+1)}
                </DialogTitle>
                <DialogContent dividers>
                    <TableMUIPNV data={props.tableData[props.indicadorIndex].data} id={"Indicador"+bienestarTitles[props.indicadorIndex]} pdfName={"ind_" + props.tableData[props.indicadorIndex].pdfName}/>
                    </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={clickTableMap[props.indicadorIndex].func} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullScreen={isMobile} open={clickChartMap[props.indicadorIndex].state} onClose={clickChartMap[props.indicadorIndex].func} aria-labelledby={'customized-dialog-title'} maxWidth={"md"} >
                <DialogTitle>
                    {"Parámetros y Fichas Técnicas de la Meta del Objetivo "+(props.indicadorIndex+1)}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} alignItems={'center'} >
                        {
                            props.tableData[props.indicadorIndex].parametros.map((param1:any,key1:number) => <Grid item xs={12} sm={12} md={6} key={key1+param1.data["Nombre"]}><Paper elevation={3} className={classes.paper}><h3>{param1.data["Nombre"]}</h3><h4 className={classes.colorGrey}>{"Frecuencia de medición: "+param1.data["Periodicidad o frecuencia de medición"]}</h4><h4>{param1.data[unidadMedida]}</h4><ReactECharts option={chartTemplate(param1)}/></Paper></Grid>)
                        }
                    </Grid>
                    <Grid container spacing={2}  >
                        {
                            props.tableData[props.indicadorIndex].parametros.map((param1:any,key1:number) =>
                                <Grid item xs={12} sm={12} md={6} key={param1.titulo+key1}>
                                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography className={classes.typo}>{param1.titulo} </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableMUIViv data={param1.data} id={'Bienestar'+key1} pdfName={"ind_" + param1.pdfName}/>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            )
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={clickChartMap[props.indicadorIndex].func} color={'primary'}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

