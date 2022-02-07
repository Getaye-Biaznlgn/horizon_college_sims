<template>
<div class="content border rounded shadow-sm mt-2 w-75 ms-auto me-auto mb-5">
    <div class="ms-5 pt-3">
  <span @click="back()" class="backarrow me-5"><i class="fas fa-arrow-left"></i></span>
    <span class="p-3 ms-5">COMPETENCE ASSESSEMENT APPLICATION FORM</span>
    </div>
    <hr class="mt-3">
    <div class="feetype row ms-5 mt-3">
    <button @click="internalStudent()" class="btn optionbtn col-sm-6 me-0 p-2 fs-5" :class="{internal:isInternal}">Internal Students </button>
    <button @click="externalStudent()" class="btn optionbtn col-sm-5 ms-0 p-2 fs-5" :class="{external:isExternal}">External Students</button>
    </div>
    <div v-if="isInternal" class="mt-5">
        <div class="mb-3 mt-2 px-5">
<div class="input-group">
  <input type="text" class="form-control p-2" aria-label="Recipient's username" placeholder="Check Student if it is from Horizon by ID number" aria-describedby="basic-addon2" v-model="searchValue">
  <span @click="checkStudent()" class="input-group-text checkbtn" id="basic-addon2">
      <span v-if="isChecking" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Checking</span>      
  <span v-else>Check</span>
  </span>
</div>
</div>
    <div class="mb-3 mt-3 px-5"  :class="{warning:isIdEmpty || idError}">
      <label for="dob" class="form-label"><strong>Student ID</strong></label>
      <input type="text" class="form-control" id="id" v-model="studentId" @input="checkIdLength($event)">
    <span v-if="isIdEmpty" class="error-msg mt-1">Student ID number is required </span>
     <span v-if="idError" class="error-msg mt-1">Student ID number must be 12 digit long </span>
   </div>
<div class="px-5 mt-3">
  <span class="py-2">Select Student Type</span>
<select class="form-select" aria-label=".form-select-sm example" v-model="student_type">
  <option value="degree">Degree</option>
  <option value="tvet">TVET</option>
</select>
</div>
<div class="mt-3 mb-3 px-5">
  <span class="pt-3"><strong>Select Level</strong></span>
<select class="form-select" aria-label=".form-select-sm example" v-model="level_no">
  <option value="1">Level 1</option>
  <option value="2">Level 2</option>
   <option value="3">Level 3</option>
  <option value="4">Level 4</option>
   <option value="5">Level 5</option>
</select>
</div>
    <div class="mb-3 mt-3 px-5" :class="{warning:isOccupationEmpty || occupationError}">
  <label for="Ocupation" class="form-label"><strong>Ocupation</strong></label>
  <input type="text" class="form-control" id="Ocupation" v-model="occupation_name" @input="checkOccupationLength($event)">
  <span v-if="isOccupationEmpty" class="error-msg mt-1">Occupation field can not be empty</span>
  <span v-if="occupationError" class="error-msg mt-1">The maximum character length of Occupation Name is 25 characters long </span>
</div>
  <div class="mb-3 px-5" :class="{warning:isRegistrationEmpty || registrationNoError}">
  <label for="Registration" class="form-label"><strong>Registration Number</strong></label>
  <input type="text" class="form-control" id="Registration" v-model="registration_no" @input="checkRegistrationLength($event)">
  <span v-if="isRegistrationEmpty" class="error-msg mt-1">Registration number is required </span>
   <span v-if="registrationNoError" class="error-msg mt-1">The maximum length of Registration number is 15 digits long</span>
</div>
  <div class="ms-auto me-auto px-5">
        <div class="d-flex mt-4">
            <div class="me-4"><strong>Nature of Assessement Applied</strong></div>
        <div class="form-check me-4">
  <input class="form-check-input" type="radio" name="option" id="Qualification" value="qualification" v-model="nature_of_assesment">
  <label class="form-check-label" for="Qualification">
    Qualification Based
  </label>
</div>
<div class="form-check px-5">
  <input class="form-check-input" type="radio" name="option" id="Competence" value="competence" v-model="nature_of_assesment">
  <label class="form-check-label" for="Competence">
    Competence Based
  </label>
