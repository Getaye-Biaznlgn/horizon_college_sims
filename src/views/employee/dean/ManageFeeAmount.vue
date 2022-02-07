<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
    <button class="btn btn-add text-white shadow-sm me-2" @click="showAddModal"> 
     Add Fee
   </button> 
    <button class="btn btn-add text-white shadow-sm" @click="printPaymentAmount">
      <i class="fas fa-print me-2"></i> 
       Print
   </button> 
  <div v-if="!isPriting">
     zemene kassie
  </div>
</div>
<div id="paymentPage">
    <div class="sr-only  text-center">
     Horizon College  {{getYear?.year}} Payment Amount
    </div> 
   <table class="mt-3">
   <tr>
     <th>No</th>
     <th>Fee Type</th>
     <th>Amount</th>
     <th v-if="!isPrinting"><span class="sr-only"></span></th>
   </tr>
   <tr v-for="(fee, index) in fees" :key="fee.id">
     <td>{{index+1}}</td>
     <td>{{fee.name}}</td>
     <td>{{fee.amount}}</td>
     <td v-if="!isPrinting">
       <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li ><span  @click="showEditModal(fee)" class="dropdown-item">Edit</span></li>
          </ul>
       </div>
     </td>
   </tr>
 </table>
</div>

 <div v-if="!fees.length">
    <span class="d-block text-center">Fee amount isn't added yet!</span>
 </div>
 </base-card>

 <!--Add-->
<base-modal  @cancel="clearModal" :isLoading="isSaving" @edit="edit" @save="save" id="editBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.fee.name.$error}">
           <label for="#feename" class="form-label">Fee name</label>
           <input :disabled="actionButtonType==='edit'" class="form-control " v-model.trim="fee.name" @blur="v$.fee.name.$touch" id="feename" name="text" placeholder="Eg. name" aria-label=".form-control">
            <span class="error-msg mt-1"  v-for="(error, index) of v$.fee.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
   
        <div class="mb-3" :class="{warining:v$.fee.amount.$error}">
           <label for="#feeAmount" class="form-label">Fee amount</label>
           <input class="form-control " v-model.trim="fee.amount" @blur="v$.fee.amount.$touch" id="feeAmount" type="number" placeholder="Eg. amount" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.fee.amount.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
      </form>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>

<script>
import { Modal } from 'bootstrap';
import {required,helpers} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import RequestStatusNotifier from '../../../components/RequestStatusNotifier.vue';
import apiClient from '../../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
  components: { RequestStatusNotifier },
  data(){
    return{ 
      v$:useValidate(),
      editBaseModal:null,
      //feched fee
       fees:[],
      //
      isSaving:false,
      actionButtonType:'',
      isPrinting:false,
      //server response issue
      responseMessage:'',
      isNotSucceed:true,
      //edited fee
      fee:{
        id:'',
        name:'',
        amount:''
      },
      
    }
    
  },
  computed:{
     ...mapGetters({selectedYearId:'selectedAcademicYearId'}),
     getYear(){
       return this.$store.getters.getYearById(this.selectedYearId)
     }
  },
  validations(){
     return{
      fee:{
            name:{
                required: helpers.withMessage('Payment name can not be empty',required),
               },
             amount:{
                 required:helpers.withMessage('Amount can not be empty', required)
             }  
           }
        }
  },
 
  methods:{
     async printPaymentAmount(){
        this.isPrinting=true
        // const options=null
      await this.$htmlToPaper('paymentPage',null,()=>{
          this.isPrinting=false
        }) 
      },
      showEditModal(fee){
        this.actionButtonType="edit"
        this.fee={...fee}
        //editBaseModal used for add and edit
        this.editBaseModal.show()
      },
      showAddModal(){
       this.actionButtonType='add'
       this.editBaseModal.show()
      },
      clearModal(){
        this.fee.name=''
        this.fee.amount=''
        this.v$.$reset()
        this.responseMessage=''
      },

     async fetchFeeAmount(yearId){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_academic_fees?academic_year_id="+yearId)
            if (response.status === 200) {
              this.fees=response.data
            } else {
              throw 'Failed to fetch event'
            }
         } finally {
            this.$store.commit('setIsItemLoading', false)
        }
     },   
     
    async  edit(){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
          this.isSaving=true
          await apiClient.post('/api/set_academic_fees/'+this.selectedYearId, this.fee).then((response)=>{
            if(response.status===200){
              const index= this.fees.findIndex((fee)=>{
                return fee.id===this.fee.id
              })
              this.fees[index]={...this.fee}
              this.editBaseModal.hide()//editBaseModal used for edit and add purpose

            }
          }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to update fee type'
         }).finally(()=>{
          this.isSaving=false
         })
      }
  },
   async  save(){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
          this.isSaving=true
          this.fee.academic_year_id=this.selectedYearId
          await apiClient.post('/api/fee_types', this.fee).then((response)=>{
            if(response.status===201){
              this.fees.unshift(response.data)
              this.editBaseModal.hide()
            }
           }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to update fee type'
         }).finally(()=>{
          this.isSaving=false
         })
       }
    }  
},
  mounted() {
   this.editBaseModal = new Modal(document.getElementById('editBaseModal'));
 },
 created(){
   this.fetchFeeAmount(this.selectedYearId)
 },
 watch:{
   selectedYearId(newValue){
     this.fetchFeeAmount(newValue)
   }
 }
}
</script>
