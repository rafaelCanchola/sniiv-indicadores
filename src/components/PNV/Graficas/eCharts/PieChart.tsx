import ReactECharts from "echarts-for-react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {colorBrewer} from "../../../../utils/colorBrewer";
import {useStyles} from "../../../../utils/Style";


interface PieProps{
    title:any,
    data:any,
    label:any,
    xAxis:string,
    yAxis:string
}

export default function PieChart(props:PieProps){
    const classes = useStyles();
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
        series: [
            {
                type: 'pie',
                label:{show:false},
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