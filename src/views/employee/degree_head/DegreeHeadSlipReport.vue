<template>
<base-card class="px-3 mx-4 mt-3">    
<div class="d-flex">
 <div class="pe-2">
  <select v-model="programForFilter" class="form-select" aria-label="program select">
     <option v-for="program in degreePrograms" :key="program.id" v-text="program.name" :value="program.id"></option>
  </select>
 </div>   
 <div class="pe-2">
 <select v-model="yearForFilter" class="form-select" aria-label="year select">
     <option value="1">First Year</option>
     <option value="2">Second Year</option>
     <option value="3">Third Year</option>
     <option value="4">Fourth Year</option>
  </select>
 </div>
 <div class="pe-2">
  <select v-model="semesterForFilter" class="form-select" aria-label="semester select">
     <option value="1">First Semester</option>
     <option value="2">Second Semester</option>
     <option value="3">Third Semester</option>
  </select>
 </div>
 <div class="ms-auto">
     <button :disabled="!studentsForSlip.length" @click="showPreview" class="btn btn-add ms-auto text-white  shadow-sm"><i class="fas fa-sign-out-alt me-2"></i>Generate Slip</button> 
 </div>
</div>
<table class="mt-2">
  <thead>
    <tr>
     <td><input v-if="filteredStudents.length" type="checkbox" @click="toggleSelectAll($event)" :checked="rAllSelected"  class="form-check-input p-1"></td>  
      <th>NO</th>
      <th>Stud ID</th>
      <th>Full Name</th>
      <th>sex</th>
      <th>progarm</th>
      <th>Department</th>
      <th>Year</th>
      <th>Semester</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td><input type="checkbox" v-model="studentsForSlip"  @change="checkSelected($event)" :value="student" class="form-check-input p-1"></td>  
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <td>{{student.department?.name}}</td>
      <td>{{semesterForFilter}}</td>
      <td>{{student.year_no}}</td>
    </tr>
  </tbody> 
  </table>
  <p v-if="!filteredInSemester.length" class="text-center"> Students don't register for this semester!</p>
  <p v-else-if="!filteredStudents.length" class="text-center">There is no matching student</p>
</base-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
     yearForFilter:1,
     programForFilter:'',
     semesterForFilter:1,
     studentsForSlip:[],
     rAllSelected:false
    }
  },
   computed:{
     ...mapGetters({
     studentInSemesters:'degreeHead/studentInSemesters',
     selectedAcademicYearId:'selectedAcademicYearId',
     programs:'programs'}),

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
      if(this.yearForFilter!==''){
         tempStudents=tempStudents.filter((student)=>{
            return student.year_no.toString()===this.yearForFilter.toString()
         })
      }
      if(this.programForFilter!==''){
          tempStudents=tempStudents.filter((student)=>{
            return student.program.id===this.programForFilter
          })
      }
      return tempStudents 
     },
     degreePrograms(){
      return this.programs.filter((program)=>{
        return program.type==='degree'
      })
    },
},
  methods:{
    showPreview(){
        this.$store.commit('degreeHead/setStudentForSlip',this.studentsForSlip)
        this.$router.push({name:'DegreeHeadSlipPreview', 
         query:{
           program_id:this.programForFilter,
           year_no:this.yearForFilter,
           semester_no:this.semesterForFilter
        }})
    },
    checkSelected(event){
      if(this.rAllSelected && !event.target.checked){
        this.rAllSelected=false
      }
    },
    toggleSelectAll(event){
      this.rAllSelected=!this.rAllSelected
        var selected=[]
      if(event.target.checked){
         this.filteredStudents.forEach((student)=>{
         selected.push(student)
         })
      }
     this.studentsForSlip=selected
    }, 
  },
  created() {
      this.programForFilter=this.degreePrograms[0]?.id
  },
 watch:{
   degreePrograms(newValue){
     this.programForFilter=newValue[0]?.id
   },
    selectedAcademicYearId(){
      this.$store.dispatch('degreeHead/fetchStudentInSemesters')
    }
 }
}

</script>
<style scoped>
.btn-add{
    background-color: #2f4587;
}
.btn-add:hover{
  background-color: #425fb8;

}
input[type=checkbox] {
 transform: scale(1.4);
}

input[type="checkbox"]:checked{
    background-color: #2f4587;
    border: none;
}
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

.fa-sign-out-alt{
    transform: rotate(-90deg);
}


</style>