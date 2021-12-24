<template>
    <base-card>
    <div class="d-flex justify-content-end">
    <button @click="addStudent" class="btn me-1 p-2 addbtn">Add New Student</button>
    </div>
    <div class="d-flex justify-content-between">
     <div class="input-group mt-3 search w-25">
     <input type="text" class="form-control" placeholder="Search By Student ID" aria-label="Username" aria-describedby="addon-wrapping" v-model="studentId">
  <span @click="searchById" class="input-group-text searchbtn" id="addon-wrapping"><i class="fas fa-search"></i></span>
</div>
  <div class="d-flex justify-content-end mt-3">
    <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="sex" @change="filterBySex($event)">
  <option selected disabled>sex</option>
  <option value="female">female</option>
  <option value="male">male</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="program_type" @change="filterByProgram($event)">
  <option selected disabled>program</option>
  <option v-for="program in tvetPrograms" :key="program.id" :value="program.id">{{program.name}}</option>
  </select>
</div>
 <div class="mb-3 me-4">
<select class="form-select form-select-sm" aria-label="Default select example" ref="department" @change="filterByDepartment($event)">
  <option selected disabled>Department</option>
  <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
  </select>
</div>
 <div class="mb-3">
<select class="form-select form-select-sm" aria-label="Default select example" ref="year" @change="filterByLevel($event)">
  <option selected disabled>Level</option>
  <option value="1">First</option>
  <option value="2">Second</option>
  <option value="3">Third</option>
  <option value="4">Fourth</option>
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
      <th class="text-white">Level</th>
       <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(student,index) in tvetStudents" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.id}}</td>
      <td>{{student.first_name+" "+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program.name}}</td>
      <td>{{student.tvet_department.name}}</td>
      <td>{{student.current_level_no}}</td>
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
       tvetStudentList:[],
       studentId:''
       }
   },
    computed:{
      ...mapGetters('dean',['tvetDepartments','tvetPrograms']),
    tvetStudents(){
      return this.$store.getters['registrar/tvetStudents']
    }
  },
  created() {
  this.tvetStudentList = this.tvetStudents
  },
      methods: {
      addStudent(){
        this.$router.push({name:'TvetStudentRegistration'})
      },
             filterBySex(event){
           this.tvetStudentList = this.tvetStudents.filter((student)=>{
            return event.target.value === student.sex
})
      },
       filterByProgram(event){
           this.tvetStudentList = this.tvetStudents.filter((student)=>{
            return Number(event.target.value) === Number(student.program_id)
})
      },
       filterByDepartment(event){
           this.tvetStudentList = this.tvetStudents.filter((student)=>{
            return Number(event.target.value) === Number(student.degree_department_id)
})
      },
       filterByYear(event){
           this.tvetStudentList = this.tvetStudents.filter((student)=>{
            return event.target.value === student.current_year_no
})
      },
       filterBySemester(event){
           this.tvetStudentList = this.tvetStudents.filter((student)=>{
            return event.target.value === student.current_semester_no
})
      },
      searchById(){
     this.tvetStudents.forEach((student)=>{
        if(this.studentId === student.id){
          this.tvetStudentList = student
          console.log('searched student = '+ this.student)
        }
          return
})
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