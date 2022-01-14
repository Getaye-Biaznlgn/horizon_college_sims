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
           <option  value="all">All Program</option>
           <option  value="regular">Regular</option>
           <option  value="extension">Extension</option>
        </select>
     </div>
     
       <div class="pe-2"> 
          <select v-model="levelForFilter" class="form-select " aria-label="select by year">
            <option selected value="all">All Level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
          </select>
       </div>
    </div>
</div>
<table class="mt-2">
  <tbody>
  <tr>
    <th>No</th>
    <th>Module Code</th>
    <th>Module Title</th>
    <th>Training hour</th>
    <th>Program</th>
    <th>Level</th>
  </tr>
  <tr v-for="(course,index) in filteredModules" :key="course.id">
    <td>{{index+1}}</td>
    <td>{{course.code}}</td>
    <td>{{course.title}}</td>
    <td>{{course.cp}}</td>
    <td>{{course.program}}</td>
    <td>{{course.year_no}}</td>
    <td>{{course.semester_no}}</td>
    <td>{{course.type}}</td>
  </tr>
   
  </tbody>
 </table>
    <p v-if="!modules.length" class="mt-2 text-center "> Module isn't added for this department!</p>
    <p v-else-if="!filteredModules.length" class="mt-2 text-center">There is no matching Module</p>
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
      levelForFilter:''
   }
  },
computed:{
 ...mapGetters({
   modules:'tvetHead/modules',
   }),
    tvetPrograms(){
      return this.$store.getters.programs.filter((program)=>{
        return program.type==='tvet'
      })
    },
  filteredModules(){
      //search
      let tempModules=[...this.modules]
      if(this.searchValue!=''&& this.searchValue){
        tempModules=tempModules.filter((item)=>{
          return item.code
                  .toLowerCase()
                  .startsWith(this.searchValue.toLowerCase())
       })
     }
      
  //filter by program//
      if(this.programForFilter !=='all'){
            tempModules=tempModules.filter((item)=>{
              return item.program.toLowerCase()===this.programForFilter.toLowerCase()
            })
       }

   //filter by year//
      if(this.levelForFilter !=='all'){
            tempModules=tempModules.filter((item)=>{
              return Number(item.year_no)===Number(this.levelForFilter)
            })
       }
    return tempModules
   }
 },

 }
 </script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

/* new design change start*/
tbody > tr:last-child { border-bottom: 2px solid hsl(231, 16%, 91%) }
th{
  text-align: left;
  padding: 8px;
}
tr{
  border-top: 2px solid hsl(231, 16%, 91%)
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
/* end */
.search{
  cursor: pointer;
}
.warining input{
    border: 1px red solid;
}
.warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
.search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.input-group{
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
