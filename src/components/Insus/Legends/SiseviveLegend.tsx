import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {colorBrewer} from "../../../utils/colorBrewer";

export default function SiseviveLegend(props:any){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.rootmargin}>
            <Grid item xs={12}>
                <h5 className={classes.textCardCenter}>{props.title}</h5>
            </Grid>
            <Grid item xs={6}>
                <div><FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Sisevive[0]}}/><div className={classes.textCardLegend}>Hasta 99 viviendas</div></div>
            </Grid>
            <Grid item xs={6}>
                <FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Sisevive[1]}}/><div className={classes.textCardLegend}>100 o más viviendas</div>
            </Grid>
        </Grid>
    )
}