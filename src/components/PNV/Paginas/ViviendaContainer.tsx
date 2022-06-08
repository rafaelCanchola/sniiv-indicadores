import {Component, Fragment} from "react";
import {AlfrescoUrl, FetchSyncronized} from "../../FetchMethods";
import ViviendaAdecuada from "./ViviendaAdecuada";
import loader from "../../../assets/images/loading-23.gif";
import {connect} from "react-redux";

class ViviendaContainer extends Component<any, any>{
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
                AlfrescoUrl('Y3qvgRj4QreLeBM26FjJNw','fichas_ind_v1_1.json',true),
                AlfrescoUrl('Lgu0xzzCSP2v4rBJi1jjKw','fichas_ind_v1_2.json',true),
                AlfrescoUrl('h01x4nlBT26cBf7UpK0TsA','fichas_ind_v2_1.json',true),
                AlfrescoUrl('_Nm8PvC2SPS3vYHvSD0jCQ','fichas_ind_v2_2.json',true),
                AlfrescoUrl('Bz2MByODScqChb7vjOGsJw','fichas_ind_v2_3.json',true),
                AlfrescoUrl('zo2guiE5RrWWgg9FXD2Sig','fichas_ind_v2_4.json',true),
                AlfrescoUrl('_FgQnc2lSBOlz_-1IclgRg','fichas_ind_v2_5.json',true),
                AlfrescoUrl('j8aYB64NQJyQvGc0TAhovw','fichas_ind_v2_6.json',true),
                AlfrescoUrl('lG_gxASuSjan6JlEw7VR4A','fichas_ind_v2_7.json',true),
                AlfrescoUrl('BcUCIIlRSSCK8s7kks9vog','fichas_ind_v3_1.json',true),
                AlfrescoUrl('kvAHswSeRB2hX81tpe42OQ','fichas_ind_v3_2.json',true),
                AlfrescoUrl('JwL-D2x2RwqEnyN8KRoYyg','fichas_ind_v3_3.json',true),
                AlfrescoUrl('qgj3dbEVScmv-6cZvZ9wZQ','fichas_ind_v3_4.json',true),
                AlfrescoUrl('NpNS0pjUQhWlSzmT6TFbOQ','fichas_ind_v3_5.json',true),
                AlfrescoUrl('5jcJ1NLlTHSmxk411AVLCA','fichas_ind_v3_6.json',true),
                AlfrescoUrl('yf8q1jXyRHuoQQeoXzgdWQ','fichas_ind_v3_7.json',true),
                AlfrescoUrl('-SyfkpKtRxK3O3WxyeTF1w','fichas_ind_v4_1.json',true),
                AlfrescoUrl('wdvuXsRYQtC7JBUTxyVhDg','fichas_ind_v4_2.json',true),
                AlfrescoUrl('oCPCQT4mRnuQA_kS13yQ_Q','fichas_ind_v5_1.json',true),
                AlfrescoUrl('2F8WbvFgS1-qEZk_EAU-mQ','fichas_ind_v5_2.json',true),
                AlfrescoUrl('pHEwwnqlTyiRjG96H1UK_Q','fichas_ind_v6_1.json',true),
                AlfrescoUrl('QGCL7E5uRASkNEpaIdrlwA','fichas_ind_v6_2.json',true),
                AlfrescoUrl('G2GhgR_-Skemg-PIh2mqVg','fichas_ind_v7_1.json',true),
            ])
        this.setState({fichas:fetchFicha,synchronized:!this.state.synchronized})
    }
    async componentDidMount() {
        await this.GetData()
    }

    render(){
        return (
            <Fragment key={this.state.synchronized}>
                {
                    this.state.fichas !== null ?
                        <ViviendaAdecuada objs={this.state.fichas}/>
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
    }
}

export default connect (mapStateToProps)(ViviendaContainer)