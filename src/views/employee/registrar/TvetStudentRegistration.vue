<template>
<!--
<div class="wraper bg-white">
</div>
<div class="innerwraper">
<div class="d-flex justify-content-between">
<span class="ms-5 mt-3">PERSONAL INFORMATION</span>
<div class="d-flex bg-white mt-2 p-2 me-3">
<span>RECIEPT NO.</span>
<input type="text" class="form-control">
</div>
</div>

<base-card>
<div class="mb-3">
<span class="me-2"><strong>Full Name:-</strong></span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex">
<div class="sex"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 me-3">
  <input class="form-check-input p-2" type="radio" name="birthplace" value="male" id="male" checked>
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="birthplace" value="female" id="female">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
<div class="birthplace mt-2">
<p><strong>Place of Birth:-</strong></p>
</div>
<div>
<span class="ms-5 me-5">Country:</span>
<input class="form-control form-control-sm ms-2" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Region:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Zone:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex mt-3">
<span class="ms-5 me-2">District/Sub ciy:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Kebele:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex mt-3">
<span class="me-2"><strong>Date of Birth:-</strong></span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="birthplace mt-3">
<p><strong>Current Residential Address:-</strong></p>
</div>
<div class="d-flex mb-4">
<span class="ms-5 me-5">District:</span>
<input class="form-control form-control-sm ms-2" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Kebele:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">House No:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex">
<div><span class="me-2"><strong>Marital Status:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="exampleRadios" id="male" value="male" checked>
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="exampleRadios" id="female" value="female">
  <label class="form-check-label" for="female">
    Female
  </label>
</div>
</div>
<div class="contactperson mt-3">
<span><strong>Person to contacted in case of Emergency</strong></span>
</div>
<div class="d-flex mt-3">
<span class="ms-5 me-2">Name:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-5">Relation:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-3">Region:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex mt-3">
<span class="ms-5 me-2">Town:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Woreda/sub City:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
<span class="ms-5 me-2">Kebele:</span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
<div class="d-flex mt-3 mb-3">
<span class="ms-5 me-2">Phone No:</span>
<input class="form-control form-control-sm" type="tel" aria-label=".form-control-sm example">
</div>
</base-card>
<div class="ms-1 p-2"><span>EDUCATIONAL BACKGROUND</span></div>
<base-card>
<div class="d-flex mt-3 mb-3">
<span class="ms-5 me-2"><strong>EGSSE Result:-</strong></span>
<input class="form-control form-control-sm" type="tel" aria-label=".form-control-sm example">
</div>
<div class="d-flex mt-3 mb-3">
<span class="ms-5 me-2"><strong>EHEEE Result:-</strong></span>
<input class="form-control form-control-sm" type="tel" aria-label=".form-control-sm example">
</div>
</base-card>
<div class="ms-1 p-2"><span>CLASIFFICATION OF ADMISSION</span></div>
<base-card>
<div class="d-flex mt-3">
<div><span class="me-2"><strong>Program:-</strong></span></div>
<div class="form-check ms-5 me-3">
  <input class="form-check-input p-2" type="radio" name="programname" id="regular" value="regular" checked>
  <label class="form-check-label" for="regular">
    Regular
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="programname" id="extension" value="extension">
  <label class="form-check-label" for="extension">
    Female
  </label>
</div>
</div>
<div class="d-flex mt-3 mb-3">
<span class="me-3"><strong>Department:-</strong></span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
</base-card>
<div class="incomesource ms-1 mt-3">
<span>FINANCIAL SUPORT</span>
</div>
<base-card>
<div><span class="me-2"><strong>State your financial Source:-</strong></span></div>
<div class="d-flex mt-3">
<div class="form-check ms-5 me-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="self" value="self" checked>
  <label class="form-check-label" for="self">
    Self suport
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="govt" value="govt">
  <label class="form-check-label" for="govt">
    Geovernment
  </label>
</div>
</div>
<div class="d-flex mt-3">
<div class="form-check ms-5 me-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="self" value="self" checked>
  <label class="form-check-label" for="self">
    Self suport
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input p-2" type="radio" name="finance" id="govt" value="govt">
  <label class="form-check-label" for="govt">
    Geovernment
  </label>
</div>
</div>
<div class="d-flex mt-3 mb-3">
<span class="me-3"><strong>Other(specify):-</strong></span>
<input class="form-control form-control-sm" type="text" aria-label=".form-control-sm example">
</div>
</base-card>

</div>
    </div>
    -->
    <div class="wraper bg-white">
