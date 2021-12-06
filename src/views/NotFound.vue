<template>
    <v-card class="mx-auto my-12" elevation="2" max-width="1000">
        <v-img
        class="align-top"
        src="@/assets/not_found.jpg"
        >
        <v-card-title>Not Found</v-card-title>
        </v-img>
        <v-card-text>Ops, we couldn't find that page you're looking for.
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn elevation="2" @click="$router.push('/')"> Return to Home page</v-btn>
        </v-card-actions>
    </v-card>
</template>