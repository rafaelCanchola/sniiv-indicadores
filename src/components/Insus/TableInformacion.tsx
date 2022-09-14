import React, {Component,Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, withStyles} from "@material-ui/core";
import {MapServiceInsusPoliInfo} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 13,
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
        padding:1,
    },
    button:{
        fontSize:10
    }
});



class TableInformacion extends Component<any, any> {

    constructor(props:any) {
        super(props);
        this.handleCallBack = this.handleCallBack.bind(this)
        this.returnEstatal = this.returnEstatal.bind(this)
        this.state = {
            id : this.props.cultivo.id,
            cve: this.props.cultivo.cve_geo,
            level: this.props.cultivo.level,
            center: this.props.cultivo.center,
            extent:this.props.cultivo.extent,
            classes: this.props.classes,
            year: this.props.year,
            isMontos:this.props.isMontos,
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

    handleCallBack(){
        this.props.callback({id:this.state.id,cve_geo:this.state.cve,level:this.state.level-1,center:this.state.center,extent:this.state.extent})
    }

    returnEstatal(){
        this.props.callback({id:0,cve_geo:"MEX",level:3,center:[-11397253.55045682,2806837.5334897055],extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293]})
    }

    componentDidMount() {
        MapServiceInsusPoliInfo(this.state.isMontos,this.state.year,this.state.id,this.state.level,this.props.corsEnabled,this.props.environment)
            .then(r => r.json())
            .then(r => {
                //@ts-ignore
                this.setState({ rows: r.map(campo => this.createData(campo.alias,campo.value)) })
            })
    }
    render() {
        return (
            <div>
                <TableContainer component={Paper} >
                <Table className={this.state.classes.table} aria-label="customized table" size={"small"}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={this.state.classes.button} align="center" colSpan={2}>INSUS-PRAH</StyledTableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row: any) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell className={this.state.classes.button} component="th" scope="row" align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell className={this.state.classes.button} align="center">{(row.name === 'Año'||row.data == null)?row.data:row.data.toLocaleString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

                {this.state.level != 3 && <><br/><Button color="default"  size="small" className={this.state.classes.button} id={"return"} onClick={this.returnEstatal} variant="contained"  component="span" >Regresar</Button></>}
                <br/><br/>
                {this.state.level != 1 && <Button color="default" size="small" className={this.state.classes.button} id={"submit"} onClick={this.handleCallBack} variant="contained"  component="span" >Ver información {this.state.level===3?"municipal":this.state.level===2?"por polígono":""}</Button>}
            </div>
        );
    }
}
export default function MyTable(props:any){
    const classes = useStyles();
    const callbackClass = (childData:any) =>{
        props.callBack(childData);
    }
    return (<TableInformacion classes={classes} cultivo={props.cultivo} callback={callbackClass} year={props.year} isMontos={props.isMontos} environment={props.environment} cors={props.corsEnabled}/>)
}
