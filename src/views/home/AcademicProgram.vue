<template>
    <div class="container py-4">
      <p>Horizon College provides the following field of studies with distance, regular and extension program</p>
       <div class="d-lg-flex my-3 justify-content-around">
        <div class="flex-fill me-3 my-3 my-md-0">
            <strong>Degree Program</strong>
            <table class="mt-2">
                <tr>
                  <th>No.</th>  
                  <th>Department</th> 
                </tr>
                <tbody>
                   <tr>
                     <td>1</td>
                     <td>Management</td>
                   </tr>  
                   <tr>
                       <td>2</td>
                       <td>Accounting and Finance</td>
                   </tr>
                    <tr>
                      <td>3</td>
                       <td>Database Adminstration</td>
                    </tr> 
                </tbody>
            </table>
        </div>
         <div class="">
             <div class="vl h-100"></div>
         </div> 
        <div class="flex-fill ms-md-3 ">
            <strong>TVET Program</strong>
            <table class="mt-2">
                <tr>
                  <th>No.</th>  
                  <th>Department</th> 
                </tr>
                <tbody>
                   <tr>
                     <td>1</td>
                     <td>Hardware and Networking</td>
                   </tr>  
                   <tr>
                       <td>2</td>
                       <td>Accounting and Budget Service</td>
                   </tr>
                   <tr>
                      <td>3</td>
                       <td>Database Adminstration</td>
                   </tr> 
                    <tr>
                      <td>4</td>
                      <td>Customer Contact & Secretarial Operation Coordination</td>
                    </tr> 
                </tbody>
            </table>
        </div>    
       </div> 
    </div>
</template>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
tr{
  border-top: 2px solid #dddddd;
  text-align: left;
  vertical-align: top;
}
th,td{
    padding: 8px;
}
tr:last-child{
    border-bottom: 2px solid #dddddd;
}

.vl{
    border-left: 2px solid #dddddd;
}
</style>