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
    
    <div class="innerwrap px-3">
    <div class="d-flex justify-content-between align-items-center p-3">
    <span class="ms-3">PERSONAL INFORMATION</span>
</div>
<form @submit.prevent="addNewStudent">
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
 <div class="d-flex col-4">
<div class="sex mt-4"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="male" id="male" checked v-model="studentInfo.sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="sex" value="female" id="female" v-model="studentInfo.sex">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
<div class="mt-3"><strong>Place of Birth:-</strong></div>
<div class="row mt-3">
<div class="mb-3 col-sm-4">
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
    <input type="number" class="form-control form-control-sm" id="zone" v-model="residential_address.house_no">
  </div>
  </div>
  <div class="mb-4 col-sm-4">
    <label for="phoneNo" class="form-label"><strong>Phone Number</strong></label>
    <input type="tel" class="form-control form-control-sm" id="phoneNo" v-model="studentInfo.phone_no">
  </div>
  <div class="d-flex">
<div><span class="me-2"><strong>Marital Status:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="marritalstatus" id="married" value="married" checked v-model="maritial_status">
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
</div>
<div class="mt-4"><strong>Person to Contacted incase of Emergency:-</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="name" class="form-label">name</label>
    <input type="text" class="form-control form-control-sm" id="name" v-model="studentInfo.emergency_contact_name">
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
    <input type="text" class="form-control form-control-sm" id="woreda" v-model="emergency_address.subcity">
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
  <div class="d-flex justify-content-start align-items-center">
  <div class="p-3 col-sm-4">
  <span>Department</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="degree_department_id">
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
</select>
  </div>
   <div class="p-3 col-sm-4">
 <span>Program</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="programId" @change="semesterByProgram($event)">
  <option disabled selected>Select program</option>
  <option v-for="Program in degreePrograms" :key="Program.id" :value="Program.id">{{Program.name}}</option>
</select>
</div>
  </div>
  </base-card>
  <div class="mt-3 ms-3 p-2">FINANCIAL SUPPORT</div>
  <base-card>
  <div><strong>State Your Finantial Source:-</strong></div>
   <div class="d-flex align-items-center mt-3">
<div class="form-check ms-5 me-3">
  <input class="form-check-input ms-2 p-2" type="radio" name="financee" id="selfsupport" value="selfsupport" checked v-model="studentInfo.financial_source">
  <label class="form-check-label ms-2" for="selfsupport">
    Self-Support
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="govt" value="govt" v-model="studentInfo.financial_source">
  <label class="form-check-label ms-2" for="govt">
    Geovernment
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="relative" value="relative" checked v-model="studentInfo.financial_source">
  <label class="form-check-label ms-2" for="relative">
    Relative
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="nongovt" value="nongovt" v-model="studentInfo.financial_source">
  <label class="form-check-label ms-2" for="nongovt">
    Non-Geovernment
  </label>
</div>
</div>
<div class="d-flex mb-4">
<div class="form-check ms-4 mt-4 me-1">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="other" value="other" v-model="studentInfo.financial_source">
  <label class="form-check-label ms-2" for="other">
    Other(specify)
  </label>
</div>
<span class="mt-4 col-sm-4">
<input class="form-control form-control-sm" type="tex" name="financee" id="othersource" v-model="studentInfo.finance_otherstated_support">
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
  <div class="mt-3 ms-3 p-2">REGISTER FOR</div>
  <base-card>
  <div class="d-flex justify-content-start align-items-center">
  <div class="p-3 col-sm-4">
  <span>Year</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="year_no">
 <option value="1" selected>first year</option>
 <option value="2">Second Year</option>
 <option value="3">Third Year</option>
 <option value="4">Fourth Year</option>
 <option value="5">Fifth Year</option>
</select>
  </div>
   <div class="p-3 col-sm-4">
 <span>Semester</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="semester_no">
  <option v-for="semister in activeSemesters" :key="semister.id" :value="semister.number">{{semister.number}}</option>
</select>
</div>
  </div>
  </base-card>
  <div v-if="scholar_type === 'noScholar'">
   <div class="mt-3 ms-3 p-2">TUITION FEE PAYMENT</div>
  <base-card>
 <div class="d-flex">
<div><span class="me-2"><strong>Select payment methods:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="paymentmethods" id="month" value="monthly" checked v-model="tuition_type">
  <label class="form-check-label ms-2" for="month">
    Monthly
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="paymentmethods" id="cp" value="cp" v-model="tuition_type">
  <label class="form-check-label ms-2" for="cp">
    Per CP
  </label>
