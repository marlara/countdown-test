<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
    <v-card-header>Countdown created</v-card-header>
    <v-card-text v-if="countdowns = []">
      <p>There are no countdowns yet!</p>
    </v-card-text>
    <v-card-text v-else>
      <v-alert :show="loading" variant="info">Loading...</v-alert>
          <div v-for="countdown in countdowns" :key="countdown.id">
          <!-- to modify -->
            <div>{{ countdown.id }}</div>
            <div>{{ countdown.hours }}</div>
            <div>{{ countdown.minutes }}</div>
            <div>{{ countdown.seconds }}</div>
            <div>{{ countdown.createddAt }}</div>
          <div>
              <a href="#" @click.prevent="deleteCountdown(countdown.id)">Delete</a>
          </div>
        </div>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api.js'

export default {
  data () {
    return {
      loading: false,
      countdowns: [],
      model: {}
    }
  },
  async mounted () {
    //const countdownId = this.$store.state.route.params.countdownId //the synchronization vuex-router
    this.countdowns = await api.getCountdowns()
  },

  methods: {
    async refreshCountdowns () {
      this.loading = true
      this.countdowns = await api.getCountdowns()
      this.loading = false
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