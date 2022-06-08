import {Component} from "react";
import {connect} from "react-redux";

class Inicio extends Component<any, any>{
    render() {
        const {environment,corsEnabled} = this.props;
        return <div>SNIIV Front served at {environment} with cors {corsEnabled?'enabled':'disabled'}</div>;
    }
}

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(Inicio)