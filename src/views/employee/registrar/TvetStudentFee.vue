<template>
<base-card class="px-3 mx-4 mt-3">
    <div class="d-flex">
      <div class="d-flex me-3 rounded border">
         <input type="text" class="form-control search-input border" placeholder="Student ID" aria-label="search" aria-describedby="basic-addon2">
         <span class="input-group-text search rounded-0" id="basic-addon2">
           <i class="fas fa-search"></i>
         </span>
      </div>
      <div class="d-flex">
          <select class=" form-select "  aria-label="select by unpaid">
            <option>January UnPaid</option>
          </select>

          <select class="form-select ms-3" aria-label="select by paid">
            <option>January paid</option>
          </select>
      </div>   
    </div> 
    
      

<table class="mt-3">
  <tr class="table-header">
    <th rowspan="2" class="text-white">No</th>
    <th rowspan="2" class="text-white">Student Id</th>
    <th rowspan="2" class="text-white">Full Name</th>
    <th rowspan="2" class="text-white">Sex</th>
    <th colspan="12" class="text-white">Month</th>
    <th rowspan="2" class="text-white">Total</th>
    <th rowspan="2" ><span class="sr-only">action</span></th>
  </tr>
  <tr class="table-header">
     <th class="text-white">Jan</th>
     <th class="text-white">Feb</th>
     <th class="text-white">Mar</th>
     <th class="text-white">Apr</th>
     <th class="text-white">May</th>
     <th class="text-white">Jun</th>
     <th class="text-white">Jul</th>
     <th class="text-white">Aug</th>
     <th class="text-white">Sep</th>
     <th class="text-white">Oct</th>
     <th class="text-white">Nov</th>
     <th class="text-white">Dec</th>
  </tr>
  <tr class="border border-secondary rounded">
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td v-for="n in 12" :key="n">534</td>
    <td>total here</td>
    <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li><span  class="dropdown-item">Edit</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
</base-card>

</template>
<script>
// import { Modal } from 'bootstrap';
// import {mapGetters} from 'vuex'
export default {

   computed:{
  },
  methods:{
      showAddModal(){
        // this.actionButtonType='detail'
        // this.addBaseModal.show()
      },
    
  },
  mounted() {
//    this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding: 8px;
  
}

th{
  border:1px solid #fff !important;  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.btn-add{
    background-color: #ff9500;
}
.btn-add:hover{
  background-color: #eca643;
}
.search{
  cursor: pointer;
}
.search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}
input[type="radio"]:checked{
 background-color: #ff9500;
 border: none;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
</style>
