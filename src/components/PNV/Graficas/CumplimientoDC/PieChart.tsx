import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../../Templates/CumplimientoTemplate";

interface AxisNdx {
    [x: string]:any;
}

interface ChartProps{
    titulo: string;
    modoValue: number;
    dashboard?: string;
}

//@ts-ignore
const quarterChartFunc = (divRef, ndx, modoValue,seccion, aAxis, bAxis, cAxis, dAxis, eAxis) => {
    const  dimension = ndx.dimension((d: AxisNdx) => d[aAxis]);
    const group = dimension.group().reduceSum((d: AxisNdx) => (modoValue === 0)? d.monto : d[cAxis])
    const quarterChart = dc.pieChart(divRef,seccion);
    quarterChart
        .innerRadius(50)
        .dimension(dimension)
        .group(group)
        .legend(dc.legend())
        .label(d=>'')
        .title(d => d.key + '\n' + d3.format((modoValue === 0)?'$,.0f':',.0f')(d.value))
    return quarterChart

}

export default function PieChart(props:ChartProps){
    return (
        <ChartTemplate chartFunction={quarterChartFunc} title={props.titulo} modoValue={props.modoValue}/>
    )
}
