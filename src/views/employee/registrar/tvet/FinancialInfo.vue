<template>
     <div class="mt-5"><strong>State Your Finantial Source</strong></div>
   <div class="mt-3 ms-3">
<div class="form-check">
  <input class="form-check-input p-2" type="radio" name="finance" id="selfsupport" value="selfsupport" v-model="financial">
  <label class="form-check-label ms-2" for="selfsupport">
    Self-Support
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="govt" value="govt" v-model="financial">
  <label class="form-check-label ms-2" for="govt">
    Geverment
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="relative" value="relative" v-model="financial">
  <label class="form-check-label ms-2" for="relative">
    Relative
  </label>
</div>
<div class="form-check mt-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="nongovt" value="nongovt" v-model="financial">
  <label class="form-check-label ms-2" for="nongovt">
    Non-Geverment
  </label>
</div>
<div class="d-flex mb-4">
<div class="form-check mt-3 me-1">
  <input class="form-check-input p-2" type="radio" name="finance" id="other" value="other" v-model="financial">
  <label class="form-check-label ms-2" for="other">
    Other(specify)
  </label>
</div>
<span class="mt-3 col-sm-4">
<input class="form-control form-control-sm" type="text" name="otherfinancee" id="othersource" v-model="otherstated">
</span>
</div>
</div>
<div class="d-flex justify-content-between">
   <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
 <div class="d-flex mt-5 mb-3">
      <button @click="backAdmissionInfoPage()" class="btn back p-1 me-3">Back</button>
      <button  @click="finish()" class="btn  px-1 next text-white mx-3">
               <span v-if="isUploading">
               <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
               Registering
            </span>      
            <span v-else>Finish</span> 
  </button>
  </div>
</div>
</template>
<script>
export default {
    inject:['backPage','financeDetail'],
    data() {
        return {
            financial:'relative',
            otherstated:''
        }
    },
      computed:{
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

    },
    methods: {
       finish(){
                     if(this.financial === 'other'){
                this.financial = this.otherstated
            }
            this.financeDetail(this.financial)
        },
        backAdmissionInfoPage(){
          this.$store.commit('registrar/setResultNotifier','')
            this.backPage('admission-info','isFinance')
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
</style>