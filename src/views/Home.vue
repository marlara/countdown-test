<template>
  <v-card class="mx-auto my-12" elevation="2" max-width="1000">
    <v-img
        class="align-top"
        src="@/assets/home_first.jpg"
        >
      <v-card-title>Welcome!</v-card-title>
    </v-img>
    <v-card-text>See below the countdown created. If you want to create a new one, you can go the dedicated page.</v-card-text>
    <v-card-actions class="justify-center py-4">
    <v-btn class="px-4" elevation="2" @click="$router.push('/countdown-create')">I want to create a new one!</v-btn>
    </v-card-actions>
  </v-card>
  <manage-countdown />
</template>

<script>
import ManageCountdown from '@/components/TheManageCountdown.vue'
export default {
  name: 'MyHome',
  
  components:{
    ManageCountdown
  }
};
</script>