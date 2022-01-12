<template>
  <base-card class="px-3 mx-md-4 mt-md-3">
    <table class="bg-white">
       <tr>
           <th rowspan="2"  class="text-white text-center">Year</th>
           <th colspan="12" class="text-center text-white">Month</th>
           <th rowspan="2" class="text-white  text-center" >Total</th>
       </tr>
       <tr>
         <th class="text-white">Sep</th>
         <th class="text-white">Oct</th>
         <th class="text-white">Nov</th>
         <th class="text-white">Dec</th>
         <th class="text-white">Jan</th>
         <th class="text-white">Feb</th>
         <th class="text-white" >Mar</th>
         <th class="text-white" >Apr</th>
         <th class="text-white" >May</th>
         <th class="text-white" >Jun</th>
         <th class="text-white">Jul</th>
         <th class="text-white">Aug</th>
       </tr>
       <tr v-for="year in tutionYears" :key="year.id">
           <td>{{year.year}}</td>
           <td>{{year?.months?.September}}</td>
           <td>{{year?.months?.October}}</td>
           <td>{{year?.months?.November}}</td>
           <td>{{year?.months?.December}}</td>
           <td>{{year?.months?.January}}</td>
           <td>{{year?.months?.February}}</td>
           <td>{{year?.months?.March}}</td>
           <td>{{year?.months?.April}}</td>
           <td>{{year?.months?.May}}</td>
           <td>{{year?.months?.Jun}}</td>
           <td>{{year?.months?.July}}</td>
           <td>{{year?.months?.August}}</td>
           <td>{{year.total}}</td>
       </tr>
    </table>
    <div v-if="!tutionYears.length" class="text-center mt-2">
        There isno recored is available.
    </div>
  </base-card>

</template>

<script>
import apiClient from '../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
       tutionYears:[]
    }
  },
  computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
  methods:{
     async  fetchMyTutionFee(path){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get(path)
            if (response.status === 200) {
              this.tutionYears=response.data
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
    this.$emit('title', 'My Tution Fee')
    //  this.fetchMyTutionFee(this.student.id)
    if(this.student.role==='degree_student')
       this.fetchMyTutionFee('api/degree_my_tution/'+this.student.id)
    else if(this.student.role==='tvet_student')
       this.fetchMyTutionFee('api/tvet_my_tution/'+this.student.id)
  }
}

</script>
