import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {colorBrewer} from "../../../utils/colorBrewer";

export default function PcuLegend(props:any){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.root}>
            <Grid item xs={12}>
                <h5 className={classes.textCardCenter}>{props.title}</h5>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <div><FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Pcu[0]}}/><div className={classes.textCardLegend}>U1A</div></div>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Pcu[1]}}/><div className={classes.textCardLegend}>U1B</div>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Pcu[2]}}/><div className={classes.textCardLegend}>U2A</div>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Pcu[2]}}/><div className={classes.textCardLegend}>U2B</div>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'medium'} style={{color:colorBrewer.Pcu[4]}}/><div className={classes.textCardLegend}>U2</div>
            </Grid>
            <Grid item xs={12}>
                <br/><a href={'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/RHL8wWdAR3qyVU6Dje9tJA/content/PCUs_2018.pdf?&a=true'}>Descarga el modelo de PCU's</a>
            </Grid>

        </Grid>
    )
}