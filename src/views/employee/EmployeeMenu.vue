<template>
    <the-header  class="position-sticky top-0 shadow p-0 m-0"></the-header>
    <div class="d-flex">
       <div class="sidebar shadow">
          <the-sidebar></the-sidebar>
        </div>
        <div class="container-fluid content">
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
import apiClient from '../../store/baseUrl'
import { mapGetters } from 'vuex';
export default {
    components:{
      TheHeader,
      TheSidebar
    },
   
    computed:{
      ...mapGetters(['isLoading','isItemLoading','user'])
    },
    beforeCreate(){
     if(localStorage.getItem('token')){
         let token=localStorage.getItem('token')
         this.$store.dispatch('setToken', token)
         this.$store.dispatch('setIsAuthenticated', true)
         apiClient.defaults.headers.common['Authorization'] =`Bearer ${token}`
     } 
     if(localStorage.getItem('user')){
        let user=localStorage.getItem('user')
        this.$store.dispatch('setUser', JSON.parse(user))
     }
  },
    created(){
       this.$store.dispatch('fetchAcademicYears')
       .then(()=>{
           this.$store.getters.academicYears.forEach((year)=>{
           if(year.status===1) {
               this.$store.commit('setSelectedAcademicYearId', year.id)
               }   
            })
           }
          )
      if(this.user.role==='dean'){  
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
      }
      else if(this.user.role==='department head'){
        this.$store.dispatch('degreeHead/fetchCourses')
        this.$store.dispatch('degreeHead/fetchSections')
        this.$store.dispatch('degreeHead/fetchStudents')
        this.$store.dispatch('degreeHead/fetchStudentInSemesters')
        this.$store.dispatch('degreeHead/fetchSlips')
        this.$store.dispatch('degreeHead/fetchGrades')
      }

      
       this.$store.dispatch('fetchPrograms')
    
    }
}
</script>
<style scoped>
.sidebar{
  background-color: #ECF1FE;
  /* background-color: #6ab187; */
  min-height: 100vh;
  width: 20% !important;
}
.loading-spinner{
  position:absolute; 
  top: 10%;
  left: 40%;
}
.route-loading{
  background-color: rgba(0, 0, 0, 0.5);;
}
.content{
  background-color: #f5f6fa !important;
}
</style>
