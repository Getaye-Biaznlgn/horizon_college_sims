<template>
   <div class="p-2 bg-white shadow-sm d-flex">
   <div class="calender ms-5 mt-2">
   <select class="form-select form-select-sm" aria-label=".form-select-sm example">
  <option selected>2014</option>
  <option value="1">2015</option>
  <option value="2">2016</option>
  <option value="3">2017</option>
</select>
   </div>
   <div class="newpayment ms-3 mt-2">
   <button @click="addNewPayment" class="paymentbtn btn ms-3 p-0">Add New Payment</button>
   </div>
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
<script>
export default {
   methods: {
      addNewPayment(){
         this.$router.push({name:'AddNewPayment'})
         console.log('go to new payment')
      }
   },
}
</script>
<style scoped>
 .dropdown-toggle::after {
      display: none;
   }
   .paymentbtn{
    background-color: #2f4587;
    color: #fff;
    width: 10em;
    height: 30px;
    vertical-align: middle;
} 
.paymentbtn:hover{
    background-color:#1e3fa3 ;
}
.calender{
   width: 12%;
}
</style>