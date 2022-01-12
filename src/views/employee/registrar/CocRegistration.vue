<template>
<div class="border rounded shadow-sm m-3 bg-white">
<div class="mt-3 d-flex justify-content-between align-items-center">
    <div class="d-flex">
<div class="form-check ms-3 me-4">
  <input class="form-check-input p-2" type="radio" name="coc" id="registerd" value="registerd" v-model="registerd">
  <label class="form-check-label ms-2" for="registerd">
    Registered
  </label>
</div>
<div class="form-check me-4">
  <input class="form-check-input p-2" type="radio" name="coc" id="assessed" value="assessed" v-model="assessed">
  <label class="form-check-label ms-2" for="assessed">
    Assessed
  </label>
</div>
<div class="form-check">
  <input class="form-check-input p-2" type="radio" name="coc" id="competent" value="competent" v-model="competent">
  <label class="form-check-label ms-2" for="competent">
    Competent
  </label>
</div>
    </div>
      <div class="d-flex justify-content-end mt-3">
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
  <tr v-for="(student, index) in cocTakerStudents.data" :key="student.id">
  <td class="px-3">{{index+1}}</td>
  <td class="py-2">{{student.registration_no}}</td>
  <td class="py-2">{{student.full_name}}</td>
  <td class="py-2">{{student.sex}}</td>
  <td class="py-2">{{student.occupation_name}}</td>
  <td class="py-2">{{student.level}}</td>
  <td class="py-2">{{student.result}}</td>
  <td class="py-2">{{student.certificate_no}}</td>
  <td class="py-2">{{student.type}}</td>
  <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu py-0" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="edit(student)" class="dropdown-item">Edit Student Info</span></li>
             <hr class="my-0 py-0">
             <li><span @click="deleteStudentFromCoc(student.id)"  class="dropdown-item">Delete Student </span></li>
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
     </div>
    <div class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option v-for="n in 14" :key="n" :value="n">{{n}}</option>
  
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
    <div v-if="isAddCoc" class="editwraper border shadow-sm">
      <div class="w-50 ms-auto content me-auto mt-5 p-5 bg-white">
   <div class="form-group">
            <label for="startdate" class="form-label">Start Date</label>
            <input class="form-control form-control-sm" type="date" id="startdate" v-model="cocData.startDate" placeholder=".form-control-sm" aria-label=".form-control-sm example">
        </div>  
          <div class="form-group mt-3">
            <label for="enddate" class="form-label">End Date</label>
            <input class="form-control form-control-sm" type="date" id="enddate" v-model="cocData.endDate" placeholder=".form-control-sm" aria-label=".form-control-sm example">
        </div>  
          <div class="form-group mt-3">
            <label for="examdate" class="form-label">Exam Date</label>
            <input class="form-control form-control-sm" type="date" id="examdate" v-model="cocData.examDate" placeholder=".form-control-sm" aria-label=".form-control-sm example">
        </div> 
         <p class="ms-5 mt-3 text-center" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
<div class="d-flex justify-content-end mt-3 pt-3">
  <button @click="cancelDialog()" class="btn cancel me-4">CANCEL</button>
  <button @click="saveCoc()" class="btn addbtn me-4"><span v-if="isLoading" class="btn  py-1">
 <span  class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>ADING</span>      
  <span v-else>ADD</span>
    </button>
</div>  
</div>
    </div>
</template>
<script>
export default {
  props:['cocId'],
    data() {
        return {
         registerd:'',
         assessed:'',
         competent:'',
         rowNumber:'5',
          queryObject:{
          page:1,
          per_page:5,
          path:'api/coc_students',

        }
        }
    },
    computed:{
        cocs(){
            return this.$store.getters['registrar/cocs']
        },
      cocTakerStudents(){
        return this.$store.getters['registrar/cocTakerStudents']
      }
    },
    created() {
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
        },
        saveCoc(){
            this.$store.dispatch('registrar/addCoc',this.cocData)
        },
        deleteStudentFromCoc(){
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
  font-size: 16px;
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
.cancel{
  border: 1px solid gray;
  width: 7em;
}
.cancel:hover{
  background-color: rgb(192, 189, 189);
}
.content{
    border-radius: 3%;
    overflow-y: scroll;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>