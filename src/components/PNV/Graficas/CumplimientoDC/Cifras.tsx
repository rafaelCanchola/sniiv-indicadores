import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "../../Templates/CumplimientoTemplate";

interface AxisNdx {
    [x: string]:any;
}
interface AccionesProps {
    modoValue: number;
    titulo: string;
    dashboard: string;
}

//@ts-ignore
const numberDisplayAcciones = (divRef, ndx, modoValue,seccion,aAxis, bAxis, cAxis, dAxis) => {

    const dimension = ndx.groupAll().reduceSum((d: AxisNdx) => d[cAxis]);
    const textFilter = dc.numberDisplay(divRef,seccion)
        .group(dimension)
        .formatNumber(d3.format(',.0f'))
        .valueAccessor(d => d);

    return textFilter

}

export default function MostrarAcciones(props:AccionesProps){
    return(
        <div>
            <h2>{props.titulo}</h2>
            <span onClick={() => {dc.filterAll(props.dashboard);}}>
                <h1 style={{textAlign:'center'}}><ChartTemplate chartFunction={numberDisplayAcciones} isButton={true} /></h1>
            </span>

        </div>
    )
}