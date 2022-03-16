import {Component} from "react";
import {FetchURL, AlfrescoURL, SniivURL} from "../../FetchURL";
import ViviendaAdecuada from "./ViviendaAdecuada";


export default class ViviendaContainer extends Component<any, any>{

    async FetchSyncronized(objects:any[]){
        return await Promise.all((await Promise.all(objects.map(object => FetchURL(object)))).map(result => result.json()))
    }

    async componentDidMount(){
        let year = await this.FetchSyncronized([SniivURL('api/IndicadoresAPI/GetLastYear',true),])
        year = year[0][0].anio
        let trimestre = await this.FetchSyncronized([SniivURL('api/IndicadoresAPI/GetLastTrimestre/'+year,true)])
        trimestre = trimestre[0].trimestre
    }

    render(){
        return (
            <ViviendaAdecuada />
        )
    }
}