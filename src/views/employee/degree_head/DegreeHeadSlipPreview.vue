<template>
<base-card class="px-3 mx-4 mt-3">

     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
        <div class="d-flex" v-if="studentForSlip.length">
            <button  @click="printSlip" class="btn btn-add ms-auto text-white me-2 mb-3 shadow-sm"><i class="fas fa-print me-2"></i>Print Slip</button> 
        </div>
        
         <div v-else class="mt-2">Faild to preview Students slip. Select Students and try again please!</div> 
    <div id="slip">
       <div v-for="slip in studentForSlip" :key="slip.id"  style="height: 256mm; overflow-y:hidden;">
        <div v-for="n in 2" :key="n">
        <div class="text-center fw-bold py-0 my-0">Horizon College Registration Slip</div>
           <div class="d-flex justify-content-between">
               <div>
                 <div class="fw-bold">Registrar's Copy</div>
                 <div>Full Name: <u>{{slip.first_name +' '+slip.last_name}}</u></div>
               </div>
               <div>
                 <div class="fw-bold">{{slip?.program?.name}}</div>
                 <div>ID NO: {{slip.student_id}}</div>
               </div>
           </div>
           <div>
              <span class="pe-2">Department: <u>{{user.manage?.name}}</u></span> 
              <span class="pe-2">Academic Year: <u>{{getYearById.year}}</u></span> 
              <span class="pe-2">Year: <u>{{year_no}}</u></span>  
              <span class="pe-2">Semester: <u>{{semester_no}}</u></span> 
           </div>
           <table class="mt-3">
               <tbody>
                   <tr v-for="(course, index) in slipCourses" :key="course.id">
                       <td>{{index+1}}</td>
                       <td>{{course.title}}</td>
                       <td>{{course.code}}</td>
                       <td>{{course.cp}}</td>
                   </tr>
                   <tr>
                       <td colspan="3" class="text-center">Total Credit Hrs</td>
                       <td>{{totalCP}}</td>
                   </tr>
               </tbody>
           </table>
           <div class="d-flex ">
              <div class="ms-auto border px-2">
               Tuition Fee: <u>Birr {{cpFee*totalCP}}</u> <br>
               Registration fee: <u>Birr {{registrationFee}} </u> <br>
               Total Fee: <u>Birr {{(cpFee*totalCP)+registrationFee}}</u> <br>
             </div>
           </div>
           <div class="footer my-2 d-flex justify-content-evenly">
               <div>
                  ___________________ <br>
                   Student Signature
               </div>
               <div>
                  ___________________ <br>
                    Advisor Signature
               </div> 
               <div>
                  ____________________ <br> 
                  Registrar's Office
               </div> 
                <div>
                  ___________________ <br>
                         Date
               </div> 
               
           </div>
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
            slipCourses:[],
            cpFee:'',
            registrationFee:''
        }
    },
    computed:{
       ...mapGetters({studentForSlip:'degreeHead/studentForSlip', selectedAcademicYearId:'selectedAcademicYearId', user:'user'}),
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
        printSlip(){
          this.$htmlToPaper('slip')
        },
    async fetchSlipForSemester(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.post("/api/get_course_by_semester",payload)
            if (response.status === 200) {
              this.slipCourses=response.data.course
              this.cpFee=response.data.cpFee
              this.registrationFee=response.data.registrationFee
              console.log('slipdata', response.data)
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
        this.fetchSlipForSemester({program_id:this.program_id,
                                   year_no:this.year_no,
                                   semester_no:this.semester_no,
                                   academic_year_id:this.selectedAcademicYearId
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
th{
  text-align: left;
  padding: 8px;
}
td,tr{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.back{
  font-size: 20px;
  color: #366ad3;
}
</style>