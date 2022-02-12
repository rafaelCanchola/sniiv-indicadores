import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {styled} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {colorBrewer} from "../../../utils/colorBrewer";
import ReactECharts from "echarts-for-react";

export default function Leyenda(){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.root}>

                <Grid item xs={2} sm={2} md={2}>
                    <Paper elevation={0} className={classes.text}>
                    <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Objetivos[0]}}/><br/>Objetivo 1
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Paper elevation={0} className={classes.text}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[1]}}/><br/>Objetivo 2
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Paper elevation={0} className={classes.text}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[2]}}/><br/>Objetivo 3
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Paper elevation={0} className={classes.text}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[3]}}/><br/>Objetivo 4
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Paper elevation={0} className={classes.text}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[4]}}/><br/>Objetivo 5
                    </Paper>
                </Grid>
        </Grid>
    )
}