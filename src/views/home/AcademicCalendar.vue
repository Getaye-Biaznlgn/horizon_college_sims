<template>
    <div class="container">
        <strong class="d-block text-center mb-2 mt-3">2013 Degree Regular Students Academic Calendar</strong>
            <div class="row g-4">
                <div class="col-lg-6 py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">First Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">Second Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>   
            </div>
    </div>
    <!-- //extension -->
        <div class="container">
        <strong class="d-block text-center mb-2 mt-3">2013 Degree Extension Students Academic Calendar</strong>
            <div class="row g-4">
                <div class="col-lg-6 py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">First Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">Second Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">Third Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>
            </div>
    </div>
    <!-- //tvet -->
    <div class="container mb-5">
         <strong class="d-block text-center mb-2 mt-3">2013 TVET Students Academic Calendar</strong>
         <div class=" py-3">
                    <table class="">
                        <tr>
                            <th colspan="2" class="text-center">Third Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="n in 10" :key="n">
                            <td>September 11, 2007EC</td>
                            <td>Lorem ipsum dolor sit amet consectetur here and elit.
                            </td>
                         </tr>
                    </table>
                </div>
    </div>
</template>
<script>
import apiClient from '../../resources/baseUrl'
export default {
    data(){
        return{
           activities:[]
        }
    },
    methods:{
        async fetchAcademicActivities(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_academic_activities")
            if (response.status === 200) {
              this.activities=response.data
            } else {
              throw 'Failed to fetch event'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    }
}
</script>
<style scoped>
 
 table {
  border-collapse: collapse;
  width: 100%;
}
/* new design change start*/
th{
  text-align: left;
  padding: 8px;
}
tr,td,th{
  border: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>