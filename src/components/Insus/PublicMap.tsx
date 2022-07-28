import React, {Component,Fragment} from "react";
import OlMap from 'ol/Map';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlStyle from "ol/style/Style";
import WKT from "ol/format/WKT";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {Control, defaults as defaultControls} from 'ol/control';
import {getCenter} from 'ol/extent';
import * as bases from '../webmapservices';

import './PublicMap.css'
import 'ol/ol.css'
import BaseLayer from "ol/layer/Base";
import VectorSource from "ol/source/Vector";
import colormap from 'colormap';
import {Fill, Stroke} from "ol/style";
import {Extent, Select} from "ol/interaction";
import {transformExtent} from 'ol/proj';
import {MapServiceEstadosCount, MapServiceInsusCount, MapServiceInsusGet, MapServiceMexicoGet,} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";
import {Overlay} from "ol";

interface PublicMapState{
    center:[],
    extent:[],
    zoom:any,
    filter:string,
    level:number,
    year:number,
    isMontos:boolean,
    reiniciar:boolean
}

let appliedLayers: BaseLayer[];
let counterLayers = 1;
let turnCapaTerritorio = false;
let nShades = 10;

let ramp = colormap({
    colormap: 'autumn',
    nshades: nShades,
    format:'hex',
});

const mapExtent = [-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293];
const mapLayers: BaseLayer[] = [
    new OlLayerTile({
        source: bases.s1
    }),
    new OlLayerTile({
        source: bases.s2
    }),
    new OlLayerTile({
        source: bases.s3
    }),
    new OlLayerTile({
        source: bases.b3
    }),
    new OlLayerTile({
        source: bases.o1
    })
]

let agaveLayer = new OlLayerVector({
    opacity:0.8,
    style: function (feature,resolution) {
            const importe = feature.get('importe_t');
            const max = feature.get('max');
            const min = feature.get('min');
            let color = getColor(importe,max,min)
        return new OlStyle({stroke: new Stroke({color:"#fff", width:0.1}),fill:new Fill({color:color})});
        },
    source: new VectorSource({features:undefined})
});
const element = document.getElementById('popup');

const popup = new Overlay({
    // @ts-ignore
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -10],
});

function clamp(value:number, low:number, high:number) {
    return Math.max(low, Math.min(value, high));
}

function getColor(importe_t:number,min:number,max:number) {
    const f = Math.pow(clamp((importe_t - min) / (max - min), 0, 1), 1 / 2);
    const index = Math.round(f * (nShades - 1));
    return ramp[index];
}

function actualizarLayers(sup:any){
    appliedLayers.map(layer => sup.removeLayer(layer));
    appliedLayers = turnCapaTerritorio ? [mapLayers[counterLayers-1],mapLayers[4],agaveLayer] : [mapLayers[counterLayers-1],agaveLayer]
    appliedLayers.map(layer => sup.addLayer(layer))
}
const CapaTerritorial = /*@__PURE__*/(function (Control) {
    function ChangeLayer(opt_options:any) {

        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-earth';
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'capa-territorio ol-unselectable ol-control';
        element.appendChild(button);

        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });

        // @ts-ignore
        button.addEventListener('click', this.handleChangeTerritorio.bind(this), false);
    }

    if ( Control ) ChangeLayer.__proto__ = Control;
    ChangeLayer.prototype = Object.create( Control && Control.prototype );
    ChangeLayer.prototype.constructor = ChangeLayer;

    ChangeLayer.prototype.handleChangeTerritorio = function handleChangeTerritorio () {
        turnCapaTerritorio = !turnCapaTerritorio;
        actualizarLayers(this.getMap())
    };
    return ChangeLayer;
}(Control));

const CambioCapaBase = /*@__PURE__*/(function (Control) {
    function ChangeLayer(opt_options:any) {

        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-earth';
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'capa-base ol-unselectable ol-control';
        element.appendChild(button);

        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });

        // @ts-ignore
        button.addEventListener('click', this.handleChangeLayer.bind(this), false);
    }

    if ( Control ) ChangeLayer.__proto__ = Control;
    ChangeLayer.prototype = Object.create( Control && Control.prototype );
    ChangeLayer.prototype.constructor = ChangeLayer;

    ChangeLayer.prototype.handleChangeLayer = function handleChangeLayer () {

        counterLayers+=1;
        if(counterLayers === 5){
            counterLayers = 1;
        }
        actualizarLayers(this.getMap())

    };
    return ChangeLayer;
}(Control));


