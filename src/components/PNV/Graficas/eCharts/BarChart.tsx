import ReactECharts from "echarts-for-react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {useStyles} from "../../../../utils/Style";


interface BarChartProps{
    title:any,
    data:any,
    label:any,
    xAxis:string,
    yAxis:string
}

export default function BarChart(props:BarChartProps){
    const classes = useStyles();
    const xAxis = [{
                    name:props.xAxis,
                    nameLocation:"center",
                    data: props.label.chartLabel,
                    axisLabel: {
                        show:true,
                        inside: false,
                        margin:1,
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
    }]
    const series = [
                {
                    type: 'bar',
                    showBackground: true,
                    label:{
                        show:false,
                        position:"top",
                        type:"value",

                    },
                    emphasis: {
                        focus:'series',
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: props.data
                },
        ]
    const barChart = {
        tooltip:{
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter:'{b} <br/><b>{c}%</b>',
        },
        xAxis,
        yAxis: {
            name:props.yAxis,
            nameLocation:"center",
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999',
                show:false,
            },
            max: props.data[0].value <= 40 ? props.data[0].value+15 :100 ,
        },
        series

    }
    return(
        <Grid item xs={12} sm={12} md={12} >
            <Paper elevation={3} className={classes.paper}>
                <h4>{props.title}</h4>
                <ReactECharts option={barChart}/>
            </Paper>
        </Grid>
    )
}