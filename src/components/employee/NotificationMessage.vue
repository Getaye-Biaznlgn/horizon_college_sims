<template>
   <div :class="alertClass" class="alert alert-dismissible fade show" role="alert">
       {{notification.text}}
       
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>
</template>

<script>

export default {
 props:['notification'],
 data(){
     return{
         timeout:null
     }
 },
 computed:{
    alertClass(){
        return `alert-${this.notification.type}`
    }
 },
 created(){
    setTimeout(()=>{
     this.timeout=  this.$store.commit('removeAlerMessage',this.notification.id)
    },3000)
 },
 beforeUnmount(){
     clearTimeout(this.timeout)
 }
}
</script>

<style>

</style>