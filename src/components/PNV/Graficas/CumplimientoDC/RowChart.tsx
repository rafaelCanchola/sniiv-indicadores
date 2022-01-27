import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../../Templates/CumplimientoTemplate";
import {baseColor} from "../../../BaseColor";

interface AxisNdx {
    [x: string]:any;
}

interface ChartProps{
    titulo: string;
    modoValue: number;
    dashboard?: string;
}
//@ts-ignore
const barFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis, dAxis, eAxis,fAxis,gAxis,hAxis) => {

    const dimension = ndx.dimension( (d: AxisNdx) => d[hAxis]);
    const total = dimension.group().reduceSum((d: AxisNdx) => (d[bAxis])).top(Infinity);
    const groupChart = dimension.group().reduceSum((d: AxisNdx) => d[cAxis]+d[dAxis]);
    const totalKey = (array: any[], key: any) => array.find(element => element.key == key).value;
    const verticalBarChart = dc.rowChart(divRef,seccion)


    verticalBarChart
        .dimension(dimension)
        .group(groupChart)
        .elasticX(true)
        .margins({top:5,left:5,right:10,bottom:20})
        .label(d => "Objetivo " +d.key + ": " + Math.round(d.value / totalKey(total, d.key)*100)+" %")
        //@ts-ignore
        .colors(d3.scaleOrdinal().range(['#dd7671','#f5ce85','#a485c2','#e3a277','#95ce9c']))
        .ordering(function (d) {
            return -d.value

        });

    verticalBarChart.xAxis().tickFormat(d3.format('.0%'))

    return verticalBarChart
}

export default function RowChart(props:ChartProps) {
    return(
        <ChartTemplate chartFunction={barFunc} title={props.titulo} modoValue={props.modoValue}/>
    )
}

