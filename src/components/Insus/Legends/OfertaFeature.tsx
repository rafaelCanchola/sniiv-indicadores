import Grid from "@material-ui/core/Grid";
import React,{Fragment} from "react";
import {useStyles} from "../../../utils/Style";
import EcoIcon from '@material-ui/icons/Eco';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

export default function OfertaFeature(props:any){
    const classes = useStyles();
    const sisevive = (
        <Fragment>
            <Grid item xs={12}>
                <h5 className={classes.textCardLegend}><EcoIcon fontSize={"small"}/>{"   "+props.feature.nombre_ofe}</h5>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Programa<br/></div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}><div dangerouslySetInnerHTML={{ __html: props.feature.programa }}/></div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Tipología</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}><div dangerouslySetInnerHTML={{ __html: props.feature.tipologia }}/></div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>IDG</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}><div dangerouslySetInnerHTML={{ __html: props.feature.idg }}/></div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>CO2</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}><div dangerouslySetInnerHTML={{ __html: props.feature.co2 }}/></div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Viviendas</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}><div dangerouslySetInnerHTML={{ __html: props.feature.viviendas }}/></div>
            </Grid>
        </Fragment>

    )
    const oferta =(
        <Fragment>
            <Grid item xs={12}>
                <h5 className={classes.textCardLegend}><HomeWorkIcon fontSize={"small"}/>{"   "+props.feature.nombre_ofe}</h5>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Precio Min</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendSmall}>{(props.feature.precio_min===undefined) ? "" :("$"+props.feature.precio_min.toLocaleString())}</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Precio Promedio</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>{(props.feature.precio===undefined) ? "" :("$"+props.feature.precio.toLocaleString())}</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Precio Max</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>{(props.feature.precio_max===undefined) ? "" :("$"+props.feature.precio_max.toLocaleString())}</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>Viviendas</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.textCardLegendBold}>{props.feature.viviendas}</div>
            </Grid>
        </Fragment>
    )
    return (
        <Grid container className={classes.rootmargin0}>
            {props.feature.programa !== undefined ? sisevive:oferta}
        </Grid>
    )
}