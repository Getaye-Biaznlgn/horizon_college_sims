<template>
<base-card class="px-3 mx-4 mt-3">
  <div class="d-flex">
   <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" @keypress="keyMoniter" @change="resetSearch" class="form-control search-input" placeholder="Search by email" aria-label="search" aria-describedby="basic-addon2"/>
             <span role="button" @click="searchRequest" class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
   </div>
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Full Name</th>
    <th>Phone Number</th>
    <th>Email Address</th>
    <th>Role</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(employee, index) in employees" :key="employee.id">
    <td>{{index+1+current_page*per_page-per_page}}</td>
    <td>{{employee.first_name+' '+employee.last_name}}</td>
    <td>{{employee.phone_no}}</td>
    <td>{{employee.email}}</td>
    <td>{{employee.role.toLowerCase().split('_').join(' ')}}</td>
    <td>
    <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showResetModal(employee)"><span class="dropdown-item">Reset Password</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
  <div v-if="!employees.length" class="text-center">
     There is no record available
 </div>
   <div v-if="employees.length" class="mt-2 d-flex justify-content-end">
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
             <p class="my-4">Do you want to reset <b><i>{{employee.first_name+' '+employee.last_name}}'s</i></b> password?</p>
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
            employees:[],
            employee:{},
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
            var response = await apiClient.get("/api/employees_account?search_query="+ this.searchValue)
            if (response.status === 200) {
              this.employees=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch employee'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
      showResetModal(employee){
       this.employee={...employee}
       this.modalState=true
      },
       
       dismissVueModal(){
        this.requestStatus.message=''
        this.employee={}
        this.modalState=false
       },
      async navigate(pageNumber){
        this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/employees_account?page="+pageNumber)
            if (response.status === 200) {
              this.employees=response.data.data
              this.current_page=response.data.current_page
              this.per_page=response.data.per_page
              this.last_page=response.data.last_page
            } else {
              throw 'Failed to fetch employee'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
      async resetPassword(){
        this.isSaving=true
         try{
          let response= await apiClient.post('api/reset_employee_password', {user_name:this.employee.email})
            if(response.status===200){
              let updatedIndex=this.employees.findIndex((employee)=>{
                return employee.id=this.employee.id
              })
              this.employees[updatedIndex]=response.data
               this.requestStatus.isNotSucceed=false,
               this.requestStatus.message="Password is changed successfully"
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to change password"
             console.log()
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
