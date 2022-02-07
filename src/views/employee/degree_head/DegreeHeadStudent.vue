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
   <!-- <select v-model="stateForFilter" class="form-select" aria-label="year select">
     <option value="all">All State</option>
     <option value="1">Waiting</option>
   </select> -->
 </div>
      <button class="btn btn-add ms-auto text-white  shadow-sm" @click="exportStudentData"><i class="fas fa-sign-out-alt me-2"></i>Export</button> 
</div>

<div id="departmentStudent">
 <div class="sr-only">
   {{ getYearById?.year+' '}}
   {{ user.manage?.name+' Department '}} 
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
    <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <td>{{student.year_no}}</td>
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
</table>
</div>
<p v-if="!filteredInSemester.length" class="text-center mt-1" > Students don't register for this semester!</p>
<p v-else-if="!filteredStudents.length" class="text-center mt-1">There is no matching student</p>
    </base-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props:['program'],
  data() {
    return {
     searchValue:'',
     programForFilter:'all',
     semesterForFilter:'1',
     stateForFilter:'all', 
     yearForFilter:'all',
    
    }
  },
   computed:{
     ...mapGetters({
       studentInSemesters:'degreeHead/studentInSemesters',
       selectedAcademicYearId:'selectedAcademicYearId',
        programs:'programs',
        user:'user'
        }),

      getYearById(){
        return this.$store.getters.getYearById(this.selectedAcademicYearId)
      },
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
  created(){
    if(this.program){
      let programId=this.degreePrograms.find((program)=>{
        return program.name?.toLowerCase()===this.program.toLowerCase()
      })?.id
      this.programForFilter=programId
    }
  },
  watch:{
    selectedAcademicYearId(){
      this.$store.dispatch('degreeHead/fetchStudentInSemesters')
    }
  }
}
</script>