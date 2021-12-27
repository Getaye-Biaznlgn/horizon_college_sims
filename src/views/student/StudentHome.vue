<template>
<div class="row">
  <div class="col-sm col-md-2 pe-0">
     <div class="header py-3 shadow-sm text-white fw-bold px-3 mx-0">Student Portal</div> 
     <div class="sidebar">
        <sidebar></sidebar>
     </div>
  </div>
  <div class="col-sm col-md-10 px-0">
     <div class="bg-white py-sm-2 py-md-3 px-3 shadow-sm fw-bold">My Course</div>
     <router-view/>
  </div>
</div>
  
</template>
<script>
import Sidebar from '../../components/student/Sidebar.vue'
export default {
   components:{Sidebar}
}
</script>
<style scoped>
.header{
   background-color: #088dc5;
}
.sidebar{
   background-color: #3081b4;
   min-height: 90vh;
}

</style>