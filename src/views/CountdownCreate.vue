<template>
  <v-app>
  <h1>Countdown Creator</h1>
   <v-card class="mx-auto my-12" elevation="2" max-width="1000">
       <v-img
        class="align-end"
        src="@/assets/time_header.jpg"
        >
        <v-card-title>Create a new countdown</v-card-title>
        </v-img>
        <v-card-subtitle class="pt-6">Use the selectors below</v-card-subtitle>
        <div class="mx-auto my-6 px-6">
            <div class="select">
                <select class="select-text" v-model="hours" 
                    :disabled="submitted"
                    name="Select hours">
                    <option value="0" disabled selected>Select hour</option>
                    <option v-for="n in selectTime(0,24)" :value="n" :key="n">
                        {{n}} hours
                    </option>
                </select>
                <select class="select-text" v-model="minutes" 
                    :disabled="submitted"
                    name="Select minutes">
                    <option value="0" disabled selected>Select minutes</option>
                    <option v-for="n in selectTime(0,60)" :value="n" :key="n">
                        {{n}} minutes
                    </option>
                </select>
                <select class="select-text" v-model="seconds" 
                    :disabled="submitted"
                    name="Select seconds">
                    <option value="0" disabled selected>Select seconds</option>
                    <option v-for="n in selectTime(0,60)" :value="n" :key="n">
                        {{n}} seconds
                    </option>
                </select>
            </div>
        </div>
        <v-card-actions class="justify-center">
            <v-btn class="px-4" elevation="2" 
            @click="checkCountdown(this.hours, this.minutes, this.seconds)"
            :disabled="submitted"
            >Start</v-btn>
            <v-btn elevation="2" 
            @click="pause()">Pause</v-btn>
            <v-btn elevation="2" 
            @click="reset()">Reset</v-btn>
        </v-card-actions>
    </v-card>
  <go-countdown 
    :hh="this.hh"
    :mm="this.mm"
    :ss="this.ss"
    :timerEnabled="this.timerEnabled"
    :timer="this.timer"
    :message="this.message"
  />
  </v-app>
</template>

<script>
import GoCountdown from '../components/TheGoCountdown.vue'
import api from '@/api.js'

export default {
  components: { 
    GoCountdown
    },

  data() {
        return {
            submitted: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            message: {
                value: "info", 
                mess: "You have to set at least an hour, a minute or a second"
            },
            timerEnabled: false, //used to check if the countdown is ok
            timer: 0,
            hh: "",
            mm: "",
            ss: ""
        }
    },

  watch: {
    timerEnabled (value) { //watch the timerEnabled: if true it can starts the countdown
            if (value === true) {
                this.startCountdown()
            }
        }
  },

  methods:{
      selectTime (start,stop){ //creates the input selection for hours, minutes and seconds
          return new Array(stop-start).fill(start).map((n,i)=>n+i);
      },
      checkCountdown (hours, minutes, seconds){ //checks if the countdown is properly set, if so, set the timerEnabled as true
          if (hours || minutes || seconds){
              this.message = {
                  value: "success",
                  mess: "Good! I'm counting"
                },
              this.timerEnabled = true
              this.submitted = true
              this.saveCountdown(hours, minutes, seconds)
          }
          else {
              return [
                  this.message = {
                      value: "error",
                      mess: "Ops! This is an empty countdown!"
                  },
                  this.timerEnabled = false
              ]
          }
      },

      startCountdown (){ //the true countdown, uses the timeToSeconds() and the pan() functions
          this.timer = this.timeToSeconds(this.hours, this.minutes, this.seconds);
          let seconds = this.timer;
          setInterval(() => {
              if(seconds >= 0 && this.timerEnabled === true){ //stop the countdown
                  this.hh = this.pad(Math.floor(seconds/3600));
                  let divisor_for_minutes = seconds % (60 * 60);
                  this.mm = this.pad(Math.floor(divisor_for_minutes / 60));
                  let divisor_for_seconds = divisor_for_minutes % 60;
                  this.ss = this.pad(Math.ceil(divisor_for_seconds));
                  --this.timer;
                  --seconds;
              }
          }, 1000);
          
      },
      
      timeToSeconds (hours, minutes, seconds){ //transforms the userinput into seconds
          let remainingMinutes;
          let remainingSeconds;
          if (hours < 24){
              remainingMinutes = hours * 3600;
          }
          if (minutes < 60){
              remainingSeconds = remainingMinutes + (minutes * 60);
          }
          if (seconds < 60) {
              remainingSeconds = remainingSeconds + seconds
          }
          return remainingSeconds
      },
      pad (n) { //pad a 0 if needed displaying the countdown numbers
          return (n < 10 ? "0" + n : n);
      },

      pause () {
          this.timerEnabled = false;
          this.message = {
            value: "info", 
            mess: "Countdown paused"
          }
      },

      reset(){
          clearInterval (this.startCountdown)
          this.timer = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
          this.hh = "";
          this.mm = "";
          this.ss = "";
          this.timerEnabled = false;
          this.message = {
            value: "info", 
            mess: "Ok, countdown cleared!"
          }
      },

      async saveCountdown (hours, minutes, seconds){
          const countdown = {
              "hours": hours,
              "minutes": minutes,
              "seconds": seconds
          }
          console.log(countdown)
          try {
              await api.createCountdown(countdown)
          } catch (err) {
              console.log(err)
          }
      }
  }
}
</script>