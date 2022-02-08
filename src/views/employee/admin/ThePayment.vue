<template>
  <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex">
       <div class="d-flex border rounded">
          <input type="text" @keypress="moniterKeypess($event)" v-model.trim="searchValue" @change="searchInputInLeave"  class="form-control search-input" placeholder="Pad No" aria-label="search" aria-describedby="basic-addon2"/>
             <span @click="searchPayment" class="input-group-text search rounded-0" role="button">
                <i class="fas fa-search"></i>
             </span>           
       </div>
    </div>
    
    <table class="mt-2">
        <tr>
           <th>No</th>
           <th>Pad No</th>
           <th>Student ID</th>
           <th>Full Name</th> 
           <th>Date</th>
           <th>Payment Type</th>
           <th>Amount</th>
           <th class="sr-only">Action</th>
        </tr>
        <tr v-for="(pay,index) in payments" :key="pay.id+pay.receipt_no">
            <td>{{index+1+(current_page * per_page-per_page)}}</td>
            <td>{{pay.receipt_no}}</td>
            <td>{{pay.student_id}}</td>
            <td>{{pay.full_name}}</td>
            <td>{{new Date(pay.paid_date).toString().split(' ').slice(0,4).join(' ')}}</td>
            <td>{{pay.payment_type}}</td>
            <td>{{pay.paid_amount}}</td>
            <td>
                <span @click="showDeleteModal(index)" role="button"><i class="fas fa-trash pe-2"></i></span>
            </td>
        </tr>
    </table>
    <div v-if="!payments.length" class="text-center">
       There is no recored available
    </div>
    <div v-if="payments.length" class="mt-2 d-flex justify-content-end">
      <span class="pe-4 small">Rows per page {{per_page}}</span>
      <span class="pe-2">{{current_page}}/{{last_page}}</span>
      <span v-show="current_page!==1" @click="navigate(current_page-1)" role="button"><i class="fas fa-chevron-left pe-3"></i></span>
      <span v-show="current_page!==last_page" @click="navigate(current_page+1)" role="button"><i class="fas fa-chevron-right"></i></span>
 </div>
  </base-card>


  <!-- Delete base modal -->
<base-modal @deleteItem="deletePayment" :isLoading="isSaving" id="deleteBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>
      <div class="my-3">Do you want to delete Pad No <i>{{this.payment.receipt_no}}</i>  ?
      </div>
      <request-status-notifier :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>

<script>
import apiClient from '../../../resources/baseUrl'
import {Modal} from 'bootstrap'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            payments:[],
            requestStatus:{
                message:'',
                isNotSucceed:''
            },
            payment:{},
            deleteBaseModal:null,
            actionButtonType:'',
            isSaving:false,
            //pagination
            current_page:'',
            per_page:'',
            last_page:'',
            searchValue:''
        }
    },
    computed:{
        ...mapGetters(['selectedAcademicYearId'])
    },
    methods:{
         async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_paid_students?per_page=10&&page="+pageNumber+'&&academic_year_id='+this.selectedAcademicYearId)
            if (response.status === 200) {
              this.payments=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
              console.log('admin payment ',response.data)
              
            } else {
              throw 'Failed to fetch news'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
      showDeleteModal(index){
        this.actionButtonType='delete'
         this.payment={...this.payments[index]}
         this.payment.index=index
         this.deleteBaseModal.show()
      },
      searchInputInLeave(){
        if(this.searchValue!=='')
        return
         this.navigate(1)
      },
      moniterKeypess(event){
        if(event.key==='Enter'){
          this.searchPayment()
        }
      },
     async searchPayment(){
       if(this.searchValue=='')
       return
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/admin_paid_students?search_query="+this.searchValue+'&&academic_year_id='+this.selectedAcademicYear)
            if (response.status === 200) {
              this.payments=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch news'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
      async deletePayment(){
             this.isSaving=true
             this.requestStatus.message=''
          try{
             let response=  await apiClient.post('api/admin_delete_payment/'+this.payment.id, {
               type:this.payment.type,
               receipt_no:this.payment.receipt_no,
               academic_year_id:this.selectedAcademicYear
             })
               if(response.status===200){
              
                 this.payments.splice(this.payment.index,1)
                 this.deleteBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add payment"
         }
         finally{
           this.isSaving=false
         }
       }
      
    },
    
    mounted(){
       this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
    },
    created(){
      this.navigate(1)
    },
    watch:{
      selectedAcademicYear(){
        this.navigate(1)
      }
    }
}
</script>

<style>

</style>