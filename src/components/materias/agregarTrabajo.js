import React, { Component } from 'react'
import axios from 'axios'


class AgregarTrabajo extends Component{
    constructor(props){
        super(props);
        this.state={ title:'',
                    contenido:''
    }
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const titulo = this.state.title;
        const contenido = this.state.contenido;
        const estudiantes = this.props.estudiantes;
        const materia = this.props.materia
        
        axios.post(`${process.env.REACT_APP_API_URL}/trabajo`, { titulo, contenido,materia, estudiantes }, {withCredentials:true})
        .then( () => {
            this.props.getData();
            this.setState({title: "", contenido: ""});
        })
        .catch( error => console.log(error) )
      }
    
      handleChange = (event) => {  
          const {name, value} = event.target;
          this.setState({[name]: value});
      }
      render(){
        return(
          <div className="add-project">
            <form onSubmit={this.handleFormSubmit}>
              <label>Nombre del trabajo o proyecto:</label>
              <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
              <label>Contenido del trabajo:</label>
              <textarea type="text" name="contenido" value={this.state.contenido} onChange={ e => this.handleChange(e)}/>
              
              
              <input type="submit" value="Submit" />
            </form>
          </div>
        )
      }
}
export default AgregarTrabajo