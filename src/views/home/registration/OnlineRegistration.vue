<template>
<base-card>
<div class="d-flex container">
  <div class="mt-2 me-3"><span @click="back()" class="backarrow ms-3"><i class="fas fa-arrow-left"></i></span></div>
     <div class="ms-md-5 me-md-3 p-md-2 text-md-center textTitle">HORIZON COLLEGE OFFICE OF REGISTRAR TRAINEE'S ADMISSION APPLICATION
       FORM FOR DEGREE AND TVET STUDENTS</div>
</div>
      <div class="d-flex mt-1 mt-md-3 container">
          <div @click="personal()" class="personal pointer me-3 flex-fill" :class="{activePointer:isPersonal,startPointer:isPersonal}">Personal Info</div> 
          <div @click="educational()" class="educational pointer flex-fill" :class="{activePointer:isEducational,endPointer:isEducational}">Educational Info</div>
      </div>
      <div class="mt-md-3 container">
        <keep-alive>
        <component :is="componentName"></component>
        </keep-alive> 
     </div>
</base-card>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import PersonalInfo from './PersonalInfo.vue'
import EducationalInfo from './EducationalInfo.vue'
export default {
  components:{
    PersonalInfo,
    EducationalInfo,
  },
  data() {
    return {
      isPersonal:true,
      isEducational:false,
      isAdmission:false,
      isFinance:false,
      componentName:'personal-info',
      studentInfo:{},
    }
  },
     computed:{
   acYearId(){
     return this.$store.getters.acYearId
   }
   
   },
  provide(){
    return{
        personalDetail:this.personalDetail,
        educationalDetail:this.educationalDetail,
        admissionDetail:this.admissionDetail,
        financeDetail:this.financeDetail,
        backPage:this.backPage,
        degree_program_id:'',
         degree_department_id:'',
        semester_id:'',
        year_no:'',
        tvet_department_id:'', 
        tvet_program_id:'' ,      
        level_id:'',
       


    }
  },
  created() {
     this.$store.dispatch('fetchAcademicYears')
       .then(()=>{
           this.$store.getters.academicYears.forEach((year)=>{
           if(Number(year.is_current) === 1) {
                  this.$store.commit('setSelectedAcYearId',year.id) 
                   this.$store.dispatch('registrar/fetchActiveYearSemisters',year.id)
               }     
            })
           }
          )
          this.$store.dispatch('dean/fetchDegreeDepartments')
      this.$store.dispatch('dean/fetchTvetDepartments')
      this.$store.dispatch('registrar/fetchActiveYearSemisters')
       this.$store.dispatch('registrar/fetchLevels')
         this.$store.dispatch('dean/fetchDegreePrograms')
      this.$store.dispatch('dean/fetchTvetPrograms')
  },
    methods: {
         back(){
        this.$router.back()
      },
      personalDetail(personalData){
      this.studentInfo.contact_full_name = personalData.contact_full_name
      this.studentInfo.first_name = personalData.first_name
      this.studentInfo.middle_name = personalData.middle_name
      this.studentInfo.last_name = personalData.last_name
      this.studentInfo.sex = personalData.sex
      this.studentInfo.maritial_status = personalData.maritial_status
      this.studentInfo.residence_tel = personalData.residence_tel
      this.studentInfo.residence_office_tel = personalData.residence_office_tel
      this.studentInfo.phone_no = personalData.phone_no
      this.studentInfo.contact_tel = personalData.contact_tel
      this.studentInfo.contact_office_tel = personalData.contact_office_tel
      this.studentInfo.contact_phone_no = personalData.contact_phone_no
      this.studentInfo.birth_address = personalData.birth_address
      this.studentInfo.residential_address = personalData.residential_address
      this.studentInfo.emergency_address = personalData.emergency_address
      this.studentInfo.dob = personalData.birthDay
       this.componentName = 'educational-info'
       this.isEducational = true
      },
       educationalDetail(educationData){
         this.studentInfo.academic_year_id = educationData.academic_year_id
       this.studentInfo.EGSSE_result = educationData.EGSSE_result
       this.studentInfo.EHEEE_result = educationData.EHEEE_result
        this.studentInfo.fully_scholar = educationData.fully_scholar
        this.studentInfo.financial_source = educationData.financial
       this.studentInfo.studentType = educationData.studentType
      //  for degree students
       this.degree_department_id = educationData.degree_department_id
       this.degree_program_id = educationData.degreeProgram_id
       this.year_no = educationData.year_no
       this.semester_id = educationData.semester_id
      //  for tvet students
         this.tvet_department_id = educationData.tvet_department_id;
      this.tvet_program_id = educationData.tvetProgram_id;
      this.level_id = educationData.level_id;
      if(this.studentInfo.studentType === 'degree'){
        this.registerNewDegreeStudent()
      }
      else if(this.studentInfo.studentType === 'tvet'){
        this.registerNewTvetStudent()
      }
      },     
      backPage(pageName,from){
        if(from === 'isEducational'){
          this.isEducational = false
        }
        else if(from === 'isAdmission'){
          this.isAdmission = false
        }
        else if(from === 'isFinance'){
          this.isFinance = false
        }
       this.componentName = pageName
      },
     async registerNewDegreeStudent(){
       this.$store.commit('registrar/setResultNotifier','')
       this.studentInfo.degree_department_id = this.degree_department_id
       this.studentInfo.program_id = this.degree_program_id
       this.studentInfo.year_no = this.year_no
       this.studentInfo.semester_id = this.semester_id
      console.log('the data sent to the server')
        console.log(this.studentInfo)
        try{
          this.$store.commit('registrar/setIsUploading',true)
  var response = await apiClient.post('api/degree_online_registration',this.studentInfo)
  console.log('status code '+response.status)
  if(response.status === 201){
    console.log('response from adding degree student')
    console.log(response.data)
  this.$store.commit('registrar/setResultNotifier','You have registered successfully')
     this.$store.commit('registrar/setIsSuccessed',true)
      this.$store.commit('registrar/setIsFaild',false)
  }
  else if(response.status === 200){
    this.$store.commit('registrar/setResultNotifier',response.data.error)
         this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)
  }
}
catch(e){
    this.$store.commit('registrar/setResultNotifier','Registration Faild')
         this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)
}
finally{
  this.$store.commit('registrar/setIsUploading',false)
}
      
      },
        async registerNewTvetStudent() {
           this.$store.commit('registrar/setIsUploading',true)
          this.studentInfo.tvet_department_id = this.tvet_department_id
       this.studentInfo.program_id = this.tvet_program_id
       this.studentInfo.level_id = this.level_id
      console.log("the data sent to the server");
      console.log(this.studentInfo);
      try {
        var response = await apiClient.post('api/tvet_online_registration',this.studentInfo);
        console.log("status code = " + response.status);
        if (response.status === 201) {
          console.log('response from adding tvet student')
    console.log(response.data)
   
  this.$store.commit('registrar/setResultNotifier','You have registered successfully')
     this.$store.commit('registrar/setIsSuccessed',true)
      this.$store.commit('registrar/setIsFaild',false)
      console.log('2')
  }
  else if(response.status === 200){
    this.$store.commit('registrar/setResultNotifier',response.data.error)
         this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)

  }
}
catch(e){
    this.$store.commit('registrar/setResultNotifier','Registration Faild')
         this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)
}
finally{
  this.$store.commit('registrar/setIsUploading',false)
}
    },
    },
}
</script>
<style scoped>
.backarrow{
  cursor: pointer;
  font-size: 22px;
}
.backarrow:hover{
  color: #1142ac;
}
.pointer {
  height: 40px;
  position: relative;
  background: #ecf1fe;
  padding-top: 10px;
  padding-left: 30px;
  cursor: pointer;
}
.pointer:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid #fff;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.pointer:before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid #ecf1fe;
  border-right: -20px solid #ecf1fe;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.personal::after{
  border-left: 20px solid #ecf1fe;
}
.educational{
border-right: 20px solid #ecf1fe;
}
.activePointer{
   background: #a5b3d8;
}
.activePointer::before{
  border-left: 20px solid #a5b3d8;
  border-right: -20px solid #a5b3d8;
}
.startPointer::after{
  border-left: 20px solid #a5b3d8;
}
.endPointer{
  border-right: 20px solid #a5b3d8;
}
@media(max-width:568px){
  .textTitle{
font-size: 12px;
  }
  .backarrow{
    font-size: 16px;
  }
  .pointer{
    height: 40px;
    padding-top: 5px;
    padding-bottom: 0;
  }
}
</style>