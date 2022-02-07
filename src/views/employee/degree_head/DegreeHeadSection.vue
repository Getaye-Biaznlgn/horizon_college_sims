<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex">
  <div class="pe-3">
     <select v-model="programForFilter"  class="form-select" aria-label="select by level">
        <option value="all" selected>All Program</option>
        <option v-for="program in degreePrograms" :key="program.id" :value="program.id">{{program.name}}</option>
      </select>
     </div>
   <div>
     <select v-model="yearForFilter"  class="form-select mx-2" aria-label="select by level">
            <option value="all" selected>All Year</option>
            <option v-for="n in 4" :key="n" :value="n">Year {{n}}</option>
        </select>
     </div>
    <div class="ps-3">
        <select v-model="semesterForFilter"  class="form-select mx-3" aria-label="select by level">
            <option value="all" selected>All Semester</option>
            <option v-for="n in 3" :key="n" :value="n">Semester {{n}}</option>
        </select>
     </div>
      <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="showAddModal"> Add New Section</button> 
      <button class="btn btn-add text-white shadow-sm" @click="generatePaper"><i class="fas fa-sign-out-alt me-2"></i>Export</button> 
</div>
<div id="generatedFile">
<table class="mt-2" >
  <tr>
    <th>No</th>
    <th>Section Name</th>
    <th>Department</th>
    <th>Program</th>
    <th>Year</th>
    <th>Semester</th>
    <th v-show="!isPriting"><span class="sr-only"></span></th>
  </tr>

  <tr v-for="(section, index) in filteredSections" :key="section.id">
      <td>{{index+1}}</td>
      <td>{{section.name}}</td>
      <td>{{section.degree_department.name}}</td>
      <td>{{section.program?.name}}</td>
      <td>{{section.year_no}}</td>
      <td>{{section.semester?.number}}</td>
      <td v-show="!isPriting"> 
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="$router.push({name:'DegreeSectionStudent', params:{sectionId:section.id}})"><span class="dropdown-item">View Student</span></li>
             <li @click="$router.push({name:'DegreeSectionCourse', params:{sectionId:section.id}})"><span class="dropdown-item">View Course</span></li>
             <li @click="showEditModal(section)"><span class="dropdown-item">Edit</span></li>
             <li @click="showDeleteModal(section)"><span class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
  <div v-if="!this.sections.length"  class="mt-1 text-center">Section isn't added yet.</div>
  <div v-else-if="!this.filteredSections.length" class="mt-1 text-center">There is no matching section</div>
 
 </div>
</base-card>

