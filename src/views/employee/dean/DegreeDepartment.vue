<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn btn-add text-white shadow-sm" @click="show()"> 
     Add New Department
   </button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Department Name</th>
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
<base-modal>
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3">
           <label for="#departmentName" class="form-label">Department Name</label>
           <input class="form-control form-control-sm" id="departmentName" type="text" aria-label=".form-control">
        </div> 
       <div class="form-check">
           <input class="form-check-input" type="checkbox" value="" id="regualr">
           <label class="form-check-label" for="regular">Regular</label>
       </div>
        <div class="d-flex justify-content-between">
           <div class="mb-3">
              <label class="form-label" for="#departmentName">How many years?</label>
              <input class="form-control form-control-sm" id="departmentName" type="number" min="1" max="10" aria-label=".form-control-lg">
           </div> 
           <div class="mb-3">
              <label class="form-label " for="#semesters">How many semesters?</label>
              <input class="form-control form-control-sm" id="semesters" type="number" min="1" max="30" aria-label=".form-control-lg">
            </div> 
      </div>
      </form>
   </template>
    <template #modalFooter>
      <button type="button" class="btn btn-cancel border border-secondary ms-auto"  data-bs-dismiss="modal">CANCEL</button>
      <button type="button" class="btn btn-save text-white mx-3">SAVE</button>
   </template>
</base-modal>


</template>
<script>
import { Modal } from 'bootstrap';
import BaseModal from '../../../components/BaseModal.vue'
export default {
  components:{
    BaseModal
  },
  data(){
    return{
      baseModal:null
    }
  },
  methods:{
      closeBtn(){
        this.baseModal.hide()
      },
      show(){
        this.baseModal.show()
      }
    },
  mounted() {
   this.baseModal = new Modal(document.getElementById('baseModal'));
   console.log('base modal', this.baseModal)
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
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.btn-save,.btn-add{
    background-color: #ff9500;
    border-radius: 0;
}
.btn-save:hover, .btn-add:hover{
  background-color: #eca643;
}
.btn-cancel{
  border-radius: 0;  
}
.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}

</style>