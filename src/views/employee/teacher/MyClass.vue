<template>
    <div class="row g-4 pt-2">
        <div v-for="n in 10" :key="n" class="col-md-6 col-lg-4">
          <base-card class="px-0">
            <h4  class="text-center">2014RABS</h4>
            <hr  class="my-0 mb-1">
            <div class="px-3 pb-1">Department : <span class="ms-2"></span></div>
            <div class="px-3 pb-1">Program : <span class="ms-2"></span></div>
            <div class="px-3 pb-1">Year : <span class="ms-2"></span></div>
            <div class="px-3 pb-1">Course Title : <span class="ms-2"></span></div>
            <div class="px-3 pb-1">Student : <span class="ms-2"></span></div>
            <button @click="$router.push({name:'TeacherStudent'})" class="btn btn-add text-white mt-2 py-0 mx-3">See All</button>
         </base-card> 
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>