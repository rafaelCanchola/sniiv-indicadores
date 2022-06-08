import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import {MapServiceInsusPoliInfo} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});



class TableInformacion extends Component<any, any> {
    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            level: this.props.level,
            classes: this.props.classes,
            rows: [{name:"",data:""}]
        }
    }
    /*const handleSubmit = async () => {
        const info = await downloadInfoCultivo(this.id);
        //@ts-ignore
        const rows = info.map(campo => createData(campo.alias,campo.value));
        console.log(rows)
        return rows;
    }*/
    createData(name:any, data:any) {
        return {name, data};
    }

    componentDidMount() {
        console.log(this.props.level)
        MapServiceInsusPoliInfo(this.state.id,this.state.level,false,Environments.DEV)
            .then(r => r.json())
            .then(r => {
                //@ts-ignore
                this.setState({ rows: r.map(campo => this.createData(campo.alias,campo.value)) })
            })
    }
    render() {
        console.log(this.props.level)
        return (
            <TableContainer component={Paper}>
                <Table className={this.state.classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Datos</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row: any) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{(row.name === 'Año'||row.data == null)?row.data:row.data.toLocaleString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default function MyTable(props:any){
    const classes = useStyles();
    return (<TableInformacion classes={classes} id={props.id} level={props.level}/>)
}
