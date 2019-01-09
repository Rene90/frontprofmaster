import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AgregarTrabajo from './agregarTrabajo'

class MateriaDetails extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }



  getSingleMateria = () => {
      const { params } = this.props.match;
      axios.get(`${process.env.REACT_APP_API_URL}/materias/${params.id}`, {withCredentials:true})
      .then( responseFromApi =>{
          const theMateria = responseFromApi.data;
         
         
          this.setState(theMateria);
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  
  deleteProject = (id) => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_API_URL}/materias/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
        
        this.props.history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  
  ownershipCheck = (project) => {
    const estid = []
    
      const { params } = this.props.match
  //crear ruta de detalle de estudiante y trabajo
    if(this.props.loggedInUser && (project.profesor == this.props.loggedInUser._id)){
      return (
        <div>
            <h3>Estudiantes</h3>
            { this.state.estudiantes.map((estudiante, index) => {
                estid.push(estudiante._id)
                return (
                  <div key={estudiante._id}>
                  
                    <Link to={`/estudiante/${estudiante._id}`}>
                      <p>{estudiante.name}</p>
                      
                    </Link>
                    
                  </div>
                )})
              }
              <h3>Trabajos</h3>
              { this.state.trabajos.map((trabajo, index) => {
                
                return (
                  <div key={trabajo._id}>
                  
                    <Link to={`/trabajo/${trabajo._id}`}>
                      <p>{trabajo.titulo}</p>
                      
                    </Link>
                    
                  </div>
                )})
              }
            <div style={{width: '40%', float:"right"}}>
                <AgregarTrabajo getData={() => this.getSingleMateria()} estudiantes = {estid} materia = {params.id}/>
            </div>
          <button onClick={() => this.deleteProject(this.state._id)}>Borrar Materia</button>
        </div>
      )
    } 
    
  }
    checkStudent = (project) => {
    const estid = []
    
      const { params } = this.props.match
  //crear ruta de detalle de estudiante y trabajo
    if(this.state.title && ("Estudiante" === this.props.loggedInUser.role)){
      return (
        <div>
            <Link to={`/estudiante/${this.props.loggedInUser._id}`}>
            <h3>Mi perfil</h3>
            </Link>

           
              <h3>Trabajos</h3>
              { this.state.trabajos.map((trabajo, index) => {
                
                return (
                  <div key={trabajo._id}>
                  
                    <Link to={`/trabajo/${trabajo._id}`}>
                      <p>{trabajo.titulo}</p>
                      
                    </Link>
                    
                  </div>
                )})
              }
            
        </div>
      )
    } 
    
  }
  componentDidMount(){
      
    this.getSingleMateria();
 
    
}
  render(){
      
    return(
      <div>
        <h1>{this.state.title}</h1>
        <div >
            
        
      
        {this.ownershipCheck(this.state)}
        {this.checkStudent(this.state)}
        
        
      </div>
        <Link to={'/materias'}>Ver lista de materias</Link>
      </div>
    )
  }
}

export default MateriaDetails;