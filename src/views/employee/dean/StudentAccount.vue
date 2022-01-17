<template>
<base-card class="px-3 mx-4 mt-3">
  <div class="d-flex">
   <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" @keypress="keyMoniter" @change="resetSearch" class="form-control search-input" placeholder="Search by ID" aria-label="search" aria-describedby="basic-addon2"/>
             <span role="button" @click="searchRequest" class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
   </div>
</div>
<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Student Id</th>
    <th>Full Name</th>
    <th>Department</th>
    <th>Program</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(student, index) in students" :key="student.id">
    <td>{{index+1+current_page*per_page-per_page}}</td>
    <td>{{student.student_id}}</td>
    <td>{{student.full_name}}</td>
    <td>{{student.department}}</td>
    <td>{{student.program}}</td>
    <td>{{student.role}}</td>
    <td>
    <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showResetModal(student)"><span class="dropdown-item">Reset Password</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
  <div v-if="!students.length" class="text-center">
     There is no record available
 </div>
   <div v-if="students.length" class="mt-2 d-flex justify-content-end">
      <span class="pe-4 small">Rows per page {{per_page}}</span>
      <span class="pe-2">{{current_page}}/{{last_page}}</span>
      <span v-show="current_page!==1" @click="navigate(current_page-1)" role="button"><i class="fas fa-chevron-left pe-3"></i></span>
      <span v-show="current_page!==last_page" @click="navigate(current_page+1)" role="button"><i class="fas fa-chevron-right"></i></span>
   </div>
 </base-card>

  <vue-modal :modalState="modalState">
     <div class="modal-content ms-auto me-auto bg-white p-3">
        <div class="header">
            <button @click="dismissVueModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
        </div>
        <div class="body">
             <strong class="fw-bold d-block fs-5">Reset</strong>
             <p class="my-4">Do you want to reset <b><i>{{student.full_name}}</i></b>'s password?</p>
        </div>
         <div class="footer d-flex">
             <request-status-notifier class="" :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
             <button  type="button" @click="resetPassword" class="btn d-block ms-auto  btn-add text-white ">
             <span v-if="isSaving">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Reseting
               </span>      
              <span v-else>Reset</span>   
          </button>
       </div>
     </div>
  </vue-modal>
</template>

<script>
import VueModal from '../../../components/VueModal.vue'
import apiClient from '../../../resources/baseUrl'
export default {
  components: { VueModal },
    data(){
        return{
            students:[],
            student:{},
            current_page:'',
            per_page:'',
            last_page:'',
            requestStatus:{
               message:'',
               isNotSucceed:''
            },
            isSaving:false,
            modalState:false,
            searchValue:''
        }
    },
    methods:{
      keyMoniter(event){
       if(event.key==='Enter')
          this.searchRequest()
       else
         return   
      },
      resetSearch(){
        if(this.searchValue!=='')
           return
        this.navigate(1) 
      },
     async searchRequest(){
            this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/students_account?search_query="+ this.searchValue)
            if (response.status === 200) {
              this.students=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch student'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
      showResetModal(student){
       this.student={...student}
       this.modalState=true
      },
       
       dismissVueModal(){
        this.requestStatus.message=''
        this.student={}
        this.modalState=false
       },
      async navigate(pageNumber){
        this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/students_account?page="+pageNumber)
            if (response.status === 200) {
              this.students=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch student'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
      async resetPassword(){
        this.isSaving=true
         try{
          let response= await apiClient.post('api/reset_student_password', {user_name:this.student.student_id})
            if(response.status===200){
              let updatedIndex=this.students.findIndex((student)=>{
                return student.id=this.student.id
              })
              this.students[updatedIndex]=response.data
               this.requestStatus.isNotSucceed=false,
               this.requestStatus.message="Password is changed successfully"
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to change password"
             
         }
         finally{
           this.isSaving=false
         }
        
       }
    },
    created(){
        this.navigate(1)
    },
  
}
</script>
<style scoped>
 .modal-content{
   width: 30%;
 }
</style>
