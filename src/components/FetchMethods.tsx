import {Environments} from "../redux/reducers/environment";

const ALFRESCO_URL = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/'
const LOCAL_URL = 'http://172.16.15.94:8083/gis-api/'
const MY_URL = 'http://localhost:8084/gis-api/' //LOCAL_URL
const DV_URL = 'https://dev-sniiv.sedatu.gob.mx/gis-api/'
const QA_URL = 'https://qa-sniiv.sedatu.gob.mx/gis-api/'
const PR_URL = 'https://sniiv.sedatu.gob.mx/gis-api/'
const SNIIV_URL = 'https://sniiv.sedatu.gob.mx/'
const SNIIV_QA_URL = 'https://qa-sniiv.sedatu.gob.mx/'
const SNIIV_DV_URL = 'https://dev-sniiv.sedatu.gob.mx/'
const SNIIV_LOCAL_URL = 'http://localhost:3000/'
const SNIIV_CORS_SERVER = 'https://sniiv-cors.onrender.com/'
const LOCAL_CORS_SERVER = 'http://172.16.15.94:8080/'
const SNIIV_API_GET_LAST_YEAR = 'api/IndicadoresAPI/GetLastYear'
const SNIIV_API_GET_LAST_TRIMESTRE = 'api/IndicadoresAPI/GetLastTrimestre/'
const HTTP_METHOD_GET = 'GET'
const HTTP_METHOD_POST = 'POST'
const CORS = 'cors'
const REFERRER_POLICY = 'strict-origin-when-cross-origin'
const TYPE_JSON = 'application/json'
const API_POLI_MEXICO_COUNT = "poligonosmexicoconteo"
const API_POLI_INSUS_COUNT = "poligonosconteo"
const API_POLI_INSUS_GET= "poligonosinsus"
const API_POLI_MEXICO_GET= "poligonosmexico"
const API_POLI_LOAD = "uploadchargepoli"
const API_PNV_LOAD = "uploadpnv"
const API_PNV_REPORTE_LOAD = "uploadpnvreporte"
const API_REPORTE_MENSUAL_LOAD = "uploadreportemensual"
const API_POLI_INSUS_INFO = "predioidentify"
const API_POLI_INSUS_PERIODO = "periodo"
const API_POLI_INSUS_PERIODO_ALL = "allPeriodos"
const API_POLI_MEXICO_RANGES = "poligonosmexicomaxmin"
const API_POLI_INSUS_RANGES = "poligonosinsusmaxmin"

const AlfrescoEndpointsSelector={
    1 : API_POLI_LOAD,
    2 : API_PNV_LOAD,
    3 : API_PNV_REPORTE_LOAD,
    4 : API_REPORTE_MENSUAL_LOAD
}

const EnvironmentGisUrlSelector={
    LOCAL : LOCAL_URL,//MY_URL,
    DEV : DV_URL,
    QA : QA_URL,
    PR : PR_URL
}

