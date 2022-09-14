import React, {Component} from "react";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
var inicioImg = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/ugwXQ53ZQQ6ByKICTu2vSA/content/inicio.JPG?&a=true";
var sniivImg = "https://sniiv.sedatu.gob.mx/img/sniiv_ic.png";

const useStyles = makeStyles((theme) => ({
    imageSedatu:{
        width:'80%',
    },
    root: {
        height: "100vh",
        backgroundImage: `url(${inicioImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:'Montserrat',
    },
    size: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "transparent"
    },

    paper: {
        margin: theme.spacing(2, 6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily:'Montserrat',
    },
    avatar: {
        margin: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#b99560'
    },
    font:{
        fontFamily:'Montserrat',
        color:'#b4b4b4'
    }
}));

class Inicio extends Component<any, any>{
    render() {

        const {environment,corsEnabled,styles} = this.props;
        return (

        <Grid container component="main" className={styles.root}>
            <CssBaseline />
            <Grid component={Paper} className={styles.size} item xs={12} sm={8} md={5} square>
                <img src={sniivImg} alt={"sniiv"} className={styles.imageSedatu}/>
                <br/>
                <h3 className={styles.font}>SNIIV Front served at {environment} with cors {corsEnabled?'enabled':'disabled'}</h3>
            </Grid>
        </Grid>
        );
    }
}

function InicioFunc(props:any){
    const styles = useStyles();
    return(<Inicio styles={styles} environment={props.environment} corsEnabled={props.corsEnabled}/>)

}
const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(InicioFunc)