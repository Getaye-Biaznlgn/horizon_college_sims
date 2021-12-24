<template>
    <base-card>
    <div class="d-flex justify-content-end">
    <button @click="addStudent" class="btn me-1 p-2 addbtn">Add New Student</button>
    </div>
    <div class="d-flex justify-content-between">
     <div class="input-group mt-3 search w-25">
  <input type="text" class="form-control px-0" placeholder="Search By Student ID" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId">
   <span @click="searchById()" class="searchicon input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div class="d-flex mt-3">
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="program" @change="filterByProgram">
  <option v-for="program in degreePrograms" :key="program.id" :value="program.id">{{program.name}}</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="department" @change="filterByDepartment">
  <option v-for="department in degreeDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" v-model="year" @change="filterByYear">
  <option value="1">First</option>
  <option value="2">Second</option>
  <option value="3">Third</option>
  <option value="4">Fourth</option>
  </select>
</div>
<div class="mb-3">
<select class="form-select form-select-sm" aria-label="Default select example" v-model ="semester" @change="filterBySemester">
  <option value="1">First</option>
  <option value="2">Second</option>
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
     <tr v-for="(student,index) in degreeStudentList" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.id}}</td>
      <td>{{student.first_name+" "+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program.name}}</td>
      <td>{{student.degree_department.name}}</td>
      <td>{{student.current_year_no}}</td>
      <td>{{student.current_semester_no}}</td>
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
  </tbody>
   
</table>
    </base-card>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
     degreeStudentList:[],
     sex:'male',
     program:'5',
     department:'4',
     year:'1',
     semester:'1',
     studentList:[],
     studentId:''
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
//     filteredStudents(){
//       var allStudents = this.degreeStudents
//    var filteredByProgram =  allStudents.filter((student)=>{
//             return this.program === student.program_id
// })
// var filteredByDepartment = filteredByProgram.filter((student)=>{
//             return Number(this.department) === Number(student.degree_department_id)
// })
//  var filterdByYear = filteredByDepartment.filter((student)=>{
//             return this.year === student.current_year_no
// })
// var filterdBySemester = filterdByYear.filter((student)=>{
//             return this.semester === student.current_semester_no
// });
//       return filterdBySemester
//     }
  },
  created() {
    this.degreeStudentList = this.degreeStudents
  },
      methods: {
      addStudent(){
        this.$router.push({name:'DegreeStudentRegistration'})
      },
       filterByProgram(event){
           this.degreeStudentList = this.degreeStudents.filter((student)=>{
            return Number(event.target.value) === Number(student.program_id)
})
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
      searchById(){
        this.degreeStudentList = this.degreeStudents.find(student=>{
          return this.studentId === student.id
        })
      }
    }
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
</style>