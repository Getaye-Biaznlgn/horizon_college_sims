<template>
    <div class="px-0 mx-0 mt-0">
        <div class="position-relative">
            <img src="../../../assets/dashboard_header.png" alt=""  height="200" class="img-fluid">
            <div class="position-absolute top-0 start-0 ms-2 mt-2 text-white">
                <p class="fw-bold">Well come Mrs. Tigist!</p>
                <p class="small">I will you good day and enjoy you time.</p>
            </div> 
        </div>
        <div class="cards d-flex position-relative justify-content-between mx-2">
            <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total TVET Students</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Total Degree Students</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New TVET Students</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">New TVET Students</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1 mx-4">Total COC</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
             <div class=" bg-cyan-light shadow p-2 rounded rounded-lg">
                <span class="d-block text-center fs-2"><i class="fas fa-user-graduate pe-2 fw-bold"></i></span>
                <span class="d-block text-center small my-1">Current COC Students</span>
                <span class="fw-bold d-block text-center">300</span>
            </div>
        </div>
        <div class="row  my-3">
          <div class="col-lg-8"> 
              <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>Degree Scholarship Students</span>
                <a href="#" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Student Id</th>
                             <th>Full Name</th>
                             <th>Department</th>
                             <th>Scholarship</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="n in 4" :key="n">
                              <td>{{n}}</td>
                              <td>HC 20032</td>
                              <td>Alemayehu Gelagay</td>
                              <td>Computer Science</td>
                              <td>Fully</td>
                         </tr>
                     </tbody>
                 </table>
              </base-card>
          </div>
          <div class="col-lg-4">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span>Regular Teachers</span>
                <a href="#" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="n in 4" :key="n">
                              <td>{{n}}</td>
                              <td>Alemayehu Gelagay</td>
                         </tr>
                     </tbody>
                 </table>
               </base-card>
          </div>
        </div>
                <div class="row">
          <div class="col-lg-8"> 
              <base-card>
              <div class="d-flex justify-content-between mb-2">
                <span>TVET Scholarship Students</span>
                <a href="#" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Student Id</th>
                             <th>Full Name</th>
                             <th>Department</th>
                             <th>Scholarship</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="n in 4" :key="n">
                              <td>{{n}}</td>
                              <td>HC 20032</td>
                              <td>Alemayehu Gelagay</td>
                              <td>Computer Science</td>
                              <td>Fully</td>
                         </tr>
                     </tbody>
                 </table>
              </base-card>
          </div>
          <div class="col-lg-4">
               <base-card>
                <div class="d-flex justify-content-between mb-2">
                <span>Contract Teachers</span>
                <a href="#" class="nav-link fw-bold py-0">SEE ALL</a>
              </div>
                 <table>
                     <thead class="bg-secondary text-white">
                         <tr>
                             <th>No</th>
                             <th>Full Name</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="n in 4" :key="n">
                              <td>{{n}}</td>
                              <td>Alemayehu Gelagay</td>
                         </tr>
                     </tbody>
                 </table>
               </base-card>
          </div>
        </div>
    </div>
</template>
<script>
import BaseCard from '../../../components/BaseCard.vue'
export default {
  components: { BaseCard },
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