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
                    <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Objetivos[0]}}/><p className={classes.textCard}>Objetivo 1</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[1]}}/><p className={classes.textCard}>Objetivo 2</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[2]}}/><p className={classes.textCard}>Objetivo 3</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[3]}}/><p className={classes.textCard}>Objetivo 4</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[4]}}/><p className={classes.textCard}>Objetivo 5</p>
                </Grid>
        </Grid>
    )
}