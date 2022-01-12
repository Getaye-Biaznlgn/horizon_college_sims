<template>
<base-card class="px-3 mx-4 mt-3"> 
    <span @click="$router.back()" role="button" class="back  d-block pe-2 fw-bold fs-5"><i class="fas  fa-arrow-left"></i>Back</span>
<div class="d-flex mt-2">
  <div class="d-flex border rounded">
      <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Search by ID" aria-label="search" aria-describedby="basic-addon2"/>
         <span role="button" class="input-group-text search rounded-0" id="basic-addon2">
            <i class="fas fa-search"></i>
         </span>           
   </div>
 <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="exportStudentResult"><i class="fas fa-print me-2"></i>Print</button> 
</div>

<div id="toPrint">
  <div class="m-2 sr-only">
    {{section?.department+' '+section?.program?.toLowerCase()+' section '+section?.name+' student result'}}
  </div>
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
    <tr v-for="(student,index) in filteredStudents" :key="student?.id">
      <!-- {{student}} -->
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td>{{student.from_11}}</td>
      <td>{{student.from_12}}</td>
      <td>{{student.from_12s}}</td>
      <td>{{student.from_25}}</td>
      <td>{{student.from_40}}</td>
      <td>{{student.result}}</td>
      <td>
          <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li><span role="button" @click="showAddDialog(student)" class="dropdown-item px-4 py-2">Set Result</span></li>
          </ul>
        </div>
      </td>
    </tr>
    </tbody>  
   </table>
  <div  v-if="!students.length" class="text-center">There is no added student</div>
  <div  v-else-if="!filteredStudents.length" class="text-center">There is no search result</div>
</div>
</base-card>

 <base-modal @save="save" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.result.from_11.$error}">
           <label for="#from_11" class="form-label">From 11%</label>
           <input class="form-control" v-model.trim="result.from_11" @blur="v$.result.from_11.$touch" id="from_11" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_11.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_12s.$error}">
           <label for="#from_12s" class="form-label">From 12%</label>
           <input class="form-control" v-model.trim="result.from_12s" @blur="v$.result.from_12s.$touch" id="from_12s" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_12s.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_12.$error}">
           <label for="#from_12" class="form-label">From 12%</label>
           <input class="form-control" v-model.trim="result.from_12" @blur="v$.result.from_12.$touch" id="from_12" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_12.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_25.$error}">
           <label for="#from_25" class="form-label">From 25%</label>
           <input class="form-control" v-model.trim="result.from_25" @blur="v$.result.from_25.$touch" id="from_25" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_25.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_40.$error}">
           <label for="#from_40" class="form-label">From 40%</label>
           <input class="form-control" v-model.trim="result.from_40" @blur="v$.result.from_40.$touch" id="from_40" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_40.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
      </form>
      <request-status-notifier :notificationMessage="requestStatus.message" :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
  </base-modal>

</template>
<script>
import {Modal} from 'bootstrap'
import vuelidate from '@vuelidate/core'
import {numeric, helpers, maxValue, minValue, required} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
import { mapGetters } from 'vuex'
export default {
  props:['id'],
    data(){
        return{
            v$:vuelidate(),
            students:[],
            result:{
                from_11:'',
                from_12:'',
                from_25:'',
                from_12s:'',
                from_40:'',
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
    computed:{
       section(){
         return this.$store.getters['teacher/sectionById'](this.id)
       },
       ...mapGetters(['user']),
       filteredStudents(){
         let tempStudents=[...this.students]
         if(this.searchValue!==''){
            tempStudents=  this.students.filter((student)=>{
            return student.student_id.toLowerCase().startsWith(this.searchValue.toLowerCase())
          })
         }
       
        
          return tempStudents
       }
    },
    methods:{
        exportStudentResult(){
           this.$htmlToPaper('toPrint')
        },
         showAddDialog(result){
           this.result={...result}
             this.actionButtonType='add'
             this.addBaseModal.show()
         },
         clearModal(){
            //  this.result=''
            this.requestStatus.message=''
             this.v$.$reset()
         },
        async save(){
             this.v$.$validate()
             if(!this.v$.$error){
                 this.isSaving=true
                 try{
                    let response= await apiClient.post('api/teacher_set_result/'+this.result.id, {
                      type:this.section.type,
                      course_id:this.section.course_id,
                      total_mark:Number(this.result.from_11)+Number(this.result.from_12)+Number(this.result.from_12s)+Number(this.result.from_25)+Number(this.result.from_40),
                      from_11:this.result.from_11,
                      from_12:this.result.from_12,
                      from_12s:this.result.from_12s,
                      from_25:this.result.from_25,
                      from_40:this.result.from_40,
                      
                    })
                    this.result.result=Number(this.result.from_11)+Number(this.result.from_12)+Number(this.result.from_12s)+Number(this.result.from_25)+Number(this.result.from_40)
                    if(response.status===200){
                      const index=this.students.findIndex((student)=>{
                          return student.id===this.result.id
                      })
                      this.students[index]=this.result
                       this.requestStatus.isNotSucceed=false,
                       this.requestStatus.message="Result is submitted successfully"
                    }else{
                        throw''
                    }
                  }
                 catch(e){
                    this.requestStatus.isNotSucceed=true,
                    this.requestStatus.message="Faild to submit result"
                   }
                 finally{
                   this.isSaving=false
                   }
                 }
                 else{
                  console.log('form validation faild')
                }
         },
       async fetchStudentsResult(id, payload){
             this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.post('/api/teacher_section_students/'+id, payload)
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
                from_11:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 11', maxValue(11)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                     required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)

            },
                 from_12:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 12', maxValue(12)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                    required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)

               },
                 from_12s:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 12', maxValue(12)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                    required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)
               },
                 from_25:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 25', maxValue(25)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                    required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)

               },
                 from_40:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 40', maxValue(40)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                    required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)

               }
            }
        }
    },
    mounted(){
        this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
    },
    created(){
      this.fetchStudentsResult(this.id, {teacher_id:this.user.id, type:this.section?.type, course_id:this.section?.course_id})
    },
    
    watch:{
      section(newValue){
         this.fetchStudentsResult(this.id, {teacher_id:this.user.id, type:newValue.type, course_id:this.section?.course_id})
      }
    }
}
</script>