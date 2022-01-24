<template>
  <base-card class="px-3  mx-4 mt-3">
     <div class="pb-2 mb-2 d-flex">
         <button @click="showVueModal" class="btn text-white ms-auto btn-add">Post New Photo</button>
     </div>
      <div class="row g-4">
          <div v-for="img in gallery" :key="img.id" class="col-lg-3  col-md-4 col-sm-6 position-relative img-content">
              <img :src="img.url" alt="" width="200" height="200"  class="rounded">
              <div class="position-absolute img-overly start-0 top-0 h-100 w-100">
                <span role="button" @click="showDeleteDialog(img)" class="position-absolute start-50 ms-5"><i class="fas fa-times fw-bold fs-3"></i></span>
              </div>
          </div>
          <div v-if="!gallery.length" class="mt-2 text-center">
              Images isn't uploaded yet!
          </div>
      <div v-if="gallery.length" class="mt-2 d-flex justify-content-end">
      <span class="pe-4 small">Rows per page {{per_page}}</span>
      <span class="pe-2">{{current_page}}/{{last_page}}</span>
      <span v-show="current_page!==1" @click="fetchGallery(current_page-1)" role="button"><i class="fas fa-chevron-left pe-3"></i></span>
      <span v-show="current_page!==last_page" @click="fetchGallery(current_page+1)" role="button"><i class="fas fa-chevron-right"></i></span>
 </div>
</div>
  </base-card>

 <vue-modal :modalState="modalState">
   <div class="modal-content ms-auto me-auto bg-white m-4 px-2">
     <div class="modal-header">
        <button @click="dismissVueModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
      </div>
     <div class="modal-body d-flex flex-column">
       <div>
         <input type="file" class="d-none w-0" @change="handleImage" ref="imgInput" id="">
         <img v-if="imgUrl"  :src="imgUrl" alt="selected image" accept="image/png, image/gif, image/jpeg" height="200" width="250"  class=" mx-auto d-block">
         <span v-else class="text-center d-block align-middle">Image Preview</span>
       </div>
       <div class="mt-auto">
          <div v-if="imgUrl" class="progress mt-3">
            <div class="progress-bar btn-add" role="progressbar" :style="{ width: uploadPercentage + '%'}" id="progress" :aria-valuenow="p" aria-valuemin="0" aria-valuemax="100"></div>
         </div>
         <request-status-notifier :notificationMessage='requestResponse.message' :isNotSucceed="requestResponse.isNotSucceed" ></request-status-notifier>
       </div>
      </div>
       <div class="modal-footer">
           <button type="button"  @click="$refs.imgInput.click()" class="btn  px-4 btn-add text-white border mx-3">Choose Image</button>
           <button :disabled="imgUrl===''"  type="button" @click="uploadImage"  class="btn  px-4 btn-add text-white mx-3">
            <span v-if="isSaving">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               Uploading
            </span>      
            <span v-else> <i class="fas fa-upload pe-2"></i>Updload</span>   
          </button>
       </div>
     </div>
  </vue-modal>
  <!-- Delete base modal -->
<base-modal @deleteItem="deleteImage" :isLoading="isSaving" id="deleteBaseModal" @cancel="clearModal" :button-type="actionButtonType">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>
      <div class="my-3">Do you want to delete?</div>
      <img :src="img.url" width="200" height="200" class="d-block mx-auto" alt="Selected image">
      <request-status-notifier :notificationMessage='requestResponse.message' :isNotSucceed="requestResponse.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>

<script>
import VueModal from '../../../components/VueModal.vue'
import apiClient from '../../../resources/baseUrl'
import {Modal} from 'bootstrap'
export default {
  components:{VueModal},
    data(){
        return{
          gallery:[],
          current_page:'',
          last_page:'',
          per_page:'',
          //
          modalState:false,
          selectedImage:'',
          imgUrl:'',
          isSaving:false,
          uploadPercentage:0,
          //
          requestResponse:{
            message:'',
            isNotSucceed:''
          },
          //delete modal
          actionButtonType:'',
          img:'',
          deleteBaseModal:''
        }
    },
    methods:{
      showVueModal(){
        this.modalState=true
      },
     
      dismissVueModal(){
        this.modalState=false
        this.selectedImage=''
        this.imgUrl=''
        this.requestResponse.message=''
        this.requestResponse.isNotSucceed=false
      },
     handleImage(event){
       this.selectedImage=event.target.files[0]
       this.imgUrl=URL.createObjectURL(this.selectedImage)
       this.uploadPercentage=0
       this.requestResponse.message=''
       this.requestResponse.isNotSucceed=false
     },
     showDeleteDialog(img){
       this.img=img
       this.deleteBaseModal.show()
       this.actionButtonType='delete'
     },
     clearModal(){
      this.img=''
      this.requestResponse.isNotSucceed='',
      this.requestResponse.message=""
     },
     async deleteImage(){
         this.isSaving=true
           try{
             let response= await apiClient.delete('api/student_galleries/'+this.img.id)
              if(response.status===200){
              let index=this.gallery.findIndex((image)=>{
                return image.id===this.img.id
              })
              this.gallery.splice(index,1)
              this.deleteBaseModal.hide()
              this.clearModal()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestResponse.isNotSucceed=true,
             this.requestResponse.message="Failed to delete an image"
           console.log()
         }
         finally{
           this.isSaving=false
         }
      },
      
     async  uploadImage(){
     //to reset value
        this.uploadPercentage=0
        this.requestResponse.message=''
        this.requestResponse.isNotSucceed=false
        
     if(this.imgUrl===''){
        this.requestResponse.message="Select image please."
        this.requestResponse.isNotSucceed=true
        return;
     }

       this.isSaving=true
       const fd=new FormData()
       fd.append('image',this.selectedImage)
       try{
        const response = await apiClient.post('/api/student_galleries', fd,{
        headers:{
          'Content-Type': 'multipart/form-data',
          Accept:'application/json'
        },
         onUploadProgress: function( progressEvent ) {
         this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
         }.bind(this)
        })
        if(response.status===201){
           this.gallery.unshift(response.data)
           this.requestResponse.message="Image is uploaded successfully"
           this.requestResponse.isNotSucceed=false
           this.dismissVueModal()

        }
        else throw ''
        }catch(e){
          this.requestResponse.message="Faild to uploade image"
          this.requestResponse.isNotSucceed=true
       }finally{
         this.isSaving=false
       }
     
     },
      async fetchGallery(pageNumber){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/student_galleries?per_page=12&&page="+pageNumber)
            if (response.status === 200) {
              this.gallery=response.data.data
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
    },
    mounted(){
     this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
    },
    created(){
      this.fetchGallery(1)
    }
}
</script>
<style scoped>


.modal-content{
  width: 50%;
  height: 450px;
}
.img-overly{
  display: none;
  background-color: rgba(255, 255, 255, 0.6);
}
.img-content:hover .img-overly{
  display: block;
  
}
.img-content{
  z-index: 0;
}
</style>

