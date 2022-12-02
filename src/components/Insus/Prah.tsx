import PublicMap from "./PublicMap";
import TableInformacion from "./TableInformacion";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {Component, Fragment} from "react";
import {
    Button,
    ButtonGroup,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Popover,
    Popper,
    Select
} from "@material-ui/core";
import {FetchSyncronized, MapServiceInsusGetAllPeriodos, MapServiceInsusGetPeriodo, SniivUrl} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";
import {connect} from "react-redux";
import CardBanner from "../PNV/MUIComponents/CardBanner";
import RefreshIcon from "@material-ui/icons/Info";
import PobIndigena from "./Legends/PobIndigena";
import PcuLegend from "./Legends/PcuLegend";
import OfertaLegend from "./Legends/OfertaLegend";
import SiseviveLegend from "./Legends/SiseviveLegend";
import OfertaFeature from "./Legends/OfertaFeature";
import loader from "../../assets/images/loading-23.gif";
import MyRangePrah from "./RangePrah";
import {MobileSize} from "../../utils/Utils";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(1),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default
        },
        paper2:{
            padding: theme.spacing(1),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: "transparent"
        },
        input: {
            display: 'none',
        },
        text:{
            fontSize: 12,
            fontFamily:'Montserrat',
        },

        tableinsus:{
        },
        table:{
        },
        tableRange:{
            position: "absolute",
            bottom: "28%",
            left: "80%",
            width: "15%",
        },
        tableOferta:{
            position: "absolute",
            bottom: "-33%",
            left: "23%",
            width: "17%"
        },
        tableSisevive:{
            position: "absolute",
            bottom: "-33%",
            left: "5%",
            width: "17%"
        },
        button:{
            fontSize:10
        }
        ,submit: {
            backgroundColor: '#325b4f',
            color:'#fff'
        },

    })
);

class PrahDashboard extends Component<any, any>{
    constructor(props: any){
        super(props);
        this.handleCallback = this.handleCallback.bind(this)
        this.handleLevelCallback = this.handleLevelCallback.bind(this)
        this.handleFeatureCallback = this.handleFeatureCallback.bind(this)
        this.handleSiseviveFeatureCallback = this.handleSiseviveFeatureCallback.bind(this)
        this.handleValueCallback = this.handleValueCallback.bind(this)
        this.returnShape = this.returnShape.bind(this)
        this.changeYear = this.changeYear.bind(this)
        this.changeSelector = this.changeSelector.bind(this)
        this.returnCultivo = this.returnCultivo.bind(this)
        this.buttonInsus = this.buttonInsus.bind(this)
        this.buttonIndigena = this.buttonIndigena.bind(this)
        this.buttonPcu = this.buttonPcu.bind(this)
        this.buttonOferta = this.buttonOferta.bind(this)
        this.buttonSisevive = this.buttonSisevive.bind(this)
        this.indigenaMouse = this.indigenaMouse.bind(this)
        this.pcuMouse = this.pcuMouse.bind(this)
        this.ofertaMouse = this.ofertaMouse.bind(this)
        this.siseviveMouse = this.siseviveMouse.bind(this)
        this.handleCallbackLoading = this.handleCallbackLoading.bind(this)
        this.state = {
            classes : this.props.classes,
            promise: [],
            insus:false,
            indigena:false,
            pcu:false,
            oferta:false,
            sisevive:false,
            indigenaOver:false,
            pcuOver:false,
            ofertaOver:false,
            siseviveOver:false,
            anchorEl:null,
            capas:[0,0,0,0,0],//[poblacionindigena,insus,pcu,ofertaviv,sisevive]
            reiniciar:false,
            year : 0,
            isMontos: true,
            isLoading:false,
            allYears: [],
            featureMapa:null,
            featureSiseviveMapa:null,
            valueTable:1,
            cultivo: {id:0,cve_geo:"",type:0,level:1,center:[],extent:[]},
            changePoli : {id:0,cve_geo:"MEX",level:3,center:[-11397253.55045682,2806837.5334897055],extent:[-14288915.653663361,1650678.179152118,-8405591.44725028,3962996.887827293]},
            levelPoli:{id:0,cve_geo:"MEX",level:3,center:[-11397253.55045682,2806837.5334897055],extent:[-14288915.653663361,1650678.179152118,-8405591.44725028,3962996.887827293]},
            isMobile: this.props.isMobile,
        }
    }
    handleCallback(childData:any){
        this.setState({cultivo:childData})
    }

