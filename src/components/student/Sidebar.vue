<template>
   <nav class="navbar-dark">
      <ul class="navbar-nav px-3">
        <li class="mb-2 mt-3  text-white">Main</li>
         <sidebar-item :to="{name:'MyTutionFee'}">
             <span><i class="fas fa-receipt me-2"></i> My Tution Fee</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyCourse'}">
             <span><i class="fas fa-book-open me-2"></i> My Course</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyGrade'}">
             <span><i class="fas fa-poll me-2"></i> My Grade</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyStatus'}">
             <span><i class="fas fa-receipt me-2"></i> My Status</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MySection'}">
             <span><i class="fas fa-users me-2"></i>My Section</span>
         </sidebar-item>
        <li class="mb-2 mt-3  text-white">More</li>
         <sidebar-item to="/">
             <span><i class="fas fa-globe me-2"></i>Official Site</span>
         </sidebar-item>
      </ul>
   </nav>      
</template>

<script>
import SidebarItem from './SidebarItem.vue'
export default {
  components:{SidebarItem}  

}
</script>

<style scoped>
  
</style>>