</div>
        </div>
         <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
    <div class="d-flex justify-content-end p-5">
        <!-- <button @click="cancelInternalDialog()" class="btn cancel me-5 p-1">CANCEL</button> -->
        <button @click="submitInternalData()" class="btn submitbtn px-1">
       <span v-if="isLoading">
          <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>SUBMITING</span>      
         <span v-else>SUBMIT</span>
        </button>
    </div>
    </div>
 </div>
   
    <div v-if="isExternal">
    <div class="mb-3 mt-5 px-5"  :class="{warning:v$.cocStudent.first_name.$error}">
      <label for="fname" class="form-label"><strong>First Name</strong></label>
      <input type="text" class="form-control" id="fname" v-model="cocStudent.first_name">
     <span class="error-msg mt-1">{{v$.cocStudent.first_name.$errors[0]?.$message}}</span>
   </div>
  <div class="mb-3 px-5"  :class="{warning:v$.cocStudent.last_name.$error}">
  <label for="lname" class="form-label"><strong>Last Name</strong></label>
  <input type="text" class="form-control" id="lname" v-model="cocStudent.last_name">
  <span class="error-msg mt-1">{{v$.cocStudent.last_name.$errors[0]?.$message}}</span>
   </div>
   <div class="d-flex px-5">
     <div class="me-4"><strong>Sex</strong></div>
    <div class="form-check me-4">
  <input class="form-check-input" type="radio" name="sex" id="male" value="male" v-model="cocStudent.sex">
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="sex" id="female" value="female" v-model="cocStudent.sex">
  <label class="form-check-label" for="female">
    Female
  </label>
</div>
   </div>
        <div class="d-flex mt-4 px-5">
     <div class="me-4"><strong>Marrital Status</strong></div>
    <div class="form-check me-4">
  <input class="form-check-input" type="radio" name="marritalstatus" id="Single" value="single" v-model="cocStudent.maritial_status">
  <label class="form-check-label" for="Single">
    Single
  </label>
</div>
<div class="form-check me-4">
  <input class="form-check-input" type="radio" name="marritalstatus" id="marry" value="marry" v-model="cocStudent.maritial_status">
  <label class="form-check-label" for="marry">
    Marry
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="marritalstatus" id="widow" value="widow" v-model="cocStudent.maritial_status">
  <label class="form-check-label" for="widow">
    Widowe
  </label>
</div>
   </div>
       <div class="mb-3 mt-3 px-5"  :class="{warning:v$.cocStudent.dob.$error}">
      <label for="dob" class="form-label"><strong>Date of Birth</strong></label>
      <input type="date" class="form-control" id="dob" v-model="cocStudent.dob">
   <span class="error-msg mt-1">{{v$.cocStudent.dob.$errors[0]?.$message}}</span>
   </div>
  <div class="mb-3 mt-3 px-5"  :class="{warning:v$.cocStudent.phone_no.$error}">
  <label for="phone" class="form-label"><strong>Phone Number</strong></label>
  <input type="tel" class="form-control" id="phone" v-model="cocStudent.phone_no">
  <span class="error-msg mt-1">{{v$.cocStudent.phone_no.$errors[0]?.$message}}</span>
   </div>
       <div class="ms-auto me-auto mt-3 px-5">
    <div class="mb-3 mt-3"   :class="{warning:v$.cocStudent.occupation_name.$error}">
  <label for="Ocupation" class="form-label"><strong>Ocupation</strong></label>
  <input type="text" class="form-control" id="Ocupation" v-model="cocStudent.occupation_name">
   <span class="error-msg mt-1">{{v$.cocStudent.occupation_name.$errors[0]?.$message}}</span>
</div>
 <div class="mt-3">
  <span class="py-2"><strong>Select Level</strong></span>
<select class="form-select" aria-label=".form-select-sm example" v-model="cocStudent.level_no">
  <option value="1">Level 1</option>
  <option value="2">Level 2</option>
   <option value="3">Level 3</option>
  <option value="4">Level 4</option>
   <option value="5">Level 5</option>
</select>
</div>
  <div class="mb-3 mt-3"  :class="{warning:v$.cocStudent.registration_no.$error}">
  <label for="Registration" class="form-label"><strong>Registration Number</strong></label>
  <input type="text" class="form-control" id="Registration" v-model="cocStudent.registration_no">
 <span class="error-msg mt-1">{{v$.cocStudent.registration_no.$errors[0]?.$message}}</span>
</div>
    <div class="d-flex mt-4">
      <div class="me-4"><strong>Nature of Assessement Applied</strong></div>
       <div class="form-check me-4">
  <input class="form-check-input" type="radio" name="option" id="Qualification" value="qualification" v-model="nature_of_assesment">
  <label class="form-check-label" for="Qualification">
    Qualification Based
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="option" id="Competence" value="competence" v-model="nature_of_assesment">
  <label class="form-check-label" for="Competence">
    Competence Based
  </label>
