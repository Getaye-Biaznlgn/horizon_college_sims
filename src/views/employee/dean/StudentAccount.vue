<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex">
   <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span role="button"  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
    </div>
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Full Name</th>
    <th>Student Id</th>
    <th>Department</th>
    <th>Program</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr>
    <td>1</td>
    <td>Alemayehu Gelagay</td>
    <td>09 23 45 68 44</td>
    <th>alex@gmail.com</th>
    <th>Head</th>
    <td>
     <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li><span class="dropdown-item">Reset Password</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
 </base-card>
</template>