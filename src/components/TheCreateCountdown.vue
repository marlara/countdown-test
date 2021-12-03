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
        }
    },

     watch: {
        timerEnabled(value) {
                if (value) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
            },

            timerCount: {
                handler(value) {

                    if (value > 0 && this.timerEnabled) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

    },

    methods:{
        selectTime(start,stop){
            return new Array(stop-start).fill(start).map((n,i)=>n+i);
        },
        checkCountdown(hours, minutes, seconds){
            if (hours || minutes || seconds){
                return [
                    this.message = "Good! Starting countdown",
                    this.timerEnabled = true,
                ]
            }
            else {
                return this.message = "Ops! This is an empty countdown!"
            }
        },

        /*
        startCountdown(hours, minutes, seconds){
            const start = new Date;
            start.setHours(hours, minutes, seconds);

            function pad(num) {
                return ("0" + parseInt(num)).substr(-2);
            }
            function tick() {
                var now = new Date;
                var remain = ((start - now) / 1000);
                var hh = pad((remain / 60 / 60) % 60);
                var mm = pad((remain / 60) % 60);
                var ss = pad(remain % 60);
            setTimeout(tick, 1000);
            }

        }*/
    }
}
</script>