<template>
    <base-card>
    <div class="d-flex justify-content-end">
    <button @click="addStudent" class="btn me-1 p-2 addbtn">Add New Student</button>
    </div>
    <div class="d-flex justify-content-between">
     <div class="input-group mt-3 search">
  <span class="searchicon input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
  <input type="text" class="form-control px-0" placeholder="Search By Student ID" aria-label="Username" aria-describedby="addon-wrapping">
</div>
  <div class="d-flex justify-content-end mt-3">
    <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="sex" @change="filterStudent($event,'sex')">
  <option selected disabled>sex</option>
  <option value="female">female</option>
  <option value="male">male</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="programType" @change="filterStudent($event,'program_type')">
  <option selected disabled>program</option>
  <option value="regular">Regular</option>
  <option value="extension">Extension</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="department" @change="filterStudent($event,'department')">
  <option selected disabled>Department</option>
  <option value="management">Management</option>
  <option value="accounting">Accounting</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="year" @change="filterStudent($event,'year')">
  <option selected disabled>Year</option>
  <option value="1">First</option>
  <option value="2">Second</option>
  <option value="3">Third</option>
  <option value="4">Fourth</option>
  </select>
</div>
<div class="mb-3">
<select class="form-select form-select-sm" aria-label="Default select example" ref="semester" @change="filterStudent($event,'semester')">
  <option selected disabled>Semester</option>
  <option value="first">First</option>
  <option value="second">Second</option>
  </select>
</div>
  </div>
    </div>
     <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white">NO</th>
       <th class="text-white">Stud ID</th>
      <th class="text-white">Full Name</th>
      <th class="text-white">sex</th>
      <th class="text-white">progarm</th>
      <th class="text-white">Department</th>
      <th class="text-white">Year</th>
      <th class="text-white">Semester</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="n in 10" :key="n">
      <td>1</td>
      <td>HCM123</td>
      <td>Kassahun Worku</td>
      <td>Male</td>
      <td>Regular</td>
      <td>Management</td>
      <td>Third</td>
      <td>Second</td>
       <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li><span @click="editTeacher('edit')" class="dropdown-item px-4 py-2">edit</span></li>
              <hr class="w-100 mb-0 mt-0">
             <li><span @click="deleteTeacher()" class="dropdown-item px-4 py-2">delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
    <!--
     <tr v-for="(teacher,index) in teacherList" :key="teacher.id">
      <td>{{index+1}}</td>
      <td>{{teacher.first_name+" "+teacher.last_name}}</td>
      <td>{{teacher.phone_no}}</td>
      <td>{{teacher.email}}</td>
      <td>{{teacher.type}}</td>
      <td>{{teacher.profession}}</td>
       <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="editTeacher(teacher,'edit')" class="dropdown-item px-4 py-2">edit</span></li>
             <li><span @click="deleteTeacher(teacher.id)" class="dropdown-item px-4 py-2">delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
    -->
  </tbody>
   
</table>
    </base-card>
</template>
<script>
export default {
  data() {
    return {
    //    sex:'',
    // programType:'',
    // department:'',
    // year:'',
    // semester:'',
     degreeStudentList:[],
    }
  },
   computed:{
    // degreeStudents(){
    //   return this.$store.getters['student/degreeStudents']
    // }
  },
  created() {
    // this.degreeStudentList = this.degreeStudents
  },
      methods: {
      addStudent(){
        this.$router.push({name:'DegreeStudentRegistration'})
      },
         filterStudent(event,property){
           console.log('value = '+event.target.value+' property = '+property)
//            this.degreeStudentList = this.degreeStudents.filter((student)=>{
//             return event.target.value === student[property]
// })
      }
    },
}
</script>
<style scoped>
.addbtn{
    background-color: #ff9500;
    color: #fff;
    width: 10em;

} 
.addbtn:hover{
    background-color:#eca643 ;
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
select{
    border-radius: 0;
    border: 2px solid rgb(179, 176, 176);
}
.search{
    width: 22%;
    height: 40px;
    border: 2px solid rgb(179, 176, 176);
}
.search input{
   border-radius: 0;
    border-left: 2px solid #fff;
}
.search span{
    border-radius: 0;
     background-color: #fff;
     border-right: 2px solid #fff;
}
.searchicon{
  cursor: pointer;
}
</style>