<template>
  <div class="row">
  <div class="p-3 col-sm-6">
  <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="tvetDepartmentId">
  <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="p-3 col-sm-6">
 <span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="programId">
  <option v-for="Program in tvetPrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
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
  <div class="d-flex mt-5">
  <div><strong>REGISTER FOR</strong></div>
<div v-for="level in departmentBasedLevels" :key="level.id" class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" :id="'level'+level.id" :value="level.id" v-model="levelId">
  <label class="form-check-label ms-2" :for="'level'+level.id">
    {{'Level '+level.level_no}}
  </label>
</div>
</div>
    <div class="d-flex justify-content-end mt-5 mb-3">
      <button @click="backToeducationInfoPage()" class="btn back p-1 me-3">Back</button>
      <button @click="gotoFinancialPage()" class="btn next p-1 ms-3">Next</button>
  </div>
</template>
<script>
//import{mapGetters} from 'vuex'
export default {
    inject:['admissionDetail','backPage'],
   data() {
       return {
            fully_scholar:false,
            admissionData:{},
            levelId:'',
            tvetDepartmentId:null
       }
   },
     computed:{
    levels(){
      return this.$store.getters['registrar/levels']
    },
      tvetDepartments(){
      return this.$store.getters['dean/tvetDepartments']
    },
      tvetPrograms(){
      return this.$store.getters['dean/tvetPrograms']
    },
    departmentBasedLevels(){
      var levels = this.levels.filter(level=>{
        return this.tvetDepartmentId === level.tvet_department_id
      })
      return levels
    }

  },
  created() {
    this.tvetDepartmentId = this.tvetDepartments[0]?.id
    this.levelId = this.departmentBasedLevels[0]?.id
    
  },
  watch:{
    departmentBasedLevels(newValue){
      this.levelId = newValue[0]?.id
    }
  },
      methods: {
       gotoFinancialPage(){
           this.admissionData.tvet_department_id = this.tvetDepartmentId
           this.admissionData.program_id = this.$refs.programId.value
           this.admissionData.fully_scholar = this.fully_scholar
           this.admissionData.level_id = this.levelId
           this.admissionDetail(this.admissionData)
       },
       backToeducationInfoPage(){
           this.backPage('educational-info','isAdmission')
       } 
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