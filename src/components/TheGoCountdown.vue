<template>
    <v-alert class="mx-auto" 
    v-show="message"
    :type="typeAlert()"
    >{{message.mess}}</v-alert>
    <v-expand-transition>
        <v-card class="mx-auto my-6" elevation="2"
        v-show="timerEnabled">
            <v-row no-gutters justify="space-around">
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4">{{hh}}</v-card-text>
                </v-col>
                <div class="text-h3 my-4">:</div>
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4">{{mm}}</v-card-text>
                </v-col>
                <div class="text-h3 my-4">:</div>
                <v-col align="center">
                    <v-card-text class="text-h2 ma-4">{{ss}}</v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-expand-transition>
</template>

<script>
export default {
    props: {
        hh: {type: [Number, String], required:false},
        mm: {type: [Number, String], required:false},
        ss: {type: [Number, String], required:false},
        timerEnabled: {type: Boolean, required:false},
        message: {type: Object, required:false},
        timer: {type: Number,  required:false}
    },
    
    data(){
        return {
            
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
