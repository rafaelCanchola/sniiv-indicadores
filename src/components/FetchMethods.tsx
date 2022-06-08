import {Environments} from "../redux/reducers/environment";

const ALFRESCO_URL = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/'
const LOCAL_URL = 'http://localhost:8080/api/'
const SNIIV_URL = 'https://sniiv.sedatu.gob.mx/'
const SNIIV_QA_URL = 'https://qa-sniiv.sedatu.gob.mx/'
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
const API_POLI_LOAD = "uploadcharge"
const API_POLI_INSUS_INFO = "predioidentify"

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

export function MapServiceInsusCount(filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_COUNT+'?&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment));
}

export function MapServiceEstadosCount(filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_MEXICO_COUNT+'?&filter='+filter+ '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment));
}

export function MapServiceInsusGet(pgnumber:number, pgsize:number, filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_GET+'?&filter='+filter+ '&pgnumber=' + pgnumber + '&pgsize=' + pgsize + '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
}

export function MapServiceMexicoGet(pgnumber:number, pgsize:number, filter:string,xmin:number,ymin:number,xmax:number,ymax:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_MEXICO_GET+'?&filter='+filter+ '&pgnumber=' + pgnumber + '&pgsize=' + pgsize + '&xmin=' + xmin + '&xmax=' + xmax + '&ymin=' + ymin + '&ymax=' + ymax,cors,environment))
}
export function MapServiceInsusPoliInfo(idPoli:number,level:number, cors:boolean, environment:Environments){
    return FetchGetJson(MapServiceUrl(API_POLI_INSUS_INFO+'?&id='+idPoli+'&level='+level,cors,environment))
}

export function MapServiceInsusPost(formData:any, cors:boolean, environment:Environments){
    return FetchPostJson(MapServiceUrl(API_POLI_LOAD,cors,environment),formData)
}

export function SniivUrl(name:string, cors:boolean, environment:Environments){
    return (cors ? SNIIV_CORS_SERVER : '') + (environment === Environments.QA? SNIIV_QA_URL : SNIIV_URL) + name;
}

export async function FetchSyncronized(objects:any[]){
    return await Promise.all((await Promise.all(objects.map(object => FetchUrl(object)))).map(result => result.json()))
}

export async function GetYearTrimestre(cors:boolean,environmentProd:Environments){
    let yearTrimestre = []
    let year = await FetchSyncronized([SniivUrl(SNIIV_API_GET_LAST_YEAR,cors,environmentProd)])
    yearTrimestre[0] = year[0][0].anio;
    let trimestre = await FetchSyncronized([SniivUrl(SNIIV_API_GET_LAST_TRIMESTRE+yearTrimestre[0],cors,environmentProd)])
    yearTrimestre[1] = trimestre[0].trimestre;
    return yearTrimestre
}

