<template>
<base-card class="px-3 mx-4 mt-3">    

<div class="d-flex">
 <div class="pe-2">
  <select v-model="programForFilter" class="form-select" aria-label="program select">
     <option v-for="program in tvetPrograms" :key="program.id" v-text="program.name" :value="program.id"></option>
  </select>
 </div>
 <div class="pe-2">
 <select v-model="levelForFilter" class="form-select" aria-label="year select">
     <option value="1">Level I</option>
     <option value="2">Level II</option>
     <option value="3">Level III</option>
     <option value="4">Level IV</option>
  </select>
 </div>
 <div class="ms-auto">
     <button :disabled="!studentsForGrade.length" @click="showPreview" class="btn btn-add ms-auto text-white  shadow-sm"><i class="fas fa-sign-out-alt me-2"></i>Generate Grade Report</button> 
 </div>
</div>
<table class="mt-2">
  <thead>
    <tr>
     <td><input v-if="filteredStudents.length" type="checkbox" @click="toggleSelectAll($event)" :checked="rAllSelected"  class="form-check-input p-1"></td>  
      <th>NO</th>
      <th>Student ID</th>
      <th>Full Name</th>
      <th>Sex</th>
      <th>Progarm</th>
      <th>Level</th>
    </tr>
  </thead>
    <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td><input type="checkbox" v-model="studentsForGrade"  @change="checkSelected($event)" :value="student.id" class="form-check-input p-1"></td>  
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <td>{{levelForFilter}}</td>
    </tr>
 </table>
  <p v-if="!filteredInLevels.length" class="text-center"> Students don't register for this level!</p>
  <p v-else-if="!filteredStudents.length" class="text-center">There is no matching Student!</p>
</base-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
   
  data() {
    return {
     levelForFilter:1,
     programForFilter:'',
     studentsForGrade:[],
     rAllSelected:false
    }
  },
   computed:{
     ...mapGetters({
     studentInLevels:'tvetHead/studentInLevels',
     programs:'programs'}),

    filteredInLevels(){
      let students=[];
        this.studentInLevels.forEach((level)=>{
         if(Number(level.level_no)===Number(this.levelForFilter)){
           students=level.students
         }
       })
       return students
    },
    
     filteredStudents(){
      let tempStudents=[...this.filteredInLevels]

      if(this.programForFilter!==''){
          tempStudents=tempStudents.filter((student)=>{
            return Number(student.program?.id) ===Number(this.programForFilter)
          })
      }
      return tempStudents 
     },
     tvetPrograms(){
      return this.programs.filter((program)=>{
        return program.type==='tvet'
      })
    },
},
  methods:{
  showPreview(){
        this.$store.commit('tvetHead/setStudentsForGrade',this.studentsForGrade)
        this.$router.push({name:'TvetHeadGradeReportPreview', 
         query:{
           program_id:this.programForFilter,
           level_no:this.levelForFilter,
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
         selected.push(student.id)
         })
      }
     this.studentsForGrade=selected
    }, 
  },
  created() {
      this.programForFilter=this.tvetPrograms[0]?.id
  },
 watch:{
   tvetPrograms(newValue){
     this.programForFilter=newValue[0]?.id
   }
 }
}
</script>
<style scoped>
input[type=checkbox] {
 transform: scale(1.3);
}
input[type="checkbox"]:checked{
    background-color: #2f4587;
    border: none;
}
.fa-sign-out-alt{
    transform: rotate(-90deg);
}
</style>