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
        
        <div class=" d-flex mt-5 justify-content-between mx-2">
            <div class=" shadow  px-2 py-5  mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center small my-1">Last 24hour</span>
                <span class="fw-bold d-block text-center">{{inComeStatistics['24hour']}}</span>
            </div>
           
            <div class=" shadow   px-2 py-5 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center small my-1">Last 7 Days</span>
                <span class="fw-bold d-block text-center">{{inComeStatistics['7day']}}</span>
            </div>
            <div class=" shadow  px-2 py-5 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center small my-1">Last 30 Days</span>
                <span class="fw-bold d-block text-center">{{inComeStatistics.month}}</span>
            </div>
            <div class=" shadow  px-2 py-5 mx-3 flex-fill rounded rounded-lg">
                <span class="d-block text-center small my-1">Total</span>
                <span class="fw-bold d-block text-center">{{inComeStatistics.total}}</span>
          
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
          inComeStatistics:[]
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
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    async fetchIncomeStatistics(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_dashboard")
            if (response.status === 200) {
              this.inComeStatistics=response.data
            } else {
              throw 'Failed to fetch news'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       }
    },
    created(){
       this.fetchStudentStatistics()
       this.fetchIncomeStatistics()
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