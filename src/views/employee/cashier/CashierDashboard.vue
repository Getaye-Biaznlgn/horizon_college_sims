<template>
    <div class="px-0 mx-0 mt-0">
        <div class="position-relative">
            <img src="../../../assets/dashboard_header.png" alt=""  height="200" class="img-fluid">
            <div class="position-absolute top-0 start-0 ms-2 mt-2 text-white">
                <p class="fw-bold">Well come Mrs. dera!</p>
                <p class="small">I wish you a good day and enjoy your time.</p>
            </div> 
        </div>
        <div class="cards d-flex position-relative mx-2">
            <div class=" bg-cyan-light shadow p-2 rounded rounded-lg me-5 flex-fill">
                <div class="d-flex ms-5 align-items-center">
               <span class="d-block text-center fs-2"><i class="fas fa-coins pe-2 fw-bold"></i></span>
               <span class="d-block text-center small my-1">Last 24 hours payment</span>
                </div>
                 <div class="fw-bold d-block text-center">{{studentPayment['24hour']}}</div>
               </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg me-5 flex-fill">
                <div class="d-flex ms-5 align-items-center">
               <span class="d-block text-center fs-2"><i class="fas fa-coins pe-2 fw-bold"></i></span>
               <span class="d-block text-center small my-1">Last 7 Days payment</span>
                </div>
                 <div class="fw-bold d-block text-center">{{studentPayment['7day']}}</div>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg flex-fill">
                <div class="d-flex ms-5 align-items-center">
               <span class="d-block text-center fs-2"><i class="fas fa-coins pe-2 fw-bold"></i></span>
               <span class="d-block text-center small my-1">Last 30 days payment</span>
                </div>
                 <div class="fw-bold d-block text-center">{{studentPayment.month}}</div>
            </div>
        </div>
        <div class="my-3">
              <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>Recent Payments</span>
                <router-link :to="{name:'payment'}" class="nav-link fw-bold py-0">SEE ALL</router-link>
              </div>
                 <table class="w-100">
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                             <th>Date</th>
                             <th>Payment Type</th>
                             <th>Pad Number</th>
                             <th>Amount</th>
                             </tr>
                     </thead>
                     <tbody>
                          <tr v-for="(payment,index) in studentPayment.all_fee" :key="payment.id">
                              <td>{{index+1}}</td>
                              <td>{{payment.full_name}}</td>
                              <td>{{paidDate(payment.paid_date)}}</td>
                              <td>{{payment.payment_type}}</td>
                              <td>{{payment.receipt_no}}</td>
                              <td>{{payment.amount}}</td>
                         </tr>
                     </tbody>
                 </table>
              </base-card>
          </div>
         </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
export default {
    data(){
        return{
            studentPayment:[]
        }
    },
created() {
    this.fetchDashboardData()
},
computed:{
    yearId(){
        return this.$store.getters.acYearId
    }
},
methods: {
    async fetchDashboardData(){
        this.$store.commit('setIsItemLoading', true)
        try{
             var response = await apiClient.get(`api/cashier_dashboard?academic_year_id=${this.yearId}`)
        if(response.status === 200){
            console.log('dashboard data',response.data)
            this.studentPayment = response.data
        }
        }catch(e){
            //
        }finally{
            this.$store.commit('setIsItemLoading', false)
        }
       
    },
         paidDate(dateValue){
var date = new Date(dateValue)
    return date.toString().split(' ').slice(0,4).join(' ')
      },
},
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