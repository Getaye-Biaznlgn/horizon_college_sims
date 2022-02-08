<template>
<base-card>
 <div class="d-flex mb-3 align-items-center">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-1" placeholder="Search By Student Id" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId" @keyup.enter="searchByStudId()">
   <span @click="searchByStudId()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
<div class="d-flex ms-auto">
  <div class="me-4">
    <span>Paid</span>
<select class="form-select form-select-sm" aria-label="Default select example" v-model="paid" @change="fetchPaidStudents($event)">
  <option value="all">All</option>
  <option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
  </select>
</div>
  <div class="me-4">
    <span>UnPaid</span>
   <select class="form-select form-select-sm" aria-label="Default select example" v-model="unpaid" @change="fetchUnpaidStudents($event)">
  <option value="all">All</option>
  <option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
  </select>
</div>
  <div>
    <button @click="printStudentFeeList()" class="btn me-1 addbtn p-1 mt-3">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    </div>
    </div>
    <div id="degreefee">
      <div class="ms-5 sr-only">Degree Student Fee lists</div>
    <table class="mt-2">
  <thead>
    <tr class="table-header">
      <th class="text-white" rowspan="2">NO</th>
       <th class="text-white"  rowspan="2">Student ID</th>
      <th class="text-white"  rowspan="2">Full Name</th>
      <th class="text-white"  rowspan="2">Sex</th>
      <th class="text-white text-center" colspan="12">Months</th>
      <th class="text-white" rowspan="2" colspan="2">Total</th>
    </tr>
      <tr class="table-header">
      <th class="text-white">Sep</th>
      <th class="text-white">Oct</th>
      <th class="text-white">Nov</th>
      <th class="text-white">Dec</th>
      <th class="text-white">Jan</th>
      <th class="text-white">Feb</th>
      <th class="text-white">Mar</th>
      <th class="text-white">Apr</th>
      <th class="text-white">May</th>
      <th class="text-white">Jun</th>
      <th class="text-white">Jul</th>
      <th class="text-white">Augu</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in studentFee.data" :key="student.id">
      <td class="px-3">{{queryObject.per_page*studentFee.current_page +index+1 - queryObject.per_page}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.full_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.pads.September}}</td>
      <td>{{student.pads.October}}</td>
      <td>{{student.pads.November}}</td>
      <td>{{student.pads.December}}</td>
      <td>{{student.pads.January}}</td>
      <td>{{student.pads.February}}</td>
      <td>{{student.pads.March}}</td>
      <td>{{student.pads.April}}</td>
      <td>{{student.pads.May}}</td>
      <td>{{student.pads.Jun}}</td>
      <td>{{student.pads.Julay}}</td>
      <td>{{student.pads.August}}</td>
      <td>{{student.total}}</td>
      <td v-if="!isPrinting"><button @click="showDetail(student.id)" class="px-1 viewdetailbtn"><i class="fas fa-ellipsis-v"></i></button></td>
      
    </tr>
  </tbody>
     
</table>
<div v-if="!studentFee.data?.length" class="ms-5 px-5  mt-3 pb-2">There is no Degree students found </div>
    </div>
<div v-if="studentFee.data?.length" class="d-flex justify-content-end mt-3 me-5">
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
{{studentFee.from+'-'+studentFee.to+' of '+studentFee.total+' Rows'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:studentFee.from !== 1}" :disabled="studentFee.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:studentFee.to !==studentFee.total}" :disabled="studentFee.to ===studentFee.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
</base-card>
<!-- student detail view-->
<div v-if="isDetail" class="editwraper">
<div class="dialogcontent">
<base-card>
<div class="innercontent">
<div class="d-flex justify-content-end">
 <button @click="feeDetail()" class="btn me-1 addbtn p-1">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div id="degreefeeDetail">
    <div class="d-flex justify-content-between mt-3">
    <div class="studentInfo ms-5">
    <div class="name d-flex">
