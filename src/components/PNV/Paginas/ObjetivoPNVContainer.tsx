import {Component, Fragment} from "react";
import {connect} from "react-redux";
import {AlfrescoUrl, SniivUrl, FetchSyncronized, GetYearTrimestre} from "../../FetchMethods";
import ObjetivoPNV from "./ObjetivoPNV";

import loader from "../../../assets/images/loading-23.gif";

class ObjetivoPNVContainer extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            fichas:null,
            sankey:null,
            bienestar:null,
            synchronized:false,
            year:0,
            trimestre:0,
        }
    }

    async GetData(){
        const {environment,corsEnabled} = this.props;

        let fetchFicha = await FetchSyncronized(
            [
                AlfrescoUrl('OI1vzz_pQ3ugmSjk1P6kXw','acciones_obj_prior_a.json',true),
                SniivUrl('api/IndicadoresAPI/GetObjetivoSource/'+this.state.year+'/'+this.state.trimestre,corsEnabled,environment),
                AlfrescoUrl('aSAjHlHmQnONnkomHJflPw','fichas_ind_b1.json',true),
                AlfrescoUrl('lWlQolPWTPqySrqZoE-NGQ','fichas_ind_b2.json',true),
                AlfrescoUrl('PcgvoZZ9R_agFFn4xQhzXg','fichas_ind_b3.json',true),
                AlfrescoUrl('GnL4eXmZRdy4Ahb8XW7JSw','fichas_ind_b4.json',true),
                AlfrescoUrl('tL1LtdNMSyqauBJiUn3oKw','fichas_ind_b5.json',true),
                AlfrescoUrl('_ff6FqPUT_Gq6sY2RyUQGw','fichas_ind_b6.json',true),
                AlfrescoUrl('tXYI8-2GQFiRPyiOEIvG3A','fichas_ind_b7.json',true),
                AlfrescoUrl('iqno1ftaRNKHsaIzLol3ow','fichas_ind_b8.json',true),
                AlfrescoUrl('hRRBFL7qQY6fpZ2aPJi0nw','fichas_ind_b9.json',true),
                AlfrescoUrl('PwKp8V5uR66w5r-G1ECvuA','fichas_ind_b10.json',true),
                AlfrescoUrl('5iUuF-gLSpO9s6x3bIUkTQ','fichas_ind_b11.json',true),
                AlfrescoUrl('M4Mk-pKlQzW8WYU0GsnnRA','fichas_ind_b12.json',true),
                AlfrescoUrl('OPj-0oFkSZKUE9hrrIwJDQ','fichas_ind_b13.json',true),
                AlfrescoUrl('2sBsnkYqRuu2OrnX2GD6yQ','fichas_ind_b14.json',true),
                AlfrescoUrl('wNtPd3i0S6a0Q1wHDjKZkw','fichas_ind_b15.json',true),

            ])
        this.setState({fichas:fetchFicha[0],sankey:fetchFicha[1],bienestar:fetchFicha.slice(2),synchronized:!this.state.synchronized})
    }
    async componentDidMount() {
        const {environment,corsEnabled} = this.props;

        let yearTrimestre = await GetYearTrimestre(corsEnabled,environment);
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

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(ObjetivoPNVContainer)