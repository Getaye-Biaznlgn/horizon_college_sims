<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-between">
    <div class="d-flex">
        <div class="me-4">
            <input type="text" name="" id="" placeholder="Search by module code" class="form-control form-control-sm">
        </div>
       <div> 
          <select class=" pb-1 px-1" aria-label="select by program">
            <option selected value="here we go">Program</option>
          </select>
       </div>
      <div> 
          <select class="pb-1 px-1 mx-3" aria-label="select by department">
            <option selected value="here we go">Department</option>
          </select>
       </div>
       <div> 
          <select class="pb-1 px-1 mx-3" aria-label="select by year">
            <option selected value="here we go">Year</option>
          </select>
       </div>
       <div> 
          <select class="pb-1 px-1 mx-3" aria-label="select by semester">
            <option selected value="here we go">Semester</option>
          </select>
       </div>
       <div> 
          <select class="pb-1 px-1 mx-3" aria-label="select by type">
            <option selected value="here we go">Type</option>
          </select>
       </div>
    </div>
   <button @click="showModal" class="btn btn-add text-white shadow-sm"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Course Code</th>
    <th class="text-white">Course Title</th>
    <th class="text-white">Credit hour</th>
    <th class="text-white">Department</th>
    <th class="text-white">Program</th>
     <th class="text-white">Year</th>
    <th class="text-white">Semester</th>
    <th class="text-white">Type</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr class="border border-secondary rounded">
    <td>1</td>
    <td>PHYL 101</td>
    <td>Critical Thinking</td>
    <td>3</td>
    <td>Accounting and Finance</td>
    <td>Regular</td>
    <td>1</td>
    <td>1</td>
    <td></td>
    <td></td>
  </tr>
 </table>
</base-card>
<base-modal @save="save" :isLoading="isSaving">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.course.title.$error}">
              <label for="#courseTitle" class="form-label">Course Title</label>
              <input class="form-control form-control-sm" v-model.trim="course.title" @blur="v$.course.title.$touch" id="courseTitle" type="text" placeholder="Eg. Critical Thinking" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.title.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.course.code.$error}">
              <label for="#courseTitle" class="form-label">Course Code</label>
              <input class="form-control form-control-sm" v-model.trim="course.code" @blur="v$.course.code.$touch" id="courseTitle" type="text" placeholder="Eg. PHYL 101" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.code.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
          <div class="mb-3" :class="{warining:v$.course.creditPoint.$error}">
              <label for="#creditPoint" class="form-label">Credit Point</label>
              <input class="form-control form-control-sm" v-model.trim="course.creditPoint" @blur="v$.course.creditPoint.$touch" id="creditPoint" type="number" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.creditPoint.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
           <div class="d-flex justify-content-between">
           <div class="mb-3" :class="{warining:v$.course.department.$error}">
              <label class="form-label" for="#department">Department</label>
              <input class="form-control form-control-sm" v-model.trim="course.department" @blur="v$.course.department.$touch" id="department"  type="number" min="1" max="10" aria-label=".form-control-lg">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.department.$errors" :key="index">{{ error.$message+", " }}</span>
           </div> 
           <div class="mb-3" :class="{warining:v$.course.program.$error}">
              <label class="form-label" for="#program">Program</label>
              <input class="form-control form-control-sm" v-model.trim="course.program"  @blur="v$.course.program.$touch" id="program" type="text"  min="1" max="30" aria-label=".form-control-lg">
             <span class="error-msg mt-1"  v-for="(error, index) of v$.course.program.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
      </div>
       <div class="d-flex justify-content-between">
           <div class="mb-3" :class="{warining:v$.course.year.$error}">
              <label class="form-label" for="#year">Year</label>
              <input class="form-control form-control-sm" v-model.trim="course.year" @blur="v$.course.year.$touch" id="department"  type="number" min="1" max="10" aria-label=".form-control-lg">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.year.$errors" :key="index">{{ error.$message+", " }}</span>
           </div> 
           <div class="mb-3" :class="{warining:v$.course.semester.$error}">
              <label class="form-label" for="#program">Semester</label>
              <input class="form-control form-control-sm" v-model.trim="course.semester"  @blur="v$.course.semester.$touch" id="program" type="text"  min="1" max="30" aria-label=".form-control-lg">
             <span class="error-msg mt-1"  v-for="(error, index) of v$.course.semester.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
      </div>
      <div class="d-flex" :class="{warining:v$.course.type.$error}">
          <div class="form-check me-3">
              <input class="form-check-input " v-model.trim="course.type" name="type" value="major" type="radio" id="major">
              <label class="form-check-label" for="major">Major</label>
          </div>
          <div class="form-check me-3">
             <input class="form-check-input" v-model.trim="course.type" name="type" value="common"  type="radio"  id="common">
             <label class="form-check-label" for="common">Common</label>
          </div>
           <div class="form-check me-3">
             <input class="form-check-input" v-model.trim="course.type" name="type" value="supporting" type="radio"  id="supporting">
             <label class="form-check-label" for="supporting">Supporting</label>
          </div>
      </div>


      </form>
   </template>
</base-modal>

</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required,alpha,helpers,numeric} from '@vuelidate/validators'

export default {

  data(){
    return{ 
      v$:useValidate(),
      baseModal:null,
      isSaving:false,
      
      course:{
      title:'',
      code:'',
      creditPoint:'',
      department:'',
      program:'',
      year:'',
      semester:'',
      type:''
      }
      
    }
  },
  validations(){
     return{
      course:{
             title:{
                 required: helpers.withMessage('Course Title name can not be empty',required),
                 alpha: helpers.withMessage('Course Title must be only alpahbet letters',alpha)
               },
             code:{
                 required: helpers.withMessage('Course code can not be empty',required),
                 alpha: helpers.withMessage('Course code must be only alpahbet letters',alpha)
              },
             creditPoint:{
                 required: helpers.withMessage('Credit point can not be empty',required),
                 numeric: helpers.withMessage('Credit point must be only number',numeric)
              }, 
             department:{
                 required: helpers.withMessage('Department should be selected',required),
                 numeric,
              },
             program:{
                 required: helpers.withMessage('Program should be selected',required),
                 numeric,
              },
             year:{
                 required: helpers.withMessage('Program can not be empty',required),
                 numeric:helpers.withMessage('Year should be only number',numeric),
              },
             semester:{
                 required: helpers.withMessage('Semester can not be empty',required),
                 numeric:helpers.withMessage('Semester should be only number',numeric),
              },
             type:{
                 required: helpers.withMessage('Type should be selected',required),
                 alpha:helpers.withMessage('Type must be only alpahbet letters',alpha),
              } 
            }
     }
  },
  methods:{
      showModal(){
        this.baseModal.show()
      },
      save(){
       this.isSaving=true
       this.v$.$validate()
       if(!this.v$.error){
         this.isSaving=false
       }
       else{
         console.log('form  validation faild')
       }
      },
      regularChecked(){
        this.isRegularChecked=!this.isRegularChecked
      },
      extensionChecked(){
        this.isExtensionChecked=!this.isExtensionChecked;
      }
    },
  mounted() {
   this.baseModal = new Modal(document.getElementById('baseModal'));
  }
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding: 8px;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.btn-add{
    background-color: #ff9500;
}
.btn-add:hover{
  background-color: #eca643;
}

.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}
input[type="radio"]:checked{
 background-color: #ff9500;
 border: none;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
</style>
