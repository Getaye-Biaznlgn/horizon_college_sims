<template>
   <div class="p-2 bg-white shadow-sm d-flex">
      <img src="../../assets/school.png" class="ms-3" height="40">
      <div class="pt-3">
         <h5 class="d-inline fw-bold ms-3">HORIZON</h5>
      </div>
      <!-- v-if="user.role==='department head'" -->
      <div  v-if="user.role==='department head'"  class="ms-5 ps-4 pt-1">
         <select class="form-select" @change="changeAcademicYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :selected="selectedAcademicYear===year.id" :value="year.id" >{{'Academic year '+year.year}}</option> 
         </select>
      </div>
        <div v-if="user.role==='registrar' || user.role==='cashier'" class="ms-5 mt-3">
         <select class="form-select" @change="changeAcYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :value="year.id" :selected="Number(year.is_current)=== Number(1)">{{'Academic year '+year.year}}</option> 
          </select>
      </div>
      <div class="d-flex ms-auto">
      <div v-if="user.role==='registrar' && notifications.length" class="me-5 mt-4 position-relative" align-items-center>
  <span @click="gotoApprove()" class="notification position-absolute top-0 start-100 translate-middle p-2 bg-primary text-white border border-light rounded-circle">
    <span>{{fetchNotifications.length}}</span>
  </span>
   <span class="notifyTitle">Un approved Students</span>
      </div>
      <div class="dropdown shadow-sm">
         <button class="btn  rounded dropdown-toggle p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <div class=" shadow-sm  p-0">
         <div class=" rounded-lg"  aria-expanded="false">
             <div class="d-flex">
                <div class="d-flex flex-column">
                   <span class="fw-bold small text-center">{{user.first_name +' '+ user.last_name}}</span>
                   <span v-if="user.role==='department head'">{{user.manage.name +' head'}}</span>
                   <span v-else class="job-title small align-self-start">{{user.role}}</span>
                </div>
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
   data(){
      return{
      notifications:[]
      }
   },
   created() {
        if(this.user.role=== 'registrar'){
         this.fetchNotifications()
      }
   },
   computed:{
   ...mapGetters(['user','academicYears','selectedAcademicYearId','acYearId','selectedAcademicYear'])  
   
   },
      methods:{
      changeAcademicYear(event){
         this.$store.commit('setSelectedAcademicYearId',event.target.value)
          this.$store.commit('setSelectedAcademicYear',event.target.value)
        this.$store.dispatch('degreeHead/fetchSections')
        this.$store.dispatch('degreeHead/fetchStudentInSemesters')
      },
      changeAcYear(event){
           this.$store.commit('setSelectedAcYearId',event.target.value) 
    this.$store.dispatch('registrar/fetchDegreeStudents',event.target.value)
     this.$store.dispatch('registrar/fetchTvetStudents',event.target.value)
      //this.$store.dispatch('registrar/fetchCocs',event.target.value)
       
      },
         async fetchNotifications(){
         try{
            var response = await apiClient.get('api/notifications')
            if(response.status === 200){
               this.notifications = response.data
            }
         }
         catch(e){
            console.log('error')
         }
      },
      gotoApprove(){
         this.$router.push({name:'DegreeStudent'})
      }
    
   },
}
</script>
<style scoped>
 .dropdown-toggle::after {
      display: none;
   }
  .notifybtn{
     background-color: #2f4587;
     color: #fff;
  }
  .notification:hover{
cursor: pointer;

  }
.notifyTitle{
   color: #fff;
}
.notifyTitle:hover{
   color: #000;
}


</style>
