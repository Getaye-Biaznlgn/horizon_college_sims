<template>
<base-card class="px-3 mx-4 mt-3">
  <span @click="back" role="button" class="back pe-2  fw-bold"><i class="fas  fa-arrow-left"></i>Back</span>
<div v-if="section" class="fw-bold mt-2">
    {{section.tvet_department?.name + ' '+section.program?.name+' program'+' Level '+section.level?.level_no+'  '+ section.name +' modules'}}   
 </div>
<table class="mt-2">
  <tr>
    <th>No</th>
    <th>Module Code</th>
    <th>Module Title</th>
    <th>Training hour</th>
    <th>Instructor</th>
    <th class="sr-only"></th>
  </tr>
  <tr v-for="(modul,index) in modules" :key="modul.id">
    <td>{{index+1}}</td>
    <td>{{modul.code}}</td>
    <td>{{modul.title}}</td>
    <td>{{modul.training_hour}}</td>
    <td>{{modul.instructor}}</td>
    <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li @click="showAssignBaseModal(modul.id)"><span class="dropdown-item px-4 py-2">Assign Instructor</span></li>
          </ul>
        </div>
    </td>
  </tr>
 </table>
 <p v-if="!modules.length" class="mt-1 text-center">There  is no added module</p>

</base-card >
<!-- assign instructor for section modul -->
  <vue-modal :modalState="assignModalState">
     <div class="modal-content ms-auto me-auto bg-white m-4 px-2">
       <div class="modal-header ">
          <button @click="dismissModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
          <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Search by name" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
         </div>
       </div>
     <div class="modal-body">
       <table class="mt-1">
         <tr>
           <th></th>
           <th>No</th>
           <th>Name</th>
           <th>Phone No</th>
           <th>Profession</th>
         </tr>
        <tbody>
          <tr v-for="(teacher, index) in filteredTeachers" :key="teacher.id">
           <td><input type="radio" v-model="sectionTeacherModule.teacher_id" :value="teacher.id" id=""></td>
           <td>{{index+1}}</td>
           <td>{{teacher.first_name +' '+teacher.last_name}}</td>
           <td>{{teacher.phone_no}}</td>
           <td>{{teacher.qualification}}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!filteredTeachers.length">No search result yet!</p>
     </div>
       <div class="modal-footer">
          <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
           <button :disabled="isSaving "  type="button" @click="dismissModal" class="btn  px-4 btn-cancel border mx-3">CANCEL</button>
           <button :disabled="isSaving || sectionTeacherModule.teacher_id==''" type="button" @click="assignTeacher" class="btn  px-4 btn-add text-white mx-3">
            <span v-if="isSaving">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               SAVING
            </span>      
            <span v-else>Assign</span>   
          </button>
       </div>
     </div>
  </vue-modal>
</template>
<script>
import {mapGetters} from 'vuex'
import apiClient from '../../../resources/baseUrl'
import VueModal from '../../../components/VueModal.vue'
export default {
  components: { VueModal },
  props:['sectionId'],
  data(){
    return{ 
      assignModalState:false,
      isSaving:false,
      actionButtonType:'',
      responseMessage:'',
      isNotSucceed:'',
      searchValue:'',
      sectionTeacherModule:{
        teacher_id:'',
        module_id:'',
        section_id:this.sectionId
      },
      modules:[],
      teachers:[]
    }
  },
computed:{
    ...mapGetters({
    sections:'tvetHead/sections'}),
    section(){
     return this.sections.find((section)=>{
       return section.id===Number(this.sectionId) 
     })
   },
   filteredTeachers(){
     let tempTeachers=[...this.teachers]
     if(this.searchValue!==null && this.searchValue!==''){
      tempTeachers= tempTeachers.filter((teacher)=>{
         return (teacher.first_name+' '+teacher.last_name).toLowerCase().startsWith(this.searchValue.toLowerCase())
       })
     }
     return tempTeachers
    }
   },
    created(){
       this.fetchSectionModules(this.sectionId)
       this.fetchActiveTeachers()
    },
 methods:{
      showAssignBaseModal(moduleId){
        this.sectionTeacherModule.module_id=moduleId
        this.assignModalState=true
       document.documentElement.style.overflow = 'hidden'
      },
      back(){
        this.$router.back()
      },
      dismissModal(){
       this.assignModalState=false
       this.responseMessage=''
       this.sectionTeacherModule.teacher_id=''
       document.documentElement.style.overflow='scroll'
     },
     async assignTeacher(){
       this.isSaving=true
        try {
            var response = await apiClient.post("/api/assign_teacher_for_module",{...this.sectionTeacherModule})
            if (response.status === 200) {
              let index= this.modules.findIndex((modul)=>{
                 return modul.id===this.sectionTeacherModule.module_id
              })
              this.modules[index].instructor=response.data
             this.assignModalState=false
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
          this.isNotSucceed=true
          this.responseMessage='Faild to assign instructor'
        } finally {
          this.isSaving=false
        }
     },
     async  fetchSectionModules(sectionId){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/section_modules?section_id="+sectionId)
            if (response.status === 200) {
              this.modules=response.data
              console.log('section module ',response.data)
            } else {
                throw 'faild to load tvet department'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
      async fetchActiveTeachers(){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/active_teachers")
            if (response.status === 200) {
              this.teachers=response.data
            } else {
                throw 'faild to active teaches'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
    },
  
 }
 </script>

<style scoped>
/* end */
.fa-sign-out-alt{
  transform: rotate(-90deg);
  font-size: 20px;
}

input[type=radio]:checked{
 color: #2f4587;
 border: none;
}
input[type=radio]{
  transform: scale(1.4);
}
  /* custome modal */
  .modal-content{
    width: 60%;
  }
  .modal-body{
    max-height: 70vh;
    overflow-y: scroll;
  }
</style>
