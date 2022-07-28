import PublicMap from "./PublicMap";
import TableInformacion from "./TableInformacion";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {Component} from "react";
import {Paper, Grid, Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Loader from "react-loader-spinner";
import {MapServiceInsusGetAllPeriodos, MapServiceInsusGetPeriodo, MapServiceInsusPost} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";
import {connect} from "react-redux";

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
        table:{
            position: "absolute",
            bottom: "25%",
            left: "75%",
            width: "20%"
        },
        button:{
            fontSize:10
        }
    })
);

class PrahDashboard extends Component<any, any>{
    constructor(props: any){
        super(props);
        this.handleCallback = this.handleCallback.bind(this)
        this.handleLevelCallback = this.handleLevelCallback.bind(this)
        this.returnShape = this.returnShape.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.changeYear = this.changeYear.bind(this)
        this.changeSelector = this.changeSelector.bind(this)
        this.returnCultivo = this.returnCultivo.bind(this)

        this.state = {
            classes : this.props.classes,
            reiniciar:false,
            year : 0,
            isMontos: true,
            allYears: [],
            selectedFile: undefined,
            disabled: true,
            loader: false,
            cultivo: {id:0,cve_geo:"",type:0,level:1,center:[],extent:[]},
            changePoli : {id:0,cve_geo:"MEX",level:3,center:[-11397253.55045682,2806837.5334897055],extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293]}
        }
    }
    /*const [selectedFile, setSelectedFile] = useState();
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [cultivo,setCultivo] = useState({id:0,cve_geo:"",type:0,level:1,center:[],extent:[]})
    const [changePoli,setChangePoli] = useState({id:0,cve_geo:"MEX",level:3,center:[-11397253.55045682,2806837.5334897055],extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293]});
    */
    handleCallback(childData:any){
        this.setState({cultivo:childData})
    }

    handleLevelCallback(childData:any){
        this.setState({changePoli:childData})
    }

    returnShape(){
        this.setState({changePoli:{
                id: 0,
                cve_geo: "MEX",
                level: 3,
                center: [-11397253.55045682, 2806837.5334897055],
                extent: [-14288915.653663361, 1750678.179152118, -8505591.44725028, 3862996.887827293]
            }})
    }

    returnCultivo(){
        this.setState({cultivo:undefined})
    }

    changeHandler(event:any){
        this.setState({selectedFile:event.target.files[0],disabled:false});
    };
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
    handleSubmission(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.setState({disabled:true,loader:true})
        MapServiceInsusPost(formData,this.props.corsEnabled,this.props.environment)
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                this.setState({selectedFile:undefined,loader:false})

            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({selectedFile:undefined,loader:false})
            });
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
    }

    render() {
        return(
            <div className={this.state.classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} className={this.state.classes.paper}>
                            <h1>Insus PRAH al {this.state.year}</h1>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className={this.state.classes.paper}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Periodo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.year}
                                    label="Year"
                                    onChange={this.changeYear}
                                >
                                    {this.state.allYears.map((yr:any) =>
                                        <MenuItem value={yr.anio}>{yr.anio}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} className={this.state.classes.paper}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label-2">Selector</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-2"
                                id="demo-simple-select-2"
                                value={this.state.isMontos ? 0 : 1}
                                label="Seleccion"
                                onChange={this.changeSelector}
                            >
                                <MenuItem value={0}>Montos</MenuItem>
                                <MenuItem value={1}>Acciones</MenuItem>
                            </Select>
                        </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} key={this.state.reiniciar}>
                        {this.state.year != 0 &&
                            <div >
                                <PublicMap cultivoCallback={this.handleCallback} information={this.state.changePoli} year={this.state.year} isMontos={this.state.isMontos} reiniciar={this.state.reiniciar}/>
                                <div className={this.state.classes.table}>{this.state.cultivo === undefined ? <Paper elevation={3} className={this.state.classes.paper}>Selecciona un polígono para ver su información.{this.state.changePoli.level != 3 && <><br/><br/><Button color="default"  size="small" className={this.state.classes.button} id={"return"} onClick={this.returnShape} variant="contained"  component="span" >Regresar</Button></>}</Paper>:this.state.cultivo.id === 0 ? <Paper elevation={3} className={this.state.classes.paper}>Selecciona un polígono para ver su información.{this.state.cultivo.cve_geo}</Paper>:<Paper elevation={3} className={this.state.classes.paper2}><TableInformacion callBack={this.handleLevelCallback}cultivo={this.state.cultivo} year={this.state.year} isMontos={this.state.isMontos}/></Paper>}</div>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper elevation={3} className={this.state.classes.paper}>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {(this.state.loader) ?
                            <Paper elevation={3} className={this.state.classes.paper}>
                                <Loader
                                    type="Circles"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                    timeout={0}
                                />
                            </Paper>
                            :
                            <Paper elevation={3} className={this.state.classes.paper}>
                                Selecciona un .zip para cargar al sistema.
                                <br/>
                                <br/>
                                <input
                                    accept="application/zip"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={this.changeHandler}
                                />
                                <Button id={"submit"} onClick={this.handleSubmission} variant="contained" color="primary" component="span" disabled={this.state.disabled}>
                                    Subir ZIP
                                </Button>
                            </Paper>
                        }
                    </Grid>
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
    return (<PrahDashboard classes={classes} environment={environment} corsEnabled={corsEnabled} />)
}

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(Prah)