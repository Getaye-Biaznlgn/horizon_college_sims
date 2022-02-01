import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://10.161.178.177:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiClient