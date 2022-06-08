import PublicMap from "./PublicMap";
import TableInformacion from "./TableInformacion";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import Loader from "react-loader-spinner";
import {MapServiceInsusPost} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default
        },
        input: {
            display: 'none',
        },
    })
);

export default function Prah(){
    const [selectedFile, setSelectedFile] = useState();
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [cultivo,setCultivo] = useState({id:0,type:0,level:1});

    const handleCallback = (childData:any) =>{
        setCultivo(childData);
    }
    const classes = useStyles();
    const changeHandler = (event:any) => {
        setSelectedFile(event.target.files[0]);
        setDisabled(false)
    };
    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('currentyear','2021');
        // @ts-ignore
        formData.append('file', selectedFile);
        setLoader(true)
        setDisabled(true)
        MapServiceInsusPost(formData,false,Environments.DEV)
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                setLoader(false)
                setSelectedFile(undefined)
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoader(false)
                setSelectedFile(undefined)
            });
    };
console.log(cultivo)
    return(
        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <h1>Insus PRAH</h1>
                        <AutorenewIcon fontSize={'large'} onClick={() => {

                        }}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} className={classes.paper}>
                        <PublicMap cultivoCallback={handleCallback}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} className={classes.paper}>
                        {cultivo === undefined ? <>Selecciona un polígono para ver su información.</>:cultivo.id === 0 ? <>Selecciona un polígono para ver su información.</>:<>Información detallada<TableInformacion id={cultivo.id} level={cultivo.level}/></>}
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {(loader) ?
                        <Paper elevation={3} className={classes.paper}>
                            <Loader
                                type="Circles"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={0}
                            />
                        </Paper>
                        :
                        <Paper elevation={3} className={classes.paper}>
                            Selecciona un .zip para cargar al sistema.
                            <br/>
                            <br/>
                            <input
                                accept="application/zip"
                                id="contained-button-file"
                                type="file"
                                onChange={changeHandler}
                            />
                            <Button id={"submit"} onClick={handleSubmission} variant="contained" color="primary" component="span" disabled={disabled}>
                                Subir ZIP
                            </Button>
                        </Paper>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}