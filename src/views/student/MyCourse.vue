<template>

   <base-card class="px-3 mx-md-4 mt-md-3">
    <table class="bg-white"  v-if="student?.role==='degree_student'">
       <tr>
           <th class="text-white">Course Code</th>
           <th class="text-white">Course Title</th>
           <th class="text-white">Credit Point(CP)</th>
           <th class="text-white">Year</th>
           <th class="text-white">Semester</th>
           <th class="text-white">Type</th>
       </tr>
       <tr v-for="course in myCourse" :key="course.id">
           <td>{{course.code}}</td>
           <td>{{course.title}}</td>
           <td>{{course.cp}}</td>
           <td>{{course.year_no}}</td>
           <td>{{course.semester_no}}</td>
           <td>{{course.type}}</td>
       </tr>
   </table>

   <table class="bg-white" v-if="student?.role==='tvet_student'">
       <tr>
           <th class="text-white">Module Code</th>
           <th class="text-white">Module Title</th>
           <th class="text-white">Training Hours</th>
           <th class="text-white">Level</th>
       </tr>
       <tr v-for="module in myCourse" :key="module.id">
           <td>{{module.code}}</td>
           <td>{{module.title}}</td>
           <td>{{module.training_hour}}</td>
           <td>{{module.level}}</td>
       </tr>
   </table>
   <div v-if="!myCourse.length" class="text-center">
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
      myCourse:[]
    }
  },
 computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
methods:{
       async  fetchCourse(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            console.log('my course',response.data)
            if (response.status === 200) {
              this.myCourse=response.data
              // this.studentCurrentYearNo=response.data.current_year_no
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
  this.$emit('title', 'My Course')
  if(this.student.role==='degree_student')
  this.fetchCourse('/api/degree_my_course/'+this.student.id)
  else if(this.student.role==='tvet_student')
  this.fetchCourse('api/tvet_my_course/'+this.student.id)
}
}
</script>
