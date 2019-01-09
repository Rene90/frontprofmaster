import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

import { Menu } from 'antd';


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    console.log("botonlogout")
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render(){
    if(this.state.loggedInUser){
      return(
        <Menu
        
        
        mode="horizontal"
      >
      <Menu.Item  >
        <h1>Prof Master</h1>
        </Menu.Item>
      <Menu.Item  >

          Bienvenido, {this.state.loggedInUser.name}
        </Menu.Item>
        <Menu.Item  >
        <Link to='/materias' style={{ textDecoration: 'none' }}>Materias</Link>
        </Menu.Item>
        <Menu.Item  >
        <Link to='/mismaterias' style={{ textDecoration: 'none' }}>Mis Materias</Link>
        </Menu.Item>
        <Link to='/'>
                <button onClick={() => this.logoutUser()}>Cerrar sesión</button>
        </Link>
       
        </Menu>
      )

    } else {
      return ( 
        <Menu
        
        
        mode="horizontal"
      >
        <Menu.Item  >
        <h1>Prof Master</h1>
        </Menu.Item>
        <Menu.Item  >
        <Link to='/' style={{ textDecoration: 'none' }}>Iniciar sesión</Link>
        </Menu.Item>
        <Menu.Item  >
        <Link to='/signup' style={{ textDecoration: 'none' }}>Registrate</Link>
        </Menu.Item>
         
       
        </Menu>
      )
    }
  }
}

export default Navbar;