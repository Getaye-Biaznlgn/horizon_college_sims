<template>
    <base-card>
    <div class="d-flex justify-content-between align-item-center">
    <div class="d-flex justify-content-start">
     <div class="input-group search p-0 me-4">
  <input type="text" class="form-control p-1" placeholder="Search By Student Id" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId" @keyup.enter="searchByIdNo()">
   <span @click="searchByIdNo()" class="searchicon  input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
 <div class="mb-3 me-4">
<input class="form-control form-control-sm" type="date" placeholder="Select Date" aria-label=".form-control-sm example" v-model="startDate">
</div>
 <div class="mb-3 me-2">
<input class="form-control form-control-sm" type="date" placeholder="Select Date" aria-label=".form-control-sm example2" v-model="endDate">
</div>
 <div class="mb-3 col-sm-3 me-2">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="paymentType">
<option value="all">All</option>
<option v-for="payment in paymentTypes" :key="payment.id" :value="payment.name">{{payment.name}}</option>
  </select>
</div>
    </div>
    <div>
    <button @click="exportData()" class="btn me-1 addbtn d-flex justify-content-center">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
  </div>
     <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white">NO</th>
       <th class="text-white">Stud ID</th>
      <th class="text-white">Full Name</th>
      <th class="text-white">Paid Date</th>
      <th class="text-white">Payment Type</th>
      <th class="text-white">Pad Number</th>
      <th class="text-white">Amount</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in paidStudents.data" :key="index">
      <td>{{index+1}}</td>
      <td>{{student?.student_id}}</td>
      <td>{{student.full_name}}</td>
      <td>{{paidDate(student.paid_date)}}</td>
      <td>{{student.payment_type}}</td>
      <td>{{student.receipt_no}}</td>
      <td>{{student.paid_amount}}</td>
    </tr>
  </tbody>
   
</table>
<div v-if="paidStudents.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber">
  <option v-for="n in 14" :key="n" :value="n" selected>{{n}}</option>
  
</select>
</div>
<div class="pageno me-3">
{{paidStudents.from+'-'+paidStudents.to+' of '+paidStudents.total+' pages'}}
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn" :class="{active:paidStudents.from !== 1}" :disabled="paidStudents.from === 1"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron()" class="chivronbtn" :class="{active:paidStudents.to !==paidStudents.total}" :disabled="paidStudents.to ===paidStudents.total"><i class="fas fa-chevron-right"></i></button></div>
</div>
    </base-card>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
        rowNumber:5,
        paymentType:'all',
        studentId:null,
        startDate:null,
        endDate:null,
        dateQuery:null,
        queryObject:{
          page:1,
          per_page:5,
          path:'api/students_paid',
          search_id:'',
          date_between:'',
          payment_type:'',
          date_query:'',
        }
    }
  },
   computed:{
    ...mapGetters('dean',['degreeDepartments','degreePrograms']),
    semesters(){
      return this.$store.getters['registrar/activeYearSemesters']
    },
    degreeStudents(){
     return this.$store.getters['registrar/degreeStudents']
    },
     paidStudents(){
     return this.$store.getters['cashier/paidStudentsLists']
    },
     paymentTypes(){
          return  this.$store.getters['cashier/paymentTypes']
          },
  },
  created() {  
  this.StudentsPaid(this.queryObject)
  },
  watch:{
rowNumber(newValue){
  this.queryObject.per_page = newValue
  this.queryObject.page = 1
  this.StudentsPaid(this.queryObject)
},
 paymentType(newValue){
   if(newValue === 'all'){
      this.queryObject.payment_type = ''
   }
   else{
      this.queryObject.payment_type = newValue
    this.StudentsPaid(this.queryObject)
   }
  
 },
studentId(newValue){
  this.queryObject.search_id = newValue
}
  },
      methods: {
        StudentsPaid(queryObject){
this.$store.dispatch('cashier/fetchPaidStudents',queryObject)
        },
      exportData(){},
       searchByIdNo(){
         this.queryObject.search_id = this.studentId
          this.StudentsPaid(this.queryObject)

 },
       filterByDepartment(event){
           this.degreeStudentList = this.degreeStudents.filter((student)=>{
            return Number(event.target.value) === Number(student.degree_department_id)
})
      },
       filterByYear(event){
           this.degreeStudentList = this.degreeStudents.filter((student)=>{
            return event.target.value === student.current_year_no
})
      },
       filterBySemester(event){
           this.degreeStudentList = this.degreeStudents.filter((student)=>{
            return event.target.value === student.current_semester_no
})
      },
      forWardChivron(){
        this.queryObject.page = this.queryObject.page +1
       this.StudentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.page = this.queryObject.page -1
       this.StudentsPaid(this.queryObject)
      },
      paidDate(dateValue){
var date = new Date(dateValue)
var year = date.getFullYear()
var month = date.getMonth()
var day = date.getDate()
    return day+'/'+month+'/'+year
      }
    }
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 8em;
    height: 30px;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#1e3fa3 ;
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
.all{
  border: 2px solid rgb(179, 176, 176);
  width: 6em;
  padding: 2px;
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
.chivronbtn{
    border: none;
    background-color: #fff;
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>