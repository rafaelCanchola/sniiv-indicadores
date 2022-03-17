import {Component, Fragment} from "react";
import {AlfrescoURL, SniivURL, FetchSyncronized, GetYearTrimestre} from "../../FetchURL";
import ObjetivoPNV from "./ObjetivoPNV";


import loader from "../../../assets/images/loading-23.gif";
import {MobileSize} from "../../../utils/Utils";

export default class ObjetivoPNVContainer extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            fichas:null,
            sankey:null,
            bienestar:null,
            synchronized:false,
            year:0,
            trimestre:0
        }
    }
    async GetData(){
        let fetchFicha = await FetchSyncronized(
            [
                AlfrescoURL('OI1vzz_pQ3ugmSjk1P6kXw','acciones_obj_prior_a.json',true),
                SniivURL('api/IndicadoresAPI/GetObjetivoSource/'+this.state.year+'/'+this.state.trimestre,true),
                AlfrescoURL('aSAjHlHmQnONnkomHJflPw','fichas_ind_b1.json',true),
                AlfrescoURL('lWlQolPWTPqySrqZoE-NGQ','fichas_ind_b2.json',true),
                AlfrescoURL('PcgvoZZ9R_agFFn4xQhzXg','fichas_ind_b3.json',true),
                AlfrescoURL('GnL4eXmZRdy4Ahb8XW7JSw','fichas_ind_b4.json',true),
                AlfrescoURL('tL1LtdNMSyqauBJiUn3oKw','fichas_ind_b5.json',true),
                AlfrescoURL('_ff6FqPUT_Gq6sY2RyUQGw','fichas_ind_b6.json',true),
                AlfrescoURL('tXYI8-2GQFiRPyiOEIvG3A','fichas_ind_b7.json',true),
                AlfrescoURL('iqno1ftaRNKHsaIzLol3ow','fichas_ind_b8.json',true),
                AlfrescoURL('hRRBFL7qQY6fpZ2aPJi0nw','fichas_ind_b9.json',true),
                AlfrescoURL('PwKp8V5uR66w5r-G1ECvuA','fichas_ind_b10.json',true),
                AlfrescoURL('5iUuF-gLSpO9s6x3bIUkTQ','fichas_ind_b11.json',true),
                AlfrescoURL('M4Mk-pKlQzW8WYU0GsnnRA','fichas_ind_b12.json',true),
                AlfrescoURL('OPj-0oFkSZKUE9hrrIwJDQ','fichas_ind_b13.json',true),
                AlfrescoURL('2sBsnkYqRuu2OrnX2GD6yQ','fichas_ind_b14.json',true),
                AlfrescoURL('wNtPd3i0S6a0Q1wHDjKZkw','fichas_ind_b15.json',true),

            ])
        this.setState({fichas:fetchFicha[0],sankey:fetchFicha[1],bienestar:fetchFicha.slice(2),synchronized:!this.state.synchronized})
    }
    async componentDidMount() {
        let yearTrimestre = await GetYearTrimestre();
        this.setState({year:yearTrimestre[0],trimestre:yearTrimestre[1]})
        await this.GetData()
    }
    render(){
        return (
            <Fragment key={this.state.synchronized}>
                {
                    this.state.fichas !== null ?
                        <ObjetivoPNV objs={this.state.fichas} sankey={this.state.sankey} bienestar={this.state.bienestar}  key={this.state.synchronized}/>
                        :
                        <img alt={"loader"} src={loader} style={{width:'65%',left:'15%', top:'6%',position:'absolute'}}/>
                }
            </Fragment>

        )
    }
}