import axios from 'axios'

const apiUsers = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users'
})

export default apiUsers