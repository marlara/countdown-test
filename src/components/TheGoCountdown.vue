<template>
    <v-card class="mx-auto my-12" elevation="2"
    v-show="message">
        <v-alert
        type="success"
        >{{message}}</v-alert>
        <v-row no-gutters justify="space-around">
             <v-col align="center">
                <v-card-text>{{hh}}</v-card-text><v-divider vertical></v-divider>
            </v-col>
            <v-col align="center">
                <v-card-text>{{mm}}</v-card-text><v-divider vertical></v-divider>
            </v-col>
            <v-col align="center">
                <v-card-text>{{ss}}</v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        hh: {type: [Number, String], required: false},
        mm: {type: [Number, String], required: false},
        ss: {type: [Number, String], required: false},
        timerEnabled: {type: Boolean, required: true},
        message: {type: String, required: true},
        timer: {type: Number, required: true}
    },
}
</script>