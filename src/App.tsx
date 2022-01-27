import React from 'react';
import './App.css';
import {Link,withRouter,Route} from 'react-router-dom';
import Home from "./components/Home";
import {BrowserRouter} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, AppBar, alpha} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/HomeOutlined'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import BarChartIcon from '@material-ui/icons/BarChart'
import MapIcon from '@material-ui/icons/Map';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const Routes=[
    {
        path:'/',
        sidebarName:'Inicio',
        icon:<HomeIcon fontSize={'large'}/>,
        component:Home,
        exact:true
    },

];

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
            backgroundColor: alpha(theme.palette.primary.light,0.6),

        }
    })
);

function App() {
    const [value,setValue] = React.useState('Inicio')
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
                              <BottomNavigationAction component={Link} to={prop.path} label={prop.sidebarName} value={prop.sidebarName} key={key} icon={prop.icon}   />
                          )
                      })}
                  </BottomNavigation>
              </AppBar>
          </ThemeProvider>
  );
}

export default App;
