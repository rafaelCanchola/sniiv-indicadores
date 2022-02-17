import React, { Fragment } from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";

interface TableProps{
    data:any
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        head: {
            backgroundColor: '#bd955c',
            color: theme.palette.common.white,
            fontWeight: "bold",
            fontSize: 8,
            padding:3,
        },
        colHead:{
            backgroundColor: '#dfc9a3',
            color: theme.palette.text.secondary,
            fontWeight: "bold",
            fontSize: 8,
            padding:3,
        },
        body:{
            fontSize: 8,
            padding:3,
        },
        table:{
            fontFamily:'Montserrat',
        }

    })

);

export default function TableMUIObjetivo(props: TableProps) {

    const dataKeys = Object.keys(props.data[0]);
    const classes = useStyles();
    return (
        <Fragment>
            {props.data.map( (dat:any,key:number)=>
                <TableContainer component={Paper} key={key}>
                    <Table className={classes.table} >
                        <TableBody >
                            <TableRow><TableCell className={classes.head} align={"center"} colSpan={2}>{dat[dataKeys[0]]}</TableCell></TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={1}>{dataKeys[1]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={1}>{dat[dataKeys[1]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={1}>{dataKeys[2]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={1}>{dat[dataKeys[2]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={1}>{dataKeys[3]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={1}>{dat[dataKeys[3]]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <br/>
                </TableContainer>
            )}
        </Fragment>



    )
}


