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
      <th>20%</th>
      <th>30%</th>
      <th>50%</th>
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
      <td>{{student.from_20}}</td>
      <td>{{student.from_30}}</td>
      <td>{{student.from_50}}</td>
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
        <div class="mb-3" :class="{warining:v$.result.from_20.$error}">
           <label for="#from_20" class="form-label">From 20%</label>
           <input class="form-control" v-model.trim="result.from_20" @blur="v$.result.from_20.$touch" id="from_20" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_20.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_30.$error}">
           <label for="#from_30" class="form-label">From 20%</label>
           <input class="form-control" v-model.trim="result.from_30" @blur="v$.result.from_30.$touch" id="from_30" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_30.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.result.from_50.$error}">
           <label for="#from_50" class="form-label">From 50%</label>
           <input class="form-control" v-model.trim="result.from_50" @blur="v$.result.from_50.$touch" id="from_50" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.result.from_50.$errors" :key="index">{{ error.$message+", " }}</span>
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
                from_20:'',
                from_30:'',
                from_50:'',
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
           if(result.legible===0){
             this.$store.commit('setAlertMessages',{
                text:'Student don\'t complete tution fee!',
                type:'danger'
              })
              return;
           }
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
                      total_mark:Number(this.result.from_20)+Number(this.result.from_5)+Number(this.result.from_5s)+Number(this.result.from_30)+Number(this.result.from_50),
                      from_20:this.result.from_20,
                      from_30:this.result.from_30,
                      from_50:this.result.from_50,
                      
                    })
                    this.result.result=Number(this.result.from_20)+Number(this.result.from_5)+Number(this.result.from_5s)+Number(this.result.from_30)+Number(this.result.from_50)
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
                from_20:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 20', maxValue(20)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                     required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)
            },
                 from_30:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 30', maxValue(30)),
                    minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
                    required:helpers.withMessage('Can\'t be empty,at least make it 0 ', required)

               },
                 from_50:{
                    numeric:helpers.withMessage('Value should be number', numeric),
                    maxValue:helpers.withMessage('Shouldn\'t be greater than 50', maxValue(50)),
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