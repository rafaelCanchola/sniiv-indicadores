import React, {Component} from "react";
import crossfilter from "crossfilter2";
import {timeFormat,timeParse,format} from 'd3'

export const CxDContext = React.createContext("CumplimientoContext");
export const  dateFormatSpecifier = '%m/%d/%Y';
export const dateFormat = timeFormat(dateFormatSpecifier);
export const dateFormatParser = timeParse(dateFormatSpecifier);
export const numberFormat = format('.2f');

interface DataProps{
    data: any;
    seccion: string;
    aAxis: string;
    bAxis: string;
    cAxis: string;
    dAxis: string;
    eAxis: string;
    fAxis: string;
    gAxis: string;
    hAxis: string;
}

export class DataContext extends Component<DataProps, any> {
    private ndx: any;
    constructor(props:any) {
        super(props);
        this.state = {loading: false, hasNDX: false};
    }

    componentDidMount(){

        if (this.state.hasNDX){
            return
        }
        if(this.state.loading){
            return
        }
        this.setState({loading:true})

        this.ndx = crossfilter(this.props.data);
        this.setState({loading:false,hasNDX:true});
    }

    render() {
        if(!this.state.hasNDX){
            return null;
        }
        return (
            //@ts-ignore<CxDContext.Provider value={{ndx:this.ndx,dashboard:this.props.seccion,valueAxis:this.props.group, dimensionAxis:this.props.dimensionAxis, groupAxis:this.props.groupAxis, estados:this.props.estadosAxis, segmentoAxis:this.props.segmentoAxis}}>
            <CxDContext.Provider value={{ndx:this.ndx, seccion:this.props.seccion, aAxis:this.props.aAxis, bAxis:this.props.bAxis, cAxis:this.props.cAxis, dAxis:this.props.dAxis, eAxis:this.props.eAxis, fAxis:this.props.fAxis, gAxis:this.props.gAxis, hAxis:this.props.hAxis}}>
                <div ref={//@ts-ignore
                    this.parent}>
                    {this.props.children}
                </div>
            </CxDContext.Provider>
        );
    }
}