<div class="ms-3 me-3 p-2 text-center">HORIZON COLLEGE OFFICE OF REGISTRAR TRAINEE'S ADMISSION APPLICATIONS</div>
<div class="text-center mb-3"> FORM FOR DEGREE STUDENT</div>
    
    <div class="innerwrap">
    <div class="d-flex justify-content-between align-items-center">
    <span class="ms-3">PERSONAL INFORMATION</span>
</div>
<form @submit.prevent = "addNewStudent">
<base-card>
<div class="row">
<div class="mb-3 col-sm-4">
    <label for="fname" class="form-label">First Name</label>
    <input type="text" class="form-control form-control-sm" id="fname" v-model="studentInfo.first_name">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="mname" class="form-label">Middle Name</label>
    <input type="text" class="form-control form-control-sm" id="mname" v-model="studentInfo.middle_name">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="lname" class="form-label">Last Name</label>
    <input type="text" class="form-control form-control-sm" id="lname" v-model="studentInfo.last_name">
  </div>
 </div>
  <div class="d-flex">
<div class="sex mt-4"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="gender" value="male" id="male" v-model="sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="gender" value="female" id="female" v-model="sex">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
<div class="mt-3"><strong>Place of Birth:-</strong></div>
<div class="row mt-3">
<div class="mb-3 col-sm-3">
    <label for="country" class="form-label">Country</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="birth_address.country">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="region" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="birth_address.region">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="zone" class="form-label">Zone</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="birth_address.zone">
  </div>
</div>
<div class="row mt-3">
   <div class="mb-3 col-sm-4">
    <label for="subcity" class="form-label">District/Sub city</label>
    <input type="text" class="form-control form-control-sm" id="subcity" v-model="birth_address.subcity">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="birth_address.kebele">
  </div>
</div>
<div class="mb-3 col-sm-4">
    <label for="birthdate" class="form-label"><strong>Date of Birth:-</strong></label>
    <input type="text" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.dob">
  </div>
  <div class="mt-3"><strong>Current residential address:-</strong></div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="country" class="form-label">District</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="residential_address.subcity">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="region" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="residential_address.kebele">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="zone" class="form-label">House No</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="residential_address.house_no">
  </div>
  </div>
  <div class="mb-4 col-sm-4">
    <label for="phoneNo" class="form-label"><strong>Phone Number</strong></label>
    <input type="tel" class="form-control form-control-sm" id="phoneNo" v-model="studentInfo.phone_no">
  </div>
  <div class="d-flex">
<div><span class="me-2"><strong>Marital Status:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="exampleRadios" id="married" value="married" v-model="maritial_status">
  <label class="form-check-label ms-2" for="married">
    Married
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="exampleRadios" id="single" value="single" v-model="maritial_status">
  <label class="form-check-label ms-2" for="single">
    Single
  </label>
</div>
</div>
<div class="mt-3"><strong>Person to Contacted incase of Emergency:-</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="name" class="form-label">name</label>
    <input type="text" class="form-control form-control-sm" id="name"  v-model="studentInfo.emergency_contact_name">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relation" class="form-label">Relationship</label>
    <input type="text" class="form-control form-control-sm" id="relation" v-model="studentInfo.emergency_contact_relationship">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relativesregion" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="relativesregion" v-model="emergency_address.region">
  </div>
  </div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="town" class="form-label">Town</label>
    <input type="text" class="form-control form-control-sm" id="town" v-model="emergency_address.town">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="woreda" class="form-label">Woreda/Subcity</label>
    <input type="text" class="form-control form-control-sm" id="woreda" v-model="emergency_address.worda">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relativesckebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="relativesckebele" v-model="emergency_address.kebele">
  </div>
  </div>
   <div class="mb-4 col-sm-4">
    <label for="relativesphoneNo" class="form-label">Phone Number</label>
    <input type="tel" class="form-control form-control-sm" id="relativesphoneNo" v-model="studentInfo.emergency_contact_phone_no">
  </div>
</base-card>
 <div class="mt-3 ms-3 p-2">EDUCATION BACKGROUND</div>
<base-card>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="egsseresult" class="form-label">EGSSE Result</label>
    <input type="text" class="form-control form-control-sm" id="egsseresult" v-model="studentInfo.EGSSE_result">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="eheeeresult" class="form-label">EHEEE Result</label>
    <input type="text" class="form-control form-control-sm" id="eheeeresult" v-model="studentInfo.EHEEE_result">
  </div>
  </div>
  </base-card>
  <div class="mt-3 ms-3 p-2">CLASIFFICATION OF ADMISSION</div>
  <base-card>
  <!-- <span>{{levelAtZeroIndex(tvetDepartments[0]?.id)}}</span> -->
   <div class="d-flex justify-content-start align-items-center">
  <div class="p-3 col-sm-4">
  <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="tvet_department_id" @change="filterLevel($event)">
  <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="p-3 col-sm-4">
 <span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="programId">
  <option v-for="Program in tvetPrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
  </div>
  <div class="d-flex align-items-center mt-4 me-5">
