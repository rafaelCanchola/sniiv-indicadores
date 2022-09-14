import React, {Fragment, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactECharts from "echarts-for-react";

import trimestral from "../../../assets/images/trimestral.png";
import {useStyles} from "../../../utils/Style";
import {MobileSize, oneDecimalNumber, ordinalNumber} from "../../../utils/Utils";
import CardBanner from "../MUIComponents/CardBanner";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem,
    Select
} from "@material-ui/core";
import TableMUIPNV from "../Tablas/TableMUIPNV";
import TableIcon from "@material-ui/icons/Toc";


interface CumplimientoProps {
    data: any;
    fichaPie:any
    periodo: string;
    periodoTrimestral: string
    seccion: string;
    years:any,
    callBack:any,
    callBack2:any,
    callBack3:any,
    informe:any,
    title: string;
    titleTrimestral: string;
    titleCifras: string;
    titleBar: string;
    titleInforme: string;
    aAxis: string;
    bAxis: string;
    cAxis: string;
}

interface AxisChart{
    [x: string]:any;
}

export default function TotalesCumplimientoBienestar(props:CumplimientoProps){
    const classes = useStyles();
    const isMobile = MobileSize();
    const bienestar1 = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/jqSkhFwsSC27_u5Lm0tIaw/content/cumplimiento.jpg?&a=true'

    const option = {
        xAxis: {
            name:'Trimestre',
            nameLocation:'center',
            data: props.data.map((d: AxisChart) => d.trimestre),
            axisLabel: {
                inside: true,
                color: '#595959',
                formatter: (value:any) => ordinalNumber(value)+' trimestre',
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
            name:'Porcentaje',
            nameLocation:'center',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999',
                formatter: "{value} %",
                show:false,
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
                    formatter: (data:any) => oneDecimalNumber(data.value) +" %",

                },

                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: props.data.map((d: AxisChart) => d.aCabo/d.total*100)
            }
        ]
    };

    const onChartClick = (params:any) => {
        props.callBack(params.name);

    };
    const onEvents = {
        click: onChartClick,
    };
    const [open1, setOpen1] = useState(false);
    const [tableHover1, setTableHover1] = useState(false);
    const [year, setYear] = useState(props.years[0].anio);
    const handleClickOpen1 = () => {
        setOpen1(true);
    }
    const handleClose1 = () => {
        setOpen1(false);
    }

    const changeYear= (event: any) =>{
        setYear(event.target.value)
        props.callBack3(event.target.value)
    };
    return(
        <Fragment>
            <CardBanner subtitle={props.periodo}
                        title={props.title}
                        image={bienestar1}
                        more1={'La evaluación permanente de este Programa permitirá avanzar, hacia 2024, en cinco principios impulsados por cada uno de sus objetivos: la persona al centro de todas las decisiones en el sector vivienda; el uso eficiente de los recursos públicos; la coordinación entre los distintos órdenes de gobierno y la colaboración amplia con todos los sectores de la sociedad; la rendición de cuentas y el combate a la corrupción, y la generación, por primera vez, de un modelo integral de ordenamiento territorial.'}
                        more2={'El seguimiento permanente del Programa Nacional de Vivienda 2021-2024, a través de un informe trimestral de resultados, permitirá identificar los avances en los cinco objetivos prioritarios que establece, o en consecuencia, identificar las áreas de oportunidad para su logro, a través de  los resultados de los programas de apoyo a la vivienda en términos del número de acciones realizadas y el monto invertido, y por otra parte, las estrategias que contribuyen al cumplimiento de dichos objetivos, tales como convenios, lineamientos, sistemas de información, capacitación, asesorías, acuerdos, desarrollo de nuevos productos, entre otros.'}
                        isMobile={isMobile}
                        isBig={true}/>
            <Paper className={classes.paperContainer3}>
            <div className={classes.root}>
                <Grid container spacing={2} alignItems={'center'} >
                    <Grid item xs={12} md={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Periodo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={year}
                                    label="Year"
                                    onChange={changeYear}
                                >
                                    {props.years.map((yr:any) =>
                                        <MenuItem value={yr.anio} key={yr.anio}>{yr.anio}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Paper elevation={0} className={classes.paperImage3}>
                            <h2 className={classes.textColor}>{props.titleTrimestral}</h2>
                            <h4 className={classes.textColor}>{props.periodoTrimestral}</h4>
                            <a href={props.informe[0].url} target={"_blank"} rel={"noreferrer"}><img src={trimestral} className={classes.imagePNV} alt={"Reporte trimestral"} /></a>
                            </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} >
                        <Paper elevation={0} className={classes.paperImage3}>
                            <Paper elevation={3} className={classes.paper}>
                                <h2 className={classes.textColorGrey}>{props.titleBar}</h2>
                                {
                                    //<AutorenewIcon className={classes.textColorGrey} fontSize={'large'} onClick={() => {props.callBack2()}}/>
                                }
                                <Button size="large" className={classes.textCard} onMouseOver={() => setTableHover1(true)}
                                        onMouseOut={() => setTableHover1(false)} onClick={handleClickOpen1}>
                                    {tableHover1 ? "Ficha técnica" : <TableIcon fontSize={"large"}/>}
                                </Button>
                                <ReactECharts option={option} onEvents={onEvents} />
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog fullScreen={isMobile} open={open1} onClose={handleClose1} aria-labelledby={'customized-dialog-title'} maxWidth={"md"}>
                    <DialogTitle>
                        Ficha Técnica
                    </DialogTitle>
                    <DialogContent dividers>
                        <TableMUIPNV data={props.fichaPie} id={props.fichaPie.Nombre} pdfName={"ind_"+props.fichaPie.Nombre}/>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose1} color={'primary'}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            </Paper>

        </Fragment>
    )
}