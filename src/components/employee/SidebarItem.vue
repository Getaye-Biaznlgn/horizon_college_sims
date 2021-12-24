<template>
      <li>
         <router-link :to="to" :class="{asSubItem:isSubItem}" class="nav-link text-white ps-3 py-2">
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
      padding:10px 0 10px 32px !important;
      color: #000 !important;
      font-size: 12px;
      border-top: 1px solid darkgray;
  }
  span{
      font-size: 16px;
  }  
  .active{
background-color: #366ad9;
color: #fff;
  }
  /* a.router-link-active{
      background-color: red;
  } */
   /* a.router-link-exact-active{
      background-color: green;
  } */
</style>