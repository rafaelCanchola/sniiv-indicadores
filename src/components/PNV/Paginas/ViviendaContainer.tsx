import {Component, Fragment} from "react";
import {FetchURL, AlfrescoURL, SniivURL, FetchSyncronized, GetYearTrimestre} from "../../FetchURL";
import ViviendaAdecuada from "./ViviendaAdecuada";

//https://sistemas.sedatu.gob.mx/repositorio/s/tL1LtdNMSyqauBJiUn3oKw
export default class ViviendaContainer extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            fichas:null,
            synchronized:false,
        }
    }
    async GetData(){
        let fetchFicha = await FetchSyncronized(
            [
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
        this.setState({fichas:fetchFicha,synchronized:!this.state.synchronized})
    }
    async componentDidMount() {
        await this.GetData()
    }

    render(){
        return (
            <Fragment></Fragment>
            //<ViviendaAdecuada />
        )
    }
}