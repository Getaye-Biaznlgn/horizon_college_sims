<template>
  <base-card class="px-3 mx-md-4 mt-md-3">
    <table class="bg-white" v-if="student?.role==='degree_student'">
       <tr>
           <th class="text-white">Ac Year</th>
           <th class="text-white">Year</th>
           <th class="text-white">Semester</th>
           <th class="text-white">GPA</th>
           <th class="text-white">CGPA</th>
       </tr>
       <tr v-for="status in myStatus" :key="status.id">
           <td>{{status.year}}</td>
           <td>{{status.year_no}}</td>
           <td>{{status.semester_no}}</td>
           <td v-if="status.GPA==0"></td>
           <td v-else>{{status.GPA?.toString().substring(0,4)}}</td>
           <td v-if="status.CGPA==0"></td>
           <td v-else>{{status.CGPA?.toString().substring(0,4)}}</td>   
       </tr>
   </table>
   <table class="bg-white" v-else-if="student?.role==='tvet_student'">
       <tr>
           <th class="text-white">Ac Year</th>
           <th class="text-white">Level</th>
           <th class="text-white">Status</th>
       </tr>
       <tr v-for="status in myStatus" :key="status.id">
           <td>{{status.year}}</td>
           <td>{{status.level_no}}</td>
           <td>{{status.status}}</td>
       </tr>
   </table>
   <div v-if="!myStatus.length" class="text-center">
         There is no record available
   </div>
  </base-card>
</template>

<script>
import apiClient from '../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
     myStatus:[]
    }
  },
   computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
  methods:{
     async fetchMyStatus(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            if (response.status === 200) {
              this.myStatus=response.data
              // this.studentCurrentYearNo=response.data.current_year_no
            } else {
                throw 'faild to load degree department'
            }
        } catch{
            //
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
  },
  created(){
    this.$emit('title', 'My Status')
    if(this.student.role==='degree_student')
    this.fetchMyStatus('/api/degree_my_status/'+this.student.id)
    else if(this.student.role==='tvet_student')
    this.fetchMyStatus('/api/tvet_my_status/'+this.student.id)
  }
}
</script>
