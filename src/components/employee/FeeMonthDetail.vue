<template>
    <div class="mx-2 mt-2 mb-5">
        <div class="row g-4 mt-1">
            <div class="col-12 mt-1">Degree Program Fee Month</div>
            <div class="col-lg-6">
                <table>
                    <tr>
                        <th colspan="3">Regular Program</th>
                    </tr>
                    <tr>
                        <th>Semester</th>
                        <th>Month</th>
                        <th class="sr-only"></th>
                    </tr>
                    <tr>
                        <td>I</td>
                        <td>
                            <span v-for="month in  feeMonth.regular.firstSemester" :key="month" class="border me-1 rounded p-1">{{getMonthById(month)}}</span>
                        </td>
                        <td><span @click="regularFirst" role="button"><i class="far fa-plus-square fs-3"></i></span></td>
                    </tr>
                     <tr>
                        <td>II</td>
                        <td>
                            <span v-for="month in  feeMonth.regular.secondSemester" :key="month" class="border me-1 rounded p-1">{{getMonthById(month)}}</span>
                        </td>
                        <td><span @click="regularSecond" role="button"><i class="far fa-plus-square fs-3"></i></span></td>
                    </tr>
                </table>
            </div>
             <div class="col-lg-6">
                <table>
                    <tr>
                        <th colspan="3">Extension Program</th>
                    </tr>
                    <tr>
                        <th>Semester</th>
                        <th>Month</th>
                        <th class="sr-only"></th>
                    </tr>
                    <tr>
                        <td>I</td>
                        <td>
                            <span v-for="month in  feeMonth.extension.firstSemester" :key="month" class="border me-1 rounded p-1">{{getMonthById(month)}}</span>
                        </td>
                        <td><span @click="extensionFirst" role="button"><i class="far fa-plus-square fs-3"></i></span></td>
                    </tr>
                     <tr>
                        <td>II</td>
                        <td>
                            <span v-for="month in  feeMonth.extension.secondSemester" :key="month" class="border me-1 rounded p-1">{{getMonthById(month)}}</span>
                        </td>
                        <td><span @click="extensionSecond" role="button"><i class="far fa-plus-square fs-3"></i></span></td>
                    </tr>
                     <tr>
                        <td>III</td>
                        <td>
                            <span v-for="month in  feeMonth.extension.thirdSemester" :key="month" class="border me-1 rounded p-1">{{getMonthById(month)}}</span>
                        </td>
                        <td><span @click="extensionThird" role="button"><i class="far fa-plus-square fs-3"></i></span></td>
                    </tr>
                </table>
            </div>
           
        </div>
        <div class="my-2">
             <div v-for="(error,index) in errors" :key="index" class="text-danger">{{error}}</div>
        </div>
        <div class="mb-4 pt-5 d-flex justify-content-end">
            <button @click="back" class="btn border px-3">Back</button>
            <button  @click="saveChanges" class="text-white btn-add btn  px-3 mx-3">
                 <span v-if="isSaving">
                    <span   class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     saving
                 </span>
                 <span v-else>
                     Save Changes  
                 </span>
             </button>
            <button @click="next" class="btn border px-3 ms-2">Next</button>
        </div>
    </div>

     <vue-modal :modalState="modalState">
       <div class="modal-content mx-auto bg-white p-3">
           <div class="header">
              <button @click="dismissVueModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
           </div>
           <div class="body">
              <strong class="fw-bold d-block my-2">Select Months</strong>
              <div v-for="month in suggestedMonths" :key="month.id" class="form-check">
              <input class="form-check-input" type="checkbox" v-model="months" :value="month.id" id="july">
              <label class="form-check-label" for="july">   {{month.name}} </label>
            </div> 
        </div>
         <div class="footer">
             <button @click="addMonths" class="btn btn-add text-white px-3 d-block ms-auto">Add</button>
       </div>
     </div>
  </vue-modal>
