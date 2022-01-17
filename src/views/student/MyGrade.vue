<template>
  <base-card class="px-3 mx-md-4 mt-md-3">
    <table class="bg-white" v-if="student?.role==='degree_student'">
       <tr>
           <th class="text-white">Course Code</th>
           <th class="text-white">Course Title</th>
           <th class="text-white">Credit Point(CP)</th>
           <th class="text-white">Year No</th>
           <th class="text-white">Semester No</th>
           <th class="text-white">Grade</th>
       </tr>
       <tr v-for="courseGrade in myCourseGrade" :key="courseGrade">
           <td>{{courseGrade.code}}</td>
           <td>{{courseGrade.title}}</td>
           <td>{{courseGrade.cp}}</td>
           <td>{{courseGrade.year_no}}</td>
           <td>{{courseGrade.semester_no}}</td>
           <td>{{courseGrade.letter_grade}}</td>
       </tr>
   </table>
   <table class="bg-white" v-else-if="student?.role==='tvet_student'">
       <tr>
           <th class="text-white">Module Code</th>
           <th class="text-white">Module Title</th>
           <th class="text-white">Training Hours</th>
           <th class="text-white">Grade</th>
           <th class="text-white">Level</th>
       </tr>
       <tr v-for="module in myCourseGrade" :key="module.id">
           <td>{{module.code}}</td>
           <td>{{module.title}}</td>
           <td>{{module.training_hour}}</td>
           <td>{{module.total_mark}}</td>
           <td>{{module.level_no}}</td>
       </tr>
   </table>
   <div v-if="!myCourseGrade.length" class="text-center">
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
       myCourseGrade:[]
     }
  },
   computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
  methods:{
    async  fetchMyGrade(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            console.log('d',response.data)
            if (response.status === 200) {
              this.myCourseGrade=response.data
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
      },
  },
  created(){
    this.$emit('title', 'My Grade')
    if(this.student.role==='degree_student')
      this.fetchMyGrade('api/degree_my_grade/'+this.student.id)
    else if(this.student.role==='tvet_student')
      this.fetchMyGrade('api/tvet_my_grade/'+this.student.id)
  }
}
</script>
