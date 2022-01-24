<template>
   <nav class="navbar-dark side-bar">
      <ul class="navbar-nav px-3">
        <li class="mb-2 mt-3  text-white">Main</li>
         <sidebar-item :to="{name:'MyTutionFee'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-receipt me-2"></i> My Tution Fee</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyCourse'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-book-open me-2"></i> My Course</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyGrade'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-poll me-2"></i> My Grade</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyStatus'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-receipt me-2"></i> My Status</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MyCOC'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-users me-2"></i>My COC</span>
         </sidebar-item>
         <sidebar-item :to="{name:'MySection'}" @linkClicked="$emit('linkClicked')">
             <span><i class="fas fa-users me-2"></i>My Section</span>
         </sidebar-item>
        <li class="mb-2 mt-3  text-white">More</li>
         <sidebar-item to="/" @linkClicked="$emit('linkClicked')">
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
  .side-bar{
      min-height: 100vh;
  }
</style>>

