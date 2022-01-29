<template>
     <div class="row mt-5">
  <div class="mb-3 col-lg-6" :class="{warning:v$.EGSSE_result.$error}">
    <label for="egsseresult" class="form-label">EGSSE Result</label>
    <input type="number" class="form-control form-control-sm" id="egsseresult" v-model="EGSSE_result">
     <span class="error-msg mt-1">{{ v$.EGSSE_result.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-6" :class="{warning:v$.EHEEE_result.$error}">
    <label for="eheeeresult" class="form-label">EHEEE Result</label>
    <input type="number" class="form-control form-control-sm" id="eheeeresult" v-model="EHEEE_result">
     <span class="error-msg mt-1">{{ v$.EHEEE_result.$errors[0]?.$message}}</span>
  </div>
  </div>
  <div class="d-flex justify-content-end mt-5 mb-3">
      <button @click="backToPersonalInfoPage()" class="btn back p-1 me-3">Back</button>
      <button @click="gotoAdmissionPage()" class="btn next p-1 ms-3">Next</button>
  </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import {helpers,minValue,maxValue} from '@vuelidate/validators'
export default {
    inject:['educationalDetail','backPage'],
    data() {
        return {
            v$:useValidate(),
           EGSSE_result:'', 
           EHEEE_result:'',
        }
    },
      validations(){
        return{
            EGSSE_result:{minValue:helpers.withMessage('minimum value should not be lessthan 0',minValue(0)),
             maxValue:helpers.withMessage('maximum value should not be greaterthan 4',maxValue(4))}, 
           EHEEE_result:{  minValue:helpers.withMessage('minimum value should not be lessthan 0',minValue(0)),
             maxValue:helpers.withMessage('maximum value should not be greaterthan 700',maxValue(700))},  
        }
    },
    methods: {
       gotoAdmissionPage(){
           this.v$.$validate()
           if(!this.v$.$error){
           this.educationalDetail(this.EGSSE_result,this.EHEEE_result)
           }
       },
       backToPersonalInfoPage(){
           this.backPage('personal-info','isEducational')
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
.warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  }
</style>