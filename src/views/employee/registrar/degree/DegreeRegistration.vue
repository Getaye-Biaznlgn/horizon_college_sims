<template>
<base-card>
 <span @click="back()" class="backarrow ms-3 mt-2"><i class="fas fa-arrow-left"></i>Back</span>
     <div class="ms-3 me-3 p-2 text-center">HORIZON COLLEGE OFFICE OF REGISTRAR TRAINEE'S ADMISSION APPLICATIONS</div>
      <div class="text-center mb-3"> FORM FOR DEGREE STUDENT</div>
      <div class="d-flex justify-content-center mt-3">
          <div @click="personal()" class="personal pointer ms-3 me-4" :class="{activePointer:isPersonal,startPointer:isPersonal}">Personal Information</div>
          <div @click="educational()" class="educational pointer me-4" :class="{activePointer:isEducational}">Education Background</div>
          <div @click="admission()" class="admission pointer me-4" :class="{activePointer:isAdmission}">Classification of Admission</div>
          <div @click="finance()" class="finance pointer me-4" :class="{activePointer:isFinance,endPointer:isFinance}">Financial Support</div>
      </div>
      <div class="mt-3">
        <keep-alive>
        <component :is="componentName"></component>
        </keep-alive> 
     </div>
</base-card>
</template>
<script>
import {mapGetters} from 'vuex'
import apiClient from '../../../../resources/baseUrl'
import PersonalInfo from './PersonalInfo.vue'
import EducationalInfo from './EducationalInfo.vue'
import AdmissionInfo from './AdmissionInfo.vue'
import FinancialInfo from './FinancialInfo.vue'
export default {
  components:{
    PersonalInfo,
    EducationalInfo,
    AdmissionInfo,
    FinancialInfo
  },
  data() {
    return {
      isPersonal:true,
      isEducational:false,
      isAdmission:false,
      isFinance:false,
      componentName:'personal-info',
      studentInfo:{},
      //   resultNotifier:{
      //   notification:'',
      //     isSuccessed:false,
      //   isFaild:false,
      //   isLoading:false,
      // }
    }
  },
     computed:{
   ...mapGetters(['acYearId']),
   
   },
  provide(){
    return{
        personalDetail:this.personalDetail,
        educationalDetail:this.educationalDetail,
        admissionDetail:this.admissionDetail,
        financeDetail:this.financeDetail,
        backPage:this.backPage,
       // resultNotifier:this.resultNotifier

    }
  },
  created() {
     this.$store.commit('registrar/setResultNotifier','')
  },
    methods: {
       back(){
        this.$router.back()
        this.$store.commit('registrar/setResultNotifier','')
      },
      // personal(){
      //   this.isPersonal = true
      //   this.componentName = 'personal-info'
      // },
      // educational(){
      //   if(this.isEducational === true){
      //   this.componentName = 'educational-info'
      //   }
      //   else{
      //     this.isEducational = true
      //     this.componentName = 'educational-info'
      //   }
        
      // },
      // admission(){
      //   if(this.isAdmission === true){
      //   this.componentName = 'admission-info'
      //   }
      //   else{
      //     this.isAdmission = true
      //     this.componentName = 'admission-info'
      //   }
      // },
      // finance(){
      //   if(this.isFinance === true){
      //   this.componentName = 'financial-info'
      //   }
      //   else{
      //     this.isFinance = true
      //     this.componentName = 'financial-info'
      //   }
      // },
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
      this.studentInfo.contact_relationship = personalData.contact_relationship
      this.studentInfo.dob = personalData.birthDay
       this.componentName = 'educational-info'
       this.isEducational = true
      },
       educationalDetail(egsse_result,eheee_result){
       this.studentInfo.EGSSE_result = egsse_result
       this.studentInfo.EHEEE_result = eheee_result
       this.componentName = 'admission-info'
       this.isAdmission = true
      },
       admissionDetail(admissionData){
       this.studentInfo.degree_department_id = admissionData.degree_department_id
       this.studentInfo.program_id = admissionData.program_id
       this.studentInfo.fully_scholarship = admissionData.fully_scholar
       this.studentInfo.year_no = admissionData.year_no
       this.studentInfo.semester_id = admissionData.semester_id
       this.componentName = 'financial-info'
       this.isFinance = true
      },
        financeDetail(financeData){
       this.studentInfo.financial_source = financeData
       this.registerNewDegreeStudent()
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
        this.studentInfo.academic_year_id = this.acYearId
        console.log('the data sent to the server')
        console.log(this.studentInfo)
        try{
          this.$store.commit('registrar/setIsUploading',true)
  var response = await apiClient.post('api/degree_students',this.studentInfo)
  console.log('status code '+response.status)
  if(response.status === 201){
        //  this.resultNotifier.notification = 'You have registered a student successfully'
        //  this.resultNotifier.isSuccessed = true
        //  this.resultNotifier.isFaild = false
    console.log('response from adding degree student')
    console.log(response.data)
  //    var previousStudent = this.$store.getters['registrar/degreeStudents']
  //   var index = previousStudent.findIndex(student => {
  //    return student.semester_no === response.data.semester_no
  //    })
  // previousStudent[index].students.push(response.data)
  // this.$store.commit('registrar/setDegreeStudent',previousStudent)
  this.$store.commit('registrar/setResultNotifier','You have registered a Degree student successfully')
     this.$store.commit('registrar/setIsSuccessed',true)
      this.$store.commit('registrar/setIsFaild',false)
  }
  else if(response.status === 200){
      // this.resultNotifier.notification = ''
      //    this.resultNotifier.isSuccessed = false
      //    this.resultNotifier.isFaild = true
          this.$store.commit('registrar/setResultNotifier','You have already registered this Student')
     this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)

  }
}
catch(e){
        this.$store.commit('registrar/setResultNotifier','Registeration faild')
     this.$store.commit('registrar/setIsSuccessed',false)
      this.$store.commit('registrar/setIsFaild',true)
    // this.resultNotifier.notification = 'Registeretion faild'
    //      this.resultNotifier.isSuccessed = false
    //      this.resultNotifier.isFaild = true
}
finally{
  this.$store.commit('registrar/setIsUploading',false)
  
}
      }
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
  width: 23%;
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
.finance{
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
</style>