<template>
    <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex justify-content-end">
    <button @click="addDepartmentHead()" class="btn btn-add text-white py-2 px-2">Add Department Head</button>
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
  <tbody v-if="deptHeads.length">
 
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
              <li><span @click="editDeptHead(deptHead)" class="dropdown-item px-4 py-2">edit</span></li>
             <li><span @click="deleteDeptHead(deptHead.id)" class="dropdown-item px-4 py-2">delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>
</table>
  <div v-if="!deptHeads.length" class="text-center">There isno added department head</div>

    </base-card>
    <!-- department head registration form dialog-->
    <base-modal :is-Loading="isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedDeptHead" @save="registerDepartmentHead">
    <template #modalBody>
    <div class="bg-white p-3">

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
    </div>
    <p class="ms-2 mt-3" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
</template>    
  </base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,alpha,numeric,helpers, maxLength} from '@vuelidate/validators'
export default {
  components:{},
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
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
             role:'department head'
           }
       }
   },
   validations(){
     return {
      departmentHead:{
        first_name:{required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        last_name:{required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
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
      } ,
      registerDepartmentHead(){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addDepartmentHead',this.departmentHead).then((response)=>{
         if(response.status === 201){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You register one departmentHead succesfully'
           this.isLoading = false
         }
          else{
         console.log('form faild validation ')
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
        this.deptHeadId = departmentHead.id
      },
      saveEditedDeptHead(){
        this.v$.$validate()
         if(!this.v$.$error){
           this.isLoading = true
         console.log('edit departmentHead')
         console.log(this.departmentHead)
         this.departmentHead.id=this.deptHeadId
       this.$store.dispatch('dean/updateDepartmentHead',this.departmentHead).then((response)=>{
         console.log(response)
         if(response.status === 200){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have update one departmentHead succesfully'
           this.isLoading = false
         }
          else{
         console.log('updated data faild validation ')
       }
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       })
       }
       else{
         console.log('error occured')
       }
      },
      deleteDeptHead(id){
         this.$store.dispatch('dean/deleteDepartmentHead',id)
      }
   }, 
}
</script>
