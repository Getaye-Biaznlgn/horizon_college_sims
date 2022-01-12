<template>
  <base-card class="px-3 mx-4 mt-3">
    <div class="container">
        <div class="row g-4">
            <div v-for="n in 20" :key="n" class="col-sm-6 col-md-3 col-lg-2">
               <div class="file-item">  
                 <span class="d-block"><i class="fas  fa-folder-open" style="font-size:5em; color:#ffd480"></i></span>
                 <strong class="d-block">Management</strong>
                 <span class="d-block small">23 Files</span>
               </div>  
            </div>
        </div>
    </div>
  </base-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.file-item{
    cursor: pointer;
}
</style>