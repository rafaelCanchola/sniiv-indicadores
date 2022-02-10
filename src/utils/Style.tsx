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

        },
        paperPNV:{
            padding: theme.spacing(2),
            textAlign:"justify",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.default,
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
            width: "40%",
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
    })
);