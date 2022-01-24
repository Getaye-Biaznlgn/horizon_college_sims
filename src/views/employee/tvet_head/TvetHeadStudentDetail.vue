<template>
   <base-card class="px-3 mx-4 mt-3">
     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
      <div class="d-flex justify-content-between mt-2">
         <div>
            <div>Student Name: {{studentLevel?.name}}</div>
            <div>ID No: {{studentLevel?.student_id}}</div>
            <div>Sex: {{studentLevel?.sex}}</div>
         </div>
         <div>
            <div>Department: {{studentLevel?.department?.name}}</div>
            <div>Program: {{studentLevel?.program}}</div>
            <div>Level: {{studentLevel?.current_level_no}}</div>
         </div>
      </div>
<!-- {{studentLevel}} -->
<div class="mt-3">
 <table class="mt-2">
  <tr>
    <th>No</th>
    <th>Year</th>
    <th>Level</th>
    <th>State</th>
  </tr>
  <tr v-for="(item,index) in studentLevel.levels" :key="item.id">
    <td>{{index+1}}</td>
    <td>{{item.year}}</td>
    <td>{{item.level_no}}</td>
    <td>{{item.status}}</td>
  </tr>
</table>
  <p v-if="!studentLevel.levels?.length" class="mt-1 text-center">No history found yet!</p>
 <div class="mt-3 d-flex">
    <button class="btn btn-add ms-auto text-white shadow-sm" @click="showAddModal">Add To Next Level</button> 
 </div>

</div>
</base-card>
<base-modal @save="addStudentToNextLevel" :isLoading="isSaving"  id="addBaseModal" :button-type="actionButtonType" @cancel="clearAddModal">
      <template #modalBody>
          <div class="mb-3" :class="{warining:v$.toNewLevel.academic_year_id.$error}">
            <div class="form-label" for="#program">Academic Year</div>
             <select class="form-select" v-model="toNewLevel.academic_year_id"  aria-label="select">
                 <option v-for="year in notClosedAcademicYears" :key="year.id" :value="year.id" :selected="Number(year.is_current) === 1">{{year.year}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.toNewLevel.level_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
  
        <div class="mb-3" :class="{warining:v$.toNewLevel.level_id.$error}">
            <div class="form-label" for="#program">Level No</div>
             <select class="form-select" v-model="toNewLevel.level_id"  aria-label="select">
                 <option v-for="level in levels" :key="level.id" :value="level.id">{{level.occupation_name+' '+level.level_no}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.toNewLevel.level_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
         <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
     
      </template>
</base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapGetters } from 'vuex';
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
export default {
   props:['studentId'],
   data(){
    return{
      v$: useValidate(),
      addBaseModal:null,
      actionButtonType:'',
      studentLevel:{},
      responseMessage:'',
      isSaving:false,
      isNotSucceed:false,
      levels:[],

      // studentCurrentYearNo:'',
      toNewLevel:{
        level_id:'',
        academic_year_id:'',
        student_id:this.studentId
      } 
    }
   },
    computed:{
     ...mapGetters({ academicYears:'academicYears'}),
      notClosedAcademicYears(){
        return this.academicYears.filter((year)=>{
          return !year.is_closed
        })
      },
    },
    methods:{
      showAddModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      back(){
        this.$router.back()
      },
      clearAddModal(){
        this.responseMessage=''
      },
      async addStudentToNextLevel(){
        this.responseMessage=''
          this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
        try {
            var response = await apiClient.post("/api/register_student_for_level",this.toNewLevel)
            if (response.status === 201) {
              this.studentLevel.levels.push(response.data)
              this.toNewLevel.level_id=''
              this.toNewLevel.academic_year_id='',
              this.v$.$reset()
              this.addBaseModal.hide()
            }
            else if(response.status===200){
             this.responseMessage='Student is already registered'
             this.isNotSucceed=true
            }
            else {
                throw 'Faild add to next department'
            }
        } catch (e) {
            this.responseMessage='Faild to add semester'
            this.isNotSucceed=true
        } finally {
            this.isSaving=false
        }
       }
    },
      async  fetchStudentLevel(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/student_levels/"+payload)
            if (response.status === 200) {
              this.studentLevel=response.data
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
      async  fetchDepartmentLevels(){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/department_levels")
            if (response.status === 200) {
              this.levels=response.data
              
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
    getTextValue(num){
      switch(Number(num)){
        case 1:
            return 'first'
         case 2:
             return 'second'
         case 3:
             return 'third'
         case 4:
             return 'fourth'          
        case 5:
            return 'fifth'
         default:
         return num  
    }
}
    },
    created(){
         this.fetchStudentLevel(this.studentId)
         this.fetchDepartmentLevels()
         
    },
    mounted(){
      this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
    },
    validations(){
     return{
      toNewLevel:{
            level_id:{
                required: helpers.withMessage('Semester  should be selected',required),
            },
          
            academic_year_id:{
                required: helpers.withMessage('Year should be selected',required),
             }

          }
     }
  },
}
</script>