</template>
<script>
import VueModal from '../VueModal.vue'
import apiClient from '../../resources/baseUrl'
export default {
    components:{VueModal},
    inject:['setSelectedComponent'],
    data(){
        return{
            feeMonth:{
                regular:{
                    firstSemester:[],
                    secondSemester:[]
                },
                extension:{
                    firstSemester:[],
                    secondSemester:[],
                    thirdSemester:[]
                },
            },
            modalState:false,
            modalType:'',
            months:[],
            errors:[],
            suggestedMonths:[],
            isSaving:false
        }
    },
    computed:{
        yearMonths(){
            return this.$store.getters['dean/yearMonths']
        },
        academicCalendarDetail(){
            return this.$store.getters['dean/selectedAcademicCalendarDetail']
        }
    },
    methods:{
        getMonthById(id){
         return this.yearMonths.find((month)=>{
              return month.id===id
          })?.name?.substr(0,3)
        },
        dismissVueModal(){
            this.modalState=false
            this.months=[]
        },
        regularFirst(){
            const alreadySelectedMonths=new Set(this.feeMonth.regular.secondSemester) 
            const unselectedMonths=this.yearMonths.filter((month)=>{
               return !alreadySelectedMonths.has(month.id)
            })
            this.suggestedMonths=[...unselectedMonths]
            this.showModal('regularFirst',this.feeMonth.regular.firstSemester)
        },
        regularSecond(){
            const alreadySelectedMonths=new Set(this.feeMonth.regular.firstSemester) 
            const unselectedMonths=this.yearMonths.filter((month)=>{
               return !alreadySelectedMonths.has(month.id)
            })
            this.suggestedMonths=[...unselectedMonths]
            this.showModal('regularSecond',this.feeMonth.regular.secondSemester)
        },
        extensionFirst(){
            const alreadySelectedMonths=new Set(this.feeMonth.extension.secondSemester.concat(this.feeMonth.extension.thirdSemester)) 
            const unselectedMonths=this.yearMonths.filter((month)=>{
               return !alreadySelectedMonths.has(month.id)
            })
            this.suggestedMonths=[...unselectedMonths]
            this.showModal('extensionFirst',this.feeMonth.extension.firstSemester)
        },
        extensionSecond(){
            const alreadySelectedMonths=new Set(this.feeMonth.extension.firstSemester.concat(this.feeMonth.extension.thirdSemester)) 
            const unselectedMonths=this.yearMonths.filter((month)=>{
               return !alreadySelectedMonths.has(month.id)
            })
            this.suggestedMonths=[...unselectedMonths]
            this.showModal('extensionSecond',this.feeMonth.extension.secondSemester)
        },
        extensionThird(){
             const alreadySelectedMonths=new Set(this.feeMonth.extension.firstSemester.concat(this.feeMonth.extension.secondSemester)) 
            const unselectedMonths=this.yearMonths.filter((month)=>{
               return !alreadySelectedMonths.has(month.id)
            })
            this.suggestedMonths=[...unselectedMonths]
            this.showModal('extensionThird',this.feeMonth.extension.thirdSemester)
        },
    
        showModal(type, initialValue){
           this.modalType=type
           this.months=initialValue
           this.modalState=true
        },
        addMonths(){
            if(this.modalType==='regularFirst'){
              this.feeMonth.regular.firstSemester=this.months  
            }
            else if(this.modalType==='regularSecond'){
                this.feeMonth.regular.secondSemester=this.months
            }
            else if(this.modalType==='extensionFirst'){
                this.feeMonth.extension.firstSemester=this.months
            }
            else if(this.modalType==='extensionSecond'){
                this.feeMonth.extension.secondSemester=this.months
            }
            else if(this.modalType==='extensionThird'){
                this.feeMonth.extension.thirdSemester=this.months
            }
            this.modalState=false
            this.months=[]
        },
        next(){
            this.setSelectedComponent('AcademicActivitiesDetail')
        },
       async saveChanges(){
           this.validate()
            if(!this.errors.length){
                this.isSaving=true
                let temp={
                   semesters:[
                       {
                          semester_id:this.academicCalendarDetail.regular?.[0]?.id,
                          months:[...this.feeMonth.regular.firstSemester]
                       },
                        {
                          semester_id:this.academicCalendarDetail.regular?.[1]?.id,
                          months:[...this.feeMonth.regular.secondSemester] 
                       },
                        {
                          semester_id:this.academicCalendarDetail.extension?.[0]?.id,
                          months:[...this.feeMonth.extension.firstSemester] 
                       },
                        {
                          semester_id:this.academicCalendarDetail.extension?.[1]?.id,
                          months:[...this.feeMonth.extension.secondSemester] 
                       },
                        {
                          semester_id:this.academicCalendarDetail.extension?.[2]?.id,
                          months:[...this.feeMonth.extension.thirdSemester] 
                       },
                   ]   
                }
         try{
          let response=  await apiClient.put('api/update_semester_month', temp)
            if(response.status===200){
                this.$store.commit('setAlertMessages',{
                text:'Fee months successfully updated!',
                type:'success'
              })
             }else{
                throw''
             }
         }
         catch(e){
            this.isSaving=false
            this.$store.commit('setAlertMessages',{
                text:'Faild update fee months',
                type:'danger'
              })
         }
         finally{
           this.isSaving=false
         }
    }
        },
        back(){
            this.setSelectedComponent('AcademicTimeDetail')
        },
        validate(){
           this.errors=[]
           if(!this.feeMonth.regular.firstSemester.length)
               this.errors.push('Regular First Semester month can\'t be empty.')
           if(!this.feeMonth.regular.secondSemester.length)
               this.errors.push('Regular Second Semester month can\'t be empty.')
           if(!this.feeMonth.extension.firstSemester.length)
               this.errors.push('Extension First Semester month can\'t be empty.')
           if(!this.feeMonth.extension.secondSemester.length)
               this.errors.push('Extension Second Semester month can\'t be empty.')
           if(!this.feeMonth.extension.thirdSemester.length)
               this.errors.push('Extension Third Semester month can\'t be empty.')
        },     
        setFields(){
           this.academicCalendarDetail.regular?.[0]?.months?.forEach((item)=>{
              this.feeMonth.regular.firstSemester.push(item.id) 
           })
          this.academicCalendarDetail.regular?.[1]?.months?.forEach((item)=>{
             this.feeMonth.regular.secondSemester.push(item.id) 
          })
          this.academicCalendarDetail.extension?.[0]?.months?.forEach((item)=>{
             this.feeMonth.extension.firstSemester.push(item.id) 
         })
         this.academicCalendarDetail.extension?.[1]?.months?.forEach((item)=>{
           this.feeMonth.extension.secondSemester.push(item.id) 
         })
         this.academicCalendarDetail.extension?.[2]?.months?.forEach((item)=>{
           this.feeMonth.extension.thirdSemester.push(item.id) 
        })
    },
    },
    watch:{
      academicCalendarDetail(){
         this.setFields()
      },
    },
    created(){
        this.setFields()
    }
}
</script>
<style scoped>
    tr{
        border: 1px solid darkgray !important;
    }
    .modal-content{
        width: 40%;
        min-height: 10em;
    }
</style>