</div>
        </div>
 </div>
  <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
     <div class="d-flex justify-content-end px-5 py-3 my-2">
        <!-- <button @click="cancelInternalDialog()" class="btn cancel me-5 p-1">CANCEL</button> -->
        <button @click="submitExternalData()" class="btn submitbtn px-1">
         <span v-if="isLoading">
         <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>SUBMITING</span>      
         <span v-else>SUBMIT</span>
  </button>
    </div>
    </div>
     </div>
     <div v-if="isCheck" class="editwraper d-flex">
       <div class="alertBox border rounded shadow-sm p-3 bg-white ms-auto me-auto">
       <div class="mt-5 d-flex">
          <p class="text-center">{{isTheStudentFromHorizon}}</p>
          <button @click="closeDialog" class="btn closebtn ms-auto mt-5 me-5">Close</button>
       </div>
     </div>
     </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import useVuelidate from '@vuelidate/core'
import {required,helpers,maxLength, minLength} from '@vuelidate/validators'
export default {
    props:['cocId'],
    data() {
        return {
          v$:useVuelidate(),
             isInternal:true,
            isExternal:false,
            nature_of_assesment:'qualification',
            searchValue:'',
            student_type:'degree',
            cocStudent:{
              sex:'male',
              level_no:'1',
              maritial_status:'single',
              first_name:'',
              last_name:'',
              occupation_name:'',
              dob:'',
              phone_no:'',
              registration_no:'',
            },
            student_id:'',
            studentId:'',
            occupation_name:'',
            registration_no:'',
            level_no:'1',
            isOccupationEmpty:false,
            isIdEmpty:false,
            isRegistrationEmpty:false,
             isLoading:false,
             isSuccessed:false,
              isFaild:false,
               resultNotifier:'',
               isTheStudentFromHorizon:'',
               isChecking:false,
               registrationNoError:false,
               occupationError:false,
               idError:false,
               isCheck:false,
               isInvalid:false,
               isOccupation:true,
               isRegisrationNo:true,
               isIdNo:true
        }
    },
    validations(){
      return{
        cocStudent:{
        first_name:{required:helpers.withMessage('first name is required',required),max:maxLength(20)},
        last_name:{required:helpers.withMessage('last name is required',required),max:maxLength(20)},
        occupation_name:{required:helpers.withMessage('Occupation name is required',required),max:maxLength(30)},
              dob:{required:helpers.withMessage('Date of Birth is required',required)},
              phone_no:{required:helpers.withMessage('Phone number  is required',required),max:maxLength(10),min:minLength(10)},
              registration_no:{required:helpers.withMessage('Registration number is required',required),max:maxLength(20)},
        }
      }
    },
    methods: {
        back(){
            this.$router.back()
        },
       async checkStudent(){
         if(this.searchValue?.length){
          this.isChecking=true
          try{
            console.log('student type = '+this.student_type)
            var response = await apiClient.post('api/check_student_for_coc/'+this.searchValue,{type:this.student_type})
            if(response.status === 200){
              this.student_id = response.data.id
              this.isCheck = true
              this.isTheStudentFromHorizon='the searched student is from Horizon College'
            }
            else if(response.status === 201){
              this.isCheck = true
              this.isTheStudentFromHorizon='the searched student is out of Horizon College'
            }
          }
          catch(e){
            console.log('error occur')
          }
          finally{
             this.isChecking=false
          }
         }
        },
      closeDialog(){
        this.isCheck = false
       this.isTheStudentFromHorizon = ''
      },
            internalStudent(){
            this.isInternal = true
            this.isExternal = false
            this.resultNotifier = ''
            this.v$.$reset()
        },
         externalStudent(){
            this.isInternal = false
            this.isExternal = true
            this.resultNotifier = ''
        },
        // cancelInternalDialog(){},
        checkIdLength(event){
          if(event.target.value.length !== 12 && event.target.value !== ''){
            this.idError = true
            this.isIdNo = false
          }
          else if(event.target.value === ''){
            this.isIdEmpty = true
            this.idError = false
            this.isIdNo = false

          }
          else{
            this.idError = false
            this.isIdEmpty = false
            this.isIdNo = true
          }
        },
          checkOccupationLength(event){
          if(event.target.value.length >25){
            this.occupationError = true
            this.isOccupation = false
          }
          else if(event.target.value === ''){
            this.isOccupationEmpty = true
            this.isOccupation = false
          }
           else{
             this.occupationError = false
              this.isOccupationEmpty = false
              this.isOccupation = true
          }
        },
          checkRegistrationLength(event){
          if(event.target.value.length >15){
            this.registrationNoError = true
            this.isRegisrationNo = false
          }
          else if(event.target.value === ''){
             this.isRegistrationEmpty = true
             this.isRegisrationNo = false
          }
          else{
             this.registrationNoError = false
             this.isRegistrationEmpty = false
             this.isRegisrationNo = true
          }
        },
        checkValidity(){
          var isInvalid = false
if(this.studentId === ''){

  isInvalid = true
}
if(this.occupation_name === ''){
  isInvalid = true
}
if(this.registration_no === ''){
  isInvalid = true
  
}
return isInvalid
        },
        async submitInternalData(){
          if(this.isOccupation && this.isRegisrationNo && this.isIdNo && !this.checkValidity()){
          this.resultNotifier = ''
           this.isLoading = true
         try{
           var cocStudent={}
         cocStudent.coc_id = this.cocId
         cocStudent.id = this.studentId
         cocStudent.type = this.student_type
         cocStudent .nature_of_assesment = this.nature_of_assesment
         cocStudent.occupation_name = this.occupation_name
         cocStudent.registration_no = this.registration_no
         cocStudent.level_no = this.level_no
         var response = await apiClient.post('api/register_internal_student/' +cocStudent.id,cocStudent)
         console.log('response status code',response.status)
                if (response.status === 201) {
                  this.isFaild = false
                  this.isSuccessed = true
                  this.resultNotifier = 'You have Registered a student to COC succesfully'
                    var previousCocs = this.$store.getters['registrar/cocTakerStudents']
                    previousCocs.data.push(response.data)
                    this.$store.commit('registrar/setCocTakerStudents', previousCocs)
                } else if(response.status === 200) {
                 this.isFaild = true
                 this.isSuccessed = false
                this.resultNotifier = response.data.error
                }
         }
            catch (e) {
                this.isFaild = true
           this.isSuccessed = false
          this.resultNotifier = 'error! may be incorrect data';
           this.isLoading = false
         }
         finally{
          this.isLoading = false
       } 
          }
          else{
            if(this.studentId === ''){
              this.isIdEmpty = true
            }
             if(this.occupation_name === ''){
              this.isOccupationEmpty = true
            }
              if(this.registration_no === ''){
              this.isRegistrationEmpty = true
            }
          }
       },       
         async submitExternalData(){
            this.v$.$validate()
            if(!this.v$.$error){
               this.isLoading = true
            try{
          this.cocStudent.coc_id = this.cocId
          this.cocStudent .nature_of_assesment = this.nature_of_assesment
          var response = await apiClient.post('api/register_external_student', this.cocStudent)
                if (response.status === 201) {
                    console.log('response from adding external coc taker ')
                    console.log(response.data)
                   this.isFaild = false
                  this.isSuccessed = true
                  this.resultNotifier = 'You have Registered a student to COC succesfully'
                    var previousCocStudents = this.$store.getters['registrar/cocTakerStudents']
                    previousCocStudents.data.push(response.data)
                    this.$store.commit('registrar/setCocTakerStudents', previousCocStudents)
                    this.v$.$reset()
                } else if(response.status === 200) {
                 this.isFaild = true
                 this.isSuccessed = false
                this.resultNotifier = response.data.error;
                }
            } catch (e) {
          this.isFaild = true
           this.isSuccessed = false
          this.resultNotifier = 'error! may be incorrect data';
           this.isLoading = false
            }
                finally{
          this.isLoading = false
                }
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
.optionbtn{
    background-color: #ecf1fe;
    color: #000;
    box-shadow: none !important;
    vertical-align: middle;
} 
.internal{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.external{
     border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.internal{
background-color:#366ad9 ;
color: #fff;
}
.external{
  background-color:#366ad9 ; 
  color: #fff; 
}
.checkbtn{
    cursor: pointer;
    background-color: #2f4587;
    color: #fff;
}
input{
    box-shadow: none!important;
}
.cancel,.closebtn{
  border: 1px solid gray;
  width: 7em;
  background-color: #fff;
}
.cancel:hover,.closebtn:hover{
  background-color: rgb(192, 189, 189);
}
.closebtn{
  border: 1px solid gray;
  width: 5em;
  background-color: #fff;
}
.closebtn:hover{
  background-color: rgb(192, 189, 189);
}
.content{
    background-color: #fff!important;
    overflow-y: scroll;
    overflow-x: hidden;
}
.submitbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
} 
.submitbtn:hover{
    background-color:#366ad9 ;
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
  .editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.dialogcontent{
   width: 40%;
   margin: auto;
   margin-top: 10%;
   margin-bottom: 10%;
   height: 40vh;
   background-color: #fff;
}
.alertBox{
  width: 40%;
  height: 40%;
  margin-top: 10%;
}
</style>