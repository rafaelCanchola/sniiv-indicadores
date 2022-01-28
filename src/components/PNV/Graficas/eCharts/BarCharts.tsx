import React, {Fragment, useState} from 'react';
import ReactECharts from "echarts-for-react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


interface BarProps {
    data: any;
    title:any;
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,

        },
        image:{
            width:"80%",
            height: "auto"
        }
    })
);
export default function BarCharts(props:BarProps){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container spacing={2} alignItems={'center'} >
                {props.data.map((data:any,key:number) =>
                    <Fragment>
                        {(key===3)? <Grid item xs={12} sm={12} md={2} key={key+100} ></Grid>: <></>}
                        <Grid item xs={12} sm={12} md={4} key={key+100} >
                            <Paper elevation={3} className={classes.paper}>
                                <h3>{props.title[key]}</h3>
                                <ReactECharts option={data} />
                            </Paper>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
        </div>

        )
}

