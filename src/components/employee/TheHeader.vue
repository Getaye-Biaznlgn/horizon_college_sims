<template>
   <div class="p-1 bg-white shadow-sm d-flex">
      <img src="../../assets/logo.png" class="ms-3 align-self-center rounded-circle" height="50" width="60">
      <div class="pt-3">
         <h5 class="d-inline ms-3 fw-bold">HORIZON</h5>
      </div>
      <div class="ms-5 ps-4 pt-1 d-flex">
         <select v-if="user.role==='dean' || user.role==='tvet_head' || user.role==='degree_head'" class="form-select" @change="changeAcademicYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :selected="selectedAcademicYearId===year.id" :value="year.id" >{{'Academic year '+year.year}}</option> 
         </select>
         <div v-if="user.role==='dean'" class="mt-1 px-3">
            <router-link :to="{name:'SelectedAcademicYearDetail'}">
               <span><i class="far fa-calendar text-dark-blue fs-2 "></i></span>
            </router-link>
            
         </div>
         <div v-if="user.role==='dean'" >
            <button @click="$router.push({name:'AddNewAcademicYear'})" class="btn btn-add text-white">
              <span style="white-space: nowrap!important; overflow: hidden;">Add New Calendar</span>
            </button>
         </div>
      </div>
        <div v-if="user.role==='registrar' || user.role==='cashier'" class="ms-5 mt-1">
         <select class="form-select" @change="changeAcYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :value="year.id" :selected="Number(year.is_current)=== Number(1)">{{'Academic year '+year.year}}</option> 
          </select>
      </div>
      <div class="d-flex ms-auto">
      <div v-if="user.role==='registrar' && notifications" class="me-5 mt-1 position-relative" align-items-center>
  <span @click="gotoApprove()" class="notification mt-4 position-absolute top-0 start-100 translate-middle p-2 text-white border border-light rounded-circle">
    <span>{{notifications}}</span>
  </span>
      </div>
     <div class="shadow-sm  p-0 ms-auto">
         <div class=" rounded-lg  p-1"  aria-expanded="false">
             <div class="d-flex">
                <span class="align-self-center btn-add text-white p-1 rounded mx-2"><i class="fas fa-user fs-4 fw-bold"></i></span>
                <div class="d-flex flex-column">
                   <span class="fw-bold small text-center">{{user.first_name +' '+ user.last_name}}</span>
                   <span v-if="user.role==='department head'">{{user.manage.name +' head'}}</span>
                   <span v-else class="job-title small align-self-start">{{capitize(user.role?.split('_').join(' '))}}</span>
                </div>
             </div>
         </div>
     </div>
      </div>
   </div>
</template>
<script> 
import apiClient from '../../resources/baseUrl'
import { mapGetters } from 'vuex'
export default {
 
   created() {
        if(this.user.role=== 'registrar'){
         this.fetchNotifications()
      }
   },
   computed:{
   ...mapGetters(['user','academicYears','selectedAcademicYearId','acYearId','notifications']) ,
   notifications(){
      return this.$store.getters.notifications
   } 
   
   },
   methods:{
      changeAcademicYear(event){
        this.$store.commit('setSelectedAcademicYearId',event.target.value)
        if(this.user.role==='degree_head')
        this.$store.dispatch('degreeHead/fetchStudentInSemesters')
      },
      changeAcYear(event){
           this.$store.commit('setSelectedAcYearId',event.target.value) 
    this.$store.dispatch('registrar/fetchDegreeStudents',event.target.value)
     this.$store.dispatch('registrar/fetchTvetStudents',event.target.value)
      this.$store.dispatch('registrar/fetchActiveYearSemisters',event.target.value)
       
      },
      async fetchNotifications(){
         try{
            var response = await apiClient.get('api/notifications/'+this.user.id)
            if(response.status === 200){
               console.log('notificationsm== ',response.data)
               this.$store.commit('setNotifications',response.data.length)
            }
         }
         catch(e){
            console.log('error')
         }
      },
      gotoApprove(){
         this.$router.push({name:'DegreeStudent'})
      },
    capitize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
   },
}
</script>
<style scoped>
 .dropdown-toggle::after {
      display: none;
   }
  .notification{
cursor: pointer;
background-color: #2f4587;
color: #fff;

  }
.text-dark-blue{
  color: #2f4587;
}
</style>
