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
                <option value="0" disabled selected>Select hour</option>
                <option v-for="n in selectTime(0,24)" :value="n" :key="n">
                    {{n}} hours
                </option>
            </select>
            <select class="select-text" v-model="minutes" 
                name="Select minutes">
                <option value="0" disabled selected>Select minutes</option>
                <option v-for="n in selectTime(0,59)" :value="n" :key="n">
                    {{n}} minutes
                </option>
            </select>
            <select class="select-text" v-model="seconds" 
                name="Select seconds">
                <option value="0" disabled selected>Select seconds</option>
                <option v-for="n in selectTime(0,59)" :value="n" :key="n">
                    {{n}} seconds
                </option>
            </select>
        </div>
        <v-btn elevation="2" @click="checkCountdown(this.hours, this.minutes, this.seconds)">Start</v-btn>
        <v-btn elevation="2" @click="pause()">Pause</v-btn>
        <v-btn elevation="2" @click="reset()">Reset</v-btn>
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
            hours: 0,
            minutes: 0,
            seconds: 0,
            message: "",
            timerEnabled: false, //used to check if the countdown is ok
            timer: 0,
            hh: "",
            mm: "",
            ss: ""
        }
    },

     watch: {
        timerEnabled(value) { //watch the timerEnabled: if true it can starts the countdown
                if (value === true) {
                    this.startCountdown()
                }
            },
            immediate: true,
    },

    methods:{
        selectTime(start,stop){ //creates the input selection for hours, minutes and seconds
            return new Array(stop-start).fill(start).map((n,i)=>n+i);
        },
        checkCountdown(hours, minutes, seconds){ //checks if the countdown is properly set, if so, set the timerEnabled as true
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

        startCountdown(){ //the true countdown, uses the timeToSeconds() and the pan() functions
            this.timer = this.timeToSeconds(this.hours, this.minutes, this.seconds);
            let seconds = this.timer;
            setInterval(() => {
                if(seconds >= 0 && this.timerEnabled === true){ //stop the countdown
                    this.hh = this.pad(Math.floor(seconds/3600));
                    let divisor_for_minutes = seconds % (60 * 60);
                    this.mm = this.pad(Math.floor(divisor_for_minutes / 60));
                    let divisor_for_seconds = divisor_for_minutes % 60;
                    this.ss = this.pad(Math.ceil(divisor_for_seconds));
                    --seconds;
                }
            }, 1000);
            
        },
        
        timeToSeconds(hours, minutes, seconds){ //transforms the userinput into seconds
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
        pad(n) { //pad a 0 if needed displaying the countdown numbers
            return (n < 10 ? "0" + n : n);
        },

        pause() {
            this.timerEnabled = false;
        },

        reset(){

        }
    }
}
</script>