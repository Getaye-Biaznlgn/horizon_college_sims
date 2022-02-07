<template>
<div class="border rounded shadow-sm m-3 bg-white">
<div class="mt-3 d-flex justify-content-between align-items-center">
    <div class="d-flex">
<div class="form-check ms-3 me-4">
  <input class="form-check-input p-2" type="radio" name="coc" id="registerd" value="registered" v-model="result">
  <label class="form-check-label ms-2" for="registerd">
    Registered
  </label>
</div>
<div class="form-check me-4">
  <input class="form-check-input p-2" type="radio" name="coc" id="assessed" value="assessed" v-model="result">
  <label class="form-check-label ms-2" for="assessed">
    Assessed
  </label>
</div>
<div class="form-check">
  <input class="form-check-input p-2" type="radio" name="coc" id="competent" value="competent" v-model="result">
  <label class="form-check-label ms-2" for="competent">
    Competent
  </label>
</div>
    </div>
      <div class="d-flex justify-content-end mt-3">
           <div class="limit me-3">
       <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="studType">
         <option value="all">All</option>
      <option value="internal">From Horizon College</option> 
      <option value="external">From Other College</option> 
</select>
</div>
    <button @click="addStudentToCoc()" class="btn me-1 addbtn me-3 p-1">Add Student</button>
    <button @click="printCocTakerList()" class="btn me-1 addbtn me-3 p-1">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
      </div>
     </div>
     <div id="coctakers">
      <table class="viewcourse courseview mt-2">
  <thead>
      <tr class="table-header">
      <th class="text-white ms-3 py-2">NO</th>
      <th class="text-white py-2">Registration NO</th>
      <th class="text-white py-2">Full Name</th>
      <th class="text-white py-2">Sex</th>
      <th class="text-white py-2">Ocupaton</th>
      <th class="text-white py-2">Leve</th>
       <th class="py-2">Result</th>
      <th class="py-2">Certeficate NO</th>
      <th class="py-2">Type</th>
      <th></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(student, index) in filteredStudnt" :key="student.id">
  <td class="px-3">{{queryObject.per_page*cocTakerStudents.current_page +index+1 - queryObject.per_page}}</td>
  <td class="py-2">{{student.registration_no}}</td>
  <td class="py-2">{{student.full_name}}</td>
  <td class="py-2">{{student.sex}}</td>
  <td class="py-2">{{student.occupation_name}}</td>
  <td class="py-2">{{student.level_no}}</td>
  <td class="py-2">{{student.result}}</td>
  <td class="py-2">{{student.certificate_no}}</td>
  <td class="py-2">{{student.type}}</td>
  <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <!-- <li><span @click="edit(student)" class="dropdown-item">Edit Student Info</span></li>
             <hr class="my-0 py-0"> -->             
             <li><span @click="enterResult(student.student_id,student.type)"  class="dropdown-item">Enter Result </span></li>
                     <hr class="my-0 py-0">
             <li><span @click="enterCerteficateNo(student.student_id,student.type)"  class="dropdown-item">Enter Certeficat Number </span></li>
             <hr class="my-0 py-0">
             <li><span @click="deleteStudentFromCoc(student.student_id,student.type,student.full_name)"  class="dropdown-item">Delete Student </span></li>
                    
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
     </div>
    <div class="d-flex justify-content-end mt-3 mb-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
  
</select>
</div>
<div class="pageno me-3">
{{cocTakerStudents.from+'-'+cocTakerStudents.to+' of '+cocTakerStudents.total+' pages'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:cocTakerStudents.from !== 1}" :disabled="cocTakerStudents.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:cocTakerStudents.to !==cocTakerStudents.total}" :disabled="cocTakerStudents.to ===cocTakerStudents.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
   </div>
     <div v-if="isEnterResult" class="editwraper border shadow-sm">
      <div class="w-50 ms-auto content me-auto mt-5 p-5 bg-white">
          <div class="form-group mt-3" :class="{warning:v$.inputValue.$error || Number(inputValue) > 100}">
            <label for="enddate" class="form-label">COC Result</label>
            <input class="form-control" type="number" id="enddate" v-model="inputValue" aria-label=".form-control-sm example">
             <span class="error-msg mt-1">{{v$.inputValue.$errors[0]?.$message}}</span>
              <span v-if="Number(inputValue) > 100" class="error-msg mt-1">value must be lessthan or equal to 100</span>
        </div>   
         <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelDialog()" class="btn cancel me-4">CANCEL</button>
  <button @click="saveResult()" class="btn addbtn px-1">
    <span v-if="isUploading">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Saving</span>      
  <span v-else>Save</span>
    </button>