<base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.section.name.$error}">
              <label for="#sectionName" class="form-label">Section Name</label>
              <input class="form-control " v-model.trim="section.name" @blur="v$.section.name.$touch" id="sectionName" type="text" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.section.name.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 

         <div class="mb-3" :class="{warining:v$.section.program_id.$error}">
            <div class="form-label" for="#program">Program</div>
             <select class="form-select" v-model="section.program_id"  aria-label="select">
                 <option  v-for="program in degreePrograms" :key="program.id"  :value="program.id">{{program.name}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.program_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
         <div class="mb-3" :class="{warining:v$.section.year_no.$error}">
            <div class="form-label" for="#program">Year (Batch)</div>
             <select class="form-select" v-model="section.year_no"  aria-label="select">
                 <option  value="1">First year</option>
                 <option  value="2">Second year</option>
                 <option  value="3">Fourth year</option>
                 <option  value="4">Fifth year</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.year_no.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
          <!-- <div class="mb-3" :class="{warining:v$.section.academic_year_id.$error}"> -->
            <div class="form-label" for="#academic">Academic Year</div>
             <select class="form-select" v-model="section.academic_year_id"  aria-label="select">
                 <option  v-for="year in academicYears" :key="year.id"  :value="year.id">{{'Academic year '+year.year}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.academic_year_id.$errors" :key="index">{{ error.$message+", " }}</span>
         <!-- </div> -->
         
         <div class="mb-3" :class="{warining:v$.section.semester_id.$error}">
            <div class="form-label" for="#semester">Semester</div>
             <select class="form-select" v-model="section.semester_id"  aria-label="select">
                 <option  v-for="semester in filteredSemesters" :key="semester.id"  :value="semester.id">{{semester.number}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.semester_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
      </form>
       <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- delete base modal -->
<base-modal @deleteItem="deleteSection" :isLoading="isSaving" id="deleteBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>

      <div class="my-3">Do you want to delete {{this.selectedSectionForDelete?.program?.name}} program
          section {{this.selectedSectionForDelete?.name}}?
      </div>
        <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import {mapGetters} from 'vuex'
export default {
  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      isSaving:false,
      actionButtonType:'',
      isNotSucceed:'',
      responseMessage:'',
      selectedSection:null,
      selectedSectionForDelete:null,
      //for search and filter
      searchValue:'',
      yearForFilter:'all',
      programForFilter:'all',
      semesterForFilter:'all',
      isPrinting:false,
      section:{
         id:'',
         name:'',
         semester_id:'',
         program_id:'',
         year_no:'',
         academic_year_id:''
      }
      
    }
  },

   computed:{
    ...mapGetters({
      academicYears:'academicYears',
      sections:'degreeHead/sections',
      programs:'programs',
      selectedAcademicYearId:'selectedAcademicYearId'
      }),
    degreePrograms(){
      return this.programs.filter((program)=>{
        return program.type==='degree'
      })
    },
    filteredSemesters(){
     let tempSemesters=[]
     if(this.section.academic_year_id!==''&& this.section.program_id!==''){
        let index = this.academicYears.findIndex((year)=>{
            return year.id===this.section.academic_year_id
         })
          tempSemesters=this.academicYears[index].semesters.filter((semester)=>{
            return semester.program_id===this.section.program_id
          })
     }
      return tempSemesters
    },
    filteredSections(){
      let tempSections=[...this.sections]
      if(this.programForFilter!=='all'){
         tempSections=tempSections.filter((section)=>{
           return section.program?.id===this.programForFilter
         })
      }
      if(this.yearForFilter!=='all'){
        tempSections=tempSections.filter((section)=>{
           return section.year_no===this.yearForFilter
         })
      }
      if(this.semesterForFilter!=='all'){
         tempSections=tempSections.filter((section)=>{
           return section.semester.number===this.semesterForFilter
         })
      }
     return tempSections
    },
 },

  methods:{
    generatePaper(){
      this.isPrinting=true
     this.$htmlToPaper('generatedFile',()=>{
       this.isPrinting=false
     })
    },
      showAddModal(){
        this.responseMessage=''
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      showDeleteModal(section){
         this.responseMessage=''
         this.selectedSectionForDelete=section
         this.actionButtonType='delete'
         this.deleteBaseModal.show()
      },
      showEditModal(section){
        this.responseMessage=''
        this.section.id=section.id        
        this.section.name=section.name
        this.section.semester_id=section.semester.id
        this.section.program_id=section.program?.id
        this.section.year_no=section.year_no
        this.section.academic_year_id=section.semester.academic_year_id
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
      async deleteSection(){
        this.isSaving=true
          await this.$store.dispatch('degreeHead/deleteSection',this.selectedSectionForDelete.id)
          .then(()=>{
           this.addBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to delete section'
         }).finally(()=>{
          this.isSaving=false
         })
      },
      edit(){
         this.request('degreeHead/updateSection', this.section,'Faild to update section')
      },
      save(){
         this.request('degreeHead/addSection',this.section,'Faild to add section')
      },
     async request(action, payload, errorMessage){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,payload)
          .then(()=>{
           this.addBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage=errorMessage
         }).finally(()=>{
          this.isSaving=false
         })
       }
      },
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.deleteBaseModal = new Modal(document.getElementById('deleteBaseModal'));
  },
  created(){
    this.$store.dispatch('degreeHead/fetchSections')
  },
  watch:{
     selectedAcademicYearId(){
       this.$store.dispatch('degreeHead/fetchSections')
     }
  },
   validations(){
     return{
      section:{
             name:{
                 required: helpers.withMessage('Name  can not be empty',required),
               },
             semester_id:{
                 required: helpers.withMessage('Semester should be selected',required),
              },
             program_id:{
                 required: helpers.withMessage('program should be selected',required),
              }, 
             academic_year_id:{
                 required: helpers.withMessage('Year should be selected',required),
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
/*  */
</style>
