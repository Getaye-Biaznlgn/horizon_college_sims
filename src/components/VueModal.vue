<template>
    <transition>
        <div v-if="modalState" class="modalm w-100  h-100 position-fixed top-0 start-0" open>
         
         <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    props:['modalState']
}
</script>
<style scoped>
.modalm{
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
}
/* modal transition */
.v-enter-from{
  opacity: 0;
  transform: translateY(-30);
}
.v-enter-active{
  transition: all 0.3s ease-out;
}
.v-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from{
  opacity: 1;
  transform: translateY(-30);
}
.v-leave-active{
  transition: all 0.3s ease-in;
}
.v-leave-to{
  opacity: 0;
}
</style>