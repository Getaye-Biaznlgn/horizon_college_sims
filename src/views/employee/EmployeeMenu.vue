<template>
    <the-header  class="position-sticky top-0 header shadow p-0 m-0"></the-header>
    <div class="d-flex">
       <div class="sidebar shadow">
          <the-sidebar></the-sidebar>
        </div>
        <div class="container-fluid content">
           <router-view ></router-view> 
            <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100">
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
import apiClient from '../../resources/baseUrl'
import { mapGetters } from 'vuex';
export default {
    components:{
      TheHeader,
      TheSidebar
    },
   
    computed:{
      ...mapGetters(['isLoading','isItemLoading','user','acYearId'])
    },
    beforeCreate(){
     if(localStorage.getItem('token')){
         let token=localStorage.getItem('token')
         this.$store.dispatch('setToken', token)
         console.log('token', token)
         this.$store.dispatch('setIsAuthenticated', true)
         apiClient.defaults.headers.common['Authorization'] =`Bearer ${token}`
     } 
     if(localStorage.getItem('user')){
        let user=localStorage.getItem('user')
        console.log('user data',user)
        this.$store.dispatch('setUser', JSON.parse(user))
     }
  },
    created(){
       this.$store.dispatch('fetchAcademicYears')
       .then(()=>{
           this.$store.getters.academicYears.forEach((year)=>{
           if(Number(year.is_current) === 1) {
             console.log('active year id yyy  = '+year.id)
               this.$store.commit('setSelectedAcademicYearId', year.id)
                  this.$store.commit('setSelectedAcYearId',year.id) 
                console.log('active acyearr id from state',this.$store.getters['acYearId'])
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
    this.$store.dispatch('registrar/fetchActiveYearSemister')
     this.$store.dispatch('registrar/fetchAcadamicMounths')
     this.$store.dispatch('registrar/fetchDegreeStudents')
     this.$store.dispatch('registrar/fetchTvetStudents')
       this.$store.dispatch('registrar/fetchLevels')   
      }
      else if(this.user.role==='department head'){
        this.$store.dispatch('degreeHead/fetchCourses')
        this.$store.dispatch('degreeHead/fetchSections')
        this.$store.dispatch('degreeHead/fetchStudentInSemesters')
      }
      else if(this.user.role === 'cashier'){
    //actions used by cashier
      }
      //actions used by registrar
      else if(this.user.role === 'registrar'){
        this.$store.dispatch('registrar/fetchAcadamicMounths')
      this.$store.dispatch('dean/fetchDegreeDepartments')
      this.$store.dispatch('dean/fetchTvetDepartments')
      this.$store.dispatch('registrar/fetchActiveYearSemisters')
       this.$store.dispatch('registrar/fetchLevels')
         this.$store.dispatch('dean/fetchDegreePrograms')
      this.$store.dispatch('dean/fetchTvetPrograms')
        
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
  /* z-index: 1; */
}
.route-loading{
  background-color: rgba(0, 0, 0, 0.5);;
  z-index: 1;
}
.content{
  background-color: #f5f6fa !important;
}
.loading-screen{
  z-index: 1;
}
.header{
  z-index: 1;
}
</style>
<style>
table {
  border-collapse: collapse;
  width: 100%;
}
/* new design change start*/
tr:last-child { border-bottom: 2px solid hsl(231, 16%, 91%) }
th{
  text-align: left;
  padding: 8px;
}
tr{
  border-top: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
/* end */
.btn-add{
    background-color: #2f4587;
}
.btn-add:hover{
  background-color: #425fb8;
}
.fa-sign-out-alt{
  transform: rotate(-90deg);
}
.warining input, .warining textarea{
    border: 1px red solid;
  }
.warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
  .search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
  .input-group{
    padding: 0 !important;
    margin: 0 !important;
  }

  input[type="radio"]:checked{
 background-color: #2f4587;
 border: none;
}
</style>
