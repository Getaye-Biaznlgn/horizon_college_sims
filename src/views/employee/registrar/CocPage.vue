<template>
<div class="border rounded shadow-sm m-3 bg-white">
      <div class="d-flex justify-content-end mt-3">
    <button @click="addCoc()" class="btn me-1 addbtn me-3 p-1">Add COC</button>
    <button @click="printCocList()" class="btn me-1 addbtn me-3 p-1">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
      </div>
      <div id="coclist">
        <div class="sr-only ms-3 mt-2 mb-2">List of COC Schegules in {{activeYear}} </div>
      <table class="viewcourse courseview mt-2">
  <thead>
      <tr class="table-header">
      <th class="text-white p-2">NO</th>
      <th class="text-white p-2">Start Date</th>
      <th class="text-white p-2">End Date</th>
      <th class="text-white p-2">Exam Date</th>
      <th class="text-white p-2"></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="(coc,index) in cocs" :key="coc.id">
  <td class="py-2">{{index+1}}</td>
  <td class="py-2">{{coc.start_date}}</td>
  <td class="py-2">{{coc.end_date}}</td>
  <td class="py-2">{{coc.exam_week}}</td>
  <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="generateCocRequest(coc.id)" class="dropdown-item">Generate COC Request Form</span></li>
             <hr class="m-0 py-0">
             <li><span @click="editCoc(coc)" class="dropdown-item">Edit COC</span></li>
             <hr class="m-0 py-0">
              <li><span @click="deleteCoc(coc.id)" class="dropdown-item">Delete COC</span></li>
             <hr class="m-0 py-0">
             <li><span @click="addStudentToCoc(coc.id)"  class="dropdown-item">View Student </span></li>
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
    <div v-if="!cocs.length" class="ms-5 px-5 mt-4 pb-3">There is no COC schedules found</div>
    </div>
    </div>
    <div v-if="isAddCoc" class="editwraper border shadow-sm">
      <div class="w-50 ms-auto content me-auto mt-5 p-5 bg-white">
        <span class="mb-3">Select Academic Year</span>
  <select class="form-select form-select-sm" aria-label=".form-select-sm example" ref="acYearId">
  <option v-for="year in academicYears" :key="year.id" :value="year.id">{{year.year}}</option>
</select>
   <div class="form-group mt-3"  :class="{warning:v$.cocData.start_date.$error}">
            <label for="startdate" class="form-label">Start Date</label>
            <input class="form-control form-control-sm" type="date" id="startdate" v-model="cocData.start_date" placeholder=".form-control-sm" aria-label=".form-control-sm example">
            <span class="error-msg mt-1">{{ v$.cocData.start_date.$errors[0]?.$message}}</span>
        </div>  
          <div class="form-group mt-3" :class="{warning:v$.cocData.end_date.$error}">
            <label for="enddate" class="form-label">End Date</label>
            <input class="form-control form-control-sm" type="date" id="enddate" v-model="cocData.end_date" aria-label=".form-control-sm example">
            <span class="error-msg mt-1">{{ v$.cocData.end_date.$errors[0]?.$message}}</span>
        </div>  
          <div class="form-group mt-3" :class="{warning:v$.cocData.exam_week.$error}">
            <label for="examdate" class="form-label">Exam Date</label>
            <input class="form-control form-control-sm" type="date" id="examdate" v-model="cocData.exam_week" placeholder=".form-control-sm" aria-label=".form-control-sm example">
            <span class="error-msg mt-1">{{ v$.cocData.exam_week.$errors[0]?.$message}}</span>
        </div> 
         <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelDialog()" class="btn cancel me-4">CANCEL</button>
  <button @click="saveCoc()" class="btn addbtn me-4">
    <span v-if="isSaving" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>ADDING</span>      
  <span v-else>ADD</span>
    </button>
