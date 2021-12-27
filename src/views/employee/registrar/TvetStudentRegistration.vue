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
<div class="d-flex border rounded bg-white mt-3 p-2 me-3">
<div><span class="me-2 mt-2">RECIEPT NO</span></div>
<div><input class="form-control form-control-sm w-100" type="text" aria-label=".form-control-sm example" v-model="studentInfo.recieptNo"></div>
</div>
</div>
<form @submit.prevent = "addNewStudent">
<base-card>
<div class="row">
<div class="mb-3 col-sm-4 me-5">
    <label for="fullname" class="form-label"><strong>Full Name</strong></label>
    <input type="text" class="form-control form-control-sm" id="fullname" v-model="studentInfo.full_name">
  </div>
  <div class="d-flex col-5">
<div class="sex mt-4"><span class="me-2"><strong>Sex:-</strong></span></div>
   <div class="form-check ms-5 mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="gender" value="male" id="male" checked v-model="studentInfo.sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
    <div class="form-check mt-4 me-3">
  <input class="form-check-input p-2" type="radio" name="gender" value="female" id="female" v-model="studentInfo.sex">
  <label class="form-check-label" for="female">
    Fmale
  </label>
</div>
    </div>
</div>
<div class="mt-3"><strong>Place of Birth:-</strong></div>
<div class="row mt-3">
<div class="mb-3 col-sm-3">
    <label for="country" class="form-label">Country</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="studentInfo.birth_place_country">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="region" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="studentInfo.birth_place_region">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="zone" class="form-label">Zone</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="studentInfo.birth_place_zone">
  </div>
</div>
<div class="row mt-3">
   <div class="mb-3 col-sm-4">
    <label for="subcity" class="form-label">District/Sub city</label>
    <input type="text" class="form-control form-control-sm" id="subcity" v-model="studentInfo.birth_place_district">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="kebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="kebele" v-model="studentInfo.birth_place_kebele">
  </div>
</div>
<div class="mb-3 col-sm-4">
    <label for="birthdate" class="form-label"><strong>Date of Birth:-</strong></label>
    <input type="text" class="form-control form-control-sm" id="birthdate" v-model="studentInfo.birth_date">
  </div>
  <div class="mt-3"><strong>Current residential address:-</strong></div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="country" class="form-label">District</label>
    <input type="text" class="form-control form-control-sm" id="country" v-model="studentInfo.current_residence_district">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="region" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="region" v-model="studentInfo.current_residence_kebele">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="zone" class="form-label">House No</label>
    <input type="text" class="form-control form-control-sm" id="zone" v-model="studentInfo.current_residence_house_no">
  </div>
  </div>
  <div class="mb-4 col-sm-4">
    <label for="phoneNo" class="form-label"><strong>Phone Number</strong></label>
    <input type="tel" class="form-control form-control-sm" id="phoneNo" v-model="studentInfo.current_residence_phone_no">
  </div>
  <div class="d-flex">
<div><span class="me-2"><strong>Marital Status:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="exampleRadios" id="married" value="married" checked v-model="studentInfo.marrital_status">
  <label class="form-check-label ms-2" for="married">
    Married
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="exampleRadios" id="single" value="single" v-model="studentInfo.marrital_status">
  <label class="form-check-label ms-2" for="single">
    Single
  </label>
</div>
</div>
<div class="mt-3"><strong>Person to Contacted incase of Emergency:-</strong></div>
<div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="name" class="form-label">name</label>
    <input type="text" class="form-control form-control-sm" id="name"  v-model="studentInfo.contacte_person_name">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relation" class="form-label">Relationship</label>
    <input type="text" class="form-control form-control-sm" id="relation" v-model="studentInfo.contacte_person_relationship">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relativesregion" class="form-label">Region</label>
    <input type="text" class="form-control form-control-sm" id="relativesregion" v-model="studentInfo.contacte_person_region">
  </div>
  </div>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="town" class="form-label">Town</label>
    <input type="text" class="form-control form-control-sm" id="town" v-model="studentInfo.contacte_person_town">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="woreda" class="form-label">Woreda/Subcity</label>
    <input type="text" class="form-control form-control-sm" id="woreda" v-model="studentInfo.contacte_person_worda">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="relativesckebele" class="form-label">Kebele</label>
    <input type="text" class="form-control form-control-sm" id="relativesckebele" v-model="studentInfo.contacte_person_kebele">
  </div>
  </div>
   <div class="mb-4 col-sm-4">
    <label for="relativesphoneNo" class="form-label">Phone Number</label>
    <input type="tel" class="form-control form-control-sm" id="relativesphoneNo" v-model="studentInfo.contacte_person_phone_no">
  </div>
