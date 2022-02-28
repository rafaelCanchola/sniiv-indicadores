import {colorBrewer} from "./colorBrewer";
import {useEffect, useState} from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import {forEach} from "ol/geom/flat/segments";

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
export function assign4TColor(max:number): any {
    let color = assignColor(max)
    for(let i = 0,j= 0.55; i<max;i++,j-=0.05){
        color[i] = j;
    }
    return color;
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

export function MobileSize():boolean{
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {setWidth(window.innerWidth);}
    useEffect(() => {window.addEventListener('resize', handleWindowSizeChange);return () => {window.removeEventListener('resize', handleWindowSizeChange);}}, []);
    return width <= 954//768 //954
}

export function ordinalNumber(value:any){
    switch (value){
        case 1:
            return value+'er';
        case 2:
            return value+'do';
        case 3:
            return value+'er';
        case '1':
            return value+'er';
        case '2':
            return value+'do';
        case '3':
            return value+'er';
        default:
            return value+'to';
    }
}

export function SaveToPDF(pdfName:any,idName:any,imageWidth:number,imageHeight:number){
    let domElement = document.getElementById(idName);
    // @ts-ignore
    htmlToImage.toPng(domElement,{width:500, height:1000})
        .then(function (dataUrl) {
            const pdf = new jsPDF({});
            pdf.addImage(dataUrl, 'PNG', 0, 0, imageWidth, imageHeight);
            pdf.save(pdfName+'.pdf');
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
};

export function HTMLToPDF(pdfName:any,idName:any,fichaMain:boolean){
    let domElement = document.getElementById(idName);
            const pdf = new jsPDF({format:fichaMain? [1100,1000] : [750,500]});
            //@ts-ignore
            pdf.html(domElement, {callback:function (pdf){pdf.save(pdfName+'.pdf')}});

};