const EnvironmentSniivUrlSelector={
    LOCAL : SNIIV_LOCAL_URL,
    DEV : SNIIV_DV_URL,
    QA : SNIIV_QA_URL,
    PR : SNIIV_URL
}
function FetchUrl(apiRoute:string){
    return fetch( apiRoute, {method: HTTP_METHOD_GET, mode:CORS, referrerPolicy:REFERRER_POLICY,})
}
export function FetchProxyUrl(apiRoute:string){
    return fetch( SNIIV_CORS_SERVER+apiRoute, {method: HTTP_METHOD_GET, mode:CORS, referrerPolicy:REFERRER_POLICY,})
}
function FetchGetJson(apiRoute:string){
    return fetch( apiRoute, {method: HTTP_METHOD_GET, headers: {'Content-Type': TYPE_JSON},})
}
function FetchPostJson(apiRoute:string,data:any){
    return fetch( apiRoute, {method: HTTP_METHOD_POST, body: data, headers: {'Access-Control-Allow-Origin': '*'},})
}
function MapServiceUrl(name:string, cors:boolean, environment:Environments){
    return (cors ? (environment === Environments.QA? LOCAL_CORS_SERVER :  SNIIV_CORS_SERVER ): '') + (EnvironmentGisUrlSelector[environment]) + name;
}
export function AlfrescoUrl(object:string, name:string, cors:boolean){
    return (cors ? SNIIV_CORS_SERVER : '') + ALFRESCO_URL + object + '/content/' + name + '?a=true'
}
export function MapServiceInsusCount(year:number,filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_COUNT+'?&year='+year+'&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment));
}
export function MapServiceEstadosCount(year:number,filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_MEXICO_COUNT+'?&year='+year+'&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment));
}
export function MapServiceInsusGet(isMontos:boolean,year:number,pgnumber:number, pgsize:number, filter:string,xmin:number,ymin:number,xmax:number,ymax:number, isPolygon:boolean, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_GET+'?&isMontos='+isMontos+'&year='+year+'&filter='+filter+ '&pgnumber=' + pgnumber + '&pgsize=' + pgsize + '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax+ '&isPoligono=' + isPolygon,cors,environment))
}
export function MapServiceMexicoGet(isMontos:boolean,year:number,pgnumber:number, pgsize:number, filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_MEXICO_GET+'?&isMontos='+isMontos+'&year='+year+'&filter='+filter+ '&pgnumber=' + pgnumber + '&pgsize=' + pgsize + '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
}
export function MapServiceInsusPoliInfo(isMontos:boolean,year:number,idPoli:number,level:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_INFO+'?&isMontos='+isMontos+'&year='+year+'&id='+idPoli+'&level='+level,cors,environment))
}
export function MapServiceInsusPost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_POLI_LOAD,cors,environment),formData)
}
export function MapServiceInsusGetPeriodo(cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_PERIODO,cors,environment))
}
export function MapServiceInsusGetAllPeriodos(cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_PERIODO_ALL,cors,environment))
}
export function MapServiceInsusGetRanges(isMontos:boolean,year:number,filter:string,xmin:number,ymin:number,xmax:number,ymax:number,cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_RANGES+'?&isMontos='+isMontos+'&year='+year+'&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
}
export function MapServiceMexicoGetRanges(isMontos:boolean,year:number,filter:string,xmin:number,ymin:number,xmax:number,ymax:number,cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_MEXICO_RANGES+'?&isMontos='+isMontos+'&year='+year+'&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
}
export function PnvCsvPost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_PNV_LOAD,cors,environment),formData)
}
export function PnvReportePost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_PNV_REPORTE_LOAD,cors,environment),formData)
}

export function AbstractPost(type:number,formData:any, cors:boolean, environment:Environments){
    // @ts-ignore
    return FetchPostJson(MapServiceUrl(AlfrescoEndpointsSelector[type],cors,environment),formData)
}

export function SniivUrl(name:string, cors:boolean, environment:Environments){
    return (cors ? (environment === Environments.QA? LOCAL_CORS_SERVER :  SNIIV_CORS_SERVER ) : '') + (EnvironmentSniivUrlSelector[environment]) + name;
}

export async function FetchSyncronized(objects:any[]){
    return await Promise.all((await Promise.all(objects.map(object => FetchUrl(object)))).map(result => result.json()))
}

export async function GetYearTrimestre(cors:boolean,environmentProd:Environments){
    let yearTrimestre = []
    let year = await FetchSyncronized([SniivUrl(SNIIV_API_GET_LAST_YEAR,cors,environmentProd)])
    yearTrimestre[0] = year[0].anio;
    let trimestre = await FetchSyncronized([SniivUrl(SNIIV_API_GET_LAST_TRIMESTRE+yearTrimestre[0],cors,environmentProd)])
    yearTrimestre[1] = trimestre[0].trimestre;
    return yearTrimestre
}

export async function GetLastTrimestre(year:number,cors:boolean,environmentProd:Environments){
    let trimestre = await FetchSyncronized([SniivUrl(SNIIV_API_GET_LAST_TRIMESTRE+year,cors,environmentProd)])
    return trimestre[0].trimestre;
}

export function SniivEnvironmentUrl(cors:boolean,environmentProd:Environments){
    // @ts-ignore
    return (cors ? SNIIV_CORS_SERVER : '') + EnvironmentSniivUrlSelector[environmentProd]

}

