<template>
  <div class="mx-2 mt-4 mb-5">
    <div class="py-2">Degree Program Academic Activities</div>
    <!-- regular program -->
  <div class="border">
      <div class="py-3 ps-3">Regular Program</div>
      <div class="accordion" id="accordion1">
         <div class="accordion-item">
             <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#regularFirst" aria-expanded="false" aria-controls="regularFirst">
                 Semester I <span  @click.stop="showAddModal('regularFirst')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
                </button>
            </h2>
            <div id="regularFirst" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordion1">
               <div class="accordion-body p-0">
                  <table class="m-0">
                     <tr>
                       <th>Date</th>
                       <th>Activity</th>
                       <th class="sr-only">Action</th>
                     </tr>
                      <tr v-for="(act,index) in activities.regular.firstSemester" :key="index">
                        <td>{{act.date}}</td>
                        <td>{{act.task}}</td>
                        <td class="text-center" style="white-space:nowrap !important"> 
                           <span @click="showEditModal('regularFirst',index)" role="button"><i class="far fa-edit fs-4"></i></span>
                           <span @click="deleteItem('regularFirst', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                         </td>
                      </tr>
                   </table>
              </div>
             </div>
         </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#regularSecond" aria-expanded="false" aria-controls="regularSecond">
        Semester II <span  @click.stop="showAddModal('regularSecond')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
      </button>
    </h2>
    <div id="regularSecond" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion1">
       <div class="accordion-body p-0">
          <table class="m-0">
              <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th class="sr-only">Action</th>
              </tr>
               <tr v-for="(act,index) in activities.regular.secondSemester" :key="index">
                  <td>{{act.date}}</td>
                  <td>{{act.task}}</td>
                  <td class="text-center" style="white-space:nowrap !important">
                      <span @click="showEditModal('regularSecond', index)" role="button"><i class="far fa-edit fs-4"></i></span>
                      <span @click="deleteItem('regularSecond', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                  </td>
               </tr>
          </table>
      </div>
    </div>
  </div>
  
</div>
</div>

<!-- extension -->
 <div class="border mt-4">
      <div class="py-3 ps-3">Extension Program</div>
      <div class="accordion" id="accordion2">
         <div class="accordion-item">
             <h2 class="accordion-header" id="exFirst">
                <button class="accordion-button position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#extensionFirst" aria-expanded="false" aria-controls="extensionFirst">
                 Semester I <span  @click.stop="showAddModal('extensionFirst')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
                </button>
            </h2>
            <div id="extensionFirst" class="accordion-collapse collapse " aria-labelledby="exFirst" data-bs-parent="#accordion2">
               <div class="accordion-body p-0">
                  <table class="m-0">
                     <tr>
                       <th>Date</th>
                       <th>Activity</th>
                       <th class="sr-only">Action</th>
                     </tr>
                      <tr v-for="(act,index) in activities.extension.firstSemester" :key="index">
                        <td>{{act.date}}</td>
                        <td>{{act.task}}</td>
                        <td class="text-center" style="white-space:nowrap !important">
                           <span @click="showEditModal('extensionFirst',index)" role="button"><i class="far fa-edit fs-4"></i></span>
                           <span @click="deleteItem('extensionFirst', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                         </td>
                      </tr>
                   </table>
              </div>
             </div>
         </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="exSecond">
      <button class="accordion-button collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#extensionSecond" aria-expanded="false" aria-controls="extensionSecond">
        Semester II <span  @click.stop="showAddModal('extensionSecond')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
      </button>
    </h2>
    <div id="extensionSecond" class="accordion-collapse collapse" aria-labelledby="exSecond" data-bs-parent="#accordion2">
       <div class="accordion-body p-0">
          <table class="m-0">
              <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th class="sr-only">Action</th>
              </tr>
               <tr v-for="(act,index) in activities.extension.secondSemester" :key="index">
                    <td>{{act.date}}</td>
                    <td>{{act.task}}</td>
                    <td class="text-center" style="white-space:nowrap !important">
                      <span @click="showEditModal('extensionSecond', index)" role="button"><i class="far fa-edit fs-4"></i></span>
                      <span @click="deleteItem('extensionSecond', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                    </td>
                </tr>
          </table>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="exThird">
      <button class="accordion-button collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#extensionThird" aria-expanded="false" aria-controls="extensionThird">
         Semester III <span  @click.stop="showAddModal('extensionThird')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
      </button>
    </h2>
    <div id="extensionThird" class="accordion-collapse collapse" aria-labelledby="exThird" data-bs-parent="#accordion2">
       <div class="accordion-body p-0">
          <table class="m-0">
              <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th class="sr-only">Action</th>
              </tr>
               <tr v-for="(act,index) in activities.extension.thirdSemester" :key="index">
                   <td>{{act.date}}</td>
                   <td>{{act.task}}</td>
                   <td class="text-center" style="white-space:nowrap !important">
                      <span @click="showEditModal('extensionThird',index)" role="button"><i class="far fa-edit fs-4"></i></span>
                      <span @click="deleteItem('regularThird', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                   </td>
                </tr>
          </table>
      </div>
    </div>
  </div>
