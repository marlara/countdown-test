<template>
    <v-card>
    <v-card-header>Manage existing countdowns</v-card-header>
    <v-card-text v-if="countdowns = []">
      <p>There are no countdowns yet!</p>
    </v-card-text>
    <v-card-text v-else>
      <v-alert :show="loading" variant="info">Loading...</v-alert>
          <div v-for="countdown in countdowns" :key="countdown.id">
          <!-- to modify -->
            <div>{{ countdown.id }}</div>
            <div>{{ countdown.title }}</div>
            <div>{{ countdown.updatedAt }}</div>
          <div>
              <a href="#" @click.prevent="populateCountdownToEdit(countdown)">Edit</a> -
              <a href="#" @click.prevent="deleteCountdown(countdown.id)">Delete</a>
          </div>
          <div>
            <div :title="(model.id ? 'Edit Countdown ID#' + model.id : 'New Countdown')">
            <form @submit.prevent="saveCountdown">
              <form-group label="Title">
              <form-input type="text" v-model="model.title"></form-input>
              </form-group>
              <form-group label="Body">
              <form-textarea rows="4" v-model="model.body"></form-textarea>
              </form-group>
              <div>
              <b-btn type="submit" variant="success">Save Countdown</b-btn>
              </div>
            </form>
            </div>
          </div>
        </div>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      countdowns: [],
      model: {}
    }
  },
  async created () {
    this.refreshCountdowns()
  },

  methods: {
    async refreshCountdowns () {
      this.loading = true
      this.countdowns = await api.getCountdowns()
      this.loading = false
    },
    async populateCountdownToEdit (countdown) {
      this.model = Object.assign({}, countdown)
    },
    async saveCountdown () {
      if (this.model.id) {
        await api.updateCountdown(this.model.id, this.model)
      } else {
        await api.createCountdown(this.model)
      }
      this.model = {} // reset form
      await this.refreshCountdowns()
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