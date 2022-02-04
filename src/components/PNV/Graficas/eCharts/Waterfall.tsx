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

interface WaterfallProps{
    title:any,
    data:any,
    label:any
}

export default function Waterfall(props:WaterfallProps){
    const classes = useStyles();
    const lengthData = props.data.length;
    const waterArray = []
    for (let i = 0,j = 1;i < lengthData; i++){
        if(i === 0 || i === lengthData-1){
            waterArray[i] = 0;
        }
        else{
            waterArray[i] = 0;
            for(j = i+1;j < lengthData;j++){
                waterArray[i] += props.data[j];
            }
        }
    }
    const option = {

        tooltip: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: props.label
        },
        yAxis: {
            type: 'value'
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