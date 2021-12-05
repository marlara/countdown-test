<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
    <v-img
        class="align-top"
        src="@/assets/home_2.jpg"
        >
      <v-card-title>Countdown created</v-card-title>
    </v-img>
    <v-card-text v-if="!countdowns">
      <p>There are no countdowns yet! Have you started the server?</p>
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
      dataChanged: false
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
        await api.deleteCountdown(id)
        await api.getCountdowns()
      }
    }
  }
}
</script>