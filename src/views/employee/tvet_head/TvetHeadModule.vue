<template>
<base-card class="px-3 mx-4 mt-3">
<div>
    <div class="d-flex">
     <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" class="form-control search-input" placeholder="module code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
     </div>
       
      <div class="ms-auto"> 
          <select v-model="levelForFilter" class="form-select " aria-label="select by year">
            <option selected value="all">All Level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
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
    <th>Level</th>
  </tr>
  <tr v-for="(modul,index) in filteredModules" :key="modul.id">
    <td>{{index+1}}</td>
    <td>{{modul.code}}</td>
    <td>{{modul.title}}</td>
    <td>{{modul.training_hour}}</td>
    <td>{{modul.level}}</td>
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
      levelForFilter:'all'
   }
  },
computed:{
 ...mapGetters({
   modules:'tvetHead/modules',
   }),
    // tvetPrograms(){
    //   return this.$store.getters.programs.filter((program)=>{
    //     return program.type==='tvet'
    //   })
    // },
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
      


   //filter by year//
      if(this.levelForFilter !=='all'){
            tempModules=tempModules.filter((item)=>{
              return Number(item.level)===Number(this.levelForFilter)
            })
       }
    return tempModules
   }
 },

 }
 </script>