<div><span class="me-2"><strong>Level:-</strong></span></div>
<div v-for="level in levelList" :key="level.id" class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" id="levelone" :value="level.id" v-model="level_id">
  <label class="form-check-label ms-2" for="levelone">
    {{'Level'+level.level_no}}
  </label>
</div>
</div>
  </base-card>
  <div class="mt-3 ms-3 p-2">FINANCIAL SUPPORT</div>
  <base-card>
  <div><strong>State Your Finantial Source:-</strong></div>
   <div class="d-flex align-items-center mt-3">
<div class="form-check ms-5 me-3">
  <input class="form-check-input ms-2 p-2" type="radio" name="financee" id="selfsupport" value="selfsupport" v-model="financial_source">
  <label class="form-check-label ms-2" for="selfsupport">
    Self-Support
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="govt" value="govt" v-model="financial_source">
  <label class="form-check-label ms-2" for="govt">
    Geovernment
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="relative" value="relative" checked v-model="financial_source">
  <label class="form-check-label ms-2" for="relative">
    Relative
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="nongovt" value="nongovt" v-model="financial_source">
  <label class="form-check-label ms-2" for="nongovt">
    Non-Geovernment
  </label>
</div>
</div>
<div class="d-flex mb-4">
<div class="form-check ms-4 mt-4 me-1">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="other" value="other" v-model="financial_source">
  <label class="form-check-label ms-2" for="other">
    Other(specify)
  </label>
</div>
<span class="mt-4 col-sm-4">
<input class="form-control form-control-sm" type="tex" name="financee" id="othersource" v-model="other_source">
</span>
</div>
  </base-card>
  <div class="mt-3 ms-3 p-2">SCHOLARSHIP CASE</div>
  <base-card>
  <div class="d-flex p-3">
<div><span class="me-2"><strong>Give Scolarship Chance:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="scholar" id="fullscolarship" value="fullScholar" v-model="scholar_type">
  <label class="form-check-label ms-2" for="fullscolarship">
    Fully Scholarship
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="scholar" id="partialscolar" value="partialScholar" v-model="scholar_type">
  <label class="form-check-label ms-2" for="partialscolar">
    Partial Scholarship
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="scholar" id="none" value="noScholar" checked v-model="scholar_type">
  <label class="form-check-label ms-2" for="none">
    None
  </label>
</div>
 </div>
  </base-card>
  <div v-if="scholar_type === 'noScholar'">
   <div class="mt-3 ms-3 p-2">TUITION FEE PAYMENT</div>
  <base-card>
<!--payment form per mounth -->
 <div class="d-flex mt-3">
 <span class="me-2"><strong>Date</strong></span> 
<div class="ms-5 me-3 col-4">
  <input class="form-control form-control-sm ms-4" type="text" name="date" id="date" v-model="studentInfo.paid_date">
</div>
<span class="ms-5 me-2"><strong>Reciept No</strong></span> 
<div class="ms-4 me-3 col-4">
  <input class="form-control form-control-sm ms-4" type="number" name="recieptno" id="recieptno" v-model="studentInfo.receipt_no">
</div>
</div>
<div class="d-flex mt-4">
<span class="me-2"><strong>Tuition fee</strong></span> 
<div class="me-3 col-4">
  <input class="form-control form-control-sm ms-4" type="number" name="tuitionfee" id="tuitionfee" v-model="studentInfo.tuition_fee">
</div>
<span class=" ms-5 me-2"><strong>Registration fee</strong></span> 
<div class="me-3 col-4">
  <input class="form-control form-control-sm ms-4" type="number" name="registration_fee" id="registration_fee" v-model="studentInfo.registration_fee">
</div>
</div>
<div class="mt-5">
  <span><strong>Check Payed mounths</strong></span> 
</div>
<div class="d-flex mt-3 mb-3">
<div class="form-check ms-3" v-for="month in months" :key="month.id">
  <input class="form-check-input" type="checkbox" :value="month.id" :id="'check'+month.id" v-model="tuition_months">
  <label class="form-check-label" :for="'check'+month.id">
    {{month.name}}
  </label>
