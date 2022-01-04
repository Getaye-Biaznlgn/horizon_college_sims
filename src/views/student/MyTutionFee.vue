<template>
  here we go
</template>

<script>
import apiClient from '../../resources/baseUrl'
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({student:'studentAuth/student'})
  },
  methods:{
     async  fetchMyTutionFee(payload){
       this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/my_tution_fee/"+payload)
            console.log('d',response.data)
            if (response.status === 200) {
              this.studentSemester=response.data
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
     this.fetchMyTutionFee(this.student.id)
  }
}
</script>
