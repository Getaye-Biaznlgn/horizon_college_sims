<template>
<div class="mt-3"><span ><Strong>Full Name</Strong></span></div>
<div class="row mt-3">
<div class="mb-3 col-sm-4" :class="{warning:v$.studentInfo.first_name.$error}">
    <label for="fname" class="form-label">First Name</label>
    <input type="text" class="form-control form-control-sm" id="fname" v-model="studentInfo.first_name">
    <span class="error-msg mt-1">{{ v$.studentInfo.first_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-4" :class="{warning:v$.studentInfo.middle_name.$error}">
    <label for="mname" class="form-label">Middle Name</label>
    <input type="text" class="form-control form-control-sm" id="mname" v-model="studentInfo.middle_name">
     <span class="error-msg mt-1">{{ v$.studentInfo.middle_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-4" :class="{warning:v$.studentInfo.last_name.$error}">
    <label for="lname" class="form-label">Last Name</label>
    <input type="text" class="form-control form-control-sm" id="lname" v-model="studentInfo.last_name">
     <span class="error-msg mt-1">{{ v$.studentInfo.last_name.$errors[0]?.$message}}</span>
  </div>
</div>
 <div class="d-flex col-4">
<div class="sex mt-4"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="male" id="male" v-model="sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="female" id="female" v-model="sex">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
<div class="mt-3"><strong>Place of Birth</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-sm-4" :class="{warning:v$.birth_address.region.$error}">
    <label for="region" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="birth_address.region">
     <span class="error-msg mt-1">{{ v$.birth_address.region.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-4" :class="{warning:v$.birth_address.zone.$error}">
    <label for="zone" class="form-label">Zone</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="birth_address.zone">
    <span class="error-msg mt-1">{{ v$.birth_address.zone.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-3 col-sm-4" :class="{warning:v$.birth_address.subcity.$error}">
    <label for="subcity" class="form-label">District/Sub city</label>
    <input type="text" class="form-control form-control-sm" id="subcity" v-model="birth_address.subcity">
     <span class="error-msg mt-1">{{ v$.birth_address.subcity.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-4" :class="{warning:v$.birth_address.kebele.$error}">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="birth_address.kebele">
      <span class="error-msg mt-1">{{ v$.birth_address.kebele.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-4">
    <label for="country" class="form-label">Country (for none Ethiopian)</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="birth_address.country">
   
  </div>
</div>
<div><strong>Date of Birth(E.C)</strong></div>
<div class="row mt-2">
    <div class="mb-3 col-sm-5" :class="{warning:v$.studentInfo.birthDay.$error}">
    <label for="birthdate" class="form-label">Date of Birth</label>
    <input type="date" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.birthDay">
    <span class="error-msg mt-1">{{ v$.studentInfo.birthDay.$errors[0]?.$message}}</span>
  </div>
  <!-- <div class="mb-3 col-sm-4">
    <label for="birthdate" class="form-label">Month</label>
    <input type="text" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.birthMonth">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="birthdate" class="form-label">Year</label>
    <input type="text" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.birthYear">
  </div> -->
</div>
  <div class="mt-3"><strong>Current residential address</strong></div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-3" :class="{warning:v$.residential_address.subcity.$error}">
    <label for="district" class="form-label">District</label>
    <input type="text" class="form-control form-control-sm" id="district" v-model="residential_address.subcity">
     <span class="error-msg mt-1">{{ v$.residential_address.subcity.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-3" :class="{warning:v$.residential_address.kebele.$error}">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="residential_address.kebele">
      <span class="error-msg mt-1">{{ v$.residential_address.kebele.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-3">
    <label for="house_ho" class="form-label">House No</label>
    <input type="number" class="form-control form-control-sm" id="house_ho" v-model="residential_address.house_no">
  </div>
  <div class="mb-3 col-sm-3">
    <label for="year" class="form-label">Year</label>
    <input type="number" class="form-control form-control-sm" id="year" v-model="residential_address.year">
  </div>
  </div>
  <div class="mt-3"><strong>Tel</strong></div>
  <div class="row mt-3">
       <div class="mb-4 col-sm-4">
    <label for="residence" class="form-label">Residence</label>
    <input type="tel" class="form-control form-control-sm" id="residence" v-model="studentInfo.residence_tel">
  </div>
   <div class="mb-4 col-sm-4">
    <label for="office_phone" class="form-label">Office</label>
    <input type="tel" class="form-control form-control-sm" id="office_phone" v-model="studentInfo.residence_office_tel">
  </div>
   <div class="mb-4 col-sm-4" :class="{warning:v$.studentInfo.phone_no.$error}">
    <label for="phoneNo" class="form-label">Mobile Number</label>
    <input type="tel" class="form-control form-control-sm" id="phoneNo" v-model="studentInfo.phone_no">
     <span class="error-msg mt-1">{{ v$.studentInfo.phone_no.$errors[0]?.$message}}</span>
  </div>
  </div>
    <div class="d-flex">
<div><span class="me-2"><strong>Marital Status:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="marritalstatus" id="married" value="married" v-model="maritial_status">
  <label class="form-check-label ms-2" for="married">
    Married
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="marritalstatus" id="single" value="single" v-model="maritial_status">
  <label class="form-check-label ms-2" for="single">
    Single
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="marritalstatus" id="other" value="other" v-model="maritial_status">
  <label class="form-check-label ms-2" for="other">
    Other
  </label>
</div>
</div>
<div class="mt-4"><strong>Person to Contacted incase of Emergency:-</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-sm-3" :class="{warning:v$.emergency_contact_first_name.$error}">
    <label for="fname" class="form-label">First Name</label>
    <input type="text" class="form-control form-control-sm" id="fname" v-model="emergency_contact_first_name">
    <span class="error-msg mt-1">{{ v$.emergency_contact_first_name.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-3 col-sm-3" :class="{warning:v$.emergency_contact_last_name.$error}">
    <label for="lname" class="form-label">Last Name</label>
    <input type="text" class="form-control form-control-sm" id="lname" v-model="emergency_contact_last_name">
     <span class="error-msg mt-1">{{ v$.emergency_contact_last_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-sm-3">
    <label for="relation" class="form-label">Relationship</label>
    <input type="text" class="form-control form-control-sm" id="relation" v-model="contact_relationship">
  </div>
  <div class="mb-3 col-sm-3">
    <label for="relativesregion" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="relativesregion" v-model="emergency_address.region">
  </div>
  </div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-3">
    <label for="town" class="form-label">Town</label>
    <input type="text" class="form-control form-control-sm" id="town" v-model="emergency_address.town">
  </div>
  <div class="mb-3 col-sm-3">
    <label for="woreda" class="form-label">Woreda/Subcity</label>
    <input type="text" class="form-control form-control-sm" id="woreda" v-model="emergency_address.subcity">
  </div>
  <div class="mb-3 col-sm-3">
    <label for="relativesckebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="relativesckebele" v-model="emergency_address.kebele">
  </div>
   <div class="mb-3 col-sm-3">
    <label for="rel_hou_no" class="form-label">House Number</label>
    <input type="text" class="form-control form-control-sm" id="rel_hou_no" v-model="emergency_address.house_no">
  </div>
  </div>
   <div class="mt-3"><strong>Tel</strong></div>
  <div class="row mt-3">
       <div class="mb-4 col-sm-4">
    <label for="residence" class="form-label">Residence</label>
    <input type="tel" class="form-control form-control-sm" id="residence" v-model="studentInfo.contact_tel">
  </div>
   <div class="mb-4 col-sm-4">
    <label for="office_phone" class="form-label">Office</label>
    <input type="tel" class="form-control form-control-sm" id="office_phone" v-model="studentInfo.contact_office_tel">
  </div>
   <div class="mb-4 col-sm-4" :class="{warning:v$.studentInfo.contact_phone_no.$error}">
    <label for="contactphoneNo" class="form-label">Mobile Number</label>
    <input type="tel" class="form-control form-control-sm" id="contactphoneNo" v-model="studentInfo.contact_phone_no">
    <span class="error-msg mt-1">{{ v$.studentInfo.contact_phone_no.$errors[0]?.$message}}</span>
  </div>
  </div>
  <div class="d-flex justify-content-end mt-5 mb-3">
      <button @click="gotoEducationInfo()" class="btn p-1">Next</button>
      </div>
 
</template>
<script>
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
export default {
    inject:['personalDetail'],
    data() {
        return {
          v$:useValidate(),
            studentInfo:{},
            birth_address:{},
            residential_address:{},
            emergency_address:{},
            sex:'male',
            maritial_status:'single',
            emergency_contact_first_name:'',
            emergency_contact_last_name:'',
            contact_relationship:''

        }
    },
    validations(){
      return{
         studentInfo:{
         first_name:{required:helpers.withMessage('first name is required',required)},
        middle_name:{required:helpers.withMessage('middle name is required',required)},
        last_name:{required:helpers.withMessage('last name is required',required)},
        phone_no:{required:helpers.withMessage('Mobile number  is required',required)},
        birthDay:{required:helpers.withMessage('Birth Date  is required',required)},
        contact_phone_no:{required:helpers.withMessage('Emergency Contacte Person phone Number  is required',required)},
        },
        emergency_contact_first_name:{required:helpers.withMessage('Please enter Emergency contact person first name',required)},
         emergency_contact_last_name:{required:helpers.withMessage('Please enter Emergency contact person last name',required)},
        birth_address:{
         region: {required:helpers.withMessage('Birth Address   Region  is required',required)},
         zone: {required:helpers.withMessage('Birth Address   Zone  is required',required)},
        subcity: {required:helpers.withMessage('Birth Address   subcity  is required',required)},
        kebele: {required:helpers.withMessage('Birth Address   kebele  is required',required)},
      },
      residential_address:{
        subcity:{required:helpers.withMessage('Current Residence Address   Subcity  is required',required)},
         kebele:{required:helpers.withMessage('Current Residence Address   kebele  is required',required)},
      }
      }
    },
    methods: {
        gotoEducationInfo(){
         this.v$.$validate()
           this.studentInfo.sex = this.sex
           this.studentInfo.contact_full_name = this.emergency_contact_first_name+' '+this.emergency_contact_last_name
           this.studentInfo.contact_relationship = this.contact_relationship
            this.studentInfo.birth_address = this.birth_address
            this.studentInfo.residential_address = this.residential_address
            this.studentInfo.maritial_status = this.maritial_status
            this.studentInfo.emergency_address = this.emergency_address
            if(!this.v$.$error){
              this.$store.commit('registrar/setResultNotifier','')
            this.personalDetail(this.studentInfo,'educational-info')
         }
        }
    },
}
</script>
<style scoped>
.btn{
    background-color: #2f4587;
    width: 7em;
    color: #fff;
}
.btn:hover{
background-color: #366ad9;
}
 .warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  }
</style>