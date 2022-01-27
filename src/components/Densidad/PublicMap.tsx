import React, { Component } from "react";
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
import {Fill, Stroke} from "ol/style";
import {Select} from "ol/interaction";
import {transformExtent} from 'ol/proj';
import FetchURL from "../FetchURL";

interface PublicMapState{
    center:any,
    zoom:any
}

let userCreds:any;

const mapExtent = [-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293];
const mapLayers: BaseLayer[] = [
    new OlLayerTile({
        source: bases.b2
    }),
    new OlLayerTile({
        source: bases.b3
    }),
    new OlLayerTile({
        source: bases.b4
    }),
]

let agaveLayer = new OlLayerVector({

    opacity:0.8,
    style: function (feature,resolution) {
            const dens = feature.get('dens_ha');
            let color:any ;
            if (dens >= 0.08 && dens <= 174.29) {
                color='#FDF4EE';
            }
            else if (dens >= 174.30 && dens <= 390.63) {
                color='#F1B99E';
            }
            else if (dens >= 390.64 && dens <= 830.00) {
                color='#E76E4C';
            }
            else if (dens >= 830.01 && dens <= 1542.86) {
                color='#BA3124';
            }
            else{
                color='#531212';
            }
        return new OlStyle({stroke: new Stroke({color:"#fff", width:0.1}),fill:new Fill({color:color})});
        },
    source: new VectorSource({features:undefined})
});


let appliedLayers: BaseLayer[];
let counterLayers = 1;
let isAgaveLayerOn = false;

let select = new Select();
let selectedFeatures = select.getFeatures();

function actualizarLayers(sup:any){
    appliedLayers.map(layer => sup.removeLayer(layer));
    switch (counterLayers){
        case 1:
            appliedLayers = [mapLayers[0],agaveLayer];
            break;
        case 2:
            appliedLayers = [mapLayers[1],agaveLayer];
            break;
        case 3:
            appliedLayers = [mapLayers[2],agaveLayer];
            break;
    }
    appliedLayers.map(layer => sup.addLayer(layer))

}

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
        if(counterLayers === 4){
            counterLayers = 1;
        }
        actualizarLayers(this.getMap())

    };
    return ChangeLayer;
}(Control));

