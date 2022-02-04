import ReactECharts from "echarts-for-react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

interface DualBarProps{
    title:any,
    data:any,
    label:any
}

export default function DualBarChart(props:DualBarProps){
    const classes = useStyles();
    const barChart = {
        tooltip:{
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
            xAxis: {
                data: props.label,
                axisLabel: {
                    show:false,
                    inside: false,
                    color: '#999'
                },
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {

                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show:false,
                    color: '#999',
                    formatter: "{value} "
                }
            },
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    label:{

                        show:false,
                        position:"top",
                        type:"value",
                        formatter: (data:any) => parseInt(data.value) +" %",

                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: props.data
                }
            ]
        }
    return(
            <Grid item xs={12} sm={12} md={6} >
                <Paper elevation={3} className={classes.paper}>
                    <h4>{props.title}</h4>
                    <ReactECharts option={barChart} />
                </Paper>
            </Grid>
    )
}