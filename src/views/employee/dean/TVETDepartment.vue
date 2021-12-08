<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn text-white shadow-sm"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Department Name</th>
    <th class="text-white">Up to level</th>
    <th class="text-white">Department Head</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr class="border border-secondary rounded">
    <td>1</td>
    <td>Accounting</td>
    <td>Alemayehu Gelagay</td>
    <td></td>
  </tr>
 </table>
</base-card>
</template>
<script>
export default {
    
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
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.btn{
    background-color: #ff9500;
    
}
.btn:hover{
  background-color: #eca643;
}
.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}

</style>