import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8081/',
    json: true
  })
  export default {
    getCountdowns () {
        return client.get('/countdowns')
    },
    createCountdown (data) {
        return client.post('/countdowns', data)
    },
    deleteCountdown (id) {
        return client.delete(`/countdowns/${id}`)
    }
}