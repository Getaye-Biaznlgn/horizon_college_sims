<template>
<base-card>
 <span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i>Back</span>
<div class="px-3 mt-3">PERSONAL INFORMATION</div>
<div class="border rounded shadow-sm p-3">
<div class="mt-3"><span ><Strong>Full Name</Strong></span></div>
<div class="row mt-3">
<div class="mb-3 col-lg-4" :class="{warning:v$.studentInfo.first_name.$error}">
    <label for="fname" class="form-label">First Name</label>
    <input type="text" class="form-control form-control-sm" id="fname" v-model="studentInfo.first_name">
    <span class="error-msg mt-1">{{ v$.studentInfo.first_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-4" :class="{warning:v$.studentInfo.middle_name.$error}">
    <label for="mname" class="form-label">Middle Name</label>
    <input type="text" class="form-control form-control-sm" id="mname" v-model="studentInfo.last_name">
     <span class="error-msg mt-1">{{ v$.studentInfo.middle_name.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-4" :class="{warning:v$.studentInfo.last_name.$error}">
    <label for="lname" class="form-label">Last Name</label>
    <input type="text" class="form-control form-control-sm" id="lname" v-model="studentInfo.middle_name">
     <span class="error-msg mt-1">{{ v$.studentInfo.last_name.$errors[0]?.$message}}</span>
  </div>
</div>
 <div class="d-flex">
<div class="sex mt-4"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="Male" id="male" v-model="sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="Female" id="female" v-model="sex">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
<div class="mt-3"><strong>Place of Birth</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-lg-4" :class="{warning:v$.birth_address.region.$error}">
    <label for="region" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="birth_address.region">
    <span class="error-msg mt-1">{{ v$.birth_address.region.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-4" :class="{warning:v$.birth_address.zone.$error}">
    <label for="zone" class="form-label">Zone</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="birth_address.zone">
    <span class="error-msg mt-1">{{ v$.birth_address.zone.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-3 col-lg-4" :class="{warning:v$.birth_address.subcity.$error}">
    <label for="subcity" class="form-label">District/Sub city</label>
    <input type="text" class="form-control form-control-sm" id="subcity" v-model="birth_address.subcity">
    <span class="error-msg mt-1">{{ v$.birth_address.subcity.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-4" :class="{warning:v$.birth_address.kebele.$error}">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="birth_address.kebele">
    <span class="error-msg mt-1">{{ v$.birth_address.kebele.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-4">
    <label for="country" class="form-label">Country (for none Ethiopian)</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="birth_address.country">
   
  </div>
</div>
<div><strong>Date of Birth(E.C)</strong></div>
<div class="row mt-2">
    <div class="mb-3 col-lg-4" :class="{warning:v$.studentInfo.dob.$error}">
    <label for="birthdate" class="form-label">Date of birth</label>
    <input type="date" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.dob">
    <span class="error-msg mt-1">{{ v$.studentInfo.dob.$errors[0]?.$message}}</span>
  </div>
</div>
  <div class="mt-3"><strong>Current residential address</strong></div>
  <div class="row mt-3">
  <div class="mb-3 col-lg-3" :class="{warning:v$.residential_address.subcity.$error}">
    <label for="district" class="form-label">District</label>
    <input type="text" class="form-control form-control-sm" id="district" v-model="residential_address.subcity">
    <span class="error-msg mt-1">{{ v$.residential_address.subcity.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-3" :class="{warning:v$.residential_address.kebele.$error}">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="residential_address.kebele">
    <span class="error-msg mt-1">{{ v$.residential_address.kebele.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-3">
    <label for="house_ho" class="form-label">House No</label>
    <input type="number" class="form-control form-control-sm" id="house_ho" v-model="residential_address.house_no">
  </div>
  <div class="mb-3 col-lg-3">
    <label for="year" class="form-label">Year</label>
    <input type="number" class="form-control form-control-sm" id="year" v-model="residential_address.year">
  </div>
  </div>
  <div class="mt-3"><strong>Tel</strong></div>
  <div class="row mt-3">
       <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.residence_tel.$error}">
    <label for="residence" class="form-label">Residence</label>
    <input type="tel" class="form-control form-control-sm" id="residence" v-model="studentInfo.residence_tel">
     <span class="error-msg mt-1">{{ v$.studentInfo.residence_tel.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.residence_office_tel.$error}">
    <label for="office_phone" class="form-label">Office</label>
    <input type="tel" class="form-control form-control-sm" id="office_phone" v-model="studentInfo.residence_office_tel">
     <span class="error-msg mt-1">{{ v$.studentInfo.residence_office_tel.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.phone_no.$error}">
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
  <div class="mb-3 col-lg-3" :class="{warning:v$.emergency_contact_first_name.$error}">
    <label for="fname" class="form-label">First Name</label>
    <input type="text" class="form-control form-control-sm" id="fname" v-model="emergency_contact_first_name">
    <span class="error-msg mt-1">{{ v$.emergency_contact_first_name.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-3 col-lg-3" :class="{warning:v$.emergency_contact_last_name.$error}">
    <label for="lname" class="form-label">Last Name</label>
    <input type="text" class="form-control form-control-sm" id="lname" v-model="emergency_contact_last_name">
    <span class="error-msg mt-1">{{ v$.emergency_contact_last_name.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-3 col-lg-3" :class="{warning:v$.emergency_contact_relationship.$error}">
    <label for="relation" class="form-label">Relationship</label>
    <input type="text" class="form-control form-control-sm" id="relation" v-model="emergency_contact_relationship">
     <span class="error-msg mt-1">{{ v$.emergency_contact_relationship.$errors[0]?.$message}}</span>
  </div>
  <div class="mb-3 col-lg-3">
    <label for="relativesregion" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="relativesregion" v-model="emergency_address.region">
  </div>
  </div>
  <div class="row mt-3">
  <div class="mb-3 col-lg-3">
    <label for="town" class="form-label">Town</label>
    <input type="text" class="form-control form-control-sm" id="town" v-model="emergency_address.town">
  </div>
  <div class="mb-3 col-lg-3">
    <label for="woreda" class="form-label">Woreda/Subcity</label>
    <input type="text" class="form-control form-control-sm" id="woreda" v-model="emergency_address.subcity">
  </div>
  <div class="mb-3 col-lg-3">
    <label for="relativesckebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="relativesckebele" v-model="emergency_address.kebele">
  </div>
   <div class="mb-3 col-lg-3">
    <label for="rel_hou_no" class="form-label">House Number</label>
    <input type="text" class="form-control form-control-sm" id="rel_hou_no" v-model="emergency_address.house_no">
  </div>
  </div>
   <div class="mt-3"><strong>Tel</strong></div>
  <div class="row mt-3">
       <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.contact_residence_tel.$error}">
    <label for="residence" class="form-label">Residence</label>
    <input type="tel" class="form-control form-control-sm" id="residence" v-model="studentInfo.contact_residence_tel">
     <span class="error-msg mt-1">{{ v$.studentInfo.contact_residence_tel.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.contact_office_tel.$error}">
    <label for="office_phone" class="form-label">Office</label>
    <input type="tel" class="form-control form-control-sm" id="office_phone" v-model="studentInfo.contact_office_tel">
    <span class="error-msg mt-1">{{ v$.studentInfo.contact_office_tel.$errors[0]?.$message}}</span>
  </div>
   <div class="mb-4 col-lg-4" :class="{warning:v$.studentInfo.contact_phone_no.$error}">
    <label for="contactphoneNo" class="form-label">Mobile Number</label>
    <input type="tel" class="form-control form-control-sm" id="contactphoneNo" v-model="studentInfo.contact_phone_no">
    <span class="error-msg mt-1">{{ v$.studentInfo.contact_phone_no.$errors[0]?.$message}}</span>
  </div>
  </div>
   <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier1}}</p>
  <div class="d-flex justify-content-end mt-5 mb-3">
     <button type="button" @click="savePersonalInfo()" class="btn  px-2 next text-white mx-3">
            <span v-if="isUploading1">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Saving
            </span>      
            <span v-else>Save Change</span>   
          </button>
      </div>
 </div>
  <!-- Educational information -->
      <div class="mt-5"><span class="px-3"> EDUCATIONAL INFORMATION</span></div>
      <div class="border rounded shadow-sm p-3">
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
   <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier2}}</p>
       <div class="d-flex justify-content-end mt-5 mb-3">
         <button type="button" @click="saveEducationalData()" class="btn  px-2 next text-white mx-3">
            <span v-if="isUploading2">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Saving
            </span>      
            <span v-else>Save Change</span>   
          </button>
  </div>
  </div>
  <div class="px-3 mt-5">CLASSIFICATION OF ADMISSION</div>
  <div class="border rounded shadow-sm p-3">
    <div class="row">
  <div class="p-3 col-sm-6">
  <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="tvetDepartmentId">
  <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="p-3 col-sm-6">
 <span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="programId">
  <option v-for="Program in tvetPrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
  </div>
  <div class="d-flex mt-3">
      <div class="mt-3"><span class="me-2"><strong>Scolarship Chance</strong></span></div>
<div class="form-check mt-3 me-3">
  <input class="form-check-input ms-4 p-2" type="checkbox" name="scholar" id="fullscolarship" v-model="fully_scholarship">
  <label class="form-check-label ms-2" for="fullscolarship">
    Fully Funded Scholarship
  </label>
</div>
 </div>
  <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier3}}</p>
    <div v-if="status === 'waiting'" class="d-flex justify-content-end mt-5 mb-3">
       <button type="button" @click="saveAdmisionData()" class="btn  px-2 next text-white mx-3">
            <span v-if="isUploading3">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Saving
            </span>      
            <span v-else>Save Change</span>   
          </button>
  </div>
  </div>
   <!-- finance info -->
      <div class="px-3 mt-5">FINANCIAL SOURCE</div>
      <div class="border rounded shadow-sm p-3">
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
    Other
  </label>
</div>
<!-- <span class="mt-3 col-sm-4">
<input class="form-control form-control-sm" type="tex" name="finance" id="othersource" v-model="otherstated">
</span> -->
</div>
</div>
<div class="d-flex justify-content-between">
   <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier4}}</p>
 <div class="d-flex mt-5 mb-3 justify-content-end">
        <button type="button" @click="saveFinanceData()" class="btn  px-2 next text-white mx-3">
            <span v-if="isUploading4">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Saving
            </span>      
            <span v-else>Save Change</span>   
          </button>
  </div>
</div>
      </div>
</base-card>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import useValidate from '@vuelidate/core'
import { required,helpers,minLength,maxLength,numeric} from '@vuelidate/validators'
export default {
    props:['studId'],
    data() {
        return {
          v$:useValidate(),
            studentInfo:{},
            sex:'Male',
            birth_address:{},
            residential_address:{},
            emergency_address:{},
            maritial_status:'single',
            emergency_contact_first_name:'',
            emergency_contact_last_name:'',
            emergency_contact_relationship:'',
             EGSSE_result:'', 
           EHEEE_result:'',
              fully_scholarship:false,
            admissionData:{},
            tvetDepartmentId:'',
            programId:'',
            isPersonalInfo:'',
            isUploading1:false,
             isUploading2:false,
              isUploading3:false,
               isUploading4:false,
            student_id:'',
            financial:'relative',
             isSuccessed:'',
            isFaild:'',
            resultNotifier1:'',
            resultNotifier2:'',
            resultNotifier3:'',
            resultNotifier4:'',
            status:null
        }
    },
    validations(){
      return{
         studentInfo:{
         first_name:{required:helpers.withMessage('first name is required',required),
            max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
        middle_name:{required:helpers.withMessage('middle name is required',required),
         max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
        last_name:{required:helpers.withMessage('last name is required',required),
         max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
           // phone_no:{required:helpers.withMessage('Applicants Mobile number  is required',required)},
        dob:{required:helpers.withMessage('Birth Date  is required',required)},
        contact_phone_no:{required:helpers.withMessage('Emergency Contacte Person phone Number  is required',required),
                  numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))},
        phone_no:{required:helpers.withMessage('Mobile number  is required',required),
                  numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))},
                  residence_tel:{numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))},
                  residence_office_tel:{numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))},
                                contact_office_tel:{numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))},
                                contact_residence_tel:{numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 10 digits long',maxLength(10))}
      },
      emergency_contact_first_name:{required:helpers.withMessage('Please enter Emergency contact person first name',required),
       max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
         emergency_contact_last_name:{required:helpers.withMessage('Please enter Emergency contact person last name',required),
          max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
          emergency_contact_relationship:{required:helpers.withMessage('Emergency contact person Relationship is Required ',required),
           max:helpers.withMessage('Maximum character length should be 20',maxLength(20))},
        birth_address:{
         region: {required:helpers.withMessage('Birth Address   Region  is required',required),
          max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
         zone: {required:helpers.withMessage('Birth Address   Zone  is required',required),
            max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
        subcity: {required:helpers.withMessage('Birth Address   subcity  is required',required),
           max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
        kebele: {required:helpers.withMessage('Birth Address   kebele  is required',required),
           max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
      },
      residential_address:{
        subcity:{required:helpers.withMessage('Current Residence Address   District  is required',required),
           max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
         kebele:{required:helpers.withMessage('Current Residence Address   kebele  is required',required),
            max:helpers.withMessage('Maximum character length should be 15',maxLength(15))},
      }
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
      this.fetchStudentDatas()
    },
    watch:{
      studId(){
        this.fetchStudentDatas()
      }
    },
    methods: {
             back(){
        this.$router.back()
      },
           async fetchStudentDatas(){
            this.$store.commit('setIsItemLoading',true)
            try{
var response = await apiClient.get('api/tvet_student_info_detail/'+this.studId)
if(response.status === 200){
  console.log('tvet student detail data',response.data)
    this.student_id = response.data.id
    this.studentInfo.first_name = response.data.first_name
    this.studentInfo.last_name = response.data.last_name
    this.studentInfo.middle_name = response.data.middle_name
    this.studentInfo.dob = response.data.dob
    this.studentInfo.residence_tel = response.data.residence_tel
    this.studentInfo.residence_office_tel = response.data.residence_office_tel
    this.studentInfo.phone_no = response.data.phone_no
    this.studentInfo.contact_residence_tel = response.data.contact_tel
     this.studentInfo.contact_office_tel = response.data.contact_office_tel
      this.studentInfo.contact_phone_no = response.data.contact_phone_no
      this.emergency_contact_relationship = response.data.contact_relationship
      var name = (response.data.contact_full_name).split(' ')
      this.emergency_contact_first_name = name[0]
      this.emergency_contact_last_name = name[1]
      this.maritial_status = response.data.maritial_status
      this.sex = response.data.sex
      this.residential_address.subcity = response.data.residential_address.subcity
      this.residential_address.kebele = response.data.residential_address.kebele
      this.residential_address.house_no = response.data.residential_address.house_no
      this.residential_address.year = response.data.residential_address.year
      this.emergency_address.region = response.data.emergency_address.region
       this.emergency_address.town = response.data.emergency_address.town
        this.emergency_address.subcity = response.data.emergency_address.subcity
         this.emergency_address.kebele = response.data.emergency_address.kebele
          this.emergency_address.house_no = response.data.emergency_address.house_no
           this.birth_address.region = response.data.birth_address.region
           this.birth_address.zone = response.data.birth_address.zone
           this.birth_address.subcity = response.data.birth_address.subcity
           this.birth_address.kebele = response.data.birth_address.kebele
           this.birth_address.country = response.data.birth_address.country
           //educational data
            this.EGSSE_result = response.data.EGSSE_result
            this.EHEEE_result = response.data.EHEEE_result
            // clasification of admision
            this.tvetDepartmentId = response.data.tvet_department_id
            this.programId = response.data.program_id
            var scolar = response.data.fully_scholarship
            if(Number(scolar) === 1){this.fully_scholarship = true}
            else if(Number(scolar) === 0){ this.fully_scholarship = false}
            // financial source
            this.financial = response.data.financial_source
            this.status = response.data.status
    
}
            }
            catch(e){
                console.log('student detail is not found')
            }
            finally{
                this.$store.commit('setIsItemLoading',false)
            }
        },
       async savePersonalInfo(){
           this.resultNotifier1 = ''
            this.resultNotifier2 = ''
              this.resultNotifier3 = ''
               this.resultNotifier4 = ''
         this.v$.$validate()
         if(!this.v$.$error){
          this.isUploading1 = true
         this.studentInfo.sex = this.sex
           this.studentInfo.contact_full_name = this.emergency_contact_first_name+' '+this.emergency_contact_last_name
           this.studentInfo.contact_relationship = this.emergency_contact_relationship
            this.studentInfo.birth_address = this.birth_address
            this.studentInfo.residential_address = this.residential_address
            this.studentInfo.maritial_status = this.maritial_status
            this.studentInfo.emergency_address = this.emergency_address
             console.log('goto education detail')
            // console.log(this.v$.$errors[0]?.$message)
           
              try{
                    console.log('edited data',this.studentInfo)
           var response= await apiClient.put('api/update_tvet_student_personal_info/'+this.student_id,this.studentInfo)
            if(response.status === 200){
                console.log(response.data)
                 this.isSuccessed = true
            this.isFaild = false
                this.resultNotifier1='successfully updated'

            }
                }
                  catch(e){
                   this.isSuccessed = false
            this.isFaild = true
                this.resultNotifier1='faild to updated'
                }
                finally{
                    this.isUploading1 = false
                }
        }
        },
         async saveEducationalData(){
            this.resultNotifier1 = ''
            this.resultNotifier2 = ''
              this.resultNotifier3 = ''
               this.resultNotifier4 = ''
         this.isUploading2 = true
           var edudationData = {}
           edudationData.EGSSE_result = this.EGSSE_result
           edudationData.EHEEE_result = this.EHEEE_result
               try{
                    console.log('edited data',edudationData)
           var response= await apiClient.put('api/update_tvet_student_educational_info/'+this.student_id,edudationData)
            if(response.status === 200){
                console.log(response.data)
                 this.isSuccessed = true
            this.isFaild = false
                this.resultNotifier2='successfully updated'
            }
                }
                  catch(e){
                   this.isSuccessed = false
            this.isFaild = true
                this.resultNotifier2='faild to updated'
                }
                finally{
                    this.isUploading2 = false
                }
        },
       async saveAdmisionData(){
         this.resultNotifier1 = ''
            this.resultNotifier2 = ''
              this.resultNotifier3 = ''
               this.resultNotifier4 = ''
         this.isUploading3 = true
          var admissionData = {}
         admissionData.tvet_department_id= this.tvetDepartmentId
         admissionData.program_id= this.programId
         admissionData.fully_scholarship = this.fully_scholarship
          try{
                    console.log('edited data',admissionData)
           var response= await apiClient.put('api/update_tvet_student_admission_info/'+this.student_id,admissionData)
            if(response.status === 200){
                console.log(response.data)
                 this.isSuccessed = true
            this.isFaild = false
                this.resultNotifier3='successfully updated'
            }
                }
                  catch(e){
                   this.isSuccessed = false
            this.isFaild = true
                this.resultNotifier3='faild to updated'
                }
                finally{
                    this.isUploading3 = false
                }

        },
          async saveFinanceData(){
             this.resultNotifier1 = ''
            this.resultNotifier2 = ''
              this.resultNotifier3 = ''
               this.resultNotifier4 = ''
           this.isUploading4 = true
          try{
                    console.log('edited data',this.financial)
           var response= await apiClient.put('api/update_tvet_student_finance_info/'+this.student_id,{financial_source:this.financial})
            if(response.status === 200){
                console.log(response.data)
                 this.isSuccessed = true
            this.isFaild = false
                this.resultNotifier4='successfully updated'
            }
                }
                  catch(e){
                   this.isSuccessed = false
            this.isFaild = true
                this.resultNotifier4='faild to updated'
                }
                finally{
                    this.isUploading4 = false
                }
       }

    },
}
</script>
<style scoped>
  .backarrow{
  cursor: pointer;
  font-size: 22px;
}
.backarrow:hover{
  color: #1142ac;
}
.btn{
    background-color: #2f4587;
    width: 12em;
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
  .success{
    color: green;
  }
  .faild{
    color: red;
  }
</style>