    handleValueCallback(childData:any){
        this.setState({valueTable:childData})
    }

    handleLevelCallback(childData:any){
        let cachedData = childData;
        this.setState({changePoli:childData})
        this.setState({levelPoli:cachedData})
    }

    handleFeatureCallback(childData:any){
        this.setState({featureMapa:childData})
    }

    handleSiseviveFeatureCallback(childData:any){
        this.setState({featureSiseviveMapa:childData})
    }
    handleCallbackLoading(childData:any){
        this.setState({isLoading:true})
        setTimeout(() => {
            this.setState({isLoading:false})
        }, 3500);
    }
    returnShape(){
        this.setState({changePoli:{
                id: this.state.changePoli.level == 1 ? this.state.levelPoli.id: 0,
                cve_geo: this.state.changePoli.level == 1 ? this.state.levelPoli.cve_geo:"MEX",
                level: this.state.changePoli.level == 1 ? 2:3,
                center: this.state.changePoli.level == 1 ? this.state.levelPoli.center: [-11397253.55045682, 2806837.5334897055],
                extent: this.state.changePoli.level == 1 ? this.state.levelPoli.extent:[-14288915.653663361, 1650678.179152118, -8405591.44725028, 3962996.887827293]
            }})
    }

    returnCultivo(){
        this.setState({cultivo:undefined})
    }

    changeYear(event: any){
        this.setState({year:event.target.value,reiniciar:!this.state.reiniciar});
        this.returnShape();
        this.returnCultivo();
    };

    changeSelector(event: any){
        this.setState({isMontos:event.target.value === 0,reiniciar:!this.state.reiniciar});
        this.returnShape();
        this.returnCultivo();
    };

    componentDidMount() {
        MapServiceInsusGetAllPeriodos(this.props.corsEnabled,this.props.environment)
            .then(r => r.json())
            .then(r => {
                this.setState({ allYears:r })
            })

        MapServiceInsusGetPeriodo(this.props.corsEnabled,this.props.environment)
            .then(r => r.json())
            .then(r => {
                this.setState({ year:r })
            })
        FetchSyncronized(
            [SniivUrl('api/CatalogoAPI/GetFechasMapa/',true,Environments.PR)])
            .then(r => this.setState({promise:r}))
    }

    buttonInsus(){
        var caps = this.state.capas;
        caps[1] = caps[1] === 1 ? 0 : 1;
        this.setState({insus:!this.state.insus,capas:caps})
    }

    buttonIndigena(){
        var caps = this.state.capas;
        caps[0] = caps[0] === 1 ? 0 : 1;
        this.setState({indigena:!this.state.indigena,capas:caps})
    }
    buttonPcu(){
        var caps = this.state.capas;
        caps[2] = caps[2] === 1 ? 0 : 1;
        this.setState({pcu:!this.state.pcu,capas:caps})
    }
    buttonOferta(){
        var caps = this.state.capas;
        caps[3] = caps[3] === 1 ? 0 : 1;
        this.setState({oferta:!this.state.oferta,capas:caps})
    }
    buttonSisevive(){
        var caps = this.state.capas;
        caps[4] = caps[4] === 1 ? 0 : 1;
        this.setState({sisevive:!this.state.sisevive,capas:caps})
    }

    indigenaMouse(){
        this.setState({indigenaOver:!this.state.indigenaOver})
    }
    pcuMouse(){
        this.setState({pcuOver:!this.state.pcuOver})
    }
    ofertaMouse(){
        this.setState({ofertaOver:!this.state.ofertaOver})
    }
    siseviveMouse(){
        this.setState({siseviveOver:!this.state.siseviveOver})
    }

