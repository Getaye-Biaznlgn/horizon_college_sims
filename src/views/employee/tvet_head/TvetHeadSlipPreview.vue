<template>
<base-card class="px-3 mx-4 mt-3">
     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
        <div class="d-flex" v-if="studentForSlip.length">
            <button  @click="printSlip" class="btn btn-add ms-auto text-white me-2 mb-3 shadow-sm"><i class="fas fa-print me-2"></i>Print Slip</button> 
        </div>
         <div v-else class="mt-2">Faild to preview Students slip. Select Students and try again please!</div> 
    <div id="slip">
       <div v-for="slip in studentForSlip" :key="slip.id"  style="height: 256mm; overflow-y:hidden;">
        <div class="text-center fw-bold py-0 my-0">Horizon College Registration Slip</div>
           <div class="d-flex justify-content-between">
               <div>
                 <div class="fw-bold">Registrar's Copy</div>
                 <div>Full Name: <u>{{slip.first_name +' '+slip.last_name}}</u></div>
               </div>
               <div>
                 <div class="fw-bold">{{slip.program?.name}}</div>
                 <div>ID NO: {{slip.student_id}}</div>
               </div>
           </div>
           <div>
              <span class="pe-2">Department: <u>{{user.managet?.name}}</u></span> 
              <span class="pe-2">Academic Year: <u>{{getYearById.year}}</u></span> 
              <span class="pe-2">Level: <u>{{level_no}}</u></span>  
           </div>
           <table class="mt-3">
               <thead>
                   <tr>
                       <th>No</th>
                       <th>Title</th>
                       <th>Code</th>
                       <th>Training Hour</th>
                   </tr> 
               </thead>
               <tbody>
                   <tr v-for="(modul, index) in slipModules" :key="modul.id">
                       <td>{{index+1}}</td>
                       <td>{{modul.title}}</td>
                       <td>{{modul.code}}</td>
                       <td>{{modul.training_hour}}</td>
                   </tr>
               
               </tbody>
           </table>
           <div v-if="!slipModules.length" class="text-center mt-1">
               Module not found!
           </div>
           <div class="d-flex ">
              <div class="ms-auto border px-2">
               Monthly Fee:  <u>Birr {{monthlyFee}}</u> <br>
               Registration Fee:  <u>Birr {{registrationFee}} </u> <br>
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
</base-card>  
</template>
<script>
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
    props:['level_no',],
    data(){
        return{
            slipModules:[],
            monthlyFee:'',
            registrationFee:''
        }
    },
    computed:{
       ...mapGetters({studentForSlip:'tvetHead/studentForSlip', user:'user', selectedAcademicYearId:'selectedAcademicYearId'}),
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
    async fetchSlipForLevel(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.post("/api/get_module_by_level",payload)
            if (response.status === 200) {
              this.slipModules=response.data.module
              this.monthlyFee=response.data.monthlyFee
              this.registrationFee=response.data.registrationFee
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
        this.fetchSlipForLevel({
             level_no:this.level_no,
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