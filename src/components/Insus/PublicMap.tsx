import React, {Component} from "react";
import OlMap from 'ol/Map';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlStyle from "ol/style/Style";
import WKT from "ol/format/WKT";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {Control, defaults as defaultControls} from 'ol/control';
import * as bases from '../webmapservices';

import './PublicMap.css'
import 'ol/ol.css'
import BaseLayer from "ol/layer/Base";
import VectorSource from "ol/source/Vector";
import colormap from 'colormap';
import {Fill, Stroke} from "ol/style";
import {Select} from "ol/interaction";
import {transformExtent} from 'ol/proj';
import {MapServiceEstadosCount, MapServiceInsusCount, MapServiceInsusGet, MapServiceMexicoGet,} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";

interface PublicMapState{
    center:any,
    zoom:any,
    filter:string,
    level:number
}

let appliedLayers: BaseLayer[];
let counterLayers = 1;
let turnCapaTerritorio = false;
let nShades = 10;
const ramp = colormap({
    colormap: 'autumn',
    nshades: nShades,
    format:'hex',
    alpha:1
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
        this.state = { center: [-11397253.55045682,2806837.5334897055], zoom: 5.2,filter:"21156",level:1 };//filter:"MEX",level:3 };//filter:"26",level:2 };
        this.olmap = new OlMap({
            view: new OlView({
                //center: this.state.center,
                zoom: this.state.zoom,
                //minZoom:3,
                maxZoom:17,
                extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293],
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
            let conteo = await Promise.all((await Promise.all(poligon.map(object =>this.state.level === 1 ? MapServiceInsusCount(object.filter,object.xmin,object.ymin,object.xmax,object.ymax,object.cors,object.environment) :MapServiceEstadosCount(object.filter,object.xmin,object.ymin,object.xmax,object.ymax,object.cors,object.environment)))).map(result => result.json()))
            nShades = conteo[0];
            let hilos = conteo[0]/pgsize + ((conteo[0]%pgsize>0)?1:0)
            let rows = []
            for(var i = 0; i < hilos; i++){
                rows.push(this.state.level === 1 ?MapServiceInsusGet(i,pgsize,this.state.filter,transform[0],transform[1],transform[2],transform[3],false,Environments.DEV) :MapServiceMexicoGet(i, pgsize,this.state.filter,transform[0],transform[1],transform[2],transform[3],false,Environments.DEV))
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
                agaveLayer!.getSource()!.addFeatures(wkt)
                actualizarLayers(map)
            }
        )
}

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);

    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
            this.showEstados(this.olmap)

        });
        this.selectedFeatures.on('add', () =>{
            //console.log(selectedFeatures.item(0).getProperties());
            this.props.cultivoCallback({id:this.selectedFeatures.item(0).getProperties().id,type:this.state.filter,level:this.state.level})
        });
        this.selectedFeatures.on('remove',() =>{
            this.props.cultivoCallback(undefined);
        })

    }

    shouldComponentUpdate(nextProps:any, nextState:any) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();

        //console.log(" center: "+this.state.center + ":"+ this.state.zoom);
        return !(center === nextState.center && zoom === nextState.zoom);
    }

    render() {
        this.updateMap();
        return (
                <div id="map">

                </div>

        );
    }
}


