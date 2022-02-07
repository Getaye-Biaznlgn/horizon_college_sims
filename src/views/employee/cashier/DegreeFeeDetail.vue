<template>
<base-card>
<div class="innercontent">
<div class="d-flex justify-content-between">
    <span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i>Back</span>
 <button @click="printStudentFeeDetail()" class="btn me-1 addbtn">
    <span class="me-3"><i class="fas fa-upload"></i></span>
    <span>Export</span>
    </button>
    </div>
    <div id="degreefeedetail" class="mt-2">
      <span class="ms-5 sr-only"><u>Degree Students fee payment</u></span>
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
    <div class="d-flex ms-5 mt-3">
    <span>year :</span>
    <span>{{acyear.year}}</span>
    </div>
     <div class="d-flex mt-2">
    <div v-for="semester in acyear.semesters" :key="semester.no" class="mt-3 me-3 flex-fill">
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
</div>
    </base-card>
</template>
<script>
export default {
    props:['id'],
    created() {
        this.$store.commit('setIsItemLoading',true)
        this.$store.dispatch('cashier/degreeStudentFeeDetails',this.id).then(()=>{
            this.$store.commit('setIsItemLoading',false)
        })
    },
      computed:{
      degreeStudentFeeDetails(){
        return this.$store.getters['cashier/degreeStudentFeeDetails']
      },
      acYearId(){
  return this.$store.getters.acYearId
}
    },
    methods: {
          back(){
        this.$router.back()
      },
             printStudentFeeDetail(){
         this.$htmlToPaper('degreefeedetail');
      },
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
  padding: 8px;
  border: 1px solid #fff;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 7em;
    vertical-align: middle;
} 
.addbtn:hover{
    background-color:#2f4587 ;
}
</style>