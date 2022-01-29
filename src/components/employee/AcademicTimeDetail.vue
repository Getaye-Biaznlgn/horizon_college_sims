<template>
  <div class="mx-2 mt-2 mb-5">
    <div class="row g-4 mt-1">
      <div class=" col-md-3" :class="{warining:v$.time.academicYear.$error}">
                <label for="#cp" class="form-label fw-bold">Academic Year</label>
                <input class="form-control d-inline" v-model.trim="time.academicYear" @blur="v$.time.academicYear.$touch" id="cp" type="number" aria-label=".form-control">
               <span class="error-msg mt-1"  v-for="(error, index) of v$.time.academicYear.$errors" :key="index">{{ error.$message+", " }}</span>
       </div>   
            <div class=" fw-bold col-12">Degree Program Academic</div>
              <div class="col-lg-6">
                <table>
                    <tr>
                        <th colspan="3">Regular Program</th>
                    </tr>
                    <tr>
                        <th style="white-space: nowrap!important; overflow: hidden;">Semester</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    <tr>
                        <td class="text-center">I</td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.regular.firstSemester.start_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.regular.firstSemester.start_date" @blur="v$.time.regular.firstSemester.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.regular.firstSemester.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                         </td>
                         <td>
                           <div class="mb-3" :class="{warining:v$.time.regular.firstSemester.end_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.regular.firstSemester.end_date" @blur="v$.time.regular.firstSemester.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.regular.firstSemester.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                         </td>
                    </tr>
                     <tr>
                        <td class="text-center">II</td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.regular.secondSemester.start_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.regular.secondSemester.start_date" @blur="v$.time.regular.secondSemester.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.regular.secondSemester.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.regular.secondSemester.end_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.regular.secondSemester.end_date" @blur="v$.time.regular.secondSemester.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.regular.secondSemester.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                    </tr>
                </table>
            </div>

             <div class="col-lg-6">
                <table>
                    <tr>
                        <th colspan="3">Extension Program</th>
                    </tr>
                    <tr>
                        <th style="white-space: nowrap!important; overflow: hidden;">Semester</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    <tr>
                        <td class="text-center">I</td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.firstSemester.start_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.firstSemester.start_date" @blur="v$.time.extension.firstSemester.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.firstSemester.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                         </td>
                         <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.firstSemester.end_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.firstSemester.end_date" @blur="v$.time.extension.firstSemester.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.firstSemester.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                         </td>
                    </tr>
                     <tr>
                        <td class="text-center">II</td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.secondSemester.start_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.secondSemester.start_date" @blur="v$.time.extension.secondSemester.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.secondSemester.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.secondSemester.end_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.secondSemester.end_date" @blur="v$.time.extension.secondSemester.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.secondSemester.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                    </tr>
                     <tr>
                        <td class="text-center">III</td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.thirdSemester.start_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.thirdSemester.start_date" @blur="v$.time.extension.thirdSemester.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.thirdSemester.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                        <td>
                           <div class="mb-3" :class="{warining:v$.time.extension.thirdSemester.end_date.$error}">
                              <input class="form-control d-inline" v-model.trim="time.extension.thirdSemester.end_date" @blur="v$.time.extension.thirdSemester.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                              <span class="error-msg mt-1"  v-for="(error, index) of v$.time.extension.thirdSemester.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
                           </div> 
                        </td>
                    </tr>
                </table> 
            </div>
            <div class="col-12 fw-bold">TVET Program Academic Time</div>
            <div class="col-md-6 col-lg-3">
                <div class="mb-4" :class="{warining:v$.time.tvet.start_date.$error}">
                    <label for="#cp" class="form-label">Start Date</label>
                    <input class="form-control d-inline" v-model.trim="time.tvet.start_date" @blur="v$.time.tvet.start_date.$touch" id="cp" type="date" aria-label=".form-control">
                    <span class="error-msg mt-1"  v-for="(error, index) of v$.time.tvet.start_date.$errors" :key="index">{{ error.$message+", " }}</span>
               </div>   
            </div>
             <div class="col-md-6 col-lg-3">
                <div class="mb-4" :class="{warining:v$.time.tvet.end_date.$error}">
                    <label for="#cp" class="form-label">End Date</label>
                    <input class="form-control d-inline" v-model.trim="time.tvet.end_date" @blur="v$.time.tvet.end_date.$touch" id="cp" type="date" aria-label=".form-control">
                    <span class="error-msg mt-1"  v-for="(error, index) of v$.time.tvet.end_date.$errors" :key="index">{{ error.$message+", " }}</span>
               </div>   
            </div>
         </div>
         <div class="d-flex justify-content-end mt-4">
             <button  @click="saveChanges" class=" btn btn-add text-white px-3 me-3">
                 <span v-if="isSaving">
                    <span   class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     saving
                 </span>
                 <span v-else>
                     Save Changes  
                 </span>
             </button>
             <button  @click="next" class=" btn border px-3">Next</button>
         </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required,numeric,maxValue, helpers} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import apiClient from '../../resources/baseUrl'
