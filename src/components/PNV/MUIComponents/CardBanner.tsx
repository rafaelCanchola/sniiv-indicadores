import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Box, Typography} from "@material-ui/core";
import {
    Info,
    InfoCaption,
    InfoSubtitle,
    InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
// @ts-ignore
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import {useStyles} from "../../../utils/Style";
import sniiv from "../../../assets/images/sniiv-sed.png"
import Grid from "@material-ui/core/Grid";

interface CardProps{
    subtitle: string,
    title: string,
    image: any,
    more1: string,
    more2: string,
    isMobile: boolean
}

export default function CardBanner(props:CardProps) {
    const classes = useStyles();
    const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });

    return (
        <Card className={props.isMobile ? classes.cardBienestarMobile: classes.cardBienestar}>
            <CardMedia classes={mediaStyles} image={props.image}/>
            <Box py={5} px={2} className={classes.contentCard}>
                <Grid container >
                    <Grid md={7} sm={12}></Grid>
                    <Grid md={5} sm={12} >
                        <Grid container >
                            <Grid md={2}></Grid>
                            <Grid md={10} sm={12}><img src={sniiv} alt={"sniiv"} className={classes.imageSedatu}/></Grid>
                        </Grid>

                        <Info useStyles={useGalaxyInfoStyles}>
                            <InfoTitle>{props.title}</InfoTitle>
                            <br/>
                            {props.isMobile ?<></> : <Fragment><Typography className={classes.textTitle}>{props.subtitle}</Typography><br/></Fragment>}
                            <Typography className={classes.text}>{props.more1}</Typography>
                            <br/>
                            <Typography className={classes.text}>{props.more2}</Typography>
                        </Info>
                    </Grid>

                </Grid>

            </Box>
        </Card>
    )
}