</div>
</div>

<!-- //tvet -->
<div class="py-3 mt-3">TVET Program Academic Program</div>
<div class="accordion" id="accordionTvet">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#tvetActivities" aria-expanded="false" aria-controls="tvetActivities">
         TVET Program <span  @click.stop="showAddModal('tvetActivity')" class="btn position-absolute p-1 on-accordion-add"><i class="fas fa-plus-circle fs-4"></i></span>
      </button>
    </h2>
    <div id="tvetActivities" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionTvet">
       <div class="accordion-body p-0">
          <table class="m-0">
              <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th class="sr-only">Action</th>
              </tr>
               <tr v-for="(act,index) in activities.tvet" :key="index">
                  <td>{{act.date}}</td>
                  <td>{{act.task}}</td>
                  <td class="text-center" style="white-space:nowrap !important">
                      <span @click="showEditModal('tvetActivity',index)" role="button"><i class="far fa-edit fs-4"></i></span>
                      <span @click="deleteItem('tvetActivity', index)" role="button" class="ms-3"><i class="fas fa-backspace fs-4"></i></span>
                  </td>
                </tr>
          </table>
      </div>
    </div>
  </div>
</div>
{{requestStatus.isSaving}}
     <div class="mb-4 pt-5 d-flex">
            <button @click="back"  class="btn ms-auto border px-3">Back</button>
            <button @click="submitForm"  :disabled="requestStatus.isSaving" type="button"  class="btn   px-4 btn-add text-white mx-3">
            <span v-if="requestStatus.isSaving">
              <span   class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Saving
              </span>      
            <span v-else>Finish</span>   
          </button>
      </div>
  </div>

  <vue-modal :modalState="modalState">
     <div class="modal-content mt-4 mx-auto bg-white p-3">
        <div class="header">
            <button @click="dismissVueModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
        </div>
        <div class="body ">
          <strong class="d-block mb-3">Add Activity</strong>
          <div class="mb-3" :class="{warining:v$.plan.date.$error}"> 
              <label for="#planDate" class="form-label">Date</label>
              <input class="form-control " v-model.trim="plan.date" @blur="v$.plan.date.$touch" id="planDate" type="text" placeholder="" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.plan.date.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.plan.task.$error}"> 
              <label for="#planTask" class="form-label">Activity</label>
              <textarea class="form-control " v-model.trim="plan.task" @blur="v$.plan.task.$touch" id="planTask" rows="5" aria-label=".form-control"></textarea>
              <span class="error-msg mt-1"  v-for="(error, index) of v$.plan.task.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
        </div>
         <div class="footer">
             <button v-if="modalType==='add'" @click="addActivity" class="btn btn-add text-white px-3 d-block ms-auto">Add</button>
             <button v-else-if="modalType==='edit'" @click="editActivity" class="btn btn-add text-white px-3 d-block ms-auto">Edit</button>
       </div>
     </div>
  </vue-modal>
