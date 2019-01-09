import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class StudentDetails extends Component {
  constructor(props){
      super(props);
      this.state = {materias:[1],
                    trabajos:[1]};
  }



  getSingleStudent = () => {
      const { params } = this.props.match;
      axios.get(`${process.env.REACT_APP_API_URL}/user/${params.id}`, {withCredentials:true})
      .then( responseFromApi =>{
          const theStudent = responseFromApi.data;
         
         
          this.setState(theStudent);
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  
  trabajosPendientes = (trabajos)=>{
      const pendientes = []
      trabajos.forEach((trabajo)=>{
          if(!trabajo.status){
              pendientes.push(trabajo)
          }
      })
    
      return(
          <div>
          <h3>Trabajos pendientes</h3>
          { pendientes.map((trabajo, index) => {
            
                return (
                  <div key={index}>

                    <Link to={`/trabajo/${trabajo._id}`}>
                    
                      <p>{trabajo.titulo}</p>
                      </Link>
                      
                  
                    
                  </div>
                )})
              }
          </div>
          
      )

  }
  
 
    
  
  componentDidMount(){
      
    this.getSingleStudent();
 
    
}
  render(){
      
    return(
      <div>
        <h1>{this.state.name}</h1>
        <div >
            <h3>Materias inscritas</h3>
        {this.state.materias.map((materia,index)=>{
                return(
                    <div key={index}>
                    <p>{materia.title}</p>
                        </div>
                )

            })
            }
        </div>
        <div>
            
            {this.trabajosPendientes(this.state.trabajos)}
        </div>

        <Link to={'/materias'}>Ver lista de materias</Link>
      </div>
    )
  }
}

export default StudentDetails;