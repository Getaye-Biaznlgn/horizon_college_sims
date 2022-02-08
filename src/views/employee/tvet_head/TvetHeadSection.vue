<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex">
  <div class="pe-3">
     <select v-model="programForFilter"  class="form-select" aria-label="select by level">
        <option value="all" selected>All Program</option>
        <option v-for="program in tvetPrograms" :key="program.id" :value="program.id">{{program.name}}</option>
      </select>
  </div>
   <div>
       <select v-model="levelForFilter"  class="form-select mx-2" aria-label="select by level">
          <option value="all" selected>All Level</option>
          <option v-for="n in 4" :key="n" :value="n">Year {{n}}</option>
       </select>
   </div>
      <button class="btn btn-add ms-auto text-white me-2 shadow-sm" @click="showAddModal"> Add New Section</button> 
      <button class="btn btn-add text-white shadow-sm" @click="generatePaper"><i class="fas fa-sign-out-alt me-2"></i>Export</button> 
</div>

<div id="generatedFile">
  <div class="sr-only">
     {{getYearById?.year}} {{user.managet?.name}} department sections
  </div>
<table class="mt-2" >
  <tr>
    <th>No</th>
    <th>Section Name</th>
    <th>Program</th>
    <th>Level</th>
    <th v-show="!isPrinting"><span class="sr-only">Action</span></th>
  </tr>
  <tr v-for="(section, index) in filteredSections" :key="section.id">
      <td>{{index+1}}</td>
      <td>{{section.name}}</td>
      <td>{{section.program?.name}}</td>
      <td>{{section.level?.level_no}}</td>
      <td v-show="!isPrinting">
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="$router.push({name:'TvetSectionStudent', params:{sectionId:section.id}})"><span class="dropdown-item">View Student</span></li>
             <li @click="$router.push({name:'TvetSectionModule', params:{sectionId:section.id}})"><span class="dropdown-item">View Module</span></li>
             <li @click="showEditModal(section)"><span class="dropdown-item">Edit</span></li>
             <li @click="showDeleteModal(section)"><span class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
 
 </table>
  <p v-if="!this.sections.length"  class="mt-1 text-center">Section isn't added yet.</p>
  <p v-else-if="!this.filteredSections.length" class="mt-1 text-center">There is no matching section</p>
 
 </div>
</base-card>
<base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearAddModal">
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
                 <option  v-for="program in tvetPrograms" :key="program.id"  :value="program.id">{{program.name}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.program_id.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>
         <div class="mb-3" :class="{warining:v$.section.level_no.$error}">
            <div class="form-label" for="#program">Level</div>
             <select class="form-select" v-model="section.level_no"  aria-label="select">
                 <option  value="1">Level 1</option>
                 <option  value="2">Level 2</option>
                 <option  value="3">Level 3</option>
                 <option  value="4">Levle 4</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.level_no.$errors" :key="index">{{ error.$message+", " }}</span>
         </div>

            <div class="form-label" for="#academic">Academic Year</div>
             <select class="form-select" v-model="section.academic_year_id"  aria-label="select">
                 <option  v-for="year in academicYears" :key="year.id"  :value="year.id">{{'Academic year'+year.year}}</option>
             </select>
             <span class="error-msg mt-1"  v-for="(error, index) of v$.section.academic_year_id.$errors" :key="index">{{ error.$message+", " }}</span>
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
      isPrinting:false,
      printTimeout:null,
      //filter
      levelForFilter:'all',
      programForFilter:'all',
      section:{
         id:'',
         name:'',
         program_id:'',
         level_no:'',
         academic_year_id:'',
         tvet_department_id:''
      }   
    }
  },

   computed:{
    ...mapGetters({
      academicYears:'academicYears',
      sections:'tvetHead/sections',
      programs:'programs',
      selectedAcademicYearId:'selectedAcademicYearId',
      user:'user'
      }),
    tvetPrograms(){
      return this.programs.filter((program)=>{
        return program.type==='tvet'
      })
    },
    getYearById(){
       return this.$store.getters.getYearById(this.selectedAcademicYearId)
    },
    filteredSections(){
      let tempSections=[...this.sections]
      if(this.programForFilter!=='all'){
         tempSections=tempSections.filter((section)=>{
           return section.program?.id===this.programForFilter
         })
      }
      if(this.levelForFilter!=='all'){
        tempSections=tempSections.filter((section)=>{
           return Number(section.level?.level_no)===Number(this.levelForFilter)
         })
      }
      return tempSections
    },
  },

  methods:{
    clearAddModal(){
      this.section={}  
      this.v$.$reset()
    },
    generatePaper(){
     this.isPrinting=true
     this.printTimeout= setTimeout(()=>{
      this.$htmlToPaper('generatedFile',null,()=>{
         this.isPrinting=false
       })
     },0)
     
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
        this.section.program_id=section.program?.id
        this.section.level_no=section.level?.level_no
        this.section.academic_year_id=section.academic_year_id
        this.section.tvet_department_id=section.tvet_department.id
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
      async deleteSection(){
        this.isSaving=true
          await this.$store.dispatch('tvetHead/deleteSection',this.selectedSectionForDelete.id)
          .then(()=>{
           this.deleteBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to delete section'
         }).finally(()=>{
          this.isSaving=false
         })
      },
      edit(){
         this.request('tvetHead/updateSection', this.section, 'Faild to update section')
      },
      save(){
         this.section.tvet_department_id=this.user.managet.id
         this.request('tvetHead/addSection',this.section, 'Faild to add section')
      },
     async request(action, payload, errorMessage){
       this.responseMessage=''
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
    created(){
        this.$store.dispatch('tvetHead/fetchSections')
    },
     watch:{
     selectedAcademicYearId(){
       this.$store.dispatch('tvetHead/fetchSections')
     }
  },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.deleteBaseModal = new Modal(document.getElementById('deleteBaseModal'));
  },
  beforeUnmount(){
     clearTimeout(this.printTimeout)
  },
   validations(){
     return{
      section:{
             name:{
                 required: helpers.withMessage('Name  can not be empty',required),
               }, 
             program_id:{
                 required: helpers.withMessage('program should be selected',required),
              }, 
             academic_year_id:{
                 required: helpers.withMessage('Year should be selected',required),
              },
             level_no:{
                 required: helpers.withMessage('Year should be selected',required),
              }
            }
     }
  },
}
</script>