</base-card>
 <div class="mt-3 ms-3 p-2">EDUCATION BACKGROUN</div>
<base-card>
  <div class="row mt-3">
  <div class="mb-3 col-sm-4">
    <label for="egsseresult" class="form-label">EGSSE Result</label>
    <input type="text" class="form-control form-control-sm" id="egsseresult" v-model="studentInfo.egsse_result">
  </div>
  <div class="mb-3 col-sm-4">
    <label for="eheeeresult" class="form-label">EHEEE Result</label>
    <input type="text" class="form-control form-control-sm" id="eheeeresult" v-model="studentInfo.eheee_result">
  </div>
  </div>
  </base-card>
  <div class="mt-3 ms-3 p-2">CLASIFFICATION OF ADMISSION</div>
  <base-card>
  <div class="d-flex">
  <div class="mb-4 col-sm-4 mt-3">
    <label for="departmenttype" class="form-label">Department</label>
    <input type="tel" class="form-control form-control-sm" id="departmenttype" v-model="studentInfo.department">
  </div>
   <div class="d-flex align-items-center">
<div><span class="me-2 ms-5"><strong>Program:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="programtype" id="regular" value="regular" checked v-model="studentInfo.program_type">
  <label class="form-check-label ms-2" for="regular">
    Regular
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="programtype" id="extension" value="extension" v-model="studentInfo.program_type">
  <label class="form-check-label ms-2" for="extension">
    Extension
  </label>
</div>
</div>
  </div>
  <div class="d-flex align-items-center justify-content-end me-4">
<div><span class="me-2 ms-5"><strong>Level:-</strong></span></div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" id="levelone" value="levelone" checked v-model="studentInfo.level_no">
  <label class="form-check-label ms-2" for="levelone">
    Level I
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" id="leveltwo" value="leveltwo" v-model="studentInfo.level_no">
  <label class="form-check-label ms-2" for="leveltwo">
   Level II
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" id="levelthree" value="levelthree" checked v-model="studentInfo.level_no">
  <label class="form-check-label ms-2" for="levelthree">
    Level III
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="levelno" id="levelfour" value="levelfour" v-model="studentInfo.level_no">
  <label class="form-check-label ms-2" for="levelfour">
   Level IV
  </label>
</div>
</div>
  </base-card>
  <div class="mt-3 ms-3 p-2">FINANCIAL SUPPORT</div>
  <base-card>
  <div><strong>State Your Finantial Source:-</strong></div>
   <div class="d-flex align-items-center mt-3">
<div class="form-check ms-5 me-3">
  <input class="form-check-input ms-2 p-2" type="radio" name="financee" id="selfsupport" value="selfsupport" checked v-model="studentInfo.finance_suppot">
  <label class="form-check-label ms-2" for="selfsupport">
    Self-Support
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="govt" value="govt" v-model="studentInfo.finance_suppot">
  <label class="form-check-label ms-2" for="govt">
    Geovernment
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="relative" value="relative" checked v-model="studentInfo.finance_suppot">
  <label class="form-check-label ms-2" for="relative">
    Relative
  </label>
</div>
<div class="form-check me-3">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="nongovt" value="nongovt" v-model="studentInfo.finance_suppot">
  <label class="form-check-label ms-2" for="nongovt">
    Non-Geovernment
  </label>
</div>
</div>
<div class="d-flex mb-4">
<div class="form-check ms-4 mt-4 me-1">
  <input class="form-check-input ms-4 p-2" type="radio" name="financee" id="other" value="other" v-model="studentInfo.finance_suppot">
  <label class="form-check-label ms-2" for="other">
    Other(specify)
  </label>
</div>
<span class="mt-4 col-sm-4">
<input class="form-control form-control-sm" type="tex" name="financee" id="othersource" v-model="studentInfo.finance_other_suppot">
</span>
</div>
  </base-card>
  <div class="d-flex justify-content-end p-4">
  <button class="btn ms-auto">REGISTER</button>
  </div>
  </form>
    </div>
    </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
    data() {
        return {
            studentInfo:{},
            resultNotifier:'',
            isLoading:null,
        }
    },
    methods: {
       async addNewStudent(){
            console.log('new tvet student come')
            console.log(this.studentInfo)
            try{
  var response = await apiClient.post('api/students',this.studentInfo)
  if(response.status === 200){
    console.log('response from adding tvet student')
    console.log(response.data)
   var previousTvetStudent = this.$store.getters['student/tvetStudents']
    previousTvetStudent.push(response.data)
    this.$store.commit('setTvetStudent',previousTvetStudent)
  }
  else{
    throw 'error'
  }
}
catch(e){
  console.log('error')
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
    width: 9em;

} 
.btn:hover{
    background-color:#eca643 ;
}

</style>