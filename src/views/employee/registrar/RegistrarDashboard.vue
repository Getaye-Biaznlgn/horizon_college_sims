<template>
    <div class="px-0 mx-0 mt-0">
        <div class="position-relative">
            <img src="../../../assets/dashboard_header.png" alt=""  height="200" class="img-fluid">
            <div class="position-absolute top-0 start-0 ms-2 mt-2 text-white">
                <p class="fw-bold">Well come Mr. Netsanet!</p>
                <p class="small">I wish you a good day and enjoy your time.</p>
            </div> 
        </div>
        <div class="cards d-flex position-relative justify-content-between mx-2">
            <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total TVET Students</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.total_tvet_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Degree Students</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.total_degree_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New TVET Students</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.new_tvet_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New Degree Students</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.new_degree_student}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1 mx-4">Total COC</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.total_coc}}</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Current COC Students</span>
                <span class="fw-bold d-block text-center">{{dashboardDatas.current_coc_students}}</span>
            </div>
        </div>
        <div class="row  my-3">
          <div class="col-lg-6"> 
              <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>Degree Scholarship Students</span>
                <a href="/degreestudent/" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Student Id</th>
                             <th>Full Name</th>
                             <th>Department</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(degreeScholar,index) in dashboardDatas.degree_scholarship_students" :key="degreeScholar.student_id">
                              <td>{{index+1}}</td>
                              <td>{{degreeScholar.student_id}}</td>
                              <td>{{degreeScholar.first_name+' '+degreeScholar.last_name}}</td>
                              <td>{{degreeScholar.degree_department?.name}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div v-if="!dashboardDatas.degree_scholarship_students?.length" class="ms-5 mt-2">
                     No Degree scholarship students found
                 </div>
              </base-card>
          </div>
           <div class="col-lg-6"> 
              <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>TVET Scholarship Students</span>
                <a href="/tvetstudent/" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Student Id</th>
                             <th>Full Name</th>
                             <th>Department</th>
                         </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(tvetScholar,index) in dashboardDatas.tvet_scholarship_students" :key="tvetScholar.student_id">
                              <td>{{index+1}}</td>
                              <td>{{tvetScholar.student_id}}</td>
                              <td>{{tvetScholar.first_name+' '+tvetScholar.last_name}}</td>
                              <td>{{tvetScholar.tvet_department?.name}}</td>
                         </tr>
                     </tbody>
                 </table>
                  <div v-if="!dashboardDatas.tvet_scholarship_students?.length" class="ms-5 mt-2">
                     No TVET scholarship students found
                 </div>
              </base-card>
          </div>
        </div>
                <div class="row">
          <div class="col-lg-6">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span v-if="dashboardDatas.active_month?.length">{{dashboardDatas.active_month+' '}} un paid Degree Students</span>
                <a href="/staff/degree-student-fee" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>ID</th>
                             <th>Full Name</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(student,index) in dashboardDatas.unpaid_degree_students" :key="student.student_id">
                              <td>{{index+1}}</td>
                              <td>{{student.student_id}}</td>
                              <td>{{student.first_name+' '+student.last_name}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div v-if="!dashboardDatas.unpaid_degree_students?.length" class="ms-5 mt-2">
                     No unpaid Degree students found in {{dashboardDatas.active_month}}
                 </div>
               </base-card>
          </div>
          <div class="col-lg-6">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span  v-if="dashboardDatas.active_month?.length">{{dashboardDatas.active_month+' '}} Unpaid TVET Students</span>
                <a href="/staff/tvet-student-fee" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                           <tr>
                             <th>No</th>
                             <th>ID</th>
                             <th>Full Name</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(student,index) in dashboardDatas.unpaid_tvet_students" :key="student.student_id">
                              <td>{{index+1}}</td>
                              <td>{{student.student_id}}</td>
                              <td>{{student.first_name+' '+student.last_name}}</td>
                         </tr>
                     </tbody>
                 </table>
                 <div v-if="!dashboardDatas.unpaid_tvet_students?.length" class="ms-5 mt-2">
                     No unpaid TVET students found in {{dashboardDatas.active_month}}
                 </div>
               </base-card>
          </div>
        </div>
    </div>
</template>
<script>
import apiClient from '../../../resources/baseUrl'
import BaseCard from '../../../components/BaseCard.vue'
export default {
  components: { BaseCard },
  data() {
      return {
          dashboardDatas:''
      }
  },
  computed:{
      acYearId(){
          return this.$store.getters.acYearId
      }
  },
  created() {
      this.fetchRegistrarDashiboard(this.acYearId)
  },
  watch:{
acYearId(newValue){
    this.fetchRegistrarDashiboard(newValue)
}
  },
  methods: {
      async fetchRegistrarDashiboard(acId){
try{
    var response = await apiClient.get(`api/registrar_dash_board?academic_year_id=${acId}`)
    if(response.status === 200){
        console.log('dashboard data ',response.data)
        this.dashboardDatas = response.data
    }
}
catch(e){
    console.log('error')
}
      }
  },
}
</script>
<style scoped>
  .bg-cyan-light{
      background-color: #e7fafa;
  }
  tr,th,td{
      border: none;
      padding: 5px;
  }
  tr{
      border-top-right-radius: 2em!important;
  }
  .cards{
      margin-top: -30px;
  }
  tbody tr:nth-child(2n){
      background-color: #f5f6fa;
  }
</style>