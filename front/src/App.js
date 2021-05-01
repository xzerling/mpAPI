import React, {Component} from 'react';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import './App.css';

//Componentes
import Navbar from './components/Navbar';


//Paginas
import home from './pages/home';
import login from './pages/login';
import sensor from './pages/sensorRegistrado';
import medicion from './pages/medicion';

class App extends Component{
  render() {
    return(
    <div className="App">
      <Router>
        <Navbar />
        <div className = 'container'>

        
        <Switch>
          <Route exact path='/' component={home}></Route>
          <Route exact path='/login' component={login}></Route>
          <Route exact path='/sensorRegistrado' component={sensor}></Route>
          <Route exact path='/medicion' component={medicion}></Route>
        </Switch>
        </div>
      </Router>
    </div>
    );
  }
}


export default App;
