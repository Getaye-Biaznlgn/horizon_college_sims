<template>
   <base-card class="px-3 mx-4 mt-3">
     <span @click="back" class="back pe-2 fw-bold" role="button"><i class="fas  fa-arrow-left"></i>Back</span>
      <div class="d-flex justify-content-between mt-2">
         <div>
            <div>Student Name: {{student?.first_name+' '+student?.middle_name}}</div>
            <div>ID No: {{student?.name}}</div>
            <div>Sex: {{student?.sex}}</div>
         </div>
         <div>
            <div>Department: {{student?.degree_department?.name}}</div>
            <div>Program: {{student?.program?.name}}</div>
            <div>Year:{{student?.current_year_no}}</div>
         </div>
      </div>
      <div class="mt-3">
<table class="mt-2">
  <tr>
    <th>No</th>
    <th>Semester</th>
    <th>Year</th>
    <th>Time</th>
    <th>State</th>
    <th>GPA</th>
  </tr>
  <tbody>
  <tr v-for="(item,index) in studentSemester" :key="item.id">
    <td>{{index+1}}</td>
    <td>{{getTextValue(item.semester_no)+' year '+getTextValue(item.year_no)+' semester'}}</td>
    <td>{{item.year}}</td>
    <td>{{item.start_date+'----'+item.end_date}}</td>
    <td>{{item.status}}/status</td>
    <td>{{item.GPA}}</td>
  </tr>
 </tbody>
  <p v-if="!studentSemester.length" class="my-2">No history found yet!</p>
</table>
 <div class="mt-3 d-flex">
    <button class="btn btn-add ms-auto text-white shadow-sm" @click="showAddModal">Add To Next Semester</button> 
 </div>

</div>
</base-card>
<base-modal @save="addStudentToNextSemester" :isLoading="isSaving"  id="addBaseModal" :button-type="actionButtonType">
      <template #modalBody>
        <div class="mb-3" :class="{warining:v$.toNewSemester.year_no.$error}">
            <div class="form-label" for="#program">Year</div>
             <select class="form-select" v-model="toNewSemester.year_no"  aria-label="select">
                 <option>Here we go</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.toNewSemester.year_no.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
         <div class="mb-3" :class="{warining:v$.toNewSemester.year_no.$error}">
            <div class="form-label" for="#program">Semester</div>
             <select class="form-select" v-model="toNewSemester.semester_no"  aria-label="select">
                 <option>Here we go</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.toNewSemester.semester_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
      </template>
</base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import { mapGetters } from 'vuex';
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import apiClient from '../../../store/baseUrl'
export default {
   props:['studentId'],
   data(){
    return{
      v$: useValidate(),
      addBaseModal:null,
      actionButtonType:'',
      studentSemester:[],
      isSaving:false,
      toNewSemester:{
        year_no:'',
        semester_id:''
      } 
    }
   },
    computed:{
     ...mapGetters({students:'degreeHead/students'}),
        student(){
        return this.students.find((student)=>{
            return student.id==this.studentId
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
      addStudentToNextSemester(){
        this.isSaving=true
        
      },
      async  fetchStudentSemester(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/student_semesters/"+payload)
            console.log('d',response.data)
            if (response.status === 200) {
              this.studentSemester=response.data
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
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
         this.fetchStudentSemester(this.studentId)
    },
    mounted(){
      this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
    },
    validations(){
     return{
      toNewSemester:{
             semester_id:{
                 required: helpers.withMessage('Semester  should be selected',required),
             },
             year_no:{
                 required: helpers.withMessage('Year should be selected',required),
              }
            }
     }
  },
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

/* new design change start*/
tbody > tr:last-child { border-bottom: 2px solid hsl(231, 16%, 91%) }
th{
  text-align: left;
  padding: 8px;
}
tr{
  border-top: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
/* end */
.btn-add{
    background-color: #2f4587;
}
.back{
  font-size: 20px;
  color: #366ad3;
}
.btn-add:hover{
  background-color: #4256b8;
}
</style>