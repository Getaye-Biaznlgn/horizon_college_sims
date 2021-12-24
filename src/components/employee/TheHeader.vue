<template>
   <div class="p-1 bg-white shadow-sm d-flex">
      <img src="../../assets/school.png" class="ms-3" height="40">
      <div class="pt-3">
         <h5 class="d-inline fw-bold ms-3">HORIZON</h5>
      </div>
      <div v-if="user.role==='department head'" class="ms-5 ps-4 pt-1 d-flex">
         <select class="form-select" @change="changeAcademicYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :value="year.id" :selected="year.status===selectedAcademicYearId">{{'Academic year '+year.year}}</option> 
          </select>
      </div>
      <div class="dropdown shadow-sm  p-0 ms-auto">
         <button class="btn  rounded dropdown-toggle p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
             <div class="d-flex">
                <div class="d-flex flex-column">
                   <span class="fw-bold small">{{user.first_name +' '+ user.last_name}}</span>
                   <span class="job-title small align-self-start">{{user.role}}</span>
                </div>
             </div>
         </button>
     </div>
   </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
   data(){
      return{
      }
   },
   computed:{
   ...mapGetters(['user','academicYears','selectedAcademicYearId']),
   
   },
   methods:{
      changeAcademicYear(event){
         this.$store.commit('setSelectedAcademicYearId',event.target.value)
      }
   },
   created(){
   
   }
  
}
</script>
<style scoped>
 .dropdown-toggle::after {
      display: none;
   }


</style>