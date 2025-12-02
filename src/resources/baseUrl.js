import axios from "axios";
let apiClient = axios.create({
    baseURL: 'https://backend-laravel.horizoncollege.com/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiClient