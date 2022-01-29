<template>
   <div class="position-fixed bottom-0 end-0 ml-3">
      <notification-message v-for="alertMessage in alertMessages" :key="alertMessage.id" :notification="alertMessage"  />
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationMessage from './NotificationMessage.vue'
export default {
  components:{NotificationMessage},
  computed:{
      ...mapGetters(['alertMessages'])
  }
}
</script>

