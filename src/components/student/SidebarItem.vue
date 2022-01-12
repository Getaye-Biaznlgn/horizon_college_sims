<template>
       <li class="border-top border-bottom">
          <router-link @click="$emit('linkClicked')" :to="to" class="nav-link text-white px-3 py-2">
              <!-- sidebar item name and icon will be here -->
              <slot/>
          </router-link>    
        </li>
</template>
<script>
export default {
    props:['to']
}
</script>
<style scoped>
.active{
      background-color: #29536e;
  }
</style>