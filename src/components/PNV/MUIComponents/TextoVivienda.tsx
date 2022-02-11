import React from 'react';
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
    obj: number,
    title: string,
    image: any,
    more: string,
}

export default function TextoVivienda(props:CardProps) {
    const classes = useStyles();
    const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'center' });

    return (
        <Card className={classes.card}>
            <CardMedia
                classes={mediaStyles}
                image={props.image}
            />
            <Box py={3} px={2} className={classes.contentCard}>
                <Info useStyles={useGalaxyInfoStyles}>
                    <InfoSubtitle>{props.obj}</InfoSubtitle>
                    <InfoTitle>{props.title}</InfoTitle>
                    <InfoCaption>{props.more}</InfoCaption>
                </Info>
            </Box>
        </Card>
    )
}