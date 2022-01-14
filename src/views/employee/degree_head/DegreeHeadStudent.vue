<template>
<base-card class="px-3 mx-4 mt-3">    
<div class="d-flex">
  <div class="d-flex border rounded me-3">
      <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Search by ID" aria-label="search" aria-describedby="basic-addon2"/>
         <span  class="input-group-text search rounded-0" id="basic-addon2">
            <i class="fas fa-search"></i>
         </span>           
   </div>
  <div class="me-3">
   <select v-model="programForFilter" class="form-select" aria-label="year select">
     <option value="all">All Program</option>
     <option v-for="program in degreePrograms" :key="program.id" :value="program.id" v-text="program.name"></option>
   </select>
 </div>
  <div class="me-3">
   <select v-model="yearForFilter" class="form-select" aria-label="year select">
     <option value="all">All Year</option>
     <option value="1">First Year</option>
     <option value="2">Second Year</option>
     <option value="3">Third Year</option>
     <option value="4">Fourth Year</option>
   </select>
 </div>
  <div class="me-3">
   <select v-model="semesterForFilter" class="form-select" aria-label="year select">
     <option value="1">First semester</option>
     <option value="2">Second semester</option>
     <option value="3">Third semester</option>
   </select>
 </div>
 <div class="me-3">
   <select v-model="stateForFilter" class="form-select" aria-label="year select">
     <option value="all">All State</option>
     <option value="1">Waiting</option>
   </select>
 </div>
      <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="exportStudentData"><i class="fas fa-print me-2"></i>Print</button> 
</div>

<div id="departmentStudent">
 <div class="sr-only">
   {{ selectedAcademicYear.year+' '}}
   {{ user.manage.name+' Department '}} 
  <span v-show="programForFilter!=='all'">{{ programById(programForFilter)?.name}}</span> 
  <span v-show="yearForFilter!=='all'">{{'Year '+ yearForFilter}}</span> 
  <span>{{' Semester '+semesterForFilter}}</span>
   students
   </div>
 <table class="mt-2">
  <thead>
    <tr>
      <th>NO</th>
      <th>Stud ID</th>
      <th>Full Name</th>
      <th>sex</th>
      <th>progarm</th>
      <th>Year</th>
      <th>State</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <!-- <td>{{student.department?.name}}</td> -->
      <td>{{student.year_no}}</td>
      <!-- <td>{{semesterForFilter}}</td> -->
      <td>{{student.status}}</td>
      <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li><span role="button" @click="showDetail(student.id)" class="dropdown-item px-4 py-2">Detail</span></li>
          </ul>
        </div>
      </td>
    </tr>
 </tbody>  
</table>
</div>
<!-- <div v-if="filteredStudents.length && students.length" class="pagination d-flex justify-content-end mt-2">
    <span class="me-3 mt-1">Rows per page </span> 
    <div class="me-3">
      <select v-model="perPage" class="form-select">
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
    </select>
    </div>
     <span class="me-3 mt-2">{{currentPage}}/{{totalPages}}</span>
     <span @click="previousPage" role="button" class="me-3 mt-2">
        <i  class="fas fa-chevron-left"></i>
     </span>
      <span @click="nextPage" role="button" class="me-3 mt-2">
        <i  class="fas fa-chevron-right"></i>
     </span>
</div> -->
<p v-if="!filteredInSemester.length"> Students don't register for this semester!</p>
<p v-else-if="!filteredStudents.length">There is no matching student</p>
    </base-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
     searchValue:'',
     programForFilter:'all',
     semesterForFilter:'1',
     stateForFilter:'all', 
     yearForFilter:'all',
     
      //  for pagination
   //////  currentPage:1,
    //  perPage:1,
    }
  },
   computed:{
    //  totalPages(){
    //     return Math.ceil(this.filteredStudents.length/this.perPage)
    //  },
    //  displayPaginatedData(){
    //   let data=[...this.filteredStudents]
    //   let page=this.currentPage
    //   let perPage=this.perPage
    //   let from=(page*perPage) - perPage
    //   let to=page*perPage
    //   return data.splice(from,to)
    //   //  return this.paginateData(this.filteredStudents)
    //   //studentInSemesters
    //  },
     ...mapGetters({
       studentInSemesters:'degreeHead/studentInSemesters',
       selectedAcademicYear:'selectedAcademicYear',
        programs:'programs',
        user:'user'
        }),
        
        // selectedAcademicYear(){
        //   return this.$store.getters.selectedAcademicYear(this.selectedAcademicYearId)
        // },
        
      degreePrograms(){
      return this.programs.filter((program)=>{
        return program.type==='degree'
      })
    },
    filteredInSemester(){
      let students=[];
        this.studentInSemesters.forEach((semester)=>{
         if(semester.semester_no?.toString()===this.semesterForFilter.toString()){
           students=semester.students
         }
       })
       return students
    },
     filteredStudents(){
      let tempStudents=[...this.filteredInSemester]
      if(this.searchValue!==''){
         tempStudents=tempStudents.filter((student)=>{
            return student?.student_id?.toLowerCase().startsWith(this.searchValue.toLowerCase())
         })
      }
      if(this.yearForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.year_no.toString()===this.yearForFilter.toString()
         })
      }
   
      if(this.programForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.program.id===this.programForFilter
         })
      }
      return tempStudents 
     }
  },
  methods:{
    exportStudentData(){
       this.$htmlToPaper('departmentStudent')
    },
    previousPage(){
       if(this.currentPage>1){
          this.currentPage--
       }
    },
    programById(id){
      let prog;
     this.programs.forEach((program)=>{
       if(program.id.toString()===id.toString())
        prog=program
     })
     return prog       
    },                

    nextPage(){
     if(this.currentPage<this.totalPages){
       this.currentPage++
     }
    },
     //  setNumebrPages(){
    //   this.cu Math.ceil(this.filteredStudents.length/this.perPage)
   //  },
   showDetail(id){
     this.$router.push({name:'DegreeHeadStudentDetail', params:{studentId:id}})
   },
   paginateData(data){
     let page=this.currentPage
     let perPage=this.perPage
     let from=(page*perPage) - perPage
     let to=page*perPage
     return data.splice(from,to)
   }
  },
}
</script>
<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

/* new design change start*/
tbody > tr:last-child { border-bottom: 2px solid hsl(231, 16%, 91%) }
th{
  text-align: left;
  padding: 8px;
}
tr{
  border-top: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
/* end */
.search{
  cursor: pointer;
}
.search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.btn-add{
    background-color: #2f4587;
}
.btn-add:hover{
  background-color: #425fb8;
}
</style>