<template>
  <div class="row">
  <div class="p-3 col-sm-6">
  <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="degree_department_id">
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="p-3 col-sm-6">
 <span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="programId" @change="semesterByProgram($event)">
  <option v-for="Program in degreePrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
  </div>
  <div class="d-flex mt-3">
      <div class="mt-3"><span class="me-2"><strong>Give Scolarship Chance ?</strong></span></div>
<div class="form-check mt-3 me-3">
  <input class="form-check-input ms-4 p-2" type="checkbox" name="scholar" id="fullscolarship" v-model="fully_scholar">
  <label class="form-check-label ms-2" for="fullscolarship">
    Fully Funded Scholarship
  </label>
</div>
 </div>
  <div class="row mt-3">
  <div class="mt-5 col-sm-2"><strong>REGISTER FOR</strong></div>
  <div class="mt-3 col-sm-5">
  <span>Year</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="year_no">
 <option value="1" selected>first year</option>
 <option value="2">Second Year</option>
 <option value="3">Third Year</option>
 <option value="4">Fourth Year</option>
 <option value="5">Fifth Year</option>
</select>
  </div>
   <div class="mt-3 col-sm-5">
 <span>Semester</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="semester_id">
  <option v-for="semister in activeSemesters" :key="semister.id" :value="semister.id">{{'semesters '+semister.number}}</option>
</select>
</div>
  </div>
    <div class="d-flex justify-content-end mt-5 mb-3">
      <button @click="backToeducationInfoPage()" class="btn back p-1 me-3">Back</button>
      <button @click="gotoFinancialPage()" class="btn next p-1 ms-3">Next</button>
  </div>
</template>
<script>
import{mapGetters} from 'vuex'
export default {
    inject:['admissionDetail','backPage'],
   data() {
       return {
            fully_scholar:false,
            admissionData:{},
            activeSemesters:[]
       }
   },
     computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    semesters(){
      return this.$store.getters['registrar/activeYearSemesters']
    }
    },
    created() {
      this.semesterAtZero(this.semesters[0])
    },
      methods: {
       gotoFinancialPage(){
           this.admissionData.degree_department_id = this.$refs.degree_department_id.value
           this.admissionData.program_id = this.$refs.programId.value
           this.admissionData.fully_scholar = this.fully_scholar
           this.admissionData.year_no = this.$refs.year_no.value
           this.admissionData.semester_id = this.$refs.semester_id.value
           this.admissionDetail(this.admissionData)
       },
       backToeducationInfoPage(){
           this.backPage('educational-info','isAdmission')
       },
             semesterAtZero(semister){
       this.activeSemesters = this.semesters.filter((semester) =>{
  return semister.program_id === semester.program_id
}) 
      },
      semesterByProgram(event){
this.activeSemesters = this.semesters.filter((semester) =>{
  return Number(event.target.value) === Number(semester.program_id)
})
console.log('filterd semesters')
console.log(event.target.value)
      }, 
    },
}
</script>
<style scoped>
.btn{
    width: 7em;
}
.next{
    background-color: #2f4587;
    color: #fff;
}
.next:hover{
    background-color: #366ad9;
}
.back{
    border: 1px solid gray;
}
.back:hover{
    background-color: #a4a6ac;
}
</style>