</div>  
</div>
    </div>
       <div v-if="isEnterCerteficateNo" class="editwraper border shadow-sm">
      <div class="w-50 h-50 ms-auto content me-auto mt-5 p-5 bg-white">
   <div class="form-group" :class="{warning:v$.inputValue.$error || (inputValue.length> 15)}">
            <label for="startdate" class="form-label">Certeficate Number</label>
            <input class="form-control" type="text" id="startdate" v-model="inputValue" aria-label=".form-control-sm example">
            <span class="error-msg mt-1">{{v$.inputValue.$errors[0]?.$message}}</span>
               <span v-if="(inputValue?.length > 15)" class="error-msg mt-1">value must be lessthan or equal to 15 digits</span>
        </div>    
         <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelDialog()" class="btn cancel me-4">CANCEL</button>
  <button @click="saveCerteficateNo()" class="btn addbtn px-1">
    <span v-if="isUploading">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>Saving</span>      
  <span v-else>Save</span>
    </button>
</div>  
</div>
    </div>
      <div v-if="isDelete" class="editwraper d-flex">
     <div class="editDialogContent ms-auto me-auto border rounded shadow-sm p-5">
      <div>Do you want to delete {{deletedStudentName}} from COC ?</div>
      <div class="d-flex justify-content-end mt-5">
         <button @click="yesDelete()" class="btn me-5 confirm">Yes</button>
        <button @click="cancelDeletion()" class="btn confirm">NO</button>
       
      </div>
     </div>
   </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
  props:['cocId'],
    data() {
        return {
          v$:useVuelidate(),
        result:'registered',
        cocData:{},
        isEnterResult:false,
        isEnterCerteficateNo:false,
         isUploading:false,
         isSuccessed:false,
         isFaild:false,
         resultNotifier:'',
         certificate_no:'',
         inputValue:'',
         coc_result:'',
        studType:'all',
        studentType:'',
         rowNumber:'10',
          queryObject:{
          page:1,
          per_page:'',
          path:'api/coc_students',

        },
        isDelete:false,
        deletedStudent:{},
        deletedStudentName:''
        }
    },
    validations(){
      return{
inputValue:{required:helpers.withMessage('Please Enter value',required)}
      }
    },
    computed:{
        cocs(){
            return this.$store.getters['registrar/cocs']
        },
      cocTakerStudents(){
        return this.$store.getters['registrar/cocTakerStudents']
      },
      filteredStudnt(){
        var studentByType 
        var tempStudent = this.cocTakerStudents.data
        if(this.result === 'registered'){
          tempStudent = this.cocTakerStudents.data
          studentByType = tempStudent
        }
        if(this.result === 'assessed'){
          tempStudent = tempStudent.filter(student=>{
            return Number(student.result) > 0
          })
           studentByType = tempStudent
        }
          if(this.result === 'competent'){
          tempStudent = tempStudent.filter(student=>{
            return Number(student.result) > 50
          })
           studentByType = tempStudent
        }
          if(this.studType === 'all'){

          tempStudent = studentByType
        }
        if(this.studType === 'internal'){
          tempStudent = tempStudent.filter(student=>{
            return student.type !== 'external'
          })
        }
        if(this.studType === 'external'){
           tempStudent = tempStudent.filter(student=>{
            return student.type === 'external'
          })
        }
        return tempStudent
      },
      filterByType(){
        var tempStudent = this.cocTakerStudents.data
          if(this.studType === 'all'){
          tempStudent = this.cocTakerStudents.data
        }
        else if(this.studType === 'internal'){
          tempStudent = tempStudent.filter(student=>{
            return student.type === 'internal'
          })
        }
        else if(this.studType === 'external'){
           tempStudent = tempStudent.filter(student=>{
            return student.type === 'external'
          })
        }
          return tempStudent
      }
    },
    created() {
      this.queryObject.per_page = this.rowNumber
      this.queryObject.cocId = this.cocId
      console.log('COC id inside created = ',this.cocId)
      this.fechCocTakers(this.queryObject)
    },
    watch:{
      rowNumber(newValue){
  this.queryObject.per_page = newValue
  this.queryObject.page = 1
  this.fechCocTakers(this.queryObject)
},
cocId(newValue){
   this.queryObject.cocId = newValue
      this.fechCocTakers(this.queryObject)
}
    },
    methods: {
      fechCocTakers(){
 this.$store.dispatch('registrar/fetchCocStudents',this.queryObject)
      },
        addStudentToCoc(){
            this.$router.push({name:'AddStudentTococ'})
        },
        async printCocTakerList(){
          await this.$htmlToPaper('coctakers')
        },
        cancelDialog(){
          this.isEnterResult = false
          this.isEnterCerteficateNo = false
          this.v$.$reset()
          this.inputValue = ''
          this.resultNotifier = ''
        },
        saveCoc(){
            this.$store.dispatch('registrar/addCoc',this.cocData)
        },
         yesDelete(){
          console.log('deleted student',this.deletedStudent)
          this.$store.dispatch('registrar/deleteStudentFromCoc',this.deletedStudent)
          this.isDelete = false
         
       },
       cancelDeletion(){
          this.isDelete = false
       },
        deleteStudentFromCoc(id,type,name){
          this.deletedStudent.id = id
          this.deletedStudent.type = type
          this.deletedStudent.coc_id = this.cocId
          this.deletedStudentName = name
          this.isDelete = true
        },
        editCoc(){},
              forWardChivron(){
        this.queryObject.page = this.queryObject.page + 1
       this.fechCocTakers(this.queryObject)
      },
      backChivron(){
        this.queryObject.page = this.queryObject.page - 1
       this.fechCocTakers(this.queryObject)
      },
      enterCerteficateNo(id,type){
        this.isEnterCerteficateNo = true
        this.studentId = id
        this.studentType = type
        this.resultNotifier = ''
      },
      async saveCerteficateNo(){
        this.v$.$validate()
        if(!this.v$.$error && Number(this.inputValue) <= 100){
        this.isUploading = true
        var data={}
        data.certificate_no = this.inputValue
        data.coc_id = this.cocId
        data.id = this.studentId
        data.type = this.studentType
      
              try{
var response = await apiClient.post('api/give_certeficate_no/'+data.id,data)
if(response.status === 200){
                this.isFaild = false
                this.isSuccessed = true
                this.resultNotifier = 'Succesfully done'
         var previousStudents= this.$store.getters['registrar/cocTakerStudents']
      var index = previousStudents.data.findIndex(student=>{
        return student.student_id === data.id
      })
      var uncertifiedStudent = previousStudents.data[index]
      uncertifiedStudent.certificate_no = data.certificate_no
      previousStudents.data[index] = uncertifiedStudent
      this.$store.commit('registrar/setCocTakerStudents',previousStudents)
        }
         else{
               this.isFaild = true
                this.isSuccessed = false
                this.resultNotifier = 'Failed'
}
        }
            catch(e){
                this.isFaild = true
                this.isSuccessed = false
                this.resultNotifier = 'Failed'
         }
         finally{
           this.isUploading =false
           this.v$.$reset()
          this.inputValue = ''
            
         }
        }
      },
      enterResult(id,type){
        this.isEnterResult = true
        this.studentId = id
        this.studentType = type
        this.resultNotifier = ''
      },
      async saveResult(){
          this.v$.$validate()
        if(!this.v$.$error && Number(this.inputValue) <= 100){
        this.isUploading = true
         var data={}
       data.type = this.studentType
        data.coc_id = this.cocId
        data.id = this.studentId
        data.result = this.inputValue
        try{
var response = await apiClient.post('api/give_coc_result/'+data.id,data)
if(response.status === 200){
                this.isFaild = false
                this.isSuccessed = true
                this.resultNotifier = 'Succesfully done'
                    var previousStudents= this.$store.getters['registrar/cocTakerStudents']
      var index = previousStudents.data.findIndex(student=>{
        return student.student_id === data.id
      })
      var uncertifiedStudent = previousStudents.data[index]
      uncertifiedStudent.result = data.result
      previousStudents.data[index] = uncertifiedStudent
      this.$store.commit('registrar/setCocTakerStudents',previousStudents)
        }
         else{
               this.isFaild = true
                this.isSuccessed = false
                this.resultNotifier = 'Failed'
}
        }
            catch(e){
                this.isFaild = true
                this.isSuccessed = false
                this.resultNotifier = 'Failed'
         }
         finally{
           this.isUploading = false
           this.v$.$reset()
          this.inputValue = ''
           
         }
        }
      },

    },
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
} 
.addbtn:hover{
    background-color:#366ad9 ;
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
td{
  border: 1px solid #dddddd;
  text-align: left;
  vertical-align: top;

}
.dropdown ul{
    background-color: #ecf1fe;
}
 li span:hover{
background-color: #366ad9;
color: #fff;
cursor: pointer;
}
.courseview{
  overflow-y: auto;
}
.viewcourse th{
  background-color: #fff;
  color: rgb(17, 17, 17)!important;
  font-size: 14px;
}
.viewcourse tr{
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}
.viewcourse td{ 
  border-left: none;
  border-right: none;
   border-top: 2px solid gray;
  border-bottom: 2px solid gray;
}

.editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(17, 17, 17, 0.5);
    z-index: 1000;
}
.dialogcontent{
   width: 90%;
   margin: auto;
   margin-top: 5%;
   margin-bottom: 5%;
   height: 80vh;
   overflow-y: auto;
}
.editDialogContent{
  width: 40%;
  margin: auto;
  margin-top: 10%;
  background-color: #fff;
}
.confirm{
  width: 5em;
  border: 1px solid gainsboro;
}
.confirm:hover{
  background-color: gainsboro;
}
.cancel{
  border: 1px solid gray;
  width: 7em;
}
.cancel:hover{
  background-color: rgb(192, 189, 189);
}
.content{
    border-radius: 3%;
    overflow-y: auto;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
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
</style>