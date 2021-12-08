<template>
   <div class="p-2 bg-white shadow-sm d-flex">
      <div class="dropdown  p-0 ms-auto">
         <button class="btn shadow-sm rounded dropdown-toggle p-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
             <div class="d-flex">
                <div class="d-flex flex-column">
                   <span class="small">Tigist Tewachew</span>
                   <span class="job-title small align-self-start">Dean</span>
                </div>
                <span class="px-3 pt-2">
                    <i class="fas fa-chevron-down"></i>
                </span>
             </div>
         </button>

         <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
            <li><span  class="dropdown-item">Account</span></li>
            <li><span @click="logout" class="dropdown-item">Logout</span></li>
         </ul>
     </div>
   </div>
</template>
<style scoped>
 .dropdown-toggle::after {
      display: none;
   }
</style>