</div>
</div>
  </base-card>
  </div>
  <div class="mt-3 p-4">
  <span class="notifiers" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</span>
  <div class="d-flex justify-content-end">
  <button class="btn">
  <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               REGISTERING
            </span>      
            <span v-else>REGISTER</span> 
  </button>
  </div>
  </div>
  </form>
    </div>
    </div>
</template>
<script>
//import {mapGetters} from 'vuex'
import apiClient from '../../../store/baseUrl'
export default {
    data() {
        return {
            studentInfo:{},
            birth_address:{},
            emergency_address:{},
            residential_address:{},
            tuition_months:[],
            levelList:[],
            fully_scholarship:0,
            partial_scholarship:0,
            scholar_type:'noScholar',
            sex:'male',
            maritial_status:'single',
            level_id:'levelone',
            financial_source:'relative',
            other_source:'',
            resultNotifier:'',
            isSuccessed:false,
            isFaild:true,
            isLoading:false
        }
    },
        computed:{
   // ...mapGetters('dean',['tvetDepartments','tvetPrograms']),
     months(){
      return this.$store.getters['registrar/acadamicYearMounths']
    },
    levels(){
      return this.$store.getters['registrar/levels']
    },
      tvetDepartments(){
      return this.$store.getters['dean/tvetDepartments']
    },
      tvetPrograms(){
      return this.$store.getters['dean/tvetPrograms']
    }
  },
    created() {
     this.levelAtZeroIndex(this.tvetDepartments[0]?.id)
    },
    watch:{
    scholar_type(newValue){
      if(newValue === 'fullScholar'){
        this.fully_scholarship = 1
        this.partial_scholarship = 0
        console.log('full scholarship = '+this.fully_scholarship)
      }
      else if(newValue === 'partialScholar'){
        this.partial_scholarship = 1
        this.fully_scholarship = 0
      console.log('partial scholarship = '+this.partial_scholarship)

      }
      else{
         this.noScholar = 1
         this.partial_scholarship = 0
        this.fully_scholarship = 0
      console.log(' noscholarship = '+this.noScholar)
    }
    },
  },
    methods: {
       async addNewStudent(){
         this.isLoading = true
          if(this.financial_source  === 'other'){
        this.financial_source = this.other_source
        console.log('other finance source',this.financial_source)
      }
         this.studentInfo.tvet_department_id = this.$refs.tvet_department_id.value
         this.studentInfo.sex = this.sex
         this.studentInfo.maritial_status = this.maritial_status
         this.studentInfo.level_id = this.level_id
         this.studentInfo.tvet_department_id = this.$refs.tvet_department_id.value
        this.studentInfo.program_id = this.$refs.programId.value
        this.studentInfo.tuition_months = this.tuition_months
        this.studentInfo.fully_scholarship = this.fully_scholarship
        this.studentInfo.partial_scholarship = this.partial_scholarship
        this.studentInfo.financial_source = this.financial_source

        this.studentInfo.birth_address = this.birth_address
        this.studentInfo.residential_address = this.residential_address
        this.studentInfo.emergency_address = this.emergency_address
            console.log('new tvet student come')
            console.log(this.studentInfo)
            try{
  var response = await apiClient.post('api/tvet_students',this.studentInfo)
  console.log('status code = '+response.status)
  if(response.status === 201){
    console.log('response from adding tvet student')
    console.log(response.data)
   var previousTvetStudent = this.$store.getters['registrar/tvetStudents']
    previousTvetStudent.push(response.data)
    this.$store.commit('registrar/setTvetStudent',previousTvetStudent)
     this.resultNotifier = 'You have registered a student successfully'
       this.isSuccessed = true
       this.isFaild = false
  }
 else{
    this.resultNotifier = 'Faild to register a student'
       this.isSuccessed = false
       this.isFaild = true
  }
}
catch(e){
  this.resultNotifier = 'Faild to register a student'
       this.isSuccessed = false
       this.isFaild = true
}
finally{
  this.isLoading = false
}

        },
        filterLevel(event){
          this.levelList = this.levels.filter(level=>{
            return Number(event.target.value) === Number(level.tvet_department_id)
          })
        },
        //  levelAtZeroIndex(deptId){
        //   this.levelList = this.levels.filter(level=>{
        //     return Number(deptId) === Number(level.tvet_department_id)
        //   })
        // }
    },
}
</script>
<style scoped>
.innerwrap{
    background-color: #f5f6fa;
}
.btn{
    background-color: #ff9500;
    color: #fff;
    width: 9em;

} 
.btn:hover{
    background-color:#eca643 ;
}
input{
  border: 1px solid rgb(150, 147, 147);
}
.success{
    color: green;
  }
  .faild{
    color: red;
  }

</style>