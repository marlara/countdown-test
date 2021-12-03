<template>
    <v-card>
        <v-card-header>Create a new countdown</v-card-header>
        <v-card-text>Define your countdown</v-card-text>
        <v-form>
                <v-text-field
                v-model="title"
                label="Title: what this countdown is for"
                required
                ></v-text-field>
                
        </v-form>
        <div class="select">
            <select class="select-text" v-model="hours" 
                name="Select hours">
                <option value="" disabled selected>Select hour</option>
                <option v-for="n in selectTime(0,24)" :value="n" :key="n">
                    {{n}} hours
                </option>
            </select>
            <select class="select-text" v-model="minutes" 
                name="Select minutes">
                <option value="" disabled selected>Select minutes</option>
                <option v-for="n in selectTime(0,59)" :value="n" :key="n">
                    {{n}} minutes
                </option>
            </select>
            <select class="select-text" v-model="seconds" 
                name="Select seconds">
                <option value="" disabled selected>Select seconds</option>
                <option v-for="n in selectTime(0,59)" :value="n" :key="n">
                    {{n}} seconds
                </option>
            </select>
        </div>
        <v-btn elevation="2" @click="checkCountdown(this.hours, this.minutes, this.seconds)">Start</v-btn>
    </v-card>
    <v-card>
        {{message}}
        {{hh}}
        {{mm}}
        {{ss}}
    </v-card>
</template>



<script>
export default {
    data() {
        return {
            title: "",
            hours: "",
            minutes: "",
            seconds: "",
            message: "",
            timerEnabled: false,
            timer: 0,
            hh: "",
            mm: "",
            ss: ""
        }
    },

     watch: {
        timerEnabled(value) {
                if (value === true) {
                    this.startCountdown()
                }
            },

            /*timer(value){
                if (value > 0 && this.timerEnabled) {
                        setInterval(() => {
                            this.startCountdown()
                        }, 1000);

                }
            },*/
            immediate: true,

    },

    methods:{
        selectTime(start,stop){
            return new Array(stop-start).fill(start).map((n,i)=>n+i);
        },
        checkCountdown(hours, minutes, seconds){
            if (hours || minutes || seconds){
                this.message = "Good! Starting countdown",
                this.timerEnabled = true
            }
            else {
                return [
                    this.message = "Ops! This is an empty countdown!",
                    this.timerEnabled = false
                ]
            }
        },

        startCountdown(){
            this.timer = this.timeToSeconds(this.hours, this.minutes, this.seconds);
            let seconds = this.timer;
            setInterval(() => {
                this.hh = this.pad(Math.floor(seconds/3600));
                this.mm = this.pad(Math.floor(seconds % 3600 / 60));
                this.ss = this.pad(seconds % 60);
                --seconds;
            }, 1000);
        },
        
        timeToSeconds(hours, minutes, seconds){
            let remainingMinutes;
            let remainingSeconds;
            if (hours < 24){
                remainingMinutes = hours * 60;
            }
            if (minutes < 60){
                remainingSeconds = remainingMinutes + (minutes * 60);
            }
            if (seconds < 60) {
                remainingSeconds = remainingSeconds + seconds
            }
            return remainingSeconds
        },
        pad(n) {
            return (n < 10 ? "0" + n : n);
        }
    }
}
</script>