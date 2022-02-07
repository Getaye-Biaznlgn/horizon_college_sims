<template>
<div class="bg-white">
  <div class="mt-2"><span @click="back()" class="backarrow ms-3"><i class="fas fa-arrow-left"></i></span></div>
<div class="d-flex align-items-center mt-3">
     <div class="studenttype ms-3 w-25">
    <span class="mb-3">Student Type</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" v-model="student_type">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
 <div class="ms-auto me-5 search">
     <span>Student ID</span>
    <div class="input-group input-group-sm">
  <input type="text" class="form-control searchinput" aria-label="Sizing example input" placeholder="Student ID" aria-describedby="inputGroup-sizing-sm" v-model="studId" @keyup.enter="searchStudentById()">
  <span @click="searchStudentById()" class="input-group-text searchbtn" id="inputGroup-sizing-sm">
        <span v-if="isLoading"><span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Searching</span>      
            <span v-else>Search</span>
    </span>
</div>
    </div>
    <div class="mt-3">
   <button @click="exportStudentCopy()" class="btn p-1 ms-auto exportbtn">export</button>
   </div>
</div>
<div id="studentCopy">
 <div class="d-flex justify-content-between mt-5">
    <div class="ms-5">
    <div class="d-flex">
    <span><strong>Student Name:</strong></span>
    <span>{{studentSemesters.name}}</span>
    </div>
    <div class="d-flex mt-2">
     <span><strong>ID NO: </strong></span>
    <span>{{studentSemesters.student_id}}</span>
    </div>
     <div class="d-flex mt-2">
     <span><strong>Sex: </strong></span>
    <span>{{studentSemesters.sex}}</span>
    </div>
    </div>
    <div class="deptandprogram me-5">
    <div class="d-flex">
    <span><strong>Department : </strong></span>
    <span>{{studentSemesters.department}}</span>
    </div>
    <div class="d-flex mt-2">
    <span><strong>Program : </strong></span>
    <span>{{studentSemesters.program?.name}}</span>
    </div>
        <div class="d-flex mt-2">
    <span><strong>Year : </strong></span>
    <span>{{studentSemesters.current_year_number}}</span>
    </div>
    </div>
    </div>
      <table class="mt-4">
  <thead>
      <tr class="table-header">
      <th class="p-3">Semester</th>
      <th class="p-3">Year</th>
      <th class="p-3">Time</th>
      <th class="p-3">State</th>
      <th class="p-3">GPA</th>
      <th class="p-3"></th>
      </tr>
      </thead>
  <tbody>
  <tr v-for="semester in studentSemesters.semesters" :key="semester.start_date">
  <td>{{semester.year_no+' year '+semester.semester_no+' semester'}}</td>
  <td>{{semester.year}}</td>
  <td>{{semester.start_date+' to '+semester.end_date}}</td>
  <td>{{semester.status}}</td>
  <td>{{semester.GPA}}</td>
  <td>
      <div class="dropdown me-5 p-1">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <!-- <li><span @click="enterResult(semester.id)" class="dropdown-item px-4 py-2">Enter Result</span></li>
             <li><span @click="viewCourse(semester.id)"  class="dropdown-item px-4 py-2">View Course</span></li> -->
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    </table>
     <div v-if="!studentSemesters.semesters?.length" class="mt-4 ms-5 mb-5 pb-2">
    <span class="error text-center">There is no Student Copy found</span>
  </div>
</div>
</div>
</template>
<script>
//import apiClient from '../../../store/baseUrl';
export default {
  data() {
    return {
      student_type:'degree',
      studId:'',
      isLoading:''
    }
  },
     computed:{
        studentSemesters(){
        return this.$store.getters['registrar/degreeStudentDetail']
        },
           studentLevels() {
      return this.$store.getters["registrar/tvetStudentDetail"];
    },
    acYearId(){
    return this.$store.getters.acYearId
    }
     },
     methods: {
          back(){
        this.$router.back()
      },
      exportStudentCopy(){
        this.$htmlToPaper('studentCopy')
      },
     async searchStudentById(){
      // try{
      //   var response = await apiClient.get('api/student_copy')
      // }
      // catch(e){
      //   console.log('')
      // }
      }
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
.exportbtn{
    background-color: #2f4587;
    width: 7em;
    color: #fff;
}
.exportbtn:hover{
    background-color: #366ad9;

}
</style>