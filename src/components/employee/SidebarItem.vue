<template>
      <li>
         <router-link :to="to" :class="{asSubItem:isSubItem}" class="nav-link text-dark fw-bold ps-3 py-2">
             <slot/>
          </router-link>
     </li>
</template>
<script>
export default {
    props:['to','isSubItem']
}
</script>
<style scoped>
  .asSubItem{
      margin: 0;
      padding:10px 0 10px 10px !important;
      color: #000 !important;
      font-size: 14px;
      /* border-top: 1px solid darkgray; */
  }
  span{
      font-size: 16px;
  }  
  .active{
      background-color: #366ad3;
      color:#fff !important;
      margin: 2px 10px;
      border-radius: 10px;
      /* border-top: 2px solid #f1f1f1; */
  }
  .active .asSubItem{
      border-radius: 0 !important;
  }
   /* a:focus,a:hover{
   background-color: #366ad9;
   color: #fff !important;
   margin: 2px 10px;
    border-radius: 10px;
  } */
  
  /* a.router-link-active{
      background-color: red;
  } */
   /* a.router-link-exact-active{
      background-color: green;
  } */
</style>