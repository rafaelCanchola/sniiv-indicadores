import React, {Fragment, useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import CardVivienda from "../MUIComponents/CardVivienda";
import {IndicadorVivienda} from "../ComponentesPaginas/IndicadorVivienda";

import {indicadorViv1} from "../../../json/Vivienda/fichas_ind_v1";
import {indicadorViv2} from "../../../json/Vivienda/fichas_ind_v2";
import {indicadorViv3} from "../../../json/Vivienda/fichas_ind_v3";
import {indicadorViv4} from "../../../json/Vivienda/fichas_ind_v4";
import {indicadorViv5} from "../../../json/Vivienda/fichas_ind_v5";
import {indicadorViv6} from "../../../json/Vivienda/fichas_ind_v6";
import {indicadorViv7} from "../../../json/Vivienda/fichas_ind_v7";
import {indicadorViv8} from "../../../json/Vivienda/fichas_ind_v8";

import vivienda from "../../../assets/images/house-tr.png";
import seguridad from "../../../assets/images/seguridad-tr.png";
import accesibilidad from "../../../assets/images/accesibilidad-tr.png";
import servicios from "../../../assets/images/servicios-tr.png";
import ubicacion from "../../../assets/images/ubicacion-tr.png";
import cultura from "../../../assets/images/cultura-tr.png";
import habitabilidad from "../../../assets/images/habitabilidad-tr.png";
import asequibilidad from "../../../assets/images/pesos.png";
import autoproduccion from "../../../assets/images/autoproduccion.png";
import {useStyles} from "../../../utils/Style";
import TextoVivienda from "../MUIComponents/TextoVivienda";
import {MobileSize} from "../../../utils/Utils";
import CardBanner from "../MUIComponents/CardBanner";


interface ViviendaProps {

}

export default function ViviendaAdecuada(props:ViviendaProps){

    const isMobile = MobileSize();
    const bienestar1 = 'https://sistemas.sedatu.gob.mx/repositorio/proxy/alfresco-noauth/api/internal/shared/node/7iHubpXhSW-a0tnkfn6PhA/content/adecuada.jpg?&a=true'

    const [indicador,setIndicador] = useState([20,20]);
    const [accordion,setAccordion] = useState(false);
    const classes = useStyles();

    const elementos =[
        {
            num: 1,
            title: "SEGURIDAD EN LA TENENCIA",
            image:seguridad,
            more:"La seguridad de la tenencia se refiere a una situación en la que las personas cuentan de forma continua y segura con el derecho al suelo, y en consecuencia, a la posesión de la vivienda; esto incluye el acceso a la tierra en modalidades distintas a la propiedad privada, como las comunidades ejidales, comunales y cooperativas. Se refiere a garantizar las condiciones de sus ocupantes a protección jurídica contra el desalojo forzoso, el hostigamiento y otras amenazas.",
            children:[0,1]
        },
        {
            num: 2,
            title: "DISPONIBILIDAD DE SERVICIOS",
            image:servicios,
            more:"Contempla la provisión de agua potable, instalaciones sanitarias adecuadas, energía para la cocción, la calefacción y el alumbrado, así como para la conservación de alimentos y eliminación de residuos.",
            children:[0,1,2,3,4,5,6]
        },
        {
            num: 3,
            title: "ASEQUIBILIDAD",
            image:asequibilidad,
            more:"El costo de la vivienda debe ser tal que todas las personas puedan acceder a ella sin poner en peligro el disfrute de otros satisfactores básicos o el ejercicio de sus derechos humanos. Se considera que una vivienda es asequible si un hogar destina menos del 30% de su ingreso en gastos asociados a la vivienda (ONU, 2018).",
            children:[0,1,2,3,4,5,6]
        },
        {
            num: 4,
            title: "HABITABILIDAD",
            image:habitabilidad,
            more:"Son las condiciones que garantizan la seguridad física de sus habitantes y les proporcionan un espacio habitable suficiente, así como protección contra el frío, la humedad, el calor, la lluvia, el viento u otros riesgos para la salud y peligros estructurales. Es decir, una parte importante del rezago de las viviendas deriva de condiciones estructurales y de ubicación que las hacen vulnerables a riesgos relacionados a desastres por fenómenos naturales y eventos climáticos extremos.",
            children:[0]
        },
        {
            num: 5,
            title: "ACCESIBILIDAD",
            image:accesibilidad,
            more:"El diseño y materialidad de la vivienda debe considerar las necesidades específicas de los grupos desfavorecidos y marginados, particularmente de personas con discapacidad.",
            children:[0,1]
        },
        {
            num: 6,
            title: "UBICACIÓN",
            image:ubicacion,
            more:"La localización de la vivienda debe ofrecer acceso a oportunidades de empleo, servicios de salud, escuelas, guarderías y otros servicios e instalaciones sociales, y estar ubicada fuera de zonas de riesgo o contaminadas.",
            children:[0,1]
        },
        {
            num: 7,
            title: "ADECUACIÓN CULTURAL",
            image:cultura,
            more:"Es una vivienda adecuada si su ubicación respeta y toma en cuenta la expresión de identidad cultural. La adecuación cultural puede ser abordada desde dos ángulos principales. Por un lado, las técnicas y los materiales que se emplean durante la construcción; por otro, el diseño de la vivienda y su entorno, y cómo se ajustan a las expectativas y anhelos que forman parte de la identidad cultural de cada región y grupo poblacional.",
            children:[0,]
        },
    ]

    const indicadores = [
        {
            titulo: "Seguridad en la tenencia",
            tipo:'dual',
            data:[],
            chartTitle:['Porcentaje viviendas rentadas o prestadas','Porcentaje de viviendas propias sin escrituras o propias en proceso de pago sin escrituras'],
            grafica:[[29.1,27.8],[26.6,25.2]],
            label:[{chartLabel:['2018','2020']},{chartLabel:['2018','2020']}],
            xAxis:['Viviendas','Viviendas',],
            yAxis:['Porcentaje','Porcentaje',],
            pdfName:[],

        },
        {
            titulo: "Disponibilidad de Servicios",
            tipo:'dual',
            data:[],
            chartTitle:['Porcentaje de viviendas con tecnologías sostenibles/uso sustentable','Porcentaje de viviendas con carencia de acceso a agua','Porcentaje de viviendas con carencia de servicios de drenaje','Porcentaje de viviendas con carencia de servicios de electricidad','Porcentaje de vivienda con carencia de servicios de combustible','Porcentaje de viviendas con carencia de acceso a los servicios básicos','Porcentaje de población en pobreza extrema con carencia en calidad, espacios y servicios básicos en la vivienda',],
            grafica:[[2.1,2.1],[6.6,6.4],[5.9,7.8],[0.5,0.3],[11.4,10.4],[18.3,16.5],[47.7,48.7]],
            label:[{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']}],
            xAxis:['Años','Años','Años','Años','Años','Años','Años',],
            yAxis:['Porcentaje','Porcentaje','Porcentaje','Porcentaje','Porcentaje','Porcentaje','Porcentaje'],
            pdfName:[],
        },
        {
            titulo: "Asequibilidad",
            tipo:'dual',
            data: [{ficha:indicadorViv1}],//faltan las fichas
            chartTitle: ['Porcentaje de hogares que están pagando su vivienda y que destinan más del 30% de su ingreso corriente mensual para tal fin','Porcentaje de hogares en viviendas rentadas cuyo monto de renta mensual es superior al 30% de sus ingresos mensuales','Porcentaje de vivienda adquirida (propia o en proceso de pago) según tipo de financiamiento','Porcentaje promedio del ingreso mensual destinado para pagar vivienda (1er quintil)','Porcentaje de viviendas autoproducidas o autoconstruidas','Porcentaje de viviendas autoproducidas o autoconstruidas primer quintil de ingreso','Monto promedio del pago mensual por la vivienda autoproducida o autoconstruida',],
            grafica:[[6.8,7.2],[24.7,21.2],{'A':[19.9,20],'B':[8.9,8.5],'C':[71.2,71.5]},[36.6,37.4],[63.7,63.2],[76.1,80.3],[3034.19,3045.3]],
            label:[{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['Público','Privado','Propio']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},{chartLabel:['2018','2020']},],
            xAxis:['Años','Años',['2018','2020'],'Años','Años','Años','Años'],
            yAxis:['Porcentaje','Porcentaje','Porcentaje','Porcentaje','Porcentaje','Porcentaje','Monto promedio (pesos)'],
            //grafica:[[19.9,8.9,71.2],[19.9,8.5,71.5]],
            //chartTitle:['Proporción de viviendas particulares habitadas según motivo de renta','Porcentaje de hogares que están pagando su vivienda y que destinan más del 30% de su ingreso corriente mensual para tal fin, distribución según tipo de financiamiento','Proporción de hogares en viviendas rentadas cuyo monto de renta mensual es superior al 30% de sus ingresos mensuales','Proporción de viviendas por tipo de financiamiento respecto de las viviendas totales.','Distribución promedio de las viviendas propias o propias en proceso de pago que fueron mandadas a construir, según decil de ingreso corriente del hogar','Distribución promedio de las viviendas propias o propias en proceso de pago que fueron construidas por el propietario, según decil de ingreso '],
            //grafica:[[0.4,3.3,5.3,8,9.7,22,51.4],[2.1,3.5,9.6,18.1,66.8],[0.3,0.5,1.4,2.6,9.5],[0.8,2.6,3.3,5.8,19.8,67.7],[10126,16830,22213,27530,33382,40041,48726,60466,80452,173161],[9890,16853,22277,27548,33386,40131,48566,60539,80275,152765]],
            /*label:[{chartLabel:['No sabe', 'Prefiere invertir en su persona (viajes, estudios, negocio)','No le interesa comprar', 'Otra', 'La mensualidad es menor que una hipoteca', 'Por facilidad de poder mudarse, si cambia de ciudad o empleo', 'No tiene acceso a crédito (hipotecario o bancario) / No tiene recursos']},
                {chartLabel: ['Le prestó un familiar, amigo o prestamista','Le dio crédito otra institución','No especificado','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO']},
                {chartLabel: ['Le prestó un familiar, amigo o prestamista','Le dio crédito otra institución','No especificado','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO']},
                {chartLabel: ['No especificado','Le dio crédito otra institución','Le prestó un familiar, amigo o prestamista','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO','Usó sus propios recursos']},
                {chartLabel:['Decil 1','Decil 2','Decil 3','Decil 4','Decil 5','Decil 6','Decil 7','Decil 8','Decil 9','Decil 10']},
                {chartLabel:['Decil 1','Decil 2','Decil 3','Decil 4','Decil 5','Decil 6','Decil 7','Decil 8','Decil 9','Decil 10']}


            ],

            xAxis:['Viviendas','Viviendas','Viviendas','Viviendas','Decil','Decil'],
            yAxis:['Porcentaje','Porcentaje','Porcentaje','Porcentaje','Ingreso promedio (pesos)','Ingreso promedio (pesos)'],
             */
            pdfName:['ase_vivi_ren'],
        },
        {
            titulo: "Habitabilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas más de 30 de antigüedad con problemas estructurales'],
            data: [],
            grafica:[['0',13.5]],
            label:[{chartLabel: ['2018','2020']},],
            xAxis:['Años'],
            yAxis:['Porcentaje'],
            pdfName:['','hab_viv_est','hab_viv_hab'],
        },
        {
            titulo: "Accesibilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas que requieren de adaptaciones para personas con discapacidad','Porcentaje de percepción de barrio o localidad poco incluyente y accesible para personas con discapacidad'],
            data: [],
            grafica:[[0,16.9],[0,41.3]],
            label:[{chartLabel: ['2018','2020']},
                {chartLabel: ['2018','2020']}],
            xAxis:['Años','Años'],
            yAxis:['Porcentaje','Porcentaje'],
            pdfName:['acc_viv_est','acc_viv_hab'],
        },
        {
            titulo: "Ubicación",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas con problemáticas de contaminación, ruido, inseguridad y vandalismo','Porcentaje de viviendas con satisfacción distancia-tiempo entre vivienda y servicios'],
            data: [],
            grafica:[{A:[41.4],B:[10.6],C:[28.6]},{A:[48.8],B:[67.7],C:[44.1]}],
            label:[{chartLabel: ['Contaminación (auditiva, en calles, ambiente y por fábricas)','Viviendas o espacios públicos abandonados o deteriorados','Vandalismo y violencia']},
                {chartLabel:['Trabajo','Servicios (centros escolares, centros de salud o mercados o centros comerciales)','Recreación y esparcimiento (espacios deportivos o centros de recreación o instalaciones culturales)']}],
            xAxis:[['2020'],['2020']],
            yAxis:['Porcentaje','Porcentaje'],
            pdfName:['ubi_viv_sati','ubi_viv_prob'],
        },
        {
            titulo: "Adecuación cultural",
            tipo:'dual',
            chartTitle:[' Porcentaje de viviendas con Adecuación cultural'],
            data: [],
            grafica:[[51.23,]],
            label:[{chartLabel:['2020']}],
            xAxis:[['Años']],
            yAxis:['Porcentaje'],
            pdfName:['cul_viv_cos'],
        }

    ]

    const handleCallback = (childData: any) => {
        setIndicador(childData)
        setAccordion(false)
    }

    const GridVivienda =
        <Fragment>
            <Paper elevation={3} className={classes.paperVivienda}>
                <h3 className={classes.textColorGrey}>{"Vivienda Adecuada"}</h3>
                <h5 className={classes.textColorGrey}>{"Indicadores complementarios"}</h5>
                <RefreshIcon className={classes.textColorGrey} fontSize={'large'} onClick={() => setIndicador([20,20])} />
            </Paper>
            <br/>
            <br/>
            <Paper className={classes.paperVivienda}>
                {indicador[0] === 20 ? <img src={vivienda} className={classes.image} alt={"vivienda"} />
                    : indicador[0] === 10? <TextoVivienda image={elementos[indicador[1]].image} title={elementos[indicador[1]].title} obj={elementos[indicador[1]].num} more={elementos[indicador[1]].more}/>
                        : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
            </Paper>

        </Fragment>



    return(
        <Fragment>
            <CardBanner subtitle={'La vivienda adecuada está reconocida como un derecho en los instrumentos internacionales incluidos la Declaración de los Derechos Humanos y el Pacto Internacional de los Derechos Económicos, Sociales y Culturales.'}
                        title={'Vivienda adecuada'}
                        image={bienestar1}
                        more1={'La vivienda adecuada debe proveer más que cuatro paredes y un techo. De acuerdo con la Organización de las Naciones Unidas (ONU), la caracterización de los retos específicos que tiene la vivienda en México se basa en los siete elementos: seguridad de la tenencia; disponibilidad de servicios, materiales, instalaciones e infraestructura; asequibilidad; habitabilidad; accesibilidad; ubicación y adecuación cultural.'}
                        more2={''}
                        isMobile={isMobile}/>
            <Paper className={classes.paperContainer2}>
                <div className={classes.root}>
                    <Grid container spacing={2}  >
                        {isMobile ?
                            <Grid container spacing={2}  >
                                <Grid item xs={12} sm={12} md={12} >
                                    <br/>
                                    <Accordion className={classes.paperGreen} expanded={accordion} onClick={() => setAccordion(!accordion)}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography className={classes.textColor}>Selecciona un indicador</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <Grid container spacing={2}  >
                                                    {elementos.map((card:any,key:number) =>
                                                        <Fragment key={key}>
                                                            <Grid container spacing={2}  >
                                                                <CardVivienda selected={indicador[0] === 10? indicador[1]===key: indicador[0]-1===key} mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title}image={card.image}/>
                                                            </Grid>
                                                        </Fragment>
                                                    )}
                                                </Grid>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item xs={12} sm={12} >
                                    {GridVivienda}
                                </Grid>
                            </Grid>
                        :
                        <Fragment>
                            <Grid item xs={12} sm={3} md={3}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                {elementos.slice(0,4).map((card:any,key:number )=>
                                    <Paper elevation={0} className={classes.paperImage2} key={key}>
                                        <CardVivienda selected={indicador[0] === 10? indicador[1]===key: indicador[0]-1===key} mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} image={card.image} key={card.num+card.title}/>
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                {GridVivienda}
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                {elementos.slice(4).map((card:any,key:number ) =>
                                    <Paper elevation={0} className={classes.paperImage2} key={key}>
                                        <CardVivienda selected={indicador[0] === 10? indicador[1]===key+4: indicador[0]-1===key+4} mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} image={card.image} key={card.num+card.title}/>
                                    </Paper>
                                )}
                            </Grid>
                        </Fragment>
                    }
                </Grid>
                <br/><br/><br/>
            </div>
            </Paper>
        </Fragment>
    )
}


