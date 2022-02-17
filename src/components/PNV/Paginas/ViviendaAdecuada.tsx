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

    const [indicador,setIndicador] = useState([0,0]);
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
            children:[0,1,2]
        },
        {
            num: 3,
            title: "ASEQUIBILIDAD",
            image:asequibilidad,
            more:"El costo de la vivienda debe ser tal que todas las personas puedan acceder a ella sin poner en peligro el disfrute de otros satisfactores básicos o el ejercicio de sus derechos humanos. Se considera que una vivienda es asequible si un hogar destina menos del 30% de su ingreso en gastos asociados a la vivienda (ONU, 2018).",
            children:[0,1,2,3]
        },
        {
            num: 4,
            title: "HABITABILIDAD",
            image:habitabilidad,
            more:"Son las condiciones que garantizan la seguridad física de sus habitantes y les proporcionan un espacio habitable suficiente, así como protección contra el frío, la humedad, el calor, la lluvia, el viento u otros riesgos para la salud y peligros estructurales. Es decir, una parte importante del rezago de las viviendas deriva de condiciones estructurales y de ubicación que las hacen vulnerables a riesgos relacionados a desastres por fenómenos naturales y eventos climáticos extremos.",
            children:[0,1,2]
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
        {
            num: 8,
            title: "AUTOPRODUCCIÓN",
            image:autoproduccion,
            more:"",
            children:[0,1]
        },
    ]

    const indicadores = [
        {
            titulo: "Seguridad en la tenencia",
            tipo:'dual',
            data:[],
            chartTitle:['Porcentaje viviendas rentadas o prestadas','Porcentaje de viviendas propias sin escrituras o propias en proceso de pago sin escrituras'],
            grafica:[[27.7,],[17.5]],
            label:[{chartLabel:['Viviendas']},{chartLabel:['Viviendas']}],
            xAxis:['Viviendas','Viviendas',],
            yAxis:['Porcentaje','Porcentaje',]

        },
        {
            titulo: "Disponibilidad de Servicios",
            tipo:'dual',
            data:[],
            chartTitle:['Porcentaje de viviendas con sistema de captación pluvial','Porcentaje de viviendas con ecotecnia: luz eléctrica de panel solar','Porcentaje de viviendas con servicio sanitario con biodigestor'],
            grafica:[[99.7,0.3],[99.9,0.1],[98.3,1.7]],
            label:[{chartLabel:['Viviendas sin sistema de captación pluvial','Viviendas con sistema de captación pluvial']},
                {chartLabel:['Viviendas sin ecotecnia','Viviendas con ecotecnia']},
                {chartLabel:['Viviendas sin servicio sanitario con biodigestor','Viviendas con servicio sanitario con biodigestor']}],
            xAxis:['Viviendas','Viviendas','Viviendas'],
            yAxis:['Porcentaje','Porcentaje','Porcentaje']
        },
        {
            titulo: "Asequibilidad",
            tipo:'waterfall',
            data: [{ficha:indicadorViv1}],//faltan las fichas
            chartTitle:['Proporción de viviendas particulares habitadas según motivo de renta','Porcentaje de hogares que están pagando su vivienda y que destinan más del 30% de su ingreso corriente mensual para tal fin, distribución según tipo de financiamiento','Proporción de hogares en viviendas rentadas cuyo monto de renta mensual es superior al 30% de sus ingresos mensuales','Proporción de viviendas por tipo de financiamiento respecto de las viviendas totales.'],
            grafica:[[100,0.4,3.3,5.3,8,9.7,22,51.4],[100,2.1,3.5,9.6,18.1,66.8],[14.3,0.3,0.5,1.4,2.6,9.5],[100,0.8,2.6,3.3,5.8,19.8,67.7]],
            label:[{chartLabel:['Total','No sabe', 'Prefiere invertir en su persona (viajes, estudios, negocio)','No le interesa comprar', 'Otra', 'La mensualidad es menor que una hipoteca', 'Por facilidad de poder mudarse, si cambia de ciudad o empleo', 'No tiene acceso a crédito (hipotecario o bancario) / No tiene recursos']},
                {chartLabel: ['Total','Le prestó un familiar, amigo o prestamista','Le dio crédito otra institución','No especificado','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO']},
                {chartLabel: ['Total','Le prestó un familiar, amigo o prestamista','Le dio crédito otra institución','No especificado','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO']},
                {chartLabel: ['Total','No especificado','Le dio crédito otra institución','Le prestó un familiar, amigo o prestamista','Le dio crédito un banco, sofol o caja de ahorro','Le dio crédito el INFONAVIT, FOVISSSTE o FONHAPO','Usó sus propios recursos']}
            ],
            xAxis:['Viviendas','Viviendas','Viviendas','Viviendas'],
            yAxis:['Porcentaje','Porcentaje','Porcentaje','Porcentaje']
        },
        {
            titulo: "Habitabilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas particulares habitadas propias, según respuesta del informante, que declararon estar muy satisfechos y algo satisfechos con la calidad y aspectos de la vivienda','Porcentaje de viviendas según años de antigüedad'],
            data: [{ficha:indicadorViv2},{ficha:indicadorViv3}],
            grafica:[[40.8,16.2,14.8,44.2,10.6,89.1,],[75.5,75.7,63.8,88.6,89.7,84.1],[8.2,11.1,25.9,17.2,20.4,17.1]],
            label:[{chartLabel:['Grietas o cuarteaduras en techos o muros','Pandeos o deformaciones en los marcos de las puertas o ventanas','Levantamientos o hundimientos del piso','Humedad o filtraciones de agua en cimientos, muros o techos','Fracturas, pandeos o deformación de columnas, vigas o trabes','Sistema eléctrico (muros, techos, etcétera)']},
                {chartLabel: ['Calidad del piso','Calidad de los muros y techos','Pintura, recubrimientos y otros acabados','Iluminación natural','Ventilación natural','Protección que les da contra la lluvia, frío, calor o viento']},
                {chartLabel: ['De 0 a 5 años','De 6 a 10 años','De 11 a 20 años','De 21 a 30 años','Más de 30 años','No sabe']}],
            xAxis:['Viviendas','Viviendas','Viviendas'],
            yAxis:['Porcentaje','Porcentaje','Porcentaje']
        },
        {
            titulo: "Accesibilidad",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas según tipo de problema estructural','Porcentaje de viviendas que perciben que su colonia o barrio presentan muchos problemas por la falta de rampas o elevadores  para personas en condición de discapacidad'],
            data: [{ficha:indicadorViv4},{ficha:indicadorViv5}],
            grafica:[[12.8,9.9,12.3,12.9],[41.3,]],
            label:[{chartLabel: ['Poner pasamanos','Ampliar puertas','Poner rampas','Adecuar baños']},
                {chartLabel: ['Percepción de problemas  que tienen falta de rampas']}],
            xAxis:['Viviendas','Viviendas'],
            yAxis:['Porcentaje','Porcentaje']
        },
        {
            titulo: "Ubicación",
            tipo:'dual',
            chartTitle:['Porcentaje de viviendas particulares habitadas propias, según grado de satisfacción con la distancia-tiempo entre la vivienda y tipo de servicios','Porcentaje de viviendas que declararon presentar problemáticas de contaminación, ruido, inseguridad y vandalismo','Porcentaje Problemáticas de contaminación, ruido, inseguridad y vandalismo'],
            data: [{ficha:indicadorViv6},{ficha:indicadorViv7}],
            grafica:[[83.2,70.8,76.2,71.8,67.3,48.4,],[39,48,18.6,23.8,31,44]],
            label:[{chartLabel: ['Centros escolares','Mercados o centros comerciales','Trabajo','Centros de salud','Parques o espacios deportivos','Centros de recreación o instalaciones culturales']},
                {chartLabel:['Exceso de ruido','Basura tirada en las calles','Contaminación del ambiente por fábricas o construcciones','Deterioro por abandono de viviendas o espacios públicos','Problema tienen con el vandalismo, grafitis, pintas, vidrios rotos','Problema tienen con los robos o asaltos']}],
            xAxis:['Viviendas','Viviendas'],
            yAxis:['Porcentaje','Porcentaje']
        },
        {
            titulo: "Adecuación cultural",
            tipo:'dualBar',
            chartTitle:['Porcentaje de viviendas que declararon tener un alto grado de identidad con sus gustos, costumbres y tradiciones'],
            data: [{ficha:indicadorViv8}],
            grafica:[[81.9,]],
            label:[{chartLabel:['Vivienda se identifica con sus gustos, costumbres y tradiciones']}],
            xAxis:['Viviendas'],
            yAxis:['Porcentaje']
        },
        {
            titulo: "Autoproducción",
            tipo:'dualBar',
            chartTitle:['Distribución promedio de las viviendas propias o propias en proceso de pago que fueron mandadas a construir, según decil de ingreso corriente del hogar','Distribución promedio de las viviendas propias o propias en proceso de pago que fueron construidas por el propietario, según decil de ingreso '],
            data: [],
            grafica:[[10126,16830,22213,27530,33382,40041,48726,60466,80452,173161],[9890,16853,22277,27548,33386,40131,48566,60539,80275,152765]],
            label:[{chartLabel:['Decil 1','Decil 2','Decil 3','Decil 4','Decil 5','Decil 6','Decil 7','Decil 8','Decil 9','Decil 10']},
                {chartLabel:['Decil 1','Decil 2','Decil 3','Decil 4','Decil 5','Decil 6','Decil 7','Decil 8','Decil 9','Decil 10']}
            ],
            xAxis:['Decil','Decil'],
            yAxis:['Ingreso promedio (pesos)','Ingreso promedio (pesos)']
        },

    ]

    const handleCallback = (childData: any) => {
        setIndicador(childData)
    }

    const GridVivienda =
        <Fragment>
            <Paper elevation={3} className={classes.paperVivienda}>
                <h3 className={classes.textColorGrey}>{"Vivienda Adecuada"}</h3>
                <h5 className={classes.textColorGrey}>{"Indicadores complementarios"}</h5>
                <RefreshIcon className={classes.textColorGrey} fontSize={'large'} onClick={() => setIndicador([0,0])} />
            </Paper>
            <br/>
            <br/>
            <Paper className={classes.paperVivienda}>
                {indicador[0] === 0 ? <img src={vivienda} className={classes.image} alt={"vivienda"} />
                    : indicador[0] === 10? <TextoVivienda image={elementos[indicador[1]].image} title={elementos[indicador[1]].title} obj={elementos[indicador[1]].num} more={elementos[indicador[1]].more}/>
                        : <IndicadorVivienda indicador={indicadores[indicador[0]-1]} indicadorIndex={indicador[1]}/>}
            </Paper>

        </Fragment>



    return(
        <Fragment>
            <CardBanner subtitle={'La vivienda adecuada está reconocida como un derecho en los instrumentos internacionales incluidos la Declaración de los Derechos Humanos y el Pacto Internacional de los Derechos Económicos, Sociales y Culturales.'}
                        title={'Vivienda adecuada'}
                        image={bienestar1}
                        more1={'La vivienda adecuada debe proveer más que cuatro paredes y un techo. Se deben cumplir una serie de condiciones particulares antes de considerarse como Vivienda adecuada.'}
                        more2={'La caracterización de los retos específicos que tiene la vivienda en México se basa en los siete elementos de una vivienda adecuada definidos por la Organización de las Naciones Unidas (ONU): seguridad de la tenencia; disponibilidad de servicios, materiales, instalaciones e infraestructura; asequibilidad; habitabilidad; accesibilidad; ubicación y adecuación cultural.'}
                        isMobile={isMobile}/>
            <Paper className={classes.paperContainer2}>
                <div className={classes.root}>
                    <Grid container spacing={2}  >
                        {isMobile ?
                            <Grid container spacing={2}  >
                                <Grid item xs={12} sm={12} md={12} >
                                    <br/>
                                    <Accordion className={classes.paperGreen}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography className={classes.textColor}>Selecciona un indicador</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <Grid container spacing={2}  >
                                                    {elementos.map((card:any,key:number) =>
                                                        <Fragment key={key}>
                                                            {(key === elementos.length-1)? <Grid item xs={4}></Grid> : <></>}
                                                            <Grid item xs={4}>
                                                                <CardVivienda mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title}image={card.image}/>
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
                                {elementos.slice(0,4).map((card:any,key:number )=>
                                    <Paper elevation={0} className={classes.paperImage2} key={key}>
                                        <CardVivienda mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} image={card.image} key={card.num+card.title}/>
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                {GridVivienda}
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
                                {elementos.slice(4).map((card:any,key:number ) =>
                                    <Paper elevation={0} className={classes.paperImage2} key={key}>
                                        <CardVivienda mobile={isMobile} children={card.children} callBack={handleCallback} obj={card.num} title={card.title} image={card.image} key={card.num+card.title}/>
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


