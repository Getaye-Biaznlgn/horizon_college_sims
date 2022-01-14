<template>
   <div class="p-1 bg-white shadow-sm d-flex">
      <img src="../../assets/logo.png" class="ms-3 align-self-center" height="50">
      <div class="pt-3">
         <h5 class="d-inline fw-bold ms-3">HORIZON</h5>
      </div>
      <!-- v-if="user.role==='department head'" -->
      <div  class="ms-5 ps-4 pt-1 d-flex">
         <select class="form-select" @change="changeAcademicYear($event)"  aria-label="select ">
            <option  v-for="year in academicYears" :key="year.id" :selected="selectedAcademicYear===year.id" :value="year.id" >{{'Academic year '+year.year}}</option> 
         </select>
         
         <div v-if="user.role==='dean'" class="ms-2 mt-1" >
            <button @click="$router.push({name:'AddNewAcademicYear'})" class="btn btn-add text-white">
              <span style="white-space: nowrap!important; overflow: hidden;">Add New Calendar</span>
            </button>
         </div>
      </div>
      <div class="shadow-sm  p-0 ms-auto">
         <div class=" rounded-lg  p-1"  aria-expanded="false">
             <div class="d-flex">
                <span class="align-self-center btn-add text-white p-1 rounded mx-2"><i class="fas fa-user fs-4 fw-bold"></i></span>
                <div class="d-flex flex-column">
                   <span class="fw-bold small text-center">{{user.first_name +' '+ user.last_name}}</span>
                   <span v-if="user.role==='department head'">{{user.manage.name +' head'}}</span>
                   <span v-else class="job-title small align-self-start">{{user.role.split('_').join(' ')}}</span>
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
  
}
</script>
