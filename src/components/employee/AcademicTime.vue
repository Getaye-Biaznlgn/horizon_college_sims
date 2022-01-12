<template>
  <div class="mx-2 mt-2 mb-5">
    <div class="row g-4 mt-1">
        
        <div class=" col-md-3" :class="{warining:v$.time.academicYear.$error}">
                <label for="#cp" class="form-label fw-bold">Academic Year</label>
                <input class="form-control d-inline" v-model.trim="time.academicYear" @blur="v$.time.academicYear.$touch" id="cp" type="date" aria-label=".form-control">
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
       
        <button  @click="next" class=" btn btn-add text-white px-3 d-block ms-auto">Next</button>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
export default {
inject:['setAcademicTime','setSelectedComponent'],
data(){
    return{
        v$:useVuelidate(),
       time:{
           academicYear:'',
           regular:{
               firstSemester:{
                   number:1,
                   start_date:'',
                   end_date:''
               },
               secondSemester:{
                   number:2,
                   start_date:'',
                   end_date:''
               },
           },
           extension:{
               firstSemester:{
                   number:1,
                   start_date:'',
                   end_date:''
               },
               secondSemester:{
                   number:2,
                   start_date:'',
                   end_date:''
               },
               thirdSemester:{
                   number:3,
                   start_date:'',
                   end_date:''
               },
           },
           tvet:{
               start_date:'',
               end_date:''
           }
       }
    }
  },
  methods:{
        next(){
        this.v$.$validate()
          if(!this.v$.$error){
            this.setAcademicTime(this.time)
            this.setSelectedComponent('FeeMonth')
         }
        }
  },
  validations(){
      return{
          time:{
           academicYear:{
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
                        required:helpers.withMessage('Regular second Semester start date can not be empty',required),
                   },
                   end_date:{
                       required:helpers.withMessage('Regular second Semester end date can not be empty',required),
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