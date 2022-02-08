<template>
<base-card class="px-3 mx-4 mt-3"> 
 <div class="d-flex">
     <span @click="back" class="back pe-2 fw-bold"><i class="fas  fa-arrow-left"></i>Back</span>
     <div class=" ms-auto">
     <button @click="showAddModal" class="btn btn-add  ms-auto text-white shadow-sm" > Add Student</button> 
    </div>
 <div class="ps-3">
    <button @click="print" class="btn btn-add ms-auto text-white shadow-sm"><i class="fas fa-sign-out-alt me-2"></i>Export</button> 
 </div>
</div>
<div id="printed">
 <div v-if="section"  class="fw-bold">
    {{section.tvet_department?.name + ' '+section.program.name+' program '+' Level '+section.level.level_no
     +' section '+ section?.name +' students'}}   
 </div>
 
<table class="mt-2">
  <thead>
    <tr>
      <th>NO</th>
      <th>Stud ID</th>
      <th>Full Name</th>
      <th>sex</th>
      <th v-show="!isPrinting"><span class="sr-only">Action</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(student, index) in students" :key="student.id">
      <td>{{index+1}}</td>
      <td>{{student.student_id}}</td>
      <td>{{student.first_name+' '+student.last_name}}</td>
      <td>{{student.sex}}</td>
      <td v-show="!isPrinting">
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu bordre rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
             <li @click="removeStudent(student.id)"><span class="dropdown-item px-4 py-2">Remove</span></li>
          </ul>
        </div>
      </td>
    </tr>
   </tbody>
  </table>
  <div v-if="!students.length" class="text-center mt-">Student isn't added</div>
</div>
</base-card >
<!-- Modal -->
<transition>
<div v-if="modalState" class="modalm w-100  h-100 position-fixed top-0 start-0" open>
  <div v-if="suggestedStudents.length" class="mx-auto w-50   modalContent bg-white shadow rounded rounded-lg">
    <button @click="dismissModal"  class="btn fs-5 float-end"><i class="fas fa-times"></i></button>   
      <div class="mx-5 my-2">
        <button @click="addStudentToSection" :disabled="!studentsTobeAdded.length" class="btn mt-2 btn-add  text-white shadow-sm" > 
            <span v-if="isSaving">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 Adding
               </span>      
            <span v-else>Add to section</span>   
        </button>
      </div>   
      <p :class="responseMessage.status?'text-success':'text-danger'">{{responseMessage?.message}}</p>
   <div class="table-content">
    <table class="">
     <thead>
        <tr class="table-header">
           <th><input type="checkbox" @change="toggleSelectAll($event)" class="form-check-input check-box"  name="" id=""></th>
           <th>NO</th>
           <th>Stud ID</th>
           <th>Full Name</th>
           <th>sex</th>
           <th>Level</th>
       </tr>
    <tr v-for="(student, index) in suggestedStudents" :key="student.id">
       <th><input type="checkbox" v-model="studentsTobeAdded" :value="student.id"  class="form-check-input p-1"  name="suggestedStudent"  :id="student.id"></th>
       <th>{{index+1}}</th>
       <th>{{student.id}}</th>
       <th>{{student.first_name+' '+student.last_name}}</th>
       <th>{{student.sex}}</th>
       <th>{{student.current_level_no}}</th>
    </tr>
  </thead> 
 </table>
 </div>
 </div>
 <div v-else class="ms-auto mt-4 me-auto py-3  errorModal bg-white shadow rounded rounded-lg">
      <div class="head fw-bold mx-3">Sorry</div>
      <div class="my-4 mx-3 content">There is no unassigned student</div>
      <div class="d-flex">
        <button @click="dismissModal" class="btn me-3 btn-add text-white ms-auto">OK</button>
      </div>
 </div>
 </div>
</transition>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import { mapGetters } from 'vuex'

