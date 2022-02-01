import React, {Component} from 'react';
import {Tab, Tabs} from "@material-ui/core";

import {cumplimientoPNV1} from "../json/PNV/cumplimiento21-1";
import {cumplimientoPNV2} from "../json/PNV/cumplimiento21-2";
import {cumplimientoPNV3} from "../json/PNV/cumplimiento21-3";
import {cumplimientoONAVIPNV1} from "../json/PNV/cumplimientoONAVI21-1";
import {cumplimientoONAVIPNV2} from "../json/PNV/cumplimientoONAVI21-2";
import {cumplimientoONAVIPNV3} from "../json/PNV/cumplimientoONAVI21-3";
import {totales} from "../json/PNV/totalCumplimiento";
import {fichaPie} from "../json/PNV/fichas_ind_pnv1";
import {fichaPie3} from "../json/PNV/fichas_ind_pnv3";


import PorcentajeCumplimiento from "./PNV/PorcentajeCumplimiento";
import TotalesCumplimiento from "./PNV/TotalesCumplimiento";
import { Fragment } from 'react';
import ObjetivoPNV from "./PNV/ObjetivoPNV";
import ViviendaAdecuada from "./PNV/ViviendaAdecuada";
import IndicadoresBienestar from "./PNV/IndicadoresBienestar";
/*import Fetch from "./Fetch";

const handleApi = async(route:any) => {
    return await Fetch(route);
}
*/

export default class Avance extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            trimestre: 3,

        }
    }


    componentDidMount() {
        /*handleApi(subsidiosRoute).then(data => this.setState({subsidios:data,controlSub:true}))
        handleApi(financiamientosRoute).then(data => this.setState({financiamientos:data,controlFin:true}))
        handleApi(pcuRoute).then(data => this.setState({pcu:data,controlPcu:true}))
        handleApi(inventarioRoute).then(data => this.setState({inventario:data,controlInv:true}))*/


    }

    render() {
        const handleCallback = (childData: any) => {
            this.setState({trimestre: childData});
        }

        return (
               <Fragment>
                        <TotalesCumplimiento data={totales} callBack={handleCallback} periodo={'Trimestral 2021'}
                                             seccion={'totales'} title={'Cumplimiento/Avances'}
                                             titleTrimestral={"Informe Trimestral"} titleCifras={'acciones'}
                                             titleBar={'Porcentaje acumulado de cumplimento'}
                                             titleInforme={'Informe Trimestral'} aAxis={'trimestre'}
                                             bAxis={'total'} cAxis={'aCabo'}/>
                        {this.state.trimestre === undefined ? <></> :
                            parseInt(this.state.trimestre) === 3 ?

                                    <PorcentajeCumplimiento data={cumplimientoPNV3} data2={cumplimientoONAVIPNV3}
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


                                : parseInt(this.state.trimestre) === 2 ?

                                    <PorcentajeCumplimiento data={cumplimientoPNV2} data2={cumplimientoONAVIPNV2}
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

                                : parseInt(this.state.trimestre) === 1 ?
                                    <PorcentajeCumplimiento data={cumplimientoPNV1} data2={cumplimientoONAVIPNV1}
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


                                    : <></>
                        }
                        <IndicadoresBienestar />
                    </Fragment>
        )
    }
}