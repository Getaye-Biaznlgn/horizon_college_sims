<template>
<base-card class="px-3 mx-4 mt-3">    

<div class="d-flex">
 <div class="pe-2">
  <select v-model="programForFilter" class="form-select" aria-label="program select">
     <option v-for="program in degreePrograms" :key="program.id" v-text="program.name" :value="program.id"></option>
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
     <button :disabled="!studentsForSlip.length" @click="showPreview" class="btn btn-add ms-auto text-white  shadow-sm"><i class="fas fa-sign-out-alt me-2"></i>Generate Slip</button> 
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
  <tbody>
    <!-- <tr v-for="(student,index) in filteredStudents" :key="student.id">
      <td><input type="checkbox" v-model="studentsForSlip"  @change="checkSelected($event)" :value="student" class="form-check-input p-1"></td>  
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.program?.name}}</td>
      <td>{{student.department?.name}}</td>
      <td>{{semesterForFilter}}</td>
      <td>{{student.year_no}}</td>
    </tr> -->
        <table-row v-for="n in 10" :key="n" col1="1" col2="2" col3="3" col4="4" col5="5" col6="6" col7="7"></table-row>

  </tbody> 
  </table>
  <p v-if="!filteredInLevels.length"> Students don't register for this semester!</p>
  <p v-else-if="!filteredStudents.length">There is no matching student</p>
</base-card>
</template>
<script>
import TableRow from '../../../components/employee/TableRow.vue'
import { mapGetters } from 'vuex'
export default {
    components:{
       TableRow
    },
  data() {
    return {
     levelForFilter:1,
     programForFilter:'',
     studentsForSlip:[],
     rAllSelected:false
    }
  },
   computed:{
     ...mapGetters({
     studentInLevels:'tvetHead/studentInLevels',
     programs:'programs'}),

    filteredInLevels(){
      let students=[];
        this.studentInLevels.forEach((semester)=>{
         if(semester.semester_no?.toString()===this.semesterForFilter.toString()){
           students=semester.students
         }
       })
       return students
    },
     filteredStudents(){
      let tempStudents=[...this.filteredInLevels]
      if(this.levelForFilter!==''){
         tempStudents=tempStudents.filter((student)=>{
            return student.year_no.toString()===this.levelForFilter.toString()
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
           year_no:this.levelForFilter,
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