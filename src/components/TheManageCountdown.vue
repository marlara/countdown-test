<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
    <v-card-title>Countdown created</v-card-title>
    <v-card-text v-if="!countdowns">
      <p>There are no countdowns yet!</p>
    </v-card-text>
    <v-card-text v-else>
      <p class="mb-4">If you want to delete a countdown use the button.</p>
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
        <tr v-for="countdown in countdowns.data" :key="countdown.id">
          <td>{{ countdown.id }}</td>
          <td>{{ countdown.hours }}</td>
          <td>{{ countdown.minutes }}</td>
          <td>{{ countdown.seconds }}</td>
          <td>{{ countdown.createdAt }}</td>
          <td><v-btn href="#" @click.prevent="deleteCountdown(countdown.id)">Delete</v-btn></td>
          </tr>
        </thead>
        </table>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api.js'

export default {
  data () {
    return {
      loading: false,
      countdowns: null,
      dataChanged: false,
      model: {}
    }
  },

  async mounted () {
    this.countdowns = await api.getCountdowns()
    this.getData(this.countdowns)
  },

  methods: {
    getData(){
      //const data = countdowns.data
      
    },

    async deleteCountdown (id) {
      if (confirm('Are you sure you want to delete this countdown?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteCountdown(id)
        await this.refreshCountdowns()
      }
    }
  }
}
</script>