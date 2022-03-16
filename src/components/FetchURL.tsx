import React from "react";

export async function FetchSyncronized(objects:any[]){
    return await Promise.all((await Promise.all(objects.map(object => FetchURL(object)))).map(result => result.json()))
}

export async function GetYearTrimestre(){
    let yearTrimestre = []
    let year = await FetchSyncronized([SniivURL('api/IndicadoresAPI/GetLastYear',true),])
    //this.setState({year:year[0][0].anio})
    yearTrimestre[0] = year[0][0].anio;
    let trimestre = await FetchSyncronized([SniivURL('api/IndicadoresAPI/GetLastTrimestre/'+yearTrimestre[0],true)])
    //this.setState({trimestre:trimestre[0].trimestre})
    yearTrimestre[1] = trimestre[0].trimestre;
    return yearTrimestre
}

export function AlfrescoURL(object:string, name:string,cors:boolean){
    let alfrescoURL = cors && 'https://sniiv-cors.herokuapp.com/';
    alfrescoURL = alfrescoURL+'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/'+object
    const alfrescoName = '/content/'+name+'?&a=true'
    return alfrescoURL + alfrescoName
}

export function SniivURL(name:string,cors:boolean){
    let sniivURL = cors && 'https://sniiv-cors.herokuapp.com/';
    sniivURL = sniivURL+'https://sniiv.sedatu.gob.mx/'+name;
    return sniivURL;
}

export function FetchURL(apiRoute:string){

    return fetch( apiRoute, {
        method: 'GET',
        mode:'cors',
        referrerPolicy:'strict-origin-when-cross-origin',

    })
}

