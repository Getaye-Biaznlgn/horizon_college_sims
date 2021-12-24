<template>
    <div class="d-flex">
       <div class="sidebar">
          <the-sidebar  ></the-sidebar>
        </div>
        <div class="content container-fluid p-0 m-0 position-relative">
          <the-header  class="position-sticky header top-0 p-0 m-0"></the-header>
           <router-view ></router-view> 
            <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-absolute top-0 start-0 w-100 h-100">
               <div class="loading-spinner">
                   <img src="../../assets/preloader.gif"   alt="slow connection">
               </div>
            </div>   
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
import { mapGetters } from 'vuex';
export default {
    components:{
      TheHeader,
      TheSidebar
    },
   
    computed:{
      ...mapGetters(['isLoading','isItemLoding'])
    },
    created(){
      this.$store.dispatch('dean/fetchTeachers')
      this.$store.dispatch('dean/fetchDepartmentHeads')
      this.$store.dispatch('dean/fetchRegistrars')
      this.$store.dispatch('dean/fetchCashiers')
      this.$store.dispatch('dean/fetchDegreeDepartments')
      this.$store.dispatch('dean/fetchTvetDepartments')
      this.$store.dispatch('dean/fetchCourses')
      this.$store.dispatch('dean/fetchModules')
      this.$store.dispatch('dean/fetchDegreePrograms')
      this.$store.dispatch('dean/fetchTvetPrograms')
    //  actions used oly in registrar mogule
    this.$store.dispatch('registrar/fetchActiveYearSemister')
     this.$store.dispatch('registrar/fetchAcadamicMounths')
     this.$store.dispatch('registrar/fetchDegreeStudents')
     this.$store.dispatch('registrar/fetchTvetStudents')
     this.$store.dispatch('registrar/fetchAcadamicMounths')
       this.$store.dispatch('registrar/fetchLevels')
       //actions used by cashier
      this.$store.dispatch('cashier/fetchCalender')
       this.$store.dispatch('cashier/fetchPaymentTypes')
       
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
.route-loading{
  background-color: rgba(0, 0, 0, 0.5);;
}
</style>
