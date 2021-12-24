<template>
   <nav class="navbar-dark">
      <ul class="navbar-nav">
        <div class="mx-2 mt-2">Main</div>
        <!-- dean -->
         <sidebar-item v-if="user.role==='dean'" :isSubItem="false" :to="{name:'DeanDashboard'}">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>
         <collapse-sidebar-item v-if="user?.role==='dean'" label="Department"> 
            <template #icon>
              <span><i class="bi bi-justify-left"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'DegreeDepartment'}">
                <span>Degree Department</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'TVETDepartment'}">
                <span>TVET Department</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>
         <collapse-sidebar-item label="Curriculum" v-if="user.role==='dean'"> 
            <template #icon>
              <span><i class="fas fa-tachometer-alt pe-3"></i></span>
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
              <span><i class="fas fa-tachometer-alt pe-3"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'AddTeacher'}">
                 <span>Teatcher</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddDepartmentHead'}">
                 <span>Department head</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddRegistrar'}">
                 <span>Registrar</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'AddCashier'}">
                <span>Cashier</span>
               </sidebar-item> 
            </template>
            <!-- //Registrar -->
         </collapse-sidebar-item>
        <collapse-sidebar-item label="Student Fee" v-if="user.role==='registrar'"> 
            <template #icon>
              <span><i class="fas fa-tachometer-alt pe-3"></i></span>
            </template>
            <template #default>
              <sidebar-item :isSubItem="true" :to="{name:'DegreeStudentFee'}">
                <span>Degree Student Fee</span>
              </sidebar-item> 
              <sidebar-item :isSubItem="true" :to="{name:'TvetStudentFee'}">
                <span>Tvet Student Fee</span>
               </sidebar-item> 
            </template>
         </collapse-sidebar-item>

           <collapse-sidebar-item label="Student" v-if="user?.role==='registrar'"> 
            <template #icon>
              <span><i class="fas fa-tachometer-alt pe-3"></i></span>
            </template>
            <template #default>
               <sidebar-item :isSubItem="true" :to="{name:'DegreeStudent'}">
                 <span>Degree Student</span>
               </sidebar-item> 
                <sidebar-item :isSubItem="true" :to="{name:'TvetStudent'}">
                 <span>TVET Student</span>
               </sidebar-item>  
            </template>
         </collapse-sidebar-item>
           <!-- degree department head -->
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadDashboard'}" v-if="user.role==='department head'">
            <span><i class="fas fa-tachometer-alt pe-2" ></i>Dashboard</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadCourse'}" v-if="user.role==='department head'" >
            <span ><i class="fas  fa-align-justify pe-2"></i>Course</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadSection'}" v-if="user.role==='department head'" >
            <span><i class="fas fa-layer-group pe-2"></i>Section</span>
         </sidebar-item>
         <sidebar-item :isSubItem="false" :to="{name:'DegreeHeadStudent'}" v-if="user.role==='department head'" >
            <span><i class="fas fa-user-graduate pe-2"></i>Students</span>
         </sidebar-item>
         <collapse-sidebar-item label="Report" v-if="user.role==='department head'" > 
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
         <div class="m-2">More</div>
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
import apiClient from '../../store/baseUrl'
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
</style>