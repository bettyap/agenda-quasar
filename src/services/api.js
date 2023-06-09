import axios from 'axios'

const api = axios.create({
  baseURL: 'https://demometaway.vps-kinghost.net:8487/api',
});

const token = localStorage.getItem("token")
if (token){
  api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export default api