import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import AgregarMateria from './agregarMateria'




class MateriaList extends Component{
    constructor(props){
        super(props);
        this.state = { listOfMaterias:[],
                        
        }
    }
    getAllMaterias = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/materias`, {withCredentials:true})
        .then(responseFromApi => {
          this.setState({
            listOfMaterias: responseFromApi.data
          })
        })
      }
      inscribirse = (id)=>{
        const user = this.props.loggedInUser._id
        axios.post(`${process.env.REACT_APP_API_URL}/materias/${id}`,{ user }, {withCredentials:true})
        .then(responseFromApi => {
          
        })
      }
      checkProfesor = (project) => {
      
      
      //crear ruta de detalle de estudiante y trabajo
        if("Profesor" === this.props.loggedInUser.role){
          return (
            <div>
               
               <div style={{width: '40%', float:"right"}}>
                <AgregarMateria getData={() => this.getAllMaterias()}/>
            </div>
                
            </div>
          )
        } 
        
      }
      componentDidMount() {
        
        this.getAllMaterias();
      }
      render(){
        return(
          <div>
            <div  style={{width: '60%', float:"left"}}>
              { this.state.listOfMaterias.map((project, index) => {
                return (
                  <div className="materias" key={project._id}>
                  <h2> Materias disponibles</h2>
                    <Link to={`/materias/${project._id}`}>
                      <h3>{project.title}</h3>
                      <button onClick={() => this.inscribirse(project._id)}>Inscribirse</button>
                    </Link>
                    
                  </div>
                )})
              }
            </div>
            {this.checkProfesor(this.state)}
           
          </div>
        )
      }
      
}
export default MateriaList;