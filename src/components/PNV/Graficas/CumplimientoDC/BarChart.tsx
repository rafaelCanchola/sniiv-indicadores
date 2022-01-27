import React, {Fragment, useState} from "react";
import * as dc from "dc";
import { ChartTemplate } from "../../Templates/CumplimientoTemplate";
import * as d3 from "d3";
import {baseColor} from "../../../BaseColor";

interface AxisNdx {
    [x: string]:any;
}

interface ChartProps{
    titulo: string;
    modoValue: number;
    dashboard?: string;
    callBack: any;
}
export default function BarChart(props:ChartProps){

    const [trimestre, setTrimestre] = useState();

    //@ts-ignore
    const barChartFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis,dAxis, eAxis,fAxis,gAxis,hAxis) => {
        const  dimension = ndx.dimension((d: AxisNdx) => d[aAxis]);
        const group = dimension.group().reduceSum((d: AxisNdx) => d[cAxis]/d[bAxis]);

        const barChart = dc.barChart(divRef,seccion);
        barChart
            .dimension(dimension)

            .group(group)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .barPadding(0.1)
            .margins({top:10,left:30,right:0,bottom:80})
            .clipPadding(20)
            .brushOn(true)
            .renderLabel(true)
            .label(d => d3.format('.0%')(d.y))
            .title(d => '')
            .barPadding(0.1)
            .controlsUseVisibility(true)
            .colorAccessor( d => d.x == "CONAVI"? 1:2 )
            .ordinalColors(baseColor)

        barChart.yAxis().tickFormat(d3.format('~s'))
        barChart.xAxis().tickFormat(d => d+' Trimestre')
        barChart.on('filtered.filt', (chart, filter) => {
            props.callBack(filter)

        })
        return barChart
    }

    return(
        <span onClick={() => {dc.filterAll(props.dashboard);}}><ChartTemplate chartFunction={barChartFunc} title={props.titulo} modoValue={props.modoValue}/>
        </span>
    )
}
