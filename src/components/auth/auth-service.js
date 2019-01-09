import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
    this.service = service;
  }
  signup = (name, password,email,role) => {
      console.log(name,password,email,role)
    return this.service.post('/signup', {name, password, email, role})
    .then(response => response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  login = (name, password) => {
      console.log(name)
    return this.service.post('/login', {name, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

}

export default AuthService;