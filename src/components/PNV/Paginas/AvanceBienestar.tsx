import React, {Component,Fragment} from 'react';
import TotalesCumplimientoBienestar from "../ComponentesPaginas/TotalesCumplimientoBienestar";
import GridCumplimientoBienestar from "../ComponentesPaginas/GridCumplimientoBienestar";
import {ordinalNumber} from "../../../utils/Utils";
import {AlfrescoUrl, FetchSyncronized, GetLastTrimestre, GetYearTrimestre, SniivUrl} from "../../FetchMethods";
import loader from "../../../assets/images/loading-23.gif";
import {connect} from "react-redux";

class AvanceBienestar extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            year: 0,
            trimestre: 0,
            reiniciar: false,
            cumplimiento : null,
            cumplimientoOnavi : null,
            json1:null,
            json2:null,
            json3:null,
            json4:null,
            total: null,
            allYears: [],
            informe:null,
            synchronized:false,
        }
    }
    async GetData(){
        const {environment,corsEnabled} = this.props;

        let fetchCumplimiento = await FetchSyncronized(
            [
                SniivUrl('api/IndicadoresAPI/GetTotalAnio/'+this.state.year,corsEnabled,environment),
                SniivUrl('api/IndicadoresAPI/GetTotalObjetivoTrimestre/'+this.state.year+'/'+this.state.trimestre,corsEnabled,environment),
                SniivUrl('api/IndicadoresAPI/GetTotalCumplimientoOnavi/'+this.state.year+'/'+this.state.trimestre,corsEnabled,environment),
                AlfrescoUrl('jeaPHtenTQ2OcdBjdbMIYA','fichas_ind_pnv1.json',true),
                AlfrescoUrl('qjf9EQy5Qk254KBzboSmPA','fichas_ind_pnv2.json',true),
                AlfrescoUrl('WZDLryvcSt-gwoj3poieGg','fichas_ind_pnv3.json',true),
                AlfrescoUrl('vRv9fVm-RN-UhSTRXDvjvw','fichas_ind_pnv4.json',true),
                SniivUrl('api/IndicadoresAPI/GetAllYears',corsEnabled,environment),
                SniivUrl('api/IndicadoresAPI/GetInformeTrimestral/'+this.state.year+'/'+this.state.trimestre,corsEnabled,environment),


            ])
        this.setState({total:fetchCumplimiento[0],cumplimiento:fetchCumplimiento[1],cumplimientoOnavi:fetchCumplimiento[2],json1:fetchCumplimiento[3],json2:fetchCumplimiento[4],json3:fetchCumplimiento[5],json4:fetchCumplimiento[6],allYears:fetchCumplimiento[7],informe:fetchCumplimiento[8],synchronized:!this.state.synchronized})
    }
    async resetAll() {
        const {environment,corsEnabled} = this.props;
        let yearTrimestre = await GetYearTrimestre(corsEnabled,environment)
        this.setState({reiniciar: !this.state.reiniciar,year:yearTrimestre[0],trimestre:yearTrimestre[1]});
    }
    async componentDidMount() {
        const {environment,corsEnabled} = this.props;
        let yearTrimestre = await GetYearTrimestre(corsEnabled,environment)
        this.setState({year:yearTrimestre[0],trimestre:yearTrimestre[1]});
        await this.GetData();
        this.setState({synchronized:false})

    }
    render() {
        const handleCallback = async (childData: any) => {
            this.setState({trimestre: childData});
            await this.GetData()
        }
        const handleCallback3 = async (childData: any) => {
            const {environment,corsEnabled} = this.props;
            let trimestre = await GetLastTrimestre(childData,corsEnabled,environment)
            this.setState({year: childData,trimestre:trimestre});
            await this.GetData()
        }
        return (
            <Fragment key={this.state.reiniciar}>
                {this.state.total !== null ?
                <Fragment >
                    <TotalesCumplimientoBienestar data={this.state.total} callBack={handleCallback} callBack2={this.resetAll}
                                                  callBack3={handleCallback3}
                                                  fichaPie={this.state.json1}
                                                  years={this.state.allYears}
                                                  informe={this.state.informe}
                                                  periodo={'Trimestral '+this.state.year}
                                                  seccion={'totales'} title={'Cumplimiento del Programa Nacional de Vivienda'}
                                                  periodoTrimestral={ordinalNumber(this.state.trimestre) + " trimestre "+this.state.year}
                                                  titleTrimestral={"Informe Trimestral"} titleCifras={'acciones'}
                                                  titleBar={'Porcentaje acumulado de cumplimento del '+this.state.year}
                                                  titleInforme={'Informe Trimestral'} aAxis={'trimestre'}
                                                  bAxis={'total'} cAxis={'aCabo'}/>
                    <GridCumplimientoBienestar data={this.state.cumplimiento} data2={this.state.cumplimientoOnavi}
                                               fichaPie={this.state.json2} fichaPie2={this.state.json3} fichaPie3={this.state.json4} seccion={"totales"}
                                               titleRow={"Porcentaje de cumplimiento según objetivo "}
                                               periodo={ordinalNumber(this.state.trimestre) + " trimestre "+this.state.year}
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

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(AvanceBienestar)