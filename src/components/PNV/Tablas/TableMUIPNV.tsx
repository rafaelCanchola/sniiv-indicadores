import React, { Fragment } from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";
import {Button} from "@material-ui/core";
import {HTMLToPDF} from "../../../utils/Utils";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

interface TableProps{
    data:any,
    id:any,
    pdfName:any
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        head: {
            backgroundColor: '#bd955c',
            color: theme.palette.common.white,
            fontWeight: "bold",
            fontSize: 8,
            padding:3,
            fontFamily:'Montserrat',
        },
        colHead:{
            backgroundColor: '#dfc9a3',
            color: theme.palette.text.secondary,
            fontWeight: "bold",
            fontSize: 8,
            padding:3,
            fontFamily:'Montserrat',
        },
        body:{
            fontSize: 8,
            padding:3,
            fontFamily:'Montserrat',
        },
        table:{
            fontFamily:'Montserrat',
        },
        textCardCenter:{
            fontSize:10,
            color:theme.palette.text.secondary,
            fontFamily:'Montserrat',
            textAlign:'center'
        },

    })

);

export default function TableMUIPNV(props: TableProps) {

    const dataKeys = Object.keys(props.data);
    const childKeys = [dataKeys[dataKeys.length-4],dataKeys[dataKeys.length-3],dataKeys[dataKeys.length-2],dataKeys[dataKeys.length-1]];
    const variablesMap = props.data[childKeys[0]]["variables"];
    const variableslast = Object.keys(props.data[childKeys[0]])[1];
    const lineaMap = Object.keys(props.data[childKeys[1]]);
    const baseMap = Object.keys(props.data[childKeys[1]][lineaMap[0]]);
    const historicoMap = Object.keys(props.data[childKeys[2]]);
    const metasMap = Object.keys(props.data[childKeys[3]]);
    const classes = useStyles();
    return (
        <Fragment>
                <TableContainer component={Paper}>
                    <Button size="small"
                            onClick={() => HTMLToPDF(props.pdfName, props.id,true ) } className={classes.textCardCenter}>Descargar ficha técnica <PictureAsPdfIcon/></Button>
                    <Table className={classes.table} id={props.id} >
                        <TableBody >
                            <TableRow ><TableCell className={classes.head} align={"center"} colSpan={11}>{props.data[dataKeys[0]]}</TableCell></TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[1]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={9}>{props.data[dataKeys[1]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[2]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={9}>{props.data[dataKeys[2]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[3]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[3]]}</TableCell>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[4]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[4]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[5]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[5]]}</TableCell>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[6]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[6]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[7]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[7]]}</TableCell>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[8]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[8]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[9]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[9]]}</TableCell>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[10]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[10]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[11]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[11]]}</TableCell>
                                <TableCell className={classes.colHead} align={"center"} colSpan={2}>{dataKeys[12]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={4}>{props.data[dataKeys[12]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={3}>{dataKeys[13]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={8}>{props.data[dataKeys[13]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={3}>{dataKeys[14]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={8}>{props.data[dataKeys[14]]}</TableCell>
                            </TableRow>
                            <TableRow><TableCell className={classes.head} align={"center"} colSpan={11}>{childKeys[0]}</TableCell></TableRow>
                            {variablesMap.map((data:any, keys:any) =>
                                <TableRow key={"Nombre variable " +(keys+1)}>
                                    <TableCell className={classes.colHead} align={"center"} colSpan={2}>{"Nombre variable " +(keys+1)}</TableCell>
                                    <TableCell className={classes.body} align={"center"} colSpan={3}>{data["Nombre variable"]}</TableCell>
                                    <TableCell className={classes.colHead} align={"center"} colSpan={1}>{"Valor variable " +(keys+1)}</TableCell>
                                    <TableCell className={classes.body} align={"center"} colSpan={2}>{data["Valor variable"].toLocaleString()}</TableCell>
                                    <TableCell className={classes.colHead} align={"center"} colSpan={1}>{"Fuente de información variable " +(keys+1)}</TableCell>
                                    <TableCell className={classes.body} align={"center"} colSpan={2}>{data["Fuente de información variable"]}</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell className={classes.colHead} align={"center"} colSpan={3}>{variableslast}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={8}>{props.data[childKeys[0]][variableslast]}</TableCell>
                            </TableRow>
                            <TableRow><TableCell className={classes.head} align={"center"} colSpan={11}>{childKeys[1]}</TableCell></TableRow>
                            <TableRow>
                                <TableCell align={"center"} className={classes.colHead} colSpan={5}>{lineaMap[0]}</TableCell>
                                <TableCell align={"center"} className={classes.colHead} colSpan={6}>{lineaMap[1]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"center"} className={classes.colHead} colSpan={2}>{baseMap[0]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={3}>{props.data[childKeys[1]][lineaMap[0]][baseMap[0]].toLocaleString()}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={6}>{props.data[childKeys[1]][lineaMap[1]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"center"} className={classes.colHead} colSpan={2}>{baseMap[1]}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={3}>{props.data[childKeys[1]][lineaMap[0]][baseMap[1]]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"center"} className={classes.colHead} colSpan={5}>{lineaMap[2]}</TableCell>
                                <TableCell align={"center"} className={classes.colHead} colSpan={6}>{lineaMap[3]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.body} align={"center"} colSpan={5}>{props.data[childKeys[1]][lineaMap[2]].toLocaleString()}</TableCell>
                                <TableCell className={classes.body} align={"center"} colSpan={6}>{props.data[childKeys[1]][lineaMap[3]]}</TableCell>
                            </TableRow>
                            <TableRow><TableCell align={"center"} className={classes.head} colSpan={11}>{childKeys[2]}</TableCell></TableRow>
                            <TableRow>

                                <TableCell key={'tb0'} className={classes.colHead} align={"center"} colSpan={1}>{""}</TableCell>
                                {historicoMap.map((data:any, keys:number) =>
                                    <TableCell key={data+keys} className={classes.colHead} align={"center"} colSpan={1}>{data}</TableCell>
                                )}
                            </TableRow>
                            <TableRow>
                                <TableCell key={'tb10'} className={classes.body} align={"center"} colSpan={1}>{""}</TableCell>
                                {historicoMap.map((data:any, keys:number) =>
                                    <TableCell key={data+keys} className={classes.body} align={"center"} colSpan={1}>{props.data[childKeys[2]][data].toLocaleString()}</TableCell>
                                )}
                            </TableRow>

                            <TableRow><TableCell align={"center"} className={classes.head} colSpan={11}>{childKeys[3]}</TableCell></TableRow>
                            <TableRow>
                                <TableCell key={'tr0'} className={classes.colHead} align={"center"} colSpan={2}>{""}</TableCell>
                                {metasMap.map((data:any, keys:number) =>
                                    <TableCell key={data+keys} className={classes.colHead} align={"center"} colSpan={2}>{data}</TableCell>
                                )}
                                <TableCell key={'tr10'} className={classes.colHead} align={"center"} colSpan={1}>{""}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell key={'tc0'} className={classes.body} align={"center"} colSpan={2}>{""}</TableCell>
                                {metasMap.map((data:any, keys:number) =>
                                    <TableCell key={data+keys} className={classes.body} align={"center"} colSpan={2}>{props.data[childKeys[3]][data].toLocaleString()}</TableCell>
                                )}
                                <TableCell key={'tc10'} className={classes.body} align={"center"} colSpan={1}>{""}</TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

        </Fragment>

    )
}


