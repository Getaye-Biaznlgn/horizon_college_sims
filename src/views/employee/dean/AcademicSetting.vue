<template>
    <base-card class="px-3 mx-4 mt-3">
         <div class="border mb-3 p-2">
             <span class="form-switch form-check"> 
                  <label class="form-check-labe fw-bold" for="year">Academic Year {{academicControls.year}}</label>
                  <input class="form-check-input" @change="toggleAcademicYear($event)" :checked="!checkAcademicYear" type="checkbox" id="year">  
              </span>
         </div>
         <div class="border mb-3 p-2">
              <strong>Semesters</strong>
              <div class="d-flex">
                  <div class="pe-5">
                    <strong>Regular</strong>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester1">Semester 1</label>
                       <input class="form-check-input" :checked="!checkRegularFirst" @change="toggleRegularFirst($event)" type="checkbox" id="semester1">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester2">Semester 2</label>
                       <input class="form-check-input" :checked="!checkRegularSecond" @change="toggleRegularSecond($event)" type="checkbox" id="semester2">  
                    </div>
                  </div>
                  <div class="ms-5">
                     <strong>Extension</strong>
                     <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester1e">Semester 1</label>
                       <input class="form-check-input" :checked="!checkExtensionFirst" @change="toggleExtensionFirst($event)" type="checkbox" id="semester1e">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-label" for="semester2e">Semester 2</label>
                       <input class="form-check-input" :checked="!checkExtensionSecond" @change="toggleExtensionSecond($event)" type="checkbox" id="semester2e">  
                    </div>
                    <div class="form-switch form-check "> 
                       <label class="form-check-labe" for="semester3">Semester 3</label>
                       <input class="form-check-input" :checked="!checkExtensionThird" @change="toggleExtensionThird($event)" type="checkbox" id="semester3">  
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
                            <input class="form-check-input" :checked="checkDegreeRegistrar" @change="toggleDegreeRegistrar($event)" type="checkbox" id="degree">  
                          </div>
                          <div class="form-switch form-check "> 
                            <label class="form-check-label" for="tvet">TVET</label>
                            <input class="form-check-input" :checked="checkTvetRegistrar" @change="toggleTvetRegistrar($event)" type="checkbox" id="tvet">  
                          </div>
                      </div> 
                      <div class="ms-5">
                          <strong>Teacher</strong>
                          <div class="form-switch form-check "> 
                             <label class="form-check-label" for="degree">Degree</label>
                             <input class="form-check-input" :checked="checkDegreeTeacher" @change="toggleDegreeTeacher($event)" type="checkbox" id="degreeT">  
                          </div>
                         <div class="form-switch form-check "> 
                            <label class="form-check-label" for="tvet">TVET</label>
                            <input class="form-check-input" :checked="checkTvetTeacher" @change="toggleTvetTeacher($event)" type="checkbox" id="tvetT">  
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
         academicControls:'',
         regularFirst:'',
         regularSecond:'',
         extensionFirst:'',
         extensionSecond:'',
         extensionThird:''
      }
   },
  computed:{
     ...mapGetters(['selectedAcademicYearId']),
     getYearById(){
       return this.$store.getters.getYearById(this.selectedAcademicYearId)
     },
     checkAcademicYear(){
        return this.academicControls.is_closed
     },
     checkRegularFirst(){
        return this.regularFirst.is_closed
     },
     checkRegularSecond(){
        return this.regularSecond.is_closed
     },
     checkExtensionFirst(){
        return this.extensionFirst.is_closed
     },
     checkExtensionSecond(){
        return this.extensionSecond.is_closed
     },
     checkExtensionThird(){
        return this.extensionThird.is_closed
     },
     checkDegreeRegistrar(){
       return this.academicControls.result_related?.degree_registrar_result_entry_time
     },
     checkDegreeTeacher(){
       return this.academicControls.result_related?.degree_teacher_result_entry_time
     },
     checkTvetRegistrar(){
       return this.academicControls.result_related?.tvet_registrar_result_entry_time
     },
     checkTvetTeacher(){
       return this.academicControls.result_related?.tvet_teacher_result_entry_time
     }
  },
  //change_semester_status/{id}
  methods:{
   async toggleAcademicYear(e){
       this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=1
             if(e.target.checked)
               toggleValue=0
            var response = await apiClient.put("/api/change_academic_year_status/"+this.academicControls.id,{status:toggleValue})
            if (response.status === 200) {
              this.academicControls.is_closed=response.data
              if(response.data)
                var message='You have closed academic year'
               else
                 message='You have opened academic year'
               this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            }
            else if(response.status===202){
              this.$store.commit('setAlertMessages',{
                text:'Semesters should be closed before!',
                type:'danger'
              })
            }
            else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:'Faild to change academic year state',
                type:'danger'
         })
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },
  
  toggleRegularFirst(e){
      let toggleValue=1
      if(e.target.checked)
        toggleValue=0
      this.toggleSemester(toggleValue,this.regularFirst,'regular semester 1')
  },
  toggleRegularSecond(e){
      let toggleValue=1
      if(e.target.checked)
        toggleValue=0
      this.toggleSemester(toggleValue,this.regularSecond,'regular semester 2')
  },
  toggleExtensionFirst(e){
      let toggleValue=1
      if(e.target.checked)
        toggleValue=0
      this.toggleSemester(toggleValue,this.extensionFirst,'extension semester 1')
  },
  toggleExtensionSecond(e){
      let toggleValue=1
      if(e.target.checked)
        toggleValue=0
      this.toggleSemester(toggleValue,this.extensionSecond,'extension semester 2')
  },
   toggleExtensionThird(e){
      let toggleValue=1
      if(e.target.checked)
        toggleValue=0
      this.toggleSemester(toggleValue,this.extensionThird,'extension semester 3')
  },
  async toggleSemester(value, reference, semesterName){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.put("/api/change_semester_status/"+reference.id,{status:value})
            if (response.status === 200) {
              reference.is_closed=response.data
              if(response.data)
                var  message='You have closed '+semesterName
               else
                  message='You have opened '+semesterName
              this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:`Faild to change ${semesterName} state`,
                type:'danger'
         })
         
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },
   async toggleDegreeRegistrar(e){
        this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=0
             if(e.target.checked)
               toggleValue=1
            var response = await apiClient.put("/api/change_degree_registrar_time",{entry_status:toggleValue})
            if (response.status === 200) {
              this.academicControls.result_related.change_degree_registrar_time=response.data
              if(response.data)
                var message='You have opened registrar degree result entry'
               else
                 message='You have closed registrar degree result entry'
               this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:'Faild to change registrar degree result entry state',
                type:'danger'
         })
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },
   async toggleTvetRegistrar(e){
        this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=0
             if(e.target.checked)
               toggleValue=1
            var response = await apiClient.put("/api/change_tvet_registrar_time",{entry_status:toggleValue})
            if (response.status === 200) {
                this.academicControls.result_related.change_tvet_registrar_time=response.data
              if(response.data)
                var message='You have opened registrar tvet result entry'
               else
                 message='You have closed registrar tvet result entry'
               this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:'Faild to change registrar tvet result entry state',
                type:'danger'
         })
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },

   async toggleDegreeTeacher(e){
        this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=0
             if(e.target.checked)
               toggleValue=1
            var response = await apiClient.put("/api/change_degree_teacher_time",{entry_status:toggleValue})
            if (response.status === 200) {
                this.academicControls.result_related.change_degree_teacher_time=response.data
              if(response.data)
                var message='You have opened teacher degree result entry'
               else
                 message='You have closed teacher degree result entry'
               this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:'Faild to change teacher degree result entry state',
                type:'danger'
         })
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },

   async toggleTvetTeacher(e){
        this.$store.commit('setIsItemLoading', true)
        try {
            let toggleValue=0
             if(e.target.checked)
               toggleValue=1
            var response = await apiClient.put("/api/change_tvet_teacher_time",{entry_status:toggleValue})
            if (response.status === 200) {
                 this.academicControls.result_related.change_tvet_teacher_time=response.data
              if(response.data)
                var message='You have opened teacher tvet result entry'
               else
                 message='You have closed teacher tvet result entry'
               this.$store.commit('setAlertMessages',{
                text:message,
                type:'success'
              })
            } else {
              throw 'Failed to fetch event'
            }
        }catch{
            this.$store.commit('setAlertMessages',{
                text:'Faild to change teacher tvet result entry state',
                type:'danger'
         })
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
   },

   async getData(){
        this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_setting_data?academic_year_id="+this.selectedAcademicYearId)
            if (response.status === 200) {
              this.academicControls=response.data
              //regular first
              this.regularFirst=response.data.regular?.find((semester)=>{
                  return semester.number===1
              })
              //regular second
              this.regularSecond=response.data.regular?.find((semester)=>{
                  return semester.number===2
              })
              //extension first
              this.extensionFirst=response.data.extension?.find((semester)=>{
                  return semester.number===1
              })
              //extension second
              this.extensionSecond=response.data.extension?.find((semester)=>{
                  return semester.number===2
              })
              //extension third
              this.extensionThird=response.data.extension?.find((semester)=>{
                  return semester.number===3
              })
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
  },
  watch:{
    selectedAcademicYearId(){
        this.getData()
    }
  }
}
</script>

<style>

</style>