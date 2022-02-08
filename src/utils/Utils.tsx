import {colorBrewer} from "../components/colorBrewer";


export function randomNumber(max:number){
    return Math.floor(Math.random() * max) + 0
}

//6 max number
export function assignColor(max:number): any {
    let colorArray = [];
    for(let i = 0; i < max; i++){
        colorArray[i] = i;
    }

    for (let j = colorArray.length - 1; j > 0; j--) {
        let m = randomNumber(j);
        let tmp: any = colorArray[m];
        colorArray[m] = colorArray[j];
        colorArray[j] = tmp;
    }
    return colorArray;
}

export function waterFallSize (initialData: any[],lengthData:number):any{
    let waterArray = []
    for (let i = 0,j = 1;i < lengthData; i++){
        if(i === 0 || i === lengthData-1){
            waterArray[i] = 0;
        }
        else{
            waterArray[i] = 0;
            for(j = i+1;j < lengthData;j++){
                waterArray[i] += initialData[j];
            }
        }
    }
    return waterArray;
}

export function assignObjetivosColor(obj:number){
    console.log(obj)
    if (obj > 5){
        return colorBrewer.Objetivos[randomNumber(5)];
    }else{
        return colorBrewer.Objetivos[obj-1];
    }
}

export function assignStateColor(obj:string,bAxis:any,cAxis:any,dAxis:any,eAxis:any): any {
    if (obj === cAxis) {
        return colorBrewer.StateColor[0];
    } else if (obj === eAxis) {
        return colorBrewer.StateColor[1];
    } else if (obj === bAxis) {
        return colorBrewer.StateColor[2];
    } else if (obj === dAxis) {
        return colorBrewer.StateColor[3];
    }
}