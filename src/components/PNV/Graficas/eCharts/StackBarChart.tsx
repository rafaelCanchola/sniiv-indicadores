import ReactECharts from "echarts-for-react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {useStyles} from "../../../../utils/Style";


interface StackBarChartProps{
    title:any,
    data:any,
    label:any,
    xAxis:string,
    yAxis:string
}

export default function StackBarChart(props:StackBarChartProps){
    const classes = useStyles();

    const xAxis = [
            {
                type: 'category',
                name:"Años",
                nameLocation:"center",
                data: props.xAxis,
                axisLabel: {
                    show:true,
                    inside: false,
                    margin:1,
                },
            }
    ]
    const series = [
        {
            name:props.label.chartLabel[0],
            type: 'bar',
            showBackground: true,
            label:{
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {}
                }
            },
            emphasis: {
                focus:'series',
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data:props.data.val1
        },
        {
            name: props.label.chartLabel[1],
            type: 'bar',
            showBackground: true,
            label:{
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {}
                }
            },
            emphasis: {
                focus:'series',
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: props.data.val2
        },
        {
            name: props.label.chartLabel[2],
            type: 'bar',
            showBackground: true,
            label:{
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {}
                }
            },
            emphasis: {
                focus:'series',
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: props.data.val3
        }
    ]
    const barChart = {
        tooltip:{
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            //formatter:'{b} <br/><b>{c}%</b>',
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
            max: 100,
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