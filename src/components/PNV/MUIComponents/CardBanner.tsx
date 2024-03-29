import React, {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Box, Typography} from "@material-ui/core";
import {Info, InfoTitle,} from '@mui-treasury/components/info';
import {useGalaxyInfoStyles} from '@mui-treasury/styles/info/galaxy';
import {useStyles} from "../../../utils/Style";
import sniiv from "../../../assets/images/sniiv-sed.png"
import Grid from "@material-ui/core/Grid";

// @ts-ignore
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import Button from "@material-ui/core/Button";
import {SniivEnvironmentUrl} from "../../FetchMethods";
import {Environments} from "../../../redux/reducers/environment";

interface CardProps{
    subtitle: string,
    title: string,
    image: any,
    more1: string,
    more2: string,
    isMobile: boolean,
    isBig: boolean,
    hasButton:boolean
}

export default function CardBanner(props:CardProps) {
    const classes = useStyles();
    const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'center' });

    return (
        <Card className={props.isMobile ? classes.cardBienestarMobile: props.isBig? classes.cardBienestar: classes.cardSmall}>
            <CardMedia classes={mediaStyles} image={props.image}/>
            <Box py={5} px={2} className={classes.contentCard}>
                <Grid container >
                    <Grid item md={6} sm={12}>
                    </Grid>
                    <Grid item md={6} sm={12} >
                        <Grid container >
                            <Grid item md={2}></Grid>
                            <Grid item md={10} sm={12}>
                                <Button disabled={!props.hasButton} onClick={() => {
                                    window.location.href=SniivEnvironmentUrl(false,Environments.PR);
                                }} className={classes.button} ><img src={sniiv} alt={"sniiv"} className={classes.imageSedatu}/></Button>
                            </Grid>
                        </Grid>

                        <Info useStyles={useGalaxyInfoStyles}>
                            <InfoTitle>{props.title}</InfoTitle>
                            <br/>
                            {props.isMobile ?<></> : <Fragment><Typography className={classes.textTitle}>{props.subtitle}</Typography><br/></Fragment>}
                            <p className={classes.text}>{props.more1}</p>
                            <br/>
                            <p className={classes.text}>{props.more2}</p>
                            </Info>
                    </Grid>

                </Grid>

            </Box>
        </Card>
    )
}