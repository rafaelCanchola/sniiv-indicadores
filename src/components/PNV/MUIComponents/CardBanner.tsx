import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Box} from "@material-ui/core";
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
            <CardMedia
                classes={mediaStyles}
                image={props.image}
            />
            <Box py={3} px={2} className={classes.contentCard}>
                <Info useStyles={useGalaxyInfoStyles}>
                    <InfoTitle>{props.title}</InfoTitle>
                    <br/>
                    {props.isMobile ?<></> : <Fragment><InfoSubtitle>{props.subtitle}</InfoSubtitle><br/></Fragment>}
                    <InfoCaption>{props.more1}</InfoCaption>
                    <InfoCaption>{props.more2}</InfoCaption>
                </Info>
            </Box>
        </Card>
    )
}