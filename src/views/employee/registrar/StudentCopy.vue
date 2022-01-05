<template>
<base-card>
<span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i></span>
<div class="d-flex">
     <div class="studenttype col-sm-3 ms-3 me-5">
    <span class="mt-3 mb-3">Student Type</span>
    <select class="form-select form-select-sm mt-1" aria-label=".form-select-sm example" v-model="student_type">
  <option selected value="degree"><strong>Degree</strong></option>
  <option value="tvet"><strong>TVET</strong></option>
</select>
    </div>
 <div class="mt-2 ms-auto me-3 search">
     <span>Student ID</span>
    <div class="input-group input-group-sm mt-1 searchdiv">
  <input type="text" class="form-control searchinput" aria-label="Sizing example input" placeholder="Student ID" aria-describedby="inputGroup-sizing-sm" v-model="studId" @keyup.enter="searchStudentById()">
  <span @click="searchStudentById()" class="input-group-text searchbtn" id="inputGroup-sizing-sm">
        <span v-if="isLoading"><span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Searching</span>      
            <span v-else>Search</span>
    </span>
</div>
    </div>
<div class="d-flex"> <button @click="exportStudentCopy()" class="btn p-1 ms-auto exportbtn"></button></div>
</div>
 <div class="d-flex justify-content-between mt-2">
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
    <span>{{studentSemesters.program.name}}</span>
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
      <th class="text-white p-3">Semester</th>
      <th class="text-white p-3">Year</th>
      <th class="text-white p-3">Time</th>
      <th class="text-white p-3">State</th>
      <th class="text-white p-3">GPA</th>
      <th class="text-white p-3"></th>
      </tr>
      </thead>
  <tbody v-if="studentSemesters.semesters.length">
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
             <li><span @click="enterResult(semester.id)" class="dropdown-item px-4 py-2">Enter Result</span></li>
             <li><span @click="viewCourse(semester.id)"  class="dropdown-item px-4 py-2">View Course</span></li>
          </ul>
        </div>
  </td>
  </tr>
  </tbody>
    <div v-else class="mt-4 ms-5 mb-5">
    <span class="error">There is no semester data found</span>
  </div>
    </table>
    <div class="d-flex justify-content-end mt-5 mb-1"> 
    <button @click="registerForSemester()" class="btn ms-3 me-1 p-1 register addbtn">Register for New Semester</button>
    </div>
</base-card>
</template>
<script>
//import apiClient from '../../../store/baseUrl';
export default {
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
      exportStudentCopy(){},
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
}
.exportbtn:hover{
    background-color: #366ad9;

}
</style>