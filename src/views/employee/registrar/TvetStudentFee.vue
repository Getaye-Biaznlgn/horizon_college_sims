<template>
<base-card>
 <div class="d-flex justify-content-between">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-1" placeholder="Search By studdent ID" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId" @keyup.enter="searchByIdNo()">
   <span @click="searchByIdNo()" class="searchicon  input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
<div class="d-flex">
 <div class="mb-3 me-4">
    <span>paid Students</span>
<select class="form-select form-select-sm" aria-label="Default select example" v-model="paid" @change="fetchPaidStudents($event)">
  <option value="all">All</option>
  <option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
  </select>
</div>
  <div class="mb-3 me-4">
    <span>Unpaid Students</span>
   <select class="form-select form-select-sm" aria-label="Default select example" v-model="unpaid" @change="fetchUnpaidStudents($event)">
  <option value="all">All</option>
  <option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
  </select>
</div>
  <div>
    <button @click="exportTvetStudent()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
 </div>
    </div>
    <div id="tvetStudentFee">
      <div class="ms-5 mt-3 sr-only">TVET Student tuition fee list</div>
    <table class="mt-3">
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
      <th class="text-white">Aug</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in tvetStudentFees.data" :key="student.id">
      <td class="px-3">{{queryObject.per_page*tvetStudentFees.current_page +index+1 - queryObject.per_page}}</td>
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
      <td><button @click="showDetail(student.id)" class="px-1 viewdetailbtn"><i class="fas fa-ellipsis-v"></i></button></td>
    </tr>
  </tbody>   
</table>
 <div v-if="!tvetStudentFees.data?.length" class="ms-5 px-5 mt-4 pb-3">There is no TVET students found</div>
    </div>
<div v-if="tvetStudentFees.data?.length" class="d-flex justify-content-end mt-3 me-5">
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
{{tvetStudentFees.from+'-'+tvetStudentFees.to+' of '+tvetStudentFees.total+' Rows'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:tvetStudentFees.from !== 1}" :disabled="tvetStudentFees.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:tvetStudentFees.to !==tvetStudentFees.total}" :disabled="tvetStudentFees.to ===tvetStudentFees.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
</base-card>
<!--for detail dialog -->
<div v-if="isDetail" class="editwraper mb-4">
<div class="dialogcontent">
<base-card>
<div class="d-flex justify-content-end">
 <button @click="exportTvetFeeDetail()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div id="tvetfeedetail">
    <div class="d-flex justify-content-between mt-3 me-5">
    <div class="studentInfo ms-5">
    <div class="name d-flex">
