<template>
<base-card class="px-3 mx-4 mt-3">    
<div class="d-flex">
  <div class="d-flex border rounded">
      <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Search by ID" aria-label="search" aria-describedby="basic-addon2"/>
         <span role="button" class="input-group-text search rounded-0" id="basic-addon2">
            <i class="fas fa-search"></i>
         </span>           
   </div>
 <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="exportStudentResult"><i class="fas fa-print me-2"></i>Print</button> 
</div>
<div id="toPrint">
 <table class="mt-2">
  <thead>
    <tr>
      <th>NO</th>
      <th>Student ID</th>
      <th>Full Name</th>
      <th>Sex</th>
      <th>11%</th>
      <th>12%</th>
      <th>12%</th>
      <th>25%</th>
      <th>40%</th>
      <th>100%</th>
      <th><span class="sr-only"></span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(student,index) in 10" :key="student">
      <td>{{index+1}}</td>
      <td>200344345</td>
      <td>Zmene Kassie</td>
      <td>Male</td>
      <td>10</td>
      <td>12</td>
      <td>12</td>
      <td>24</td>
      <td>23</td>
      <td>83</td>
      <td>
          <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li><span role="button" @click="showAddDialog()" class="dropdown-item px-4 py-2">Set Result</span></li>
          </ul>
        </div>
      </td>
    </tr>
    </tbody>  
   </table>
  <div  v-if="!students.length" class="text-center">There is no added student</div>
</div>
</base-card>

 <base-modal @save="save" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.result.from11.$error}">
           <label for="#from11" class="form-label">From 11%</label>
           <input class="form-control" v-model.trim="result.from11" @blur="v$.result.from11.$touch" id="from11" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from11.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from12s.$error}">
           <label for="#from12s" class="form-label">From 12%</label>
           <input class="form-control" v-model.trim="result.from12s" @blur="v$.result.from12s.$touch" id="from12s" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from12s.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from12.$error}">
           <label for="#from12" class="form-label">From 12%</label>
           <input class="form-control" v-model.trim="result.from12" @blur="v$.result.from12.$touch" id="from12" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from12.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from25.$error}">
           <label for="#from25" class="form-label">From 25%</label>
           <input class="form-control" v-model.trim="result.from25" @blur="v$.result.from25.$touch" id="from25" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from25.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from40.$error}">
           <label for="#from40" class="form-label">From 40%</label>
           <input class="form-control" v-model.trim="result.from40" @blur="v$.result.from40.$touch" id="from40" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from40.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
      </form>
      <request-status-notifier :notificationMessage="requestStatus.message" :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
  </base-modal>


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
</template>
<script>
import {Modal} from 'bootstrap'
import vuelidate from '@vuelidate/core'
import {numeric, helpers, maxValue, minValue} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
    data(){
        return{
            v$:vuelidate(),
            students:[],
            result:{
                from11:'',
                from12:'',
                from25:'',
                from12s:'',
                from40:''
            },
            requestStatus:{
                message:'',
                isNotSucceed:''
            },
            addBaseModal:null,
            actionButtonType:'',
            isSaving:false,
            searchValue:'',
            
        }
    },
    methods:{
        exportStudentResult(){
           this.$htmlToPaper('toPrint')
        },
         showAddDialog(){
             this.actionButtonType='add'
             this.addBaseModal.show()
         },
         clearModal(){
             this.result.from11=''
             this.result.from12=''
             this.result.from12s=''
             this.result.from25=''
             this.result.from40=''
             this.v$.$reset()
         },
        async save(){
             this.v$.$validate()
             if(!this.v$.$error){
                 this.isSaving=true
                 try{
                    let response= await apiClient.post('api/result', this.result)
                    if(response.status===200){
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
                 else{
                  console.log('form validation faild')
                }
         },
       async fetchStudentsResult(id){
             this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get('/api/student/'+id)
            if (response.status === 200) {
              this.students=response.data
            
            } else {
              throw 'Failed to fetch event'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      }   
    },
    validations(){
        return{
            result:{
                from11:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 12', maxValue(11)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0))
               },
                 from12:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 12', maxValue(12)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0))
               },
                 from12s:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 12', maxValue(12)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0))
               },
                 from25:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 25', maxValue(25)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0))
               },
                 from40:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 40', maxValue(40)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0))
               }
            }
        }
    },
    mounted(){
        this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
    }
}
</script>