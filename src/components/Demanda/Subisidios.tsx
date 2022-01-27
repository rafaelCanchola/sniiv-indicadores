import React, {useState} from 'react';
import * as dc from "dc";
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';

import {ChoropletChart} from "../Graficas/Demanda/ChoropletChart";
import {BarChart} from "../Graficas/Demanda/BarChart";
import {PieChart} from "../Graficas/Demanda/PieChart";
import {PieChart2} from "../Graficas/Demanda/PieChart2";
import {RowChart} from "../Graficas/Demanda/RowChart";
import {RowChart2} from "../Graficas/Demanda/RowChart2";
import {MostrarAcciones} from "../Graficas/Demanda/Acciones";
import {DataContext} from '../Graficas/Context/DemandaContext';


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default
        },
    })
);

// @ts-ignore
export default function Subisidios(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const classes = useStyles();
    const handleCallback = (childData:any) =>{
        setModo(childData)
    }
    return(
        <div className={classes.root}>
            {//@ts-ignore
                <DataContext seccion={props.seccion} data={props.data} aAxis={props.aAxis} bAxis={props.bAxis} cAxis={props.cAxis} dAxis={props.dAxis} eAxis={props.eAxis} fAxis={props.fAxis} gAxis={props.gAxis} hAxis={props.hAxis}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} className={classes.paper}>
                                <h1>{props.title}</h1>
                                <h5>{props.periodo}</h5>
                                <AutorenewIcon fontSize={'large'} onClick={() => {
                                    setReiniciarS(!reiniciarS);
                                    dc.filterAll(props.seccion)
                                }}/>
                                <TuneIcon fontSize={'large'}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={12} sm={12}  md={7}>
                            <Paper elevation={3} className={classes.paper}>
                                {<ChoropletChart modoValue={modo} titulo={'Estados'} />}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} >
                            <Paper elevation={3} className={classes.paper}>
                                <MostrarAcciones modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                            </Paper>
                            <Paper elevation={3} className={classes.paper}>
                                {<RowChart modoValue={modo} titulo={props.titleRow1}/>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                {<PieChart modoValue={modo} titulo={props.titlePie}/>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                {<PieChart2 modoValue={modo} titulo={props.titlePie2}/>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Paper elevation={3} className={classes.paper}>
                                {<RowChart2 modoValue={modo} titulo={props.titleRow2}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </DataContext>
            }
        </div>
    )
}