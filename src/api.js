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
    updateCountdown (id, data) {
        return this.execute('put', `/countdown/${id}`, data)
    },
    deleteCountdown (id) {
        return this.execute('delete', `/countdown/${id}`)
    }
}