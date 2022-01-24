<template>
  <base-card class="px-3 mx-md-4 mt-md-3">
    
    <table class="bg-white">
       <tr>
           <th class="text-white">Year</th>
           <th class="text-white">Reg. Date</th>
           <th class="text-white">Exam date</th>
           <th class="text-white">Occupation</th>
           <th class="text-white">Level</th>
           <th class="text-white">Result</th>
       </tr>
       <tr v-for="coc in myCOCs" :key="coc.id">
           <td>{{coc.year}}</td>
           <td>{{coc.registration_date}}</td>
           <td>{{coc.exam_date}}</td>
           <td>{{coc.occupation}}</td>
           <td>{{coc.level}}</td>
           <td>{{coc.result}}</td>
       </tr>
   </table>
   <div v-if="!myCOCs.length" class="text-center">
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
      myCOCs:[]
    }
  },
 computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
methods:{
       async  fetchCOC(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            console.log('my course',response.data)
            if (response.status === 200) {
              this.myCOCs=response.data
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
  this.$emit('title', 'My COC')
  if(this.student.role==='degree_student')
  this.fetchCOC('/api/degree_my_coc/'+this.student.id)
  else if(this.student.role==='tvet_student')
  this.fetchCOC('api/tvet_my_coc/'+this.student.id)
}
}
</script>