export default class PublicMap extends Component<any, PublicMapState> {
    private olmap: any;
    private select = new Select();
    private selectedFeatures = this.select.getFeatures();
    constructor(props:any) {
        super(props);
        this.state = {extent:this.props.information.extent, center: this.props.information.center, zoom: 5.2,filter:this.props.information.cve_geo,level:this.props.information.level,year:this.props.year,isMontos:this.props.isMontos,reiniciar:this.props.reiniciar};//filter:"MEX",level:3 };//filter:"21156",level:1 };//filter:"MEX",level:3 };//filter:"26",level:2 };
        this.olmap = new OlMap({
            view: new OlView({
                //center: this.state.center,
                zoom:5.2,
                maxZoom:this.state.zoom,
                extent:this.state.extent,
            }),
            //@ts-ignore
            controls:defaultControls().extend([new CapaTerritorial(), new CambioCapaBase(),new ScaleLine(), new MousePosition()]),

        });
        this.olmap.addInteraction(this.select)
        appliedLayers = [mapLayers[0]];
        this.olmap.addLayer(appliedLayers[0]);
    }
    showEstados(map:any){
        const pgsize = 3000;
        const extent = map.getView().calculateExtent();
        const transform = transformExtent(extent,'EPSG:3857','EPSG:4326')
        const handleSubmit = async () => {
            let poligon = [{
                filter:this.state.filter, xmin:transform[0], ymin:transform[1], xmax:transform[2], ymax:transform[3], cors:false, environment:Environments.DEV
            }]
            let conteo = await Promise.all((await Promise.all(poligon.map(object =>this.state.level === 1 ? MapServiceInsusCount(this.state.year,object.filter,object.xmin,object.ymin,object.xmax,object.ymax,object.cors,object.environment) :MapServiceEstadosCount(this.state.year,object.filter,object.xmin,object.ymin,object.xmax,object.ymax,object.cors,object.environment)))).map(result => result.json()))
            nShades = conteo[0] > 2 ? conteo[0] : 2;
            ramp = colormap({
                colormap: 'autumn',
                nshades: nShades,
                format:'hex',
            });
            let hilos = conteo[0]/pgsize + ((conteo[0]%pgsize>0)?1:0)
            let rows = []
            for(var i = 0; i < hilos; i++){
                rows.push(this.state.level === 1 ?MapServiceInsusGet(this.state.isMontos,this.state.year,i,pgsize,this.state.filter,transform[0],transform[1],transform[2],transform[3],false,Environments.DEV) :MapServiceMexicoGet(this.state.isMontos,this.state.year,i, pgsize,this.state.filter,transform[0],transform[1],transform[2],transform[3],false,Environments.DEV))
            }
            let results = await Promise.all((await Promise.all(rows)).map(result => result.json()))
            let ag = results.map(data => data.map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}) ))
            ag.map((data,array) => data.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; importe_t: any; max: any; min: any; }) => any; }, index:number) => geo.setProperties({id:results[array][index].id, cvegeo: results[array][index].cvegeo, importe_t: results[array][index].importe_t,max: results[array][index].max,min: results[array][index].min})  ))
            let arrayFinal = [];
            for(let i = 0; i < ag.length; i ++){
                for(let j = 0; j < ag[i].length; j++){
                    arrayFinal.push(ag[i][j])
                }
            }
            return arrayFinal;
    }

    handleSubmit()
        .then(
            (wkt) =>{
                agaveLayer.getSource().clear()
                agaveLayer.getSource().addFeatures(wkt)
                actualizarLayers(map)
            }
        )
}

    updateMap() {
        this.olmap.setView(new OlView({
            center: this.state.center,
            zoom: this.state.zoom,
            minZoom:this.state.zoom,
            maxZoom:this.state.level === 1 ? 17:this.state.zoom +2 ,
            extent:this.state.extent,
        }))
        
    }

    componentDidMount() {
        console.log("mount")
        this.updateMap();
        this.showEstados(this.olmap);
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
            this.showEstados(this.olmap)
        });

        this.olmap.on('pointermove', (event: any) => {
            if (this.olmap.hasFeatureAtPixel(event.pixel)) {
                this.olmap.getViewport().style.cursor = 'pointer';
            } else {
                this.olmap.getViewport().style.cursor = 'inherit';
            }
        });

        this.selectedFeatures.on('add', () =>{
            console.log("ADD")
            this.props.cultivoCallback({id:this.selectedFeatures.item(0).getProperties().id,cve_geo:this.selectedFeatures.item(0).getProperties().cvegeo,type:this.state.filter,level:this.state.level,extent:this.selectedFeatures.item(0).getGeometry().getExtent(),center:getCenter(this.selectedFeatures.item(0).getGeometry().getExtent())})
        });
        this.selectedFeatures.on('remove',() =>{
            console.log("REMOVE")
            this.props.cultivoCallback(undefined);
        })
    }

    componentWillUnmount(){
        console.log("UNMOUNT")
        this.olmap.dispose()
    }
    shouldComponentUpdate(nextProps:any, nextState:any) {
        //let center = this.olmap.getView().getCenter();
        //let zoom = this.olmap.getView().getZoom();
        //let isUpdate = !(center === nextState.center && zoom === nextState.zoom)
        let isUpdate = nextProps.information.cve_geo !== this.state.filter
        console.log(this.props.information)
        return isUpdate;
    }


    componentDidUpdate(props:any){
        this.props.cultivoCallback(undefined);
        this.setState({filter:props.information.cve_geo,level:props.information.level,extent:props.information.extent,center:props.information.center,zoom:(props.information.level === 2? 6.2 : props.information.level === 1? 8.2 : 5.2)})
        this.showEstados(this.olmap)
        this.updateMap();
    }

    render() {

        return (
            <Fragment>
                <div id="map">
                </div>
            </Fragment>


        );
    }
}


