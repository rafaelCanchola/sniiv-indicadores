import React, {Component, Fragment} from "react";
import {Grid, Paper,} from "@material-ui/core";
import CardBanner from "../PNV/MUIComponents/CardBanner";
import {MobileSize} from "../../utils/Utils";
import {useStyles} from "../../utils/Style";
import CardModulo from "./CardModulo";
import {connect} from "react-redux";
import authService from "./authService";


class Administrator extends Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            isMobile: this.props.isMobile,
        }
    }


    render() {
        let inicioImg = "https://sniiv.sedatu.gob.mx/img/carousel-1.jpeg"//"https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/ugwXQ53ZQQ6ByKICTu2vSA/content/inicio.JPG?&a=true";
        let bienestar1 = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/jqSkhFwsSC27_u5Lm0tIaw/content/cumplimiento.jpg?&a=true'
        let bienestar2 = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/0dbOa_A1Rv2zirBGGCuwDg/content/adecuada.jpg?&a=true"
        let bienestar3 = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/AWCpXzLcS7C3VKOR_gP4Hw/content/Vivienda15.jpg?&a=true"
        let bienestar4 = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/PNNVVx74RAefSEI82blY0A/content/Vivienda5.jpg?&a=true"
        let bienestar5 = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/7iHubpXhSW-a0tnkfn6PhA/content/adecuada.jpg?&a=true"
        let modulo1 = ["Módulo Geoespacial INSUS-PRAH","","Actualizar periodo y los póligonos del módulo mediante la carga de un archivo zip","Selecciona un .zip para cargar al sistema."];
        let modulo2 = ["Módulo de Datos Abiertos","","Subir un nuevo archivo de datos abiertos y actualizar el periodo","Selecciona un .zip para cargar al sistema."]
        let modulo3 = ["Módulo de Avances del PNV","","Subir un archivo CSV para actualizar el trimestre","Selecciona un .csv para cargar al sistema."]
        let modulo4 = ["Informes de Avances del PNV","","Subir un informe para el nuevo trimestre","Selecciona un .pdf para cargar al sistema."]
        let modulo5 = ["Informes de Mensuales de Vivienda","","Subir un informe mensual al SNIIV","Selecciona un .pdf para cargar al sistema."]


        return(
            <Fragment>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CardBanner subtitle={"Módulo Administrador para actualización de los distintos indicadores y dashboards del Sistema Nacional de Información e Indicadores de Vivienda."}
                                title={"SNIIV Administrador UI"}
                                image={inicioImg}
                                more1={''}
                                more2={''}
                                isMobile={this.state.isMobile}
                                isBig={false}
                                hasButton={false}/>
                </Grid>
            </Grid>
                <Paper className={this.props.classes.paperContainer3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <CardModulo title={modulo1[0]}
                                        subtitle={modulo1[1]}
                                        more1={modulo1[2]}
                                        more2={modulo1[3]}
                                        image={bienestar3}
                                        type={1}
                                        endpoint={1}/>
                        </Grid>
                        <Grid item xs={6}>
                            <CardModulo title={modulo3[0]}
                                        subtitle={modulo3[1]}
                                        more1={modulo3[2]}
                                        more2={modulo3[3]}
                                        image={bienestar2}
                                        type={2}
                                        endpoint={2}/>
                        </Grid>
                        <Grid item xs={6}>
                            <CardModulo title={modulo4[0]}
                                        subtitle={modulo4[1]}
                                        more1={modulo4[2]}
                                        more2={modulo4[3]}
                                        image={bienestar4}
                                        type={3}
                                        endpoint={3}/>
                        </Grid>

                        <Grid item xs={6}>
                            <CardModulo title={modulo5[0]}
                                        subtitle={modulo5[1]}
                                        more1={modulo5[2]}
                                        more2={modulo5[3]}
                                        image={bienestar5}
                                        type={3}
                                        endpoint={4}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Fragment>
        )
    }
}

function MyDashboard(props:any){
    if(!authService.isLoggedIn()){
        props.history.push("./login");

    }
    const styles = useStyles();
    const isMobile = MobileSize();
    const {environment,corsEnabled} = props;
    return (<Administrator classes={styles} isMobile={isMobile} environment={environment} corsEnabled={corsEnabled}/>)
}

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(MyDashboard)
