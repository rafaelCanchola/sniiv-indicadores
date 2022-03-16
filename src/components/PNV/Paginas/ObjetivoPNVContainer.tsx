import {Component, Fragment} from "react";
import {AlfrescoURL, SniivURL, FetchSyncronized, GetYearTrimestre} from "../../FetchURL";
import ObjetivoPNV from "./ObjetivoPNV";


export default class ObjetivoPNVContainer extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            fichas:null,
            sankey:null,
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

            ])
        this.setState({fichas:fetchFicha[0],sankey:fetchFicha[1],synchronized:!this.state.synchronized})
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
                    this.state.fichas !== null && <ObjetivoPNV objs={this.state.fichas} sankey={this.state.sankey}  key={this.state.synchronized}/>

                }
            </Fragment>

        )
    }
}