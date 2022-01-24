<template>
    <div class="row g-4 pt-2">
        <div v-for="section in mySections" :key="section.id" class="col-md-6 col-lg-4">
          <base-card class="px-0">
            <h4  class="text-center">{{section.name}}</h4>
            <hr  class="my-0 mb-1">
            <div class="px-3 pb-1"><strong>Type :</strong>  <span class="ms-2">{{section.type}}</span></div>
            <div class="px-3 pb-1"><strong>Department :</strong>  <span class="ms-2">{{section.department}}</span></div>
            <div class="px-3 pb-1"><strong>Program :</strong>  <span class="ms-2">{{section.program}}</span></div>
            <div v-if="section.year" class="px-3 pb-1"><strong>Year :</strong>  <span class="ms-2">{{section.year}}</span></div>
            <div v-else-if="section.level" class="px-3 pb-1"><strong>Level :</strong>  <span class="ms-2">{{section.level}}</span></div>
            <div class="px-3 pb-1"><strong>Course Title : </strong> <span class="ms-2">{{section.course_title}}</span></div>
            <div class="px-3 pb-1"><strong><i class="fas fa-users"></i> </strong> <span class="ms-2">{{section.no_of_students}} Students</span></div>
            <button @click="showSectionStudent(section)" class="btn btn-add text-white mt-2 py-0 mx-3">See All</button>
         </base-card> 
        </div>
    </div>
    <div v-if="!mySections.length"  class="mt-4 text-center"><span class="mt-1">There is no recored available</span></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
     ...mapGetters({mySections:'teacher/mySections'})
  },
  methods:{
    showSectionStudent(section){
      if(section.type==='degree')
      this.$router.push({name:'TeacherDegreeStudent', query:{id:section.id,courseId:section.course_id}})
      else if(section.type==='tvet')
      this.$router.push({name:'TeacherTvetStudent', query:{id:section.id,courseId:section.course_id}})
    }
  }
}
</script>