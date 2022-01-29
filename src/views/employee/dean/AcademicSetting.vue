<template>
    <base-card class="px-3 mx-4 mt-3">
         <div class="border mb-3 p-2">
            {{academicControls.is_closed}}
             <span class="form-switch form-check"> 
                  <label class="form-check-labe fw-bold" for="year">Academic Year {{academicControls.year}}</label>
                  <input class="form-check-input" @change="toggleAcademicYear($event)" :checked="academicControls.is_closed" type="checkbox" id="year">  
              </span>
         </div>
         <div class="border mb-3 p-2">
              <strong>Semesters</strong>
              <div class="d-flex">
                  <div class="pe-5">
                    <strong>Regular</strong>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester1">Semester 1</label>
                       <input class="form-check-input" :checked="!(academicControls.regular?.[0]?.is_closed)" type="checkbox" id="semester1">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester2">Semester 2</label>
                       <input class="form-check-input" :checked="academicControls.regular?.[1]?.is_closed" type="checkbox" id="semester2">  
                    </div>
                  </div>
                  <div class="ms-5">
                     <strong>Extension</strong>
                     <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester1e">Semester 1</label>
                       <input class="form-check-input" :checked="academicControls.extension?.[0]?.is_closed" type="checkbox" id="semester1e">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester2e">Semester 2</label>
                       <input class="form-check-input" :checked="academicControls.extension?.[1]?.is_closed" type="checkbox" id="semester2e">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-labe" for="semester3">Semester 3</label>
                       <input class="form-check-input" :checked="academicControls.extension?.[2]?.is_closed" type="checkbox" id="semester3">  
                    </div>
                  </div>
              </div>
         </div>
         <div class="border mb-3 p-2">
              <strong>Student Result Entry</strong>
                  <div class="d-flex">
                      <div class="pe-5">
                          <strong>Registrar</strong>
                          <div class="form-switch form-check "> 
                            <label class="form-check-label" for="degree">Degree</label>
                            <input class="form-check-input" type="checkbox" id="degree">  
                          </div>
                          <div class="form-switch form-check "> 
                            <label class="form-check-label" for="tvet">TVET</label>
                            <input class="form-check-input" type="checkbox" id="tvet">  
                          </div>
                      </div> 
                      <div class="ms-5">
                          <strong>Teacher</strong>
                          <div class="form-switch form-check "> 
                             <label class="form-check-label" for="degree">Degree</label>
                             <input class="form-check-input" type="checkbox" id="degreeT">  
                          </div>
                         <div class="form-switch form-check "> 
                            <label class="form-check-label" for="tvet">TVET</label>
                            <input class="form-check-input" type="checkbox" id="tvetT">  
                          </div>
                          
                      </div> 
                  </div>
         </div>
    </base-card>
</template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
   data(){
      return{
         academicControls:{}
      }
   },
  computed:{
     ...mapGetters(['selectedAcademicYearId']),
     getYearById(){
       return this.$store.getters.getYearById(this.selectedAcademicYearId)
     }
  },
  methods:{
   async toggleAcademicYear(e){
           this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=0
             if(e.target.checked)
               toggleValue=1
            var response = await apiClient.put("/api/change_academic_year_status/"+this.academicControls.id,{status:toggleValue})
            if (response.status === 200) {
              this.academicControls.is_closed=response.data
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
           this.academicControls.is_closed=0
        //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },
   async getData(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_setting_data")
            if (response.status === 200) {
              this.academicControls=response.data
            } else {
              throw 'Failed to fetch event'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
    }  
  },
  created(){
     this.getData()
  }
}
</script>

<style>

</style>