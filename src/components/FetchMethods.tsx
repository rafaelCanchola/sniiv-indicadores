import {Environments} from "../redux/reducers/environment";

const ALFRESCO_URL = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/'
const LOCAL_URL = 'http://localhost:8080/api/'
const SNIIV_URL = 'https://sniiv.sedatu.gob.mx/'
const SNIIV_QA_URL = 'https://qa-sniiv.sedatu.gob.mx/'
const SNIIV_LOCAL_URL = 'http://localhost:3000/'
const SNIIV_CORS_SERVER = 'https://sniiv-cors.herokuapp.com/'
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
const API_POLI_INSUS_INFO = "predioidentify"
const API_POLI_INSUS_PERIODO = "periodo"
const API_POLI_INSUS_PERIODO_ALL = "allPeriodos"

function FetchUrl(apiRoute:string){
    return fetch( apiRoute, {method: HTTP_METHOD_GET, mode:CORS, referrerPolicy:REFERRER_POLICY,})
}

function FetchGetJson(apiRoute:string){
    return fetch( apiRoute, {method: HTTP_METHOD_GET, headers: {'Content-Type': TYPE_JSON},})
}

function FetchPostJson(apiRoute:string,data:any){
    return fetch( apiRoute, {method: HTTP_METHOD_POST, body: data, headers: {'Access-Control-Allow-Origin': '*'},})
}

function MapServiceUrl(name:string, cors:boolean, environment:Environments){
    return (cors ? SNIIV_CORS_SERVER : '') + (environment === Environments.QA? SNIIV_QA_URL : LOCAL_URL) + name;
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

export function MapServiceInsusGet(isMontos:boolean,year:number,pgnumber:number, pgsize:number, filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_GET+'?&isMontos='+isMontos+'&year='+year+'&filter='+filter+ '&pgnumber=' + pgnumber + '&pgsize=' + pgsize + '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
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
export function PnvCsvPost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_PNV_LOAD,cors,environment),formData)
}
export function PnvReportePost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_PNV_REPORTE_LOAD,cors,environment),formData)
}
export function SniivUrl(name:string, cors:boolean, environment:Environments){
    return (cors ? SNIIV_CORS_SERVER : '') + (environment === Environments.QA? SNIIV_QA_URL : environment === Environments.DEV? SNIIV_LOCAL_URL : SNIIV_URL) + name;
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

