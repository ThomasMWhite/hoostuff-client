
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import profile from './pages/profile'

//components
import Navbar from './layout/Navbar'

//theming
import themeFile from './util/theme.js'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
// import store from './redux/store'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store from './redux/store';

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = 'https://cs4750-311822.uk.r.appspot.com/'

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={home}/>
            <Route exact path='/login' component={login}/>
            <Route exact path='/signup' component={signup}/>
            <Route exact path='/profile' component={profile}/>
          </Switch>
        </Router>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
