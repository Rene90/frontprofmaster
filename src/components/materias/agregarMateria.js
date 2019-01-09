import React, { Component } from 'react'
import axios from 'axios'


class AgregarMateria extends Component{
    constructor(props){
        super(props);
        this.state={ title:''}
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        
        axios.post(`${process.env.REACT_APP_API_URL}/materias`, { title }, {withCredentials:true})
        .then( () => {
            this.props.getData();
            this.setState({title: ""});
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
              <label>Nombre de la asignatura:</label>
              <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
              
              
              <input type="submit" value="Crear Materia" />
            </form>
          </div>
        )
      }
}
export default AgregarMateria