<template>
     <div class="row mt-5">
    <div class="calender col-md-4">
    <span class="mt-3">Select Current Academic Year</span>
    <select class="form-select mt-1" aria-label=".form-select-sm example" ref="acYearId">
  <option v-for="calender in academicYears" :key="calender.id" :value="calender.id">{{calender.year}}</option>
</select>
    </div>
  <div class="mb-3 col-md-4" :class="{warning:v$.EGSSE_result.$error}">
    <label for="egsseresult" class="form-label">EGSSE Result</label>
    <input type="text" class="form-control" id="egsseresult" v-model="EGSSE_result">
    <span class="error-msg mt-1">{{ v$.EGSSE_result.$errors[0]?.$message}}</span>
    
  </div>
  <div class="mb-3 col-md-4" :class="{warning:v$.EHEEE_result.$error}">
    <label for="eheeeresult" class="form-label">EHEEE Result</label>
    <input type="text" class="form-control" id="eheeeresult" v-model="EHEEE_result">
    <span class="error-msg mt-1">{{ v$.EHEEE_result.$errors[0]?.$message}}</span>
  </div>
  </div>
   <div class="mt-2 d-flex">
        <div class="mt-3 me-3"><strong>Student Type</strong></div>
  <div class="form-check mt-3 me-4">
  <input class="form-check-input p-2" type="radio" name="type" id="degree" value="degree" v-model="studentType">
  <label class="form-check-label ms-2" for="degree">
    Degree
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input p-2" type="radio" name="type" id="tvet" value="tvet" v-model="studentType">
  <label class="form-check-label ms-2" for="tvet">
    TVET
  </label>
</div>
   </div>
  <!-- clasification of addmission -->
  <div v-if="studentType ==='degree'" class="mt-3">
   <div class="row">
  <div class="col-lg-6">
  <span>Department</span>
  <select class="form-select" aria-label=".form-select-sm example" ref="degreeDepartmentId">
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="mt-3 mt-lg-0 col-lg-6" :class="{warning:v$.degreeProgramId.$error}">
 <span>Program</span>
  <select class="form-select" aria-label=".form-select-sm example" v-model="degreeProgramId">
  <option v-for="Program in degreePrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
  <span class="error-msg mt-1">{{ v$.degreeProgramId.$errors[0]?.$message}}</span>
</div>
  </div>
  <div class="mt-3 col-md-2"><strong>REGISTER FOR</strong></div>
  <div class="row mt-3">
  <div class="mt-3 col-lg-6">
  <span>Year</span>
  <select class="form-select" aria-label=".form-select-sm example" v-model="year_no">
 <option value="1" selected>first year</option>
 <option value="2">Second Year</option>
 <option value="3">Third Year</option>
 <option value="4">Fourth Year</option>
 <option value="5">Fifth Year</option>
</select>
  </div>
   <div class="mt-3 col-lg-6">
 <span>Semester</span>
  <select class="form-select" aria-label=".form-select-sm example" ref="semesterId">
  <option v-for="semister in activeSemesters" :key="semister.id" :value="semister.id">{{'semesters '+semister.number}}</option>
</select>
</div>
  </div>
  </div>
  <!-- for tvet students -->
  <div v-if="studentType==='tvet'" class="mt-3">
   <div class="row">
  <div class="col-lg-6">
  <span>Department</span>
  <select class="form-select" aria-label=".form-select-sm example" v-model="tvetDepartmentId">
  <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="col-lg-6 mt-3">
 <span>Program</span>
  <select class="form-select" aria-label=".form-select-sm example" v-model="tvetProgramId">
  <option v-for="Program in tvetPrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
  </div>
  <div class="mt-3"><strong>REGISTER FOR</strong></div>
  <div class="d-lg-flex mt-3">
<div v-for="level in departmentBasedLevels" :key="level.id" class="form-check me-3 mt-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno"  :id="`level${level.id}`" :value="level.id" v-model="levelId">
  <label class="form-check-label ms-2" :for="'level'+level.id">
    {{'Level '+level.level_no}}
  </label>
</div>
</div>
  </div>
  <!-- financial source -->
       <div class="mt-5"><strong>State Your Finantial Source</strong></div>
   <div class="d-lg-flex mt-3 ms-3">
<div class="form-check mt-lg-3">
  <input class="form-check-input  ms-lg-4 p-2" type="radio" name="finance" id="selfsupport" value="selfsupport" v-model="financial">
  <label class="form-check-label ms-2" for="selfsupport">
    Self-Support
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input ms-lg-4 p-2" type="radio" name="finance" id="govt" value="govt" v-model="financial">
  <label class="form-check-label ms-2" for="govt">
    Government
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input ms-lg-4 p-2" type="radio" name="finance" id="relative" value="relative" v-model="financial">
  <label class="form-check-label ms-2" for="relative">
    Relative
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input ms-lg-4 p-2" type="radio" name="finance" id="nongovt" value="nongovt" v-model="financial">
  <label class="form-check-label ms-2" for="nongovt">
    Non-Government
  </label>
