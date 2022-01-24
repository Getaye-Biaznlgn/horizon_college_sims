<template>
<base-card class="px-3 mx-4 mt-3">
  <span @click="back" class="back pe-2  fw-bold"><i class="fas  fa-arrow-left"></i>Back</span>
<div v-if="section" class="fw-bold mt-2">
    {{section?.degree_department?.name + ' '+section.program.name+' program'+' '+this.getTextValue(section?.year_no)+' year ' +
    this.getTextValue(section?.semester?.number) +' semester '+ 'section '+ section?.name +' courses'}}   
 </div>
<table class="mt-2">
  <tr>
    <th>No</th>
    <th>Course Code</th>
    <th>Course Title</th>
    <th>Credit hour</th>
    <th>Type</th>
    <th>Instructor</th>
    <th class="sr-only">Action</th>
  </tr>

  <tr v-for="(course,index) in courses" :key="course.id">
    <td>{{index+1}}</td>
    <td>{{course.code}}</td>
    <td>{{course.title}}</td>
    <td>{{course.cp}}</td>
    <td>{{course.type}}</td>
    <td>{{course.instructor}}</td>
    <td>
        <div class="dropdown">
           <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
           </a>
           <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li @click="showAssignBaseModal(course.id)"><span class="dropdown-item px-4 py-2">Assign Instructor</span></li>
           </ul>
        </div>
    </td>
  </tr>
 
 </table>
 <div v-if="!courses.length" class="mt-1 text-center">There is no added course</div>
</base-card >

<!-- assign instructor for section course -->
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
           <th>Qualification</th>
         </tr>
     
          <tr v-for="(teacher, index) in filteredTeachers" :key="teacher.id">
           <td><input type="radio" v-model="sectionTeacherCourse.teacher_id" :value="teacher.id" id=""></td>
           <td>{{index+1}}</td>
           <td>{{teacher.first_name +' '+teacher.last_name}}</td>
           <td>{{teacher.phone_no}}</td>
           <td>{{teacher.qualification}}</td>
          </tr>
     
      </table>
      <p v-if="!filteredTeachers.length">No search result yet!</p>
     </div>
       <div class="modal-footer">
          <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
           <button :disabled="isSaving "  type="button" @click="dismissModal" class="btn  px-4 btn-cancel border mx-3">CANCEL</button>
           <button :disabled="isSaving || sectionTeacherCourse.teacher_id==''" type="button" @click="assignTeacher" class="btn  px-4 btn-add text-white mx-3">
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
      sectionTeacherCourse:{
        teacher_id:'',
        course_id:'',
        section_id:this.sectionId
      },
      courses:[],
      teachers:[]
    }
  },
computed:{
    ...mapGetters({
    sections:'degreeHead/sections'}),
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
       this.fetchSectionCourses(this.sectionId)
       this.fetchActiveTeachers()
    },
  methods:{
      showAssignBaseModal(courseId){
        this.sectionTeacherCourse.course_id=courseId
        this.assignModalState=true
       document.documentElement.style.overflow = 'hidden'
      },
      back(){
        this.$router.back()
      },
      dismissModal(){
       this.assignModalState=false
       this.sectionTeacherCourse.teacher_id=''
       document.documentElement.style.overflow='scroll'
     },
     async assignTeacher(){
       this.isSaving=true
        try {
            var response = await apiClient.post("/api/assign_teacher_for_course",{...this.sectionTeacherCourse})
            if (response.status === 200) {
              let index= this.courses.findIndex((course)=>{
                 return course.id===this.sectionTeacherCourse.course_id
              })
              this.courses[index].instructor=response.data
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
     async  fetchSectionCourses(sectionId){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/section_courses?section_id="+sectionId)
            console.log('degree_section_courses ',response.data)
            if (response.status === 200) {
              this.courses=response.data
            } else {
                throw 'faild to load degree department'
            }
        } catch {
          //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }

      },
      async fetchActiveTeachers(){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/active_teachers")
            console.log('active teachers ',response.data)
            if (response.status === 200) {
              this.teachers=response.data
            } else {
                throw 'faild to active teaches'
            }
        } catch {
            //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
     getTextValue(num){
        switch(num){
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
  
  mounted() {

  }
  
 }
 </script>

<style scoped>

input[type=radio]:checked{
  background-color: #2f4587;
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
