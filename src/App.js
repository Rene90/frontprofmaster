import React, { Component } from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
//rutas de materias
import MateriaList from './components/materias/listaMaterias'
import Navbar from './components/navbar/Navbar'
import MateriaDetails from './components/materias/materiaDetails'
import MisMaterias from './components/materias/misMaterias'
//ruta de estudiantes
import StudentDetails from './components/materias/studentDetails'
//ruta de trabajos
import TrabajoDetails from './components/materias/trabajoDetails'
//rutas de autenticacion
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
//carusel
import Carrusel from './components/carrusel'
import Imagen from './components/imagenlogin'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser}  getUser={this.getTheUser}/>
          <Imagen/>
          <Switch>
          
            <ProtectedRoute exact user={this.state.loggedInUser} path="/materias" component={MateriaList}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/mismaterias" component={MisMaterias}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/materias/:id" component={MateriaDetails} />
            <ProtectedRoute exact user={this.state.loggedInUser} path="/estudiante/:id" component={StudentDetails}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/trabajo/:id" component={TrabajoDetails}/>
          </Switch>
        </div>
      );
    }else{
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
          <Carrusel/>
          <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/materias" component={MateriaList}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/materias/:id" component={MateriaDetails} />
            <ProtectedRoute exact user={this.state.loggedInUser} path="/estudiante/:id" component={StudentDetails}/>
            <ProtectedRoute exact user={this.state.loggedInUser} path="/trabajo/:id" component={TrabajoDetails}/>
          </Switch>
        </div>
      );

    }
   
  }
}

export default App;
