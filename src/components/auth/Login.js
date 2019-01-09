import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import {
  Form, Icon, Input, Button
} from 'antd';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
    const name = this.state.name;
    const password = this.state.password;
   
    this.service.login(name, password)
    .then( response => {
        this.setState({ name: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
      }
    });
    
  }
    
  handleChange = (event) => {  
    console.log(event)
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div id="registrol">
        <Form onSubmit={this.handleFormSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Por favor proporciona el nombre de usuario' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="name" value={this.state.name} type="text" onChange={ e => this.handleChange(e)} placeholder="Nombre de usuario" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Por favor proporciona tu password' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name="password" value={this.state.password} type="password" onChange={ e => this.handleChange(e)} placeholder="Password" />
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
        </Button>
          

        </Form>
        
        <p>¿No tienes una cuenta?
            <Link to={"/signup"}> Registrarse</Link>
        </p>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;