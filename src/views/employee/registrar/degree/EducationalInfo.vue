<template>
     <div class="row mt-5">
  <div class="mb-3 col-lg-6">
    <label for="egsseresult" class="form-label">EGSSE Result</label>
    <input type="text" class="form-control form-control-sm" id="egsseresult" v-model="EGSSE_result">
  </div>
  <div class="mb-3 col-lg-6">
    <label for="eheeeresult" class="form-label">EHEEE Result</label>
    <input type="text" class="form-control form-control-sm" id="eheeeresult" v-model="EHEEE_result">
  </div>
  </div>
  <div class="d-flex justify-content-end mt-5 mb-3">
      <button @click="backToPersonalInfoPage()" class="btn back p-1 me-3">Back</button>
      <button @click="gotoAdmissionPage()" class="btn next p-1 ms-3">Next</button>
  </div>
</template>
<script>
export default {
    inject:['educationalDetail','backPage'],
    data() {
        return {
           EGSSE_result:'', 
           EHEEE_result:'',
        }
    },
    // validations(){
    //     return{
    //         EGSSE_result:{}, 
    //        EHEEE_result:{},  
    //     }
    // },
    methods: {
       gotoAdmissionPage(){
           this.educationalDetail(this.EGSSE_result,this.EHEEE_result)
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
</style>