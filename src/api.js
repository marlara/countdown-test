import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
    async execute (method, resource, data) {
        return client({
            method,
            url: resource,
            data
        }).then(req => {
          return req.data
        })
      },
    getCountdowns () {
        return this.execute('get', '/countdown')
    },
    getCountdown (id) {
        return this.execute('get', `/countdown/${id}`)
    },
    createCountdown (data) {
        return this.execute('post', '/countdown', data)
    },
    updateCountdown (id, data) {
        return this.execute('put', `/countdown/${id}`, data)
    },
    deleteCountdown (id) {
        return this.execute('delete', `/countdown/${id}`)
}
}