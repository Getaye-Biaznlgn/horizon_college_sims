<template>
<base-card class="px-3 mx-4 mt-3">
     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
        <div class="d-flex" v-if="studentModules.length">
            <button  @click="printGradeReport" class="btn btn-add ms-auto text-white me-2 mb-3 shadow-sm"><i class="fas fa-print me-2"></i>Print Grade Report</button> 
        </div>
    <div v-else class="mt-2">Faild to preview Students grade report. Select Students and try again please!</div> 
       
    <div id="slip">
       <div v-for="student in studentModules" :key="student.id"  style="height:260mm; overflow-y:hidden;">
           <div class="d-flex justify-content-between fw-bold">
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
              <span class=" ms-auto">Program: <u>TVET</u></span> 
           </div>
           <table class="my-2">
              <tr>
                 <th>No</th>
                 <th>Module code</th>
                 <th>Title</th>
                 <th>Tr Hr</th>
                 <th>Total</th>
               </tr>
               <tr>
               </tr>
               <tbody>
                   <tr v-for="(modul,index) in student.modules" :key="modul.id">
                     <td>{{index+1}}</td>
                     <td>{{modul.code}}</td>
                     <td>{{modul.title}}</td>
                     <td>{{modul.training_hour}}</td>
                     <td>{{modul.total}}</td>
                   </tr>
               </tbody>
           </table>
           <div v-if="!student.modules?.length" class="text-center mt-1">
               Module not found!
           </div>
       </div>
    </div>
</base-card>  
</template>

<script>
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
    props:['program_id','level_no'],
    data(){
        return{
            studentModules:[],
        }
    },
    computed:{
       ...mapGetters({studentsForGrade:'tvetHead/studentsForGrade', selectedAcademicYearId:'selectedAcademicYearId'}),
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
    async fetchGradeForLevel(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.post("/api/tvet_grade_reports",payload)
            if (response.status === 200) {
              this.studentModules=response.data
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
        this.fetchGradeForLevel({program_id:this.program_id,
               level_no:this.level_no,
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