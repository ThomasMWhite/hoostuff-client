
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//pages
import home from './pages/home'

//components
import Navbar from './layout/Navbar'

//theming
import themeFile from './util/theme.js'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';

const theme = createMuiTheme(themeFile)

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={home}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
