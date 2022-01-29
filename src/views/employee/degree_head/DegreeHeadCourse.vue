<template>
<base-card class="px-3 mx-4 mt-3">
<div>
    <div class="d-flex">
       <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
       </div>
       
     <div class="pe-2 ms-auto"> 
        <select v-model="programForFilter" class="form-select" aria-label="select by program">
           <option selected value="all">All Program</option>
           <option  value="regular">Regular</option>
           <option  value="extension">Extension</option>
        </select>
     </div>
     
       <div class="pe-2"> 
          <select v-model="yearForFilter" class="form-select " aria-label="select by year">
            <option selected value="all">All Year</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
          </select>
       </div>
       <div class="pe-2"> 
          <select v-model="semesterForFilter" class="form-select" aria-label="select by semester">
            <option selected value="all">All Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
          </select>
       </div>
       <div> 
        <select v-model="typeForFilter" class="form-select" aria-label="select by program">
           <option selected value="all">All Type</option>
           <option value="major">Major</option>
           <option value="common">Common</option>
           <option value="supporting">Supporting</option>
        </select>
     </div>
    </div>
</div>

<table class="mt-2">
  <tbody>
  <tr class="table-header">
    <th>No</th>
    <th>Course Code</th>
    <th>Course Title</th>
    <th>Credit hour</th>
    <th>Program</th>
    <th>Year</th>
    <th>Semester</th>
    <th>Type</th>
  </tr>
  <tr v-for="(course,index) in filteredCourses" :key="course.id" class="">
    <td>{{index+1}}</td>
    <td>{{course.code}}</td>
    <td>{{course.title}}</td>
    <td>{{course.cp}}</td>
    <td>{{course.program?.name}}</td>
    <td>{{course.year_no}}</td>
    <td>{{course.semester_no}}</td>
    <td>{{course.type}}</td>
  </tr>
  </tbody>
  </table>
    <p v-if="!courses.length" class="mt-2 text-center"> Course isn't added for this department!</p>
    <p v-else-if="!filteredCourses.length" class="mt-2 text-center">There is no matching course</p>
 </base-card>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{ 
       /////////////////////////|
      //for filter and search//|/
     /////////////////////////|/
      searchValue:'',
      programForFilter:'all',
      yearForFilter:'all',
      semesterForFilter:'all',
      typeForFilter:'all',
   }
  },
computed:{
 ...mapGetters({
   courses:'degreeHead/courses',
   }),
    degreePrograms(){
      return this.$store.getters.programs.filter((program)=>{
        return program.type==='degree'
      })
    },
  filteredCourses(){
      //search
      let tempCourses=[...this.courses]
      if(this.searchValue!=''&& this.searchValue){
        tempCourses=tempCourses.filter((item)=>{
          return item.code
                  .toLowerCase()
                  .startsWith(this.searchValue.toLowerCase())
       })
     }
      
  //filter by program//
      if(this.programForFilter !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return item.program?.name.toLowerCase()===this.programForFilter.toLowerCase()
            })
       }
   
   //filter by year//
      if(this.yearForFilter !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return Number(item.year_no)===Number(this.yearForFilter)
            })
       }
     
   //filter by semester//
      if(this.semesterForFilter !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return Number(item.semester_no)===Number(this.semesterForFilter)
            })
       }

   //filter by type//
      if(this.typeForFilter !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return item.type.toLowerCase()===this.typeForFilter.toLowerCase()
            })
       }   
    return tempCourses
   }
 },

 }
 </script>

