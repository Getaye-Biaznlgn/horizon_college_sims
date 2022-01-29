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
     <option v-for="program in tvetPrograms" :key="program.id" :value="program.id" v-text="program.name"></option>
   </select>
 </div>
  <div class="me-3">
   <select v-model="levelForFilter" class="form-select" aria-label="year select">
     <option value="1">Level 1</option>
     <option value="2">Level 2</option>
     <option value="3">Level 3</option>
     <option value="4">Level 4</option>
   </select>
 </div>
 
 <div class="me-3">
   <select v-model="statusForFilter" class="form-select" aria-label="year select">
     <option value="all">All State</option>
     <option value="waiting">Waiting</option>
     <option value="approved">Approved</option>
   </select>
 </div>
      <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="exportStudentData"><i class="fas fa-print me-2"></i>Print</button> 
</div>

<div id="departmentStudent">
 <div class="sr-only">
   {{ getYearById?.year+' '}}
   {{ user.managet?.name+' Department '}} 
  <span v-show="programForFilter!=='all'">{{ programById(programForFilter)?.name}}</span> 
  <span v-show="levelForFilter!=='all'"></span> 
  <span>{{' Level '+levelForFilter}}</span>
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
<p v-if="!filteredInLevel.length" class="text-center"> Students don't register for this level!</p>
<p v-else-if="!filteredStudents.length" class="text-center">There is no matching student</p>
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
     statusForFilter:'all', 
     levelForFilter:'1',
    }
  },
   computed:{
     ...mapGetters({
       studentInLevels:'tvetHead/studentInLevels',
       selectedAcademicYearId:'selectedAcademicYearId',
       programs:'programs',
       user:'user'
        }),
      getYearById(){
         return this.$store.getters.getYearById(this.selectedAcademicYearId)
      } ,  
      tvetPrograms(){
      return this.programs.filter((program)=>{
        return program.type==='tvet'
      })
    },
    filteredInLevel(){
      let students=[];
        this.studentInLevels.forEach((level)=>{
         if(Number(level.level_no)===Number(this.levelForFilter)){
           students=level.students
         }
       })
       return students
    },
     filteredStudents(){
      let tempStudents=[...this.filteredInLevel]
      if(this.searchValue!==''){
         tempStudents=tempStudents.filter((student)=>{
            return student.student_id.toLowerCase().startsWith(this.searchValue.toLowerCase())
         })
      }
     
      if(this.statusForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return student.status.toString().toLowerCase()===this.statusForFilter.toLowerCase()
         })
      }
       if(this.programForFilter!=='all'){
         tempStudents=tempStudents.filter((student)=>{
            return Number(student.program?.id)===Number(this.programForFilter)
         })
      }
      return tempStudents 
     }
  },
  methods:{
    exportStudentData(){
       this.$htmlToPaper('departmentStudent')
    },
    programById(id){
      let prog;
     this.programs.forEach((program)=>{
       if(program.id.toString()===id.toString())
        prog=program
     })
     return prog       
    },                

   showDetail(id){
     this.$router.push({name:'TvetHeadStudentDetail', params:{studentId:id}})
   },

  },
  created(){
    if(this.program){
      let programId=this.tvetPrograms.find((program)=>{
        return program.name?.toLowerCase()===this.program.toLowerCase()
      })?.id
      this.programForFilter=programId
    }
  }
}
</script>

