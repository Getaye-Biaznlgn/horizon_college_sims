<template>
    <div class="container py-4">
      <p>Horizon College provides the following field of studies with distance, regular and extension program</p>
       <div class="d-lg-flex my-3 justify-content-around">
        <div class="flex-fill me-md-3 my-3 my-md-0">
            <strong>Degree Program</strong>
            <table class="mt-2">
                <tr>
                  <th>No.</th>  
                  <th>Department</th> 
                </tr>
                <tbody>
                   <tr v-for="(dep,index) in degreeDepartments" :key="index">
                     <td>{{index+1}}</td>
                     <td>{{dep}}</td>
                   </tr> 
                </tbody>
            </table>
        </div>
         <div class="">
             <div class="vl h-100"></div>
         </div> 
        <div class="flex-fill ms-md-3 ">
            <strong>TVET Program</strong>
            <table class="mt-2">
                <tr>
                  <th>No.</th>  
                  <th>Department</th> 
                </tr>
                <tbody>
                   <tr v-for="(dep,index) in tvetDepartments" :key="index">
                     <td>{{index+1}}</td>
                     <td>{{dep}}</td>
                   </tr>  
                </tbody>
            </table>
        </div>    
       </div> 
    </div>
</template>
<script>
import apiClient from '../../resources/baseUrl'
export default {
  data(){
    return{
       degreeDepartments:[],
       tvetDepartments:[]
    }
  },
  methods:{
     async fetchDepartments(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_home_departments")
            if (response.status === 200) {
              this.degreeDepartments=response.data.degree_departments
              this.tvetDepartments=response.data.tvet_departments
            } else {
              throw 'Failed to fetch dep'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
    },
  },
  created(){
    this.fetchDepartments()
  }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
tr{
  border-top: 2px solid #dddddd;
  text-align: left;
  vertical-align: top;
}

th,td{
    padding: 8px;
}
table:last-child{
    border-bottom: 2px solid #dddddd;
}
.vl{
    border-left: 2px solid #dddddd;
}
</style>