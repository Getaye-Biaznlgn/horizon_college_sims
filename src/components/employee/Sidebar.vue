<template>
   <nav class="navbar-dark">
      <ul class="navbar-nav">
        <li class="mx-2 mt-2">Main</li>
           <sidebar-item :isSubItem="false" :to="{name:'MyClass'}" v-if="user.role==='teacher'">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>My Class</span>
         </sidebar-item>

       <!-- admin -->
         <sidebar-item v-if="user.role==='admin'" :isSubItem="false" :to="{name:'AdminDashboard'}">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>
         <sidebar-item v-if="user.role==='admin'" :isSubItem="false" :to="{name:'IncomePerDay'}">
            <span><i class="fas fa-money-check-alt pe-2" ></i>Daily</span>
         </sidebar-item>
         <sidebar-item v-if="user.role==='admin'" :isSubItem="false" :to="{name:'ThePayment'}">
            <span><i class="fas fa-receipt pe-2"></i>Payment</span>
         </sidebar-item>
         <sidebar-item v-if="user.role==='admin'" :isSubItem="false" :to="{name:'TheDean'}">
            <span><i class="fas fa-user-alt pe-2"></i>Dean</span>
         </sidebar-item>
        

       <!--end admin -->
        <!-- dean -->
         <sidebar-item v-if="user.role==='dean'" :isSubItem="false" :to="{name:'DeanDashboard'}">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>

         <collapse-sidebar-item v-if="user?.role==='dean'" label="Department"> 
            <template #icon>
              <span><i class="fas fa-layer-group pe-2"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'DegreeDepartment'}">
                <span>Degree</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'TVETDepartment'}">
                <span>TVET</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>

         <collapse-sidebar-item label="Curriculum" v-if="user.role==='dean'"> 
            <template #icon>
              <span><i class="fas  fa-align-justify pe-2"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'CourseCurriculum'}">
                <span>Course</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'ModuleCurriculum'}">
                <span>Module</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>

          <collapse-sidebar-item label="Employee" v-if="user.role==='dean'"> 
            <template #icon>
              <span><i class="fas fa-user-friends pe-1"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'AddTeacher'}">
                 <span>Teacher</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddDepartmentHead'}">
                 <span>Dep. head</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddRegistrar'}">
                 <span>Registrar</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddCashier'}">
                <span>Cashier</span>
               </sidebar-item> 
            </template>
          </collapse-sidebar-item>

         <collapse-sidebar-item label="User" v-if="user.role==='dean'"> 
            <template #icon>
              <span><i class="fas fa-user-circle pe-2"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'EmployeeAccount'}">
                <span>Employee</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'StudentAccount'}">
                <span>Student</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>
        <!-- <collapse-sidebar-item label="Student" v-if="user?.role==='registrar'">  -->
          
        <collapse-sidebar-item label="Website" v-if="user.role==='dean'"> 
            <template #icon>
              <span><i class="fas fa-tachometer-alt pe-2"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'ManageEvent'}">
                <span>Event</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'ManageNews'}">
                <span>News</span>
               </sidebar-item> 
               <sidebar-item :isSubItem="true" :to="{name:'StudentGallery'}">
                <span>Student Gallery</span>
               </sidebar-item> 
            </template>
        </collapse-sidebar-item>
         <sidebar-item  :to="{name:'AcademicSetting'}" v-if="user.role==='dean'" :isSubItem="false" >
            <span><i class="fas fa-cog pe-2"></i>Academic Setting</span>
         </sidebar-item>
          <sidebar-item v-if="user.role==='dean'" :isSubItem="false" :to="{name:'ManageFeeAmount'}">
            <span><i class="fas fa-receipt pe-2"></i> Fee</span>
         </sidebar-item>
         
         
         <!-- //Registrar -->
           <sidebar-item v-if="user?.role==='registrar'" :isSubItem="false" :to="{name:'RegistrarDashboard'}">
                 <span><i class="fas fa-border-all me-3"></i>Dashboard</span>
               </sidebar-item> 
        <collapse-sidebar-item label="Student" v-if="user.role==='registrar'"> 
            <template #icon>
              <span class="me-2"><i class="fas fa-user-graduate"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'DegreeStudent'}">
                 <span>Degree</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'TvetStudent'}">
                 <span>TVET</span>
               </sidebar-item>  
            </template>
         </collapse-sidebar-item>
        <collapse-sidebar-item label="Tuition Fee" v-if="user.role==='registrar'"> 
            <template #icon>
              <span class="feeicon"><i class="fas fa-money-check-alt me-2"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'DegreeStudentFee'}">
                <span>Degree Fee</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'TvetStudentFee'}">
                <span>Tvet Fee</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>
             <sidebar-item v-if="user?.role==='registrar'" :isSubItem="false" :to="{name:'coc'}">
            <div class="d-flex">
              <span><i class="fas fa-graduation-cap"></i></span>
                <span class="ms-2">COC</span>
            </div>            
               </sidebar-item>  
          <collapse-sidebar-item label="Graduated" v-if="user?.role==='registrar'"> 
            <template #icon>
              <span><i class="fas fa-graduation-cap"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'DegreeGraduated'}">
                 <span>Degree</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'TvetGraduated'}">
                 <span>TVET</span>
                </sidebar-item> 
            </template>
            
         </collapse-sidebar-item> 
         <sidebar-item v-if="user?.role==='registrar'" :isSubItem="false" :to="{name:'StudentCopy'}">
            <div class="d-flex">
              <span><i class="fas fa-exclamation-circle"></i></span>
                <span class="ms-2">Student Copy</span>
            </div>            
          </sidebar-item>  
         <!-- //cashier path -->
              <sidebar-item v-if="user?.role==='cashier'" :isSubItem="false" :to="{name:'CashierDashboard'}">
                 <span><i class="fas fa-border-all me-3"></i>Dashboard</span>
               </sidebar-item> 
        <sidebar-item v-if="user?.role==='cashier'" :isSubItem="false" :to="{name:'payment'}">
                 <span><i class="fas fa-coins me-3"></i>Payment</span>
               </sidebar-item> 
                <collapse-sidebar-item v-if="user?.role==='cashier'" label="Tuition Fee"> 
            <template #icon>
              <span><i class="fas fa-money-check-alt me-3"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'DegreeFee'}">
                 <span>Degree</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'TvetFee'}">
                 <span>TVET</span>
               </sidebar-item>  
            </template>
            
         </collapse-sidebar-item> 
           <!-- degree department head -->
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadDashboard'}" v-if="user.role==='degree_head'">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadCourse'}" v-if="user.role==='degree_head'" >
            <span><i class="fas  fa-align-justify pe-2"></i>Course</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadSection'}" v-if="user.role==='degree_head'" >
            <span><i class="fas fa-layer-group pe-2"></i>Section</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadStudent'}" v-if="user.role==='degree_head'" >
            <span><i class="fas fa-user-graduate pe-2"></i>Students</span>
         </sidebar-item>
         <collapse-sidebar-item label="Report" v-if="user.role==='degree_head'" > 
            <template #icon>
              <span><i class="fas fa-exclamation-circle pe-2"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'DegreeHeadSlipReport'}">
                 <span>Slip Report</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'DegreeHeadGradeReport'}">
                 <span>Grade Report</span>
               </sidebar-item>  
            </template>
         </collapse-sidebar-item>
         
         <!-- //tvet department head -->
         <sidebar-item :isSubItem="false" :to="{name:'TvetHeadDashboard'}" v-if="user.role==='tvet_head'">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'TvetHeadModule'}" v-if="user.role==='tvet_head'" >
            <span ><i class="fas  fa-align-justify pe-2"></i>Module</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'TvetHeadSection'}" v-if="user.role==='tvet_head'" >
            <span><i class="fas fa-layer-group pe-2"></i>Section</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'TvetHeadStudent'}" v-if="user.role==='tvet_head'" >
            <span><i class="fas fa-user-graduate pe-2"></i>Students</span>
         </sidebar-item>
         <collapse-sidebar-item label="Repor" v-if="user.role==='tvet_head'" > 
            <template #icon>
              <span><i class="fas fa-exclamation-circle pe-2"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'TvetHeadSlipReport'}">
                 <span>Slip Report</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'TvetHeadGradeReport'}">
                 <span>Grade Report</span>
               </sidebar-item>  
            </template>
         </collapse-sidebar-item>
        
         <li class="m-2">More</li>
         <sidebar-item  :to="{name:'AccountSetting'}" :isSubItem="false" >
            <span><i class="fas fa-cog pe-2"></i>Setting</span>
         </sidebar-item>
         
         <li class="fw-bold ps-3 "><span @click="logout"  class="logout"><i class="fas fa-sign-out-alt me-2"></i>Logout</span></li>  
      </ul>
   </nav>
</template>
<script>
import SidebarItem from './SidebarItem.vue'
import CollapseSidebarItem from './CollapseSidebarItem.vue'
import apiClient from '../../resources/baseUrl'
export default {
    components:{
       SidebarItem,
       CollapseSidebarItem
    },
    computed:{
     user(){
         return this.$store.getters.user
      }
    },
    methods:{

     async logout () {
            try {
              var response = await apiClient.post('/api/logout')
              if (response.status === 200) {
                apiClient.defaults.headers.common['Authorization'] =null
                this.$store.dispatch('setToken','')
                this.$store.dispatch('setIsAuthenticated', false)
      
                localStorage.removeItem('token')  
                this.$router.push({name:'EmployeeLogin'})
               }else{
                throw 'faild'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
    }
}
</script>
<style scoped>
 i{
   font-size: 1.5em;
 }
 .fa-sign-out-alt{
  transform: rotate(180deg);
 }
 .logout{
   cursor: pointer;
 }
 span{
      font-size: 16px;
  }
  .feeicon{
    font-size: 13px;
  }
</style>