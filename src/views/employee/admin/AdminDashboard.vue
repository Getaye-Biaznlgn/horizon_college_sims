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
            <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New TVET Students</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.new_tvet_student}}</span>
            </div>

             <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New Degree Students</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.new_degree_student}}</span>
            </div>

            <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total TVET Students</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.total_tvet_student}}</span>
            </div>

             <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Degree Students</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.total_degree_student}}</span>
            </div>
            
             <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total TVET Scholarship</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.tvet_scholarship_students}}</span>
            </div>
            
             <div class=" bg-cyan-light shadow p-2 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Degree Scholarship</span>
                <span class="fw-bold d-block text-center">{{studentStatistics.degree_scholarship_students}}</span>
            </div>
        </div>
        
         <div class="row g-3 mt-1 mx-2">
             <div class="col-lg-6">
                <base-card>
                   <div class="d-flex justify-content-between mb-2">
                      <span>Daily Total Payments</span>
                      <a @click="$router.push({name:'IncomePerDay'})" role="button" class="nav-link fw-bold py-0 pe-0">SEE ALL</a>
                    </div>
                    <table>
                       <thead class="bg-secondary text-white">
                          <tr>
                             <th>No</th>
                             <th>Date</th>
                             <th>Amount</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="(daily, index) in dailyIncomes" :key="daily.id">
                              <td>{{index+1}}</td>
                              <td>{{(new Date(daily.paid_date)).toString().split(' ').splice(0,4).join(' ')}}</td>
                              <td>{{daily.daily_amount}}</td>
                           </tr>
                       </tbody>
                    </table>
                    <div v-if="!dailyIncomes.length" class="text-center mt-1">There is no available record</div>
               </base-card>
             </div>

             <div class="col-lg-6">
                     <base-card>
                   <div class="d-flex justify-content-between mb-2">
                      <span>Term Total Payment</span>
                    </div>
                    <table>
                       <thead class="bg-secondary text-white">
                          <tr>
                             <th>No</th>
                             <th>Term</th>
                             <th>Total</th>
                           </tr>
                       </thead>
                       <tbody>
                          <tr>
                             <td>1</td>
                             <td>Last 24hr</td>
                             <td>{{inComeStatistics['24hour']}}</td>
                          </tr>
                          <tr>
                             <td>2</td>
                             <td>Last 7 days</td>
                             <td>{{inComeStatistics['7day']}}</td>
                          </tr>
                          <tr>
                              <td>3</td>
                              <td>Last 30 days</td>
                              <td>{{inComeStatistics['month']}}</td>
                          </tr>
                       </tbody>
                    </table>
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
          studentStatistics:[],
          inComeStatistics:[],
          dailyIncomes:[]
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    methods:{
      async fetchStudentStatistics(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_dashboard2")
            if (response.status === 200) {
              this.studentStatistics=response.data
             } else {
              throw 'Failed to fetch news'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    async fetchIncomeStatistics(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_dashboard")
            if (response.status === 200) {
              this.inComeStatistics=response.data
              console.log('admin stastics',response.data)
            } else {
              throw 'Failed to fetch news'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
       async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_daily_paid? per_page=10&&page="+pageNumber)
            if (response.status === 200) {
              this.dailyIncomes=response.data.data
            } else {
              throw 'Failed to fetch event'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    },
    created(){
       this.fetchStudentStatistics()
       this.fetchIncomeStatistics()
       this.navigate(1)
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