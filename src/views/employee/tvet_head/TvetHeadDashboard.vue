<template>
    <div class="px-0 mx-0 mt-0">
        <div class="position-relative">
            <img src="../../../assets/dashboard_header.png" alt=""  height="200" class="img-fluid">
            <div class="position-absolute top-0 start-0 ms-2 mt-2 text-white">
                <p class="fw-bold">Well come Dear {{user.first_name}}!</p>
                <p class="small">I wish you good day and enjoy your time.</p>
            </div> 
        </div>
        <div class="cards d-flex position-relative mx-2">
            <div class=" bg-cyan-light flex-fill shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Students</span>
                <span class="fw-bold d-block text-center">{{statistics.total_tvet_student}}</span>
            </div>
             
             <div class=" bg-cyan-light flex-fill ms-3 shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New Students</span>
                <span class="fw-bold d-block text-center">{{statistics.new_tvet_student}}</span>
            </div>
            
             <div class=" bg-cyan-light flex-fill ms-3 shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1 mx-4">Total Regular</span>
                <span class="fw-bold d-block text-center">{{statistics.total_tvet_regular_student}}</span>
            </div>
             <div class=" bg-cyan-light flex-fill ms-3 shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Extension</span>
                <span class="fw-bold d-block text-center">{{statistics.total_tvet_extension_student}}</span>
            </div>
        </div>
        <div class="row  mb-3 mt-4">
          <div class="col-lg-6">
            <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>Regular Students</span>
                <a @click="$router.push({name:'TvetHeadStudent', query:{program:'regular'}})" role="button" class="nav-link fw-bold py-0 pe-0">SEE ALL</a>
              </div>
                <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                             <th>Sex</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(student, index) in regularStudents" :key="student.id">
                              <td>{{index+1}}</td>
                              <td>{{student.first_name+' '+student.last_name}}</td>
                              <td>{{student.sex?.substring(0,1)}}</td>
                         </tr>
                     </tbody>
                 </table>
                <div v-if="!regularStudents?.length" class="text-center mt-1">There is no available record</div>
               </base-card>
          </div>
          
          <div class="col-lg-6">
             <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span>Extension Students</span>
                <a @click="$router.push({name:'TvetHeadStudent', query:{program:'extension'}})" role="button" class="nav-link fw-bold py-0 pe-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                             <th>Sex</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(student, index) in extensionStudents" :key="student.id">
                              <td>{{index+1}}</td>
                              <td>{{student.first_name+' '+student.last_name}}</td>
                              <td>{{student.sex?.level_no}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div v-if="!extensionStudents?.length" class="text-center mt-1">There is no available record</div>
               </base-card>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
    data(){
      return{
        statistics:{},
      }
    },
    computed:{
        ...mapGetters({user:'user', selectedYearId:'selectedAcademicYearId',studentInLevels:'tvetHead/studentInLevels',}),
        regularStudents(){
            let temp=[...this.studentInLevels]            
            return temp[0]?.students?.filter((student)=>{
            return student.program?.name?.toLowerCase()==='regular'
         })?.slice(0,10)
        },
        extensionStudents(){
            let temp=[...this.studentInLevels] 
            return temp[0]?.students?.filter((student)=>{
            return student.program?.name?.toLowerCase()==='extension'
         })?.slice(0,10)
        },
    },
    methods:{
        async fetchDashboardData(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/tvet_head_dash_board?academic_year_id="+this.selectedYearId)
            if (response.status === 200) {
              this.statistics=response.data
            } else {
              throw 'Failed to fetch stastics'
            }
        }  finally {
            this.$store.commit('setIsItemLoading', false)
        }
       }
    },
    created(){
       this.fetchDashboardData()
    },
    watch:{
        selectedYearId(){
            this.fetchDashboardData()
            
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