    render() {
        var inicioImg = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/ugwXQ53ZQQ6ByKICTu2vSA/content/inicio.JPG?&a=true";

        const handleClick = (event:any) => {
            this.setState({anchorEl:event.currentTarget});
        };

        const handleClose = () => {
            this.setState({anchorEl:null});
        };
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const handleClickPcu = (event:any) => {
            this.setState({anchorElPcu:event.currentTarget});
        };

        const handleClosePcu = () => {
            this.setState({anchorElPcu:null});
        };
        const openPcu = Boolean(this.state.anchorElPcu);
        const idPcu = openPcu ? 'simple-popover' : undefined;

        const handleClickOferta = (event:any) => {
            this.setState({anchorElOferta:event.currentTarget});
        };

        const handleCloseOferta = () => {
            this.setState({anchorElOferta:null});
        };
        const openOferta = Boolean(this.state.anchorElOferta);
        const idOferta = openOferta ? 'simple-popover' : undefined;

        const handleClickVive = (event:any) => {
            this.setState({anchorElVive:event.currentTarget});
        };

        const handleCloseVive = () => {
            this.setState({anchorElVive:null});
        };
        const openVive = Boolean(this.state.anchorElVive);
        const idVive = openVive ? 'simple-popover' : undefined;

        const LevelMapSelector={
            1 : "poligono",
            2 : "municipio",
            3 : "estado"
        }
        function selectLevelMap(type:number){
            // @ts-ignore
            return LevelMapSelector[type];
        }
        return(
            <div className={this.state.classes.root}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <CardBanner subtitle={"Módulo de análisis geoespacial."}
                                    title={"Módulo Geoespacial"}
                                    image={inicioImg}
                                    more1={''}
                                    more2={''}
                                    isMobile={this.state.isMobile}
                                    isBig={false}
                                    hasButton={true}/>
                    </Grid>
                </Grid>
                <Grid container spacing={0} >
                    <Grid item xs={12}>
                        <ButtonGroup disableElevation variant="contained" fullWidth={true} orientation={this.state.isMobile?"vertical":"horizontal"}>
                            <Button onClick={this.buttonInsus} className={this.state.insus && this.state.classes.submit}><div className={this.state.classes.text}>Insus-PRAH</div></Button>
                            <Button onClick={this.buttonIndigena} className={this.state.indigena && this.state.classes.submit} variant="contained"><div className={this.state.classes.text}>{"Población indígena"} </div><RefreshIcon onMouseEnter={handleClick} /></Button>
                            <Button onClick={this.buttonPcu}className={this.state.pcu && this.state.classes.submit} variant="contained"><div className={this.state.classes.text}>{"Perímetros de Contención Urbana"}</div><RefreshIcon onMouseOver={handleClickPcu}/></Button>
                            <Button onClick={this.buttonOferta}className={this.state.oferta && this.state.classes.submit} variant="contained"><div className={this.state.classes.text}>{"Oferta de Vivienda"}</div><RefreshIcon onMouseOver={handleClickOferta}/></Button>
                            <Button onClick={this.buttonSisevive}className={this.state.sisevive && this.state.classes.submit} variant="contained"><div className={this.state.classes.text}>{"SISEVIVE"}</div><RefreshIcon onMouseOver={handleClickVive}/></Button>
                        </ButtonGroup>
                        <Popover id={id} open={open} anchorEl={this.state.anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                            <PobIndigena title={this.state.promise[0] != null ? this.state.promise[0][0].descripcion: "Población Indígena"}/>
                        </Popover>
                        <Popover id={idPcu} open={openPcu} anchorEl={this.state.anchorElPcu} onClose={handleClosePcu} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                            <PcuLegend title={this.state.promise[0] != null ? this.state.promise[0][2].descripcion: "Perímetros de Contención Urbana"}/>
                        </Popover>
                        <Popover id={idOferta} open={openOferta} anchorEl={this.state.anchorElOferta} onClose={handleCloseOferta} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                            <OfertaLegend title={this.state.promise[0] != null ? this.state.promise[0][1].descripcion: "Oferta de Vivienda"}/>
                        </Popover>
                        <Popover id={idVive} open={openVive} anchorEl={this.state.anchorElVive} onClose={handleCloseVive} anchorOrigin={{vertical: 'bottom', horizontal: 'center',}} transformOrigin={{vertical: 'top', horizontal: 'center',}}>
                            <SiseviveLegend title={this.state.promise[0] != null ? this.state.promise[0][3].descripcion: "SISEVIVE"}/>
                        </Popover>

                    </Grid>
                </Grid>
                {this.state.insus &&
                <Fragment>
                    <br/>
                    <Grid container spacing={0} className={this.state.classes.tableinsus}>
                        <Grid item xs={12} md={3}></Grid>
                        <Grid item xs={12} md={3}>
                            <Paper elevation={3} className={this.state.classes.paper}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" className={this.state.classes.text}>Periodo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.year}
                                        label="Year"
                                        onChange={this.changeYear}
                                        className={this.state.classes.text}
                                    >
                                        {this.state.allYears.map((yr:any) =>
                                            <MenuItem value={yr.anio}>{yr.anio}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper elevation={3} className={this.state.classes.paper}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label-2"className={this.state.classes.text}>Selector</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label-2"
                                        id="demo-simple-select-2"
                                        value={this.state.isMontos ? 0 : 1}
                                        label="Seleccion"
                                        onChange={this.changeSelector}
                                        className={this.state.classes.text}
                                    >
                                        <MenuItem value={0}>Montos</MenuItem>
                                        <MenuItem value={1}>Acciones</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MyRangePrah valueTable={this.state.cultivo === undefined || this.state.cultivo.id === 0 ?0:this.state.valueTable} cultivo={this.state.changePoli} year={this.state.year} isMontos={this.state.isMontos} environment={this.props.environment} corsEnabled={this.props.corsEnabled}/>
                        </Grid>

                    </Grid>
                </Fragment>
                }
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item xs={12} md={10} key={this.state.reiniciar}>
                        <div>
                        </div>
                        {this.state.year != 0 &&
                        <div >
                            {(this.state.isLoading && this.state.capas[1] === 1)  &&
                            <img alt={"loader"} src={loader} style={{zIndex: 100,width:'65%',left:'15%', top:'60%',position:'absolute'}}/>}
                            <br/><br/><PublicMap callbackLoading={this.handleCallbackLoading} environment={this.props.environment} corsEnabled={this.props.corsEnabled}loadingCallback={this.handleCallbackLoading} featureSiseviveMapaCallback={this.handleSiseviveFeatureCallback} featureMapaCallback={this.handleFeatureCallback} capas={this.state.capas} cultivoCallback={this.handleCallback} information={this.state.changePoli} year={this.state.year} isMontos={this.state.isMontos} reiniciar={this.state.reiniciar}/>
                        </div>
                        }
                    </Grid>
                    {this.state.insus &&
                    <Grid item xs={12} md={2} key={this.state.reiniciar+"1"}>
                        <div key={"insus"} className={this.state.classes.table}>
                            <Paper key={"mapa2"} elevation={3} className={this.state.classes.paper}>
                                {this.state.cultivo === undefined ?
                                    "Selecciona un "+selectLevelMap(this.state.changePoli.level) +" para ver su información.":
                                    this.state.cultivo.id === 0 ?
                                        "Selecciona un estado para ver su información.":
                                        <TableInformacion valueCallback={this.handleValueCallback} callBack={this.handleLevelCallback}cultivo={this.state.cultivo} year={this.state.year} isMontos={this.state.isMontos} environment={this.props.environment} corsEnabled={this.props.corsEnabled}/>}
                                {this.state.changePoli.level != 3 && <><br/><br/><Button color="default"  size="small" className={this.state.classes.button} id={"return"} onClick={this.returnShape} variant="contained"  component="span" >Regresar</Button></>}
                            </Paper>
                        </div>
                    </Grid>}
                    {this.state.featureMapa != null && <Grid item xs={12}> <div key={"mapa"} className={this.state.isMobile ? this.state.classes.table:this.state.featureSiseviveMapa != null ?this.state.classes.tableOferta : this.state.classes.tableSisevive}><Paper elevation={3} className={this.state.classes.paper}><OfertaFeature feature={this.state.featureMapa.properties}/></Paper></div></Grid>}
                    {this.state.featureSiseviveMapa != null && <Grid item xs={12}><div key={"sisevive"} className={this.state.isMobile ? this.state.classes.table :this.state.classes.tableSisevive}><Paper elevation={3} className={this.state.classes.paper}><OfertaFeature feature={this.state.featureSiseviveMapa.properties}/></Paper></div></Grid>}

                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={this.state.classes.paper}>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

function Prah(props:any){
    const {environment,corsEnabled} = props;
    const classes = useStyles();
    const isMobile = MobileSize();
    return (<PrahDashboard isMobile={isMobile} classes={classes} environment={environment} corsEnabled={corsEnabled} />)
}

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(Prah)