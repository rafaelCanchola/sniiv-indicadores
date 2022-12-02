import React, {Component,Fragment} from "react";
import OlMap from 'ol/Map';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlStyle from "ol/style/Style";
import WKT from "ol/format/WKT";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {Attribution, Control, defaults as defaultControls} from 'ol/control';
import {boundingExtent, getCenter} from 'ol/extent';
import * as bases from '../webmapservices';

import './PublicMap.css'
import 'ol/ol.css'
import Cluster from 'ol/source/Cluster';
import BaseLayer from "ol/layer/Base";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Text from "ol/style/Text"
import colormap from 'colormap';
import {Fill, Stroke} from "ol/style";
import {Select} from "ol/interaction";
import {transformExtent} from 'ol/proj';
import {
    MapServiceEstadosCount,
    MapServiceInsusCount,
    MapServiceInsusGet,
    MapServiceMexicoGet,
} from "../FetchMethods";
import {Environments} from "../../redux/reducers/environment";
import {Feature, Overlay} from "ol";
import fetchJsonp from "fetch-jsonp";
import {connect} from "react-redux";
import loader from "../../assets/images/loading-23.gif";
import {Geometry, Point} from "ol/geom";
import ResizeObserver from 'rc-resize-observer';

interface PublicMapState{
    center:number[],
    extent:[],
    capas:[],
    zoom:any,
    filter:string,
    level:number,
    year:number,
    isMontos:boolean,
    reiniciar:boolean
}

let appliedLayers: BaseLayer[];
let counterLayers = 1;
let nShades = 10;

let capasCall = [0,0,0,0,0];
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
        source: bases.o2,
        opacity:0.6
    }),
    new OlLayerTile({
        source: bases.o1,
        opacity:0.6
    }),
    new OlLayerTile({
        source: bases.o3,
        opacity:0.8
    }),
    new OlLayerTile({
        source: bases.o4,
        opacity:0.8
    })
]

let styleCache:any = {};
let distanceInput = 40;
let minDistanceInput = 15;

function clusterLayer(myFeatures:any){
    return new OlLayerVector({
        source: new Cluster({
            distance: distanceInput,
            minDistance: minDistanceInput,
            source: myFeatures
        }),
        style: function (feature) {

            const size = feature.get("features").length;
            let style = styleCache[size];
            if (!style) {
                style = new Style({
                    image: new CircleStyle({
                        radius: 10,
                        stroke: new Stroke({
                            color:"#fff", width:2
                        }),
                        fill: new Fill({
                            color: "#164f2f",
                        }),
                    }),
                    text: new Text({
                        text: size.toString(),
                        fill: new Fill({
                            color: '#fff',
                        }),
                    }),
                });
                styleCache[size] = style;
            }
            return style;
        },
    });
}

let agaveLayer = new OlLayerVector({
    opacity:0.4,
    style: function (feature,resolution) {
            const importe = feature.get('importe_t');
            const max = feature.get('max');
            const min = feature.get('min');
            let color = getColor(importe,max,min)
        return new OlStyle({stroke: new Stroke({color:"#000", width:2}),fill:new Fill({color:color})});
        },
    source: new VectorSource({features:undefined})
});

let globalClusterLayer: any;

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
    appliedLayers = [mapLayers[counterLayers-1]]//,(capasCall[0] === 1 && mapLayers[4]),capasCall[1],capasCall[2],capasCall[3],capasCall[4]]
    if(capasCall[0] === 1){
        appliedLayers.push(mapLayers[4])
    }
    if(capasCall[2] === 1){
        appliedLayers.push(mapLayers[5])
    }
    if(capasCall[1] === 1){
        appliedLayers.push(agaveLayer);
        if(globalClusterLayer != null){
            appliedLayers.push(globalClusterLayer);
        }
    }
    if(capasCall[3] === 1){
        appliedLayers.push(mapLayers[6])
    }
    if(capasCall[4] === 1){
        appliedLayers.push(mapLayers[7])
    }
    appliedLayers.map(layer => sup.addLayer(layer))
}


