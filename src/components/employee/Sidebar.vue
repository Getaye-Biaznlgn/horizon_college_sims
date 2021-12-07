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
               <sidebar-item :isSubItem="true" :to="{}">
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