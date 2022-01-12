<template>
    <li>
      <div>
          <a class="nav-link collapsible-link py-2 ps-3 fw-bold text-dark pe-2 d-flex justify-content-between" data-bs-toggle="collapse" :href="`#${id}`" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span> <slot name="icon"/>{{label}}</span>
            <span class="dropdown-icon pt-1"><i class="fas fa-chevron-right"></i></span>
          </a>
       </div>
       <div class="collapse collapse-item" :id="id">
           <slot/>
       </div>
     </li>
</template>
<script>
export default {
    props:['label'],
    computed:{
 id(){
         return this.label.replace(/ +/g, "");
     },
      
    }
}
</script>
<style scoped>
 span{
     font-size: 16px;
 }
 .dropdown-icon{
  transition: all ease 0.23s;
}
.collapsible-link[aria-expanded="true"] .dropdown-icon{
  transform:rotate(90deg)
}
.collapse-item{
  /* background-color: #b6c3e6; */
  margin: 0 2em;
  border-radius: 10px;
}
</style>