<span class="me-2">Full Name :</span>
<span>{{degreeStudentFeeDetails['full_name']}}</span>
</div>
<div class="name d-flex">
<span class="me-2">ID NO :</span>
<span>{{degreeStudentFeeDetails['student_id']}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Sex :</span>
<span>{{degreeStudentFeeDetails['sex']}}</span>
</div>
    </div>
     <div class="me-5">
<div class="name d-flex">
<span class="me-2">Department :</span>
<span>{{degreeStudentFeeDetails.department}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Program :</span>
<span>{{degreeStudentFeeDetails.program}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Year :</span>
<span>{{degreeStudentFeeDetails.year_no}}</span>
</div>
    </div>
    </div>
    <hr class="w-100 mt-3 p-0">
    <div v-for="acyear in degreeStudentFeeDetails.years" :key="acyear.year">
    <div class="d-flex mt-3">
    <span class="ms-5">year :</span>
    <span>{{acyear.year}}</span>
    </div>
     <div class="d-flex mt-2">
    <div v-for="semester in acyear.semesters" :key="semester.no" class="mt-3 mt-lg-0 flex-fill me-3">
    <table>
       <thead>
       <tr class="table-header">
          <th class="text-white text-center" :colspan="Number(semester.months?.length)">{{'Semester '+semester.semester_no}}</th>
          <th class="text-white"></th>
       </tr>
       <tr class="table-header">
          <th class="text-white text-center" :colspan="semester.months?.length">Months</th>
          <th class="text-white"  rowspan="2">Total</th>
       </tr>
        <tr class="table-header">
          <th v-for="month in semester.months" :key="month" class="text-white">{{month.name.slice(0,3)}}</th>
    </tr>
  </thead>
  <tbody>
  <tr>
  <td v-for="month in semester.months" :key="month">{{month.pad}}</td>
  <td>{{semester.total}}</td>
 
  </tr>
  <tr><td :colspan="semester.months?.length+1" class="text-center">Paid months</td>
  </tr>
  </tbody>   
</table>
    </div>
</div>
</div>
<hr class="w-100 mt-4 p-0">
</div>
<div class="d-flex justify-content-end me-1 p-3">
     <button @click="cancelDetailDialog" class="ms-auto btn p-1 addbtn">CANCEL</button>
    </div>
</div>
    </base-card>
</div>
</div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
    data() {
      return {
        isDetail:false,
        studentId:null,
        rowNumber:10,
        paid:'all',
        unpaid:'all',
        isPrinting:false,
         queryObject:{
            page:1,
            per_page:10,
            search_id:'',
            month_query:'',
            path:'api/degree_student_fees',
            },
            pamentStatus:''
        
      }
    },
    computed:{
      studentFee(){
        return this.$store.getters['registrar/degreeStudentFees']
      },
      degreeStudentFeeDetails(){
        return this.$store.getters['cashier/degreeStudentFeeDetails']
      },
      acYearId(){
        return this.$store.getters.acYearId
      },
         months(){
     return this.$store.getters['registrar/acadamicYearMounths']
    },
    },
      created() {
      this.queryObject.academic_year_id = this.acYearId
      this.degreeStudentsPaid(this.queryObject)
    },

     watch:{
       acYearId(newValue){
         this.queryObject.academic_year_id = newValue
         this.queryObject.search_id = ''
         this.studentId = ''
         this.degreeStudentsPaid(this.queryObject)
       },
rowNumber(newValue){
  this.queryObject.per_page = newValue
   this.studentId = ''
  this.queryObject.search_id = ''
  this.degreeStudentsPaid(this.queryObject)
}
    },
    methods: {
    degreeStudentsPaid(queryObject){
          this.$store.dispatch('registrar/fetchDegreeStudentFeesLists',queryObject)
        },
       async fetchPaidStudents(event){
          this.queryObject.page = 1
         this.unpaid = 'all'
         this.queryObject.search_id = ''
         this.studentId = ''
           if(event.target.value !== 'all'){
             this.$store.commit('setIsItemLoading',true)
            this.queryObject.month_query = event.target.value
           this.queryObject.academic_year_id = this.acYearId
           this.pamentStatus = event.target.value
          try{
            console.log('paid students outside')
             var response = await apiClient.get(`api/degree_paid_students?page=${this.queryObject.page}&per_page=${this.queryObject.per_page}&search_id${this.queryObject.search_id}&academic_year_id=${this.queryObject.academic_year_id}&month_query=${this.queryObject.month_query}`)
            if(response.status ===200){
              console.log(response.data)
                this.$store. commit('registrar/setDegreeStudentFees', response.data)
                console.log('paid students')
            }
          }
          catch(e){
            console.log('error')
          }
          finally{
             this.$store.commit('setIsItemLoading',false)
          }
          }
          else{
            
            this.paid = 'all'
            this.queryObject.month_query = ''
            this.degreeStudentsPaid(this.queryObject)
          }
        },
       async fetchUnpaidStudents(event){
         this.queryObject.page = 1
         this.paid = 'all'
         this.queryObject.search_id = ''
         this.studentId = ''
          if(event.target.value !== 'all'){            
             this.$store.commit('setIsItemLoading',true)          
             this.queryObject.month_query = event.target.value
          this.queryObject.academic_year_id = this.acYearId
          this.pamentStatus = event.target.value
          try{
             var response = await apiClient.get(`api/degree_unpaid_students?page=${this.queryObject.page}&per_page=${this.queryObject.per_page}&search_id${this.queryObject.search_id}&academic_year_id=${this.queryObject.academic_year_id}&month_query=${this.queryObject.month_query}`)
            if(response.status ===200){
                this.$store. commit('registrar/setDegreeStudentFees', response.data)
            }
          }
          catch(e){
            console.log('error')
          }
             finally{
             this.$store.commit('setIsItemLoading',false)
              }
          }
           else{
             this.unpaid = 'all'
              this.queryObject.month_query = ''
            this.degreeStudentsPaid(this.queryObject)
          }
        },
      showDetail(id){
        this.$store.dispatch('cashier/degreeStudentFeeDetails',id)
        this.isDetail = true
        document.documentElement.style.overflow = "hidden"
      },
      cancelDetailDialog(){
        this.isDetail = false
      },
        printStudentFeeList(){
          this.isPrinting = true
         var timeOutFuncion
         timeOutFuncion = setTimeout(()=>{
            this.$htmlToPaper('degreefee',null,()=>{
            this.isPrinting = false
            clearTimeout(timeOutFuncion)
         });
         },300)
         
         console.log('you have print your tabel')
      },
      feeDetail(){
        this.$htmlToPaper('degreefeeDetail');
      },
      forWardChivron(){
        this.queryObject.search_id = ''
         this.studentId = ''
         this.queryObject.month_query = this.pamentStatus
        this.queryObject.page = this.queryObject.page +1
       this.degreeStudentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.search_id = ''
         this.studentId = ''
         this.queryObject.month_query = this.pamentStatus
        this.queryObject.page = this.queryObject.page -1
       this.degreeStudentsPaid(this.queryObject)
      },
      searchByStudId(){
  this.queryObject.search_id = this.studentId
  this.degreeStudentsPaid(this.queryObject)
      }
      

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
    background-color:#2f4587 ;
}

.searchicon{
  cursor: pointer;
}
.search{
    height: 8px!important;
    padding: 0;
    background-color: #fff;
}
.search input{
    border-right: none;
}
.search span{
    background-color: #fff;
    border-left: none;
}
.search span:hover{
color: rgb(128, 128, 236);
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#366ad9 ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding: 5px;
  border: 1px solid #fff;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px;
  vertical-align: top;
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(97, 94, 94, 0.849);
}
.chivronbtn:focus{
    color: rgb(15, 15, 15);
}
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(219, 219, 219, 0.849);
}
.chivronbtn:focus{
    color: rgb(15, 15, 15);
}
.active{
  color: rgb(15, 15, 15);
}
.viewdetailbtn{
  border: none;
  background-color: #fff;
}
.viewdetail{
    cursor: pointer;

}
.viewdetail:hover{
    color: rgb(124, 124, 221);
}
.editwraper{
 position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh!important;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow-y: hidden;
}
.dialogcontent{
   margin: 3% 5% 5% 5%;
   height: 90vh;
   overflow-y: auto;
  
}
.error{
  color: red;
}
</style>
