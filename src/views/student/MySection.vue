<template>
  <base-card class="px-3 mx-md-4 mt-md-3">
    <table class="bg-white" v-if="student?.role==='degree_student'">
       <tr>
           <th class="text-white">Ac Year</th>
           <th class="text-white">Year</th>
           <th class="text-white">Semester</th>
           <th class="text-white">Section</th>
       </tr>
       <tr v-for="section in mySections" :key="section.id">
           <td>{{section.academic_year}}</td>
           <td>{{section.year_no}}</td>
           <td>{{section.semester}}</td>
           <td>{{section.name}}</td>
       </tr>
   </table>
       <table class="bg-white" v-else-if="student?.role==='tvet_student'">
       <tr>
           <th class="text-white">Ac Year</th>
           <th class="text-white">Level</th>
           <th class="text-white">Section</th>
       </tr>
       <tr v-for="section in mySections" :key="section.id">
           <td>{{section.academic_year}}</td>
           <td>{{section.level}}</td>
           <td>{{section.name}}</td>
       </tr>
   </table>
   <div v-if="!mySections.length" class="text-center">
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
      mySections:[]
    }
  },
   computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
  methods:{
      async  fetchMySections(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            console.log('d',response.data)
            if (response.status === 200) {
              this.mySections=response.data
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
     this.$emit('title', 'My Section')
    if(this.student.role==='degree_student')
      this.fetchMySections('api/degree_my_section/'+this.student.id)
    else if(this.student.role==='tvet_student')
      this.fetchMySections('api/tvet_my_section/'+this.student.id)
  }
}
</script>
