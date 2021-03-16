import React, {Component} from 'react';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import './App.css';

//Componentes
import Navbar from './components/Navbar';


//Paginas
import home from './pages/home';
import login from './pages/login';

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
        </Switch>
        </div>
      </Router>
    </div>
    );
  }
}


export default App;
