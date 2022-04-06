import React, {Component,Fragment} from 'react';
import TotalesCumplimientoBienestar from "../ComponentesPaginas/TotalesCumplimientoBienestar";

import {fichaPie} from "../../../json/PNV/fichas_ind_pnv1";
import {fichaPie3} from "../../../json/PNV/fichas_ind_pnv3"
import GridCumplimientoBienestar from "../ComponentesPaginas/GridCumplimientoBienestar";
import {ordinalNumber} from "../../../utils/Utils";
import {FetchSyncronized, GetYearTrimestre, SniivURL} from "../../FetchURL";
import loader from "../../../assets/images/loading-23.gif";

export default class AvanceBienestar extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            year: 0,
            trimestre: 0,
            reiniciar: false,
            cumplimiento : null,
            cumplimientoOnavi : null,
            total: null,
            synchronized:false,
            corsLoader: true,
            environmentProd: true,
        }
    }
    async GetData(){
        let fetchCumplimiento = await FetchSyncronized(
            [
                SniivURL('api/IndicadoresAPI/GetTotalAnio/'+this.state.year,this.state.corsLoader,this.state.environmentProd),
                SniivURL('api/IndicadoresAPI/GetTotalObjetivoTrimestre/'+this.state.year+'/'+this.state.trimestre,this.state.corsLoader,this.state.environmentProd),
                SniivURL('api/IndicadoresAPI/GetTotalCumplimientoOnavi/'+this.state.year+'/'+this.state.trimestre,this.state.corsLoader,this.state.environmentProd),
            ])
        this.setState({total:fetchCumplimiento[0],cumplimiento:fetchCumplimiento[1],cumplimientoOnavi:fetchCumplimiento[2],synchronized:!this.state.synchronized})
    }
    async resetAll() {
        let yearTrimestre = await GetYearTrimestre(this.state.corsLoader,this.state.environmentProd)
        this.setState({reiniciar: !this.state.reiniciar,year:yearTrimestre[0],trimestre:yearTrimestre[1]});
    }
    async componentDidMount() {
        let yearTrimestre = await GetYearTrimestre(this.state.corsLoader,this.state.environmentProd)
        this.setState({year:yearTrimestre[0],trimestre:yearTrimestre[1]});
        await this.GetData();
        this.setState({synchronized:false})

    }
    render() {
        const handleCallback = async (childData: any) => {
            this.setState({trimestre: childData});
            await this.GetData()
        }
        return (
            <Fragment key={this.state.reiniciar}>
                {this.state.total !== null ?
                <Fragment >
                    <TotalesCumplimientoBienestar data={this.state.total} callBack={handleCallback} callBack2={this.resetAll}
                                                  periodo={'Trimestral 2021'}
                                                  seccion={'totales'} title={'Cumplimiento del Programa Nacional de Vivienda'}
                                                  titleTrimestral={"Informe Trimestral"} titleCifras={'acciones'}
                                                  titleBar={'Porcentaje acumulado de cumplimento del 2021'}
                                                  titleInforme={'Informe Trimestral'} aAxis={'trimestre'}
                                                  bAxis={'total'} cAxis={'aCabo'}/>
                    <GridCumplimientoBienestar data={this.state.cumplimiento} data2={this.state.cumplimientoOnavi}
                                               fichaPie={fichaPie} fichaPie3={fichaPie3} seccion={"totales"}
                                               titleRow={"Porcentaje de cumplimiento según objetivo "}
                                               periodo={ordinalNumber(this.state.trimestre) + " trimestre 2021"}
                                               titleBar={"Porcentaje de contribución según ONAVIS"}
                                               titleCifras={"acciones"}
                                               titlePie={"Estatus de las acciones según objetivo prioritario"}
                                               aAxis={"total"} bAxis={"concluida"}
                                               cAxis={"enProceso"} dAxis={"porIniciar"} eAxis={"sinRealizar"}
                                               fAxis={"trimestre"} gAxis={"organismo"} hAxis={"tipoObjetivo"}/>
                </Fragment>
                    :
                    <img alt={"loader"} src={loader} style={{width:'65%',left:'15%', top:'6%',position:'absolute'}}/>
                }
            </Fragment>

        )
    }
}