<template>
  <base-card>
   <div class="fw-bold mt-3">Daily Total Payments</div>   
  <table>
      <tr>
          <th>No</th>
          <th>Date</th>
          <th>Amount</th>
      </tr>
      <tr v-for="(daily, index) in dailyIncomes" :key="daily.paid_date">
          <td>{{index+1+(current_page * per_page-per_page)}}</td>
          <td>{{(new Date(daily.paid_date)).toString().split(' ').splice(0,4).join(' ')}}</td>
          <td>{{daily.daily_amount}}</td>
      </tr>
  </table>
  <div v-if="!dailyIncomes.length" class="text-center">
       There is no recored available
   </div>
   <div v-if="dailyIncomes.length" class="mt-2 d-flex justify-content-end">
      <span class="pe-4 small">Rows per page {{per_page}}</span>
      <span class="pe-2">{{current_page}}/{{last_page}}</span>
      <span v-show="current_page!==1" @click="navigate(current_page-1)" role="button"><i class="fas fa-chevron-left pe-3"></i></span>
      <span v-show="current_page!==last_page" @click="navigate(current_page+1)" role="button"><i class="fas fa-chevron-right"></i></span>
   </div>
</base-card>
  
</template>

<script>
import apiClient from '../../../resources/baseUrl'
export default {
    data(){
      return{
          dailyIncomes:[],
          current_page:'',
          per_page:'',
          last_page:''
      }
    },
  methods:{
        async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_daily_paid? per_page=10&&page="+pageNumber)
            if (response.status === 200) {
              this.dailyIncomes=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch event'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
  },
  created(){
      this.navigate(1)
  }
}
</script>