export default {
inject:['setSelectedComponent'],
data(){
    return{
        v$:useVuelidate(),
         isSaving:false,
       time:{
           academicYear:'',
           regular:{
               firstSemester:{
                   number:1,
                   start_date:'',
                   end_date:'',
                   semester_id:'',
                   program_id:''
               },
               secondSemester:{
                   number:2,
                   start_date:'',
                   semester_id:'',
                   end_date:'',
                   program_id:''
               },
           },
           extension:{
               firstSemester:{
                   number:1,
                   start_date:'',
                   end_date:'',
                   semester_id:'',
                   program_id:''
               },
               secondSemester:{
                   number:2,
                   start_date:'',
                   end_date:'',
                   semester_id:'',
                   program_id:''
               },
               thirdSemester:{
                   number:3,
                   start_date:'',
                   end_date:'',
                   semester_id:'',
                   program_id:''
               },
           },
           tvet:{
               start_date:'',
               end_date:'',
               id:''
           }
       }
    }
  },
  computed:{
    ...mapGetters({academicCalendarDetail:'dean/selectedAcademicCalendarDetail', selectedYearId:'selectedAcademicYearId'})
  },
  methods:{
      async saveChanges(){
        this.v$.$validate()
          if(!this.v$.$error){
             this.isSaving=true
          let temp={
              year:this.time.academicYear,
              academic_year_id:this.selectedYearId,
              semesters:[
                  {...this.time.regular.firstSemester},
                  {...this.time.regular.secondSemester},
                  {...this.time.extension.firstSemester},
                  {...this.time.extension.secondSemester},
                  {...this.time.extension.thirdSemester},
              ],
              tvet_start_date:this.time.tvet.start_date,
              tvet_end_date:this.time.tvet.end_date
          }
         try{
          let response= await apiClient.put('api/update_semester', temp)
            if(response.status===200){
               this.$store.commit('setAlertMessages',{
                text:'Academic time successfully updated!',
                type:'success'
              })
             }else{
                throw''
             }
         }
         catch(e){
          this.isSaving=false
         }
         finally{
           this.isSaving=false
         }
         }
        },
        next(){
            this.setSelectedComponent('FeeMonthDetail')
        },
    setFields(){
      this.time.academicYear=this.academicCalendarDetail.year
      //regular first
      this.time.regular.firstSemester.start_date=this.academicCalendarDetail.regular?.[0]?.start_date
      this.time.regular.firstSemester.end_date=this.academicCalendarDetail.regular?.[0]?.end_date
      this.time.regular.firstSemester.program_id=this.academicCalendarDetail.regular?.[0]?.program_id
      this.time.regular.firstSemester.semester_id=this.academicCalendarDetail.regular?.[0]?.id
      //regular second
      this.time.regular.secondSemester.start_date=this.academicCalendarDetail.regular?.[1]?.start_date
      this.time.regular.secondSemester.end_date=this.academicCalendarDetail.regular?.[1]?.end_date
      this.time.regular.secondSemester.program_id=this.academicCalendarDetail.regular?.[1]?.program_id
      this.time.regular.secondSemester.semester_id=this.academicCalendarDetail.regular?.[1]?.id
      //extension first
      this.time.extension.firstSemester.start_date=this.academicCalendarDetail.extension?.[0]?.start_date
      this.time.extension.firstSemester.end_date=this.academicCalendarDetail.extension?.[0]?.end_date
      this.time.extension.firstSemester.program_id=this.academicCalendarDetail.extension?.[0]?.program_id
      this.time.extension.firstSemester.semester_id=this.academicCalendarDetail.extension?.[0]?.id

      // extension second
      this.time.extension.secondSemester.start_date=this.academicCalendarDetail.extension?.[1]?.start_date
      this.time.extension.secondSemester.end_date=this.academicCalendarDetail.extension?.[1]?.end_date
      this.time.extension.secondSemester.program_id=this.academicCalendarDetail.extension?.[1]?.program_id
      this.time.extension.secondSemester.semester_id=this.academicCalendarDetail.extension?.[1]?.id
      //extension third
      this.time.extension.thirdSemester.start_date=this.academicCalendarDetail.extension?.[2]?.start_date
      this.time.extension.thirdSemester.end_date=this.academicCalendarDetail.extension?.[2]?.end_date
      this.time.extension.thirdSemester.program_id=this.academicCalendarDetail.extension?.[2]?.program_id 
      this.time.extension.thirdSemester.semester_id=this.academicCalendarDetail.extension?.[2]?.id 
      //tvet
      this.time.tvet.start_date=this.academicCalendarDetail.tvet_calender?.start_date
      this.time.tvet.end_date=this.academicCalendarDetail.tvet_calender?.end_date 
      this.time.tvet.id=this.academicCalendarDetail.tvet_calender?.id 
   }
  },
  created(){
    console.log('ac detail...', this.academicCalendarDetail)
    this.setFields()
   },
  watch:{
    academicCalendarDetail(){
       this.setFields()
    }
   },
   validations(){
      return{
          time:{
           academicYear:{
               numeric,
               maxValue:helpers.withMessage('Value is too high', maxValue(2100)),
               required:helpers.withMessage('Academic Year can not be empty',required),
           },
           regular:{
               firstSemester:{
                   start_date:{
                       required:helpers.withMessage('Regular First Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('Regular First Semester end date can not be empty',required),
                   }
               },
               secondSemester:{
                   start_date:{
                        required:helpers.withMessage('regular second Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('regular second Semester end date can not be empty',required),
                   }
               },
           },
           extension:{
               firstSemester:{
                   start_date:{
                       required:helpers.withMessage('Extension First Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('Extension First Semester end date can not be empty',required),
                   }
               },
               secondSemester:{
                   start_date:{
                       required:helpers.withMessage('Extension second Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('Extension First Semester end date can not be empty',required),
                   }
               },
               thirdSemester:{
                   start_date:{
                       required:helpers.withMessage('Extension Third Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('Extension Third Semester end date can not be empty',required),
                   }
               },
           },
           tvet:{
               start_date:{
                   required:helpers.withMessage('TVET star date can not be empty',required),
               },
               end_date:{
                   required:helpers.withMessage('TVET end date can not be empty',required),
               }
           }
       }
      }
  },
}

</script>

<style scoped>
    tr{
        border: 1px solid darkgray !important;
    }
</style>