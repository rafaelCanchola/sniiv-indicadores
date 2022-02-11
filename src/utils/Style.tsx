import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        paper:{
            padding: theme.spacing(2),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
            fontFamily:'Montserrat',

        },
        paperPNV:{
            padding: theme.spacing(2),
            textAlign:"justify",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
            fontFamily:'Montserrat',
        },
        paperImage:{
            padding: theme.spacing(1),
            textAlign:"center",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,

        },
        image:{
            width:"100%",
            height: "auto"
        },
        imagePNV:{
            width:"80%",
            height: "auto"
        },
        imageIcon:{
            width:"60%",
            height: "auto"
        },
        body:{
            fontSize: 12,
            color: theme.palette.text.secondary,
            fontFamily:'Montserrat',
        },
        rootCard: {
            maxWidth: 345,

        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        text:{
            fontSize:10,
            color:theme.palette.text.secondary,
            fontFamily:'Montserrat',
        },
        imageCard:{
            width:"65%",
            height:"auto"
        },
        rootBienestar: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: "50%",
            height:'auto'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        gauge:{

        },
        typo:{
            textAlign:"center",
            color: theme.palette.text.secondary,
        },
        card: {
            borderRadius: '1rem',
            boxShadow: 'none',
            position: 'relative',
            minWidth: 200,
            minHeight: 360,
            '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                width: '100%',
                height: '64%',
                bottom: 0,
                zIndex: 1,
                background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
            },
        },
        contentCard: {
            position: 'absolute',
            zIndex: 2,
            bottom: 0,
            width: '100%',
        },
    })
);