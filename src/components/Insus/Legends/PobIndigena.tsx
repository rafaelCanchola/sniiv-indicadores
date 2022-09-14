import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {colorBrewer} from "../../../utils/colorBrewer";

export default function PobIndigena(props:any){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.rootmargin}>
            <Grid item xs={12}>
                <h5 className={classes.textCardCenter}>{props.title}</h5>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <div><FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[0]}}/><div className={classes.textCardLegend}>10% o menos</div></div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[1]}}/><div className={classes.textCardLegend}>10.1% - 30%</div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[2]}}/><div className={classes.textCardLegend}>30.1% - 30%</div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[3]}}/><div className={classes.textCardLegend}>30.1% - 40%</div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[4]}}/><div className={classes.textCardLegend}>40.1% - 50%</div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[5]}}/><p className={classes.textCardLegend}>50.1% - 60%</p>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[6]}}/><p className={classes.textCardLegend}>60.1% - 70%</p>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[7]}}/><p className={classes.textCardLegend}>70.1% - 80%</p>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[8]}}/><p className={classes.textCardLegend}>80.1% - 90%</p>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Indigena[9]}}/><p className={classes.textCardLegend}>Más de 90%</p>
            </Grid>

        </Grid>
    )
}