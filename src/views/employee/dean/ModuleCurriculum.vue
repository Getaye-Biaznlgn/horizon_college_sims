<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-between">
    <div class="d-flex">
       <div> 
          <select class="px-3 py-1" aria-label="select by department">
            <option selected value="here we go">All Department</option>
          </select>
       </div>
      <div> 
          <select class="px-3 py-1 mx-3" aria-label="select by level">
            <option selected value="here we go">Occupation Level</option>
          </select>
       </div>
    </div>
   <button class="btn text-white shadow-sm"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Module Code</th>
    <th class="text-white">Module Title</th>
    <th class="text-white">Training Hour</th>
    <th class="text-white">Department</th>
    <th class="text-white">Occupation Level</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr class="border border-secondary rounded">
    <td>1</td>
    <td>EIS BCW1 101 0919</td>
    <td>Revceive and respond to workplace communication</td>
    <td>20</td>
    <td>Accounting and budget</td>
    <td>Level 1</td>
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