</div>
 </div>
 <div v-if="tuition_type === 'cp'"  class="percp">
 <div class="d-flex mt-3">
 <span class="me-2"><strong>Date</strong></span> 
<div class="ms-5 me-3 col-4">
  <input class="form-control form-control-sm ms-4" type="text" name="date" id="date" v-model="paymentType">
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
</div>
<!--payment form per mounth -->
<div v-else class="monthly">
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
</div>

  </base-card>
  <div>
  </div>
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
import {mapGetters} from 'vuex'
// import useValidate from '@vuelidate/core'
// import { required,numeric,helpers} from '@vuelidate/validators'
import apiClient from '../../../store/baseUrl'
export default {
  data() {
    return {
      // v$:useValidate(),
       studentInfo:{},
       birth_address:{},
       emergency_address:{},
       residential_address:{},
       activeSemesters:[],
       paymentType:'cp',
       tuition_months:[],
       fully_scholarship:0,
       partial_scholarship:0,
       tuition_type:'',
       maritial_status:'',
       scholar_type:'noScholar',
       noScholar:'',
       resultNotifier:'',
       isSuccessed:false,
       isFaild:true,
      isLoading:false
      }
    },
  // validations(){
  //   return{
  //      studentInfo:{
  //        first_name:{required:helpers.withMessage('first name is required',required)},
  //       middle_name:{required:helpers.withMessage('middle name is required',required)},
  //       last_name:{required:helpers.withMessage('last name is required',required)},
  //       sex:{required},
  //        birth_country:{required},
  //        birth_region:{required},
  //        birth_zone:{required},
  //        birth_subcity:{required},
  //        birth_kebele:{required},
  //        date_of_birth:{required},
  //        current_district:{required},
  //        current_kebele:{required},
  //        current_house_no:{required},
  //        current_phone_no:{required,numeric},
  //        contacte_person_name:{required},
  //        contacte_person_relation:{required},
  //        contacte_person_region:{required},
  //        contacte_person_town:{required},
  //        contacte_person_woreda:{required},
  //        contacte_person_kebele:{required},
  //        contacte_person_phone_no:{required,numeric},
  //        egsse_result:{required},
  //        eheee_result:{required},
  //        department:{required},
  //        program_type:{required},
  //        finance_support:{required}

  //      }
  //   }
  // },
  created() {
    this.$store.dispatch('registrar/fetchAcadamicMounths')
  // this.semesterAtZero(this.semesters[0])
  },
   computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    semesters(){
      return this.$store.getters['registrar/activeYearSemesters']
    },
    months(){
      return this.$store.getters['registrar/acadamicYearMounths']
    },

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
    }
  },
    methods: {
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
      async addNewStudent(){
        this.isLoading = true
        this.studentInfo.degree_department_id = this.$refs.degree_department_id.value
        this.studentInfo.program_id = this.$refs.programId.value
        this.studentInfo.year_no = this.$refs.year_no.value
        this.studentInfo.tuition_months = this.tuition_months
        this.studentInfo.semester_no = this.$refs.semester_no.value
        this.studentInfo.fully_scholarship = this.fully_scholarship
        this.studentInfo.partial_scholarship = this.partial_scholarship
        this.studentInfo.tuition_type = this.tuition_type
        this.studentInfo.maritial_status = this.maritial_status

        this.studentInfo.birth_address = this.birth_address
        this.studentInfo.residential_address = this.residential_address
        this.studentInfo.emergency_address = this.emergency_address
console.log('properties of new student')
console.log(this.studentInfo)
try{
  var response = await apiClient.post('api/degree_students',this.studentInfo)
  console.log('status code '+response.status)
  if(response.status === 201){
    console.log('response from adding degree student')
    console.log(response.data)
   var previousDegreeStudent = this.$store.getters['registrar/degreeStudents']
    previousDegreeStudent.push(response.data)
    this.$store.commit('setDegreeStudent',previousDegreeStudent)
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

       }
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
    width: 10em;

} 
.btn:hover{
    background-color:#eca643 ;
}
input select{
  border: 1px solid rgb(150, 147, 147);
}
  .warning input{
    border: 1px red solid;
  }
  .warning span{
    display: inline;
    color: red;

  
}
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
.success{
    color: green;
  }
  .faild{
    color: red;
  }
  .notifiers{
    margin-left: 50%;
  }
</style>