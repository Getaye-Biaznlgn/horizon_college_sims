<template>
    <div class="px-0 mx-0 mt-0">
        <div class="position-relative">
            <img src="../../../assets/dashboard_header.png" alt=""  height="200" class="img-fluid">
            <div class="position-absolute top-0 start-0 ms-2 mt-2 text-white">
                <p class="fw-bold">Well come Dear {{user.first_name}}!</p>
                <p class="small">I wish you good day and enjoy your time.</p>
            </div> 
        </div>
        <div class="cards d-flex position-relative justify-content-between mx-2">
            <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total TVET Students</span>
                <span class="fw-bold d-block text-center">{{dashboardData.total_tvet_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Degree Students</span>
                <span class="fw-bold d-block text-center">{{dashboardData.total_degree_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New TVET Students</span>
                <span class="fw-bold d-block text-center">{{dashboardData.new_tvet_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New Degree Students</span>
                <span class="fw-bold d-block text-center">{{dashboardData.new_degree_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1 mx-4">Total COC</span>
                <span class="fw-bold d-block text-center">{{dashboardData.total_coc}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Current COC Students</span>
                <span class="fw-bold d-block text-center">{{dashboardData.current_coc_students}}</span>
            </div>
        </div>
        <div class="row  mb-3 mt-4">
          
          <div class="col-lg-6">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span>Regular Teachers</span>
                <a @click="$router.push({name:'AddTeacher', query:{type:'regular'}})" role="button" class="nav-link fw-bold py-0 pe-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                             <th>Phone</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(teacher, index) in regularTeachers" :key="teacher.id">
                              <td>{{index+1}}</td>
                              <td>{{teacher.first_name+' '+teacher.last_name}}</td>
                              <td>{{teacher.phone_no}}</td>
                         </tr>
                     </tbody>
                 </table>
                   <div v-if="!regularTeachers.length" class="text-center mt-1">There is no available record</div>
               </base-card>
          </div>
          
          <div class="col-lg-6">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span>Contract Teachers</span>
                <a @click="$router.push({name:'AddTeacher', query:{type:'partime'}})" role="button" class="nav-link fw-bold py-0 pe-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                             <th>Phone</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(teacher, index) in partimeTeachers" :key="teacher.id">
                              <td>{{index+1}}</td>
                              <td>{{teacher.first_name+' '+teacher.last_name}}</td>
                              <td>{{teacher.phone_no}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div v-if="!partimeTeachers.length" class="text-center mt-1">There is no available record</div>
               </base-card>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({user:'user', dashboardData:'dean/dashboardData', selectedAcademicYearId:'selectedAcademicYearId'}),
        teachers(){
        return this.$store.getters['dean/teachers']
     },
     regularTeachers(){
         return this.teachers.filter((teacher)=>{
             return teacher.type==='regular'
         })?.slice(0,8)
     },
     partimeTeachers(){
         return this.teachers.filter((teacher)=>{
             return teacher.type==='partime'
         })?.slice(0,8)
     }
    },
    watch:{
        selectedAcademicYearId(){
            this.$store.dispatch('dean/fetchDashboardData')
        }
    }
}
</script>
<style scoped>
  .bg-cyan-light{
      background-color: #e7fafa;
  }
  tr,th,td{
      border: none;
      padding: 5px;
  }
  tr{
      border-top-right-radius: 2em!important;
  }
  .cards{
      margin-top: -30px;
  }
  tbody tr:nth-child(2n){
      background-color: #f5f6fa;
  }

</style>