<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
     <button class="btn btn-add text-white me-2 shadow-sm" @click="showAddModal()"> 
     Add Fee
   </button> 
    <button class="btn btn-add text-white shadow-sm" @click="showAddModal()"> 
      <i class="fas fa-upload pe-2"></i>Export
   </button> 
  
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Fee Type</th>
    <th>Amount</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr>
    <td>1</td>
    <td>Tution</td>
    <td>57</td>
    <td>
     <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showDetailModal(index)"><span class="dropdown-item">Detail</span></li>
             <li ><span  @click="showEditModal(index)" class="dropdown-item">Edit</span></li>
             <li ><span @click="showDeleteModal(index)"  class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
 </base-card>

 <!--Add-->
<base-modal @save="save" @cancel="cancelValuesOfActiveObject" :isLoading="isSaving" @edit="edit" id="addBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.fee.type.$error}">
           <label for="#feeType" class="form-label">Fee Type</label>
           <input class="form-control " v-model.trim="fee.type" @blur="v$.fee.type.$touch" id="feeType" type="text" placeholder="Eg. type" aria-label=".form-control">
            <span class="error-msg mt-1"  v-for="(error, index) of v$.fee.type.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
   
        <div class="mb-3" :class="{warining:v$.fee.amount.$error}">
           <label for="#feeAmount" class="form-label">Fee amount</label>
           <input class="form-control " v-model.trim="fee.amount" @blur="v$.fee.amount.$touch" id="feeAmount" amount="text" placeholder="Eg. amount" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.fee.amount.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
      </form>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>


<!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="deleteItem">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>

<script>
import { Modal } from 'bootstrap';
import {mapGetters} from 'vuex'
import {required,helpers} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import RequestStatusNotifier from '../../../components/RequestStatusNotifier.vue';
import BaseModal from '../../../components/BaseModal.vue';

export default {
  components: { RequestStatusNotifier, BaseModal },

  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      deleteBaseModal:null,
      //
      isSaving:false,
      
      actionButtonType:'',

      //server response issue
      responseMessage:'',
      isNotSucceed:true,
      //
      fee:{
        id:'',
        type:'',
        amount:''
      },
    }
  },
  computed:{
    ...mapGetters()
  },
  created(){
   
  },
  validations(){
     return{
      fee:{
            type:{
                required: helpers.withMessage('department name can not be empty',required),
               },
             amount:{
                 required:helpers.withMessage('Number of year can not be empty', required)
             }  
           }
     }
  },
 
  methods:{
      showAddModal(){
        this.actionButtonType="add"
        this.addBaseModal.show()
      },
      showDeleteModal(){
        this.actionButtonType='delete'
        this.deleteBaseModal.show()
      },
      showEditModal(){
        this.actionButtonType="edit"
        //addBaseModal used for add and edit
        this.addBaseModal.show()
      },
      cancelValuesOfActiveObject(){
        //to close before validation
        // this.addBaseModal.hide()
        this.fee.type=''
        this.fee.amount=''
        this.responseMessage=''
      },

      async edit(){
      this.request(this.fee,'dean/updateDegreeDepartment','fee type updated successfully', 'Faild to update fee type')
      },
      save() {
          this.request(this.fee,'dean/addDegreeDepartment','fee type added successfully', 'Faild to add fee type')
      },
    async  request(payload, action, successMessage, errorMessage){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
          this.isSaving=true
          await this.$store.dispatch(action,payload).then((e)=>{
           this.isNotSucceed=false,
           this.responseMessage=successMessage
           console.log('response with status'+e)
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage=errorMessage
         }).finally(()=>{
          this.isSaving=false
         })
      
       }
       else{
         console.log('form  validation faild')
       }
      }
     
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.deleteBaseModal = new Modal(document.getElementById('deleteBaseModal'));
 }
}
</script>
