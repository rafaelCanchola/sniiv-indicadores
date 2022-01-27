import React from "react";
import {routePath} from "./connections";
export default function FetchURL(apiRoute:any,map:boolean){
    const route = 'https://sniiv-cors.herokuapp.com/https://sniiv.conavi.gob.mx/'
    const routePruebas = 'https://localhost:5001/'
    //return fetch(route+(map?'js/maps/':'SNIIV.svc/')+apiRoute
    return fetch(map ? route + 'js/maps/' + apiRoute : routePath + apiRoute, {
        method: 'GET',
        mode:'cors',
        referrerPolicy:'strict-origin-when-cross-origin',

    })
}