export default {
  props:['sectionId'],
  data() {
    return {
    isSaving:false,  
    modalState:false,
    responseMessage:'',
    isPrinting:false,
    printTimeout:null,
    students:[],
    suggestedStudents:[],
    studentsTobeAdded:[]
    }
  },
   computed:{
   ...mapGetters({sections:'tvetHead/sections',selectedYearId:'selectedAcademicYearId'}),
   section(){
     return this.sections.find((section)=>{
       return section.id===Number(this.sectionId)
     })
   },

  },

  created() {
   this.fetchSectionStudent(this.sectionId)
   this.fetchSuggestedSectionStudent(this.sectionId)
  },
  methods: {
     async removeStudent(id){
       try {
       const response= await apiClient.post('/api/tvet_remove_section_students/'+id, {section_id:this.sectionId})
         if(response.status === 200){
           const index=this.students.findIndex((student)=>{
             return student.id===id
           })
           
           this.suggestedStudents.unshift({...this.students[index]})
           this.students.splice(index,1)
         }
       } catch {
            //
        }finally{
          this.isSaving=false
        }
    },
    showAddModal(){
       this.modalState=!this.modalState
       document.documentElement.style.overflow = 'hidden'
    },
    dismissModal(){
       this.modalState=!this.modalState
       this.studentsTobeAdded=[]
      document.documentElement.style.overflow = 'scroll'
    },
   print(){
     this.isPrinting=true
     this.printTimeout=setTimeout(()=>{
       this.$htmlToPaper('printed', null,()=>{
        this.isPrinting=false
      })
     },0)
    
   },

    back(){
      this.$router.back()
    },
    async addStudentToSection(){
      try {
            this.isSaving=true
            var response = await apiClient.post('/api/tvet_add_section_students', {section_id:this.sectionId,student_ids:this.studentsTobeAdded}, {
            })
            if (response.status === 200) {

               const alreadyAddedStudentsSet=new Set(this.studentsTobeAdded)
               const unaddedStudents=this.suggestedStudents.filter((student)=>{
                 return ! alreadyAddedStudentsSet.has(student.id)
               })
             this.suggestedStudents=[...unaddedStudents]
             this.students=response.data
             this.studentsTobeAdded=[]
                this.modalState=false
            } else {
                throw 'Faild to add student'
            }
        } catch{
            this.responseMessage={message:'Faild to add students', status:0}
        }finally{
          this.isSaving=false
        }
    },
    toggleSelectAll(event){
      let selected=[]
      if(event.target.checked){
         this.suggestedStudents.forEach((student)=>{
         selected.push(student.id)
         })
      }
     this.studentsTobeAdded=selected
    },
    async  fetchSuggestedSectionStudent(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/tvet_section_suggested_students?section_id="+payload)
            console.log('tvet_section_students ',response.data)
            if (response.status === 200) {
              this.suggestedStudents=response.data
            } else {
                throw 'faild to load degree department'
            }
        }  finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
    async  fetchSectionStudent(sectionId){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/tvet_section_students/"+sectionId)
            if (response.status === 200) {
              this.students=response.data
            } else {
                throw 'faild to load degree department'
            }
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
  },
 watch:{
   selectedYearId(){
     this.$router.back()
   }
 },
 beforeUnmount(){
   clearTimeout(this.printTimeout)
 }
}
</script>
<style scoped>
.table-content{
  overflow-y: scroll;
  max-height: 80vh;
  overflow-x: hidden;
}

.fa-sign-out-alt{
  transform: rotate(-90deg);
  font-size: 20px;
}
.back{
  cursor: pointer;
}

.modalContent{
  z-index: 20;
  transition: opacity .3s ease;
}
input[type=checkbox] {
transform: scale(1.4);
}
input[type="checkbox"]:checked{
    background-color: #2f4587;
    border: none;
}

.modalm{
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
}
/* modal transition */
.v-enter-from{
  opacity: 0;
  
}
.v-enter-active{
  transition: all 0.3s ease-out;
}
.v-enter-to{
  opacity: 1;
}
.v-leave-from{
  opacity: 1;
}
.v-leave-active{
  transition: all 0.3s ease-in;
}
.v-leave-to{
  opacity: 0;
}
/* error modal content */
.errorModal{
  width: 30%;
}
</style>