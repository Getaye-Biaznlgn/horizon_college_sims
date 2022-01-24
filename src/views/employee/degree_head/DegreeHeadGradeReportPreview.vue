<template>
<base-card class="px-3 mx-4 mt-3">
     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
        <div class="d-flex" v-if="studentCourses.length">
            <button  @click="printGradeReport" class="btn btn-add ms-auto text-white me-2 mb-3 shadow-sm"><i class="fas fa-print me-2"></i>Print Grade Report</button> 
        </div>
    <div v-else class="mt-2">Faild to preview Students grade report. Select Students and try again please!</div> 
       
    <div id="slip">
       <div v-for="student in studentCourses" :key="student.id"  style="height:260mm; overflow-y:hidden;">
           <div class="d-flex justify-content-between fw-bold my-2">
             <div>
                Horizon College<br>
                College of the Registrar <br>
                Student Academic Record
              </div>
              <div>
                  P.O.Box:927 Bahir Dar, Ethiopia<br>
                  Tel: +251583208997<br>
                  E-mail: horizoncollege@gmail.com <br>
                  Medium of Instruction: English
              </div>
           </div>
           <div class="basic-info">
               <div class="d-flex">
                  <span class="">Full Name: <u>{{student.first_name+' '+student.last_name}}</u></span> 
                  <span class="ms-auto">Sex: {{student.sex?.toString().substring(0,1)}} </span>
                  <span class="ms-auto">ID No: <u>{{student.student_id}}</u></span>
                  <span class="ms-auto">Admission Classification: <u>{{student.program}}</u> </span>
               </div>
           </div>
           <div class="d-flex mt-1">
              <span class="pe-2">Department: <u>{{student.department_name}}</u></span> 
              <span class=" ms-auto">Date of Admission: <u>{{student.addmission_year}}</u></span> 
              <span class=" ms-auto">Date of Award: <u></u></span>  
              <span class=" ms-auto">Program: <u>Degree</u></span> 
           </div>
           <table class="my-2">
              <tr>
                 <th>No</th>
                 <th>Course code</th>
                 <th>Title</th>
                 <th>Letter Grade</th>
                 <th>Cr.hr</th>
                 <th>Grade Point</th>
               </tr>
               <tr>
                  <th class="text-center" colspan="6">Year {{year_no}} Semester {{semester_no}} A Year: </th>
               </tr>
               <tbody>
                   <tr v-for="(course,index) in student.courses" :key="course.id">
                     <td>{{index+1}}</td>
                     <td>{{course.code}}</td>
                     <td>{{course.title}}</td>
                     <td>{{course.letter_grade}}</td>
                     <td>{{course.cp}}</td>
                     <td>{{course.grade_point}}</td>
                   </tr>
               </tbody>
           </table>
           <div>
               Semester Total Cr Hr: {{student.total_credit_hour}} <br>
               Total Grade Point: {{student.semester_grade_point}}<br>
               Total Cr.Hr: {{student.total_credit_hour}}<br>
               Semester Average: {{student.CGPA?.toString().substring(0,4)}}<br>
               Previous Total: {{student.previous_total}}<br>
               Comulative Average: {{student.CGPA?.toString().substring(0,4)}}<br>  
           </div>
       </div>
    </div>
</base-card>  
</template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
    props:['program_id','year_no','semester_no'],
    data(){
        return{
            studentCourses:[],
        }
    },
    computed:{
       ...mapGetters({studentsForGrade:'degreeHead/studentsForGrade', selectedAcademicYearId:'selectedAcademicYearId'}),
       totalCP(){
           let totalCP=0
           this.slipCourses.forEach((course)=>{
              totalCP+=course.cp
          })
          return totalCP
       },
    getYearById(){
      return this.$store.getters.getYearById(this.selectedAcademicYearId)
  }
  },
    methods:{
        back(){
            this.$router.back()
        },
        printGradeReport(){
          this.$htmlToPaper('slip')
        },
    async fetchGradeForSemester(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.post("/api/grade_reports",payload)
            if (response.status === 200) {
              this.studentCourses=response.data
              console.log('grade report load data', response.data)
              } else {
                throw 'faild to load course for slip'
            }
        } catch {
           //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      }
    },
    created(){
        this.fetchGradeForSemester({program_id:this.program_id,
               year_no:this.year_no,
               semester_no:this.semester_no,
               academic_year_id:this.selectedAcademicYearId,
               student_ids:this.studentsForGrade
               })
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#6ab187 ;
}
.back{
  font-size: 20px;
  color: #366ad3;
}
th,tr,
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>