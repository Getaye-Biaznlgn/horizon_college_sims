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
      padding:5px 0 5px 32px !important;
      color: #000 !important;
  }
  span{
      font-size: 16px;
  }
  .active{
      background-color: #1f3f49;
      /* border-top: 2px solid #f1f1f1; */
  }
  /* a.router-link-active{
      background-color: red;
  } */
   /* a.router-link-exact-active{
      background-color: green;
  } */
</style>