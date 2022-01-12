import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://192.168.1.12:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiClient