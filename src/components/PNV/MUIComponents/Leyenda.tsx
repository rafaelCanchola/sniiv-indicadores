import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {colorBrewer} from "../../../utils/colorBrewer";

export default function Leyenda(){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.root}>
            <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Objetivos[0]}}/><p className={classes.textCardCenter}>Objetivo 1</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[1]}}/><p className={classes.textCardCenter}>Objetivo 2</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[2]}}/><p className={classes.textCardCenter}>Objetivo 3</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[3]}}/><p className={classes.textCardCenter}>Objetivo 4</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[4]}}/><p className={classes.textCardCenter}>Objetivo 5</p>
                </Grid>
        </Grid>
    )
}