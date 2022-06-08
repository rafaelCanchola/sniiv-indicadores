import React from 'react';
import './App.css';
import {Route, HashRouter, Link} from 'react-router-dom';
import AssIcon from '@material-ui/icons/LibraryBooksOutlined'
import HomeIcon from '@material-ui/icons/ApartmentOutlined'
import InitialIcon from '@material-ui/icons/Home'
import AnalyticsIcon from '@material-ui/icons/MultilineChartOutlined'
import {createStyles, createTheme, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";

import AvanceBienestar from './components/PNV/Paginas/AvanceBienestar';
import ViviendaContainer from "./components/PNV/Paginas/ViviendaContainer";
import ObjetivoPNVContainer from "./components/PNV/Paginas/ObjetivoPNVContainer";

import Prah from "./components/Insus/Prah";
import {Provider} from "react-redux";
import store from './redux/store';
import Initializer from "./components/Initializer/Initializer";
import Inicio from "./components/Inicio/Inicio";
import {AppBar, BottomNavigation, BottomNavigationAction} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        appBar:{
            padding: theme.spacing(0),
            textAlign:"center",
            backgroundColor: '#13322b',

        },
        icon:{color:'#bbbdbc'},
    })
);

function App() {
    const classes = useStyles()
    const [value,setValue] = React.useState(',')
    const handleChange = (event: React.ChangeEvent<{}>,newValue:string) => {setValue(newValue)}

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                },

            }),
        [],
    );
    const Routes=[
        {
            path:'/',
            sidebarName:'Home',
            icon:<InitialIcon fontSize={'large'} className={classes.icon}/>,
            component:Inicio,
            exact:true
        },/*{
            path:'/dashboard/insus',
            sidebarName:'.',
            icon:<HomeIcon fontSize={'large'} className={classes.icon}/>,
            component:Prah,
            exact:true
        },*/
        {
            path:'/indicadores',
            sidebarName:'Indicadores',
            icon:<AssIcon fontSize={'large'} className={classes.icon}/>,
            component:ObjetivoPNVContainer,
            exact:true
        },
        {
            path:'/indicadores/avances',
            sidebarName:'Avances',
            icon:<AnalyticsIcon fontSize={'large'} className={classes.icon}/>,
            component:AvanceBienestar,
            exact:true
        },
        {
            path:'/indicadores/vivienda',
            sidebarName:'Vivienda',
            icon:<HomeIcon fontSize={'large'} className={classes.icon}/>,
            component:ViviendaContainer,
            exact:true
        },
    ];
    return (
        <Provider store={store}>
            <Initializer />
            <ThemeProvider theme={theme}>
                <HashRouter hashType={"hashbang"}>
                    {Routes.map((prop,key) => {
                        return(<Route path={prop.path} exact={prop.exact} component={prop.component} key={key}/>)
                    })}
                        {
                    <AppBar position="fixed" style={{top: "auto", bottom: 0}} className={classes.appBar}>
                        <BottomNavigation value={value} onChange={handleChange}  className={classes.appBar}>
                            {Routes.map((prop,key) => {
                                return(
                                    <BottomNavigationAction  component={Link} to={prop.path} label={prop.sidebarName} value={prop.sidebarName} key={key} icon={prop.icon} style={{color:"#a9acb0"}}   />
                                )
                            })}
                        </BottomNavigation>
                    </AppBar>
                }
            </HashRouter>

        </ThemeProvider>
        </Provider>
  );
}

export default App;
