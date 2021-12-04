<template>
  <div>
    SONO LA HOME!
  </div>
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