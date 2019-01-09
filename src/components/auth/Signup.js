import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import AuthService from './auth-service';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, 
} from 'antd';

const { Option } = Select;

const roles = [{
  value: 'Profesor',
  label: 'Profesor'
  
}, {
  value: 'Estudiante',
  label: 'Estudiante',
 
  }]

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', password: '', email:'', role:'', confirmDirty: false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    const name = this.state.name;
    const password = this.state.password;
    const email = this.state.email;
    const role = this.state.role
  
    this.service.signup(name, password, email, role)
    .then( response => {
        this.setState({
            name: "", 
            
            password: "",
            email:"",
            role: ""
        });
         this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  handleChange = (event) => {  
   
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  handleChangeRol = (event) => {  
    
    const role = event[0]
    this.setState({role: role});
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Verifica que ambos passwords sean iguales');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return(
        <div id="Registro">
          <Form onSubmit={this.handleFormSubmit} id="forma">
          <Form.Item
          {...formItemLayout}
          label={(
            <span>
              Usuario&nbsp;
              <Tooltip title="Escribe tu nombre de usuario">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Proporciona tu nombre de usuario', whitespace: true }],
          })(
            <Input name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'E-mail no válido',
            }, {
              required: true, message: 'Por favor porporciona un email',
            }],
          })(
            <Input name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          )}
        </Form.Item>



        <Form.Item
          {...formItemLayout}
          label="Role"
        >
          {getFieldDecorator('residence', {
            initialValue: ['Profesor', 'Estudiante'],
            rules: [{ type: 'array', required: true, message: 'Por favor selecciona un rol' }],
          })(
            <Cascader options={roles} onChange={ e => this.handleChangeRol(e)}/>
          )}

<Form.Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Ingresa un password',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)}/>
          )}
        </Form.Item>


        <Form.Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Confirma tu password',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>

        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Registrarse</Button>
        </Form.Item>

          </Form>
       
  
        <p>¿Ya tienes una cuenta?
            <Link to={"/"}> Log in</Link>
        </p>
  
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Signup);
export default WrappedRegistrationForm;