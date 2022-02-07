<template>
    <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex justify-content-end">
    <button @click="addDepartmentHead" class="btn btn-add text-white px-2">Add Department Head</button>
    </div>
    <table class="mt-3">
  <thead>
    <tr>
      <th>NO</th>
      <th>Full Name</th>
      <th>Phone Number</th>
      <th>Email Address</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(deptHead,index) in deptHeads" :key="deptHead.id">
      <td>{{index+1}}</td>
      <td>{{deptHead.first_name+" "+deptHead.last_name}}</td>
      <td>{{deptHead.phone_no}}</td>
      <td>{{deptHead.email}}</td>
       <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm py-0">
              <li><span @click="editDeptHead(deptHead)" class="dropdown-item px-4 py-2">Edit</span></li>
             <li><span @click="showDeleteModal(deptHead)" class="dropdown-item px-4 py-2">Delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>
</table>
  <div v-if="!deptHeads.length" class="text-center mt-1">There isno added department head</div>

    </base-card>
    <!-- department head registration form dialog-->
<base-modal :is-Loading="isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedDeptHead" @save="registerDepartmentHead" @cancel="clearAddModal">
  <template #modalBody>
    {{departmentHead}}
      <form>
        <div class="mb-3" :class="{warining:v$.departmentHead.first_name.$error}">
          <label for="fname" class="form-label">First Name</label>
          <input type="text" class="form-control" id="fname" v-model.trim="departmentHead.first_name" @blur="v$.departmentHead.first_name.$touch">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.departmentHead.first_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
        <div class="mb-3" :class="{warining:v$.departmentHead.last_name.$error}">
          <label for="lname" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="lname" v-model.trim="departmentHead.last_name" @blur="v$.departmentHead.last_name.$touch">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.departmentHead.last_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
        <div class="mb-3" :class="{warining:v$.departmentHead.phone_no.$error}">
          <label for="phoneNo" class="form-label">Phone Number</label>
          <input type="tel" class="form-control" id="phoneNo" v-model="departmentHead.phone_no" @blur="v$.departmentHead.phone_no.$touch">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.departmentHead.phone_no.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
        <div class="mb-3" :class="{warining:v$.departmentHead.email.$error}">
           <label for="exampleFormControlInput1" class="form-label">Email address</label>
           <input type="email" class="form-control" id="exampleFormControlInput1" v-model="departmentHead.email" @blur="v$.departmentHead.email.$touch">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.departmentHead.email.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
     </form>
 <p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
 </template>    
</base-modal>

<!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="buttonType" :isLoading="isLoading" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{deleteHead.first_name+' '+deleteHead.last_name}}</i>?</div>
      <p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
   </template>
</base-modal>

</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,numeric,helpers, maxLength} from '@vuelidate/validators'
export default {
  components:{},
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
           deleteBaseModal:null,
           deleteHead:'',
           isLoading:false,
           isSuccessed:true,
           isFaild:false,
           resultNotifier:'',
           deptHeadType:null,
           buttonType:'',
           deptHeadId:null,
           departmentHead:{
             first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             role:''
           }
       }
   },
   validations(){
     return {
      departmentHead:{
        first_name:{
              required: helpers.withMessage('first name can not be empty',required),
          },
        last_name:{
              required: helpers.withMessage('last name can not be empty',required),
            },
        phone_no:{
              required: helpers.withMessage('phone number can not be empty',required),
               numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 13 digits long',maxLength(13)),
               },
               email:{required:helpers.withMessage('email can not be empty',required),email}
        }
     }
   },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
     this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
   },
   computed:{
     deptHeads(){
       return this.$store.getters['dean/departmentHeads']
     }
   },
   methods: {
      addDepartmentHead(){
         this.basemodal.show();
         this.buttonType = 'add'
      }  ,
      showDeleteModal(head){
           this.deleteHead={...head}
           this.buttonType='delete'
           this.deleteBaseModal.show()
      },
      clearDeleteModal(){
        this.resultNotifier=''
         this.deleteHead={}
      },
      clearAddModal(){
        this.departmentHead.first_name =''
        this.departmentHead.last_name = ''
        this.departmentHead.phone_no = ''
        this.departmentHead.email = ''
        this.resultNotifier=''
        this.v$.$reset()
      },
      registerDepartmentHead(){
        this.resultNotifier=''
        this.departmentHead.role='department_head'
        this.v$.$validate()
        if(!this.v$.$error){
          this.isLoading = true
          this.$store.dispatch('dean/addDepartmentHead',this.departmentHead).then((response)=>{
           if(response.status === 201){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have registered one department Head succesfully'
           this.isLoading = false
           this.basemodal.hide()
           this.clearAddModal()
         }
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       })
       }
      },
      editDeptHead(departmentHead){
        this.basemodal.show();
        this.buttonType = 'edit'        
        this.departmentHead.first_name = departmentHead.first_name
        this.departmentHead.last_name = departmentHead.last_name
        this.departmentHead.phone_no = departmentHead.phone_no
        this.departmentHead.profession = departmentHead.profession
        this.departmentHead.email = departmentHead.email
        this.departmentHead.role=departmentHead.role
        this.deptHeadId = departmentHead.id
      },
      saveEditedDeptHead(){
        this.resultNotifier=''
        this.v$.$validate()
         if(!this.v$.$error){
           this.isLoading = true
         this.departmentHead.id=this.deptHeadId
       this.$store.dispatch('dean/updateDepartmentHead',this.departmentHead).then((response)=>{
         if(response.status === 200){
      
           this.basemodal.hide()
           this.clearAddModal()
         }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = 'Faild to update head'
       }).finally(()=>{
         this.isLoading = false
       })
       }
      
      },
      deleteItem(){
      this.isLoading = true
       this.$store.dispatch('dean/deleteDepartmentHead',this.deleteHead.id).then((response)=>{
         if(response.status === 200){
          
           this.deleteBaseModal.hide()
           this.clearAddModal()
         }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = 'Faild to delete head'
       }).finally(()=>{
         this.isLoading = false
       })
         
      }
   }, 
}
</script>
