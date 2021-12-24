<template>
<base-card>
 <div class="d-flex justify-content-between">
     <div class="input-group search w-25">
  <input type="text" class="form-control p-1" placeholder="Search By pad number" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId">
   <span @click="searchByPadNo()" class="searchicon  input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div>
    <button @click="addStudent" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    </div>
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
      <th class="text-white">Aug</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in tvetStudentFee" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.id}}</td>
      <td>{{student.full_name}}</td>
      <td>{{student.sex}}</td>
      <td>
       <span v-if="student.pads.September === null">X</span>
      <span v-else>{{student.pads.September}}</span>
      </td>
      <td>
     <span v-if="student.pads.October === null">X</span>
      <span v-else>{{student.pads.October}}</span>
      </td>
      <td>
     <span v-if="student.pads.November === null">X</span>
      <span v-else>{{student.pads.November}}</span>
      </td>
      <td>
     <span v-if="student.pads.December === null">X</span>
      <span v-else>{{student.pads.December}}</span>
      </td>
      <td>
     <span v-if="student.pads.January === null">X</span>
      <span v-else>{{student.pads.January}}</span>
      </td>
      <td>
      <span v-if="student.pads.February === null">X</span>
      <span v-else>{{student.pads.February}}</span>
      </td>
      <td>
      <span v-if="student.pads.March === null">X</span>
      <span v-else>{{student.pads.March}}</span>
      </td>
      <td>
     <span v-if="student.pads.April === null">X</span>
      <span v-else>{{student.pads.April}}</span>
      </td>
      <td>
     <span v-if="student.pads.May === null">X</span>
      <span v-else>{{student.pads.May}}</span>
      </td>
      <td>
     <span v-if="student.pads.Jun === null">X</span>
      <span v-else>{{student.pads.Jun}}</span>
      </td>
      <td>
     <span v-if="student.pads.Julay === null">X</span>
      <span v-else>{{student.pads.Julay}}</span>
      </td>
      <td>
      <span v-if="student.pads.August === null">X</span>
      <span v-else>{{student.pads.August}}</span>
      </td>
      <td>{{student.total}}</td>
      <td><button @click="showDetail(student.id)" class="px-1 viewdetailbtn"><i class="fas fa-ellipsis-v"></i></button></td>
      
    </tr>
  </tbody>
   
</table>
<div class="d-flex justify-content-end mt-3 me-3">
<div class="rowsperpage me-3">
Rows per Page
</div>
<div class="limit col-sm-1 me-3">
<select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="rowNumber" @change="valueChanged">
  <option value="1" selected>1</option>
  <option value="2">2</option>
  <option value="3">3</option>
   <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
</select>
</div>
<div class="pageno me-3">
1-14 of 50 pages
</div>
<div class="leftchivron ms-3 me-3">
<button @click="backChivron()" class="chivronbtn"><i class="fas fa-chevron-left"></i></button>
</div>
<div class="rightchivron"><button @click="forWardChivron" class="chivronbtn"><i class="fas fa-chevron-right"></i></button></div>
</div>
</base-card>
<!--for detail dialog -->
<div v-if="isDetail" class="editwraper mb-4">
<div class="dialogcontent">
<base-card>
<div class="d-flex justify-content-end">
 <button @click="addStudent" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div class="d-flex justify-content-between mt-3 me-5">
    <div class="studentInfo ms-5">
    <div class="name d-flex">
<span class="me-2">Full Name :</span>
<span>{{tvetStudentFeeDetails.full_name}}</span>
</div>
<div class="name d-flex">
<span class="me-2">ID NO :</span>
<span>{{tvetStudentFeeDetails.id}}</span>
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
 <td>{{acYear.months.Julay}}</td>
 <td>{{acYear.months.August}}</td>
 <td>{{acYear.total}}</td>
 </tr>
  </tbody>
 </table>
<div class="d-flex justify-content-end mt-3 me-1 p-3">
     <button @click="cancelDetailDialog" class="ms-auto btn addbtn">CANCEL</button>
    </div>
    </base-card>
</div>
</div>

</template>
<script>
export default {
    data() {
        return {
            isDetail:false
        }
    },
      created() {
      this.$store.dispatch('cashier/fetchTvetStudentFee')
      this.$store.dispatch('cashier/fetchTvetStudentFeeDetails')
    },
    computed:{
      tvetStudentFee(){
        return this.$store.getters['cashier/tvetStudentFees']
      },
       tvetStudentFeeDetails(){
        return this.$store.getters['cashier/tvetStudentFeeDetails']
      }
    },
    methods: {
        showDetail(id){
          this.$store.dispatch('cashier/fetchTvetStudentFeeDetails',id)
            this.isDetail = true
            document.documentElement.style.overflow = "hidden"
        },
        cancelDetailDialog(){
            this.isDetail = false
        }
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
.chivronbtn:focus{
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
</style>