</template>
<script>
import VueModal from '../VueModal.vue'
import useValidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
export default {
  components:{VueModal},
  inject:['setSelectedComponent','requestStatus', 'save'],
  data(){
    return{
      v$:useValidate(),
        activities:{
          regular:{
            firstSemester:[],
            secondSemester:[]
          },
          extension:{
            firstSemester:[],
            secondSemester:[],
            thirdSemester:[]
          },
          tvet:[]    
         },

         modalState:false,//to show/close modal
         semesterType:'',//to choose which accordion is
         modalType:'',//edit or add, it used to control button type on vuemodal
         plan:{
           task:'',
           date:''
         },
         selectedIndex:'',
    }
  },
  methods:{
    submitForm(){
       this.save(this.activities)
    },
    dismissVueModal(){
      this.modalState=false
      this.plan.task=''
      this.plan.date=''
      this.v$.$reset()
    },
    showAddModal(type){
      this.modalType='add'
      this.semesterType=type
      this.modalState=true
    },
    back(){
      this.setSelectedComponent('FeeMonth')
    },
    showEditModal(type,index){
      this.modalType='edit'
      this.modalState=true
      this.semesterType=type
      this.selectedIndex=index
      if(this.semesterType==='regularFirst'){
         this.plan = {...this.activities.regular.firstSemester[index]}
       }
      else if(this.semesterType==='regularSecond'){
         this.plan = {...this.activities.regular.secondSemester[index]}
       }
      else if(this.semesterType==='extensionFirst'){
         this.plan= {...this.activities.extension.firstSemester[index]} 
       }
      else if(this.semesterType==='extensionSecond'){
         this.plan= {...this.activities.extension.secondSemester[index]} 
       }
      else if(this.semesterType==='extensionThird'){
         this.plan= {...this.activities.extension.thirdSemester[index]} 
       }
      else if(this.semesterType==='tvetActivity'){
        this.plan= {...this.activities.tvet[index]} 
       }
    },
     deleteItem(type,index){
      if(type==='regularFirst'){
        this.activities.regular.firstSemester.splice(index,1)
       }
      else if(this.semesterType==='regularSecond'){
         this.activities.regular.secondSemester.splice(index,1)
       }
      else if(this.semesterType==='extensionFirst'){
         this.activities.extension.firstSemester.splice(index,1)
       }
      else if(this.semesterType==='extensionSecond'){
         this.activities.extension.secondSemester.splice(index,1)
       }
      else if(this.semesterType==='extensionThird'){
        this.activities.extension.thirdSemester.splice(index,1)
       }
      else if(this.semesterType==='tvetActivity'){
        this.activities.tvet.splice(index,1)
       }
    },
    editActivity(){
    this.v$.$validate()
      if(!this.v$.$error){
           if(this.semesterType==='regularFirst'){
              this.activities.regular.firstSemester[this.selectedIndex]={...this.plan}
            }
            else if(this.semesterType==='regularSecond'){
              this.activities.regular.secondSemester[this.selectedIndex]={...this.plan}
            }
            else if(this.semesterType==='extensionFirst'){
              this.activities.extension.firstSemester[this.selectedIndex]={...this.plan}
            }
            else if(this.semesterType==='extensionSecond'){
              this.activities.extension.secondSemester[this.selectedIndex]={...this.plan}
            }
            else if(this.semesterType==='extensionThird'){
              this.activities.extension.thirdSemester[this.selectedIndex]={...this.plan}
            }
            else if(this.semesterType==='tvetActivity'){
              this.activities.tvet[this.selectedIndex]={...this.plan}
            }
            this.modalState=false 
            this.plan.task=''
            this.plan.date=''
            this.selectedIndex=''
            this.semesterType=''
            this.v$.$reset()
         }
    },
    addActivity(){
        this.v$.$validate()
      if(!this.v$.$error){
           if(this.semesterType==='regularFirst'){
              this.activities.regular.firstSemester.push({...this.plan})
            }
            else if(this.semesterType==='regularSecond'){
              this.activities.regular.secondSemester.push({...this.plan})
            }
            else if(this.semesterType==='extensionFirst'){
              this.activities.extension.firstSemester.push({...this.plan})
            }
            else if(this.semesterType==='extensionSecond'){
              this.activities.extension.secondSemester.push({...this.plan})
            }
            else if(this.semesterType==='extensionThird'){
              this.activities.extension.thirdSemester.push({...this.plan})
            }
            else if(this.semesterType==='tvetActivity'){
              this.activities.tvet.push({...this.plan})
            }
            this.modalState=false 
            this.plan.task=''
            this.plan.date=''
            this.v$.$reset()
         }
    }
  
  },
  validations(){
       return{
         plan:{
             task:{
                required: helpers.withMessage('Activity can not be empty',required),
               },
             date:{
                 required:helpers.withMessage('Date can not be empty', required)
             },
        }
     }
  },
}
</script>

<style scoped>
.on-accordion-add{
    right: 4em;
}
td,th,tr{
        border: 1px solid darkgray !important;
}
.modal-content{
  width: 36em;
}
</style>