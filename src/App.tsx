import React from 'react';
import './App.css';
import {Link,Route} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, AppBar} from "@material-ui/core";
import AssIcon from '@material-ui/icons/LibraryBooksOutlined'
import HomeIcon from '@material-ui/icons/ApartmentOutlined'
import AnalyticsIcon from '@material-ui/icons/MultilineChartOutlined'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AvanceBienestar from './components/PNV/Paginas/AvanceBienestar';
import ViviendaContainer from "./components/PNV/Paginas/ViviendaContainer";
import ObjetivoPNVContainer from "./components/PNV/Paginas/ObjetivoPNVContainer";


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
            component:ObjetivoPNVContainer,
            exact:true
        },
        {
            path:'/avances',
            sidebarName:'-',
            icon:<AnalyticsIcon fontSize={'large'} className={classes.icon}/>,
            component:AvanceBienestar,
            exact:true
        },
        {
            path:'/vivienda',
            sidebarName:'.',
            icon:<HomeIcon fontSize={'large'} className={classes.icon}/>,
            component:ViviendaContainer,
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
            {
                /*<AppBar position="fixed" style={{top: "auto", bottom: 0}} className={classes.appBar}>
                  <BottomNavigation value={value} onChange={handleChange}  className={classes.appBar}>
                      {Routes.map((prop,key) => {
                          return(
                              <BottomNavigationAction  component={Link} to={prop.path} label={prop.sidebarName} value={prop.sidebarName} key={key} icon={prop.icon}   />
                          )
                      })}
                  </BottomNavigation>
                  </AppBar>*/
            }
        </ThemeProvider>
  );
}

export default App;