<span class="me-2">Full Name :</span>
<span>{{tvetStudentFeeDetails.full_name}}</span>
</div>
<div class="name d-flex">
<span class="me-2">ID NO :</span>
<span>{{tvetStudentFeeDetails.student_id}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Sex :</span>
<span>{{tvetStudentFeeDetails.sex}}</span>
</div>
    </div>
     <div class="me-5">
<div class="name d-flex">
<span class="me-2">Department :</span>
<span>{{tvetStudentFeeDetails.department}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Program :</span>
<span>{{tvetStudentFeeDetails.program}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Level :</span>
<span>{{tvetStudentFeeDetails.level_no}}</span>
</div>
    </div>
    </div>
  <table class="mt-3">
   <tr class="table-header">
    <th rowspan="2" class="text-white">Year</th>
    <th colspan="12" class="text-white text-center">Months</th>
    <th rowspan="2" class="text-white">Total</th>
  </tr>
  <tr class="table-header">
    <th class="text-white">sept</th>
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
    <th class="text-white">Aug</th>
    
  </tr>
 <tbody>
 <tr v-for="(acYear,index) in tvetStudentFeeDetails.years" :key="index">
 <td>{{acYear.year}}</td>
 <td>{{acYear.months.September}}</td>
 <td>{{acYear.months.October}}</td>
 <td>{{acYear.months.November}}</td>
 <td>{{acYear.months.December}}</td>
 <td>{{acYear.months.January}}</td>
 <td>{{acYear.months.February}}</td>
 <td>{{acYear.months.March}}</td>
 <td>{{acYear.months.April}}</td>
 <td>{{acYear.months.May}}</td>
 <td>{{acYear.months.Jun}}</td>
 <td>{{acYear.months.July}}</td>
 <td>{{acYear.months.August}}</td>
 <td>{{acYear.total}}</td>
 </tr>
  </tbody>
 </table>
    </div>
<div class="d-flex justify-content-end mt-3 me-1 p-3">
     <button @click="cancelDetailDialog" class="ms-auto btn addbtn">CANCEL</button>
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
            rowNumber:10,
            studentId:null,
              paid:'all',
        unpaid:'all',
            queryObject:{
            page:1,
            per_page:10,
            search_id:'',
            path:'api/tvet_student_fees'
            },
        }
    },
      created() {
        this.queryObject.academic_year_id=this.acYearId
    this.tvetStudentsPaid(this.queryObject)
     // this.$store.dispatch('registrar/fetchTvetStudentFees')
    },
    computed:{
      tvetStudentFees(){
        return this.$store.getters['registrar/tvetStudentFees']
      },
       tvetStudentFeeDetails(){
        return this.$store.getters['cashier/tvetStudentFeeDetails']
      },
      acYearId(){
        return this.$store.getters.acYearId
      },
       months(){
     return this.$store.getters['registrar/acadamicYearMounths']
    },
    },
    watch:{
//       studentId(newValue){
//   this.queryObject.search_id = newValue
//   this.tvetStudentsPaid(this.queryObject)
// },
acYearId(newValue){
   this.queryObject.search_id = ''
  this.studentId = ''
  this.queryObject.academic_year_id = newValue
  this.tvetStudentsPaid(this.queryObject)
},
rowNumber(newValue){
  this.queryObject.search_id = ''
  this.studentId = ''
  this.queryObject.per_page = newValue
  this.tvetStudentsPaid(this.queryObject)
}
    },
    methods: {
        tvetStudentsPaid(queryObject){
this.$store.dispatch('registrar/fetchTvetStudentFees',queryObject)
        },
          async fetchPaidStudents(event){
             this.queryObject.page = 1
         this.unpaid = 'all'
         this.queryObject.search_id = ''
         this.studentId = ''
           if(event.target.value !== 'all'){
            this.queryObject.month_query = event.target.value
           this.queryObject.academic_year_id = this.acYearId
          try{
           console.log('paid students outside')
             var response = await apiClient.get(`api/tvet_paid_students?page=${this.queryObject.page}&per_page=${this.queryObject.per_page}&search_id${this.queryObject.search_id}&academic_year_id=${this.queryObject.academic_year_id}&month_query=${this.queryObject.month_query}`)
            if(response.status ===200){
              console.log(response.data)
                this.$store. commit('registrar/setTvetStudentFees', response.data)
                console.log('paid students')
            }
          }
          catch(e){
            console.log('error')
          }
          }
          else{
            this.paid = 'all'
            this.queryObject.month_query = ''
            this.tvetStudentsPaid(this.queryObject)
          }            
        },
       async fetchUnpaidStudents(event){
          this.queryObject.page = 1
         this.paid = 'all'
         this.queryObject.search_id = ''
         this.studentId = ''
          if(event.target.value !== 'all'){
             this.queryObject.month_query = event.target.value
          this.queryObject.academic_year_id = this.acYearId
          try{
             var response = await apiClient.get(`api/tvet_unpaid_students?page=${this.queryObject.page}&per_page=${this.queryObject.per_page}&search_id${this.queryObject.search_id}&academic_year_id=${this.queryObject.academic_year_id}&month_query=${this.queryObject.month_query}`)
            if(response.status ===200){
                this.$store. commit('registrar/setTvetStudentFees', response.data)
            }
          }
          catch(e){
            console.log('error')
          }
          }
           else{
             this.unpaid = 'all'
              this.queryObject.month_query = ''
            this.tvetStudentsPaid(this.queryObject)
          }
        },
      searchByIdNo(){
        this.queryObject.search_id = this.studentId
this.tvetStudentsPaid(this.queryObject)
      },
      exportTvetStudent(){
        this.$htmlToPaper('tvetStudentFee')
      },
      exportTvetFeeDetail(){
        this.$htmlToPaper('tvetfeedetail')
      },
        showDetail(id){
          this.$store.dispatch('cashier/fetchTvetStudentFeeDetails',id)
            this.isDetail = true
        },
        cancelDetailDialog(){
            this.isDetail = false
             document.documentElement.style.overflow = "scroll"
        },
          forWardChivron(){
            this.queryObject.search_id = ''
             this.studentId = ''
        this.queryObject.page = this.queryObject.page +1
       this.tvetStudentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.search_id = ''
         this.studentId = ''
        this.queryObject.page = this.queryObject.page -1
       this.tvetStudentsPaid(this.queryObject)
      },
    },
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
    height: 35px;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#1e3fa3 ;
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
.viewdetailbtn{
  border: none;
  background-color: #fff;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  border-radius: 10px;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
}
th{
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}

.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(219, 219, 219, 0.849);
}
.active{
  color: rgb(15, 15, 15);
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
}
.dialogcontent{
   margin: 3% 5% 5% 5%;
   height: 90vh;
   overflow-y: scroll;
}
.error{
  color: red;
}
</style>
