import axios from 'axios'

const api = axios.create({
    baseURL: 'https://provadev.xlab.digital/api/v1/divida/?uuid=82e53167-1faa-4b81-a5af-03507c4aeab7'
})

export default api