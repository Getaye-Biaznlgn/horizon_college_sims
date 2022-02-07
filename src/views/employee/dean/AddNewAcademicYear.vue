<template>
<base-card class="px-3 mx-4 mt-3" >
    <div class="d-flex justify-content-center mt-3">
        <div  class="personal pointer me-4 startPointer activePointer">Academic Time</div>
        <div  class="educational pointer me-4" :class="{activePointer:selectedComponent==='FeeMonth' || selectedComponent==='Activities'}">Fee Month</div>
        <div class="finance pointer" :class="{activePointer:selectedComponent==='Activities',endPointer:selectedComponent==='Activities'}">Activities</div>
    </div>
    <keep-alive>
       <component :is="selectedComponent"/>
    </keep-alive>  
</base-card>  
</template>

<script>
import Activities from '../../../components/employee/AcademicActivities.vue'
import FeeMonth from '../../../components/employee/FeeMonth.vue'
import AcademicTime from '../../../components/employee/AcademicTime.vue'
import apiClient from '../../../resources/baseUrl'
export default {
  components:{Activities, FeeMonth, AcademicTime},
  data(){
      return{
          selectedComponent:'Activities',
          feeMonth:'',
          academicTime:'',
          months:[],
          requestStatus:{
            isSaving:false,
          }
          
      }
  },
  methods:{
        back(){
           this.selectedComponent='FeeMonth'
        },
        setAcademicActivities(data){
            this.academicActivities=data
        },
        setSelectedComponent(compName){
          this.selectedComponent=compName
        },
        setFeeMonth(feeMonth){
          this.feeMonth=feeMonth
        },
        setAcademicTime(time){
           this.academicTime=time
        },
     
       async saveAcadamicYear(activities){
        this.requestStatus.isSaving=true
            let payload={};
            payload.year=this.academicTime.academicYear?.split('-').slice(0,1).join(' ')
            payload.regular=[
              {
                ...this.academicTime.regular?.firstSemester,
               months:[...this.feeMonth.regular?.firstSemester],
               activities:[...activities.regular?.firstSemester]
              },
               {
                ...this.academicTime.regular?.secondSemester,
               months:[...this.feeMonth.regular?.secondSemester],
               activities:[...activities.regular?.secondSemester]
              },
            ]
            payload.extension=[
               {
                ...this.academicTime.extension?.firstSemester,
               months:[...this.feeMonth.extension?.firstSemester],
               activities:[...activities.extension?.firstSemester]
              },
               {
                ...this.academicTime.extension?.secondSemester,
               months:[...this.feeMonth.extension?.secondSemester],
               activities:[...activities.extension?.secondSemester]
              },
               {
                ...this.academicTime.extension?.thirdSemester,
               months:[...this.feeMonth.extension?.thirdSemester],
               activities:[...activities.extension?.thirdSemester]
              },
            ]
            payload.tvet_start_date=this.academicTime.tvet?.startDate
            payload.tvet_end_date=this.academicTime.tvet?.endDate
            payload.tvet_activities=activities.tvet
         try{
          let response= await apiClient.post('api/academic_years', payload)
            if(response.status===201){
               this.$store.commit('setAlertMessages',{
                text:'New Academic Year is created successfully!',
                type:'success'
              })
             
             }else{
                throw''
             }
         }
         catch(e){
             this.$store.commit('setAlertMessages',{
                text:'Faild to create new Academic Year',
                type:'danger'
              })
          
         }
         finally{
           this.requestStatus.isSaving=false
         }
       },
  },
  provide(){
      return{
          setAcademicActivities:this.setAcademicActivities,
          setSelectedComponent:this.setSelectedComponent,
          setFeeMonth:this.setFeeMonth,
          setAcademicTime:this.setAcademicTime,
          save:this.saveAcadamicYear,
          requestStatus: this.requestStatus
      }
  },
  created(){
      this.$store.dispatch('dean/fetchYearMonths')
  }
}
</script>

<style scoped>
.pointer {
  width: 33%;
  height: 40px;
  position: relative;
  background: #ecf1fe;
  padding-top: 10px;
  padding-left: 30px;
  /* cursor: pointer; */
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