class CambioCapaBase extends Control {
    constructor(opt_options:any) {
        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-earth';
        button.appendChild(icon);
        const element = document.createElement('div');
        element.className = 'capa-base ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleChangeLayer.bind(this), false);
    }
    handleChangeLayer () {
        counterLayers+=1;
        if(counterLayers === 5){
            counterLayers = 1;
        }
        actualizarLayers(this.getMap())
    };
}

export default class PublicMap extends Component<any, PublicMapState> {
    private olmap: any;
    private select = new Select();
    private selectedFeatures = this.select.getFeatures();

    constructor(props: any) {
        super(props);
        this.state = this.getInitialState();
        //filter:"MEX",level:3 };//filter:"21156",level:1 };//filter:"MEX",level:3 };//filter:"26",level:2 };
        this.olmap = new OlMap({
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom,
                extent: this.state.extent,
            }),
            //@ts-ignore
            controls: defaultControls().extend([new CambioCapaBase(), new ScaleLine()]),//, new MousePosition()]),

        });
        capasCall = this.props.capas;
        this.olmap.addInteraction(this.select)
        appliedLayers = [mapLayers[0]];
        this.olmap.addLayer(appliedLayers[0]);
    }

    getInitialState(){
        return {
            extent: this.props.information.extent,
            center: this.props.information.center,
            zoom: 4.2,
            filter: this.props.information.cve_geo,
            level: this.props.information.level,
            year: this.props.year,
            isMontos: this.props.isMontos,
            reiniciar: this.props.reiniciar,
            capas: this.props.capas
        }
    }
    showEstados(map: any) {
        const pgsize = 3000;
        const {environment, corsEnabled} = this.props
        const extent = map.getView().calculateExtent();
        const transform = transformExtent(extent, 'EPSG:3857', 'EPSG:4326')
        const handleSubmit = async () => {
            let poligon = [{
                filter: this.state.filter,
                xmin: transform[0],
                ymin: transform[1],
                xmax: transform[2],
                ymax: transform[3],
                environment: environment,
                corsEnabled: corsEnabled
            }]
            let conteo = await Promise.all((await Promise.all(poligon.map(object => this.state.level === 1 ? MapServiceInsusCount(this.state.year, object.filter, object.xmin, object.ymin, object.xmax, object.ymax, object.corsEnabled, object.environment) : MapServiceEstadosCount(this.state.year, object.filter==="MEX"? object.filter : object.filter.substring(0,2), object.xmin, object.ymin, object.xmax, object.ymax, object.corsEnabled, object.environment)))).map(result => result.json()))
            nShades = conteo[0] > 2 ? conteo[0] : 2;
            ramp = colormap({
                colormap: 'autumn',
                nshades: nShades,
                format: 'hex',
            });
            let hilos = conteo[0] / pgsize + ((conteo[0] % pgsize > 0) ? 1 : 0)
            let rows = []
            let clusterRows=[]
            for (var i = 0; i < hilos; i++) {
                rows.push(this.state.level === 1 ? MapServiceInsusGet(this.state.isMontos, this.state.year, i, pgsize, this.state.filter, transform[0], transform[1], transform[2], transform[3],true, corsEnabled, environment) : MapServiceMexicoGet(this.state.isMontos, this.state.year, i, pgsize, this.state.filter==="MEX"? this.state.filter : this.state.filter.substring(0,2), transform[0], transform[1], transform[2], transform[3], corsEnabled, environment))
                clusterRows.push(this.state.level === 1 ? MapServiceInsusGet(this.state.isMontos,this.state.year,i,pgsize,this.state.filter,transform[0], transform[1], transform[2], transform[3],false, corsEnabled,environment): null)
            }
            let clusterResults = this.state.level === 1 ? await Promise.all((await Promise.all(clusterRows)).map(result => (result != null)?result.json():null)) :null
            let results = await Promise.all((await Promise.all(rows)).map(result => result.json()))
            //let clusterAg = clusterResults != null ? clusterResults.map(data => data.map((geo: { x: any;y:any; }) => new Feature(new Point([geo.x,geo.y])))) : null
            let clusterAg = clusterResults != null ? clusterResults.map(data => data.map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }))) : null
            let ag = results.map(data => data.map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })))

            ag.map((data, array) => data.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; importe_t: any; max: any; min: any; }) => any; }, index: number) => geo.setProperties({
                id: results[array][index].id,
                cvegeo: results[array][index].cvegeo,
                importe_t: results[array][index].importe_t,
                max: results[array][index].max,
                min: results[array][index].min
            })))
            let arrayFinal = [];
            for (let i = 0; i < ag.length; i++) {
                for (let j = 0; j < ag[i].length; j++) {
                    arrayFinal.push(ag[i][j])
                }
            }

            let clusterFinal = [];
            if(clusterAg != null){
                for (let i = 0; i < clusterAg.length; i++) {
                    for (let j = 0; j < clusterAg[i].length; j++) {
                        clusterFinal.push(clusterAg[i][j])
                    }
                }
            }
            let finalFeatures = [arrayFinal,clusterFinal]

            return finalFeatures;
        }

        handleSubmit()
            .then(
                (arrays) => {
                    let clusterArray = [];
                    agaveLayer.getSource()?.clear()
                    if(arrays[0] != null){
                        agaveLayer.getSource()?.addFeatures(arrays[0])
                    }
                    if(arrays[1].length > 0){
                        clusterArray = arrays[1]
                        globalClusterLayer = clusterLayer(new VectorSource({features:clusterArray}))
                        //this.updateMap(arrays[1][0].getGeometry().getExtent(),getCenter(arrays[1][0].getGeometry().getExtent()))

                        // @ts-ignore
                            //this.setState({extent:arrays[1][0].getGeometry().getExtent(),center:getCenter(arrays[1][0].getGeometry().getExtent())})

                        // @ts-ignore
                        //clusterLayer.setSource(new VectorSource({features:arrays[1]}))
                        //clusterLayer.getSource()?.addFeatures(arrays[1])
                    }else{
                        globalClusterLayer = null;
                    }

                    //this.updateMap(clusterArray.length >= 1 ?clusterArray[0].getGeometry().getExtent():[],clusterArray.length >= 1 ?getCenter(clusterArray[0].getGeometry().getExtent()):[])

                    actualizarLayers(map)
                }
            )
    }

    updateMap(clusterExtent:[] = [],clusterCenter:number[] =[]) {
        this.olmap.setView(new OlView({
            center:this.state.center,
            zoom: this.state.zoom ,
            minZoom: this.state.zoom - (this.state.level === 1 ? 3 : 1 ),
            maxZoom: (this.state.level === 1 || this.state.level === 3) ? 15 :  this.state.zoom + 3,
            extent:this.state.extent,
        }))
    }

    componentDidMount() {
        //this.updateMap();
        this.props.callbackLoading(true)
        this.showEstados(this.olmap);
        this.updateMap()
        this.olmap.setTarget("map");

        
        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({center, zoom});
            this.showEstados(this.olmap)
        });

        this.olmap.on('click', (event: any) => {

            if (this.state.capas !== null) {
                if (capasCall[3] === 1) {
                    let url = bases.o3.getFeatureInfoUrl(event.coordinate, this.olmap.getView().getResolution(), this.olmap.getView().getProjection(), {
                        'INFO_FORMAT': 'text/javascript',
                        'propertyName': ' nombre_ofe,precio,precio_min,precio_max,viviendas',
                        'QUERY_LAYERS': 'geonode:a__00_OFERTA_VIVIENDA'
                    })
                    if (typeof url === "string") {
                        fetchJsonp(url, {
                            jsonpCallbackFunction: 'parseResponse',
                        })
                            .then(r => r.json())
                            .then((data) => {
                                let feature = data.features[0];
                                this.props.featureMapaCallback(feature)
                            })
                    }
                }
                if (capasCall[4] === 1) {
                    if (capasCall[3] === 1) {
                        setTimeout(() => {
                            let url2 = bases.o4.getFeatureInfoUrl(event.coordinate, this.olmap.getView().getResolution(), this.olmap.getView().getProjection(), {
                                'INFO_FORMAT': 'text/javascript',
                                'propertyName': 'nombre_ofe,programa,tipologia,idg,co2,viviendas',
                                'QUERY_LAYERS': 'geonode:a__00_SISEVIVE_RUV'
                            })
                            if (typeof url2 === "string") {
                                fetchJsonp(url2, {
                                    jsonpCallbackFunction: 'parseResponse',
                                })
                                    .then(r => r.json())
                                    .then((data) => {
                                        let feature = data.features[0];
                                        this.props.featureSiseviveMapaCallback(feature)
                                    }).catch()
                            }
                        }, 3000);
                    } else {
                        let url2 = bases.o4.getFeatureInfoUrl(event.coordinate, this.olmap.getView().getResolution(), this.olmap.getView().getProjection(), {
                            'INFO_FORMAT': 'text/javascript',
                            'propertyName': 'nombre_ofe,programa,tipologia,idg,co2,viviendas',
                            'QUERY_LAYERS': 'geonode:a__00_SISEVIVE_RUV'
                        })
                        if (typeof url2 === "string") {
                            fetchJsonp(url2, {
                                jsonpCallbackFunction: 'parseResponse',
                            })
                                .then(r => r.json())
                                .then((data) => {
                                    let feature = data.features[0];
                                    this.props.featureSiseviveMapaCallback(feature)
                                })
                        }
                    }

                }
            }

        });
        this.olmap.on('pointermove', (event: any) => {
            if (this.olmap.hasFeatureAtPixel(event.pixel)) {
                this.olmap.getViewport().style.cursor = 'pointer';
            } else {
                this.olmap.getViewport().style.cursor = 'inherit';
            }
        });

        this.selectedFeatures.on('add', () => {
            console.log("ADD"+this.state.level)
            if(this.selectedFeatures.item(0).getProperties().id != null){
                this.props.cultivoCallback({
                    id: this.selectedFeatures.item(0).getProperties().id,
                    cve_geo: this.selectedFeatures.item(0).getProperties().cvegeo,
                    type: this.state.filter,
                    level: this.state.level,
                    extent: this.state.level == 3 ? this.selectedFeatures.item(0).getGeometry()?.getExtent():this.state.extent ,
                    center: this.state.level == 3 ? getCenter(this.selectedFeatures.item(0).getGeometry()!.getExtent()):this.state.center
                })
            }else{
                if (this.selectedFeatures.item(0).getProperties().features.length >= 1) {
                    const extent = boundingExtent(
                        this.selectedFeatures.item(0).getProperties().features.map((r:any) => r.getGeometry().getCoordinates())
                    );
                    this.olmap.getView().fit(extent, {duration: 1000, padding: [150, 150,150, 150]});

                }
            }
        });
        this.selectedFeatures.on('remove', () => {
            console.log("REMOVE")
            this.props.cultivoCallback(undefined);
        })
    }

    componentWillUnmount() {
        console.log("UNMOUNT")
        this.setState(this.getInitialState());
        this.olmap.dispose()
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        //let center = this.olmap.getView().getCenter();
        //let zoom = this.olmap.getView().getZoom();
        //let isUpdate = !(center === nextState.center && zoom === nextState.zoom)
        actualizarLayers(this.olmap)
        let isUpdate = nextProps.information.cve_geo !== this.state.filter || nextProps.information.level !== this.state.level
        return isUpdate;
    }


    componentDidUpdate(props: any) {
        this.props.cultivoCallback(undefined);
        this.setState({
            filter: props.information.cve_geo,
            level: props.information.level,
            extent: props.information.extent,
            center: props.information.center,
            zoom: ((props.information.level === 2 || props.information.level === 1 )? 6.2 : 3.2),//props.information.level === 1 ? 9.2 : 3.2),
        })
        this.props.callbackLoading(true)
        this.showEstados(this.olmap)
        actualizarLayers(this.olmap)
        this.updateMap();

    }

    render() {
        return (
            <div id="map">
            </div>
        );
    }
}




