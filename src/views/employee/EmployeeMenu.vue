<template>
    <div class="d-flex">
       <div class="sidebar">
          <the-sidebar ></the-sidebar>
        </div>
        <div class="content container-fluid p-0 m-0">
          <the-header  class="position-sticky header top-0 p-0 m-0"></the-header>
           <router-view ></router-view>    
        </div>
    </div>   
 
<div v-if="isLoading" class="loading-screen p-0  position-fixed top-0 bg-white start-0 w-100 h-100">
     <div class="loading-spinner">
          <img src="../../assets/preloader.gif"   alt="slow connection">
     </div>
</div>
</template>
<script>
import TheHeader from '../../components/employee/TheHeader.vue'
import TheSidebar from '../../components/employee/Sidebar.vue'
export default {
    components:{
      TheHeader,
      TheSidebar
    },
    computed:{
      isLoading(){
        return false;
      },
    },
    created(){
      this.$store.dispatch('fetchPrograms')
    }
}
</script>
<style scoped>
.sidebar{
  background-color: #3e46af;
  /* background-color: #6ab187; */
  min-height: 100vh;
  width: 20% !important;
}

.content{
  background-color: #f1f1f1;
  /* margin-left: 180px !important; */
}

.loading-spinner{
  position:absolute; 
  top: 10%;
  left: 40%;
}
</style>
