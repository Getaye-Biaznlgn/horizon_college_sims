<template>
<base-card>
<div class="d-flex justify-content-end">
 <button @click="exportTvetFeeDetail()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div id="tvetfeedetail">
          <span class="ms-5 sr-only"><u>TVET Students fee payment</u></span>
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
 <td>{{acYear.months.July}}</td>
 <td>{{acYear.months.August}}</td>
 <td>{{acYear.total}}</td>
 </tr>
  </tbody>
 </table>
 </div>
    </base-card>
</template>
<script>
export default {
    props:['id'],
    data() {
        return {
            
        }
    },
    created() {
                  this.$store.dispatch('cashier/fetchTvetStudentFeeDetails',this.id)
    },
    computed:{
         tvetStudentFeeDetails(){
        return this.$store.getters['cashier/tvetStudentFeeDetails']
      },
    },
    methods: {
        exportTvetFeeDetail(){
             this.$htmlToPaper('tvetfeedetail'); 
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
</style>