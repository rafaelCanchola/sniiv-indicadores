import React, {Component} from 'react';

import {cumplimientoPNV1} from "../json/PNV/cumplimiento21-1";
import {cumplimientoONAVIPNV1} from "../json/PNV/cumplimientoONAVI21-1";
import {totales} from "../json/PNV/totalCumplimiento";
import {fichaPie} from "../json/PNV/fichas_ind_pnv1";
import {fichaPie3} from "../json/PNV/fichas_ind_pnv3";


import { Fragment } from 'react';
import ViviendaAdecuada from "./PNV/ViviendaAdecuada";
/*import Fetch from "./Fetch";

const handleApi = async(route:any) => {
    return await Fetch(route);
}
*/

export default class Vivienda extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {
        /*handleApi(subsidiosRoute).then(data => this.setState({subsidios:data,controlSub:true}))
        handleApi(financiamientosRoute).then(data => this.setState({financiamientos:data,controlFin:true}))
        handleApi(pcuRoute).then(data => this.setState({pcu:data,controlPcu:true}))
        handleApi(inventarioRoute).then(data => this.setState({inventario:data,controlInv:true}))*/


    }

    render() {
        return (
               <Fragment>
                   <ViviendaAdecuada data={cumplimientoPNV1} data2={cumplimientoONAVIPNV1}
                                     fichaPie={fichaPie} fichaPie3={fichaPie3} seccion={"totales"}
                                     titleRow={"Porcentaje de cumplimiento según objetivo "}
                                     periodo={this.state.trimestre + " Trimestre"}
                                     titleBar={"Porcentaje de contribución según ONAVI"}
                                     titleCifras={"acciones"}
                                     titlePie={"Estatus de las acciones según objetivo prioritario"}
                                     titlePie2={""} titleRow1={""}
                                     titleRow2={""} titleInforme={""} aAxis={"total"} bAxis={"concluida"}
                                     cAxis={"enProceso"} dAxis={"porIniciar"} eAxis={"sinRealizar"}
                                     fAxis={"trimestre"} gAxis={"organismo"} hAxis={"tipoObjetivo"}/>
                    </Fragment>
        )
    }
}