const MostrarAgave = /*@__PURE__*/(function (Control) {

    function ShowAgave(opt_options:any) {
        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-group';
        button.id = "agave-button";
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'mostrar-agave ol-unselectable ol-control';
        element.appendChild(button);
        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });
        // @ts-ignore
        button.addEventListener('click', this.handleShowAgave.bind(this), false);
    }

        if ( Control ) ShowAgave.__proto__ = Control;
        ShowAgave.prototype = Object.create( Control && Control.prototype );
        ShowAgave.prototype.constructor = ShowAgave;

        ShowAgave.prototype.handleShowAgave = function handleShowAgave () {
            const filter =0;
            const pgsize = 3000;
            const extent = this.getMap().getView().calculateExtent();
            const transform = transformExtent(extent,'EPSG:3857','EPSG:4326')
            const xmin = transform[0];
            const ymin = transform[1];
            const xmax = transform[2];
            const ymax = transform[3];
            //console.log(extent)
            //console.log(transform)
            //@ts-ignore
            const handleSubmit = async () => {
                const pruebas = 'https://sniivenv-env.eba-p3fj2kfp.us-east-2.elasticbeanstalk.com/api/poligonosconteo';
                const local = 'http://localhost:5000/api/poligonosconteo';
                let route = pruebas +'?&filter='+filter+
                    '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax;
                let conteo = await fetch(route, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                conteo = await conteo.json()
                // @ts-ignore
                let hilos = parseInt(conteo/pgsize) + ((conteo%pgsize>0)?1:0)
                let rows = []
                for(var i = 0; i < hilos; i++){
                    rows.push(downloadPolygons({filter, pgnumber:i, pgsize,  xmin, ymin, xmax, ymax}))
                }
                const results = await Promise.all(rows)

                const dataPromises = results.map(result => result.json())
                const finalData = await Promise.all(dataPromises)
                let ag = finalData.map(data => data.map((geo: { the_geom: any; }) => new WKT().readFeature(geo.the_geom,{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}) ))
                ag.map((data,array) => data.map((geo: { setProperties: (arg0: { id: any; cvegeo: any; dens_ha: any; }) => any; }, index:number) => geo.setProperties({id:finalData[array][index].id, cvegeo: finalData[array][index].cvegeo, dens_ha: finalData[array][index].dens_ha})  ))
                let arrayFinal = [];
                for(let i = 0; i < ag.length; i ++){
                    for(let j = 0; j < ag[i].length; j++){
                        arrayFinal.push(ag[i][j])
                    }
                }
                return arrayFinal;
            }
            isAgaveLayerOn = !isAgaveLayerOn;
            if(isAgaveLayerOn){
                const buttonAga = document.getElementById("agave-button");
                // @ts-ignore
                buttonAga.disabled = true;
                // @ts-ignore
                buttonAga.style.cursor = "wait";
                //@ts-ignore
                buttonAga.children.item(0).className = "icon-flickr2";
                handleSubmit()
                    .then(
                        (wkt) =>{
                            agaveLayer.getSource().addFeatures(wkt)
                            actualizarLayers(this.getMap())
                            // @ts-ignore
                            document.getElementById("agave-button").style.backgroundColor = "#BA3124"
                        }
                    )
                    .catch(
                    ()=> isAgaveLayerOn = false
                    )
                    .finally(
                        () => {
                            // @ts-ignore
                            document.getElementById("agave-button").disabled=false;
                            // @ts-ignore
                            document.getElementById("agave-button").style.cursor ="pointer";
                            //@ts-ignore
                            document.getElementById("agave-button").children.item(0).className = "icon-group";
                        }
                    )

            }else{
                agaveLayer.getSource().clear();
                // @ts-ignore
                document.getElementById("agave-button").style.backgroundColor = "lightslategray";
            }
        };
        return ShowAgave;
    }(Control));



function downloadPolygons(cultivo:any) {
    const local = 'http://localhost:5000/api/poligonos';
    const pruebas = 'https://sniivenv-env.eba-p3fj2kfp.us-east-2.elasticbeanstalk.com/api/poligonos';

    let route =
        pruebas +'?&filter='+cultivo.filter+
        '&pgnumber=' + cultivo.pgnumber + '&pgsize=' + cultivo.pgsize +
        '&xmin=' + cultivo.xmin + '&xmax=' + cultivo.xmax + '&ymin=' + cultivo.ymin + '&ymax=' + cultivo.ymax;
    return fetch(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export default class PublicMap extends Component<any, PublicMapState> {
    private olmap: any;

    constructor(props:any) {
        super(props);
        userCreds = this.props.user;
        this.state = { center: [-11397253.55045682,2806837.5334897055], zoom: 5.2 };
        this.olmap = new OlMap({
            view: new OlView({
                //center: this.state.center,
                zoom: this.state.zoom,
                //minZoom:3,
                maxZoom:17,
                extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293],

            }),
            //@ts-ignore
            controls:defaultControls().extend([new CambioCapaBase(), new MostrarAgave(), new ScaleLine(), new MousePosition()]),

        });
        this.olmap.addInteraction(select)
        appliedLayers = [mapLayers[0]];
        this.olmap.addLayer(appliedLayers[0]);
        //actualizarLayers(this.olmap.getMap());
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
        });
        selectedFeatures.on('add', () =>{
            //console.log(selectedFeatures.item(0).getProperties());
            this.props.cultivoCallback(selectedFeatures.item(0).getProperties().id)
        });
        selectedFeatures.on('remove',() =>{
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
        this.updateMap(); // Update map on render?
        return (
                <div id="map">

                </div>

        );
    }
}


