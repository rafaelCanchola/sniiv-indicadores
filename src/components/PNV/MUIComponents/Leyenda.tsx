import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useStyles} from "../../../utils/Style";
import {styled} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {colorBrewer} from "../../../utils/colorBrewer";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Leyenda(){
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.root}>
            <Grid item xs={1} sm={1} md={1}/>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'small'} style={{color:colorBrewer.Objetivos[0]}}/>Objetivo 1
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[1]}}/>Objetivo 2
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[2]}}/>Objetivo 3
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[3]}}/>Objetivo 4
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
                <FiberManualRecordIcon fontSize={'small'}style={{color:colorBrewer.Objetivos[4]}}/>Objetivo 5
            </Grid>
        </Grid>
    )
}