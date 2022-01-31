import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {CardActionArea} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
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
}));

interface CardProps{
    obj: number,
    title: string,
    image: any,
    more: string
}

export default function CardVivienda(props:CardProps) {
    const classes = useStyles();
    const theme = useTheme();
    const clicke = () => {
        console.log("DATA")
    }
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={clicke}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {props.obj}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.title}
                        </Typography>
                    </CardContent>

                </div>
            </CardActionArea>
            <CardMedia
                     className={classes.cover}
                    image={props.image}
                   title={props.title}
                />

        </Card>
    );
}