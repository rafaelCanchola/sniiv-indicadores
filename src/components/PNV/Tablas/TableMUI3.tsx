import React from 'react'
import { Fragment } from 'react'
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";

interface TableProps{
    data:any
}

function TableMUI3(props: TableProps) {


    return (
        <TableContainer component={Paper}>
            {
                <Table size={"medium"}>
                    <TableBody>
                        <TableRow><TableCell align={"center"} colSpan={10}>{props.data["Nombre"]}</TableCell></TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Objetivo prioritario"}</TableCell>
                            <TableCell align={"center"} colSpan={7}>{props.data["Objetivo prioritario"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Definición o descripción"}</TableCell>
                            <TableCell align={"center"} colSpan={7}>{props.data["Definición o descripción"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Nivel de desagregación"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Nivel de desagregación"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"Periodicidad o frecuencia de medición"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Periodicidad o frecuencia de medición"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Tipo"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Tipo"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"Acumulado o periódico"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Acumulado o periódico"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Unidad de medida"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Unidad de medida"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"Periodo de recolección de datos"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Periodo de recolección de datos"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Dimensión"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Dimensión"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"Disponibilidad de la información"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Disponibilidad de la información"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Tendencia esperada"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Tendencia esperada"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"Unidad Responsable de reportar el avance"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["Unidad Responsable de reportar el avance"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={3}>{"Método de cálculo"}</TableCell>
                            <TableCell align={"center"} colSpan={7}>{props.data["Método de cálculo"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={3}>{"Observaciones"}</TableCell>
                            <TableCell align={"center"} colSpan={7}>{props.data["Observaciones"]}</TableCell>
                        </TableRow>
                        <TableRow><TableCell align={"center"} colSpan={10}>{"APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"}</TableCell></TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 1"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 1"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 1"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 1"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 1"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 1"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 2"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 2"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 2"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 2"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 2"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 2"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 3"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 3"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 3"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 3"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 3"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 3"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 4"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 4"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 4"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 4"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 4"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 4"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 5"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 5"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 5"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 5"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 5"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 5"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"Nombre variable 6"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Nombre variable 6"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Valor variable 6"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Valor variable 6"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"Fuente de información variable 6"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Fuente de información variable 6"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={3}>{"Sustitución en método de cálculo del indicador"}</TableCell>
                            <TableCell align={"center"} colSpan={7}>{props.data["APLICACIÓN DEL MÉTODO DE CÁLCULO DEL INDICADOR PARA LA OBTENCIÓN DEL VALOR DE LA LÍNEA BASE"]["Sustitución en método de cálculo del indicador"]}</TableCell>
                        </TableRow>
                        <TableRow><TableCell align={"center"} colSpan={10}>{"VALOR DE LÍNEA BASE Y METAS"}</TableCell></TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={5}>{"Línea base"}</TableCell>
                            <TableCell align={"center"} colSpan={5}>{"Nota sobre la línea base"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Valor"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["VALOR DE LÍNEA BASE Y METAS"]["Línea base"]["Valor"]}</TableCell>
                            <TableCell align={"center"} colSpan={5}>{props.data["VALOR DE LÍNEA BASE Y METAS"]["Nota sobre la línea base"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={2}>{"Año"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["VALOR DE LÍNEA BASE Y METAS"]["Línea base"]["Año"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={5}>{"META 2024"}</TableCell>
                            <TableCell align={"center"} colSpan={5}>{"Nota sobre la meta 2024"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={5}>{props.data["VALOR DE LÍNEA BASE Y METAS"]["META 2024"]}</TableCell>
                            <TableCell align={"center"} colSpan={5}>{props.data["VALOR DE LÍNEA BASE Y METAS"]["Nota sobre la meta 2024"]}</TableCell>
                        </TableRow>
                        <TableRow><TableCell align={"center"} colSpan={10}>{"SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"}</TableCell></TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{"2012"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2013"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2014"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2015"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2016"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2017"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2018"}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{"2019"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"2020"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2012"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2013"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2014"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2015"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2016"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2017"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2018"]}</TableCell>
                            <TableCell align={"center"} colSpan={1}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2019"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["SERIE HISTÓRICA DE LA META PARA EL BIENESTAR O PARÁMETRO"]["2020"]}</TableCell>
                        </TableRow>
                        <TableRow><TableCell align={"center"} colSpan={10}>{"METAS INTERMEDIAS"}</TableCell></TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={3}>{"2021"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"2022"}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{"2023"}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{"2024"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align={"center"} colSpan={3}>{props.data["METAS INTERMEDIAS"]["2021"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["METAS INTERMEDIAS"]["2022"]}</TableCell>
                            <TableCell align={"center"} colSpan={3}>{props.data["METAS INTERMEDIAS"]["2023"]}</TableCell>
                            <TableCell align={"center"} colSpan={2}>{props.data["METAS INTERMEDIAS"]["2024"]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            }
        </TableContainer>
    )
}

export default TableMUI3
