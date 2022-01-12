<template>
<div class="content border rounded shadow-sm mt-2 w-75 ms-auto me-auto mb-5">
    <div class="ms-5 pt-3">
  <span @click="back()" class="backarrow me-5"><i class="fas fa-arrow-left"></i></span>
    <span class="p-3 ms-5">COMPETENCE ASSESSEMENT APPLICATION FORM</span>
    </div>
    <hr class="mt-3">
    <div class="feetype row ms-5 mt-3">
    <button @click="internalStudent()" class="btn optionbtn col-sm-6 me-0 p-2 fs-4" :class="{internal:isInternal}">Internal Students </button>
    <button @click="externalStudent()" class="btn optionbtn col-sm-5 ms-0 p-2 fs-4" :class="{external:isExternal}">External Students</button>
    </div>
    <div v-if="isInternal" class="mt-5">
        <span class="ms-5 p-3 fs-5">Student ID</span>
<div class="input-group mb-3 mt-2 ms-5 me-5 w-75">
  <input type="text" class="form-control p-2" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="searchValue">
  <span @click="checkStudent()" class="input-group-text checkbtn" id="basic-addon2">
      <span v-if="isChecking" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Checking</span>      
  <span v-else>Check</span>
  </span>
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
<select class="form-select" aria-label=".form-select-sm example" v-model="cocStudent.level_no">
  <option value="1">Level 1</option>
  <option value="2">Level 2</option>
   <option value="3">Level 3</option>
  <option value="4">Level 4</option>
   <option value="5">Level 5</option>
</select>
</div>
    <div class="mb-3 mt-3 px-5" :class="{warining:!cocStudent.occupation_name.trim().length}">
  <label for="Ocupation" class="form-label"><strong>Ocupation</strong></label>
  <input type="text" class="form-control" id="Ocupation" v-model="cocStudent.occupation_name">
  <span v-if="!cocStudent.occupation_name.trim().length && occupationError" class="error-msg mt-1">Occupation field can not be empty</span>
