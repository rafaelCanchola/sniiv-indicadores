import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {alpha, makeStyles} from "@material-ui/core/styles";
import authService from "./authService";
import sniiv from "../../assets/images/sniiv-sed.png";

var inicioImg = "https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/ugwXQ53ZQQ6ByKICTu2vSA/content/inicio.JPG?&a=true";
var sniivImg = "https://sniiv.sedatu.gob.mx/img/sniiv02.png";
const user = [

    {username:"sniiv-svc", password:"user-svc-22"},

];



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
        color:'white'
    }
}));

const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#ffe',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${alpha('#b99560', 0.25)} 0 0 0 2px`,
            borderColor: '#b99560',
            color:'#b99560',
            textColor:'#b99560'
        },
    },
    focused: {},
}));

function RedditTextField(props:any) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

export default function SignInSide(props:any) {

    if(authService.isLoggedIn()){

        props.history.push("./admin");

    }

    const classes = useStyles();


    const [account, setAccount] = React.useState({username:"",password:""});

    const handelAccount = (property:any,event:any)=>{

        const accountCopy = {...account};
        // @ts-ignore
        accountCopy[property] = event.target.value;

        setAccount(accountCopy);

    }

    const isVarifiedUser=(username:any, password:any)=>{

        return user.find((user: { username: any; password: any; })=> user.username === username && user.password === password);

    };


    const handelLogin = ()=>{
        if(isVarifiedUser(account.username,account.password)){
            authService.doLogIn(account.username);
            setAccount({username:"",password:""});
            props.history.push("/admin");

        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
            <Grid component={Paper} className={classes.size} item xs={12} sm={8} md={5} square>
                    <img src={sniivImg} alt={"sniiv"} className={classes.imageSedatu}/>
                    <form className={classes.form} noValidate>
                        <RedditTextField
                            onChange={(event:any)=>handelAccount("username",event)}
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Usuario"
                            name="username"
                            autoFocus
                        />
                        <RedditTextField
                            onChange={(event: any)=>handelAccount("password",event)}
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick = {handelLogin}
                        >
                            Iniciar Sesión
                        </Button>
                        <Box mt={5}>
                        </Box>
                    </form>
            </Grid>
        </Grid>
    );
}
