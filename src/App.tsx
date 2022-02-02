import React from 'react';
import './App.css';
import {Link,withRouter,Route} from 'react-router-dom';
import Home from "./components/Home";
import {BrowserRouter} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, AppBar, alpha} from "@material-ui/core";
import AssIcon from '@material-ui/icons/AssignmentOutlined'
import HomeIcon from '@material-ui/icons/HouseOutlined'
import AnalyticsIcon from '@material-ui/icons/MultilineChartOutlined'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import BarChartIcon from '@material-ui/icons/BarChart'
import MapIcon from '@material-ui/icons/Map';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ObjetivoPNV from "./components/PNV/ObjetivoPNV";
import Avance from './components/Avance';
import Vivienda from "./components/Vivienda";



const styles = {
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
};

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
    const [value,setValue] = React.useState(',')
    const handleChange = (event: React.ChangeEvent<{}>,newValue:string) => {setValue(newValue)}
    const classes = useStyles()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    //@ts-ignore
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const Routes=[
        {
            path:'/',
            sidebarName:',',
            icon:<AssIcon fontSize={'large'} className={classes.icon}/>,
            component:ObjetivoPNV,
            exact:true
        },
        {
            path:'/avances',
            sidebarName:'-',
            icon:<AnalyticsIcon fontSize={'large'} className={classes.icon}/>,
            component:Avance,
            exact:true
        },
        {
            path:'/vivienda',
            sidebarName:'.',
            icon:<HomeIcon fontSize={'large'} className={classes.icon}/>,
            component:Vivienda,
            exact:true
        },

    ];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
          {Routes.map((prop,key) => {
              return(
                  <Route path={prop.path} exact={prop.exact} component={prop.component} key={key}/>
              )
          })}
                  <AppBar position="fixed" style={{top: "auto", bottom: 0}} className={classes.appBar}>
                  <BottomNavigation value={value} onChange={handleChange}  className={classes.appBar}>
                      {Routes.map((prop,key) => {
                          return(
                              <BottomNavigationAction  component={Link} to={prop.path} label={prop.sidebarName} value={prop.sidebarName} key={key} icon={prop.icon}   />
                          )
                      })}
                  </BottomNavigation>
              </AppBar>
          </ThemeProvider>
  );
}

export default App;
