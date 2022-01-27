import React, {useState} from 'react';
import { PieChart } from "../Graficas/PieChart";
import {RowChart} from "../Graficas/RowChart";
import {DataContext} from '../Graficas/Context/CxDContext';
import * as dc from "dc";
import {MostrarAcciones} from "../Graficas/Acciones";


import {makeStyles,createStyles,Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import TuneIcon from '@material-ui/icons/Tune';

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
export default function AccionesCharts(props){
    const [modo,setModo] = useState(1);
    const [reiniciarS, setReiniciarS] = useState(false);
    const classes = useStyles();

    const handleCallback = (childData:any) =>{
        setModo(childData)
    }

    return(
        <div className={classes.root}>
            {//@ts-ignore
                <DataContext seccion={props.seccion} data={props.data} group={props.group} dimensionAxis={props.dimensionAxis} groupAxis={props.groupAxis}>
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
                        <Grid item xs={12} sm={4} >
                            <Paper elevation={3} className={classes.paper}>
                                <MostrarAcciones modoCallback={handleCallback} modoValue={modo} titulo={'Total de '+props.titleCifras} dashboard={props.seccion}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={3} className={classes.paper}>
                                <PieChart modoValue={modo} titulo={props.titlePie}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Paper elevation={3} className={classes.paper}>
                                <RowChart modoValue={modo} titulo={props.titleRow}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </DataContext>
            }
        </div>
    )
}