import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  // console.error(err);
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message
  }
  throw err;
}

export default {

  // You can have as many methods as you want

  // Method addPicture
  addPicture(file,id) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post(`/trabajohecho/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  }
} 