</div>
  <div class="mb-3 px-5" :class="{warining:!cocStudent.registration_no.trim().length}">
  <label for="Registration" class="form-label"><strong>Registration Number</strong></label>
  <input type="text" class="form-control" id="Registration" v-model="cocStudent.registration_no" @blur="reg">
  <span v-if="!cocStudent.registration_no.trim().length && registrationNoError" class="error-msg mt-1">Registration number is required field</span>
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
        <button @click="cancelInternalDialog()" class="btn cancel me-5 p-1">CANCEL</button>
        <button @click="submitData('internal')" class="btn submitbtn p-1">
       <span v-if="isLoading" class="btn  py-1">
          <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>SUBMITING</span>      
         <span v-else>SUBMIT</span>
        </button>
    </div>
    </div>
 </div>
   
    <div v-if="isExternal">
    <div class="mb-3 mt-5 px-5"  :class="{warining:!cocStudent.first_name.length}">
      <label for="fname" class="form-label"><strong>First Name</strong></label>
      <input type="text" class="form-control" id="fname" v-model="cocStudent.first_name">
     <span v-if="!cocStudent.first_name.trim().length && fnameError" class="error-msg mt-1">First Name is required</span>
   </div>
  <div class="mb-3 px-5"  :class="{warining:!cocStudent.last_name.length}">
  <label for="lname" class="form-label"><strong>Last Name</strong></label>
  <input type="text" class="form-control" id="lname" v-model="cocStudent.last_name">
  <span v-if="!cocStudent.last_name.trim().length && lnameError" class="error-msg mt-1">Last Name is required</span>
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
       <div class="mb-3 mt-3 px-5"  :class="{warining:!cocStudent.dob.length}">
      <label for="dob" class="form-label"><strong>Date of Birth</strong></label>
      <input type="date" class="form-control" id="dob" v-model="cocStudent.dob">
     <span v-if="!cocStudent.dob.trim().length && dobError" class="error-msg mt-1">Birth Date is required</span>
   </div>
  <div class="mb-3 mt-3 px-5"  :class="{warining:!cocStudent.phone_no.length}">
  <label for="phone" class="form-label"><strong>Phone Number</strong></label>
  <input type="tel" class="form-control" id="phone" v-model="cocStudent.phone_no">
   <span v-if="!cocStudent.phone_no.trim().length && phonenoError" class="error-msg mt-1">Phone number is required</span>
   </div>
       <div class="ms-auto me-auto mt-3 px-5">
    <div class="mb-3 mt-3"  :class="{warining:cocStudent.occupation_name.length}">
  <label for="Ocupation" class="form-label"><strong>Ocupation</strong></label>
  <input type="text" class="form-control" id="Ocupation" v-model="cocStudent.occupation_name">
   <span v-if="!cocStudent.occupation_name.trim().length && occupationError" class="error-msg mt-1">Ocupation Name is required</span>
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
  <div class="mb-3 mt-3"  :class="{warining:!cocStudent.registration_no.length}">
  <label for="Registration" class="form-label"><strong>Registration Number</strong></label>
  <input type="text" class="form-control" id="Registration" v-model="cocStudent.registration_no">
 <span v-if="!cocStudent.registration_no.trim().length && registrationError" class="error-msg mt-1">Registration Number is required</span>
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
        <button @click="cancelInternalDialog()" class="btn cancel me-5 p-1">CANCEL</button>
        <button @click="submitData('external')" class="btn submitbtn p-1">
         <span v-if="isLoading" class="btn  py-1">
         <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>SUBMITING</span>      
         <span v-else>SUBMIT</span>
  </button>
    </div>
    </div>
     </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
    props:['cocId'],
    data() {
        return {
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
             isLoading:false,
             isSuccessed:false,
              isFaild:false,
               resultNotifier:'',
               isChecking:false,
               registrationNoError:false,
               occupationError:false,
        }
    },
    methods: {
        back(){
            this.$router.back()
        },
       async checkStudent(){
          this.isLoading=true
          try{
            console.log('student type = '+this.student_type)
            var response = await apiClient.post('api/check_student_for_coc/'+this.searchValue,{type:this.student_type})
            if(response.status === 200){
              this.student_id = response.data.id
              console.log('the searched student is internal')
              console.log('id = '+this.student_id)
            }
            else{
              console.log('the searched student is external')
            }
          }
          catch(e){
            console.log(e)
          }
          finally{
             this.isLoading=false
          }
        },
            internalStudent(){
            this.isInternal = true
            this.isExternal = false
        },
         externalStudent(){
            this.isInternal = false
            this.isExternal = true
        },
        cancelInternalDialog(){},
        // validateError(formData){
        //   var errorFields = 
        // },
        async submitData(studentType){
          this.resultNotifier = ''
          this.isLoading = true
          if(studentType === 'internal'){
         try{
         this.cocStudent.coc_id = this.cocId
          this.cocStudent.id = this.searchValue
          this.cocStudent.type = this.student_type
          this.cocStudent .nature_of_assesment = this.nature_of_assesment
         var response = await apiClient.post('api/register_internal_student/' +this.cocStudent.id,this.cocStudent)
                if (response.status === 201) {
                    console.log(response.data)
                       this.isFaild = false
                  this.isSuccessed = true
                  this.resultNotifier = 'You have Registered a student to COC succesfully'
                    var previousCocs = this.$store.getters['registrar/cocTakerStudents']
                    previousCocs.push(response.data)
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
          this.resultNotifier = 'Internal Server error';
         }
         finally{
          this.isLoading = false
       }
       
          }
          else if(studentType === 'external'){
            try{
            this.isLoading = true
          this.cocStudent.coc_id = this.cocId
          this.cocStudent.type = this.student_type
          this.cocStudent .nature_of_assesment = this.nature_of_assesment
          var response2 = await apiClient.post('api/register_external_student', this.cocStudent)
                if (response2.status === 201) {
                    console.log('respose from adding external coc taker ')
                    console.log(response2.data)
                   this.isFaild = false
                  this.isSuccessed = true
                  this.resultNotifier = 'You have Registered a student to COC succesfully'
                    var previousCocStudents = this.$store.getters['registrar/cocTakerStudents']
                    previousCocStudents.push(response2.data)
                    this.$store.commit('registrar/setCocTakerStudents', previousCocStudents)
                } else if(response2.status === 200) {
                 this.isFaild = true
                 this.isSuccessed = false
                this.resultNotifier = response2.data.error;
                }
            } catch (e) {
          this.isFaild = true
           this.isSuccessed = false
          this.resultNotifier = 'Internal Server error';
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
.cancel{
  border: 1px solid gray;
  width: 7em;
  background-color: #fff;
}
.cancel:hover{
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
    width: 7em;
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
   .warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;

  }
</style>