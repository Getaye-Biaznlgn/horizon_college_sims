<template>
   <nav class="navbar-dark">
      <div class="title text-white p-3">HORIZON</div>
      <ul class="navbar-nav">
         <sidebar-item  :isSubItem="false" :to="{name:'DeanDashboard'}">
            <span><i class="fas fa-tachometer-alt pe-3" ></i>Dashboard</span>
         </sidebar-item>
         <collapse-sidebar-item label="Department"> 
            <template #icon>
              <span><i class="fas fa-tachometer-alt pe-3"></i></span>
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
         <collapse-sidebar-item label="Curriculum"> 
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
          <collapse-sidebar-item label="Employee"> 
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
                  <collapse-sidebar-item label="Student Fee"> 
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
           <collapse-sidebar-item label="Student"> 
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
         <sidebar-item :isSubItem="false" :to="{name:'payment'}">
                 <span><i class="fas fa-coins me-3"></i>Payment</span>
               </sidebar-item> 
                <collapse-sidebar-item label="Tuition Fee"> 
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
      </ul>
   </nav>
</template>
<script>
import SidebarItem from './SidebarItem.vue'
import CollapseSidebarItem from './CollapseSidebarItem.vue'
export default {
    components:{
       SidebarItem,
       CollapseSidebarItem
    },
    computed:{
     
    },
    methods:{
      
    }
}
</script>
<style scoped>
 .title{
     font-size: 24px;
     font-weight: 400;
 }
</style>