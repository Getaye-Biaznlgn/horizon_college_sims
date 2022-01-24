<template>
<base-card class="px-3 mx-4 mt-3" >
    <div class="d-flex justify-content-center mt-3">
        <div  class="personal pointer me-4 startPointer activePointer">Academic Time</div>
        <div  class="educational pointer me-4" :class="{activePointer:selectedComponent==='FeeMonthDetail' || selectedComponent==='AcademicActivitiesDetail'}">Fee Month</div>
        <div class="finance pointer" :class="{activePointer:selectedComponent==='AcademicActivitiesDetail',endPointer:selectedComponent==='AcademicActivitiesDetail'}">Activities</div>
    </div>
    <keep-alive>
       <component :is="selectedComponent"/>
    </keep-alive>  
</base-card>  
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import AcademicTimeDetail from '../../../components/employee/AcademicTimeDetail.vue'
import FeeMonthDetail from '../../../components/employee/FeeMonthDetail.vue'
import AcademicActivitiesDetail from '../../../components/employee/AcademicActivitiesDetail.vue'
export default {
    components:{AcademicTimeDetail,FeeMonthDetail, AcademicActivitiesDetail},
    data(){
      return{
         selectedComponent:'AcademicTimeDetail',
      }
    },
    methods:{
      setSelectedComponent(comp){
         this.selectedComponent=comp
      },
      async fetchSelectedAcademicYearDetail(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/edit_academic_year")
            if (response.status === 200) {
           this.$store.commit('dean/setSelectedAcademicCalendarDetail',response.data)
          ///// this.academicCalendarDetail= response.data
         /////console.log('edit academic year', response.data)

           } else {
              throw 'Failed to fetch event'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    
    },
     provide(){
      return{
          setSelectedComponent:this.setSelectedComponent,
          // academicCalendarDetail:this.getAc
      }
  },
  created(){
    this.fetchSelectedAcademicYearDetail()
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