<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex">
    <button @click="showAddDialog" class="btn text-white ms-auto btn-add">Post Events</button>
</div>
<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Date</th>
    <th>Title</th>
    <th>Event Time</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(item, index) in events" :key="item.id">
    <td>{{index+1+(current_page*per_page)-per_page}}</td>
    <td>{{item.posted_date}}</td>
    <td>{{item.event_start_time+'---'+item.event_end_time}}</td>
    <td>{{item.title}}</td>
    <td>
     <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li><span @click="showEditDialog(item)" role="button" class="dropdown-item">Edit</span></li>
             <li><span @click="showDeleteDialog(item)" role="button" class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>

 <div v-if="!events.length" class="text-center">
     There is no recored available
 </div>
  <div v-if="events.length" class="mt-2 d-flex justify-content-end">
      <span class="pe-4 small">Rows per page {{per_page}}</span>
      <span class="pe-2">{{current_page}}/{{last_page}}</span>
      <span v-show="current_page!==1" @click="navigate(current_page-1)" role="button"><i class="fas fa-chevron-left pe-3"></i></span>
      <span v-show="current_page!==last_page" @click="navigate(current_page+1)" role="button"><i class="fas fa-chevron-right"></i></span>
 </div>
 </base-card>
<!-- add and edit base-modal-->
  <base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.event.posted_date.$error}"> 
              <label for="#eventDate" class="form-label">Date</label>
              <input class="form-control " v-model.trim="event.posted_date" @blur="v$.event.posted_date.$touch" id="eventDate" type="date" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.event.posted_date.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
           <div class="mb-3" :class="{warining:v$.event.title.$error}"> 
              <label for="#eventTitle" class="form-label">Title</label>
              <input class="form-control " v-model.trim="event.title" @blur="v$.event.title.$touch" id="eventTitle" type="text" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.event.title.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.event.description.$error}"> 
              <label for="#eventDescription" class="form-label">Description</label>
              <textarea class="form-control " v-model.trim="event.description" @blur="v$.event.description.$touch" id="eventDescription" rows="5" placeholder="" aria-label=".form-control"></textarea>
              <span class="error-msg mt-1"  v-for="(error, index) of v$.event.description.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
          <div class="mb-3" :class="{warining:v$.event.event_start_time.$error}"> 
              <label for="#eventStart" class="form-label">Start Time</label>
              <input type="time" class="form-control " v-model.trim="event.event_start_time" @blur="v$.event.event_start_time.$touch" id="eventStart" rows="5" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.event.event_start_time.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
          <div class="mb-3" :class="{warining:v$.event.event_end_time.$error}"> 
              <label for="#eventEnd" class="form-label">End Time</label>
              <input class="form-control " v-model.trim="event.event_end_time" @blur="v$.event.event_end_time.$touch" id="eventEnd" rows="5" type="time" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.event.event_end_time.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
      </form>
       <request-status-notifier :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
  </base-modal>

<!-- Delete base modal -->
<base-modal @deleteItem="deleteEvent" :isLoading="isSaving" id="deleteBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>
      <div class="my-3">Do you want to delete <i>{{this.event.title}}</i>  ?
      </div>
      <request-status-notifier :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>
<script>
import BaseCard from '../../../components/BaseCard.vue'
import useValidate from '@vuelidate/core'
import { Modal } from 'bootstrap';
import {required,helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
  components: { BaseCard },
    data(){
        return{
            v$:useValidate(),
            events:[],
            event:{
                id:'',
                posted_date:'',
                title:'',
                description:'',
                event_start_time:'',
                event_end_time:''
            },
            addBaseModal:null,
            deleteBaseModal:null,
            actionButtonType:'',
            current_page:'',
            per_page:'',
            last_page:'',
            requestStatus:{
              message:'',
              isNotSucceed:''
            },
            isSaving:false
        }
    },
  
    methods:{
       showAddDialog(){
        this.actionButtonType='add'
        this.addBaseModal.show()
       },
       showEditDialog(event){
         this.actionButtonType='edit'
         //copy selected event to this.event to display on modal
         this.event={...event} 
         this.addBaseModal.show()
       },
       showDeleteDialog(event){
         this.actionButtonType='delete'
         //copy selected event to this.event to display on modal
         this.event= {...event}
         this.deleteBaseModal.show()
       },
       clearModal(){
        this.requestStatus.message=''
        this.event={}
        this.v$.$reset()
       },
      async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/events?page="+pageNumber)
            console.log('events', response.data.data)
            if (response.status === 200) {
              this.events=response.data.data
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
      async save(){
         this.v$.$validate()
          if(!this.v$.$error){
           this.isSaving=true
         try{
          let response=  await apiClient.post('api/events', this.event)
            if(response.status===201){
               this.events.unshift(response.data)
               this.addBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add an event"
         }
         finally{
           this.isSaving=false
         }
       } 
      },
      async edit(){
          this.v$.$validate()
          if(!this.v$.$error){
           this.isSaving=true
         try{
          let response= await apiClient.patch('api/events/'+this.event.id, this.event)
            if(response.status===200){
              let updatedIndex=this.events.findIndex((event)=>{
                return event.id=this.event.id
              })
              this.events[updatedIndex]=response.data
               this.addBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to update event"
         }
         finally{
           this.isSaving=false
         }
         }
         else{
           console.log('form validation faild')
         }
       },
     async deleteEvent(){
           this.v$.$validate()
          if(!this.v$.$error){
           this.isSaving=true
         try{
          let response= await apiClient.delete('api/events/'+this.event.id)
            if(response.status===200){
              let index=this.events.findIndex((event)=>{
                return event.id===this.event.id
              })
              this.events.splice(index,1)
               this.deleteBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to delete an event"
         }
         finally{
           this.isSaving=false
         }
         }
        
     },
    },
    mounted(){
      this.addBaseModal=new Modal(document.getElementById('addBaseModal'))  
      this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
    },
    created(){
        this.navigate(1)
    },
    validations(){
       return{
         event:{
             posted_date:{
                required: helpers.withMessage('Date can not be empty',required),
               },
             title:{
                 required:helpers.withMessage('Title can not be empty', required)
             },
              description:{
                 required:helpers.withMessage('Description can not be empty', required)
             },
             event_start_time:{
                 required:helpers.withMessage('Start time can not be empty', required)
             },
             event_end_time:{
                 required:helpers.withMessage('End time can not be empty', required)
             }   
        }
     }
  },
}
</script>