</div>
<div class="d-flex mb-4">
<div class="form-check mt-3 me-1">
  <input class="form-check-input ms-lg-4 p-2" type="radio" name="finance" id="other" value="other" v-model="financial">
  <label class="form-check-label ms-2" for="other">
    Other
  </label>
</div>

</div>
</div>
 <div class="mt-2">
   <p class="mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
   </div>
<div class="d-flex justify-content-end finishbtn mt-5 mb-3">
      <button @click="backToPersonalInfoPage()" class="btn back p-1 me-3">Back</button>
      <button  @click="finishToRegister()" class="btn  px-1 next text-white mx-3">
               <span v-if="isUploading">
               <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
               Registering
            </span>      
            <span v-else>Finish</span> 
  </button>
  </div>

</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers,maxValue,minValue} from '@vuelidate/validators'
import {mapGetters} from 'vuex'
export default {
    inject:['educationalDetail','backPage'],
    data() {
        return {
          v$:useValidate(),
          activeSemesters:[],
           EGSSE_result:'', 
           EHEEE_result:'',
            financial:'relative',
            otherstated:'',
            levelId:'',
            tvetDepartmentId:null,
            studentType:'degree',
            fully_scholar:0,
            year_no:'1',
            degreeProgramId:'',
            tvetProgramId:'',
            isEgsse:false,
            isEheee:false
        }
    },
    validations(){
      return{
            EGSSE_result:{minValue:helpers.withMessage('minimum value should not be lessthan 0',minValue(0)),
             maxValue:helpers.withMessage('maximum value should not be greaterthan 4',maxValue(4))
             }, 
           EHEEE_result:{  minValue:helpers.withMessage('minimum value should not be lessthan 0',minValue(0)),
             maxValue:helpers.withMessage('maximum value should not be greaterthan 700',maxValue(700))
             }, 
             degreeProgramId:{required:helpers.withMessage('Please select Program',required)} 
        }
    },
       computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    semesters(){
      return this.$store.getters['registrar/activeYearSemesters']
    },
     academicYears(){
        return  this.$store.getters.academicYears
      },
      resultNotifier(){
          return this.$store.getters['registrar/resultNotifier']
        },
        isSuccessed(){
           return this.$store.getters['registrar/isSuccessed']
        },
         isUploading(){
           return this.$store.getters['registrar/isUploading']
        },
        isFaild(){
           return this.$store.getters['registrar/isFaild']
        },
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
      this.degreeProgramId = this.degreePrograms[0]?.id
         this.tvetDepartmentId = this.tvetDepartments[0]?.id
        this.tvetProgramId = this.tvetPrograms[0]?.id
        this.levelId = this.departmentBasedLevels[0]?.id
    },
    watch:{
      departmentBasedLevels(newValues){
        this.levelId = newValues[0]?.id
      },
      degreeProgramId(newValue){
        this.semesterByProgram(newValue)
      }
    },
    methods: {
       finishToRegister(){
         this.v$.$validate()
         if(!this.v$.$error){
           var educatonData={}
           educatonData.academic_year_id = this.$refs.acYearId.value
           educatonData.degree_department_id = this.$refs.degreeDepartmentId?.value
           educatonData.degreeProgram_id = this.degreeProgramId
          educatonData.year_no = this.year_no
           educatonData.semester_id = this.$refs.semesterId?.value
           educatonData.EGSSE_result= this.EGSSE_result
           educatonData.EHEEE_result = this.EHEEE_result
           educatonData.financial = this.financial
            educatonData.fully_scholar = this.fully_scholar
        //    for tvet students
            educatonData.tvet_department_id = this.tvetDepartmentId
           educatonData.tvetProgram_id = this.tvetProgramId
           educatonData.level_id = this.levelId
           educatonData.studentType = this.studentType
           this.educationalDetail(educatonData)
           }
       },
       backToPersonalInfoPage(){
           this.backPage('personal-info','isEducational')
       } ,
      semesterByProgram(degreeProgramId){
this.activeSemesters = this.semesters.filter((semester) =>{
  return Number(degreeProgramId) === Number(semester.program_id)
})
      }, 
    },
}
</script>
<style scoped>
.btn{
    width: 8em;
}
.next{
    background-color: #2f4587;
    color: #fff;
}
.next:hover{
    background-color: #366ad9;
}
.finishbtn{
    padding-bottom: 2em;
}
.back{
    border: 1px solid gray;
}
.back:hover{
    background-color: #a4a6ac;
}
.success{
    color: green;
  }
  .faild{
    color: red;
  }
  .warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  }
</style>