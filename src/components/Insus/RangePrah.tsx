import React, {Component,Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {MapServiceInsusGetRanges, MapServiceInsusPoliInfo, MapServiceMexicoGetRanges} from "../FetchMethods";
import Slider from "@material-ui/core/Slider";




const useStyles = makeStyles({
    table: {
        padding:1,
    },
    button:{
        fontSize:10
    },
    thumb: {
        background: "grey",
    },
    thumbTransparent: {
        background: "transparent",
    },
    mark: {
        background: "black",

    },
    rail: {
        background: "linear-gradient(to right, yellow, orange, red);",
        height:5
    },
    track: {
        background: "transparent;",
        height:1
    },
    valueLabel: {
        "&>*": {
            background: "black",

        }
    }
});

function valuetext(value:any) {
    return value.toLocaleString();
}



class RangePrah extends Component<any, any> {

    constructor(props:any) {
        super(props);
        this.state = {
            id: this.props.cultivo.id,
            cve: this.props.cultivo.cve_geo,
            level: this.props.cultivo.level,
            center: this.props.cultivo.center,
            extent: this.props.cultivo.extent,
            classes: this.props.classes,
            year: this.props.year,
            isMontos: this.props.isMontos,
            value: this.props.value,
            rows: [1]
        }
    }
    /*xmin: transform[0],
    ymin: transform[1],
    xmax: transform[2],
    ymax: transform[3],

     */

    async getRanges(isMontos:any,year:any,cve:any,xmin:any,ymin:any,xmax:any,ymax:any,cors:any,environment:any,level:any){
        let myRows = [0,0]
        if(level == 1){
            await MapServiceInsusGetRanges(isMontos,year,cve,xmin,ymin,xmax,ymax,cors,environment)
                .then(r => r.json())
                .then(r => {
                    myRows = r
                })
        }else{
            await MapServiceMexicoGetRanges(isMontos,year,cve,xmin,ymin,xmax,ymax,cors,environment)
                .then(r => r.json())
                .then(r => {
                    myRows = r
                })
        }
        if(myRows[0] == myRows[1]){
            this.setState({ rows: [0,myRows[1]] })
        }else{
            this.setState({ rows: myRows })
        }
    }

    componentDidMount() {
        this.getRanges(this.state.isMontos,this.state.year,this.state.cve,this.state.extent[0],this.state.extent[1],this.state.extent[2],this.state.extent[3],this.props.corsEnabled,this.props.environment,this.state.level)
    }

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {

        if(this.state.value != nextProps.value){
            this.setState({value:nextProps.value})
        }
        if(this.state.level != nextProps.cultivo.level){
            this.setState({level:nextProps.cultivo.level,center:nextProps.cultivo.center,isMontos:nextProps.isMontos,cve:nextProps.cultivo.cve_geo,extent:nextProps.cultivo.extent})
            this.getRanges(nextProps.isMontos,nextProps.year,nextProps.cultivo.cve_geo,nextProps.cultivo.extent[0],nextProps.cultivo.extent[1],nextProps.cultivo.extent[2],nextProps.cultivo.extent[3],this.props.corsEnabled,this.props.environment,nextProps.cultivo.level)
        }
        return this.state.value != nextProps.value || this.state.rows != null
    }


    render() {
        return (
            <div style={{background:'white', paddingTop:'2%',paddingLeft:'20%',paddingRight:'20%',
                fontFamily:'Montserrat'}}>
                <Slider
                classes={{
                    thumb: this.state.value === 0 ? this.state.classes.thumbTransparent:this.state.classes.thumb,
                    rail: this.state.classes.rail,
                    track: this.state.classes.track,
                    valueLabel: this.state.classes.valueLabel,
                    mark: this.state.classes.mark
                }}
                valueLabelDisplay="off"
                value={this.state.value}
                disabled={true}
                getAriaValueText={valuetext}
                step={10}
                marks={this.state.rows.map((i: any) => ({
                    label: i.toLocaleString(),
                    value: i
                }))}
                min={this.state.rows[0]}
                max={this.state.rows[1]}
            /></div>
        );
    }
}

export default function MyRangePrah(props:any){
    const classes = useStyles();

        return (<RangePrah value={props.valueTable} classes={classes} cultivo={props.cultivo} year={props.year} isMontos={props.isMontos} environment={props.environment} cors={props.corsEnabled}/>)
}
