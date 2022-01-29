<template>
<base-card>
 <div class="d-flex justify-content-between">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-1" placeholder="Search By Student Id" aria-label="Username" aria-describedby="addon-wrapping" v-model="searchValue" @keyup.enter="searchByStudId()">
   <span @click="searchByStudId()" class="searchicon  input-group-text" id="searchby_id"><i class="fas fa-search"></i></span>
</div>
  <div class="exportbtn">
    <button @click="printStudentFeeList" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    </div>
    <div id="degreefee">
      <div class="sr-only ms-5 mt-3">Degree student tuition fee lists</div>
    <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white" rowspan="2">NO</th>
       <th class="text-white"  rowspan="2">Stud ID</th>
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
       <td>{{queryObject.per_page*studentFee.current_page +index+1 - queryObject.per_page }}</td>
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
      <td>{{student.pads.July}}</td>
      <td>{{student.pads.August}}</td>
      <td>{{student.total}}</td>
      <td><button @click="showDetail(student.id)" class="px-1 viewdetailbtn"><i class="fas fa-ellipsis-v"></i></button></td>
      
    </tr>
  </tbody>
   
</table>
    </div>
<div v-if="studentFee.data?.length" class="d-flex justify-content-end mt-3 me-5">
<div class="rowsperpage me-3">
 Number of Rows
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
 <button @click="printStudentList()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div id="studentDetail">
    <div class="d-flex justify-content-between mt-3">
    <div class="studentInfo ms-5">
    <div class="name d-flex">
<span class="me-2">Full Name :</span>
<span>{{degreeStudentFeeDetails['full_name']}}</span>
</div>
<div class="name d-flex">
<span class="me-2">ID NO :</span>
<span>{{degreeStudentFeeDetails['id']}}</span>
</div>
<div class="name d-flex">
<span class="me-2">Sex :</span>
<span>male</span>
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
    <span>year :</span>
    <span>{{acyear.year}}</span>
    </div>
     <div class="row mt-2">
    <div v-for="semester in acyear.semesters" :key="semester.no" class="col-sm-5 me-5">
    <table class="ms-5 mt-3 me-5 tabeldetail">
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
  <td>total</td>
 
  </tr>
  <tr><td :colspan="semester.months?.length+1" class="text-center">Paid months</td>
  </tr>
  </tbody>   
</table>
    </div>
</div>
<hr class="w-100 mt-4 p-0">
</div>
    </div>
<div class="d-flex justify-content-end me-1 p-3">
     <button @click="cancelDetailDialog" class="ms-auto btn addbtn">CANCEL</button>
    </div>
</div>
    </base-card>
</div>
</div>
</template>
<script>
export default {
    data() {
      return {
        isDetail:false,
        searchValue:'',
        rowNumber:10,
         queryObject:{
            page:1,
            per_page:10,
            search_id:'',
            path:'api/degree_student_fees',
            }
        
      }
    },
    created() {
      this.queryObject.academic_year_id = this.acYearId
      this.degreeStudentsPaid(this.queryObject)
    },
    computed:{
      studentFee(){
        return this.$store.getters['cashier/degreeStudentFees']
      },
      acYearId(){
  return this.$store.getters.acYearId
 },    
      // filteredStudents(){
      //    var tempStudents= this.studentFee.data    
      // if(this.searchValue!==''){
      //    tempStudents=tempStudents.filter((student)=>{
      //       return student?.student_id?.toLowerCase().includes(this.searchValue.toLowerCase())
      //    })
      // }
      // return tempStudents
      // }
      },
     watch:{
rowNumber(newValue){
  this.queryObject.search_id=''
  this.queryObject.page = 1
  this.queryObject.per_page = newValue
  this.degreeStudentsPaid(this.queryObject)
},
acYearId(newValue){
  this.queryObject.search_id = ''
  this.queryObject.academic_year_id = newValue
  this.degreeStudentsPaid(this.queryObject)
}
    },
    methods: {
    degreeStudentsPaid(queryObject){
          this.$store.dispatch('cashier/fetchDegreeStudentFee',queryObject)
        },
      showDetail(id){
        this.$router.push({name:'DegreeFeedetail',params:{id:id}})
      },
        printStudentFeeList(){
         this.$htmlToPaper('degreefee');
         console.log('you have print your tabel')
      },
printStudentList(){
   this.$htmlToPaper('studentDetail');
},
      forWardChivron(){
        this.queryObject.search_id = ''
        this.queryObject.page = this.queryObject.page +1
       this.degreeStudentsPaid(this.queryObject)
      },
      backChivron(){
        this.queryObject.search_id = ''
        this.queryObject.page = this.queryObject.page -1
       this.degreeStudentsPaid(this.queryObject)
      },
      searchByStudId(){
        this.queryObject.page = 1
        this.queryObject.search_id = this.searchValue
         this.degreeStudentsPaid(this.queryObject)
      }
    }
}
</script>
<style scoped>
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#2f4587 ;
}
.viewdetailbtn{
  background-color: #fff;
  border: none;
}
.viewdetailbtn:hover{
  color: #366ad9;
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
    color: rgba(179, 175, 175, 0.849);
}
.active{
  color: rgb(15, 15, 15);
}
</style>
