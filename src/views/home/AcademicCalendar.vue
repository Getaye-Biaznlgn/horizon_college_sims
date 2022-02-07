<template>
    <div class="container">
        <strong class="d-block text-center mb-2 mt-3">{{year}} Degree Regular Students Academic Calendar</strong>
            <div class="row g-4">
                <div class="col-lg-6 py-3">
                    <table>
                        <tr>
                            <th colspan="2" class="text-center">First Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in regularFirstActivities" :key="activity.id">
                            <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td>
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table>
                        <tr>
                            <th colspan="2" class="text-center">Second Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in regularSecondActivities" :key="activity.id">
                            <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td>
                         </tr>
                    </table>
                </div>   
            </div>
    </div>
    <!-- //extension -->
        <div class="container">
        <strong class="d-block text-center mb-2 mt-3">{{year}} Degree Extension Students Academic Calendar</strong>
            <div class="row g-4">
                <div class="col-lg-6 py-3">
                    <table>
                        <tr>
                            <th colspan="2" class="text-center">First Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in extensionFirstActivities" :key="activity.id">
                            <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td> 
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table>
                        <tr>
                            <th colspan="2" class="text-center">Second Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in extensionSecondActivities" :key="activity.id">
                           <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td> 
                         </tr>
                    </table>
                </div>
                 <div class="col-lg-6 py-3">
                    <table>
                        <tr>
                            <th colspan="2" class="text-center">Third Semester</th>
                        </tr>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in extensionThirdActivities" :key="activity.id">
                            <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td>
                         </tr>
                    </table>
                </div>
         </div>
    </div>
    <!-- //tvet -->
    <div class="container mb-5">
         <strong class="d-block text-center mb-2 mt-3">{{year}} TVET Students Academic Calendar</strong>
         <div class=" py-3">
                    <table>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Activity</th>
                        </tr>
                         <tr v-for="activity in tvetActivities" :key="activity.id">
                            <td>{{activity.date}}</td>
                            <td>{{activity.activity}}</td>
                            
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
           regularFirstActivities:[],
           regularSecondActivities:[],
           extensionFirstActivities:[],
           extensionSecondActivities:[],
           extensionThirdActivities:[],
           tvetActivities:[],
           year:''
        }
    },
    methods:{
        async fetchAcademicActivities(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_academic_calenders")
            if (response.status === 200) {
              this.regularFirstActivities=response.data.degree.regular[0]?.degree_calender_activities
              this.regularSecondActivities=response.data.degree.regular[1]?.degree_calender_activities
              this.extensionFirstActivities=response.data.degree.extension[0]?.degree_calender_activities
              this.extensionSecondActivities=response.data.degree.extension[1]?.degree_calender_activities
              this.extensionThirdActivities=response.data.degree.extension[2]?.degree_calender_activities
              this.tvetActivities=response.data.tvet
              this.year=response.data.year
            } else {
              throw 'Failed to fetch event'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
    },
    created(){
        this.fetchAcademicActivities()
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