<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex">
    <button @click="showAddDialog" class="btn text-white ms-auto btn-add">Post News</button>
</div>
<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Date</th>
    <th>Title</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(item, index) in fetchedNews" :key="item.id">
    <td>{{index+1+(current_page*per_page)-per_page}}</td>
    <td>{{item.posted_date}}</td>
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

 <div v-if="!fetchedNews.length" class="text-center">
     There is no record available
 </div>
  <div v-if="fetchedNews.length" class="mt-2 d-flex justify-content-end">
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
         <div class="mb-3" :class="{warining:v$.news.posted_date.$error}"> 
              <label for="#newsDate" class="form-label">Date</label>
              <input class="form-control " v-model.trim="news.posted_date" @blur="v$.news.posted_date.$touch" id="newsDate" type="date" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.news.posted_date.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
           <div class="mb-3" :class="{warining:v$.news.title.$error}"> 
              <label for="#newsTitle" class="form-label">Title</label>
              <input class="form-control " v-model.trim="news.title" @blur="v$.news.title.$touch" id="newsTitle" type="text" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.news.title.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.news.description.$error}"> 
              <label for="#newsDescription" class="form-label">Description</label>
              <textarea class="form-control " v-model.trim="news.description" @blur="v$.news.description.$touch" id="newsDescription" rows="5" placeholder="" aria-label=".form-control"></textarea>
              <span class="error-msg mt-1"  v-for="(error, index) of v$.news.description.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
      </form>
       <request-status-notifier :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
  </base-modal>

<!-- Delete base modal -->
<base-modal @deleteItem="deleteNews" :isLoading="isSaving" id="deleteBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>
      <div class="my-3">Do you want to delete <i>{{this.news.title}}</i>  ?
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
            fetchedNews:[],
            news:{
                id:'',
                posted_date:'',
                title:'',
                description:''
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
       showEditDialog(news){
         this.actionButtonType='edit'
         //copy selected news to this.news to display on modal
         this.news= {...news}
         this.addBaseModal.show()
       },
       showDeleteDialog(news){
         this.actionButtonType='delete'
         //copy selected news to this.news to display on modal
         this.news={... news}
         this.deleteBaseModal.show()
       },
       clearModal(){
        this.requestStatus.message=''
        this.news={}
        this.v$.$reset()
       },
      async navigate(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/news?page="+pageNumber)
            if (response.status === 200) {
              this.fetchedNews=response.data.data
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
      async save(){
         this.v$.$validate()
          if(!this.v$.$error){
           this.isSaving=true
         try{
          let response= await apiClient.post('api/news', this.news)
            if(response.status===201){
               this.fetchedNews.unshift(response.data)
               this.addBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add news"
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
          let response= await apiClient.patch('api/news/'+this.news.id, this.news)
            if(response.status===200){
              let updatedIndex=this.fetchedNews.findIndex((news)=>{
                return news.id=this.news.id
              })
              this.fetchedNews[updatedIndex]=response.data
               this.addBaseModal.hide()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to update news"
         }
         finally{
           this.isSaving=false
         }
         }
       },
     async deleteNews(){
         this.v$.$validate()
         if(!this.v$.$error){
           this.isSaving=true
           try{
             let response= await apiClient.delete('api/news/'+this.news.id)
              if(response.status===200){
              let index=this.fetchedNews.findIndex((news)=>{
                return news.id===this.news.id
              })
              this.fetchedNews.splice(index,1)
               this.requestStatus.isNotSucceed=false,
               this.requestStatus.message="News is deleted successfully"
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to delete news"

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
         news:{
             posted_date:{
                required: helpers.withMessage('Date can not be empty',required),
               },
             title:{
                 required:helpers.withMessage('Title can not be empty', required)
             },
              description:{
                 required:helpers.withMessage('Description can not be empty', required)
             }   
        }
     }
  },
}
</script>
