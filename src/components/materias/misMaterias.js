import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



class MateriaList extends Component{
    constructor(){
        super();
        this.state = { listOfMaterias:[]}
    }
    getAllMaterias = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/materiasUsuario`, {withCredentials:true})
        .then(responseFromApi => {
            
          this.setState({
            listOfMaterias: responseFromApi.data.materias
          })
        })
      }
      
      componentDidMount() {
        this.getAllMaterias();
      }
      render(){
        return(
          <div>
            <div className="materias" style={{width: '60%', float:"left"}}>
            <h2>Mis Materias</h2>
              { this.state.listOfMaterias.map((project, index) => {
                return (
                  <div className="materias" key={project._id}>
                    <Link to={`/materias/${project._id}`}>
                      <h3>{project.title}</h3>
                    </Link>
                    
                  </div>
                )})
              }
            </div>
           
          </div>
        )
      }
      
}
export default MateriaList;