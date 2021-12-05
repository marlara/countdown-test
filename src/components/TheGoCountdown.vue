
<template>
    <v-alert class="mx-auto" 
    v-show="message"
    :type="typeAlert()"
    >{{message.mess}}</v-alert>
        <v-card class="mx-auto my-6" elevation="2"
        v-show="goTimer">
            <v-row no-gutters justify="space-around">
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4 time">{{hh}}</v-card-text>
                </v-col>
                <div class="text-h3 my-4">:</div>
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4 time">{{mm}}</v-card-text>
                </v-col>
                <div class="text-h3 my-4">:</div>
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4">{{ss}}</v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mx-auto my-6" elevation="2"
        v-show="endTimer">
        <v-card-title class="justify-center"> TIME ENDED!</v-card-title>
        <v-img
        class="pb-4"
        width="1000"
        src="@/assets/end.png"
        >
        </v-img>
        </v-card>
</template>

<script>
export default {
    props: {
        hh: {type: [Number, String], required:false},
        mm: {type: [Number, String], required:false},
        ss: {type: [Number, String], required:false},
        message: {type: Object, required:false},
        timer: {type: [Number, String],  required:false}
    },
    
    data(){
        return {
            goTimer: null,
            endTimer: null
        }
    },

    watch: {
    timer (value) { //watch the timerEnabled: if true it can starts the countdown
            if (value) {
                this.goTimer = true
                this.endTimer = false
            }
            if (value === 0 | value === -1){
                this.goTimer = false
                this.endTimer = true
            }
        }
    },

    methods: {
        typeAlert(){
            if (this.message.value=="success"){
                return "success"
            }
            if (this.message.value=="error"){
                return "error"
            }
            else{
                return "info"
            }
        },
    }
}
</script>