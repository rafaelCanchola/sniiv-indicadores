import React, {Component} from 'react';
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// @ts-ignore
import TextInfoContent from '@mui-treasury/components/content/textInfo';
// @ts-ignore
import {useBlogTextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/blog';
// @ts-ignore
import {useOverShadowStyles} from '@mui-treasury/styles/shadow/over';
import {useStyles} from "../../utils/Style";
import {Alert, AlertTitle} from "@material-ui/lab";
import {MapServiceInsusPost, PnvCsvPost, PnvReportePost} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";
import Loader from "react-loader-spinner";
import {connect} from "react-redux";

interface CardProps{
    subtitle: string,
    title: string,
    image: any,
    more1: string,
    more2: string,
    type: number,
    environment:any,
    corsEnabled:boolean
}

interface BlogProps{
    subtitle: string,
    title: string,
    image: any,
    more1: string,
    more2: string,
    type: number,
    styles:any,
    classStyles:any,
    buttonStyles:any,
    contentStyles:any,
    shadowStyles:any,
    environment:any,
    corsEnabled:boolean
}

const useLocalStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: 'auto',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 500,
        marginLeft: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    media: {
        width: '88%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-3),
        height: 0,
        paddingBottom: '48%',
        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        [breakpoints.up('md')]: {
            width: '100%',
            marginLeft: spacing(-3),
            marginTop: 0,
            transform: 'translateX(-8px)',
        },
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(147deg, #b99560 0%, #325b4f 74%)',
            borderRadius: spacing(2), // 16
            opacity: 0.5,
        },
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
    submit: {
        backgroundColor: '#325b4f',
        color:'#fff'
    },
}));

class CardBlog extends Component<BlogProps, any>{
    constructor(props: any){
        super(props);
        this.changeHandler = this.changeHandler.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.state = {
            selectedFile: undefined,
            disabled: true,
            loader: false,
            resultState: 0,
            resultMsg:""
        }
    }

    changeHandler(event:any){
        this.setState({selectedFile:event.target.files[0],disabled:false});
    };
    handleSubmission(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        this.setState({disabled:true,loader:true,resultState:0})
        this.props.type == 1 ? MapServiceInsusPost(formData,this.props.corsEnabled,this.props.environment) : this.props.type == 2 ? PnvCsvPost(formData,this.props.corsEnabled,this.props.environment) : PnvReportePost(formData,this.props.corsEnabled,this.props.environment)
            .then((result) => {
                this.setState({selectedFile:undefined,loader:false,resultState:result.status})
                switch(this.state.resultState){
                    case 200:
                        this.setState({resultMsg:""})
                        break;
                }
                setTimeout(() => {
                    this.setState({resultState:0})
                }, 2500);

            }).catch((error)=>{
            this.setState({selectedFile:undefined,loader:false,resultState:error.status})
            setTimeout(() => {
                this.setState({resultState:0})
            }, 2500);
        });
    };

    render() {
        const resultMessage = () => {
            switch(this.state.resultState){
                case 200:
                    return (<>Proceso exitoso 200 — <strong>Se añadio nueva información y un nuevo periodo.</strong></>)
                case 400:
                    return (<>Error al subir el archivo  — <strong>Existe un problema con la creación de las carpetas.</strong></>)
                case 401:
                    return (<>Error con el nombre — <strong>Es necesario subir el archivo con el formato correcto.</strong></>)
                case 402:
                    return (<>Error al subir el archivo  — <strong>Existe un problema con la comunicación con Alfresco.</strong></>)
                case 408:
                    return (<>Error con el archivo — <strong>Los campos del archivo no son los correctos o el periodo ya existe.</strong></>)
                case 411:
                    return (<>Error con la respuesta — <strong>Hay un error en la respuesta de Alfresco.</strong></>)
                case 500:
                    return (<>Cors no permitido — <strong>La política CORS no permite acceder al recurso.</strong></>)
                default:
                    return (<>Intente más tarde — <strong>No se puede establecer comunicación con el servicio o el archivo excede el tamaño maximo permitido.</strong></>)
                }
        }

        const messageType = (type:number) => {
            switch (type) {
                case 1:
                    return "Subir ZIP"
                case 2:
                    return "Subir CSV"
                case 3:
                    return "Subir PDF"
                default:
                    return ""
            }
        }

        const applicationType = (type:number) => {
            switch (type) {
                case 1:
                    return "application/zip"
                case 2:
                    return ".csv"
                case 3:
                    return ".pdf"
                default:
                    return ""
            }
        }

        return (
            <Card className={cx(this.props.styles.root, this.props.shadowStyles.root)}>
                <CardMedia
                    className={this.props.styles.media}
                    image={this.props.image}
                />
                <CardContent>
                    <div className={this.props.classStyles.textColorGrey}>{this.props.subtitle}</div>
                    <h3 className={this.props.classStyles.textColorGrey}>{this.props.title}</h3>
                    <div className={this.props.classStyles.textColorGrey10}>{this.props.more1}</div>
                    {this.state.resultState != 0 && <Alert severity={this.state.resultState === 200?"success":"error"}><AlertTitle>{this.state.resultState === 200?"Carga exitosa":"Error"}</AlertTitle>{resultMessage()}</Alert>}
                    <br/>
                    <div>
                        {(this.state.loader) ?
                            <Loader
                                type="Circles"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={0}
                            />
                            :
                            <div className={this.props.classStyles.textColorGrey10}>
                                {this.props.more2}
                                <br/>
                                <br/>
                                <input
                                    accept={applicationType(this.props.type)}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={this.changeHandler}
                                />
                                <br/>
                                <br/>
                                <Button className={this.props.styles.submit} id={"submit"} onClick={this.handleSubmission} variant="contained" component="span" disabled={this.state.disabled}>
                                    {messageType(this.props.type)}
                                </Button>
                            </div>
                        }
                    </div>
                </CardContent>
            </Card>
        );
    }
}
function CardModulo(props:CardProps) {
    const styles = useLocalStyles();
    const classStyles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();

    return(<CardBlog environment={props.environment} corsEnabled={props.corsEnabled} title={props.title} subtitle={props.subtitle} more1={props.more1} more2={props.more2} type={props.type} image={props.image} styles={styles} classStyles={classStyles} buttonStyles={buttonStyles} contentStyles={contentStyles} shadowStyles={shadowStyles} />)
}

const mapStateToProps = (state:any) => {
    return{
        environment: state.environment.environment,
        corsEnabled: state.corsLoader.isCorsActive,
    }
}

export default connect (mapStateToProps)(CardModulo)