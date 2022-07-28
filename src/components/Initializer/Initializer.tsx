import {Component} from "react";
import {setEnvironment} from "../../redux/actions/environmentActions";
import {Environments} from "../../redux/reducers/environment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setCorsLoader} from "../../redux/actions/corsActions";

class Initializer extends Component<any, any>{

    render() {
        const {environment,corsEnabled} = this.props;

        this.props.setEnvironment(Environments.DEV)
        this.props.setCorsLoader(false)
        return <div></div>;
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return bindActionCreators({ setEnvironment,setCorsLoader }, dispatch)
}
const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Initializer)