import TileWMS from "ol/source/TileWMS";
import BingMaps from "ol/source/BingMaps";
import OlSourceOSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

export const s1 = new XYZ({
    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
})
export const s2 = new BingMaps({
    key: 'amfAnRjTIm48e7NZMldv~TuD6dffwFNPxlLOamTq9LA~ArK4pT3FVt09LAWns-qeuTYH1yEaIaUu2DsH1ua9yb92hKVdb_R7twdVina_X9gv',
    imagerySet: 'Road'
})
export const s3 = new BingMaps({
    key: 'amfAnRjTIm48e7NZMldv~TuD6dffwFNPxlLOamTq9LA~ArK4pT3FVt09LAWns-qeuTYH1yEaIaUu2DsH1ua9yb92hKVdb_R7twdVina_X9gv',
    imagerySet: 'AerialWithLabels'
})

export const b3 =
    new OlSourceOSM()

export const b4 =
    new TileWMS({
        params: {
            layers:'ORTOIMAXIV',
            format:'png'
        },
        url:'http://187.191.14.5/ermex2/XIV_CNv1.exe'
    })

export const o1 =
    new TileWMS({
        params: {
            layers: "estados_mapas_dinamicos,estados_mapas_dinamicos_textos",
        },
        url:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map',
        projection:'EPSG:3857',
    })