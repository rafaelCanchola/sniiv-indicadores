import React from "react";
import {routePath} from "./connections";

export default async function Fetch(apiRoute:any){
    return fetch(routePath+apiRoute,{
        method: 'GET',
        mode:'cors',
        referrerPolicy:'strict-origin-when-cross-origin',

    })
        .then(data => data.json())
}