</div>  
</div>
    </div>
     <div v-if="isDelete" class="editwraper d-flex">
     <div class="editDialogContent ms-auto me-auto border rounded shadow-sm p-5">
      <div>Do you want to delete COC ?</div>
      <div class="d-flex justify-content-end mt-5">
         <button @click="yesDelete()" class="btn me-5 confirm">Yes</button>
        <button @click="cancelDeletion()" class="btn confirm">NO</button>
       
      </div>
     </div>
   </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
    data() {
        return {
          v$:useValidate(),
           isAddCoc:false,
           cocData:{
            start_date:null,
            end_date:null,
            exam_week:null,
            isCocRequest:false,
           },
              isSaving:false,
               isSuccessed:false,
              isFaild:false,
               resultNotifier:'',
               add_or_edit:'add',
               cocId:'',
               isDelete:false,
               deletedCocId:null,
        }
    },
    validations(){
      return{
        cocData:{
           start_date:{required:helpers.withMessage('COC Exam start date is required',required)},
        end_date:{required:helpers.withMessage('COC Exam end date is required',required)},
        exam_week:{required:helpers.withMessage('COC Exam date is required',required)},
        }
      }
    },
    computed:{
        cocs(){
            return this.$store.getters['registrar/cocs']
        },
         academicYears(){
      return this.$store.getters['academicYears']
    },
    academicYearId(){
      return this.$store.getters.acYearId
    },
    activeYear(){
      var selectedYear
      this.academicYears.forEach(year=>{
        if(Number(year.id) === Number(this.academicYearId)){
          selectedYear= year.year
        }
      })
      return selectedYear
    }
    },
    created() {
      this.fetchCocs(this.academicYearId)
    },
    watch:{
      academicYearId(newValue){
       this.fetchCocs(newValue)
      },
    },
    methods: {
        addCoc(){
           this.isAddCoc = true
           this.add_or_edit = 'add'
            this.resultNotifier = ''
           },
                   async fetchCocs(acYearId) {
            this.$store.commit('setIsItemLoading',true)
            console.log('acadamic year id inside action--- ' + this.academicYearId)
            try {
                var response = await apiClient.get(`api/cocs?academic_year_id=${acYearId}`)
                console.log('responce code ==++++= ' + response.status)
                console.log('coc lists from server')
                console.log(response.data)
                if (response.status === 200) {
                    this.$store.commit('registrar/setCocs', response.data)
                }
            } catch (e) {
                console.log('error ---')
                console.log(e)
            } finally {
                this.$store.commit('setIsItemLoading',false)
            }
        },
       async printCocList(){
         await this.$htmlToPaper('coclist')
       },
        yesDelete(){
          this.$store.dispatch('registrar/deleteCoc',this.deletedCocId)
          this.isDelete = false
       },
       cancelDeletion(){
          this.isDelete = false
       },
         deleteCoc(id){
          this.deletedCocId = id
          this.isDelete = true
        },
        cancelDialog(){
            this.isAddCoc = false
            this.cocData = {}
             this.resultNotifier = ''
             this.v$.$reset()
        },
        generateCocRequest(id){
        this.$router.push({name:'CocRequestForm',params:{cocId:id}})
        },
        saveCoc(){
          this.v$.$validate()
            if(!this.v$.$error && this.add_or_edit === 'add'){
            this.isSaving = true
            this.cocData.academic_year_id = this.$refs.acYearId.value
            try{
              console.log('this is the data sent to server')
              console.log(this.cocData)
            this.$store.dispatch('registrar/addCocs',this.cocData).then(()=>{
                this.isFaild = false
                this.isSuccessed = true
                this.isAddCoc = false
                this.cocData = {}
                this.v$.$reset()
            })
            }
       catch(e){
           this.isFaild = true
           this.isSuccessed = false
           this.resultNotifier = 'Adding COC is faild'
     }
       finally{
      this.isSaving = false
       
      }
          }
          else if(!this.v$.$error && this.add_or_edit === 'edit'){
            this.isSaving = true
            try{
             this.cocData.academic_year_id = this.$refs.acYearId.value
            this.$store.dispatch('registrar/updateCocs',this.cocData).then(()=>{
                this.isFaild = false
                this.isSuccessed = true
                this.isAddCoc = false
               this.cocData = {}
               this.v$.$reset()
            })
            }
       catch(e){
           this.isFaild = true
           this.isSuccessed = false
           this.resultNotifier = 'editing COC is faild'
     }
       finally{
      this.isSaving = false
        }
        }
        },
        addStudentToCoc(id){
          this.$store.dispatch('registrar/fetchCocStudents',id)
this.$router.push({name:'CocRegistration',params:{cocId:id}})
        },
        editCoc(coc){
          this.add_or_edit = 'edit'
          this.cocData.start_date = coc.start_date
          this.cocData.end_date = coc.end_date
          this.cocData.exam_week = coc.exam_week
          this.isAddCoc = true
          this.cocData.id = coc.id
          this.resultNotifier = ''
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
th{
  text-align: left;
  padding-bottom: 8px;
  padding-top: 4px;
  
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
  font-size: 15px;
}
.viewcourse tr{
  border-top: 2px solid rgb(231, 228, 228);
  border-bottom: 2px solid rgb(231, 228, 228);
}
.viewcourse td{ 
  padding-left: 15px;
  border-left: none;
  border-right: none;
  border-top: 2px solid rgb(231, 228, 228);
  border-bottom: 2px solid rgb(231, 228, 228);
}
.confirm{
  width: 5em;
  border: 1px solid gainsboro;
}
.confirm:hover{
  background-color: gainsboro;
}
.editDialogContent{
  width: 40%;
  margin: auto;
  margin-top: 10%;
  background-color: #fff;
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
.success{
    color: green;
  }
  .faild{
    color: red;
  }
  .warning span{
    color: red;

  }
</style>