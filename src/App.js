
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//pages
import home from './pages/home'
import login from './pages/login'

//components
import Navbar from './layout/Navbar'

//theming
import themeFile from './util/theme.js'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import store from './redux/store'
import {Provider} from 'react-redux';

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = 'https://cs4750-311822.uk.r.appspot.com/'

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={home}/>
            <Route exact path='/login' component={login}/>
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
