import ReactECharts from "echarts-for-react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {colorBrewer} from "../../../../utils/colorBrewer";
import {randomNumber, waterFallSize} from "../../../../utils/Utils";

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
        },
        typo:{
            textAlign:"center",
            color: theme.palette.text.secondary,

        },
        details: {
            alignItems: 'center',
        },
        column: {
            flexBasis: '50%',
        },


    })
);

interface WaterfallProps{
    title:any,
    data:any,
    label:any,
    xAxis:string,
    yAxis:string
}

export default function Waterfall(props:WaterfallProps){
    const classes = useStyles();
    const waterArray = waterFallSize(props.data,props.data.length)
    const option = {

        tooltip: {
            formatter:'{b} <br/><b>{c}%</b>',
        },
        color:colorBrewer.T4Colors[0],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            name:props.xAxis,
            nameLocation:"center",
            type: 'category',
            splitLine: { show: false },
            show:true,
            data: props.label.chartLabel,
            axisLabel: {
                show:false,
            }
        },
        yAxis: {
            name:props.yAxis,
            nameLocation:"center",
            type: 'value',
            axisLabel:{
                show:false
            }
        },
        series: [
            {
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                data: waterArray
            },
            {
                name: 'Número de viviendas',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: false,
                    position: 'inside'

                },
                data: props.data
            }
        ]
    };
    return(
        <Grid item xs={12} sm={12} md={12} >
            <Paper elevation={3} className={classes.paper}>
                <h4>{props.title}</h4>
                <ReactECharts option={option}/>
            </Paper>
        </Grid>
    )
}