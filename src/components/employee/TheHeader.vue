<template>
   <div class="p-1 bg-white shadow-sm d-flex">
      <img src="../../assets/school.png" class="ms-3" height="40">
      <div class="pt-3">
         <h5 class="d-inline fw-bold ms-3">HORIZON</h5>
      </div>
      <div v-if="user.role==='department head'" class="ms-5 ps-4 pt-1 d-flex">
         <select class="form-select" @change="changeAcademicYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :value="year" :selected="year.is_current===1">{{'Academic year '+year.year}}</option> 
          </select>
      </div>
      <div class=" shadow-sm  p-0 ms-auto">
         <div class=" rounded-lg  p-1"  aria-expanded="false">
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
</template>
<script>
import { mapGetters } from 'vuex'
export default {
   computed:{
   ...mapGetters(['user','academicYears','selectedAcademicYear']),
   },
   methods:{
      changeAcademicYear(event){
         this.$store.commit('setSelectedAcademicYear',event.target.value)
        this.$store.dispatch('degreeHead/fetchSections')
        this.$store.dispatch('degreeHead/fetchStudentInSemesters')
      }
   },
   created(){
   
   }
  
}
</script>
