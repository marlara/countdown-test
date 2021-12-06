<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
    <v-img
        class="align-top"
        src="@/assets/home_2.jpg"
        >
      <v-card-title>Countdown created</v-card-title>
    </v-img>
    <v-card-text v-if="!this.countdowns">
      <p>There are no countdowns yet! Have you started the server?</p>
    </v-card-text>
    <v-card-text v-else>
      <v-row class="mb-4">
        <v-card-text>If you want to delete a countdown use the button.</v-card-text><v-spacer></v-spacer><v-btn elevation="2" @click="refreshCountdowns()">Reload the table</v-btn>
      </v-row>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Hours</th>
          <th>Minutes</th>
          <th>Seconds</th>
          <th>Created at</th>
          <th>Delete</th>
        </tr>
        <tr v-for="(countdown, index) in this.countdowns.data" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ countdown.hours }}</td>
          <td>{{ countdown.minutes }}</td>
          <td>{{ countdown.seconds }}</td>
          <td>{{ format_date(countdown.createdAt) }}</td>
          <td><v-btn href="#" @click.prevent="deleteCountdown(countdown.id, index)">Delete</v-btn></td>
          </tr>
        </thead>
        </table>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api.js'
import moment from 'moment'

export default {
  data () {
    return {
      countdowns: null
    }
  },

  async mounted () {
    this.countdowns = await api.getCountdowns()
  },

  methods: {

    async refreshCountdowns(){
      this.countdowns = await api.getCountdowns()
    },
    
    format_date(value){
      if (value) {
        return moment(String(value)).format('YYYY- MM - DD  HH:MM:SS')
      }
    },

    async deleteCountdown (id, index) {
      if (confirm('Are you sure you want to delete this countdown?')) {
        const response = await api.deleteCountdown(id)
        this.countdowns.data.splice(index, 1)
        return response
      }
    }
  }
}
</script>