import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../api'


class TrabajoDetails extends Component {
  constructor(props){
      super(props);
      this.state = {file:null,
    estudiante:"",
    anotaciones:"",
    calificacion:0};
  }



  getSingleTrabajo = () => {
      const { params } = this.props.match;
      axios.get(`${process.env.REACT_APP_API_URL}/trabajo/${params.id}`, {withCredentials:true})
      .then( responseFromApi =>{
          const theTrabajo = responseFromApi.data;
         
         
          this.setState(theTrabajo);
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  handleChange(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    // Reuse of the method "addPicture" from the file '../api'
    const {params} = this.props.match
    console.log(params)
    api.addPicture(this.state.file,params.id)
  }

  subirTrabajo = () =>{
    if("Estudiante" === this.props.loggedInUser.role && !this.state.fileURL){
        return (
            <div>
                <h2>Subir tarea</h2>
                <p>Sube tu tarea en un pdf</p>
                
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                <button type="submit">Subir tarea</button>
                </form>
            </div>
        )
    }
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {params} = this.props.match
   
    const anotaciones = this.state.anotaciones;
    const calificacion = this.state.calificacion;
   
    
    axios.post(`${process.env.REACT_APP_API_URL}/trabajocalificado/${params.id}`, { anotaciones, calificacion}, {withCredentials:true})
    .then( () => {
        this.getSingleTrabajo();
        this.setState({calificacion: "", anotaciones: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
  calificarTrabajo= () =>{
      if("Profesor" === this.props.loggedInUser.role && this.state.fileURL){
          return(
              <div>
                  <a href={this.state.fileURL}> Trabajo subido</a>

                  <h2>Calificar tarea</h2>
                  <form onSubmit={this.handleFormSubmit}>
              <label>Comentarios:</label>
              <input type="text" name="anotaciones" value={this.state.anotaciones} onChange={ e => this.handleChange(e)}/>
              <label>Calificación:</label>
              <textarea type="number" name="calificacion" value={this.state.calificacion} onChange={ e => this.handleChange(e)}/>
              
              
              <input type="submit" value="Submit" />
            </form>

              </div>
          )
      }
  }
  mostrarCalificacion= ()=>{
      if("Estudiante" === this.props.loggedInUser.role && this.state.calificacion){
        return(
            <div>
                <h3>Calificación</h3>
                <p>{this.state.calificacion}</p>
                <h3>Anotaciones del profesor</h3>
                <p>{this.state.anotaciones}</p>
            </div>
        )
      }
  }
  
 
    
  
  componentDidMount(){
      
    this.getSingleTrabajo();
 
    
}
  render(){
      
    return(
      <div>
        <h1>{this.state.titulo}</h1>
        <h2>Alumno: {this.state.estudiante.name}</h2>
        <div >

            <h3>Descripción</h3>
            <p>{this.state.contenido}</p>
        </div>
        {this.subirTrabajo()}
        {this.calificarTrabajo()}
        {this.mostrarCalificacion()}

        <Link to={'/materias'}>Ver lista de materias</Link>
      </div>
    )
  }
}

export default TrabajoDetails;