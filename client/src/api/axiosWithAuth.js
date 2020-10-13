import axios from 'axios'

export const baseURL = "http://localhost:5000/api"
export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')
    return axios.create({
        headers: {
            authorization: token
        }
    })
}